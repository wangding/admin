var $changePasswordPanel = (function() {
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append('<h1>$changePasswordPanel</h1>');
  }

  return {show: show};
})();
