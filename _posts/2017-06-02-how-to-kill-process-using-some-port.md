---
layout:     post
title:      "怎么强制结束被占用的端口"
subtitle:   ""
date:       2017-06-02 23:16:35
author:     "Paian"
catalog: true
tags:
    - 日常拾遗
    - 端口占用
---

### 一、Mac 中

Fast and quick solution :

```
lsof -n -i4TCP:8080
```

PID is second field.

```
kill -9 PID
```

### 二、windows中


```
netstat -ano | findstr 443
```

一般来说，如果有程序在占用的话，输出的第一行的最后一列就是占用了443端口的PID。

找到这个PID之后，我们就用如下命令强制结束它：

```
taskkill /F /IM 这里输入上面找出来的PID
```
