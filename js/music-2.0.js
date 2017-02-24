/*
 * Music.js v2.0
 * 本文件依赖于jweixin-1.0.0.js，为确保音频能自动及正常播放，请置于wx.ready方法内调用
 * 2016.9.22
 * Ray
 */
;(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define('Music', [], function (M) {
      return (root.Music = factory(M));
    });
  } else {
    root.Music = factory();
  }
})(this, function(){
	var body = document.getElementsByTagName("body")[0],
		styleT= document.createElement("style");
	function _music(){
		this.Version = "2.0";
		this.URL = "images/";
		this.isPlaying = false;
		this.setPlay = true;//是否设置播放
	}
	//用于拓展
	_music.Fn = _music.prototype = {
		bgMusic:function(config){
			var def = {
				"width":"2rem",
				"height":"2rem",
				"right":"2rem",
				"top":"2rem",
				"left":"auto",
				"bottom":"auto",
				"rotate":false,
				"url":this.URL,
				"name":"music.mp3",
				"loop":true,
				"auto":true
			};
			//复制配置
			if(config){
				for(var key in config){
					def[key] = config[key];
				}
			}
			var btn = document.createElement("div"),
				music = document.createElement("audio"),
				wrap = document.createElement("div");
			//样式
			styleT.setAttribute("type","text/css");
			//audio
			music.setAttribute("preload","preload");
			//wrap
			body.appendChild(styleT);
			body.appendChild(wrap);
			wrap.className = "music-wrap";
			wrap.appendChild(btn);
			wrap.appendChild(music);
			//click
			var isRotate = false;
			btn.addEventListener("click",function(){
				if(music.paused){
					music.play();
					btn.className = isRotate ? "music-open music-rotate" : "music-open";
					this.isPlaying = true;
					this.setPlay = true;
				}else{
					music.pause();
					btn.className = "music-paused";
					this.isPlaying = false;
					this.setPlay = false;
				}
			});
			this.stop = function(){
				if(!music.paused){
					music.pause();
					btn.className = "music-paused";
					this.isPlaying = false;
				}
			}
			this.bgBtn = btn;
			this.play = function(){
				if(music.paused){
					music.play();
					btn.className = isRotate ? "music-open music-rotate" : "music-open";
					this.isPlaying = true;
				}
			}
			//默认自动播放
			if(def.loop){
				music.setAttribute("loop","loop");
			}
			//是否自动播放
			if(def.auto){
				btn.className = "music-open";
				music.play();
				this.isPlaying = true;
				this.setPlay = true;
			}else{
				btn.className = "music-paused";
				this.isPlaying = false;
			}
			//是否旋转
			if(def.rotate){
				btn.className += " music-rotate"; 
				isRotate = true;
			}
			//重设
			styleT.innerHTML = ".music-wrap{position:absolute;width:1.6rem;height:1.6rem;z-index:999;right:2rem;top:2rem;}.music-wrap div{width:100%;height:100%;background-repeat:no-repeat;background-position:0 0;-webkit-background-size:100% 100%;background-size:100% 100%;}.music-rotate{animation:rotate 3s linear infinite;-webkit-animation: rotate 3s linear infinite;}.music-open{background-image:url(" + def.url +"btn_music.png);}.music-paused{animation-play-state:paused;-webkit-animation-play-state:paused;background-image:url(" + def.url + "btn_music_close.png) !important;}@keyframes rotate{from{transform: rotateZ(0deg);}to{transform: rotateZ(360deg);}}@-webkit-keyframes rotate{from{-webkit-transform: rotateZ(0deg);}to{-webkit-transform: rotateZ(360deg);}";
			var styleStr = 'width:' + def.width + ';height:' + def.height + ';right:' + def.right + ";top:" + def.top + ";left:" + def.left + ";bottom:" + def.bottom;
			wrap.setAttribute("style",styleStr);
			music.innerHTML = '<source src="' + (def.url + def.name) + '"></source>您的浏览器不支持Audio标签哦。';
			return music;
		},
		sound:function(config){
			if(arguments.length == 0){
				console.warn("请指定音效文件...");
				return false;
			}
			var base = this.URL,
				src = base;
			//直接使用完整路径
			if(typeof config == "string"){
				src = config.indexOf(base) > -1 ? config : base + config;
			}else if(typeof config == "object" && !(config instanceof Array)){
				var def = {
					'name':'',
					'url':base,
					'auto':false,
					'loop':false
				}
				for(var k in config){
					def[k] = config[k];
				}
				src = def.url + def.name;
			}
			var tag = document.createElement("audio"),
				source = '<source src="' + src + '"></source>您的浏览器不支持Audio标签哦。';
			tag.innerHTML = source;
			tag.style.display = "none";
			body.appendChild(tag);
			tag.preload = "auto";
			if(def){
				if(def.loop){
					tag.loop = "loop";
				}
				def.auto && tag.play();
			}
			return tag;
		}
	}
	return _music;
})