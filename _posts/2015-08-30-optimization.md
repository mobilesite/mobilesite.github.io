---
layout:     post
title:      "几点前端优化的小技巧"
subtitle:   ""
date:       2015-08-30 21:33:26
author:     "Paian"
catalog: true
tags:
    - 前端优化
---

### 条件判断语句的优化

以下的表达式都返回false：

null

undefined

'' (空字符串)

0 (数字0)


以下的都返回true：

'0' (字符串0)

[] (空数组)

{} (空对象)

所有平时的写法 if(y != null && y != ''){} 可以写的更短些 if(y){}

下面的代码可以被三元运算符所替代：

	if(var != 0){
		return foo();
	}else{
		return bar();
	}

可以写成：

	return val ? foo() : bar();

&& 和 ||(oper2)这两个二元布尔操作符可以根据前面的代码判断后面的代码是否执行，“|| ”可以被称为默认操作符

	var win;
	if(opt_win){
	  win = opt_win;
	}else{
	  win = window;
	}

可替换为

	var win = opt_win || window;
