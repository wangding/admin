/* global app: true */
/* exported $login */
var $login = function() {
  var $loginDOM = $(''
      + '<div class="admin-app-login">'
        + '<h1>管理后台登录</h1>'
        + '<form>'
          + '<label>用户名</label>'
          + '<input type="text" autofocus><br>'
          + '<label>密　码</label>'
          + '<input type="password"><br>'
          + '<label>验证码</label>'
          + '<input type="text"><br>'
          + '<input type="submit" value="登 录">'
        + '</form>'
      + '</div>');

  var $form = $loginDOM.find('form');

  function onSubmit(e) {
    e.preventDefault();
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
