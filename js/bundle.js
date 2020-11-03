/* global app $login $header $menu $footer $stage: true */
$(function() {
  window.onhashchange = function() {
    if(location.hash === '#/login') {
      $login.show();
      sessionStorage.clear();
      $login.show();
      return;
    }

    var token = sessionStorage.getItem('token');
    if(location.hash === '#/index' && token !== null) {
      $(app.config.appContainer).html('');
      $header.show({ 'title': app.config.headerTitle });
      $menu.show();
      $footer.show();
      $stage.show();
      return;
    }

    if(token !== null) {
      $stage.load(location.hash);
      return;
    }
  };

  $login.show();
});

/* global axios, Promise: true */
var app = {};

/*
 * appName 暂时没用
 *
 * headerTitle 如果是汉字最多是 8 个汉字，
 *   如果是英文字母或者英文和中文混合，
 *   还没有测试多少个合适
 * 
 */

app.config = {
  appName: '管理后台',
  appContainer: '#admin-app',
  panelContainer: '.admin-app-stage',
  headerTitle: '管理后台',
  apiURL: 'http://192.168.133.144:3000/api'
};

app.formateDateTime = function(d) {
  let dt = new Date(d);

  let date = dt.toISOString().substr(0, 10),
      time = dt.toTimeString().substr(0, 8);

  return date + ' ' + time;
};

app.axios = axios.create();

app.axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
}, (err) => {
  return Promise.reject(err);
});

app.axios.interceptors.response.use((response) => {
  if (response.data.code === 40001) {
    location.hash = '#/login';
  }
  return response;
}, (error) => {
  return Promise.reject(error.response.status);
});

/* menuData 是左侧菜单栏数据，
 *   菜单栏只支持二级菜单
 */
app.menuData = [{
  title: '书籍管理',
  icon: 'icon-mendianguanli',
  items: [{
    title: '区域管理',
    url: '!/area'
  }, {
    title: '作者管理',
    url: '!/author'
  }, {
    title: '分类管理',
    url: '!/tag'
  }, {
    title: '书籍管理',
    url: '!/book'
  }, {
    title: '章节管理',
    url: '!/chapter'
  }, {
    title: '图片管理',
    url: '!/picture'
  }]
}, {
  title: '账户管理',
  icon: 'icon-mendianguanli',
  items: [{
    title: '普通账户',
    url: '!/user'
  }, {
    title: '管理员账户',
    url: '!/administrator'
  }]
}, {
  title: '社交管理',
  icon: 'icon-mendianguanli',
  items: [{
    title: '留言管理',
    url: '!/message'
  }, {
    title: '评论管理',
    url: '!/comment'
  }]
}, {
  title: '系统设置',
  icon: 'icon-mendianguanli',
  items: [{
    title: '系统设置',
    url: '!/sys-conf'
  }, {
    title: '分页设置',
    url: '!/page-conf'
  }, {
    title: '轮播管理',
    url: '!/banner'
  }]
}];

/* global app: true */
/* exported $footer */
var $footer = (function() {
  var $dom = $(''
      + '<div class="admin-app-footer">'
        + '<p class="copyright">'
        + '2017©<a href="https://i.wangding.co">王顶</a>'
        + '</p>'
      + '</div>');

  function show() {
    var $container = $(app.config.appContainer);

    $container.append($dom);
  }
  
  return {show: show};
})();

/* global app: true */
/* exported $header */
var $header = function() {
  var $header = $(''
    + '<div class="admin-app-header">'
      + '<div class="title"><h1></h1></div>'
      + '<div class="account">'
        + '<div class="logo"></div>'
        + '<span>管理</span>'
        + '<i class="iconfont icon-arrowdown"></i>'
        + '<div class="account-menu">'
          + '<i class="iconfont icon-sign-out"></i>'
          + '<span>&nbsp;注销</span>'
        + '</div>'
      + '</div>'
    + '</div>');

  var $title       = $header.find('.title h1'),
      $account     = $header.find('.account'),
      $accountMenu = $header.find('.account-menu'),
      $arrow       = $header.find('.icon-arrowdown'),
      $logo        = $header.find('.account .logo');

  function onMouseOver() {
    $arrow.removeClass('icon-arrowdown');
    $arrow.addClass('icon-arrowup');
    $accountMenu.css('display', 'block');
  }

  function onMouseOut() {
    $arrow.removeClass('icon-arrowup');
    $arrow.addClass('icon-arrowdown');
    $accountMenu.css('display', 'none');
  }

  function onClick() {
    onMouseOut();
    location.hash = '#/login';
  }

  function show(cfg) {
    $title.html(cfg.title);
    $logo.css('background-image', cfg.logo);
    $(app.config.appContainer).append($header);

    $account.mouseover(onMouseOver);
    $account.mouseout(onMouseOut);
    $accountMenu.click(onClick);
  }
  
  return {show: show};
}();

