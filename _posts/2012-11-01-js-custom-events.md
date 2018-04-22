---
layout:     post
title:      "JavaScript自定义事件的实现"
subtitle:   ""
date:       2012-11-01 21:23:12
author:     "Paian"
catalog: true
tags:
    - JavaScript
    - 类型检测
---

事件是与DOM交互时的最常见方式，但他们其实也可以用于非DOM代码中。怎么用于非DOM代码中呢？通过自定义事件来实现。

下面就是对于自定义事件的一个实现。所谓自定义事件的实现，实际上就是要实现一个事件管理对象，通过它可以添加事件监听、触发事件以及移除事件监听。核心思想是以一个二维数组来管理每个事件类型对应的事件处理函数。

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>自定义事件的实现</title>
</head>
<body>
	<script type="text/javascript">

		//事件是与DOM交互时的最常见方式，但他们其实也可以用于非DOM代码中。怎么用于非DOM代码中呢？通过自定义事件来实现。
		function EventTarget () {
			this.handlers = {};
		}

		EventTarget.prototype = {
			constructor: EventTarget,
			addHandler: function(type, handler) {
				if (typeof this.handlers[type] == 'undefined') {
					//当前type的handlers对象还不存在的话，就先初始化一个对象来存放它
					this.handlers[type] = [];
				}

				this.handlers[type].push(handler);
			},

			fire: function(event) {
				if (!event.target) {
					event.target = this;
				}

				if (this.handlers[event.type] instanceof Array) {
					var handlers = this.handlers[event.type];
					for (var i = 0, len = handlers.length; i < len; i++) {
						handlers[i](event);
					}
				}
			},

			removeHandler: function(type, handler) {
				if (this.handlers[type] instanceof Array) {
					var handlers = this.handlers[type];
					var i;
					for (i = 0, len = handlers.length; i < len; i++) {
						if (handlers[i] === handler) {
							break;
						}
					}
					handlers.splice(i, 1);
				}
			}
		}
	</script>
</body>
</html>
```
