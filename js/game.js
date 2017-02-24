
//GAME
var _URL = 'images/',
	STATUS = 'init';
var giftIndex = 0;//礼物出现数量
var coinNum = 36;//硬币数量
var coinIndex = 0;//当前硬币数量
var coinArr = [];
var specialGold;
var GAME = (function(g,cjs){
	var CVS,
		SW,SH,//宽高
		BG,//背景
		canvas,
		stage,
		gameMain,//游戏主容器
		P1,P2,P3,
		INDEX,//大灯笼页
		SECOND,
		loader;
	var bgm;
	var lanternPic,lanternPicData,picNum,nowFestival;
	var indexDefaultPic;
	//btns
	//var btnTap,btnPrice;

	//tweens 灯笼
	var tweenDL1,tweenDL2;

	//ans
	var anFire;

	var fireShoot,fireUp;//烟花桶 烟花发射线
	var coinFlashTimer;
	var btnRule,btnTurnLantern;
	var bigYuanbao;//发光
	var shaozi;//多次舀
	var danianCar;//要露头
	var gameMsc;//长按欣赏的时候停止
	var eatTimer;//元宵过后4秒把STATUS变成notEat
	g.init = function(){

		CVS = document.getElementById('canvas');
		//common settings
		stage = INIT.stage;
		loader = INIT.loader;
		//context = CVS.getContext("2d");
		//console.log(context);
		SW = INIT.width;
		SH = INIT.height;
		gameMain = new cjs.Container();

		INDEX = new cjs.Container();
		P1 = new  cjs.Container();
		P2 = new  cjs.Container();
		P3 = new  cjs.Container();
		P4 = new  cjs.Container();
		P5 = new  cjs.Container();
		INDEX.regX = P1.regX = P2.regX = P3.regX = P4.regX = 320;
		INDEX.regY = P1.regY = P2.regY = P3.regY = P4.regY = 516;
		INDEX.x = P1.x = P2.x = P3.x = P4.x = 320;
		INDEX.y = P1.y = P2.y = P3.y = P4.y = 516;
		lanternPic = new cjs.Container();
		indexDefaultPic = new cjs.Container();
		lanternPicData = [
			{pos:48,festival:'xiaonian'},
			{pos:-544+48,festival:'danian'},
			{pos:-544*2+48,festival:'chuwu'},
			{pos:-544*3+48,festival:'chuba'},
			{pos:-544*4+48,festival:'yuanxiao'},
		];

		BG = new cjs.Bitmap(loader.getResult('bg_inner_w'));

		//btns
		//btnTap = new cjs.Bitmap(loader.getResult('btnTap'));
		//btnPrice = new cjs.Bitmap(loader.getResult('btnPrice'));
		btnTap = $('.btn-tap');
		btnPrice = $('.btn-price');
		/*btnTap.set({
			x:108,
			y:946
		});
		btnPrice.set({
			x:354,
			y:946
		});*/
		//切换回主页
		//btnRule = new cjs.Bitmap(loader.getResult('btnRule'));
		//btnTurnLantern = new cjs.Bitmap(loader.getResult('btnTurnLantern'));
		btnRule = $('.btn-rule');
		btnTurnLantern = $('.btn-turn');
		//btnTurnLantern.x = 222; btnTurnLantern.y = 944;
		//btnRule.x = 450; btnRule.y = 955;

		btnTap.on('touchstart',function(e){
			/*if (STATUS === 'notEat') {
				STATUS = 'finishEating';
			}*/
			if (gameMsc) {
				gameMsc.stop();
			}
			clearTimeout(eatTimer);
			window.snow.stop();
			e.preventDefault();
			var temp = clearInterval(coinFlashTimer);
			//console.log(stage.children);
			stage.removeChildAt(0);
			g.index();
			g.turnLantern();
		});
		btnTap.on('touchend',function(e){
			e.preventDefault();
			g.stopTurnLantren();
			g.resetBottomBtn();
		});
		//stage.addChild(btnTap,btnPrice);
		g.resetBottomBtn();




		/*跳转到外链*/
		btnPrice.on('click',function(){
			location.href = 'http://www.baidu.com';
		});



		g.index();
		g.showIndexBtn();
		//g.danian();
		//g.chuwu();
		//g.chuba();
		//g.xiaonian();
		//g.yuanxiao();

		//start
		g.start();
	//	makeSnow(context,INIT.CAN_W,INIT.CAN_H);
	};
	g.index = function () {
		//恢复
		INDEX.scaleX = INDEX.scaleY = 1;
		INDEX.alpha = 1;
		INDEX.removeAllChildren();
		lanternPic.removeAllChildren();
		indexDefaultPic.removeAllChildren();
		var bigLantern = new cjs.Bitmap(loader.getResult('bigLantern'));
		var btnClosePopup = new cjs.Bitmap(loader.getResult('btnClosePopup'));
		var picChuba = new cjs.Bitmap(loader.getResult('picChuba'));
		//var picChunjie = new cjs.Bitmap(loader.getResult('picChunjie'));
		var picChuwu = new cjs.Bitmap(loader.getResult('picChuwu'));
		var picDanian = new cjs.Bitmap(loader.getResult('picDanian'));
		var picXiaonian = new cjs.Bitmap(loader.getResult('picXiaonian'));
		var picYuanxiao = new cjs.Bitmap(loader.getResult('picYuanxiao'));

		var indexChick = new cjs.Bitmap(loader.getResult('indexChick'));
		var indexDenglong1 = new cjs.Bitmap(loader.getResult('indexDenglong'));
		var indexDenglong2 = indexDenglong1.clone();
		var indexKid = new cjs.Bitmap(loader.getResult('indexKid'));

		var indexBg = new cjs.Bitmap(loader.getResult('indexBg'));
		var indexStaticBg = new cjs.Bitmap(loader.getResult('indexStaticBg'));
		//var innerWhite = new cjs.Bitmap(loader.getResult('bg_inner_w'));
		var indexParentSS = new cjs.SpriteSheet({
			images:[loader.getResult('indexParents1'),loader.getResult('indexParents2'),loader.getResult('indexParents3'),loader.getResult('indexParents4')],
			frames:{width:392,height:458},
			animations: {
				run:[0,3,'run',0.2]
			}
		});
		var indexParentSprite = new cjs.Sprite(indexParentSS);

		/*定位*/
		bigLantern.x = 12+313; bigLantern.y = 45+427;
		bigLantern.regX = 313; bigLantern.regY = 427;

		var mask = new cjs.Shape();
		mask.graphics.beginFill().drawRect(48,122,544,694);
		lanternPic.mask = mask;

		lanternPic.x = 48; lanternPic.y = 122;
		picDanian.x = 544;
		picChuwu.x = 544*2;
		picChuba.x = 544*3;
		picYuanxiao.x = 544*4;
		lanternPic.addChild(picXiaonian,picDanian,picChuwu,picChuba,picYuanxiao);

		btnTurnLantern.on('touchstart',function(e){
			e.preventDefault();
			g.turnLantern();
			if (gameMsc) {
				gameMsc.stop();
			}
		});
		btnTurnLantern.on('touchend',function(e){
			e.preventDefault();
			g.stopTurnLantren();
		});
		INDEX.btnRule = btnRule;
		INDEX.btnTurnLantern = btnTurnLantern;//为了在g.stopTurnLantren取消事件
		btnRule.on('click',function(){
			$('.rule').closest('.barrier').removeClass('hide');
		});

		/*defaultpic*/
		indexDefaultPic.x = 125; indexDefaultPic.y = 230;
		indexDenglong1.set({x:58+21,y:130+60,regX:21,scaleX:0.78,scaleY:0.78});
		indexDenglong2.set({x:304+21,y:130+60,regX:21,scaleX:0.78,scaleY:0.78});
		indexKid.set({x:30,y:300+40,scaleX:0.78,scaleY:0.78});
		indexChick.set({x:16+64,y:320+40,regX:64,scaleX:0.78,scaleY:0.78});
		indexParentSprite.gotoAndPlay('run');

		//var staticBgMid = new cjs.Container();
		//staticBgMid.addChild(indexStaticBg);
		//var staticBgLeft = staticBgMid.clone(true);
		//var staticBgRight = staticBgMid.clone(true);
		//innerWhite.set({scaleX:0.6,scaleY:0.7525,y:-90,x:4});
		//staticBgLeft.set({scaleX:0.16,scaleY:1.25,x:-74,y:-90,skewY:-30});
		//staticBgRight.set({scaleX:0.16,scaleY:1.25,x:410,y:-108,skewY:30});
		indexBg.set({scaleX:0.78,scaleY:0.78,x:44,y:80});
		indexStaticBg.set({x:-80,y:-100});
		indexParentSprite.y = 60; indexParentSprite.scaleX = 0.8;indexParentSprite.scaleY = 0.8;indexParentSprite.x = 18;
		indexDefaultPic.addChild(indexStaticBg,indexBg,indexDenglong1,indexDenglong2,indexParentSprite,indexKid,indexChick);
		g.shakeLantern(indexDenglong1,10,-10,1000);
		g.shakeLantern(indexDenglong2,10,-10,1000);
		g.shakeLantern(indexChick,-6,6,700);

		INDEX.addChild(indexDefaultPic,bigLantern);

		stage.addChild(INDEX);

	};
	g.showIndexBtn = function(){
		//INDEX.addChild(btnTurnLantern,btnRule);
		$('.btns-index').removeClass('hide').addClass('fadeIn');
	};
	//
	g.chuwu = function(){
		STATUS = 'nofire&first';
		P1.removeAllChildren();
		var _p1 = new cjs.Bitmap(loader.getResult('bgChuwu')),
			denglong1 = new cjs.Bitmap(loader.getResult('denglong')),
			denglong2 = denglong1.clone();

		var deg1 = -10,
			deg2 = 10,
			_time = 1000;

		fireShoot = new cjs.Container();
		var fireBox = new cjs.Bitmap(loader.getResult('fireBox'));
		fireUp = new cjs.Bitmap(loader.getResult('fireUp'));
		fireShoot.x = 320; fireShoot.y = 610;
		fireUp.alpha = 0;
		fireUp.y = 50;
		fireShoot.addChild(fireUp, fireBox);

		_p1.set({
			x:39,
			y:70
		});
		denglong1.set({
			x:124,
			y:320,
			regX:30,
			rotation:deg2
		});
		denglong2.set({
			x:518,
			y:320,
			regX:30,
			rotation:deg2
		});
		g.shakeLantern(denglong1,deg1,deg2,_time);
		g.shakeLantern(denglong2,deg1,deg2,_time);

		P1.addChild(_p1,denglong1,denglong2,fireShoot);
		g.fadeInGame(P1,'.chuwu-tip');
	};
	g.danian = function () {
		STATUS = 'waitingHome';
		P2.removeAllChildren();
		var bgDanian = new cjs.Bitmap(loader.getResult('bgDanian'));
		var danianDenglong1 = new cjs.Bitmap(loader.getResult('danianDenglong'));
		var danianDenglong2 = danianDenglong1.clone();
		danianCar = new cjs.Bitmap(loader.getResult('danianCar'));
		var carMask = new cjs.Shape();
		carMask.graphics.beginFill().drawRect(0,0,379,137);
		carMask.set({x:46,y:470});
		danianCar.set({x:-160,y:470,mask:carMask});
		bgDanian.set({x:45,y:70});
		danianDenglong1.x = 140+40; danianDenglong1.y = 288;
		danianDenglong2.x = 514+40; danianDenglong2.y = 288;
		danianDenglong1.regX = 40;
		danianDenglong2.regX = 40;
		g.shakeLantern(danianDenglong1,5,-5,1000);
		g.shakeLantern(danianDenglong2,0,-8,1000);

		P2.addChild(bgDanian,danianDenglong1,danianDenglong2,danianCar);
		g.fadeInGame(P2,'.danian-tip');
	};
	g.chuba = function (){
		STATUS = 'waitingCoin';
		P3.removeAllChildren();
		var bgChuba = new cjs.Bitmap(loader.getResult('bgChuba'));
		//var yuanbao = new cjs.Bitmap(loader.getResult('yuanbao'));
		var deco = new cjs.Bitmap(loader.getResult('chubaDeco'));
		var person = new cjs.Bitmap(loader.getResult('chubaPerson'));
		bigYuanbao = new cjs.Bitmap(loader.getResult('bigYuanbao'));
		//yuanbao.set({regX:30,regY:70});

		//yuanbao.set({x:234,y:370});
		bgChuba.set({x:42,y:70});
		deco.set({y:200,x:28});
		bigYuanbao.set({y:180,x:10});
		person.set({y:348,x:174});
		P3.addChild(bgChuba,bigYuanbao,deco,person);
		g.fadeInGame(P3,'.chuba-tip');
	};
	g.xiaonian = function (){
		STATUS = 'waitingGift';
		P4.removeAllChildren();
		var bgXiaonian = new cjs.Bitmap(loader.getResult('bgXiaonian'));
		var denglong1 = new cjs.Bitmap(loader.getResult('danianDenglong'));
		var denglong2 = denglong1.clone();
		var denglong3 = denglong1.clone();
		var mom = new cjs.Bitmap(loader.getResult('xiaonianMom'));
		mom.set({x:100,y:360});
		denglong3.set({scaleX:0.4,scaleY:0.6,x:568,y:190,regX:40});
		denglong2.set({scaleX:0.5,scaleY:0.6,x:180,y:214,regX:40});
		denglong1.set({scaleX:0.7,scaleY:0.6,x:100,y:218,regX:40});
		g.shakeLantern(denglong1,-5,5,1000);
		g.shakeLantern(denglong2,-5,5,1000);
		g.shakeLantern(denglong3,-5,5,1000);
		bgXiaonian.set({x:0,y:70});

		P4.addChild(bgXiaonian,denglong2,denglong1,denglong3,mom);
		g.fadeInGame(P4,'.xiaonian-tip');
	};
	g.yuanxiao = function (){
		STATUS = 'notEat';
		P5.removeAllChildren();
		var bgYuanxiao = new cjs.Bitmap(loader.getResult('bgYuanxiao'));
		var denglong1 = new cjs.Bitmap(loader.getResult('danianDenglong'));
		var denglong2 = denglong1.clone();
		var denglong3 = denglong1.clone();
		var denglong4 = denglong1.clone();
		var denglong5 = denglong1.clone();
		var denglong6 = denglong1.clone();
		var denglong7 = denglong1.clone();
		var denglong8 = denglong1.clone();
		var yuanxiaoDL1 = new cjs.Bitmap(loader.getResult('yuanxiaoDenglong'));
		var yuanxiaoDL2 = yuanxiaoDL1.clone();
		var yuanxiaoDL3 = yuanxiaoDL1.clone();
		var yuanxiaoDL4 = yuanxiaoDL1.clone();
		var yuanxiaoDL5 = yuanxiaoDL1.clone();
		shaozi = new cjs.Bitmap(loader.getResult('shaozi'));

		shaozi.set({x:230,y:500,regX:44,regY:30,rotation:40});
		var s = new cjs.Shape();
		s.set({x:178,y:417});
		s.graphics.beginFill('rgba(0,0,0,0.3)').drawRect(0,0,230,156);
		shaozi.mask = s;

		denglong1.set({scaleX:0.6,scaleY:0.7,x:120,y:304,regX:40});
		denglong2.set({scaleX:0.65,scaleY:0.75,x:100,y:204,regX:40});
		denglong3.set({scaleX:1,scaleY:0.9,x:214,y:214,regX:40});
		denglong4.set({scaleX:0.66,scaleY:0.76,x:298,y:314,regX:40});
		denglong5.set({scaleX:1,scaleY:1,x:390,y:188,regX:40});
		denglong6.set({scaleX:0.68,scaleY:0.75,x:430,y:280,regX:40});
		denglong7.set({scaleX:0.75,scaleY:0.75,x:510,y:213,regX:40});
		denglong8.set({scaleX:0.6,scaleY:0.6,x:500,y:318,regX:40});
		yuanxiaoDL1.set({scaleX:1,scaleY:1,x:148,y:220,regX:31});
		yuanxiaoDL2.set({scaleX:0.85,scaleY:0.85,x:250,y:260,regX:31});
		yuanxiaoDL3.set({scaleX:0.80,scaleY:0.80,x:310,y:204,regX:31});
		yuanxiaoDL4.set({scaleX:0.82,scaleY:0.82,x:350,y:244,regX:31});
		yuanxiaoDL5.set({scaleX:0.8,scaleY:0.8,x:460,y:228,regX:31});
		g.shakeLantern(denglong1,-3,3,1000);
		g.shakeLantern(denglong2,3,-3,1000);
		g.shakeLantern(denglong3,-3,3,1000);
		g.shakeLantern(denglong4,-3,3,1000);
		g.shakeLantern(denglong5,3,-3,1000);
		g.shakeLantern(denglong6,-3,3,1000);
		g.shakeLantern(denglong7,-3,3,1000);
		g.shakeLantern(denglong8,3,-3,1000);
		g.shakeLantern(yuanxiaoDL1,3,-3,1000);
		g.shakeLantern(yuanxiaoDL2,-3,3,1000);
		g.shakeLantern(yuanxiaoDL3,3,-3,1000);
		g.shakeLantern(yuanxiaoDL4,-3,3,1000);
		g.shakeLantern(yuanxiaoDL5,3,-3,1000);

		bgYuanxiao.set({x:54,y:70});

		P5.addChild(bgYuanxiao,denglong2,yuanxiaoDL5,denglong1,denglong3,denglong4,denglong5,denglong6,denglong7,denglong8,yuanxiaoDL1,yuanxiaoDL2,yuanxiaoDL3,yuanxiaoDL4,shaozi);
		g.fadeInGame(P5,'.yuanxiao-tip');
	};
	g.fadeInGame = function (page, tip) {
		if (page == P1) {
			BG = new cjs.Bitmap(loader.getResult('bg_inner_b'));
		} else {
			BG = new cjs.Bitmap(loader.getResult('bg_inner_w'));
		}
		$(tip).removeClass('hide');
		gameMain.alpha = 0;
		gameMain.removeAllChildren();
		stage.addChildAt(gameMain,0);
		gameMain.addChild(BG,page);
		cjs.Tween.get(gameMain).to({alpha:1},1000).call(function(){
			setTimeout(function(){
				$(tip).addClass('hide');
				g.showBottomBtn();
			},2000);
		});
	};
	g.showBottomBtn = function (){
		//console.log(lanternPicData.length);
		//setTimeout(function (){
			if (lanternPicData.length !== 0) {
				//cjs.Tween.get(btnTap).wait(100).to({y:946},600);
			} else {
				$('.btn-tap').css({display:'none'});
			}
			//cjs.Tween.get(btnPrice).wait(100).to({y:946},600);
			$('.btns-game').removeClass('hide').addClass('fadeIn');
			//stage.addChild(btnTap,btnPrice);
		//},2000);

	};
	g.resetBottomBtn = function(){
		//btnTap.y = 1050;
		//btnPrice.y = 1050;
		$('.btns-game').addClass('hide').removeClass('fadeIn');
	};
	g.showGame = function() {

		cjs.Tween.get(INDEX).wait(300).call(function(){
			$('.btns-index').addClass('hide');
		}).to({scaleX:1.6,scaleY:1.6,alpha:0},1200).call(function(){
			if (nowFestival == 'chuwu') {
				g.chuwu();

			} else if (nowFestival === 'danian') {
				g.danian();
			} else if (nowFestival === 'chuba') {
				g.chuba();
			} else if (nowFestival === 'xiaonian') {
				g.xiaonian();
			} else if (nowFestival === 'yuanxiao') {
				g.yuanxiao();
			}
			stage.removeChild(INDEX);
		});

	};
	g.shakeLantern = function (item,deg1,deg2,t) {
		item.rotation = deg2;
		cjs.Tween.get(item,{loop:true}).to({rotation:deg1},t,cjs.Ease.sineInOut).set({rotation:deg1}).to({rotation:deg2},t,cjs.Ease.sineInOut);
	};
	g.turnLantern = function() {
		INDEX.removeChildAt(0);
		INDEX.addChildAt(lanternPic,0);
		cjs.Tween.get(lanternPic,{loop:true,override:true}).set({x:0}).to({x:-544*5+48},400);
	};
	g.stopTurnLantren = function() {
		var random = Math.floor(Math.random()*lanternPicData.length);
		if (random === lanternPicData.length) {
			random -= 1;
		}
		var temp = lanternPicData.splice(random,1)[0];
		//console.log(lanternPicData);
		var pos = temp['pos'];
		nowFestival = temp['festival'];
		if (!pos) {
			return false;
		}
		cjs.Tween.get(lanternPic,{override:true}).set({x:pos});
		INDEX.btnTurnLantern.off('');
		INDEX.btnRule.off();
		g.showGame();
	};
	//an1 放烟花
	g.an1 = function(){
		STATUS = 'firing';
		var fire1 = new cjs.Bitmap(loader.getResult('fire1'));
		var fire2 = new cjs.Bitmap(loader.getResult('fire6'));
		var fire3 = new cjs.Bitmap(loader.getResult('fire3'));
		var fire4 = new cjs.Bitmap(loader.getResult('fire4'));
		var fire5 = new cjs.Bitmap(loader.getResult('fire5'));
		var fire6 = new cjs.Bitmap(loader.getResult('fire6'));
		var fire7 = new cjs.Bitmap(loader.getResult('fire7'));
		var fire8 = new cjs.Bitmap(loader.getResult('fire8'));



		fire1.x = 340+82; fire1.y = 210+85;
		fire2.x = 490+61; fire2.y = 180+60;
		fire3.x = 220+62; fire3.y = 344+60;
		fire4.x = 230+80; fire4.y = 300+77;
		fire5.x = 0+61; fire5.y = 370+60;
		fire6.x = 180+61; fire6.y = 270+60;
		fire7.x = 120+105; fire7.y = 214+107;
		fire8.x = 4+100; fire8.y = 130+130;
		fire1.alpha = fire2.alpha = fire3.alpha = fire4.alpha = fire5.alpha = fire6.alpha = fire7.alpha = fire8.alpha = 0;
		fire1.scaleX = fire2.scaleX = fire3.scaleX = fire4.scaleX = fire5.scaleX = fire6.scaleX = fire7.scaleX = fire8.scaleX = 0;
		fire1.scaleY = fire2.scaleY = fire3.scaleY = fire4.scaleY = fire5.scaleY = fire6.scaleY = fire7.scaleY = fire8.scaleY = 0;
		fire1.regX = 82; fire1.regY = 85;
		fire2.regX = 61; fire2.regY = 60;
		fire3.regX = 62; fire3.regY = 60;
		fire4.regX = 80; fire4.regY = 77;
		fire5.regX = 61; fire5.regY = 60;
		fire6.regX = 61; fire6.regY = 60;
		fire7.regX = 105; fire7.regY = 107;
		fire8.regX = 100; fire8.regY = 130;
		P1.addChild(fire1,fire2,fire3,fire4,fire5,fire6,fire7,fire8);

		function shootingFire(fire) {
			cjs.Tween.get(fire).to({scaleY: 1, scaleX: 1, alpha: 1},200)
			.to({scaleY: 1.2, scaleX: 1.2, alpha: 0},300);
		}

		gameMsc = cjs.Sound.play('firingBgm');
		cjs.Tween.get(fireUp).set({alpha: 1}).call(function(){
			cjs.Tween.get(fireShoot).to({y: 370}, 160).set({alpha: 0}).wait(7*340+500).call(function(){
				//console.log('call');
				if (gameMain.getChildAt(1) == P1) {
					//console.log('in if');
					STATUS = 'nofire';
					cjs.Tween.get(fireUp).set({alpha: 0});
					cjs.Tween.get(fireShoot).set({alpha: 1, y: 610});
				}
			});
		});

		setTimeout(function(){
			shootingFire(fire1);
		},160);
		setTimeout(function (){
			shootingFire(fire2);
		},500);
		setTimeout(function (){
			shootingFire(fire3);
		},2*360);
		setTimeout(function (){
			shootingFire(fire4);
		},3*360);
		setTimeout(function (){
			shootingFire(fire5);
		},4*360);
		setTimeout(function (){
			shootingFire(fire6);
		},5*360);
		setTimeout(function (){
			shootingFire(fire7);
		},6*360);
		setTimeout(function (){
			shootingFire(fire8);
		},7*340);
	};
	g.goHome = function (){
		STATUS = 'athome';
		var danianPerson = new cjs.Bitmap(loader.getResult('danianPerson'));

		danianPerson.set({x:0,y:420,alpha:0});
		gameMsc = cjs.Sound.play('carBa');
		cjs.Tween.get(danianCar).to({x:46},1200,cjs.Ease.cubicOut);

		cjs.Tween.get(danianPerson).wait(800).to({x:120,alpha:1},1600);
		g.floatSnow();
		P2.addChild(danianPerson);
	};
	g.getGift = function() {
		var gift1 = new cjs.Bitmap(loader.getResult('gift1'));
		var gift2 = new cjs.Bitmap(loader.getResult('gift2'));
		/*var gift3 = new cjs.Bitmap(loader.getResult('gift3'));
		var gift4 = new cjs.Bitmap(loader.getResult('gift4'));
		var gift5 = new cjs.Bitmap(loader.getResult('gift5'));*/
		var gift3 = gift1.clone();
		var gift4 = new cjs.Bitmap(loader.getResult('gift4'));
		var gift5 = new cjs.Bitmap(loader.getResult('gift5'));
		var gift6 = gift1.clone();
		var gift7 = gift4.clone();
		var gift8 = gift1.clone();
		var gift9 = gift1.clone();
		var gift10 = new cjs.Bitmap(loader.getResult('gift6'));
		var gift11 = gift5.clone();
		var gift12 = gift5.clone();
		var gift13 = gift5.clone();
		var gift14 = new cjs.Bitmap(loader.getResult('gift3'));
		var gift15 = new cjs.Bitmap(loader.getResult('gift3'));
		var giftArr;
		gift1.set({x:170,y:490});
		gift2.set({x:230,y:402});
		gift3.set({rotation:74,scaleX:0.56,scaleY:0.56,x:320,y:374});
		gift4.set({x:119,y:448});
		gift5.set({x:200,y:380});
		gift6.set({rotation:20,scaleX:0.66,scaleY:0.66,x:204,y:499});
		gift7.set({scaleX:0.56,scaleY:0.69,x:150,y:390});
		gift8.set({rotation:12,scaleX:0.86,scaleY:0.86,x:165,y:356});
		gift9.set({rotation:12,scaleX:0.76,scaleY:0.96,x:150,y:428});
		gift10.set({x:126,y:380});
		gift11.set({x:120,y:367,scaleX:0.6,scaleY:0.6});
		gift12.set({x:310,y:460,scaleX:0.6,scaleY:0.6});
		gift13.set({x:270,y:470,scaleX:1.2,scaleY:1.4});
		var mask13 = new cjs.Shape();
		mask13.graphics.beginFill().drawRect(0,0,111,86);
		mask13.set({x:270,y:470});
		gift13.mask = mask13;
		gift14.set({x:270,y:360});
		gift15.set({x:190,y:466});
		var mask15 = new cjs.Shape();
		mask15.graphics.beginFill().drawRect(0,0,94,72);
		mask15.set({x:180,y:486});
		gift15.mask = mask15;

		giftArr = [gift1,gift2,gift3,gift4,gift5,gift6,gift7,gift8,gift9,gift10,gift11,gift12,gift13,gift14,gift15]

		gameMsc = cjs.Sound.play('bubble');
		//for (var i = 14; i > -1; i--) {
		//	setTimeout(function(i){
				P4.addChildAt(giftArr[giftIndex],P4.numChildren-2);
		//	},113*(15-i),i);
		//}


		giftIndex++;
	};
	g.eatTangyuan = function (){
		STATUS = 'eating';

		var yanqiBox = new cjs.Container();
		var yanqi1 = new cjs.Shape();
		var yanqi2 = new cjs.Shape();
		var yanqi3 = new cjs.Shape();
		var yanqi4 = new cjs.Shape();
		yanqi1.graphics.beginFill('#fff').drawRoundRect(0,0,4,20,5);
		yanqi2.graphics.beginFill('#fff').drawRoundRect(17,-10,2,24,5);
		yanqi3.graphics.beginFill('#fff').drawRoundRect(67,5,4,20,5);
		yanqi4.graphics.beginFill('#fff').drawRoundRect(39,-4,3,30,5);
		yanqi1.alpha = 0.4;
		yanqi2.alpha = 0.6;
		yanqi3.alpha = 0.43;
		yanqi4.alpha = 0.35;
		yanqiBox.x = 310;
		yanqiBox.y = 450;
		shaozi.set({rotation:40});
		gameMsc = cjs.Sound.play('gulu');
		cjs.Tween.get(shaozi).to({rotation:-2,alpha:1},1500).call(function(){
			cjs.Tween.get(yanqi1).to({y:yanqi1.y-24,alpha:0},580);
			cjs.Tween.get(yanqi2).to({y:yanqi1.y-34,alpha:0},600);
			cjs.Tween.get(yanqi3).to({y:yanqi1.y-40,alpha:0},610);
			cjs.Tween.get(yanqi4).to({y:yanqi1.y-30,alpha:0},780);
			P5.addChild(yanqiBox);
		});
		eatTimer = setTimeout(function(){
			STATUS = 'notEat';
		},4000);
		yanqiBox.addChild(yanqi1,yanqi2,yanqi3,yanqi4);

		//P5.addChild(shaozi);
	};
	g.floatSnow = function(){
		$('#snow').removeClass('hide');
		window.snow.start();
		setTimeout(function(){
			$('#snow').addClass('hide');
			window.snow.stop();
		},5000);
	};
	g.getCoin = function (){
		//STATUS = 'gettingCoin';
		var yuanbao = new cjs.Bitmap(loader.getResult('yuanbao'));
		var coinSm = new cjs.Bitmap(loader.getResult('coinSm'));
		var coin1 = new cjs.Bitmap(loader.getResult('coin1'));
		var coin2 = new cjs.Bitmap(loader.getResult('coin2'));
		//var flash1 = new cjs.Bitmap(loader.getResult('flash1'));
		//var flash2= new cjs.Bitmap(loader.getResult('flash2'));
		yuanbao.set({regX:50,regY:50});
		coinSm.set({regX:76,regY:50});
		//flash1.set({y:70,x:70});
		//flash2.set({y:70,x:70});
		gameMsc = cjs.Sound.play('coin');
		//var coinNum = 36;
		//var coinIndex = 0;
		var i,temp,temp2,scaleYB;
		//var coinArr = [];
		function getRandomFrom(a,b) {
			return a + Math.random()*(b-a);
		}
		/*for (i = 0; i < coinNum; i++) {
			if ((i % 9) === 0) {
				temp = yuanbao.clone();
				scaleYB = getRandomFrom(0.3,0.66);
				temp.set({scaleX:scaleYB,scaleY:scaleYB});
			} else {
				temp = coinSm.clone();
			}
			temp.set({x:getRandomFrom(190,350),y:getRandomFrom(280,390)});
			coinArr.push(temp);
		}*/
		/*var s = new cjs.Shape();
		s.graphics.beginFill('#000').drawRect(0,0,240,110);
		s.set({x:110,y:280,alpha:0.4});
		P3.addChild(s)*/
		if ((coinIndex%9) === 0) {
			temp = yuanbao.clone();
			scaleYB = getRandomFrom(0.3,0.66);
			temp.set({scaleX:scaleYB,scaleY:scaleYB});
		} else {
			temp = coinSm.clone();
		}
		temp.set({x:getRandomFrom(110,350),y:getRandomFrom(280,390)});
		coinArr.push(temp);
		//var timerFun = function (){
		//	if (coinIndex === 35) {
		//		return;
		//	}
			var c = coinArr[coinIndex++];
			P3.addChildAt(c,P3.numChildren-2);
		//	setTimeout(timerFun,125);
		//}
		//var timer = setTimeout(timerFun,200);
		if (coinIndex === 1) {
			/*setTimeout(function(){
				GAME.showBottomBtn();
			},3688);*/
			specialGold = [yuanbao.clone(),yuanbao.clone(),yuanbao.clone(),coin1,coin2];
			//specialGold[0].set({scaleX:0.6,scaleY:0.6,x:198,y:390});

			specialGold[0].set({scaleX:0.5,scaleY:0.5,x:68,y:300});
			specialGold[1].set({scaleX:0.68,scaleY:0.68,x:355,y:302});
			specialGold[2].set({scaleX:0.5,scaleY:0.5,x:240,y:288});
			specialGold[3].set({x:256,y:332});
			specialGold[4].set({x:320,y:400});
			//for (i = 0, l = specialGold.length; i < l; i++) {

			//	setTimeout(function(i){
			//		P3.addChild(specialGold[i]);
			//	},668*(i+1),i);
			//}
		}

		//setTimeout(function(){

		//	flashing();

		//},4100);
		if (coinIndex === 36) {
			flashing();
		}
		function flashing (){



			for (i = 0, l = specialGold.length; i < l; i++) {

			//	setTimeout(function(i){
					P3.addChildAt(specialGold[i],P3.numChildren-2);
			//	},668*(i+1),i);
			}
			//flash1.set({alpha:1});
			//flash2.set({alpha:0});
			//cjs.Tween.get(flash1,{loop:true}).to({alpha:0},300).to({alpha:1},300);
			//cjs.Tween.get(flash2,{loop:true}).to({alpha:1},300).to({alpha:0},300);
			STATUS = 'coinDark';
			//P3.addChild(flash1,flash2);
			coinFlashTimer = setInterval(function(){
				if (STATUS === 'coinDark') {
					/*for (i = 0; i < coinNum; i++) {
						if ((i % 9) === 0) {
							coinArr[i].image = loader.getResult('yuanbaoLight');
						} else {
							if ((i % 3) === 0) {//三分之一加亮不然太多了
								coinArr[i].image = loader.getResult('coinSmLight');
							}
						}
					}*/
					for (i = 0; i < 2; i++) {
						specialGold[i].image = loader.getResult('yuanbaoLight');
					}
					bigYuanbao.image = loader.getResult('bigYuanbaoLight');
					STATUS = 'coinLight';
				} else if (STATUS === 'coinLight') {
					/*for (i = 0; i < coinNum; i++) {
						if ((i % 9) === 0) {
							coinArr[i].image = loader.getResult('yuanbao');
						} else {
							if ((i % 3) === 0) {//三分之一加亮不然太多了
								coinArr[i].image = loader.getResult('coinSm');
							}
						}
					}*/
					for (i = 0; i < 2; i++) {
						specialGold[i].image = loader.getResult('yuanbao');
					}
					bigYuanbao.image = loader.getResult('bigYuanbao');
					STATUS = 'coinDark';
				}
			},500);
		}
	};
	//重设
	g.reSet = function(){

	};
	//开始游戏，绑定事件
	g.start = function(){
		cjs.Touch.enable(stage);
		INIT.startTick();
		gameMsc = cjs.Sound.play('firecracker');
		gameMsc.loop = -1;
		//bgm = cjs.Sound.play('bgm');
		//bgm.loop = -1;

	};
	g.stop = function(){
		clearInterval(secondTimer);
		STOP = false;
	};
	//over
	g.over = function(){

		//stop render
		cjs.Touch.disable(stage);
		INIT.stopTick();
	}
	g.onProgress = function(p){
		var per = (p/1*100 | 0) + '%';
		var pp = document.getElementById("progress");
		pp.innerHTML = per;
		$('.loading-bar>div').css({
			width:per
		});
	}
	var hasDoneTimer;
	g.onComplete = function(){
		console.log("加载完毕！");
		var loading = $(".loading");
		loading.remove();
		g.init();//初始化游戏

	}
	return g;
})(window.GAME || {},createjs);

