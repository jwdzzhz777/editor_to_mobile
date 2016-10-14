Template.fullPage.onRendered(function(){
	var screenHeight = $(window).height();
	var screenWidth = $(window).width();
	$('#fullpage').fullpage({
		verticalCentered: false,//内容是否垂直居中
		scrollOverflow:false,//为了更好的在meteor上使用,该两项属性貌似是必须的
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff'],//背景颜色
		anchors:['firstPage', 'secondPage', 'thirdPage','forthPage'],//路由名字
		afterRender:function(){
			//配适所有屏幕
			$(this).find('.jwd').css({
				'height': function(index,oldvalue){
					var trueValue = parseInt(oldvalue)/732*screenHeight;
					return trueValue;
				},
				'width': function(index,oldvalue){
					var trueValue = parseInt(oldvalue)/412*screenWidth;
					return trueValue;
				},
				'left': function(index,oldvalue){
					var trueValue = parseInt(oldvalue)/412*screenWidth;
					return trueValue;
				},
				'top': function(index,oldvalue){
					var trueValue = parseInt(oldvalue)/732*screenHeight;
					return trueValue;
				}
			});
		},
		afterLoad: function(anchorLink, index){
			if(anchorLink == 'firstPage'){
				$(this).find('img').show('slow');
			}
		},
		onLeave: function(index, nextIndex, direction){
			if(index == 1){
				$(this).find('img').hide(700);
			}
		}
	});
});
