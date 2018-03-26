$(function() {
  window.onhashchange = function() {
    if(window.location.hash === '#/logout') window.location.href = 'login.html';
  };

  $header.show({'container': '#admin-app', 
    'title': app.config.headerTitle,
    'logo': app.config.headerLogo});
  $menu.show({'container': '#admin-app'});
  $footer.show({'container': '#admin-app'});
  $stage.show({'container': '#admin-app'});
});
