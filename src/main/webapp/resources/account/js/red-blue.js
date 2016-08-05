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
		sortName : 'updateDatetime',
		sortOrder : 'desc',
		queryParams : function(params) {
			return {
				accountNumber : $("#accountNumber").val(),
				status : $("#statusSearch").val(),
				direction : $("#directionSearch").val(),
				dateStart : $("#dateStartSearch").val(),
				dateEnd : $("#dateEndSearch").val(),
				type:2,
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
			formatter : moneyFormatter
		}, {
			field : 'applyUser',
			title : '申请人',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'applyNote',
			title : '申请说明',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'approveNote',
			title : '备注',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}]
	});

	// 查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val() + "/account/redBlueOrderPage"});
	});
	
	// 申请
	$('#applyBtn').click(function() {
		location.href = $("#basePath").val()+"/account/red_blue_apply.htm";
	});
	
	// 审核
	$('#approveBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/red_blue_approve.htm?code="+selRecords[0].code;
	});
	
//	//导出
//	$('#exportBtn').click(function() {
//		var url=$("#basePath").val()+"/account/redBlue/list/export?hlNo="+$("#hlNoSearch").val()+"&mobile="+$("#mobileSearch").val()+"&realName="+$("#realNameSearch").val()+
//		"&accountNumber="+$("#accountNumberSearch").val()+"&direction="+$("#directionSearch").val()+"&status="+$("#statusSearch").val()+"&applyUser="+$("#applyUserSearch").val()+"&dateStart="+$("#dateStartSearch").val()+"&dateEnd="+$("#dateEndSearch").val()+"&start="+"1"+"&limit="+"1000";
//        window.open(url);
//	});
});
//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}