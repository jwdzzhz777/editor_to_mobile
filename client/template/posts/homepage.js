Template.home.helpers({
	mypage: function(){
		return Mypages.find({userId: Meteor.userId()});
	},
	tupianyulan: function(){
		if(this.page[0].background){
			return this.page[0].background;
		}
	},
	youtu: function(){
		if(this.page[0].background !== 'none'){
			return true;
		}
	}
});

Template.home.events({
	'click #homeEdit': function(){
		return Router.go('workSpace',this);
	},
	'click #addMypage':function(e,instance){
		//新建模板
		Meteor.call('insertMypage',function(e,r){
			if (e) {return console.log('insertMypage error:',e.reason)}
			if(r){
				Router.go('workSpace',r);
			}
		})
	},
});