/* global app: true */
/* exported $login */
var $login = function() {
  const apiURL = app.config.apiURL + '/user/login';
  var $loginDOM = $(''
      + '<div class="admin-app-login">'
        + '<h1>管理后台登录</h1>'
        + '<form>'
          + '<label>用户名</label>'
          + '<input name="userName" type="text" autofocus><br>'
          + '<label>密　码</label>'
          + '<input name="password" type="password"><br>'
          /*+ '<label>验证码</label>'
          + '<input type="text"><br>'*/
          + '<input type="submit" value="登 录">'
        + '</form>'
      + '</div>');

  var $form = $loginDOM.find('form');

  async function onSubmit(e) {
    var $userName = $loginDOM.find('input[name="userName"]'),
        $password = $loginDOM.find('input[name="password"]');

    var userName = $userName.val(),
        password = $password.val();

    e.preventDefault();
    if(userName === '' || password === '') return;

    var rs = await app.axios.post(apiURL, { userName, password });
    rs = rs.data;

    if(rs.code !== 0) {
      alert(rs.msg);
      return;
    }

    sessionStorage.setItem('token', rs.data);
    $userName.val('');
    $password.val('');
    location.hash = '#/index';
  }

  function show() {
    var $container = $(app.config.appContainer);

    $container.html('');
    $container.append($loginDOM);

    $form.submit(onSubmit);
  }
  
  return {show: show};
}();

/* global app: true */
/* exported $menu */
var $menu = function() {
  var $menuDOM = (function(menuData) {
    var $menu = $(''
      + '<div class="admin-app-menu">'
        + '<ul class="menu"></ul>'
      + '</div>');

    var $ul = $menu.find('.menu');

    menuData.forEach(function(e) {
      var $li = $('<li></li>');

      var $menuBar = $(''
        + '<div class="menu-bar">'
          + '<i class="iconfont ' + e.icon + '"></i>'
          + '<span>' + e.title + '</span>'
          + '<i class="iconfont icon-arrowdown"></i>'
        + '</div>');

      $li.append($menuBar);

      var $menuItems = $('<dl class="menu-items"></dl>');

      e.items.forEach(function(item) {
        var $item = $(''
          + '<dd class="menu-item" data-href="' + item.url + '">' 
            + item.title
          + '</dd>');

        $menuItems.append($item);
      });

      $li.append($menuItems);
      $ul.append($li);
    });

    return $menu;
  })(app.menuData);    

  var $menuBar        = $menuDOM.find('.menu-bar'),
      $menuItem       = $menuDOM.find('.menu-item'),
      $currentMenuBar = null,
      $currentMenu    = null;

  function onMenuBarClick(e) {
    var $menu      = $(e.currentTarget),
        arrowStyle = {'up': 'icon-arrowup', 'down': 'icon-arrowdown'};

    $menu.showArrow = function(style) {
      var $arrow = this.find('span+i');

      var cssClass = $arrow.hasClass(arrowStyle.up) ? arrowStyle.up : arrowStyle.down;
      $arrow.removeClass(cssClass);
      $arrow.addClass(style);
    };

    if($currentMenuBar === null) {
      $menu.showArrow(arrowStyle.up);
      $menu.next().css('display', 'block');
      $currentMenuBar = $menu;
    } else if($currentMenuBar.get(0) === $menu.get(0)) {
      $menu.showArrow(arrowStyle.down);
      $menu.next().css('display', 'none');
      $currentMenuBar = null;
    } else {
      $currentMenuBar.showArrow(arrowStyle.down);
      $currentMenuBar.next().css('display', 'none');
      $menu.showArrow(arrowStyle.up);
      $menu.next().css('display', 'block');
      $currentMenuBar = $menu;
    }
  }

  function onMenuItemClick(e) {
    var $menuItem = $(e.currentTarget);
    
    $menuItem.selectMenu = function(isSelected){
      if(isSelected) {
        this.css({'background': '#009688', 'color': 'white'});
      } else {
        this.css({'background': '#282e37', 'color': '#c2c2c2'});
      }
    };

    if($currentMenu === null) {
      $menuItem.selectMenu(true);
      $currentMenu = $menuItem;
    } else {
      $currentMenu.selectMenu(false);
      $menuItem.selectMenu(true);
      $currentMenu = $menuItem;
    }

    window.location.hash = $menuItem.attr('data-href');
  }

  function show() {
    $(app.config.appContainer).append($menuDOM);

    $menuBar.click(onMenuBarClick);
    $menuItem.click(onMenuItemClick);
  }
  
  return {show: show};
}();

