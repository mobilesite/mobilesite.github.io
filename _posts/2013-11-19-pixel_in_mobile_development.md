---
layout:     post
title:      "弄清移动端开发中的像素"
subtitle:   ""
date:       2013-11-19 22:14:32
author:     "Paian"
catalog: true
tags:
    - 移动适配
---

## 弄清移动端开发中的像素

### 一、pixel和dp

![](/img/in-post/pixel_and_dp.jpg)

px(pixel)是逻辑像素，CSS所指定的像素就是逻辑像素，而dp(pt)是物理像素（device independent pixels）。

### 二、dpr(device pixel radio)

dpr是设备像素缩放比。

1px（逻辑像素）＝ dpr^2 * dp(物理像素)

![](/img/in-post/physical_pixel_and_logic_pixel.jpg)

如果dpr为2的话，一个逻辑像素等于4各物理像素，具体到长度或宽度这某一个具体的维度的话，一个逻辑像素就相当于两个物理像素。

### 三、dpi和ppi

dpi: dot per inch

ppi: point per inch

![](/img/in-post/ppi_calculate.jpg)

上图是以iphone5为例子的ppi的计算。为什么除以4，因为iphone5是4英寸，而ppi是指每英寸内的像素密度。4英寸指的是手机对角线的长，所以用1136^2 ＋ 640^2开根号获得对角线的物理像素数，然后再除以对角线的英寸数，所得结果就是每单位英寸内的像素密度，即ppi。

ppi越高，同一面积内像素数越多，画面越清晰。

![](/img/in-post/pixel_scale.jpg)

![](/img/in-post/pixel_basic_knowledge.jpg)

iphone5的物理像素是640＊1136，而其逻辑像素是320*568，也就是说，用CSS设置一个元素320px＊568px宽的话，就可以占满真个屏幕宽度。


