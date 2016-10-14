Router.configure({
	layoutTemplate:'layout',
	waitOn: function(){
		return [Meteor.subscribe('allImgs'),Meteor.subscribe('caches',Meteor.userId()),]
	}
});

Router.route('/',{
	name: 'workSpace',
	waitOn: function(){
		return [Meteor.subscribe('myImgs',Meteor.userId()),Meteor.subscribe('mypages',Meteor.userId())]
	},
	data: function(){
		return Caches.findOne({userId: Meteor.userId()});
	}
});

Router.route('/mypage/:name/:id',{
	name: 'myPage',
	waitOn:function(){
		return [Meteor.subscribe('mypages',Meteor.userId())]
	},
	data: function(){
		return Mypages.findOne(this.params.id);
	}
});

Router.route('/TestForFullPage',{
	name: 'fullPage'
});

var requireLogin = function() {
	if(!Meteor.user()) {
		this.render('accessDenied');
	}else{
		if(!Caches.findOne({userId: Meteor.userId()})){
			Meteor.call('insertCache',{
				userId: Meteor.userId(),
				page:[
					{
						index:0,
						body:'',
						background: 'none',
						option: []
					}
				]
			},function(e,r){
				if(e) return console.log('insertCache',e.reason);
				console.log('建立一个空的模板');
			});
		}
		this.next();
	}
}

Router.onBeforeAction(requireLogin);
