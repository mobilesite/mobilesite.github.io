---
layout:     post
title:      "使用Gulp的时候遇到的一些坑"
subtitle:   ""
date:       2015-07-05 23:52:12
author:     "Paian"
catalog: true
tags:
    - Gulp
    - bug
    - 日常拾遗
---

### 一、`gulp watch`时，出现Error: The thunkFunction already filled

其实这个错误是用了gulp-sequence插件导致的，解决办法参考[https://github.com/teambition/gulp-sequence/issues/2](https://github.com/teambition/gulp-sequence/issues/2)，原理就是加入callback回调。

### 二、加的`console`、`debugger`、`alert`语句毫无效果

这很有可能是被 [gulp-strip-debug](https://github.com/sindresorhus/gulp-strip-debug) 或 urglify 插件过滤掉了。

这两个插件会在gulp打包的时候自动剔除代码中的`console`、`debugger`、`alert`。所以，你会发现虽然你加了这些调试语句，但好像毫无反应。正确的做法是在调试时，把这两个插件从你的gulpfile.js配置文件中注释掉。

### 三、`gulp.watch`方法中配置的路径使用了`./`开头导致的新增无法被检测到的问题。

用 `./`开头作为当前路径开始，会导致无法监测到新增文件，所以直接省略掉 './' 即可。即，把形如'./images/' 的路径改成'images/'。



