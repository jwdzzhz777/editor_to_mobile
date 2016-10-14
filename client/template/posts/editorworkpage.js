/*结构
mypage = {
	_id: id,
	userId: userId,
	page:[
		{
			body:$('.editorDiv').html(),
			background: url,
			option: [
				{
					id: _id,
					width: width,
					height: height,
					top: top,
					left: left,
					animate:[{animate},{...}],
					event:[{event},{...}]
				},
				{...}
			]
		},
		{...}
	]
}
*/
Template.workSpace.onRendered(function(){
	//没有缓存的情况在router中
	Session.set('targetImgOption');
	//dialog打开关闭事件
	$('#mainDiv').on('click','.toolDiv',function(e){
		//工具箱关闭
		$('#dialog').dialog('close');
	});
	$('.editorDiv').on({
		'mousedown':function(e){
			//弹出工具箱
			if($("#dialog").dialog("isOpen")){
				$("#dialog").dialog("close")
			}
			Session.set('targetImgOption',$(this).data('option'));
			$('#dialog').data('target',$(this).attr('id'));
			$('#dialog').dialog('open');
		},
		'click':function(e){
			e.stopPropagation();
		}
	},'.jwd');

	//给每个page和img设置data() 可以改进
	$.each(this.data.page,function(index,element){
		var num = ++index;
		$('#page'+num+'').append(element.body).data('pageIndex',num);

		$.each(element.option,function(index,element){
			$('#'+element.id).data('option',element);
			$('#'+element.id).draggable({containment: ".toolCenter", scroll: false,stop: function(e,ui) {
				console.log($(e.target).css('top'));
			}}).resizable();
		});
	});
});

Template.workSpace.helpers({
	isactive: function(){
		return this.name == 1? 'active':'';
	}
});

Template.workSpace.events({
	'click #addImg': function(e,instance){
		$('#dialogImg').dialog('open');
		$('#dialogImg').data('from',FOR_ADD_IMAGE);
	},
	'click #setBackground': function(e,instance){
		$('#dialogImg').dialog('open');
		$('#dialogImg').data('from',FOR_SET_BACKGROUND);
	},
	//保存状态
	'click #destory':function(e,instance){
		$('.jwd').resizable("destroy");
		$('.jwd').draggable( "destroy" );
		//保存到集合

		var mypage = [];

		$('.editorDiv').each(function(index,element){
			var thisPage = {
				body: $(element).html(),
				background: $(element).css('background-image'),
				option:[]
			};
			$(element).find('.jwd').each(function(index,element){
				var data = $(element).data('option');
				thisPage.option.push(data);
			});
			mypage.push(thisPage);
		});

		Meteor.call('cacheUpdates',mypage,function(error,result){
			if(error){return console.log('cacheUpdates error:',error.reason);}
			if(result){
				//
			}
		});
	},
	'click #addPage':function(){
		Meteor.call('insertPage',function(e,r){
			if(e){return console.log('insertPage error:',e.reason);}

		});
	},
	//上传页面
	'click #uploadpage': function(){
		//从cache中取出来
		var mypage = Caches.findOne({userId: Meteor.userId()});

		Meteor.call('pageUpdate',mypage.page,function(error,result){
			if(error){
				return console.log('pageUpdate error:',error.reason);
			}
			if(result){
				Router.go('myPage',result);
			}
		})
	}
});
