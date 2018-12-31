---
layout:     post
title:      "微信内页面退出回流的实现思路"
subtitle:   ""
date:       2017-07-13 22:19:56
author:     "Paian"
catalog: true
tags:
    - 微信页面退出回流
---

微信内页面返回时如何不直接退出，而是退到另一个页面？这是很多产品想实现的一个功能。目的是尽可能地增加用户对自身页面的访问时间，减少客户流失。

```javascript
function Goback(url){
  setTimeout(function () {
      if (history.length < 3) {   //注意这里 历史列表中URL的数量,满足条件说明这个页面是首次打开，而不是从首页或者其他页面跳转过来的。
            var state = {title: "index",url: url};
            window.history.pushState(state, "index", location.href);
            state = {title: "index",url: ""};
            window.history.pushState(state, "index", "");
      }
      window.addEventListener("popstate", function (e) {
        if (window.history.state != null && window.history.state.url != "") {
          location.href = window.history.state.url
        }
      });
  }, 1500);
}
Goback("http://wwww.baidu.com");//你想返回的页面
```

目前这个功能只在部分浏览器支持，以及微信和支付宝的内置浏览器，而且必须是没有浏览记录或者单独一个窗口首次打开。

这个部分需要用到三个东西：

`history.pushState`

`window.onpopstate`

微信内置浏览器JS：`WeixinJSBridge.call('closeWindow');`

你可以在最后一个（需要点击返回退出浏览器的）页面载入的时候借助 `history.pushState` 保存下两个状态：

`history.pushState({page : 'state1'},'state','#state1');`

`history.pushState({page : 'state2'},'state','#state2');`

然后监听返回按钮的点击事件（事实上就是出发了浏览器的历史记录变动事件），当监听到用户点击返回按钮时执行类似下面的函数，调用微信内置JS函数`WeixinJSBridge.call('closeWindow');` 关闭浏览器，即可完成用户点击返回按钮退出微信浏览器的操作。

```javascript
window.onpopstate = function(event) {
  if (event.state.page === 'state1') {
    WeixinJSBridge.call('closeWindow');
  }
}
```

下面这段是今日头条的源码：

```javascript
var n = 0;
if (!(n = y.getItem("weixinlist_count"))) {
  n = Number(n || 0), y.setItem("weixinlist_count", 0);
  var o = location.href,
    i = location.search.slice(1),
    a = "//" + location.host;
  n || (y.setItem("weixinlist_query", i),

    a = b.default.appendQuery(a, "W2atIF=1"),
    a = b.default.appendQuery(a, "weixin_list=0"),
    a = b.default.appendQuery(a, i),

  history.replaceState({
    page: "weixinlist",
    href: a
  }, null, a),

  history.pushState({page: "weixindetail"}, null, o)),

  window.onpopstate = function (e) {
    var t = e.state;
    console.log("onpopstate", t), t && "weixinlist" === t.page && (console.log("in"), location.reload())
  }
}
```

摘自这个js:

http://s3b.pstatp.com/growth/mobile_detail/js/weixin.3VIhOkgj.js

来自这个页面：

https://m.toutiao.com/i6504794473552151053/?tt_from=weixin&utm_campaign=client_share&timestamp=1514521989&app=news_article&utm_source=weixin&iid=22054332502&utm_medium=toutiao_android&wxshare_count=1

http://www.jb51.net/article/82673.htm

https://www.cnblogs.com/superjinyang/p/6744917.html
