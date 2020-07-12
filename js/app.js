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
