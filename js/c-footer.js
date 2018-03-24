var $footer = function() {
  function show(cfg) {
    $(cfg.container).append($('<div class="admin-app-footer"><p class="copyright">2017©中科佰融</p></div>'));
  }
  
  return {show: show};
}();
