$(function() {
  window.onhashchange = function() {
    if(location.hash === '#/logout') $login.show({'container': '#admin-app'});
    $stage.load(location.hash);
  };

  $header.show({
    'title': app.config.headerTitle,
    'logo': app.config.headerLogo
  });
  $menu.show();
  $footer.show();
  $stage.show();
});
