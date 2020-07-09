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
}

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
  },
  {
    title: '管理员账户',
    url: '!/administrator'
  }]
}, {
  title: '网站管理',
  icon: 'icon-mendianguanli',
  items: [{
    title: '轮播管理',
    url: '!/banner'
  },
  {
    title: '分类管理',
    url: '!/tag'
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
  },
  {
    title: '分页设置',
    url: '!/page-conf'
  }]
}];
