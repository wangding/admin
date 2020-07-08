/* global app: true */
/* exported $bannerPanel */
var $bannerPanel = (function() {
  var $panelDOM = $(''
      + '<div class="banner-panel">'
        + '<h1>bannerPannel</h1>'
      + '</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($panelDOM);

    // event listen
  }

  return {show: show};
})();