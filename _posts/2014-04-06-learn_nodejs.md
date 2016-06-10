---
layout:     post
title:      "开启新纪元——进击node.js学习笔记"
subtitle:   ""
date:       2014-04-06 21:12:36
author:     "Paian"
catalog: true
tags:
    - node.js
---

## 开启新纪元——进击node.js学习笔记

### 一、node.js 的版本常识

偶数版为稳定版本，基数版为非稳定版本。开发的话一定要使用稳定版本，即使用像0.6.x,0.8.x,0.10.x,0.12.x这样的版本。


### 二、mac系统下的node.js安装

	xcode-select -p
	xcode-select --install
	python -V   #注意这里是大写的V
	ruby -v

打开brew.sh网站，把homebrew的安装语句

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

拷贝到终端上执行它。

	brew install node

当然，也可以用homebrew来安装mogodb、git等等。语句为brew install mogodb git

	node -v

使用npm install -g n安装n模块，可以用n模块来安装指定的node版本和切换不同的node版本。比如，如果想安装0.10.33版本的node.js，就可以在终端中输入：

	n 0.10.33

安装完后，可以在终端中输入n，然后按向上或向下方向键来切换至你所需的node.js版本。

在终端中输入node所进入的执行环境与浏览器的控制台中所进入的环境是不一样的，一些顶层的对象会有区别。比如，在前者中输入process会打印出来该对象，在后者中输入window会打印出来该对象。但是，如果在前者中输入window或者在后者中输入process都会报错。

### 三、如何用node.js建立一个服务器，提供调试AJAX请求的测试环境

首先来看怎样用node.js启动一个服务器。代码比较简单，如下所示：

	var http = require('http'); //  依赖一个用js写好了的http模块
	http.createServer(function(req,res){
		res.writeHead( 200, { 'content-type' : 'plain/text' } );
		res.end('Hello, node.js!\n');
	}).listen(1337,'127.0.0.1');


其中的

	function(req,res){
		res.writeHead( 200, { 'content-type' : 'plain/text' } );
		res.end('Hello, node.js!\n');
	}

是一个匿名的回调函数。指的是当监听到127.0.0.1的1337端口的访问后，用该匿名回调函数进行回调处理。

上面是用node.js启动一个服务器的基本操作。如果更进一步的话，我们可以修改它成一个突出jsonp数据的后台服务，用以提供前端开发时AJAX请求的测试环境。


	var http = require('http'),
		util = require('util'),
		url = require('url');
	http.createServer(function (req, res) {
		var myJsonpCallback = url.parse(req.url,true).query.callbackParam,//从访问地址中解析出来callbackParam的值
			responseData = {
				github:'paiangit',
				name:'paian'
			} ;//responseData是要发回客户端的json数据
		console.log('Request received: \n');
		console.log('从url中取得的参数值为' + myJsonpCallback +'\n');//打印出callbackParam这一URL参数的值
		util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url);
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		req.on('data', function () {
			console.log('Data received!');
		});
		res.end(myJsonpCallback + '(' + JSON.stringify(responseData) + ')');
	}).listen(1337,'127.0.0.1');
	console.log('Server running on port http://127.0.0.1:1337/');


相应地，前台的AJAX请求可以这么写：

	$.ajax({
		url:"http://127.0.0.1:1337/",
		dataType:'jsonp',
		data:{
			'adata':adata   //这是随异步请求发送给服务端的某条数据，当然也可以不发送
		},
		jsonp:'callbackParam',
		jsonpCallback:"myJsonpCallback",
		/*这里的jsonp和jsonpCallback两个参数会组合成callbackParam=myJsonpCallback的形式附加在请求的URL后面。
		*上文中node.js代码的var myJsonpCallback = url.parse(req.url,true).query.callbackParam这一语句就是用来
		*获取所发来的请求的URL中的URL中callbackParam=myJsonpCallback的callbackParam参数的值的。
		*获得这个值之后会套在返回的json串外面，构成jsonp,实现跨域。服务端返回的数据格式是这样的:
		* myJsonpCallback({
		*	 github:'paiangit',
	    *    name:'paian'
		* })
		*/
		success:function(result){
			console.log('My github is' + result.github);
			console.log('And my name is' + result.name);
		},
		error:function(){
			console.log('Sorry, the request is playing a joke!')
		}
		timeout:3000
	});
