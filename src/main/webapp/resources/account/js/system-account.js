var dictstatus=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//页面数据字典初始化
	$('#status').renderDropdown(Dict.getName('account_status'));
    
	//分页查询
	queryTableData();

	//详情菜单绑定事件
	$('#jourBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/account/account_jour.htm?accountNumber="+selRecords[0].accountNumber;
	});

	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/queryPage"});
	});
})
//表格初始化
function queryTableData(){
	//绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/queryPage",
		
		striped : true,
		singleSelect : true,
		clickToSelect : true,
		queryParams : function(params) {
			return {
			    accountNumber:$("#accountNumber").val(),
			    realName:$("#realName").val(),
			    status:$("#status").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data ? res.data.list : [],
				total : res.data ? res.data.totalCount : 0
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
				field : 'accountNumber',
				title : '账户编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'userId',
				title : '用户编号',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'realName',
				title : '真实姓名',
				align : 'left',
				valign : 'middle',
				sortable : false
			},{
				field : 'amount',
				title : '资金',
				align : 'left',
				valign : 'middle',
				formatter : moneyFormatter,
				sortable : false
			},{
				field : 'frozenAmount',
				title : '冻结积分',
				align : 'left',
				valign : 'middle',
				formatter : moneyFormatter,
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getNameForList('account_status'),
				sortable : false
			},{
				field : 'createDatetime',
				title : '创建时间',
				align : 'left',
				valign : 'middle',
				formatter: dateTimeFormat,
				sortable : false
			
		}]
		
	});
}
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
