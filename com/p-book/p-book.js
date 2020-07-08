/* global app: true */
/* exported $bookPanel */
var $bookPanel = (function() {
  var $panelDOM = $(''
      + '<div class="book-panel">'
        + '<h1>bookPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();