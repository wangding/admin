var $storeListPanel = (function() {
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append('<h1>$storeListPanel</h1>');
  }

  return {show: show};
})();
