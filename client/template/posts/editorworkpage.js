/*Meteor.startup(function(){
    $(window).bind('beforeunload', function() {
        save();
        // have to return null, unless you want a chrome popup alert
		var ed;
        return ed;
		//return null 依旧会弹出alert，不return任何东西似乎可以,但会报错,而随便给一个null的对象有时候不会报错
        //return 'Are you sure you want to leave your Vonvo?';
    });
});*/


save = function(pageId){}

Template.workSpace.onDestroyed(function(){
	//save();有点问题
});

//！！！可以改进 详情在mypage mongodb 对于复杂结构的查找和更新！！！

/*结构
mypage = {
	_id: _id,
	userId: userId,
	isPut: false,
	page:[
		{
			body:$('.editorDiv').html(),暂时不需要body
			background: url,
			option: [
				{
					id: _id,
					width: width,
					height: height,
					top: top,
					left: left,
					url: src,
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
	console.log(this.data)
	if(!this.data) return;
	$.each(this.data.page,function(i,e){
		++i;
		$('#page'+ i).data('background',e.background);
		$.each(e.option,function(index,element){
			$('#'+element.id).data('option',element);
			$('#'+element.id).draggable({containment: ".toolCenter", scroll: false,stop: function(e,ui) {
				setHWTL(e,ui);
			}}).resizable({stop: function(e,ui){
				setHWTL(e,ui);
			}});
		})
	});
});

Template.workSpace.helpers({
	isactive: function(){
		return this.name == 1? 'active':'';
	},
	mypage: function(){
		return Mypages.find({userId: Meteor.userId()});
	},
	tupianyulan: function(){
		return this.page[0].background;
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
	'mousedown .jwd': function(e){
		//弹出工具箱
		if($("#dialog").dialog("isOpen")){
			$("#dialog").dialog("close");
		}
		var $jwd = $(e.target).closest('.jwd');
		Session.set('targetImgOption',$jwd.data('option'));
		$('#dialog').data('target',$jwd.attr('id'));
		$('#dialog').dialog('open');
	},
	'click .jwd': function(){return false},//阻止冒泡
	'click .myPageshow':function(){
		Router.go('workSpace',{_id: this._id});
	},'click #returnHome': function(){
		return Router.go('home');
	},
	'click #addPage':function(e,instance){
		Meteor.call('insertPage',instance.data._id,function(error,result){
			if(error){return console.log('insertPage error:',error.reason);}
			if(result){

			}
		})
	},
	'click #showForme':function(e,instance){
		Router.go('myPage',{
			name:Meteor.user().username,
			id: this._id
		});
	},
	'click .toSomepage': function(e,instance){
		var id = $(e.target).attr('href')
		$(id).find('.jwd').each(function(k,e){
			var option = $(e).data('option');
			$.each(option.animate,function(k,element){
				$(e).stop(true,true);
				$(e).animate(element.before,0);
				$(e).delay(element.delay).animate(element.option,element.speed);
			});
		});
	},
	//保存状态
	'click #destory':function(e,instance){

			$('.jwd').resizable("destroy");
			$('.jwd').draggable( "destroy" );
			//保存到集合

			var mypage = [];

			$('.editorDiv').each(function(index,element){
				var thisPage = {
					/*body: $(element).html(),*/
					background: $(element).data('background'),
					option:[]
				};
				$(element).find('.jwd').each(function(index,element){
					var data = $(element).data('option');
					thisPage.option.push(data);
				});
				mypage.push(thisPage);
			});
			Meteor.call('pageUpdate',{id:instance.data._id,page:mypage},function(error,result){
				if(error){return console.log('cacheUpdates error:',error.reason);}
				if(result){
				}
			});

			$('.jwd').draggable({
				containment: ".toolCenter",
				scroll: false,
				stop: function(e,ui) {
					setHWTL(e,ui);
				}
			}).resizable({stop: function(e,ui){
				setHWTL(e,ui);
			}});
	},
	//发布
	'click #uploadpage': function(e,instance){
		Meteor.call('pagePut',instance.data._id,function(error,result){
			if(error){return console.log('pagePut error:',error.reason);}
			if(result){

			}
		});
	}
});
