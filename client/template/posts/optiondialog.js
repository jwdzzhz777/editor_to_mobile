Template.dialogForOption.onRendered(function(){
	var data = this.data;
	//dialog初始化
	$('#dialog').dialog({
		autoOpen: false,
		resizable: false,
		width:'300px',
		position: { my: "left center", at: "left center", of: '.toolCenter' },//dialog的位置
		dialogClass: 'no-title',
		_allowInteraction: function( event ) {
			return !!$( event.target ).is( ".animateChooseName" ) || this._super( event );
		}
	});

	//绑定事件
	$('#dialog')
	//动画设置栏折叠
	.on({
		click:function(){
			$(this).next().toggle(300);
		}
	},'.toggleButton')
	//添加动画栏
	.on({
		click:function(){
			var animeOption = animeFun.createNew();
			var targetId = $('#dialog').data('target');
			var data = $('#'+targetId).data('option').animate;
			data.push(animeOption.none);
			Session.set('targetImgOption',$('#'+targetId).data('option'));
		}
	},'#addAnime')
	//选择动画
	.on({
		change: function(){
			var animeVal = $(this).val();
			if(animeVal == 'none'){
				$(this).closest('.toggleDiv').find('.speedAnddelay').css({'display':'none'});
			}else{
				$(this).closest('.toggleDiv').find('.speedAnddelay').css({'display':''});
			}
			var animeOption = animeFun.createNew();
			var targetId = $('#dialog').data('target');
			var data = $('#'+targetId).data('option').animate;
			var index = $(this).closest('.toggleDiv').data('index');
			var forSet = animeOption[animeVal];
			//暂时先这样吧
			data[index].option = forSet.option;
			data[index].before = forSet.before;
			data[index].name = forSet.name;
			data[index].value = forSet.value;
			//obj.key || obj[String]
		}
	},'.animateChooseName')
	//删除
	.on({
		click: function(e){
			e.stopPropagation();
			var targetId = $('#dialog').data('target');
			var data = $('#'+targetId).data('option').animate;
			var index = $(this).closest('.toggleDiv').data('index');
			data.splice(index,1);//数组的删除
			Session.set('targetImgOption',$('#'+targetId).data('option'));
		}
	},'.closeTheAnimaOptionToolbar')
	//选择延时和速度
	.on({
		change:function(){
			var targetId = $('#dialog').data('target');
			var data = $('#'+targetId).data('option').animate;
			data[$(this).closest('.toggleDiv').data('index')][$(this).attr('name')] = parseInt($(this).val())*1000;
		}
	},'input')
	//预览动画
	.on({
		click: function(){
			var targetId = $('#dialog').data('target');
			var animate = $('#'+targetId).data('option').animate;
			$('#'+targetId).stop(true,true);
			$.each(animate,function(index,element){
				$('#'+targetId).animate(element.before,0);
				$('#'+targetId).delay(element.delay).animate(element.option,element.speed);
			});
		}
	},'#showAnime');
});

Template.dialogForOption.helpers({
	chooseImg: function(){
		var targetOption = Session.get('targetImgOption');
		if(targetOption){
			return targetOption.animate;
		}
	},
	isSelected: function(val){
		if(this.value.value == val){
			return "selected";
		}
	},
	delay: function(){
		return this.value.delay / 1000;
	},
	speed: function(){
		return this.value.speed / 1000;
	}
});

/*{
	text: '添加动画',
	click: function(){
		//点击的对象
		$theClickObject = $('#dialog').data('jqObject');
		var thisID = $theClickObject.attr('id');
		var animate = [];
		$theClickObject.hide(0).show(1000);
		//加cache animate[lenght]; 界面id 0123这样和id绑定
		animate.push({
			name:'淡入',
			option:{opacity: 1},
			speed: 1000,
			before:{opacity: 0},
			delay: 0,
		});

		$theClickObject.data('option',animate);
	}
}*/
