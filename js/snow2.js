var canvas = document.getElementById("snow"),
	context = canvas.getContext("2d"),
	an = undefined,
	bodyW = document.getElementsByTagName("body")[0].offsetWidth,
	bodyH = document.getElementsByTagName("body")[0].offsetHeight;
//重设宽高
canvas.width = bodyW;
canvas.height = bodyH;

//requestAnimationFrame兼容性处理
(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
       return window.setTimeout(callback, 1000 / 60);//1秒60帧
    };
    window.requestAnimationFrame = requestAnimationFrame;

    window.cancelNextRequestAnimationFrame = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame ||
    function(callback){
	    	window.clearTimeout(callback);
	    };
})();
//雪花对象
(function(){
	window.snow = {
		max:120,	// 雪花数量
		particles:[], 	//雪花数组{x:0,y:0,radius:10,speed:5}
		//生成初始的随机点
		createSnow:function(){
			var length = snow.max;
			context.clearRect(0,0,bodyW,bodyH);
			context.fillStyle = "rgba(255, 255, 255,0.7)";
			for(var i = 0; i < length ; i++){
				var x = Math.random()*bodyW,
					y = Math.random()*bodyH,
					radius = Math.random()*2.8 + 0.8,
					speed = Math.random()*0.8 + 0.4;
				//压入数据
				snow.particles.push({
					"x": x,
					"y": y,
					"radius": radius,//半径
					"speed": speed//速度
				});
				context.moveTo(x,y);
				context.arc(x , y , radius ,0, Math.PI*2 , true);
			}
			context.fill();
		},
		//改变位置
		animationFrame:function(){
			var length = snow.max;
			context.clearRect(0,0,bodyW , bodyH);
			context.beginPath();
			//循环所有点
			for(var j = 0; j < length ; j++){
				//根据自身速度改变坐标
				context.moveTo(snow.particles[j].x , snow.particles[j].y +=snow.particles[j].speed );
				var p = snow.particles[j];
				context.arc(p.x , p.y , p.radius ,0, Math.PI*2 , true);
				//超出屏幕的点,重置到顶部
				if(p.x > bodyW || p.y > bodyH || p.x < 0){
					snow.particles[j].x = Math.random()*bodyW;
					snow.particles[j].y = 0;
				}
			}
			context.fill();
			//循环snow.animationFrame动画帧方法
			an = requestAnimationFrame(snow.animationFrame);
		},
		//开始
		start:function(){
			snow.createSnow();
			snow.animationFrame();
		},
		//结束
		stop:function(){
			if (an) {
			 	window.cancelNextRequestAnimationFrame(an);
			 	context.clearRect(0,0,bodyW,bodyH);//清空
			  	an = undefined;
			}
		}
	}
})();
