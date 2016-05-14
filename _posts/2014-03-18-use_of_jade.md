---
layout:     post
title:      "jade模板的使用"
subtitle:   ""
date:       2014-03-18 20:14:32
author:     "Paian"
catalog: true
tags:
    - jade
---

## jade模板的使用

### 一、基本操作

	npm install jade -g
	jade -P index.html      #编译jade文件
	jade -P -w index.html      #当文件变化时实时编译jade文件

class用.，id用#，文本内容以空格分开，属性放在括号内，以等号连接属性名和属性值，属性之间以逗号隔开，例如：a#gotop.gotop(href='#',target='blank') back to top

如果文本内容很长，不想编译出来的内容都被压缩到一行上，可以在该文本内容之前加.然后把文本内容该分行的地方进行分行书写，以方便阅读。
例如:

	p.
	    1. aaa
	    2. bbb

或者在文本的每一行加上竖线和空格。例如

	p
	     | 1. aaa
	     | 2. bbb

### 二、jade中的条件语句：

（1）

	if
	elseif
	else

（2）

	unless

（3）
	case  变量名:
	when  '值':
	       p 这是第一语句
	when  '值':
	       p 这是第二语句
	when  '值':
	       p 这是第三语句
	default
	       p 这是默认语句

### 三、mixin的使用

先定义它：

	mixin mixin的名字
	        p  '这一行是mixin的内容'

再使用它：

	+mixin的名字

例子:

	mixin lesson
	        p  '这是个例子'
	+lesson

	mixin study(name,courses)
	       p  #{name} study
	       ul.courses
	       each course in courses
	                li = course
	+study('tom',['jade','java'])

	mixin group(student)
	     h4  #{student.name}
	     +study(student.name,student.courses)
	+group({name:'tom',courses:['jade','java']})

	mixin team(slogan)
	      h4 #{slogan}
	      if(block)
	            block
	      else
	            no team
	+team('slogan')
	      p good job!

### 四、模板的引入

	include style    //把style.jade引入


