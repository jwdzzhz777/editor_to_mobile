isfirst = true;
Template.myPage.onRendered(function(){
	//先通过meta设置为当前浏览器分辨率
	var screenHeight = $(window).height();
	var screenWidth = $(window).width();
	if(screenHeight/screenWidth >= 604/412){
		$('#viewport').attr('content','width=412,height='+screenHeight/screenWidth*412+',user-scalable=0');
	}else if(screenHeight/screenWidth <= 604/412){
		$('#viewport').attr('content','width='+screenWidth/screenHeight*604+',height=604,user-scalable=0');
	}
	//初始化
	var pagedata = this.data;
	$('#fullpage').data('pageData',pagedata).fullpage({
		verticalCentered: false,//内容是否垂直居中
		scrollOverflow:false,//为了更好的在meteor上使用,该两项属性貌似是必须的(官方说的)
		afterRender:function(){
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
						$('#'+id+'').stop(true,true);
						$('#'+id+'').animate(value.before,0);
						$('#'+id+'').delay(value.delay).animate(value.option,value.speed);
					});
				});
				isfirst = false;
			}else{
				$.each(pagedata.page[index-1].option,function(key,value){
					var id = value.id;
						$.each(value.animate,function(key,value){
							$('#'+id+'').stop(true,true);
							$('#'+id+'').delay(value.delay).animate(value.option,value.speed);
						});
				});
			}
		},
		onLeave: function(index, nextIndex, direction){
			if(pagedata.page.length <= index-1){return};
			$.each(pagedata.page[index-1].option,function(key,value){
				var id = value.id;
				$.each(value.animate,function(key,value){
					$('#'+id+'').stop(true,true);
					$('#'+id+'').animate(value.before,700);
				});
			});
		}
	});
});
