---
layout:     post
title:      "Mac怎么强制结束被占用的端口"
subtitle:   ""
date:       2017-06-02 23:16:35
author:     "Paian"
catalog: true
tags:
    - 日常拾遗
    - Mac
---

Fast and quick solution :

```
lsof -n -i4TCP:8080
```

PID is second field.

```
kill -9 PID
```
