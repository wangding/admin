/* global app: true */
/* exported $messagePanel */
var $messagePanel = (function() {
  var $panelDOM = $(''
      + '<div class="message-panel">'
        + '<h1>messagePannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();