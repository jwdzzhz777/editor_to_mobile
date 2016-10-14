isfirst = true;
Template.myPage.onRendered(function(){
	var pagedata = this.data;
	$.each(pagedata.page,function(key,value){
		var id = key + 1;
		$('#fullpage').append('<div class="section" id="page'+ id + '"></div>');
		$('#page'+ id + '').css({
			'background-image': value.background,
			'background-size': '100% 100%'
		}).append(value.body);
	});
	var screenHeight = $(window).height();
	var screenWidth = $(window).width();
	$('#fullpage').data('pageData',pagedata).fullpage({
		verticalCentered: false,//内容是否垂直居中
		scrollOverflow:false,//为了更好的在meteor上使用,该两项属性貌似是必须的(官方说的)
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
			$.each(pagedata.page,function(key,value){
				if(key == 0){return};
				$.each(value.option,function(key,value){
					var id = value.id;
					$.each(value.animate,function(key,value){
						$('#'+id+'').animate(value.before,700);
					});
				})
			});
		},
		afterLoad: function(anchorLink, index){
			if(pagedata.page.length <= index-1){return};
			if(isfirst){
				$.each(pagedata.page[index-1].option,function(key,value){
					var id = value.id;
					$.each(value.animate,function(key,value){
						$('#'+id+'').animate(value.before,0);
						$('#'+id+'').animate(value.option,value.speed);
					});
				});
				isfirst = false;
			}else{
				$.each(pagedata.page[index-1].option,function(key,value){
					var id = value.id;
						$.each(value.animate,function(key,value){
							$('#'+id+'').animate(value.option,value.speed);
						});
				});
			}
		},
		onLeave: function(index, nextIndex, direction){
			if(pagedata.page.length <= index-1){return};
			$.each(pagedata.page[index-1].option,function(key,value){
				var id = value.id;
				$.each(value.animate,function(key,value){
					$('#'+id+'').stop(true);
					$('#'+id+'').animate(value.before,700);
				});
			});
		}
	});
});
