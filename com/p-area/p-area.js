/* global app: true */
/* exported $areaPanel */
var $areaPanel = (function() {
  function show() {
    var $container = $(app.config.panelContainer);

    $container.html('');
    $container.append('<h1>$areaPanel</h1>');
  }

  return {show: show};
})();
