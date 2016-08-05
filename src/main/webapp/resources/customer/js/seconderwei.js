var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	userId=getQueryString("userId");
	var data={"userId":userId};
	var url = $("#basePath").val()+"/customer/detailmoney";
	doGetAjax(url,data,doSuccessData);
	 // 记录查询
	
	
	
	
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score_rlue.htm";
	});
});

function savePic() {
    var img = $("#qrcode").find('img')[0];
    var alink = document.createElement("a");
    alink.href = img.src;
    alink.download = "二次积分.jpg";
    alink.click();
}

function doSuccessData(res){
	if (res.success) {
		var result = res.data;
		$("#userId").val($('#frontBaseUrl').val() + '/m/message/recharge_success.html?u='+result.userId);
		
		
		var qrcode = new QRCode('qrcode');
			if ($('#userId').val()) {
				qrcode.makeCode($('#userId').val());
			} else {
				qrcode.clear();
				$('#qrcode').find('img').hide();
			}
			
		
		$('#downloadBtn').on('click', function() {
			savePic();
		});
	}else{
		alert(res.msg);
	}
}
