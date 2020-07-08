/* global layui, layer: true */ 
$(function() {
  const apiURL = 'http://192.168.133.144:3000/api';

	const $addDlg = $(''
		+ '<div class="layer-add">'
				+ '<div class="layui-form margin-set">'
						+ '<div class="layui-form-item">'
								+ '<label class="layui-form-label required">作者名：</label>'
								+ '<div class="layui-input-block">'
										+ '<input type="text" name="authorName" lay-verify="required" lay-reqtext="作者名不能为空" placeholder="请输入作者名" value="" class="layui-input">'
								+ '</div>'
						+ '</div>'
				+ '</div>'
		+ '</div>');

  layui.use(['form', 'table', 'layer'], function(){
    var table = layui.table,
				form  = layui.form;
    
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
			,url: apiURL + '/author' //数据接口
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
				, url: apiURL + '/author/' + result.authorName
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
				var layer = layui.layer;
				
        layer.confirm('真的删除行么？', function(index) {
          obj.del(); // 删除对应行的 DOM 结构，并更新缓存
          layer.close(index); 
          fetch(apiURL + '/author/' + data.id, {method: 'DELETE'});
        });
      } else if(layEvent === 'edit'){ // 编辑
				var layer = layui.layer,
				    newName = '';
						
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
						
						fetch(apiURL + '/author/' + data.id, {
							method: 'PUT', 
							headers: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							body: 'authorName=' + newName
						});
						
						$authorName.val('');
						$addDlg.remove(); 
						layer.close(index);
						
						// 同步更新缓存对应的值
						obj.update({
						  author_name: newName,
						  update_time: app.formateDateTime(Date.now())
						});
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
				var layer = layui.layer;
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
						
						fetch(apiURL + '/author', {
							method: 'POST', 
							headers: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							body: 'authorName=' + $authorName.val()
						});
						
						$authorName.val('');
						$addDlg.remove(); 
						layer.close(index);
					},
					cancel: function() { $addDlg.remove(); }
				});
      } else if(layEvent === 'delete') {  // 批量删除
        var checkStatus = table.checkStatus('authorTable')
          , data = checkStatus.data;
				
				if(data.length > 0) {
					let ids = data.map((item) => { return item.id}).join(',');
					fetch(apiURL + '/author/' + ids, {method: 'DELETE'}).then(() => {
						table.reload('authorTable', {page: {curr: obj.config.page.curr}});						
					});
				}
      }
    });
  });
});