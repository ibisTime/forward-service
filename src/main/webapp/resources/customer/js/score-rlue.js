var dictLevel=null;
//页面初始化
$(function(){
	//按钮权限判断
	showPermissionControl();
	//表格初始化
	queryTableData();
	
	$('#firsterweiBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/firsterwei.htm?userId="+selRecords[0].userId;
	});
	
	$('#seconderweiBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		window.location.href = $("#basePath").val()+"/customer/seconderwei.htm?userId="+selRecords[0].userId;
	});
	//window.location.href = "http://121.43.101.148:8067/xn-mall-appms/m/user/register.html?u="+selRecords[0].userId;
	
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/customer/jifenPage"});
	});
	
	//代注册
	$('#replaceAddBtn').click(function() {
		location.href = $("#basePath").val()+"/customer/jifen_replaceadd.htm";
	});
	
	//表格初始化
	function queryTableData(){
		var columns = [{
				field : '',
				title : '',
				align : 'left',
				valign : 'middle',
				checkbox : true
			},{
				field : 'mobile',
				title : '手机号',
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
				field : 'updateDatetime',
				title : '更新时间',
				align : 'left',
				valign : 'middle',
				formatter:dateFormatter,
				sortable : false
			},{
				field : 'status',
				title : '状态',
				align : 'left',
				valign : 'middle',
				formatter: Dict.getUserStatusName,
				sortable : false
		    }];
		
		$('#tableList').bootstrapTable({
			method : "get",
			url : $("#basePath").val()+"/customer/jifenPage",
			height : $(window).height() - 180,
			striped : true,
			clickToSelect : true,
			singleSelect : true,
			queryParams : function(params) {
				return {
					mobile : $("#mobile").val(),
//					realName : $("#realName").val(),
					userReferee : $("#userReferee").val(),
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
})

//表格时间格式转化
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}

