/* global app: true */
/* exported $login */
var $login = function() {
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

  function onSubmit(e) {
		var $userName = $loginDOM.find('input[name="userName"]'),
				$password = $loginDOM.find('input[name="password"]');
		
		var userName = $userName.val(),
				password = $password.val();

    e.preventDefault();
		if(userName === '' || password === '') return;
		
		fetch(app.config.apiURL + '/user/login', {
			method: 'POST', 
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			body: `userName=${userName}&password=${password}` 
		}).then(async (res) => {
			var rs = await res.json();
			if(rs.code !== 0) {
				alert(rs.msg);
				return;
			}
			
			localStorage.setItem('token', rs.data);
			$userName.val('');
			$password.val('');
			location.hash = '#/index';
		});
  }

  function show() {
    var $container = $(app.config.appContainer);

    $container.html('');
    $container.append($loginDOM);

    $form.submit(onSubmit);
  }
  
  return {show: show};
}();
