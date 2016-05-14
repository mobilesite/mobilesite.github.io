---
layout:     post
title:      "常用JavaScript代码段"
subtitle:   ""
date:       2014-04-06 21:12:36
author:     "Paian"
catalog: true
tags:
    - JavaScript基础
---

## 常用JavaScript代码段

### 一、history的前进与后退

    history.back(0);  //刷新
    history.back(1);  //前进
    history.back(-1); //直接返回当前页的上一页，数据全部被清空，是个新页面
    history.go(-1);   //也是返回当前页的上一页，不过表单里的数据全部还在

