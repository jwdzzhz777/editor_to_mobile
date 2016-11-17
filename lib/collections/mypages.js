Mypages = new Mongo.Collection('mypages');

Meteor.methods({
	insertMypage:function(){
		check(this.userId, String);

		var pageId = Mypages.insert({
			userId: Meteor.userId(),
			isPut: false,
			page:[
				{
					index:0,
					body:'',
					background: 'none',
					option: []
				}
			]
		});
		return {_id:pageId};
	},
	insertPage: function(pageId){
		check(this.userId, String);
		check(pageId, String);

		var qs = Mypages.update(pageId,{
			$addToSet: {page:{
				index: Mypages.findOne(pageId).page.length,
				body: '',
				background: 'none',
				option:[]
			}}
		});
	},
	pageUpdate: function(mypage){
		check(this.userId,String);
		check(mypage,{
			id: String,
			page: Array
		});

		var newPage = Mypages.update(mypage.id,
			{
				$set:{page: mypage.page},
			}
		);

		return newPage;
	},
	pagePut:function(id){
		check(this.userId,String);
		check(id,String);

		var putPage = Mypages.update(id,{
			$set: {isPut: true}
		});
	},
	removeAllPage: function(){
		Mypages.remove({});
	},
	lihaile: function(data){
		check(data,Object);
		/*
		只支持{
				some:[object,object]
			}
			这样的可以单独找到并修改object里边属性,但是复杂的array套object再套array就
			不行了
		*/

		Mypages.update(
			{_id: data.id,"page.background": "fuckyou"},
			{$set: {"page.$.background": "/cfs/files/images/5Rj4fmmYSnfBH5bhJ/CtRShfDVUAA91WG.png?token=eyJhdXRoVG9rZW4iOiJydDc3bmtzX3liR3JqT2ZVVS1yVzlWU3hGVmdBM0p2ZEpVVWctY0padWpRIn0%3D&store=image"}}
		);
	}
});
