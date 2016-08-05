//账户状态
var orderStatus = null;
//渠道
var channel = null;
$(function() {

	var code = getQueryString("code");
	var data = {"code":code,"start":"1","limit":"10"};
	var url = $("#basePath").val()+"/account/withdrawOrderPage";
	
	// 表格初始化
	doGetAjax(url, data, doGetDetailBack);
	
	// 通过
	$('#passBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"payResult":$("#payResult").val(),"payNote":$("#payNote").val(),"refNo":$("#refNo").val(),"fee":$("#fee").val()};
		data['withdrawNo']=$("#withdrawNo").html();
		var url = $("#basePath").val()+"/account/duixian/check";
		doPostAjax(url, data, doSuccessBack);
	});
	
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/withdraw.htm";
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
			$("#withdrawNo").html(result.code);
			$("#mobile").html(result.mobile);
			$("#realName").html(result.realName);
			$("#bankCode").html(Dict.getName('charge_type',result.toType));
			$("#bankcardNo").html(result.toCode);
			$("#toBelong").html(result.toBelong);
			$("#accountNumber").html(result.accountNumber);
			$("#status").html(Dict.getName('withdraw_status', result.status));
			$("#amount").html(moneyFormat(result.amount,2));
			$("#createDatetime").html(dateFormat(result.createDatetime,'yyyy-MM-dd HH:mm:ss'));
		}else{
			alert("根据订单编号获取详情为空");
		}
	}else{
		alert(res.msg);
	}
}

	
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/withdraw.htm";
	}else{
		alert(res.msg);
	}
}
