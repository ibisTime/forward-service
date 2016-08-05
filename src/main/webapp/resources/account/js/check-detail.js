$(function() {
	var ajNo = getQueryString("ajNo");
	var data = {"ajNo":ajNo,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/jourPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//提交
	$('#passBtn').click(function() {
		doApprove();
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/check.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			amount: {
				required: true,
				number:true,
				maxlength: 20
			},
			remark: {
				required: true,
				maxlength: 255
			}
		},
		messages: {
			amount: {
				required: "请输入积分",
				number:"积分请输入数字",
				maxlength: jQuery.format("积分不能大于{0}个字符")
			},
			remark: {
				required: "请输入备注",
				maxlength: jQuery.format("备注不能大于{0}个字符")
			}
		}
	});
});

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data.list.length > 0){
			var result = res.data.list[0];
			$("#ajNo").html(result.ajNo);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName("jour_status",result.status));
			$("#bizType").html(Dict.getName("biz_type",result.bizType));

			$("#refNo").html(result.refNo);
			$("#transAmount").html(moneyFormat(result.transAmount));
			$("#preAmount").html(moneyFormat(result.preAmount));
			$("#postAmount").html(moneyFormat(result.postAmount));
			$("#createDatetime").html(dateFormat(result.createDatetime));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

//审批
function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"ajNo":$("#ajNo").html(),"type":"fd","amount":$("#amount").val(),"remark":$("#remark").val()};
	data['amount'] = moneyParse(data['amount']);
	var url = $("#basePath").val()+"/account/checkInput";
	doPostAjax(url, data, doSuccessBack);
}
	
//回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/check.htm";
	}else{
		alert(res.msg);
	}
}