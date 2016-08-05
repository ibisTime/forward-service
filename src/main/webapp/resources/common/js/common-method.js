/**
 * 日期格式转化
 * @param date
 * @param format
 * @returns
 */
function dateFormat(date, format) {
	if(date == '' || typeof(date) == 'undefined'){
		return '-';
	}
	if(format == '' || format == null || format == undefined){
		format = "yyyy-MM-dd HH:mm:ss";
	}
	
    date = new Date(date);
    var o = {
        'M+' : date.getMonth() + 1, //month
        'd+' : date.getDate(), //day
        'H+' : date.getHours(), //hour
        'm+' : date.getMinutes(), //minute
        's+' : date.getSeconds(), //second
        'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
        'S' : date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)){
         format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp('(' + k + ')').test(format)){
        	format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

function dateTimeFormat(date) {
	if(date == '' || typeof(date) == 'undefined'){
		return '-';
	}
	format = "yyyy-MM-dd HH:mm:ss";
    date = new Date(date);
    var o = {
        'M+' : date.getMonth() + 1, //month
        'd+' : date.getDate(), //day
        'H+' : date.getHours(), //hour
        'm+' : date.getMinutes(), //minute
        's+' : date.getSeconds(), //second
        'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
        'S' : date.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)){
         format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp('(' + k + ')').test(format)){
        	format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
}

/**
 * 金额格式转化
 * @param money
 * @param format
 */
/**
 * 废弃
function moneyFormat(money,format){
	if(isNaN(money)){
		return '';
	}
	if(format == '' || format == null || format == undefined){
		format = 2;
	}
	return parseFloat(money/1000).toFixed(format);
} */

/**
 * 金额格式转化
 * @param money
 * @param format
 */
function moneyFormat(money,format){
	var flag = true;
	if(isNaN(money)){
		return '0.00';
	}
	if(money < 0){
		money = -1 * money;
		flag = false;
	}
	if(format == '' || format == null || format == undefined || typeof format == 'object'){
		format = 2;
	}
	//钱除以1000并保留两位小数
	//money = (money/1000).toFixed(format).toString();
	money = (money/1000).toString();
	money = money.replace(/(\.\d\d)\d+/ig,"$1");
	money = parseFloat(money).toFixed(format);
	//千分位转化
	var re=/\d{1,3}(?=(\d{3})+$)/g;
	money = money.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
	if(!flag){
		money = "-" + money;	
	}
	return money;
}

function moneyParse(money, rate) {
	rate = rate || 1000;
	return ((+('' + money).replace(/,/g, '')) * rate).toFixed(0);
}

/**
 * 编辑金额格式转化
 * @param money
 * @param format
 */
function editMoneyFormat(money,format){
	if(isNaN(money)){
		return '';
	}
	if(format == '' || format == null || format == undefined){
		format = 2;
	}
	return parseFloat(money/1000).toFixed(format);
}

/**
 * 百分比格式转化
 * @param percent
 * @param format
 */
function percentFormat(percent, format){
	return percent;
	/*if(isNaN(percent)){
		return '';
	}
	if(format == '' || format == null || format == undefined){
		format = 5;
	}
	return parseFloat(percent).toFixed(format);
	*/
}


/**
 * 百分比格式转化
 * @param percent
 * @param format
 * @returns
 */
function percentFormatByLarge(percent, format){
	if(isNaN(percent)){
		return '';
	}
	if(format == '' || format == null || format == undefined){
		format = 3;
	}
	return parseFloat(percent*10000).toFixed(format);
}

/**
 * 验证数字
 * @param amount
 * @param name
 * @returns {Boolean}
 */
function checkNum(amount,name){
	var reg = new RegExp("^[0-9]+(.[0-9]+)?$");
	if(!reg.test(amount)) { 
		alert(name+"只能输入数字！"); 
		return false; 
	}
	return true;
}

/**
 * 申请编号去除特殊字符('-'与' ')
 * @param rbNo
 */
function rbNoFormat(rbNo){
	return rbNo.replace(/-| /g, "")
}

/**
 * 金额放大，乘于1000，格式化
 * @param money
 * @param format
 */
function moneyFormatByEnLarge(money, format){
	if(isNaN(money)){
		return '';
	}
	return parseFloat(money*1000).toFixed(format);
}
/**
 * 利率缩小100倍
 */
function RateFormatByHundredDivided(rate){
	if(isNaN(rate)){
		return '';
	}
	return parseFloat(rate/100.0).toFixed(5);
}
/**
 * 利率放大100倍
 */
function RateFormatByLargeHundred(rate){
	if(isNaN(rate)){
		return '';
	}
	return parseFloat(rate*100.0).toFixed(2);
}
/**
 * 判断参数是否为空
 * @param paramValue
 */
function isBlank(param){
	var flag = false;
	if(param == "" || param == null || param == undefined){
		flag = true;
	}
	return flag;
}

/**
 * 处理错误信息
 * @param msg
 */
function dealErrorMsg(msg){
	//alert(msg);
	if(msg == "登录链接已超时，请重新登录."){
		top.location.href = $("#basePath").val()+"/security/signin.htm"
	}
}

/**
 * 显示遮罩
 */
function maskPop(){
	var maskDiv = '<div class="mask-pop"></div>';
	$('body').append(maskDiv);
	$('.mask-pop').show();
}

/**
 * 隐藏遮罩
 */
function unMaskPop(){
	var maskDiv = '<div class="mask-pop"></div>';
	$('body').append(maskDiv);
	$('.mask-pop').hide();
}

/**
 * 通过正则表达式获取URL传递参数
 * @param name
 * @returns
 */
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

/**
 * 通过正则表达式获取按钮菜单URL传递参数
 * @param url
 * @param name
 * @returns
 */
function getMenuUrl(url,name) {
	if(isBlank(url)){
		return null;
	}
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = url.substr(url.lastIndexOf("/")+1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * jquery URL传递 暂时没有
 * @param key
 * @returns
 */
function getUrlParam(key) {
	var json = {}, data;
	$.each(location.search.substr(1).split("&"), function(i, n) {
		data = n.split("=");
		json[data[0]] = data[1];
	});
	return key != undefined ? json[key] : json;
}

/**
 * 按钮权限控制
 */
function showPermissionControl(){
	//获取menuCode
	var url = $("#basePath").val() + "/menu/list";
	var webUrl = window.location.pathname;
	var menuUrl = webUrl.substring($("#basePath").val().length);
	var data = {"url":menuUrl};
	//var data = {"url":menuUrl,"kind":getCurrentKind()};
	//doGetAjaxIsAsync(url, data, false, doGetMenuCode);
	
	//直接从url获取menuCode，二级页面返回，权限控制不了
    var pUrl = $("#basePath").val() + "/role/menuList";
    if (window.parent.frames[1]) {
    	var pData = {"parentCode":$('.left-menu .active', window.parent.frames[1].document).attr('id'),"type":"2"};
    	doGetAjaxIsAsync(pUrl, pData, false, doSuccessBackPermission);
    }
}

//获取菜单编号回执方法
function doGetMenuCode(res){
	if(res.success == true && !isBlank(res.data)){
		$("#permissionCode").val(res.data[0].code);
	}else{
		//alert("获取菜单编号失败,权限不受控制!");
	}
}

//控制按钮呈现方式回执方法
function doSuccessBackPermission(res){
	var data = res.data;
	if(typeof(data) != "undefined"){//判断undifined
		for(var i = 0;i < data.length;i++){
			var menuUrl = data[i].url;
			menuUrl = menuUrl.substr(menuUrl.lastIndexOf("/")+1)
			$("#"+menuUrl+"Btn").show();
		}
	}
}
function myShowModalDialog(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
        window.open(url, "newwindow", paramsChrome);
    }
    else {
        var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;dialogLeft:'
                    + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
        var tempReturnValue = window.showModalDialog(url, "", params);
        fn.call(window, tempReturnValue);
    }
}
function myReturnValue(value) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.opener.returnCallBackValue354865588.call(window.opener, value);
    }
    else {
        window.returnValue = value;
    }
}

