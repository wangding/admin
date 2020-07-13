/* global app, layui: true */
/* exported $tagPanel */
var $tagPanel = (() => {
  const apiURL = app.config.apiURL + '/tags/';
  const $panelDOM = $(''
    + '<div class="wd-search-block">'
       + '<form class="layui-form layui-form-pane" action="">'
           + '<div class="layui-form-item">'
               + '<div class="layui-inline">'
                   + '<label class="layui-form-label">标签名：</label>'
                   + '<div class="layui-input-inline">'
                       + '<input type="text" name="tagName" autocomplete="off" class="layui-input">'
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
    + '<a class="layui-btn layui-btn-normal layui-btn-xs data-count-edit" lay-event="edit">编辑</a>'
    + '<a class="layui-btn layui-btn-xs layui-btn-danger data-count-delete" lay-event="del">删除</a>'
    + '</script>');

  const $addDlg = $(''
    + '<div class="layer-add">'
        + '<div class="layui-form wd-search-block">'
            + '<div class="layui-form-item">'
                + '<label class="layui-form-label required">标签名：</label>'
                + '<div class="layui-input-block">'
                    + '<input type="text" name="tagName" lay-verify="required" lay-reqtext="标签名不能为空" placeholder="请输入标签名" value="" class="layui-input">'
                + '</div>'
            + '</div>'
        + '</div>'
    + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    layui.use(['form', 'table', 'layer'], () => {
      var table = layui.table,
          form  = layui.form,
          layer = layui.layer;

      table.render({
        elem: '#table-data'
        ,id: 'tagTable'
        ,limits: 10
        ,toolbar: '#headToolbar'
        ,defaultToolbar: ['filter', 'exports', 'print', {
          title: '提示',
          layEvent: 'LAYTABLE_TIPS',
          icon: 'layui-icon-tips'
        }]
        ,url: apiURL //数据接口
        ,headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        ,page: true //开启分页
        ,cols: [[ //表头
          {type: 'checkbox', width: 50}
          ,{field: 'id', title: 'ID', width: 50}
          ,{field: 'tag_name', title: '标签名', minWidth: 180}
          ,{field: 'create_time', title: '创建时间', width: 180}
          ,{field: 'update_time', title: '修改时间', width: 180}
          ,{title: '操作', width: 200, toolbar: '#currentTableBar', align: 'center'}
        ]]
        ,done: async (res) => {
          if(res.code === 40001) {
            layer.msg(res.msg);
            location.hash = '#/login';
          }
        }
      });

      form.on('submit(data-search-btn)', (data) => {
        var result = data.field;

        //执行搜索重载
        table.reload('tagTable', {
          page: { curr: 1 }
          , url: apiURL + result.tagName
        }, 'data');

        return false;
      });

      table.on('tool(table)', (obj) => {
        //注：tool 是工具条事件名，table 是表格原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'del'){ // 删除
          layer.confirm('真的删除么？', async (index) => {
            obj.del(); // 删除对应行的 DOM 结构，并更新缓存
            layer.close(index);

            var rs = await app.axios.delete(apiURL + data.id);
            rs = rs.data;
            layer.msg(rs.msg);
          });
        } else if(layEvent === 'edit'){ // 编辑
          var newName = '';

          $('body').append($addDlg);

          var $tagName = $addDlg.find('input[name="tagName"]');

          $tagName.val(data.tag_name);

          layer.open({
            type: 1,
            title: '修改标签',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              if($tagName.val() === '') return;
              newName = $tagName.val();

              var rs = await app.axios.put(apiURL + data.id, { tagName: newName });
              rs = rs.data;
              layer.msg(rs.msg);

              if(rs.code === 0) {
                // 同步更新缓存对应的值
                obj.update({
                  tag_name: newName,
                  update_time: app.formateDateTime(Date.now())
                });
              }

              $tagName.val('');
              $addDlg.remove();
              layer.close(index);
            },
            cancel: () => { $addDlg.remove(); }
          });
        } else if(layEvent === 'LAYTABLE_TIPS'){
          layer.alert('Hi，头部工具栏扩展的右侧图标。');
        }
      });

      table.on('toolbar(table)', (obj) => {
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'add') {  // 增加
          $('body').append($addDlg);

          layer.open({
            type: 1,
            title: '添加标签',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              var $tagName = $addDlg.find('input[name="tagName"]');
              var tagName = $tagName.val();

              if(tagName === '') return;

              var rs = await app.axios.post(apiURL, { tagName });
              rs = rs.data;
              layer.msg(rs.msg);

              $tagName.val('');
              $addDlg.remove();
              layer.close(index);
            },
            cancel: () => { $addDlg.remove(); }
          });
        } else if(layEvent === 'delete') {  // 批量删除
          layer.confirm('真的删除么？', async () => {
            var checkStatus = table.checkStatus('tagTable'),
                data = checkStatus.data;

            if(data.length === 0) return;

            let ids = data.map((item) => { return item.id; }).join(',');

            var rs = await app.axios.delete(apiURL + ids);
            rs = rs.data;
            table.reload('tagTable', {page: {curr: obj.config.page.curr}});
            layer.msg(rs.msg);
          });
        }
      });
    });
  }

  return {show: show};
})();
