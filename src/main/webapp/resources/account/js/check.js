$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#statusSearch').renderDropdown(Dict.getName('jour_status'));
	$('#bizTypeSearch').renderDropdown(Dict.getName('biz_type'));
	$("#statusSearch").val("1");
	
	// 资金明细查询
	queryJourTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#jourTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/jourPage"});
	});
	
	// 审核事件绑定
	$('#checkBtn').click(function() {
		var selRecords = $('#jourTableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待对账状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/check_detail.htm?ajNo="+selRecords[0].ajNo;
	});
	
	$('#exportBtn').click(function() {
		var url=$("#basePath").val()+"/account/check/list/export?code="+$("#ajNoSearch").val()+"&accountNumber="+$("#accountNumberSearch").val()+"&status="+$("#statusSearch").val()+"&bizType="+$("#bizTypeSearch").val()+"&refNo="+$("#refNoSearch").val()+"&workDate="+$("#workDateSearch").val();
		window.open(url);
	});
});

//表格初始化
function queryJourTableData(){
	// 绑定列表
	$('#jourTableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/jourPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				ajNo : $("#ajNoSearch").val(),
				accountNumber : $("#accountNumberSearch").val(),
				status : $("#statusSearch").val(),
				bizType : $("#bizTypeSearch").val(),
				refNo : $("#refNoSearch").val(),
				workDate : $("#workDateSearch").val(),
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
		},{
			field : 'ajNo',
			title : '明细编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'accountNumber',
			title : '账户编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'bizType',
			title : '业务类型',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('biz_type')
		},{
			field : 'refNo',
			title : '相关单号',
			align : 'left',
			valign : 'middle',
			sortable : false
		},{
			field : 'transAmount',
			title : '变动积分',
			align : 'right',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormat
		}, {
			field : 'preAmount',
			title : '变动前积分',
			align : 'right',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormat
		}, {
			field : 'postAmount',
			title : '变动后积分',
			align : 'right',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormat
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('jour_status'),
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'workDate',
			title : '对账日期',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'createDatetime',
			title : '产生时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateTimeFormat
		}]
	});
}

//function initData(){
//	var data= {"key":"jour_status"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackJourStatus);
//	var data= {"key":"biz_type"};
//	doGetAjaxIsAsync($("#dictUrl").val(), data, false, doSucBackBizType);
//}
//数据字典关联的回执方法
function doSucBackJourStatus(res){
	dictJourStatus = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictJourStatus) != "undefined"){//判断undifined
		for(var i = 0;i < dictJourStatus.length;i++){
			html += "<option value='"+dictJourStatus[i].value+"'>"+dictJourStatus[i].remark+"</option>";
		}
	}
	$("#statusSearch").html(html);
}
//转化
function statusFormatter(value, row) {
	for(var i = 0;i < dictJourStatus.length;i++){
		if(dictJourStatus[i].value == value){
			return dictJourStatus[i].remark;
		}
	}
}

//数据字典关联的回执方法
function doSucBackBizType(res){
	dictBizType = res.data;
	var html = "<option value=''>请选择</option>";
	if(typeof(dictBizType) != "undefined"){//判断undifined
		for(var i = 0;i < dictBizType.length;i++){
			html += "<option value='"+dictBizType[i].value+"'>"+dictBizType[i].remark+"</option>";
		}
	}
	$("#bizTypeSearch").html(html);
}
//转化
function bizTypeFormatter(value, row) {
	for(var i = 0;i < dictBizType.length;i++){
		if(dictBizType[i].value == value){
			return dictBizType[i].remark;
		}
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

//是否成功转化
function isSuccessFormatter(value, row) {
	var isSuccessData =[{"key":"1","value":"成功"},{"key":"0","value":"失败"}];
	for(var i = 0;i < isSuccessData.length;i++){
		if(isSuccessData[i].key == value){
			return isSuccessData[i].value;
		}
	}
}