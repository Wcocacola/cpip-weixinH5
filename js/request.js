var	REQUEST = {};
//查询
REQUEST.check = function(cb){
	$.ajax({
		type: "get",
		url: "http://dicos.aolinfeng.com/count.php?a=search",
		data: countInit,
		dataType: "json",
		timeout : 10000,
		success: function(data){
			typeof cb =="function" && cb(data);
		},
		error: function(){
		},
	});
}

//添加领卡
REQUEST.addCard = function(cb){
	$.ajax({
		type: "get",
		url: "http://dicos.aolinfeng.com/count.php?a=addcards",
		data: countInit,
		dataType: "json",
		timeout : 10000,
		success: function(data){
			typeof cb =="function" && cb(data);
		},
		error: function(){
		},
	});
}


//添加'约'次
REQUEST.addDate = function(cb){
	$.ajax({
		type: "get",
		url: "http://dicos.aolinfeng.com/count.php?a=adddates",
		data: countInit,
		dataType: "json",
		timeout : 10000,
		success: function(data){
			typeof cb =="function" && cb(data);
		},
		error: function(){
		},
	});
}


//添加'点'次
REQUEST.addClick = function(cb){
	$.ajax({
		type: "get",
		url: "http://dicos.aolinfeng.com/count.php?a=addtimes",
		data: countInit,
		dataType: "json",
		timeout : 10000,
		success: function(data){
			typeof cb =="function" && cb(data);
		},
		error: function(){
		},
	});
}

//此函数用于弹出提示。str参数为要提示的文本，可修改
function showMsg(str){
	window.msgTimer && clearTimeout(msgTimer);
	var txt = $(".alert-txt");
	txt.hide();
	txt.text(str);
	txt.css({
		display:"block",
		opacity:1
	});
	window.msgTimer = setTimeout(function(){
		txt.fadeOut();
	},1300);
}