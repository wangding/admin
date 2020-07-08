/* global app: true */
/* exported $administratorPanel */
var $administratorPanel = (function() {
  var $panelDOM = $(''
      + '<div class="administrator-panel">'
        + '<h1>administratorPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();