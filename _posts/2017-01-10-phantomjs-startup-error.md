---
layout:     post
title:      "一个因为未配置PHANTOMJS_BIN环境变量导致的phantom.js启动错误"
subtitle:   ""
date:       2017-01-10 16:45:30
author:     "Paian"
catalog: true
tags:
    - phantom.js
    - 测试
    - bug
    - 日常拾遗
---

在Mac系统下配置karma测试时，遇到一个phantom.js的启动错误：

    No binary for PhantomJS browser on your platform.

    Please, set "PHANTOMJS_BIN" env variable.

大致的原因是没有配置PHANTOMJS_BIN环境变量。

解决办法：

```
export PHANTOMJS_BIN=/usr/local/lib/node_modules/phantomjs/lib/phantom/bin/phantomjs
```

