---
layout:     post
title:      "Vue.js学习笔记"
subtitle:   "单纯靠HTML5页面如何实现下载一个文件"
date:       2015-01-18 22:57:13
author:     "Paian"
catalog: true
tags:
  - HTML5
  - 下载文件
---

### 单纯靠HTML5页面如何实现下载一个文件

因为浏览器端是无权限写入文件的，所以采用点击一个按钮下载文件时，实际上是做了类似如下这样的操作：

```javascript
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
```

这里有一个坑，在我的mac电脑上模拟手机访问页面的时候，发现单击时element.click();没有触发，而只有连续多次点击时才会触发，经过排查发现是fastclick导致的。所以我们通过缩小fastclick的作用范围来解决：

```javascript
fastclick.attach(document.getElementById('page-wrapper'));
```
注意不要绑定到`document.body`上，因为fastclick会导致一些动态创建的元素的click事件触发失效，比如我们用到的下载keystore的按钮那里，所以把body预留出来，让这些会收到fastclick影响的元素append到body上，从而不在fastclick的处理范围内。
