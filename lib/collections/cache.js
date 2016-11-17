Caches = new Mongo.Collection('caches');
//Cache暂时用不到了
Meteor.methods({
	insertCache: function(pagecache){
		check(pagecache,{
			page: Array,
			userId: String,
		});

		var pageId = Caches.insert(pagecache);
		return {_id:pageId};
	},
	/*insertPage: function(){
		check(this.userId, String);

		var qs = Caches.update({userId: this.userId},{
			$addToSet: {page:{
				index: Caches.findOne({userId: this.userId}).page.length,
				body: '',
				background: 'none',
				option:[]
			}}
		});
	},*/
	cacheUpdates:function(mypage){
		check(this.userId,String);
		check(mypage, Array);

		var newPage = Caches.update(
			{userId: this.userId},
			{
				$set:{page: mypage},
			}
		);

		return newPage;
	},
	removeAllCache:function(){
		Caches.remove({});
	}
});
