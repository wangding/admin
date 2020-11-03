/* global app: true */
/* exported $footer */
var $footer = (function() {
  var $dom = $(''
      + '<div class="admin-app-footer">'
        + '<p class="copyright">'
        + '2017©<a href="https://i.wangding.co">王顶</a>'
        + '</p>'
      + '</div>');

  function show() {
    var $container = $(app.config.appContainer);

    $container.append($dom);
  }
  
  return {show: show};
})();
