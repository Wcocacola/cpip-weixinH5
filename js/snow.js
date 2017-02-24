var an;
//雪花对象
function makeSnow(context,W,H){
	window.snow = {
		max:120,	// 雪花数量
		particles:[], 	//雪花数组{x:0,y:0,radius:10,speed:5}
		//生成初始的随机点
		createSnow:function(){
			var length = window.snow.max;
			context.clearRect(0,0,W,H);
			context.fillStyle = "rgba(255, 255, 255,0.7)";
			for(var i = 0; i < length ; i++){
				var x = Math.random()*W,
					y = Math.random()*H,
					radius = Math.random()*2.8 + 0.8,
					speed = Math.random()*0.8 + 0.4;
				//压入数据
				window.snow.particles.push({
					"x": x,
					"y": y,
					"radius": radius,//半径
					"speed": speed//速度
				});
				context.moveTo(x,y);
				context.arc(x , y , radius ,0, Math.PI*2 , true);
			}
			context.fill();
			console.log(1);
		},
		//改变位置
		animationFrame:function(){
			var length = window.snow.max;
			context.clearRect(0,0,W , H);
			context.beginPath();
			//循环所有点
			for(var j = 0; j < length ; j++){
				//根据自身速度改变坐标
				context.moveTo(window.snow.particles[j].x , window.snow.particles[j].y +=window.snow.particles[j].speed );
				var p = window.snow.particles[j];
				context.arc(p.x , p.y , p.radius ,0, Math.PI*2 , true);
				//超出屏幕的点,重置到顶部
				if(p.x > W || p.y > H || p.x < 0){
					window.snow.particles[j].x = Math.random()*W;
					window.snow.particles[j].y = 0;
				}
			}
			context.fill();
			console.log(1);
			//循环snow.animationFrame动画帧方法
			an = requestAnimationFrame(window.snow.animationFrame);
		},
		//开始
		start:function(){
			console.log(1);
			window.snow.createSnow();
			window.snow.animationFrame();
		},
		//结束
		stop:function(){
			if (an) {
			 	window.cancelNextRequestAnimationFrame(an);
			 	context.clearRect(0,0,W,H);//清空
			  	an = undefined;
			}
		}
	}
}
