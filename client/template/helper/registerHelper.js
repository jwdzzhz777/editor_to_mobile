Template.registerHelper('arrayify',function(obj){
    var result = [];
	for (var key in obj){
		var keyAddOne = parseInt(key)+1;
		result.push({name: keyAddOne,value: obj[key],truekey: key});
	}
    return result;
});

//用不到了
Template.registerHelper('toFSFile',function(obj){
    var result = [];
	for (var key in obj){
		result.push(obj[key].getFileRecord());
	}
    return result;
});
