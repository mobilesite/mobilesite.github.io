---
layout:     post
title:      "关于webpack打包中的hash、chunkhash和contenthash"
subtitle:   ""
date:       2016-12-26 23:23:43
author:     "Paian"
catalog:    true
tags:
    - hash
    - webpack
---

关于hash:

项目中打包的文件中任何一个修改了，hash就会变。

关于chunkhash：

当前chunk中的打包的某个文件变了，chunkhash就会变。

关于contenthash：

文本文件的内容变了，contenthash会变。因为样式在webpack中也是以js那样的形式引入的，所以js文件变化时，会导致chunkhash变化，而css由于位于同一chunk，所以每次JS变了而CSS没变的时候，导出的CSS文件也会跟着变，然而这是不科学的，怎么办呢？使用contenthashnew

```
ExtractTextPlugin('[name].[chunkhash].css');
```


