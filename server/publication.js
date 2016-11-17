Meteor.publish('mypages',function(){
	return Mypages.find();
});

Meteor.publish('mypage',function(id){
	return Mypages.find({userId: id});
});

Meteor.publish('caches',function(id){
	return Caches.find({userId: id});
});

Meteor.publish('myImgs',function(id){
	return UserImages.find({userId: id});
});

Meteor.publish('allImgs',function(){
	return Images.find();
});
