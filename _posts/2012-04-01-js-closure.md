---
layout:     post
title:      "理解JavaScript中的闭包"
subtitle:   ""
date:       2012-04-01 22:19:11
author:     "Paian"
catalog: true
tags:
    - 闭包
---

闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数。下面是个例子：

```
function createComparisonFunction(propertyName){
	return function(object1, object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];

		if (value1 < value2) {
			return -1;
		} else if (value1 > value2) {
			return 1;
		} else {
			return 0;
		}
	}
}
```

上述代码中，内部函数（这里是一个匿名函数）`function(object1, object2)`有权访问另一个函数`function createComparisonFunction(propertyName)`的作用域中的变量。例如，其中：

```
var value1 = object1[propertyName];
var value2 = object2[propertyName];
```

这两句代码访问了外部函数中的变量propertyName。即使这个内部函数被返回了，而且是在其他地方被调用了，但它仍然可以访问变量propertyName。

之所以还能够访问这个变量，是因为内部函数的作用域链中包含createComparisonFunction()的作用域。


