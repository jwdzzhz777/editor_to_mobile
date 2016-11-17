Router.configure({
	layoutTemplate:'layout',
	notFoundTemplate:'notfound',
	waitOn: function(){
		return [Meteor.subscribe('allImgs'),Meteor.subscribe('caches',Meteor.userId()),]
	}
});

Router.route('/',{
	name: 'home',
	waitOn: function(){
		return [Meteor.subscribe('myImgs',Meteor.userId()),Meteor.subscribe('mypage',Meteor.userId())]
	},
	data:function(){
		return Mypages.find({userId: Meteor.userId()});
	}
});

Router.route('/edit/:_id',{
	name: 'workSpace',
	waitOn: function(){
		return [Meteor.subscribe('myImgs',Meteor.userId()),Meteor.subscribe('mypage',Meteor.userId())]
	},
	data: function(){
		return Mypages.findOne(this.params._id);
	}
});

Router.route('/mypage/:name/:id',{
	name: 'myPage',
	waitOn:function(){
		return [Meteor.subscribe('mypages')]
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
		/*if(!Caches.findOne({userId: Meteor.userId()})){
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
		}*/
		this.next();
	}
}

var isPutOrUser = function(){
	var data = Mypages.findOne(this.params.id);
	if(Meteor.user() || data.isPut == true){
		this.next();
	}else{
		this.render('notfound');
	}
}

Router.onBeforeAction(requireLogin,{only:'workSpace'});
Router.onBeforeAction(requireLogin,{only:'home'});
Router.onBeforeAction('dataNotFound',{only:'myPage'});
Router.onBeforeAction(isPutOrUser,{only:'myPage'});
