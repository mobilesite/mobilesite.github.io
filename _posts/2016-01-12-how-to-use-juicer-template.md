---
layout:     post
title:      "juicer模板的使用"
subtitle:   ""
date:       2016-01-12 22:21:32
author:     "Paian"
catalog: true
tags:
    - juicer模板
    - 页面截断
---

### 一、juicer模板的使用

什么是juicer(what)？

Juicer 是一个高效、轻量的前端 (Javascript) 模板引擎，使用 Juicer 可以是你的代码实现数据和视图模型的分离(MVC)。 除此之外，它还可以在 Node.js 环境中运行。Juicer渲染速度很快（百万次渲染耗时仅174ms，具体请移步性能测试，但这个性能可能没想的那么重要）、Juicer库文件很小（压缩文件仅7.7KB），能帮助你实现MVC结构，同时支持Node环境。
通过这个例子直观的展现出前端模板引擎的好处所在，这么做能够完全剥离html和代码逻辑，便于多人协作和后期的代码维护。

一个完善的模板引擎应该兼顾这几点:

语法简明

执行效率高

安全性

错误处理机制

多语言通用性

a.语法

循环： `{@each}…{@/each}`
判断：`{@if}…{@else if}…{@else}…{@/if}`
变量（支持函数）：`${varname|function}`
注释：`{# comment here}`

b.安全性

juicer对数据输出做了安全转义，如果不想被转义，可以使用`$${varname}`。

c.错误处理

如果没有错误处理机制，在模版编译和渲染出现错误的时候，js会停止加载
juicer的错误处理机制会在出现错误时跳过当前步骤并在控制台上提示Juicer Compile Exception: Unexpected token，不会因为错误导致后续js无法执行。

### 二、一个关于juicer模板渲染导致页面截断的问题

发现一个关于juicer模板渲染导致页面截断的问题。经过测试，发现是给juicer模板传入了带有如下特殊字符的变量内容所致：

主要出问题的有单引号、双引号、&字符。

一个比较典型的测试case：

`SELECT * FROM users WHERE name=&#39;***&#39;;`

由于特殊字符导致juicer模板渲染出错后，会使得该渲染位置之后的页面内容均不再渲染，从而出现页面截断的状况。而且此时并不会报错！这是一个比较坑的地方。

解决办法是在使用juicer模板的时候使用`$$`，即比一般的渲染多加一个`$`。

juicer中，`$${}`内部的变量不会被转义

juicer中的内联辅助函数的使用：

```
{@helper numberPlus}
    function(number) {
        return number + 1;
    }
{@/helper}

var tpl = 'Number: ${num|numberPlus}';
```

juicer中的注释：

```
{# comment here}
```

### 三、juicer中的对于模版语法的正则匹配的源码解析

```
juicer.tags = {
    // 操作开
    operationOpen: '{@',
    // 操作闭
    operationClose: '}',
    // 变量开
    interpolateOpen: '\\${',
    // 变量闭标签
    interpolateClose: '}',
    // 禁止对其内容转义的变量开
    noneencodeOpen: '\\$\\${',
    // 禁止对其内容转义的变量闭
    noneencodeClose: '}',
    // 注释开
    commentOpen: '\\{#',
    // 注释闭
    commentClose: '\\}'
};


juicer.tagInit = function() {
    /**
        * 匹配each循环开始，以下都是OK的
        * `each VAR as VALUE`, 如 {@each names as name}
        * `each VAR as VALUE ,INDEX`，如 {@each names as name,key}
        * `each VAR as`，如 {@each names as}
        * 需要说明后两种情况:
        * `,key` 是一起被捕获的，所以在编译模板的时候，系统会用`substr`去掉`,`
        * as 后没有指定别名的话，默认以`value`为别名，所以
        * {@each names as} 等价于 {@each names as value}
    */
    var forstart = juicer.tags.operationOpen + 'each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?' + juicer.tags.operationClose;
    // each循环结束
    var forend = juicer.tags.operationOpen + '\\/each' + juicer.tags.operationClose;
    // if条件开始
    var ifstart = juicer.tags.operationOpen + 'if\\s*([^}]*?)' + juicer.tags.operationClose;
    // if条件结束
    var ifend = juicer.tags.operationOpen + '\\/if' + juicer.tags.operationClose;
    // else条件开始
    var elsestart = juicer.tags.operationOpen + 'else' + juicer.tags.operationClose;
    // eles if 条件开始
    var elseifstart = juicer.tags.operationOpen + 'else if\\s*([^}]*?)' + juicer.tags.operationClose;
    // 匹配变量
    var interpolate = juicer.tags.interpolateOpen + '([\\s\\S]+?)' + juicer.tags.interpolateClose;
    // 匹配不对其内容转义的变量
    var noneencode = juicer.tags.noneencodeOpen + '([\\s\\S]+?)' + juicer.tags.noneencodeClose;
    // 匹配模板内容注释
    var inlinecomment = juicer.tags.commentOpen + '[^}]*?' + juicer.tags.commentClose;
    // for辅助循环
    var rangestart = juicer.tags.operationOpen + 'each\\s*(\\w*?)\\s*in\\s*range\\(([^}]+?)\\s*,\\s*([^}]+?)\\)' + juicer.tags.operationClose;
    // 引入子模板
    var include = juicer.tags.operationOpen + 'include\\s*([^}]*?)\\s*,\\s*([^}]*?)' + juicer.tags.operationClose;
    // 内联辅助函数开始
    var helperRegisterStart = juicer.tags.operationOpen + 'helper\\s*([^}]*?)\\s*' + juicer.tags.operationClose;
    // 辅助函数代码块内语句
    var helperRegisterBody = '([\\s\\S]*?)';
    // 辅助函数结束
    var helperRegisterEnd = juicer.tags.operationOpen + '\\/helper' + juicer.tags.operationClose;

    juicer.settings.forstart = new RegExp(forstart, 'igm');
    juicer.settings.forend = new RegExp(forend, 'igm');
    juicer.settings.ifstart = new RegExp(ifstart, 'igm');
    juicer.settings.ifend = new RegExp(ifend, 'igm');
    juicer.settings.elsestart = new RegExp(elsestart, 'igm');
    juicer.settings.elseifstart = new RegExp(elseifstart, 'igm');
    juicer.settings.interpolate = new RegExp(interpolate, 'igm');
    juicer.settings.noneencode = new RegExp(noneencode, 'igm');
    juicer.settings.inlinecomment = new RegExp(inlinecomment, 'igm');
    juicer.settings.rangestart = new RegExp(rangestart, 'igm');
    juicer.settings.include = new RegExp(include, 'igm');
    juicer.settings.helperRegister = new RegExp(helperRegisterStart + helperRegisterBody + helperRegisterEnd, 'igm');
};
```

为了简便起见，我们只解析其中的一个正则，其它的可以举一反三。

```
each\\s*([^}]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?
```

`\\s*`表示空格可有可无
`([^}]*?)`表示以非贪婪匹配的方式，匹配0-n个非}的字符
`(\\w*?)`表示以非贪婪匹配的方式，匹配0-n个数字、字母或下划线的字符

https://github.com/PaulGuo/Juicer/blob/master/src/juicer.jshttps://github.com/PaulGuo/Juicer