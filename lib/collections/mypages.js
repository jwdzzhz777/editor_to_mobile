Mypages = new Mongo.Collection('mypages');

Meteor.methods({
	pageUpdate: function(mypage){
		check(this.userId,String);
		check(mypage,Array);

		var page = Mypages.findOne({userId: this.userId});
		var pageId;
		if(page) pageId = page._id;
		if(!pageId){
			pageId = Mypages.insert({
				userId: this.userId,
				page: mypage,
			});
		}else{
			Mypages.update(pageId,{
				$set:{page: mypage}
			});
		}

		return {
			name: Meteor.user().username,
			id:pageId
		};
	},
	removeAllPage: function(){
		Mypages.remove({});
	}
})
