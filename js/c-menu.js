var $menu = function() {
  function show(cfg) {
    $(cfg.container).append($('<div class="admin-app-menu"></div>'));
  }
  
  return {show: show};
}();

