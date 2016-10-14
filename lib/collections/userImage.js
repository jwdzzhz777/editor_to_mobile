UserImages = new Mongo.Collection('userimages');

Meteor.methods({
	addImageToUser:function(fileObj){
		check(this.userId,String);
		

		var result = UserImages.update({
			userId: this.userId
		},{
			$addToSet: {img: fileObj},
		});
		if(!result){
			result = UserImages.insert({
				userId: this.userId,
				img: [fileObj]
			})
		}

		return {result: result};
	}
});