/* global app: true */
/* exported $stage */
var $stage = function() {
  function show() {
    var $container = $(app.config.appContainer);
    
    $container.append($('<div class="admin-app-stage"></div>'));
  }
  
  /**
   * 将路由信息解析成 panel 对象的名称
   *
   * @param string router 路由字符串
   * @returns string panel 对象的名称
   */
  function getPanel(router) {
    var panel = router.replace(/-(.)/g, function(letter){
      return letter.toUpperCase();
    }).replace(/#!\//,'$')
      .replace(/-/g,'');

    return panel + 'Panel';
  }

  /**
   * 根据路由信息加载相应的面板
   *
   * @param router
   * @returns {undefined}
   */
  function load(router) {
    var panel = getPanel(router);
    //console.log(panel);
    //eval(panel + '.show({"container": ".admin-app-stage"});');
    window[panel].show();
  }

  return {show: show, load: load};
}();

/* test case

$stage.load('#/store-list');
$stage.load('#/store-list-abc');

*/

/* global app: true */
/* exported $administratorPanel */
var $administratorPanel = (function() {
  var $panelDOM = $(''
      + '<div class="administrator-panel">'
        + '<h1>administratorPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app, layui: true */
/* exported $areaPanel */
var $areaPanel = (() => {
  const apiURL = app.config.apiURL + '/areas/';
  const $panelDOM = $(''
    + '<div class="wd-search-block">'
       + '<form class="layui-form layui-form-pane" action="">'
           + '<div class="layui-form-item">'
               + '<div class="layui-inline">'
                   + '<label class="layui-form-label">区域名：</label>'
                   + '<div class="layui-input-inline">'
                       + '<input type="text" name="areaName" autocomplete="off" class="layui-input">'
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
                + '<label class="layui-form-label required">区域名：</label>'
                + '<div class="layui-input-block">'
                    + '<input type="text" name="areaName" lay-verify="required" lay-reqtext="区域名不能为空" placeholder="请输入区域名" value="" class="layui-input">'
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
        ,id: 'areaTable'
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
          ,{field: 'area_name', title: '区域名', minWidth: 180}
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
        table.reload('areaTable', {
          page: {
            curr: 1
          }
          , url: apiURL + result.areaName
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

          var $areaName = $addDlg.find('input[name="areaName"]');

          $areaName.val(data.area_name);

          layer.open({
            type: 1,
            title: '修改区域',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              if($areaName.val() === '') return;
              newName = $areaName.val();

              var rs = await app.axios.put(apiURL + data.id, { areaName: newName });
              rs = rs.data;
              layer.msg(rs.msg);

              if(rs.code === 0) {
                // 同步更新缓存对应的值
                obj.update({
                  area_name: newName,
                  update_time: app.formateDateTime(Date.now())
                });
              }

              $areaName.val('');
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
            title: '添加区域',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              var $areaName = $addDlg.find('input[name="areaName"]');
              var areaName = $areaName.val();

              if(areaName === '') return;

              var rs = await app.axios.post(apiURL, { areaName });
              rs = rs.data;
              layer.msg(rs.msg);

              $areaName.val('');
              $addDlg.remove();
              layer.close(index);
            },
            cancel: () => { $addDlg.remove(); }
          });
        } else if(layEvent === 'delete') {  // 批量删除
          layer.confirm('真的删除么？', async () => {
            var checkStatus = table.checkStatus('areaTable'),
                data = checkStatus.data;

            if(data.length === 0) return;

            let ids = data.map((item) => { return item.id; }).join(',');

            var rs = await app.axios.delete(apiURL + ids);
            rs = rs.data;
            table.reload('areaTable', {page: {curr: obj.config.page.curr}});
            layer.msg(rs.msg);
          });
        }
      });
    });
  }

  return {show: show};
})();

