$(function (){
	//页面数据字典初始化
	//initData();
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {};
		var t = $("form").serializeArray();
		$.each(t,function(){
			data[this.name] = this.value;
		});
		var url = $("#basePath").val()+"/withdraw/apply";	
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
			amount:{
				required: true,
				number:true,
				maxlength: 20
			}
		},
		messages:{
			accountNumber:{
				required: "请输入账户编号",
				maxlength: jQuery.format("账户编号不能大于{0}个字符")
			},
			amount:{
				required: "请输入取现积分",
				number:"取现积分请输入数字",
				maxlength: jQuery.format("取现积分不能大于{0}个字符")
			}
		}
	})
});

function initData(){
}

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/account/withdraw.htm";
	}else{
		alert(res.msg);
	}
}