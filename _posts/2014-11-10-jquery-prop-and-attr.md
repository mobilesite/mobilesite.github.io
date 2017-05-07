---
layout:     post
title:      "关于jQuery的`attr()`和`prop()`的误用"
subtitle:   ""
date:       2014-11-10 21:39:32
author:     "Paian"
catalog: true
tags:
    - jQuery的`attr()`和`prop()`
    - 坑
    - 日常拾遗
---

## 关于jQuery的`attr()`和`prop()`的误用

自 jQuery 1.6 版本起，`attr()`方法对于未设置的 attributes（即标签中没写该 attribute），都会返回 `undefined`。对于获取和改变 DOM 的 properties，如表单元素的 checked、selected 或 disabled 状态，应使用 `.prop()` 方法。

