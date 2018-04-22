---
layout:     post
title:      "几种水平垂直居中的实现方法"
subtitle:   ""
date:       2014-12-25 23:15:21
author:     "Paian"
catalog: true
tags:
    - 水平垂直居中实现方案
---

### 一、通过position和负的margin来实现

实现代码如下。

HTML片段：

```
<div class="div1">
    <div class="inner">负margin实现的水平垂直居中</div>
</div>
```

CSS片段：

```
.div1{
    position: relative;
    width: 100%;
    height: 100%;/*这个外层容器必须要有高度*/
    /*height: 300px; */
    background: #03A9F4;
}
.div1 .inner{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 200px;
    height: 200px;
    margin-left: -100px;
    margin-top: -100px;
    background: #fff;
    color: #000;
}
```

其特点在于，需要知道那个待水平垂直居中的内容的宽度
和高度。另外，外部容器必须设置高度才行。如果外部容器的高度采用的是`height:100%;`这样的样式来设置的话。那就需要注意，得从html,body等直至该容器元素的所有元素都设置上高度才能让容器的高度真正生效。

此方案兼容性非常好。

### 二、通过display设置table和table-cell实现

实现代码如下。

HTML片段：

```
<div class="div2">
    <div class="inner">display:table和display:table-cell实现的水平垂直居中，IE6-7下不兼容。需要注意的是：设置了display: table-cell的元素设置宽度和高度是不生效的</div>
</div>
```

CSS片段：

```
.div2{
    width: 100%;
    height: 300px;
    background: green;
    display: table;
}
.div2 .inner{
    display: table-cell; /*设置了display: table-cell的元素设置宽度和高度是不生效的*/
    background: gold;
    color: #000;
    vertical-align: middle;
    text-align: center;
}
```

需要注意的是：设置了`display: table-cell`的元素设置宽度和高度是不生效的。

IE6-7下此方案不兼容。

### 三、通过-webkit-box或-webkit-flex实现

实现代码如下。

HTML片段：

```
<div class="div3">
    <div class="inner">display:-webkit-box实现的水平和垂直居中，注意：float、clear、vertical-align对于flex items无效</div>
</div>
```

CSS片段：

```
.div3{
    width: 100%;
    height: 300px;
    background: yellowgreen;

    /*display: -webkit-box;*/
    /*-webkit-box-align: center;*/
    /*-webkit-box-pack: center;*/

    display: -webkit-flex;
    -webkit-align-items: center; /*垂直居中*/
    -webkit-justify-content: center;/*水平居中*/
}
.div3 .inner{
    width: 200px;
    height: 200px;
    background: #fff;
    color: #000;

    /*display: -webkit-box;*/
    /*-webkit-box-align: center;*/
    /*-webkit-box-pack: center;*/

    /*display: -webkit-flex;*/
    /*-webkit-align-items: center; !*垂直居中*!*/
    /*-webkit-justify-content: center;!*水平居中*!*/
}
```

其中，

```
display: -webkit-box;
-webkit-box-align: center;
-webkit-box-pack: center;
```

和

```
display: -webkit-flex;
-webkit-align-items: center; /*垂直居中*/
-webkit-justify-content: center;/*水平居中*/
```

二者实现的效果是一样的，只是老版本和新版本之间的差别而已。为了兼容不同的新老版本浏览器，往往需要把所有的新老几个版本的实现、包括各种浏览器私有前缀都写上。


2016.11.20更新

### 四、通过CSS Grid Layout实现

实现代码如下。

HTML片段：

```
<div class="div4">
    <div class="inner">display:grid实现的水平和垂直居中，注意：column、float、clear和 vertical-align 元素对网格容器不起作用无效</div>
</div>
```

CSS片段：

```
.div4{
    display: grid;
    grid-template-columns: auto 200px auto;
    grid-template-rows: auto 200px auto;
    width: 100%;
    height: 300px;
    background: red;
}
.div4 .inner{
    grid-column: 2;
    grid-row: 2;
    background: #fff;
    color: #000;
}
```

此方法目前浏览器支持还不成熟，相信将来一定会是一种重要的实现方法。

最后，附以上四种方案的演示代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <meta name="format-detection" content="telephone=no,email=no">
    <title>几种实现水平和垂直居中对齐的方法</title>

    <style>
        *{
            margin: 0;
            padding: 0;
        }

        html, body{
            height: 100%;
        }


        .div1{
            position: relative;
            width: 100%;
            height: 100%;/*这个外层容器必须要有高度*/
            /*height: 300px; */
            background: #03A9F4;
        }
        .div1 .inner{
            position: absolute;
            left: 50%;
            top: 50%;
            width: 200px;
            height: 200px;
            margin-left: -100px;
            margin-top: -100px;
            background: #fff;
            color: #000;
        }

        .div2{
            width: 100%;
            height: 300px;
            background: green;
            display: table;
        }
        .div2 .inner{
            display: table-cell; /*设置了display: table-cell的元素设置宽度和高度是不生效的*/
            background: gold;
            color: #000;
            vertical-align: middle;
            text-align: center;
        }

        .div3{
            width: 100%;
            height: 300px;
            background: yellowgreen;

            /*display: -webkit-box;*/
            /*-webkit-box-align: center;*/
            /*-webkit-box-pack: center;*/

            display: -webkit-flex;
            -webkit-align-items: center; /*垂直居中*/
            -webkit-justify-content: center;/*水平居中*/
        }
        .div3 .inner{
            width: 200px;
            height: 200px;
            background: #fff;
            color: #000;

            /*display: -webkit-box;*/
            /*-webkit-box-align: center;*/
            /*-webkit-box-pack: center;*/

            /*display: -webkit-flex;*/
            /*-webkit-align-items: center; !*垂直居中*!*/
            /*-webkit-justify-content: center;!*水平居中*!*/
        }

        .div4{
            display: grid;
            grid-template-columns: auto 200px auto;
            grid-template-rows: auto 200px auto;
            width: 100%;
            height: 300px;
            background: red;
        }
        .div4 .inner{
            grid-column: 2;
            grid-row: 2;
            background: #fff;
            color: #000;
        }

    </style>
</head>
<body>
    <div class="div1">
        <div class="inner">负margin实现的水平垂直居中</div>
    </div>

    <div class="div2">
        <div class="inner">display:table和display:table-cell实现的水平垂直居中，注意IE6-7下不兼容。需要注意的是：设置了display: table-cell的元素设置宽度和高度是不生效的</div>
    </div>

    <div class="div3">
        <div class="inner">display:-webkit-box实现的水平和垂直居中，注意：float、clear、vertical-align对于flex items无效</div>
    </div>

    <div class="div4">
        <div class="inner">display:grid实现的水平和垂直居中，注意：column、float、clear和 vertical-align 元素对网格容器不起作用无效</div>
    </div>
</body>
</html>
```