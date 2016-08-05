//数据字典
var dictLevel = null;
$(function() {
	//按钮权限判断
	showPermissionControl();
		
	//表格初始化
	queryTableData();

	//查询
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/model/price/sure/page"});
	});
	
	//修改
	$('#editBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/product/price_edit.htm?code="+selRecords[0].code;
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
		field : 'toLevel',
		title : '分销商',
		formatter: function(v) {
			return (+v + 1) + '级分销商';
		}
	}, {
		field : 'modelName',
		title : '货品名称'
	}, {
		field : 'quantity',
		title : '数量'
	}, {
		field: 'price',
		title: '价格（积分数）',
		formatter: moneyFormat
	}, {
		field: 'remark',
		title: '备注'
	}];
	
	
	
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/model/price/sure/page",
		 
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				modelName : $("#modelName").val(),
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