/* global app, layui: true */
/* exported $authorPanel */
var $authorPanel = (() => {
  const apiURL = app.config.apiURL + '/authors/';
  const $panelDOM = $(''
    + '<div class="wd-search-block">'
       + '<form class="layui-form layui-form-pane" action="">'
           + '<div class="layui-form-item">'
               + '<div class="layui-inline">'
                   + '<label class="layui-form-label">作者名：</label>'
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
        + '<div class="layui-form wd-search-block">'
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

    layui.use(['form', 'table', 'layer'], () => {
      var table = layui.table,
          form  = layui.form,
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
        ,headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
        ,page: true //开启分页
        ,cols: [[ //表头
          {type: 'checkbox', width: 50}
          ,{field: 'id', title: 'ID', width: 50}
          ,{field: 'author_name', title: '作者名', minWidth: 180}
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
        table.reload('authorTable', {
          page: {
            curr: 1
          }
          , url: apiURL + result.authorName
        }, 'data');

        return false;
      });

      table.on('tool(table)', (obj) => {
        //注：tool 是工具条事件名，table 是表格原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'book'){ // 查看该作者的所有漫画
          // do something
        } else if(layEvent === 'del'){ // 删除
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

          var $authorName = $addDlg.find('input[name="authorName"]');

          $authorName.val(data.author_name);

          layer.open({
            type: 1,
            title: '修改作者',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              if($authorName.val() === '') return;
              newName = $authorName.val();

              var rs = await app.axios.put(apiURL + data.id, { authorName: newName });
              rs = rs.data;
              layer.msg(rs.msg);

              if(rs.code === 0) {
                // 同步更新缓存对应的值
                obj.update({
                  author_name: newName,
                  update_time: app.formateDateTime(Date.now())
                });
              }

              $authorName.val('');
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
            title: '添加作者',
            resize: false,
            btn: '提交',
            area: ['550px', '170px'],
            content: $addDlg,
            yes: async (index) => {
              var $authorName = $addDlg.find('input[name="authorName"]');
              var authorName = $authorName.val();

              if(authorName === '') return;

              var rs = await app.axios.post(apiURL, { authorName });
              rs = rs.data;
              layer.msg(rs.msg);

              $authorName.val('');
              $addDlg.remove();
              layer.close(index);
            },
            cancel: () => { $addDlg.remove(); }
          });
        } else if(layEvent === 'delete') {  // 批量删除
          layer.confirm('真的删除么？', async () => {
            var checkStatus = table.checkStatus('authorTable'),
                data = checkStatus.data;

            if(data.length === 0) return;

            let ids = data.map((item) => { return item.id; }).join(',');

            var rs = await app.axios.delete(apiURL + ids);
            rs = rs.data;
            table.reload('authorTable', {page: {curr: obj.config.page.curr}});
            layer.msg(rs.msg);
          });
        }
      });
    });
  }

  return {show: show};
})();

/* global app: true */
/* exported $bannerPanel */
var $bannerPanel = (function() {
  var $panelDOM = $(''
      + '<div class="banner-panel">'
        + '<h1>bannerPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $bookPanel */
var $bookPanel = (function() {
  var $panelDOM = $(''
      + '<div class="book-panel">'
        + '<h1>bookPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $chapterPanel */
var $chapterPanel = (function() {
  var $panelDOM = $(''
      + '<div class="chapter-panel">'
        + '<h1>chapterPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $commentPanel */
var $commentPanel = (function() {
  var $panelDOM = $(''
      + '<div class="comment-panel">'
        + '<h1>commentPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $messagePanel */
var $messagePanel = (function() {
  var $panelDOM = $(''
      + '<div class="message-panel">'
        + '<h1>messagePannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $pageConfPanel */
var $pageConfPanel = (function() {
  var $panelDOM = $(''
      + '<div class="page-conf-panel">'
        + '<h1>pageConfPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $picturePanel */
var $picturePanel = (function() {
  var $panelDOM = $(''
      + '<div class="picture-panel">'
        + '<h1>picturePannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
/* global app: true */
/* exported $sysConfPanel */
var $sysConfPanel = (function() {
  var $panelDOM = $(''
      + '<div class="sys-conf-panel">'
        + '<h1>sysConfPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();
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

/* global app: true */
/* exported $userPanel */
var $userPanel = (function() {
  var $panelDOM = $(''
      + '<div class="user-panel">'
        + '<h1>userPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();