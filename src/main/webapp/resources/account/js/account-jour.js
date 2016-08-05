$(function() {
	$('#statusSearch').renderDropdown(Dict.getName('jour_status'));
	$('#bizTypeSearch').renderDropdown(Dict.getName('biz_type'));
	
	// 表格初始化
	$("#accountNumberSearch").val(getQueryString("accountNumber"));
	
	// 资金明细查询
	queryJourTableData();
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#jourTableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/jourPage"});
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
				accountNumber : $("#accountNumberSearch").val(),
				ajNo : $("#ajNoSearch").val(),
				status : $("#statusSearch").val(),
				refNo : $("#refNoSearch").val(),
				bizType : $("#bizTypeSearch").val(),
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
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('jour_status'),
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