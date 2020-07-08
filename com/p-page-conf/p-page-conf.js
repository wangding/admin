/* global app: true */
/* exported $pageConfPanel */
var $pageConfPanel = (function() {
  var $panelDOM = $(''
      + '<div class="page-conf-panel">'
        + '<h1>pageConfPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();