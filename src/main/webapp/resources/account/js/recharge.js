//订单状态
var orderStatus = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//页面数据字典初始化
	$("#status").renderDropdown(Dict.getName('recharge_status'));
//	doGetAjaxIsAsync($("#dictUrl").val(), {"parentKey": 'withdraw_status'}, false, function(res) {
//		var data = res.data || [], filterData = [];
//		for (var i = 0, len = data.length; i < len; i++) {
//			if(data[i].dkey == 1 || data[i].dkey == 2||data[i].dkey == 3 || data[i].dkey == 4) {
//				filterData.push(data[i]);
//			}
//		}
//		$('#status').renderDropdown(filterData);
//	});
	
	// 表格初始化
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/rechargeOrderPage"});
	});
	
	//申请事件绑定
	$('#applyBtn').click(function(){
		location.href = $("#basePath").val()+"/account/recharge_apply.htm";
	});
	
	// 审核事件绑定
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/recharge_approve.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber+"&rechargeType=01";
	});
	
//	// 详情事件绑定
//	$('#detailBtn').click(function() {
//		var selRecords = $('#tableList').bootstrapTable('getSelections');
//		if(selRecords.length <= 0){
//			alert("请选择记录");
//			return;
//		}
//		location.href = $("#basePath").val()+"/account/recharge_detail.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber+"&rechargeType=01";
//	});
	
	// 查看详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/account/recharge_detail.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber+"&rechargeType=01&rechargeStatus=normal";
	});
	
	//导出
	$('#exportBtn').click(function() {
		var url=$("#basePath").val()+"/account/recWith/list/export?cqNo="+$("#cqNoSearch").val()+"&mobile="+$("#mobileSearch").val()+"&realName="+$("#realNameSearch").val()+"&direction=1"+"&status=1"+"&channel=01"+"&dateStart="+$("#dateStartSearch").val()+"&dateEnd="+$("#dateEndSearch").val()+"&fileName=线下充值列表";
		window.open(url);
	});
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/rechargeOrderPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		sortName : 'createDatetime',
		sortOrder : 'desc',
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				//mobile : $("#mobileSearch").val(),
				//realName : $("#realNameSearch").val(),
				accountNumber : $("#accountNumberSearch").val(),
				status : $("#status").val(),
				channel : "01",//线下
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit,
				orderColumn : this.sortName,
				orderDir : this.sortOrder
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
			field : 'code',
			title : '订单编号',
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
			field : 'amount',
			title : '积分',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : moneyFormatter
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('recharge_status')
		},{
			field : 'createDatetime',
			title : '申请时间',
			align : 'left',
			valign : 'middle',
			sortable : true,
			formatter : dateFormatter
		},{
			field : 'approveNote',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : true,
		}]
	});
}

//数据字典（对方系统）关联的回执方法
function doSucBackStatus(res){
	orderStatus = res.data;
}
//状态转化
function statusFormatter(value, row) {
	for(var i = 0;i < orderStatus.length;i++){
		if(orderStatus[i].value == value){
			return orderStatus[i].remark;
		}
	}
}
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}
