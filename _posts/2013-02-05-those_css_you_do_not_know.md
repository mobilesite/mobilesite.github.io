---
layout:     post
title:      "[译]那些你不知道的CSS"
subtitle:   ""
date:       2013-02-05 20:17:13
author:     "Paian"
catalog: true
tags:
    - CSS
---

## [译]那些你不知道的CSS

### CSS对大小写是否敏感?

例如:

    .container{
        Margin-Left: 100px;
    }

这样有效吗?



答案:

有效




### 对于一个display为inline的元素设置样式 ```{ margin:100px; }``` 会产生怎样的效果(不考虑其它元素对该元素可能造成的特殊影响)?



答案:

产生的效果是元素左、右边距各为100px,上下边距为0.

这里容易被忽略的是,display为inline的元素上设置的margin-top和margin-bottom是无效的。

不过,当元素的display变成inline-block的时候,则是生效的。


### 对于display为inline的元素设置样式 ```{ padding-top:100px; }``` 会改变该元素自生的尺寸吗?


答案:

不会。


### CSS选择器```:checked{ }```对于样式的定义只会作用于```<input type="radio" checked>``` 和 ```<input type="checkbox" checked>```, 而对```<option selected> option 1 </option>```无效, 这样的说法对吗?


答案:

错误。对三者都是会产生作用的。


### CSS选择器```:root```作用于哪个元素?



答案:

html元素。


### ```p:nth-of-type(odd){ background:#ff0000; }```表示什么?



答案:

它表示在所有元素中查找p元素,把所有父元素相同,且处于同一层级的p元素分成一组,对每一组中的第奇数个p元素加上指定的背景样式。


### 下面我们来看一组CSS中所引用的外部图片的加载问题,看看哪些图片会被浏览器加载,哪些则没有被加载?

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .useless{
            /* 1号图 */
            background: url("http://img.leikeji.com/resource/img/6a57aa0f829b434ba1193158c26aac16.jpg");
        }
        .displayNone{
            display: none;
            /* 2号图 */
            background: url("http://img32.ddimg.cn/91/17/1181196712-1_u_1.jpg");
        }
        .visibilityHidden{
            visibility: hidden;
            /* 3号图 */
            background: url("http://www.ijizhi.com/img/UploadFile/201112240102149.jpg");
        }
        .displayNone .inDisplayNone{
            /* 4号图 */
            background: url("http://tu.webps.cn/tb/img/2/T10b07XbdfXXar1t.._111728.jpg");
        }
        .visibilityHidden .inVisibilityHidden{
            /* 5号图 */
            background: url("http://img.gatewang.com/thumb_cache/files/2014/11/23/14166750487686,c_fill,h_800,w_800.jpg");
        }
    </style>
</head>
<body>
    <div class="displayNone">
        <div class="inDisplayNone"></div>
    </div>

    <div class="visibilityHidden">
        <div class="inVisibilityHidden"></div>
    </div>
</body>
</html>

答案:

我们把这段代码做成一个页面,用开发者工具查看网络请求会发现,2、3、5号图被浏览器加载了,而1号图和4号图未被加载。这表明,页面中未被使用的样式语句所引用的外部资源是不会被加载的,而```display:none```的元素的子元素的样式中所引入的外部资源,也是不会被加载的。但是,```display:none```和```visibility:hidden```的元素自身的样式所引用的外部资源是会被加载的。而且```visibility:hidden```的元素的子元素的样式所引用的外部资源也是会被加载的。

翻译自[http://davidshariff.com/quiz/](http://davidshariff.com/quiz/),加上了自己的理解分析,并进行了整理删减。