---
layout:     post
title:      "最简明易懂的webpack教程(一)"
subtitle:   ""
date:       2015-11-01 22:52:07
author:     "Paian"
catalog: true
tags:
    - webpack
---

## 最简明易懂的webpack教程(一)

看网上很多人都在找webpack的中文文档，但可能无奈于内容太多，又具有一定的专业性，暂时还没有人系统地进行翻译。本文中，我将尽可能把自己学习、使用webpack的一些理解整理出来，以期能方便初学者克服一些障碍，迅速掌握这个工具。

开始之前，值得注意的是，以下采用的是Mac OS系统做的演示，windows系统下的操作应差别不大。

### 一、为什么会有webpack这东西？

这个问题主要包含两个方面：（1）webpack能够干什么？（2）现有的相关方案有什么不能满足需求的地方，导致要webpack登场？

#### 1.webpack能够干什么？

简单地说，它就是一个将项目的一堆互相依赖的零件打包成一组浏览器可读的文件的工具。这些项目为什么需要打包呢？这是因为随着前端业务越来越复杂，要处理这些任务所用到的技术、工具也越来越复杂，因此对于这些技术、工具的组织也就越来越复杂。具体来说，主要表现在以下方面：

a. 项目需要划分为许多小的模块以降低单个模块代码的复杂度，而且模块之间又互相依赖，产生复杂的依赖关系;

b. 使用ECMAScript 6、TypeScript等对JavaScript语言的扩展以及SCSS、LESS等CSS预处理器，以获得更优雅、高效的编程体验;

c. 对图片、代码进行压缩等处理，以减小页面的kb数;

d. 在代码更改后，自动进行打包、刷新浏览器页面的处理，以减少反复而枯燥的此类手工操作。

#### 2.现有的相关方案有什么不能满足需求的地方，导致要webpack登场？

