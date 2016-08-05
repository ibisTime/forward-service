$(function (){
	var userId = getQueryString("userId");
	if (userId) {
		$("#fromUserId").parent().remove();
	} else {
		doGetAjaxIsAsync($("#basePath").val()+"/user/under/list", {}, false, function(res) {
			var data = res.data || [], html = "<option value=''>请选择</option>";
			for (var i = 0, len = data.length; i < len; i++) {
				html += "<option value='"+data[i].userId+"'>"+data[i].loginName+"</option>";
				$("#fromUserId").html(html);
				
			}
		});
	}
	
	
	//提交
	$("#subBtn").click(function(){
		if(!$("#jsForm").valid()){
			return false;
		}
		var data = {"fromUserId":$("#fromUserId").val() || userId,
				"price":moneyParse($("#price").val()),
				"amount":moneyParse($("#amount").val()),
				'toUserId': userId ? '' : getUserId(), 
				"type":"1"};
		var url = $("#basePath").val()+"/account/duixian";
		doPostAjax(url, data, doSuccessBack);
	});
	
	//返回
	$("#backBtn").click(function(){
		window.history.back();
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
			fromUserId:{
				required: true,
				maxlength: 32
			},
			toCode:{
				required: true,
				maxlength: 32
			},	
			price:{
				required: true,
				number:true,
				maxlength: 11
			},
			amount:{
				required: true,
				number:true,
				isPositive: true,
				maxlength: 11
			}
		}
	})
});

//线下充值申请成功的回执方法
function doSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.history.back();
	}else{
		alert(res.msg);
	}
}




//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
