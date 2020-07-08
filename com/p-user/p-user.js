/* global app: true */
/* exported $userPanel */
var $userPanel = (function() {
  var $panelDOM = $(''
      + '<div class="user-panel">'
        + '<h1>userPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();