现有的用于解决上述类似问题的方案有[grunt](http://gruntjs.com)以及[gulp](http://www.gulpjs.com.cn)。这两个工具基本上可以解决上述大多数问题了，只不过，其打包时候的速度着实比较慢，而打包这一动作又恰恰是前端开发中出现频度极高的动作。试想一下这样的场景，你修改了一句代码，然后有个打包工具替你打包，它确实帮你实现了自动刷新浏览器中正在调试的页面的功能，但是你得等上半分钟。一次两次你还能忍，一百次一千次呢？当然不想忍！！这时，webpack出来了，让你改一下代码，“瞬间”就能在浏览器上看到同步的变化，这种开发体验是不是要好很多？

有很多人在问，webpack与grunt、gulp的区别，我觉得，最实在的一点莫过于效率。这恰好是解决了前端打包中的一个痛点。当然，

### 二、学习使用webpack之前的准备工作

开始使用webpack之前，我们需要先准备一个demo项目。

#### 1.开始前的准备

首先你需要执行```node -v```确定一下你的机器有没有安装node，如果没有安装的话，先去[node.js官网](https://nodejs.org/en/download/)下载所对应的系统版本的node.js installer进行安装。然后你就可以开始建立一个demo项目了。

```mkdir webpackdemo```  # 新建webpackdemo目录

```cd webpackdemo```     # 切换到webpackdemo目录

```npm init```           # 初始化一个[npm](https://docs.npmjs.com/getting-started/what-is-npm)项目，这个语句会帮你生成一个标准的package.json文件。关于package.json的更多内容，可以到[这里](https://docs.npmjs.com/getting-started/using-a-package.json)查看。该语句执行过程中会有一些提示，让你确认或填写pacakge.json文件中一些字段的信息，你只需回车确认就好。

然后，我们来建立几个简单的文件，用于学习webpack使用的练手。

下面列出各个文件的代码清单，你只需拷贝这些代码，按照上图的目录放进对应的文件中即可。

(1) /src/pages/test-normal/test-normal.html

—— 作为入口的html文件。

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html，body{
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div id="say_container"></div>
    <script src="../../../build/js/test-normal.js"></script>
</body>
</html>
```

(2) /src/pages/test-normal/test-normal.js

—— 作为入口的js文件。

```
var say = require("../../components/say-normal/say-normal.js");
say('say_container','Hello, webpack!');
```

(3) /src/components/say-normal/say-normal.js

—— 一个组件文件，用于接收容器id和待输出的信息两个参数，然后在网页中的该id所指定的容器中插入一段消息。

```
module.exports = function (containerId， msg) {
    var msgNode = document.createElement('p');
    msgNode.innerHTML = msg;
    document.getElementById(containerId).appendChild(msgNode);
}
```

(3) .gitignore

—— 一个用于控制哪些信息不要提交到git上的配置文件

```
.DS_Store
node_modules
*/node_modules
npm-debug.log
.idea/*
.editorconfig
.jshintrc
.sass-cache/
mods/.sass-cache/
```

这些文件建立好了之后，我们的demo项目就建立完成了。

#### 2.安装webpack

就一句命令：

```npm install --save-dev webpack```

执行这句命令不仅会将webpack安装好，而且会将webpack的版本信息写入项目的package.json文件中。这样，当其他人拿到你的这个项目时，只需要执行```npm install```就会把当前项目所依赖的所有npm包都安装好（因为package.json中管理着当前项目依赖的全部npm包的版本信息）。

友情提示一下：建议安装国内的npm镜像，这样下载npm包会快上很多，具体做法有两种。

方式一：

```npm install xx --registry=https://registry.npm.taobao.org```

方式二：安装淘宝提供的cnpm工具，然后再用cnpm去安装所需的npm模块

```
npm install -g cnpm
cnpm install xxx
```

这里我们采用方式二。比如你也可以这样安装webpack:

```
cnpm install webpack --save-dev
```

### 三、webpack的简单使用

#### 1、直接把打包配置项写在命令行中实现打包

在已建好的demo项目中，如果直接用浏览器访问src/test-normal/test-normal/index.html这个文件，什么也看不到，当你用Chrome浏览器的开发者工具条查看console面板时，你会发现浏览器报错了一个404错误，提示webpackdemo/build/js/test-noraml.js这个文件找不到。这是因为webpackdemo/build/js目录下还并不存在test-normal.js这个文件。下面我们首先要做的就是通过webpack把src/pages/test-normal/test-normal.js文件打到build/js/test-normal.js中。

我们执行这个命令：

```node_modules/.bin/webpack src/pages/test-normal/test-normal.js build/js/test-normal.js```

其中src/pages/test-normal/test-normal.js和build/js/test-normal.js显然是待打包的入口文件和需要被打包到的目标文件。node_modules/.bin/webpack是webpack的位置，这是因为刚才执行```npm install --save-dev```命令的时候，把webpack安装到了当前项目的node_modules文件夹下。如果我们不想写这么长的一串，其实可以将webpack进行全局安装，即使用命令```npm install -g webpack```把webpack进行全局安装，这样我们就可以直接用```webpack src/pages/test-normal/test-normal.js build/js/test-normal.js```来达到相同的效果了。

#### 2、把打包配置项写在配置文件中实现打包

上面，我们已经通过命令行的方式实现文件的打包了。但是，对于复杂一点的打包，每次都敲一长串的命令行显然太费劲了。好在，webpack替我们想到了。我们可以把复杂的配置选项写进配置文件里。在项目的根目录webpackdemo下新建一个webpack.config.js文件。

webpack.config.js

```
module.exports = {
    entry: __dirname + '/src/pages/test-normal/test-normal.js',
    output: {
        path: __dirname + '/build',
        filename: '/js/test-normal.js'
    }
}
```

其中，__dirname是node.js的一个全局变量，它指向当前被执行脚本所在的目录。

另外，注意一下path配置选项，它表示的是打包后的JS、CSS、图片等的输出目录。

现在，你只需在控制台中输入```webpack```回车即可实现前文通过```webpack src/pages/test-normal/test-normal.js build/js/test-normal.js```命令所实现的功能。

到这里，我们对webpack能干什么，怎样进行webpack的安装以及用webpack进行一个最简单的文件打包有了初步的了解。下一篇我们将进一步介绍更为复杂的项目如何用webpack打包。
