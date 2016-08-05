//订单状态
var orderStatus = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	//页面数据字典初始化
	$("#status").renderDropdown(Dict.getName('recharge_status'));
	//$("#status option[value='1']").attr("selected","selected");
	$('#status').val('1');
	
	// 表格初始化
	queryTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/applyRechargeOrderPage"});
	});
	
	//申请事件绑定
	$('#applyBtn').click(function(){
		location.href = $("#basePath").val()+"/account/shangjia_apply.htm";
	});
	
	// 查看详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		location.href = $("#basePath").val()+"/account/recharge_detail.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber+"&rechargeType=01&rechargeStatus=normal";
	});
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/applyRechargeOrderPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		sortName : 'createDatetime',
		sortOrder : 'desc',
		queryParams : function(params) {
			return {
				status : $("#status").val(),
				//dateStart : $("#dateStartSearch").val(),
				//dateEnd : $("#dateEndSearch").val(),
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
			field : 'amount',
			title : '积分',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : moneyFormatter
		},{
			field : 'price',
			title : '价格',
			align : 'left',
			valign : 'middle',
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
			sortable : false,
			formatter : dateFormatter
		},{
			field : 'applyNote',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}]
	});
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}

//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}