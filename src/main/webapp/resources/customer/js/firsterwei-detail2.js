$(function() {
	// 表格初始化
	var code = getQueryString('code');
	var data={"code":code};
	var url = $("#basePath").val()+"/account/inciseScore/detail";
	doGetAjax(url,data,doSuccessData);
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score_sale.htm";
	});
});

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#quantity").html(result.quantity);
		$("#price").html(result.price);
		$("#isApprove").html(Dict.getName('isApprove', result.isApprove));
		$("#remark").html(result.remark);
	}else{
		alert(res.msg);
	}
}
