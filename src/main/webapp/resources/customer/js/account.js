$(function() {
	//获取菜单URL入参
	var userId = getQueryString("userId");
		var data = {"userId":userId};
		var url = $("#basePath").val()+"/customer/detail";
		doGetAjax(url, data, doSucBackGetDetail);
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score.htm";
	});
});



function doSucBackGetDetail(res){
	if (res.success) {
		$("#loginName").html(res.data.loginName||'-');
		$("#mobile").html(res.data.mobile||'-');
		$("#idKind").html(Dict.getName("id_kind",res.data.idKind||'-'));
		$("#idNo").html(res.data.idNo||'-');
		$("#realName").html(res.data.realName||'-');
		$("#userReferee").html(res.data.userReferee||'-');
		$('#pdf').html(linkSrc(res.data.pdf));
		$("#img").attr('src',res.data.pdf);
	}else{
		alert(res.msg);
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
