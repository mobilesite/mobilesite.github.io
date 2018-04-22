---
layout:     post
title:      "canvas实现星星闪烁特效"
subtitle:   ""
date:       2015-02-21 21:34:11
author:     "Paian"
catalog: true
tags:
    - canvas
---

main.js

	var  can, ctx,
	girlPic = new Image(),
	starPic = new Image(),
	num = 60,
	stars = [],
	lastTime,
	deltaTime,
	switchy = false;

	function init(){
		can = document.getElementById('canvas');
		ctx = can.getContext('2d');
		w = can.width;
		h = can.height;

		document.addEventListener('mousemove',mousemove,false);

		girlPic.src = "src/girl.jpg";
		starPic.src = "src/star.png";

		for(var i = 0; i < num; i++){
			var obj = new starObj();
			stars.push(obj);
			stars[i].init();
		}

		lastTime = Date.now();
		gameloop();
	}

	document.body.onload = init;

	function drawBackground(){
		ctx.fillStyle = "#393550";
		ctx.fillRect(0,0,w,h);
	}

	function drawGirl(){
		//drawImage(img,x,y,width,height)
		//x粥坐标正方向向右，y轴正方向向下
		ctx.drawImage(img,100,150,600,300);
	}

	function mousemove(e){
		if(e.offsetX || e.layerX){
			var px = e.offsetX == undefined ? e.layerX  : e.offsetX;
			var py = e.offsetY == undefined ? e.layerY  : e.offsetY;
			// 我们约定，如果鼠标不在范围内，switchy= false；反之为true
			if( px > 100 && px <700 && p>150 && py<450){
				swichy =true;
			}
			else{
				switchy = false;
			}
		}
	}

	function gameloop(){
		window.requestAnimFrame(gameloop);

		var now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;

		//这里如果用console.log(deltaTime)将每次循环的时间间隔打印出来的话，会发现它是一个不断变化的值，这是由requestAnimationFrame所导致的。
		drawBackground();
		drawGirl();
		drawStars();
	}


	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||  window.mozRequestAnimationFrame  || window.oRequestAnimationFrame ||  window.msRequestAnimationFrame  || function(callback,element){
			return window.setTimeout(callback,1000/60)
		}
	})();

	stars.js
	var starObj =  function(){
		this.x;
		this.y;

		this.picNo;
		this.timer;

		this.xSpd;
		this.ySpd;
	}

	starObj.prototype.init = function(){
		this.x = Math.random()*600 + 100; // Math.random()   的取值区间是 [0,1)
		this.y = Math.random()*300 + 150;

		this.picNo = Math.floor(Math.random()*7);
		this.timer = 0;

		this.xSpd = Math.random()*3 - 1.5; // [-1.5,1.5]
		this.ySpd = Math.random()*3 - 1.5;// [-1.5,1.5]
	}
	starObj.prototype.update= function(){
		this.x += this.xSpd * deltaTime * 0.004;
		this.y += this.ySpd * deltaTime * 0.004;

		// this.x超过范围，则重新生成
		if(this.x < 100 || this.x >700){
			this.init();
			return;
		}
		// this.y超过范围，则重新生成
		if(this.y<150 || this.y>450){
			this.init();
			return;
		}

		this.timer += deltaTime;
		if(this.timer > 50){
			this.picNo += 1;
			this.picNo %= 7;
			this.timer = 0;
		}
	}
	starObj.prototype.draw = function(){
		//drawImage(img, sx, sy, swidth, sheight, x, y, width, height)
		ctx.drawImage(starPic, this.x, this.y);
	}

	function drawStars(){
		for(var i = 0; i < num; i++){
			stars[i].update();
			stars[i].draw();
		}
	}


	function drawStar(){
		ctx.drawImage(starPic, 300, 400);
	}


