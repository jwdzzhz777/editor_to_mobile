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
		change: function(e){
			e.preventDefault();
			FS.Utility.eachFile(e,function(file){
				var fileObj = Images.insert(file, function (err,fileobj) {
					if(err){
						console.log('imgInsert error:',err.reason);
					}
				});

				Meteor.call('addImageToUser',fileObj,function(error,result){
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
	//
	$('#imgyes').click(function(e){
		var fromWhere = $('#dialogImg').data('from');
		var $img = $('.imgactive').find('img');
		if(!$img) return;
		if(fromWhere == FOR_ADD_IMAGE){
			var date = new Date();

			$('<div class="jwd" id="'+$img.attr('id')+date.getTime()+'" style="width:100px;height:100px;left:0;top:0"></div>')
			.data('option',{
					id: $img.attr('id') + date.getTime(),
					animate:[],
					event:[]
			}).append('<img style="height:100%;width:100%" src="'+$img.data('trueurl')+'"/>')
			.appendTo('.editorDiv.active').draggable({
				containment: ".toolCenter",
				scroll: false,
				stop: function(e,ui) {
					console.log($(e.target).css('top'));
				}
			}).resizable();

			/*$('<div class="jwd" id="' +
				$img.attr('id') +
				'" style="width:100px;height:100px"><img style="height:100%;width:100%" src="'+
				$img.data('trueurl') +
				'"/></div>')
			.appendTo('.editorDiv.active').draggable({containment: ".toolCenter", scroll: false }).resizable();

			$('#'+$img.attr('id')).data('option',{
					id: $img.attr('id'),
					animate:[],
					event:[]
			});*/
		}else if(fromWhere == FOR_SET_BACKGROUND){
			$('.editorDiv.active').css({
				"background-image": "url("+$img.data('trueurl')+")",
				"background-size": "100% 100%"
			});
		}

		$('#dialogImg').dialog('close');
	});
	$('#imgno').click(function(e){
		$('#dialogImg').dialog('close');
	});
});

Template.dialogForImg.helpers({
	hasImg: function(){
		return UserImages.find({userId: Meteor.userId()})? true:false;
	},
	userImgs: function(){
		var userImg = UserImages.findOne({userId: Meteor.userId()});
		if(userImg){
			return userImg.img;
		}
	},
	hasStore: function(){
		return this.hasStored('image');
	}
});
