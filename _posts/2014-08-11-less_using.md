---
layout:     post
title:      "less的使用"
subtitle:   ""
date:       2014-08-11 22:12:56
author:     "Paian"
catalog: true
tags:
    - LESS
---

## less的使用

   &_item写法

   font: 12px/18px ....代替font-size,line-height,font-weight等的写法。

   给父元素加个负的margin-right来消除子元素右边距超出父元素宽度的影响。

   ie6中，初始化时需要设置img{boder:none},消除默认的边框

   给float元素加上display:inline可以清除双边距。

   要让导入的css文件编译进当前文件中，需要写@import (less) 'a.css'，而不是写@import 'a.css'，后者只是作为外部文件引入，而不会编译进当前文件。