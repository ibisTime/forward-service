//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
	
	$('#type').renderDropdown(Dict.getName('product_type'));
	$('#status').renderDropdown(Dict.getName('product_status'));
		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/product/page"});
	});
	
	//新增
	$('#addBtn').click(function() {
		window.location.href = $("#basePath").val()+"/product/tuihuo_addedit.htm";
	});
	
	//修改
//	$('#editBtn').click(function() {
//		var selRecords = $('#tableList').bootstrapTable('getSelections')
//		if(selRecords.length <= 0){
//			alert("请选择记录");
//			return;
//		}
//		window.location.href = $("#basePath").val()+"/product/tuihuo_addedit.htm?code="+selRecords[0].code;
//	});
	//详情
	$('#detailBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/product/tuihuo_detail.htm?code="+selRecords[0].code;
	});
	
	//审核
	$('#checkBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status!=0){
			alert("请选择待审核状态");
			return;
		}
		
		window.location.href = $("#basePath").val()+"/product/product_check.htm?code="+selRecords[0].code;

	});
	
});

//数据字典初始化




//表格初始化
function queryTableData(){
	var columns = [{
		field : '',
		title : '',
		align : 'left',
		valign : 'middle',
		checkbox : true
	}, {
		field : 'goodsCode',
		title : '货品编号',
		align : 'left',
		valign : 'middle',
		sortable : false,
	}, {
		field : 'price',
		title : '单价',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'quantity',
		title : '数量',
		align : 'left',
		valign : 'middle',
		sortable : false
	}, {
		field : 'status',
		title : '状态',
		align : 'left',
		valign : 'middle',
		sortable : false
		}, {
			field : 'applyUser',
			title : '申请人',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'applyDatetime',
			title : '申请时间',
			align : 'left',
			valign : 'middle',
			formatter:dateFormatter,
			sortable : false
		}, {
			field : 'applyNote',
			title : '申请备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}, {
			field : 'approveUser',
			title : '审核人',
			align : 'left',
			valign : 'middle',
			sortable : false,
		}, {
			field : 'approveDatetime',
			title : '审核时间',
			align : 'left',
			valign : 'middle',
			formatter:dateFormatter,
			sortable : false
		}, {
			field : 'approveNote',
			title : '审核备注',
			align : 'left',
			valign : 'middle',
			sortable : false
		}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/product/goods/page",
		 
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				type : $("#type").val(),
				name : $("#name").val(),
				status : $("#status").val(),
				updater : $("#updater").val(),
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