function openWindow(url,name,iWidth,iHeight)
{
	 var url;                                 //转向网页的地址;
	 var name;                           //网页名称，可为空;
	 var iWidth;                          //弹出窗口的宽度;
	 var iHeight;                        //弹出窗口的高度;
	 var iTop = (window.screen.availHeight-30-iHeight)/2;       //获得窗口的垂直位置;
	 var iLeft = (window.screen.availWidth-10-iWidth)/2;           //获得窗口的水平位置;
	 window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

// 扩展方法
$.fn.serializeObject = function() {
	 var o = {};
	 var a = this.serializeArray();
	 $.each(a, function() {
	 if (o[this.name] !== undefined) {
	 if (!o[this.name].push) {
	 o[this.name] = [o[this.name]];
	}
	 o[this.name].push(this.value || '');
	 } else {
	 o[this.name] = this.value || '';
	}
	});
	 return o;
};

$.fn.renderDropdown = function(data, keyName, valueName, defaultOption) {
	data = data || [];
	keyName = keyName || 'dkey';
	valueName = valueName || 'dvalue';
	var html = "<option value=''>请选择</option>" + (defaultOption || '');
	for(var i = 0;i < data.length;i++){
		html += "<option value='"+data[i][keyName]+"'>"+data[i][valueName]+"</option>";
	}
	this.html(html);
};

function renderLink(link, name) {
	return '<a href="'+link+'" target="_blank">'+name+'</a>';
}

// array

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

Array.prototype.each = function(fn){  
    fn = fn || Function.K;  
     var a = [];  
     var args = Array.prototype.slice.call(arguments, 1);  
     for(var i = 0; i < this.length; i++){  
         var res = fn.apply(this,[this[i],i].concat(args));  
         if(res != null) a.push(res);  
     }  
     return a;  
};  

Array.prototype.uniquelize = function(){  
    var ra = new Array();  
    for(var i = 0; i < this.length; i ++){  
        if(!ra.contains(this[i])){  
           ra.push(this[i]);  
        }  
    }  
    return ra;  
};  

Array.complement = function(a, b){  
    return Array.minus(Array.union(a, b),Array.intersect(a, b));  
};  

Array.intersect = function(a, b){  
    return a.uniquelize().each(function(o){return b.contains(o) ? o : null});  
};  

Array.minus = function(a, b){  
    return a.uniquelize().each(function(o){return b.contains(o) ? null : o});  
}; 

Array.union = function(a, b){  
    return a.concat(b).uniquelize();  
};  

//面包屑
setTimeout(function() {
	var topTitle = $('.nav .selected h2', window.parent.frames[0].document).text();
	var leftFirstTitle = $('.left-menu .active', window.parent.frames[1].document).parent().parent().find('.title').text();
	var leftSecondTitle = $('.left-menu .active', window.parent.frames[1].document).text();
	var html = '<li>'+topTitle+'</li><li>'+leftFirstTitle+'</li><li>'+leftSecondTitle+'</li>';
	var BtnTitle = localStorage.getItem('syj-btn');
	localStorage.setItem('syj-btn', '');
	if (BtnTitle) {
		html += '<li>'+BtnTitle+'</li>';
	}
	$('.place ul').html(html);
}, 1);

$(document).on('click', '.toolbar li[id*=Btn]', function(e) {
	var text = $(this).text();
	localStorage.setItem('syj-btn', text);
});