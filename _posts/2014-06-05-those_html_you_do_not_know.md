---
layout:     post
title:      "那些你不知道的HTML"
subtitle:   ""
date:       2014-06-05 21:27:21
author:     "Paian"
catalog: true
tags:
    - HTML
---

## 那些你不知道的HTML

### ```<keygen>```是一个合法的HTML5标签吗?

答案:

是

### ```<bdo>```可以改变默认的文本方向吗?

答案:

是的。

例如:

    <!DOCTYPE HTML>
    <html>
    <body>

    <bdo dir="rtl">
    How are you!
    </bdo>

    </body>
    </html>

这样一段代码展示的结果是:

!uoy era woH

其中的```dir	```属性,可以取值为ltr(从左往右)或者rtl(从右往左)。

### 同一个页面中有多个```<h1>```标签,会对页面的搜索引擎排名造成负面的影响吗?

答案:

不会的。

其实,之前曾有人用在页面中添加多个```<h1>```的办法来改善搜索引擎排名,不过随着搜素引擎排名算法的优化,这种有利影响越来越小。

参见[这里](https://www.quora.com/Does-using-multiple-h1-tags-on-a-page-affect-search-engine-rankings)


### 在展现搜索结果列表时,如果你想重点标记结果列表中的检索词,应该用哪个标签?

应该用```<mark>关键词</mark>```标签,这个标签是专门用来突出显示部分文本的。


### 下面代码中,图片会被浏览器加载吗?

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div style="display: none;">
    <img src="http://img1.imgtn.bdimg.com/it/u=183662834,412759883&fm=11&gp=0.jpg" alt="note book">
</div>
</body>
</html>
```

答案:

是的,会被加载。这一点和CSS为```display:none```的元素的子元素的样式中所引用的外部样式中的图片不会被加载的情况是不同的,需要注意区分。

### 下面代码中,CSS会在alert弹出之前加载和解析完成吗?

    <link rel="stylesheet" href="main.css">
    <script>
    alert();
    </script>

答案:

是的


### 下面代码中,第二个CSS样式是否会在第一个CSS样式加载完成之前就开始加载?

答案:

是的


### 下面代码中,第二个样式文件也需要在Paragraph 1渲染之前下载和解析完成吗?

    <head>
        <link href="main1.css" rel="stylesheet">
    </head>
    <body>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <link href="main2.css" rel="stylesheet">
    </body>

答案:

是的





