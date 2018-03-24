var $header = function() {
  function show(cfg) {
    $(cfg.container).append($('<div class="admin-app-header"></div>'));
  }
  
  return {show: show};
}();

