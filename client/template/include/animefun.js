//地址访问所以不能单纯的公共obj,这里用的极简主义法创建一个class
//http://www.ruanyifeng.com/blog/2012/07/three_ways_to_define_a_javascript_class.html
animeFun = {
	createNew: function(){
		var animefun = {};
		animefun.none = {
			value: 'none',
			name:'无',
			option:{},
			speed: 0,
			before:{},
			delay: 0,
		};
		animefun.fadeIn = {
			value: 'fadeIn',
			name:'淡入',
			option:{opacity: 1},
			speed: 0,
			before:{opacity: 0},
			delay: 0,
		};
		return animefun;
	}
};
