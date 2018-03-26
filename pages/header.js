$(function() {
  var $account = $('.admin-app-header .account'),
    $accountMenu = $('.admin-app-header .account-menu'),
    $arrow = $('.admin-app-header .account .icon-arrowdown');
  
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
    window.location.hash = '#/logout';
  });

  window.onhashchange = function() {
    alert(window.location.hash);
  };
});