//init canvas

//加载资源
var manifest = [
	//music

	{src:'bubble.mp3',id:'bubble'},
	{src:'car_ba.wav',id:'carBa'},
	{src:'coin.mp3',id:'coin'},
	{src:'firing_long.wav',id:'firingLong'},
	{src:'gulu.wav',id:'gulu'},
	{src:'firing.mp3',id:'firingBgm'},
	{src:'firecracker.mp3',id:'firecracker'},
	//index
	{src:'bg.jpg',id:'bg'},
	{src:'big_lantern.png',id:'bigLantern'},
	{src:'pic_chuba.png',id:'picChuba'},
	{src:'pic_chunjie.png',id:'picChunjie'},
	{src:'pic_chuwu.png',id:'picChuwu'},
	{src:'pic_danian.png',id:'picDanian'},
	{src:'pic_xiaonian.png',id:'picXiaonian'},
	{src:'pic_yuanxiao.png',id:'picYuanxiao'},
	{src:'bg_popup_rule2.png',id:'bgPopupRule'},
	{src:'btn_close_popup.png',id:'btnClosePopup'},
	{src:'btn_turn_lantern.png',id:'btnTurnLantern'},
	{src:'btn_rule.png',id:'btnRule'},
	{src:'index_chick.png',id:'indexChick'},
	{src:'index_denglong.png',id:'indexDenglong'},
	{src:'index_kid.png',id:'indexKid'},
	{src:'index_parents1.png',id:'indexParents1'},
	{src:'index_parents2.png',id:'indexParents2'},
	{src:'index_parents3.png',id:'indexParents3'},
	{src:'index_parents4.png',id:'indexParents4'},
	{src:'index_bg.png',id:'indexBg'},
	//{src:'index_static_bg.png',id:'indexStaticBg'},
	{src:'index_s_bg.png',id:'indexStaticBg'},
	{src:'inner_white.png',id:'bg_inner_w'},
	{src:'inner_black.png',id:'bg_inner_b'},
	//初五
	{src:'bg_game_chuwu.png',id:'bgChuwu'},
	{src:'denglong.png',id:'denglong'},
	{src:'btn_tap.png',id:'btnTap'},
	{src:'btn_price.png',id:'btnPrice'},
	{src:'fire1.png',id:'fire1'},
//	{src:'fire2.png',id:'fire2'},
	{src:'fire3.png',id:'fire3'},
	{src:'fire4.png',id:'fire4'},
	{src:'fire5.png',id:'fire5'},
	{src:'fire6.png',id:'fire6'},
	{src:'fire7.png',id:'fire7'},
	{src:'fire8.png',id:'fire8'},
	{src:'fire_box.png',id:'fireBox'},
	{src:'fire_up.png',id:'fireUp'},

	//大年
	{src:'bg_game_danian.png',id:'bgDanian'},
	{src:'danian_denglong.png',id:'danianDenglong'},
	{src:'danian_person.png',id:'danianPerson'},
	{src:'danian_car.png',id:'danianCar'},
	//初八
	{src:'bg_game_chuba.png',id:'bgChuba'},
	{src:'chuba_yuanbao.png',id:'yuanbao'},
	{src:'chuba_coin_sm.png',id:'coinSm'},
	//{src:'chuba_coin_sm_light.png',id:'coinSmLight'},
	{src:'chuba_yuanbao_light.png',id:'yuanbaoLight'},
	{src:'chuba_coin1.png',id:'coin1'},
	{src:'chuba_coin2.png',id:'coin2'},
	{src:'chuba_big_yuanbao.png',id:'bigYuanbao'},
	{src:'chuba_big_yuanbao_light.png',id:'bigYuanbaoLight'},
	{src:'chuba_deco.png',id:'chubaDeco'},
	{src:'chuba_person.png',id:'chubaPerson'},
	//{src:'flash_gold1.png',id:'flash1'},
	//{src:'flash_gold2.png',id:'flash2'},
	//小年
	{src:'bg_game_xiaonian.png',id:'bgXiaonian'},
	{src:'xiaonian_gift1.png',id:'gift1'},
	{src:'xiaonian_gift2.png',id:'gift2'},
	{src:'xiaonian_gift3.png',id:'gift3'},
	{src:'xiaonian_gift4.png',id:'gift4'},
	{src:'xiaonian_gift5.png',id:'gift5'},
	{src:'xiaonian_gift6.png',id:'gift6'},
	{src:'xiaonian_mom.png',id:'xiaonianMom'},
	//元宵
	{src:'bg_game_yuanxiao.png',id:'bgYuanxiao'},
	{src:'yuanxiao_denglong.png',id:'yuanxiaoDenglong'},
	{src:'yuanxiao_shaozi.png',id:'shaozi'},

	{src:'bgm.mp3',id:'bgm'},
];


