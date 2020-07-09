/* global app, layui, layer: true */
/* exported $authorPanel */
var $authorPanel = (function() {
	const apiURL = app.config.apiURL + '/authors/';
	const $panelDOM = $(''
		+ '<div class="wd-margin-set">'
			 + '<form class="layui-form layui-form-pane" action="">'
					 + '<div class="layui-form-item">'
							 + '<div class="layui-inline">'
									 + '<label class="layui-form-label">作者姓名</label>'
									 + '<div class="layui-input-inline">'
											 + '<input type="text" name="authorName" autocomplete="off" class="layui-input">'
									 + '</div>'
							 + '</div>'
							 + '<div class="layui-inline">'
									 + '<button type="submit" class="layui-btn layui-btn-primary"  lay-submit lay-filter="data-search-btn"><i class="layui-icon"></i> 搜 索</button>'
							 + '</div>'
					 + '</div>'
			 + '</form>'
		+ '</div>'
		+ ''
		+ '<table id="table-data" lay-filter="table"></table>'
		+ '<script type="text/html" id="headToolbar">'
				+ '<div class="layui-btn-container">'
						+ '<button class="layui-btn layui-btn-normal layui-btn-sm data-add-btn" lay-event="add"> 添加 </button>'
						+ '<button class="layui-btn layui-btn-sm layui-btn-danger data-delete-btn" lay-event="delete"> 删除 </button>'
				+ '</div>'
		+ '</script>'
		+ '<script type="text/html" id="currentTableBar">'
		+ '<a class="layui-btn layui-btn-normal layui-btn-xs data-count-edit" lay-event="book">查看作品</a>'
		+ '<a class="layui-btn layui-btn-normal layui-btn-xs data-count-edit" lay-event="edit">编辑</a>'
		+ '<a class="layui-btn layui-btn-xs layui-btn-danger data-count-delete" lay-event="del">删除</a>'
		+ '</script>');

	const $addDlg = $(''
		+ '<div class="layer-add">'
				+ '<div class="layui-form wd-margin-set">'
						+ '<div class="layui-form-item">'
								+ '<label class="layui-form-label required">作者名：</label>'
								+ '<div class="layui-input-block">'
										+ '<input type="text" name="authorName" lay-verify="required" lay-reqtext="作者名不能为空" placeholder="请输入作者名" value="" class="layui-input">'
								+ '</div>'
						+ '</div>'
				+ '</div>'
		+ '</div>');

	function show() {
	  $(app.config.panelContainer).html('');
	  $(app.config.panelContainer).append($panelDOM);
	
		layui.use(['form', 'table', 'layer'], function(){
			var table = layui.table,
					form  = layui.form
					layer = layui.layer;
			
			table.render({
				elem: '#table-data'
				,id: 'authorTable'
				,limits: 10
				,toolbar: '#headToolbar'
				,defaultToolbar: ['filter', 'exports', 'print', {
						title: '提示',
						layEvent: 'LAYTABLE_TIPS',
						icon: 'layui-icon-tips'
				}]
				,url: apiURL //数据接口
				,headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
				,page: true //开启分页
				,cols: [[ //表头
					{type: 'checkbox', width: 50}
					,{field: 'id', title: 'ID', width: 50}
					,{field: 'author_name', title: '作者名', minWidth: 180}
					,{field: 'create_time', title: '创建时间', width: 180}
					,{field: 'update_time', title: '修改时间', width: 180} 
					,{title: '操作', width: 200, toolbar: '#currentTableBar', align: 'center'}
				]]
			});
		
			form.on('submit(data-search-btn)', function (data) {	
				var result = data.field;
		
				//执行搜索重载
				table.reload('authorTable', {
					page: {
						curr: 1
					}
					, url: apiURL + result.authorName
				}, 'data');
		
				return false;
			});
					
			table.on('tool(table)', function(obj){ 
				//注：tool 是工具条事件名，table 是表格原始容器的属性 lay-filter="对应的值"
				var data = obj.data; //获得当前行数据
				var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
				if(layEvent === 'book'){ // 查看该作者的所有漫画
					// do something
				} else if(layEvent === 'del'){ // 删除	
					layer.confirm('真的删除么？', function(index) {
						obj.del(); // 删除对应行的 DOM 结构，并更新缓存
						layer.close(index); 
						var token = localStorage.getItem('token');
						fetch(apiURL + data.id, {
							method: 'DELETE',
							headers: { 'Authorization': `Bearer ${token}` }
						}).then(async (res) => {
							var rs = await res.json();
							layer.msg(rs.msg);
						});
					});
				} else if(layEvent === 'edit'){ // 编辑
					var newName = '';
							
					$('body').append($addDlg);
					
					var $authorName = $addDlg.find('input[name="authorName"]');			
					$authorName.val(data.author_name);
					
					layer.open({
						type: 1,
						title: '修改作者',
						resize: false,
						btn: '提交',
						area: ['550px', '170px'],
						content: $addDlg,
						yes: function(index) { 			
							if($authorName.val() === '') return;
							newName = $authorName.val();
							var token = localStorage.getItem('token');
							fetch(apiURL + data.id, {
								method: 'PUT', 
								headers: {
									'content-type': 'application/x-www-form-urlencoded',
									'Authorization': `Bearer ${token}`
								},
								body: 'authorName=' + newName
							}).then(async (res) => {
								var rs = await res.json();
								layer.msg(rs.msg);
								
								if(rs.code === 0) {
									// 同步更新缓存对应的值
									obj.update({
										author_name: newName,
										update_time: app.formateDateTime(Date.now())
									});
								}						
							});	
							
							$authorName.val('');
							$addDlg.remove(); 
							layer.close(index);													
						},
						cancel: function() { $addDlg.remove(); }
					});		
				} else if(layEvent === 'LAYTABLE_TIPS'){
					layer.alert('Hi，头部工具栏扩展的右侧图标。');
				}
			});
		
			table.on('toolbar(table)', function(obj){ 
				var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
				if(layEvent === 'add') {  // 增加
					$('body').append($addDlg);
					
					layer.open({
						type: 1,
						title: '添加作者',
						resize: false,
						btn: '提交',
						area: ['550px', '170px'],
						content: $addDlg,
						yes: function(index) { 
							var $authorName = $addDlg.find('input[name="authorName"]');
							
							if($authorName.val() === '') return;
							
							var token = localStorage.getItem('token');
							fetch(apiURL, {
								method: 'POST', 
								headers: {
									'content-type': 'application/x-www-form-urlencoded',
									'Authorization': `Bearer ${token}`
								},
								body: 'authorName=' + $authorName.val()
							}).then(async (res) => {
								var rs = await res.json();
								layer.msg(rs.msg);
							});
							
							$authorName.val('');
							$addDlg.remove(); 
							layer.close(index);
						},
						cancel: function() { $addDlg.remove(); }
					});
				} else if(layEvent === 'delete') {  // 批量删除
					layer.confirm('真的删除么？', function(index) {
						var checkStatus = table.checkStatus('authorTable'),
							  data = checkStatus.data;
						
						if(data.length === 0) return;
						
						let ids = data.map((item) => { return item.id}).join(',');
						var token = localStorage.getItem('token');
						fetch(apiURL + ids, {
							method: 'DELETE',
							headers: {'Authorization': `Bearer ${token}`}
						}).then(async (res) => {
							table.reload('authorTable', {page: {curr: obj.config.page.curr}});	
							var rs = await res.json();
							layer.msg(rs.msg);
						});
					});	
				}
			});
		});
	}
	
	return {show: show};
})();