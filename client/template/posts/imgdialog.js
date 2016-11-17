setHWTL = function(e,ui){
	//dialog stop event 设置宽高左上
	var data = $(e.target).data('option');//就是放这里！
	data.top = $(e.target).css('top');
	data.left = $(e.target).css('left');
	data.width = $(e.target).css('width');
	data.height = $(e.target).css('height');
}

Template.dialogForImg.onRendered(function(){
	//初始化
	$('#dialogImg').dialog({
		title: '添加照片',
		autoOpen: false,
		dialogClass: 'no-title',
		resizable : false,
		width:830
	});
	//事件
	$('#dialogImg').on({
		//图片上传
		change: function(e){
			e.preventDefault();
			FS.Utility.eachFile(e,function(file){
				var fileObj = Images.insert(file, function (err,fileobj) {
					if(err){
						console.log('imgInsert error:',err.reason);
					}
				});

				Meteor.call('addImageToUser',fileObj._id,function(error,result){
					if(error){
						return console.log('addImageToUser error:',error.reason);
					}

					if(result){

					}
				});
			});
		}
	},'#imgUploadButton')
	//active
	.on({
		click: function(e){
			$('.chooseimg').removeClass('imgactive');
			$(this).addClass('imgactive');
			e.stopPropagation();
		}
	},'.chooseimg')
	.on({
		click: function(e){
			$('.chooseimg').removeClass('imgactive');
		}
	},'#pageTabContent');
	//添加背景/图片
	$('#imgyes').click(function(e){
		var fromWhere = $('#dialogImg').data('from');
		var $img = $('.imgactive').find('img');
		if($img.length === 0){
			$('.chooseimg').stop(true,true)
			.animate({backgroundColor: '#ff899b',borderTopColor: '#ff899b', borderLeftColor: '#ff899b', borderRightColor: '#ff899b', borderBottomColor: '#ff899b'},100)
			.animate({backgroundColor: '#ffffff',borderTopColor: '#ffffff', borderLeftColor: '#ffffff', borderRightColor: '#ffffff', borderBottomColor: '#ffffff'},80)
			.animate({backgroundColor: '#ff899b',borderTopColor: '#ff899b', borderLeftColor: '#ff899b', borderRightColor: '#ff899b', borderBottomColor: '#ff899b'},100)
			.animate({backgroundColor: '#ffffff',borderTopColor: '#ffffff', borderLeftColor: '#ffffff', borderRightColor: '#ffffff', borderBottomColor: '#ffffff'},80,function(){
				$('.chooseimg').removeAttr('style');
			});
			return;
		}
		if(fromWhere == FOR_ADD_IMAGE){
			var date = new Date();
			//可优化
			$('<div class="jwd" id="'+$img.attr('id')+date.getTime()+'" style="width:100px;height:100px;left:0;top:0"></div>')
			.data('option',{
					id: $img.attr('id') + date.getTime(),
					width:"100px",
					height:"100px",
					url: $img.data('trueurl'),
					top:0,
					left:0,
					animate:[],
					event:[]
			}).append('<img style="height:100%;width:100%" src="'+$img.data('trueurl')+'"/>')
			.appendTo('.editorDiv.active').draggable({
				containment: ".toolCenter",
				scroll: false,
				stop: function(e,ui) {
					setHWTL(e,ui);
				}
			}).resizable({stop: function(e,ui){
				setHWTL(e,ui);
			}});
		}else if(fromWhere == FOR_SET_BACKGROUND){
			$('.editorDiv.active').css({
				"background-image": 'url(' + $img.data('trueurl') + ')'
			}).data('background',$img.data('trueurl'));
		}

		$('#dialogImg').dialog('close');
	});
	$('#imgno').click(function(e){
		$('#dialogImg').dialog('close');
	});
	$('#imgdelete').click(function(e){
		var $img = $('.imgactive').find('img');
		var id = $img.attr('id');
		Images.remove(id);
		Meteor.call('removeSomeImg',id,function(e,r){
			if(e){return console.log('removeSomeImg error:',e.reason);}
			if(r){}
		});
	});
	//删除图片
});

Template.dialogForImg.helpers({
	hasImg: function(){
		return UserImages.find({userId: Meteor.userId()})? true:false;
	},
	userImgs: function(){
		var userImg = UserImages.find({userId: Meteor.userId()});
		return userImg;
	},
	hasStore: function(){
		return this.hasStored('small');
	},
	selectedImageId:function(){
		return this.fileObjId;
	}
});
