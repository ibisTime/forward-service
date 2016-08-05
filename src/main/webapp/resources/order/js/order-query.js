//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#status').renderDropdown(Dict.getName('order_status'));
	
		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/order/Page"});
	});
	
	//详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/order/order_detail.htm?invoiceCode="+selRecords[0].code;
	});
	
	//导出
	$('#exportBtn').click(function() {
		var url=$('#basePath').val()+'/model/export?loginName=' + $('#loginName').val() + 
		'&status=' + $('#status').val();
		window.open(url);
	});
	
});

//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'code',
		title : '发货单编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'loginName',
		title : '下单用户',
		align : 'left',
		valign : 'middle',
		sortable : false
	},{
		field : 'totalAmount',
		title : '总积分',
		align : 'left',
		valign : 'middle',
		formatter:moneyFormatter,
		sortable : false
	},{
		field : 'applyDatetime',
		title : '下单时间',
		align : 'left',
		valign : 'middle',
		formatter:dateFormatter,
		sortable : false
	} ,{
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		formatter:Dict.getNameForList('order_status'),
		sortable : false
	}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/model/order/Page",
		height : $(window).height() - 180,
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				loginName : $("#loginName").val(),
				dateStart : $("#deliveryDatetimeStart").val(),
				dateEnd : $("#deliveryDatetimeEnd").val(),
				status : $("#status").val(),
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
		columns : columns
	});
}

//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}