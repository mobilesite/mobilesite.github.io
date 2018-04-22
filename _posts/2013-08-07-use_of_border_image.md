---
layout:     post
title:      "border-image的使用"
subtitle:   ""
date:       2013-08-07 20:52:11
author:     "Paian"
catalog: true
tags:
    - CSS
---

```
.border_image{
    -webkit-border-image:url(../image/border.png) 20/10px repeat;
}
```

20是边框背景图片被裁剪的位置，即距离背景图片左上、右上、左下、右下20像素的位置将图片裁成9块，其中四个角上的四块作为目标元素的四个角的边框，10是边框大小，repeat表示目标元素除四个角以外所剩下的那四周的边框以背景图片所裁下来区块的大小从边框中部向两头重复填充边框，而round则会处理所裁图片的大小，伸缩成能按整数个区块的方式铺满边框，strech则表示只以一个区块进行拉伸来铺满该边边框。

详细可参见：http://www.zhangxinxu.com/wordpress/2010/01/css3-border-image%E8%AF%A6%E8%A7%A3%E3%80%81%E5%BA%94%E7%94%A8%E5%8F%8Ajquery%E6%8F%92%E4%BB%B6/

