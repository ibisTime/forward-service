
$(function() {
	$('#idKind').renderDropdown(Dict.getIDKindName());

	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		if(pdfImg.constructor === String) data["pdf"]=pdfImg;
		var url = $("#basePath").val()+"/product/producer/add";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score2.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			loginName: {
				required: true,
				maxlength: 11
			},
			mobile: {
				required: true,
				maxlength: 11
			},
			idKind: {
				required: true,
				maxlength: 2
			},
			idNo: {
				required: true,
				maxlength: 32
			},
			realName: {
				required: true,
				maxlength: 16
			}
		}
	});
});

function selectImagepdf(file){
	if(!file.files || !file.files[0]){
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt){
		document.getElementById('pdf').src = evt.target.result;
		pdfImg = evt.target.result;
		$("#pdfImg").show();
		$("#pdfImg").attr("src",pdfImg);
	}
	reader.readAsDataURL(file.files[0]);
}


function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/score2.htm";
	}else{
		alert(res.msg);
	}
}