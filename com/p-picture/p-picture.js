/* global app: true */
/* exported $picturePanel */
var $picturePanel = (function() {
  var $panelDOM = $(''
      + '<div class="picture-panel">'
        + '<h1>picturePannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();