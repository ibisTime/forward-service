var userId="";
var dictIdKind=null;
var dictStatus=null;
$(function() {
	// 表格初始化
	var code=getQueryString("code");
	var data={"integralCode":code};
	function savePic() {
	    var img = $("#qrcode").find('img')[0];
	    var alink = document.createElement("a");
	    alink.href = img.src;
	    alink.download = "二维码.jpg";
	    alink.click();
	}
	$('#subBtn').on('click', function() {
		window.print();
	});
	$("#userId").val($('#qianduanBaseUrl').val() + '/m/message/recharge_success.html?i='+code);
	var qrcode = new QRCode('qrcode');
		if ($('#userId').val()) {
			qrcode.makeCode($('#userId').val());
		} 

});




