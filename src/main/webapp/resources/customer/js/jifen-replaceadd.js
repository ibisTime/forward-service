
$(function() {
	$('#idKind').renderDropdown(Dict.getIDKindName());

	//提交
	$('#subBtn').click(function() {
	    if(!$("#jsForm").valid()){
			return false;
		}
	    if(isBlank($("#url1").attr("href"))){
			alert("请上传附件");
			return;
		}
		var data = {};
		var t = $('form').serializeArray();
		$.each(t, function() {
			data[this.name] = this.value;
		});
		data['pdf'] = $("#url1").attr("href");
		var url = $("#basePath").val()+"/account/scorer/add";
		doPostAjax(url, data, doSaveSuccessBack);
	});
	
	//返回
	$('#backBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/score.htm";
	});
	
	$("#uploadBtn1").click(function () {
		var postUrl = $("#basePath").val()+"/upload/file";
        ajaxFileUpload(postUrl,"pdf","url1");
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
				number: true,
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
			},
			userReferee: {
				required: true,
				maxlength: 32
			},
			remark: {
				required: false,
				maxlength: 32
			}
		}
	});
});


function doSaveSuccessBack(res) {
	if (res.success == true) {
		alert("操作成功");
		window.location.href = $("#basePath").val()+"/customer/score.htm";
	}else{
		alert(res.msg);
	}
}

function ajaxFileUpload(postUrl,fileId,uploadControlId) {
    $.ajaxFileUpload
    (
        {
            url: postUrl, //用于文件上传的服务器端请求地址
            type: 'POST',
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElementId: fileId, //文件上传域的ID
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                if (typeof (data.status) != 'undefined') {
                    if (data.status == "1") {
                    	alert('上传成功');
                    	if(!isBlank(uploadControlId)){
                    		$("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
            		    	$("#"+uploadControlId).attr('href',data.url); 
                    	}
                    } else {
                        alert(data.msg);
                    }
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                alert(e);
            }
        }
    )
    return false;
}
