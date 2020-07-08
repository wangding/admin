/* global app: true */
/* exported $tagPanel */
var $tagPanel = (function() {
  var $panelDOM = $(''
      + '<div class="tag-panel">'
        + '<h1>tagPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();