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

  var $title = $header.find('.title h1'),
    $account = $header.find('.account'),
    $accountMenu = $header.find('.account-menu'),
    $arrow = $header.find('.icon-arrowdown'),
    $logo = $header.find('.account .logo');

  $account.mouseover(function() {
    $arrow.removeClass('icon-arrowdown');
    $arrow.addClass('icon-arrowup');
    $accountMenu.css('display', 'block');
  });

  $account.mouseout(function() {
    $arrow.removeClass('icon-arrowup');
    $arrow.addClass('icon-arrowdown');
    $accountMenu.css('display', 'none');
  });

  $accountMenu.click(function() {
    location.hash = '#/logout';
  });

  function show(cfg) {
    $title.html(cfg.title);
    $logo.css('background-image', cfg.logo);
    $(app.config.appContainer).append($header);
  }
  
  return {show: show};
}();
