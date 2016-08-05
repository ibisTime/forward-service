$(function() {
	var invoiceCode = getQueryString("invoiceCode");
	doGetAjaxIsAsync($("#basePath").val()+"/account/accountlist", {status: 1}, false, function(res) {
//		var data = res.data ||[], newdata = [];
//		for(var i=0;i<data.length;i++){
//			if(data[i].status=1){
//				newdata.push(data[i]);
//			}
//		}
		var data = res.data, html = "<option value=''>请选择</option>";
		for (var i = 0, len = data.length; i < len; i++) {
			html += "<option value='"+data[i].companyCode+"'>"+data[i].subbranch+""+data[i].cardNo+"</option>";
			$("#toCardNo").html(html);
		}
	});
	
	$("#toCardNo").on("change", function(){
		
		$("#shoukuang").html($(this).val());
	});
	$('#fromType').renderDropdown(Dict.getName('charge_type'));
	//新增修改判断
	initBusinessTable();
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	}
	
	
	//提交
	$('#subBtn').click(function() {
		//上传文件判断
		if(isBlank($("#url1").attr("href"))){
			alert("请上传水单");
			return;
		}
	    if(!$("#jsForm").valid()){
			return false;
		}
	    var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		var operator = $("#operate").val() != "edit"?"add":"edit";
		
		data['code'] = $("#code").html();
		data['pdf'] = $("#url1").attr("href");
		data['amount'] = moneyParse(data['amount'], 1);
		var url = $("#basePath").val()+"/model/order/sure";
		
		doPostAjax(url, data, doSucBackSave);
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"pdf","url1");
    });
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/pay_one.htm";
	});
	
	$("#jsForm").validate({
		rules: {
			amount: {
				required: true,
				maxlength: 32
			},
			fromType: {
				required: true,
				maxlength: 32
			},
			fromCode: {
				required: true,
				number:true,
				maxlength: 32
			},
			toCardNo: {
				required: true,
				maxlength: 32
			},
			pdf: {
				required: true,
				maxlength: 255
			},
			approveNote: {
				required: true,
				maxlength: 32
			}
		},
		messages: {
			amount: {
				required: "请输入积分",
				maxlength: jQuery.format("积分不能大于{0}个字符")
			},
			fromType: {
				required: "请选择打款方式",
				maxlength: jQuery.format("打款方式不能大于{0}个字符")
			},
			fromCode: {
				required: "请输入打款账号",
				maxlength: jQuery.format("打款账号不能大于{0}个字符")
			},
			toCardNo: {
				required: "请输入受款账号",
				maxlength: jQuery.format("受款账号不能大于{0}个字符")
			},
			pdf: {
				required: "请上传水单",
				maxlength: jQuery.format("水单链接不能大于{0}个字符")
			},
			approveNote: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
	
});
	
	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#code").html(res.data.code);
			$("#applyDatetime").html(dateFormatter(res.data.applyDatetime));
			$("#applyNote").html(res.data.applyNote || '无');
			$("#loginName").html(res.data.loginName);
			$("#approveDatetime").html(res.data.approveDatetime);
			$("#approveUser").html(res.data.approveUser);
			$("#status").html(Dict.getName('order_status',res.data.status));
			$("#totalAmount").html(moneyFormat(res.data.totalAmount,2));
			$("#payAmount").html(moneyFormat(res.data.payAmount,2));
			$("#tableList").bootstrapTable("load", res.data.invoiceModelList);
		}else{
			alert(res.msg);
		}
	}
	
	

function initBusinessTable(){
	//绑定列表
	$('#tableList').bootstrapTable({
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		columns : [{
					field : 'productName',
					title : '产品',
					align : 'left',
					valign : 'middle',
					sortable : false,
				},{
					field : 'modelName',
					title : '型号',
					align : 'left',
					valign : 'middle',
					sortable : false,
				},{
					field : 'quantity',
					title : '产品数量',
					align : 'left',
					valign : 'middle',
					sortable : false
				},{
					field : 'salePrice',
					title : '单价',
					align : 'left',
					valign : 'middle',
					formatter:moneyFormatter,
					sortable : false
				}]
	});
}

function ajaxFileUpload(postUrl,fileId,uploadControlId) {
    $.ajaxFileUpload
    (
        {
            url: postUrl, //用于文件上传的服务器端请求地址
            type: 'POST',
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                if (typeof (data.status) != 'undefined') {
                    if (data.status == "1") {
                    	alert('上传成功');
                    	if(!isBlank(uploadControlId)){
                    		$("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
            		    	$("#"+uploadControlId).attr('href',data.url); 
                    	}
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}

function checknum(obj)
{   if(/^\d+\.?\d{0,2}$/.test(obj.value)){
       obj.value = obj.value;
    }else{
   obj.value = obj.value.substring(0,obj.value.length-1);
}}
//保存回调方法
function doSucBackSave(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/pay_one.htm";
	}else{
		alert(res.msg);
	}
}

//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

