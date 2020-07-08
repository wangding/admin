/* global app: true */
/* exported $sysConfPanel */
var $sysConfPanel = (function() {
  var $panelDOM = $(''
      + '<div class="sys-conf-panel">'
        + '<h1>sysConfPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();