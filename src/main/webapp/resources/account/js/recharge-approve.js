//订单状态
var orderStatus = null;
//渠道
var channel = null;
$(function() {
	//页面数据字典初始化
//	initData();
	
	var code = getQueryString("code");
	var accountNumber = getQueryString("accountNumber");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/rechargeOrderPage";
	doGetAjax(url, data, doGetDetailBack);
	
	//区分线上线下
	rechargeType = getQueryString("rechargeType");
	
	//提交
	$('#passBtn').click(function() {
		doApprove("1");
	});
	
	//提交
	$('#noPassBtn').click(function() {
		doApprove("0");
	});
	
	//返回
	$('#backBtn').click(function() {
		redirectUrl();
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			remark: {
				required: true,
				maxlength: 64
			}
		},
		messages: {
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
			$("#chargeNo").html(result.code);
			$("#accountNumber").html(result.accountNumber);
//			$("#status").html(Dict.getName('withdraw_status',result.status));
//			$("#channel").html(result.channel);
			$("#approveNote").html(result.approveNote);
			$("#amount").html(moneyFormat(result.amount,2));
			$("#bankCode").html(Dict.getName('charge_type',result.fromType));
			$("#bankcardNo").html(result.fromCode);
			$('#pdf').html(result.pdf.substring(result.pdf.lastIndexOf('/')+1));
			$('#pdf')[0].href = result.pdf;
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

function doApprove(approveResult){
	if(!$("#jsForm").valid()){
		return false;
	}
	var data = {"approveResult":approveResult,"approveNote":$("#remark").val()};
	data['chargeNo']=$("#chargeNo").html();
	var url = $("#basePath").val()+"/account/approveRecharge";
	doPostAjax(url, data, doSuccessBack);
}
	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		redirectUrl();
	}else{
		alert(res.msg);
	}
}

//跳转链接
function redirectUrl(){
	if(rechargeType == "01"){
		location.href = $("#basePath").val()+"/account/recharge.htm";
	}else if(rechargeType == "13"){
		location.href = $("#basePath").val()+"/account/recharge_epay.htm"; 
	}
}