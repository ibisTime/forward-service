$(function() {
	
	//获取菜单URL入参
	invoiceCode = getQueryString("invoiceCode");
	//新增修改判断
	initBusinessTable();
	if(isBlank(invoiceCode)){
		$("#product").val("add");
	}else{
		$("#invoiceCode").attr("readonly","readonly");
		var data = {"invoiceCode":invoiceCode};
		var url = $("#basePath").val()+"/model/order/detail";
		doGetAjax(url, data, doSucBackGetDetail);
		
		$('#pay-tableList').bootstrapTable({
			striped : true,
			singleSelect : true,
			method : "get",
			url : $("#basePath").val()+"/account/rechargeOrderPage",
			clickToSelect : true,
			queryParamsType : 'limit',
			queryParams : function(params) {
				return {
					refNo : invoiceCode,
					start : params.offset / params.limit + 1,
					limit : params.limit
				};
			},
			responseHandler : function(res) {
				return {
					rows : res.data.list,
					total : res.data.totalCount
				};
			},
			pagination : true,
			sidePagination : 'server', // 服务端请求
			totalRows : 0,
			pageNumber : 1,
			pageSize : 10,
			pageList : [ 10, 20, 30, 40, 50 ],
			columns : [{
				field : 'code',
				title : '订单编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'accountNumber',
				title : '账户编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'amount',
				title : '积分',
				align : 'left',
				valign : 'middle',
				sortable : true,
				formatter : moneyFormatter
			},{
				field : 'createDatetime',
				title : '付款时间',
				align : 'left',
				valign : 'middle',
				sortable : true,
				formatter : dateFormatter
			},{
				field : 'pdf',
				title : '水单',
				align : 'left',
				valign : 'middle',
				formatter:function(value){
					if(value!='无'){
						return '<a target="_blank" href="'+value+'">'+value+'</a>';
					} else {
						return '无';
					}
					
				},
				sortable : true
			}]
		});
	}
	

	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/order/order_query.htm";
	});

	function doSuccessBack(res) {
		if (res.success == true) {
			alert("操作成功");
			window.location.href = $("#basePath").val()+"/order/order_query.htm";
		}else{
			alert(res.msg);
		}
	}
	
	function doSucBackGetJour(res){
		if (res.success) {
			//...
			
		}else{
			alert(res.msg);
		}
	}

	//获取详情回调方法
	function doSucBackGetDetail(res){
		if (res.success) {
			$("#code").html(res.data.code);
			$("#applyDatetime").html(dateFormatter(res.data.applyDatetime));
			$("#applyNote").html(res.data.applyNote || '无');
			$("#loginName").html(res.data.loginName);
			$("#approveDatetime").html(res.data.approveDatetime);
			$("#receiptTitle").html(res.data.receiptTitle|| '-');
			$("#receiptType").html(Dict.getName('receipt_type',res.data.receiptType||'无'));
			$("#status").html(Dict.getName('order_status',res.data.status));
			$("#totalAmount").html(moneyFormatter(res.data.totalAmount));
			$("#payAmount").html(moneyFormatter(res.data.payAmount));
			$("#mobile").html(res.data.address?res.data.address.mobile:'-');
			$("#name").html(res.data.address?res.data.address.addressee:'-');
			$("#address").html(res.data.address?res.data.address.province+res.data.address.city+res.data.address.district+res.data.address.detailAddress:'-');
			$("#tableList").bootstrapTable("load", res.data.invoiceModelList);
		}else{
			alert(res.msg);
		}
	}
});



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
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
