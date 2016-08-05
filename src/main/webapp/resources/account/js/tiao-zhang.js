//订单状态
var rBorderStatus = null;
//方向
var accountDirection = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#statusSearch').renderDropdown(Dict.getName('rb_order_status'));
	$('#directionSearch').renderDropdown(Dict.getName('account_direction'));
	// 状态选择
//	$("#statusSearch").val("1");
	
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val() + "/account/redBlueOrderPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
//		sortName : 'updateDatetime',
//		sortOrder : 'desc',
		queryParams : function(params) {
			return {
				code : $("#code").val(),
				status : $("#statusSearch").val(),
				direction : $("#directionSearch").val(),
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
				accountNumber : $("#accountNumberSearch").val(),
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
			title : '申请编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'accountNumber',
			title : '账户编号',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('rb_order_status')
		}, {
			field : 'direction',
			title : '方向',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('account_direction')
		}, {
			field : 'amount',
			title : '积分',
			align : 'right',
			valign : 'middle',
			sortable : true,
			formatter : moneyFormat
		}, {
			field : 'applyUser',
			title : '申请人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'applyDatetime',
			title : '更新时间',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : dateTimeFormat
		}, {
			field : 'remark',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false,
			visible : false
		}]
	});

	// 查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val() + "/account/redBlueOrderPage"});
	});
	
	// 审核
	$('#checkApproveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/check_approve.htm?code="+selRecords[0].code;
	});
});