$(function() {
	//获取菜单URL入参
	var userId = getQueryString("userId");
		var data = {"userId":userId};
		var url = $("#basePath").val()+"/customer/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score2.htm";
	});
});



function doSucBackGetDetail(res){
	if (res.success) {
		$("#loginName").html(res.data.loginName||'-');
		$("#mobile").html(res.data.mobile||'-');
		$("#idKind").html(Dict.getIDKindName(res.data.idKind));
		$("#idNo").html(res.data.idNo||'-');
		$("#realName").html(res.data.realName||'-');
		$("#userReferee").html(res.data.userReferee||'-');
		$("#remark").html(res.data.remark||'-');
		$("#img").attr('src',res.data.pdf);
	}else{
		alert(res.msg);
	}
}