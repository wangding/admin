/* global app: true */
/* exported $stage */
var $stage = function() {
  function show() {
    var $container = $(app.config.appContainer);
    
    $container.append($('<div class="admin-app-stage"></div>'));
  }
  
  /**
   * 将路由信息解析成 panel 对象的名称
   *
   * @param string router 路由字符串
   * @returns string panel 对象的名称
   */
  function getPanel(router) {
    var panel = router.replace(/-(.)/g, function(letter){
      return letter.toUpperCase();
    }).replace(/#!\//,'$')
      .replace(/-/g,'');

    return panel + 'Panel';
  }

  /**
   * 根据路由信息加载相应的面板
   *
   * @param router
   * @returns {undefined}
   */
  function load(router) {
    var panel = getPanel(router);
    //console.log(panel);
    //eval(panel + '.show({"container": ".admin-app-stage"});');
    window[panel].show();
  }

  return {show: show, load: load};
}();

/* test case

$stage.load('#/store-list');
$stage.load('#/store-list-abc');

*/
