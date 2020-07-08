/* global layui, layer: true */ 
$(function() {

  layui.use('layer', function(){
		var layer = layui.layer;

		layer.open({
			type: 1,
			title: '添加作者',
			area: ['550px', '170px'],
			content: $('.layer-add') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
		});
  });
});
