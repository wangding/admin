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

  function show(cfg) {
    $(cfg.container).html('');
    $(cfg.container).append($loginDOM);
  }

  $form.submit(function(e) {
    e.preventDefault();
    window.location.href = window.location.origin;
  });
  
  return {show: show};
}();
