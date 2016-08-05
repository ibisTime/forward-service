$(function(){
	$('#direction').renderDropdown(Dict.getName('account_direction'));
	
	$('#saveBtn').click(function() {
		if(!$("#jsForm").valid()){
			return false;
		}
//		var sign = $("#direction").val() == "1"?"":"-";
		var data = {"accountNumber":$("#accountNumber").val(),"amount":moneyParse($("#amount").val()),"applyNote":$("#applyNote").val()};
		data["direction"]=$("#direction").val();
		var url = $("#basePath").val()+"/account/artificialAccountApply";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/account/red_blue.htm";
	});
	
	//入参合法性校验
	$("#jsForm").validate({
		rules: {
			
			accountNumber: {
				required: true,
				maxlength: 32
			},
			direction: {
				required: true,
				maxlength: 1
			},
			amount: {
				required: true,
				number:true,
				maxlength: 19,
				min:0
			},
			applyUser: {
				required: true,
				maxlength: 255,
			},
			applyNote: {
				required: true,
				maxlength: 255
			}
		},
		messages: {
			accountNumber: {
				required: "请输入账户编号",
				maxlength: jQuery.format("账户编号不能大于{0}个字符")
			},
			direction: {
				required: "请选择方向",
				maxlength: jQuery.format("方向不能大于{0}个字符")
			},
			amount: {
				required: "请输入积分",
				number:"积分请输入数字",
				maxlength: jQuery.format("积分不能大于{0}个字符"),
				min: jQuery.format("积分不能小于{0}")
			},
			applyUser: {
				required: "请输入申请人",
				maxlength: jQuery.format("申请人不能大于{0}个字符"),
			},
			applyNote: {
				required: "请输入申请说明",
				maxlength: jQuery.format("申请说明不能大于{0}个字符")
			}
		}
	});
});

function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/red_blue.htm";
	}else{
		alert(res.msg);
	}
}