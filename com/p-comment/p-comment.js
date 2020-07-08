/* global app: true */
/* exported $commentPanel */
var $commentPanel = (function() {
  var $panelDOM = $(''
      + '<div class="comment-panel">'
        + '<h1>commentPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();