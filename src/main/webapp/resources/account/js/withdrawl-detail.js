$(function (){
	//页面数据字典初始化
	//initData();
	
	$('#toType').renderDropdown(Dict.getName('charge_type'));
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"accountNumber":$("#accountNumber").val(),"fromType":$("#fromType").val(),"fromCode":$("#fromCode").val(),"amount":moneyParse($("#amount").val())};
		data['amount'] = moneyParse(data['amount'], 1);
		var url = $("#basePath").val()+"/account/agentWithdraw";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$("#backBtn").click(function(){
		location.href = $("#basePath").val()+"/account/withdraw.htm"
	});
	
	
	//入参合法校验
	$("#jsForm").validate({
		rules:{
			accountNumber:{
				required: true,
				maxlength: 32
			},
			toType:{
				required: true,
				maxlength: 32
			},
			toCode:{
				required: true,
				maxlength: 32
			},
			amount:{
				required: true,
				number:true,
				isPositive: true,
				maxlength: 13
			}
		},
		messages:{
			accountNumber:{
				required: "请输入账号",
				maxlength: jQuery.format("账号不能大于{0}个字符")
			},
			toType:{
				required: "请选择取现账户类型",
			},
			toCode:{
				required: "请输入取现账户",
				maxlength: jQuery.format("取现账号不能大于{0}个字符")
			},
			amount:{
				required: "请输入取现积分",
				number:"取现积分请输入数字",
				maxlength: jQuery.format("取现积分不能大于{0}个字符")
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/withdraw.htm";
	}else{
		alert(res.msg);
	}
}




//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
