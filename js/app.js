/* global app $login $header $menu $footer $stage: true */
$(function() {
  window.onhashchange = function() {
    if(location.hash === '#/logout') {
      $login.show();
			localStorage.clear();
			$login.show();
			return;
    }
		
		var token = localStorage.getItem('token');
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
			// 验证 hash 不存在，有待完善
			return;
    }
  };
	
	$login.show();
});
