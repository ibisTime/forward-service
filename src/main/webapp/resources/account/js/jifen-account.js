//账户状态
var accountStatus=null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//页面数据字典初始化
	initData();
	
	//页面赋值
	var url = $("#basePath").val()+"/customer/own/account";
	doGetAjax(url, {
		currency: 'XNB'
	}, doGetDetailBack);
});

function initData(){
	//账户状态
	var data= {"key":"account_status"};
	doGetAjaxIsAsync($("#dictUrl").val(), data,false, doSucBackAccountStatus);
}

//数据字典（账户状态）关联的回执方法
function doSucBackAccountStatus(res){
	accountStatus = res.data;
}

//跳转系统资金明细
function redirectAmountJour(){
	location.href = $("#basePath").val()+"/account/sys_account_detail.htm?accountNumber="+$("#accountNumber").html();
}

function doGetDetailBack(res){
	if (res.success == true) {
		if(res.data != null){
			var result = res.data;
			$("#status").html(Dict.getName('account_status',result.status));
			$("#currency").html(result.currency);
			$("#accountNumber").html(result.accountNumber);
			$("#amount").html(moneyFormat(result.amount,2));
			$("#frozenAmount").html(moneyFormat(result.frozenAmount,2));
			$('#changeBtn').on('click', function() {
				window.location.href = $("#basePath").val()+"/account/withdrawl_apply.htm?userId=" + result.userId;
			});
		}else{
			alert("系统账户获取详情失败");
		}
	}else{
		alert(res.msg);
	}
}

//证件类型转化
function statusFormatter(value, row) {
	for(var i = 0;i < accountStatus.length;i++){
		if(accountStatus[i].value == value){
			return accountStatus[i].remark;
		}
	}
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

// 格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}