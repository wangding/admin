/* global app: true */
/* exported $chapterPanel */
var $chapterPanel = (function() {
  var $panelDOM = $(''
      + '<div class="chapter-panel">'
        + '<h1>chapterPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();