//初始化
window.INIT = new initCjs({
	'id':'canvas',//canvas的id
	'url':_URL,//资源路径
	'width':640,
	'height':1038,
	'frameRate':50,//刷新帧率
	'useSound':true,//是否使用音频sound.js
	'scaleMode':'exactFit',//适配模式:exactFit | fixedWidth | noScale | showAll
	'preload':manifest,//加载资源组:Array | String | Object
	'autoLoad':true,//是否自动加载
	'autoRender':false,
	'bgColor':'transparent',
	'onProgress':GAME.onProgress,//加载中回调
	'onComplete':GAME.onComplete,//加载完成回调
	'onError':function(msg){
		console.log(msg);
	}
});


//main
$(function(){

	$(document).on("touchmove",function(e){
		e.preventDefault();
	});
	//if ($('#audio').get(0).paused) {
		$(document).on('touchstart', function(event) {
			if ($('#audio').get(0).paused) {
				$('#audio').get(0).play();
			}
		});
	//}
	$('#canvas').on("swipeUp",function(){
		if(STATUS === 'nofire' || STATUS === 'nofire&first'){
			if (STATUS === 'nofire&first') {
				//GAME.showBottomBtn();
			}
			GAME.an1();
		}
	});
	$('#canvas').on("swipeRight",function(){
		if(STATUS === 'waitingHome'){

			GAME.goHome();
			/*setTimeout(function(){
				GAME.showBottomBtn();
			},1500);*/
		}
	});
	$('#canvas').on("tap",function(){
		if(STATUS === 'waitingCoin'){
			GAME.getCoin();

		} else if (STATUS === 'waitingGift') {
			if (giftIndex === 14) {
				//setTimeout(function(){
					//GAME.showBottomBtn();
				//},1);
				STATUS = 'getedGift';
				return false;

			}
			GAME.getGift();

		}
	});
	$('#canvas').on("swipeUp",function(){
		if(STATUS === 'notEat'){
			GAME.eatTangyuan();
			//setTimeout(function(){
				//GAME.showBottomBtn();
			//},2000);
		}
	});
	$('.btn-close-rule').on('tap', function(event) {
		$(this).closest('.barrier').addClass('hide');
	});
});
