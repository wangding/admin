var $stage = function() {
  function show(cfg) {
    $(cfg.container).append($('<div class="admin-app-stage"></div>'));
  }
  
  return {show: show};
}();
