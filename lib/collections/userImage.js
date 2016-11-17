UserImages = new Mongo.Collection('userimages');

Meteor.methods({
	addImageToUser:function(id){
		check(this.userId,String);

		result = UserImages.insert({
			userId: this.userId,
			fileObjId: id,
		});

		return {result: result};
	},
	removeSomeImg:function(id){
		check(id,String);
		UserImages.remove({fileObjId:id});
	}
});
