---
layout:     post
title:      "一种九宫格布局的实现"
subtitle:   ""
date:       2013-08-02 21:25:17
author:     "Paian"
catalog: true
tags:
    - CSS
    - 布局
---

## 一种九宫格布局的实现

要实现一个九宫格的布局，纯由CSS搞定，应该怎么做呢？下面是一个大体兼容到IE7的方案。但是，边线部分未做兼容。感兴趣的看官可以自己把伪元素替换成实际的元素，并辅以JavaScript对边线的隐藏动作来最终实现完全兼容。

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="format-detection" content="telephone=no, address=no, email=no">
	<title>Document</title>
	<style type="text/css">
		html, body{
			margin: 0;
			padding: 0;
		}
		.fn-clear{
			*zoom: 1;
		}
		.fn-clear:after{
			display: table;
			content: '';
			clear: both;
		}
		.layout-square-grid{
			position: relative;
		}
		.layout-square-grid:before{
			content: '';
			position: absolute;
			z-index: 1;
			left: 0; /*for IE8*/
			bottom: 0;
			width: 100%;
			border-bottom: 1px solid #000;
		}
		.cell {
			position: relative;
			float: left;
			width: 33.33%;
			padding-bottom: 33.33%;
		}
		.cell:before{
			content: '';
			position: absolute;
			right: 0;
			height: 100%;
			border-right: 1px solid #000;
		}
		.cell:after{
			content: '';
			position: absolute;
			bottom: 0;
			width: 100%;
			border-bottom: 1px solid #000;
		}
		.cell:nth-child(3n):before{
			display: none;
		}
		.content {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.content img{
			display: block;
			width: 100%;
			height: 100%;
		}
	</style>
</head>
<body>
	<div class="layout-square-grid fn-clear">
		<div class="cell" style="background: red;">
			<!-- 怎么让内容不溢出 -->
			<div class="content">
				内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
			</div>
		</div>
		<div class="cell" style="background: yellow;">
			<!-- 变化2: 往格子中加入一张图片，图片可能是任意大小，但都让它完整充满格子，只对图片缩放，不裁剪 -->
			<div class="content">
				<img src="https://mobilesite.github.io/corpus/images/jiangnan.jpg">
			</div>
		</div>
		<div class="cell" style="background: green;">
			<div class="content">
				内容
			</div>
		</div>
		<!-- 变化3: 往格子中加入一张图片，图片可能是任意大小，但都让它完整充满格子，只对图片裁剪，不进行缩放 -->
		<div class="cell" style="background: url('https://mobilesite.github.io/corpus/images/jiangnan.jpg') center center no-repeat; background-size: cover;">
			<div class="content">
				内容
			</div>
		</div>
		<div class="cell" style="background: pink;">
			<div class="content">
				内容
			</div>
		</div>
		<div class="cell" style="background: gold;">
			<div class="content">
				内容
			</div>
		</div>
		<div class="cell" style="background: purple;">
			<div class="content">
				内容
			</div>
		</div>
		<div class="cell" style="background: orange;">
			<div class="content">
				内容
			</div>
		</div>
	</div>

	<span class="other-content">
		这是九宫格之外的内容，测试浮动清除成功与否
	</span>
</body>
</html>
```
