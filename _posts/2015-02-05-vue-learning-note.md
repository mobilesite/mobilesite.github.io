---
layout:     post
title:      "Vue.js学习笔记"
subtitle:   ""
date:       2015-02-05 22:52:11
author:     "Paian"
catalog: true
tags:
    - vue.js
---

## Vue.js学习笔记

### 1.1 Vue.js是什么？

它是一个轻量（17kb min+gzip 运行大小）、简洁、高效的前端开发框架，以数据驱动 + 组件化的方式进行前端开发。Github项目star数多，社区完善。Vue.js在其官方右上角的导航中提供了社区的入口。其中，比较有用的是Github的issues、Vue.js论坛及Vue.js的聊天室。

Vue.js学习曲线较为平稳，既没有angular那样多的如依赖注入等的概念，也没有react那样需要首先学习JSX语法的要求，同时Vue.js吸收了angular的指令和react的组件化之所长。

### 1.2 当前Vue.js实战学习资料极度缺乏

目前网上关于Vue.js的实战资料极度缺乏，有的只是API的介绍或者类似todoList这样的极其简单的demo创建性质的教程，而非我们所需要的那种完整的用Vue.js开发APP的具有实战意义的学习资料。

在这里，我们将从需求分析、脚手架工具、数据mock、架构设计、代码编写、自测、编译打包等方面系统地学习基于Vue.js的前端开发。当然也包括组件化、模块化的开发方式以及一些移动端的开发技巧（如flex布局、sticky block、一像素细线等等）。

vue-resource是Vue.js的数据请求插件。并非必须。

### 1.3 近年来前端开发的趋势

- 旧的浏览器逐渐被淘汰（如IE6-8），使得ES5的一些新特性可以大展身手，如`Object.defineProperties()`，Vue.js就是依赖于这个方法来实现数据双向绑定的。

- 前端交互越来越多，功能越来越复杂

- 从后台MVC向RESTfull API + 前端MV*迁移

### 1.4 什么是RESTful架构：

其中REST是Representational State Transfer的缩写，即"表现层状态转化"。

REST的名称"表现层状态转化"中，省略了主语。"表现层"其实指的是"资源"（Resources）的"表现层"。所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。你可以用一个URI（统一资源定位符）指向它，每种资源对应一个特定的URI。URI就成了每一个资源的地址或独一无二的识别符。所谓"上网"，就是与互联网上一系列的"资源"互动，调用它的URI。

"资源"是一种信息实体，它可以有多种外在表现形式。我们把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。
URI只代表资源的实体，不代表它的形式。

访问一个网站，就代表了客户端和服务器的一个互动过程。在这个过程中，势必涉及到数据和状态的变化。
互联网通信协议HTTP协议，是一个无状态协议。这意味着，所有的状态都保存在服务器端。因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。

客户端用到的手段，只能是HTTP协议。具体来说，就是HTTP协议里面表示操作方式的动词。

常用的HTTP动词有下面五个（括号里是对应的SQL命令）。

GET（SELECT）：从服务器取出资源（一项或多项）。

POST（CREATE）：在服务器新建一个资源。

PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。

PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。

DELETE（DELETE）：从服务器删除资源。

还有两个不常用的HTTP动词。

HEAD：获取资源的元数据。

OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

下面是一些例子。

GET /zoos：列出所有动物园

POST /zoos：新建一个动物园

GET /zoos/ID：获取某个指定动物园的信息

PUT /zoos/ID：更新某个指定动物园的信息（提供该动物园的全部信息）

PATCH /zoos/ID：更新某个指定动物园的信息（提供该动物园的部分信息）

DELETE /zoos/ID：删除某个动物园

GET /zoos/ID/animals：列出某个指定动物园的所有动物

DELETE /zoos/ID/animals/ID：删除某个指定动物园的指定动物

综上所述，所谓RESTful架构，就是：

（1）每一个URI代表一种资源；

（2）客户端和服务器之间，传递这种资源的某种表现层；

（3）客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"。

PUT是幂等方法，POST不是。所以PUT用于更新、POST用于新增比较合适。

幂等：在编程中，一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。

### 1.5 MVVM

view <===> view model <===> model
视图          通讯          数据
DOM           观察者        JS对象

如上图所示，view和model不能直接通讯，而要通过view model来进行。view model是观察view或model的变化，来对应改变另一方。

参考资料：

http://www.ruanyifeng.com/blog/2011/09/restful

MVVM的应用场景：

- 具有复杂交互逻辑的前端应用

- 提供基础的架构抽象

- 通过异步请求实现数据持久化，保证交互体验（局部刷新，减少重新加载的资源量和减少部分重新渲染）

### 1.6 Vue.js的数据响应原理

假设我们有数据对象a.b，在Vue对象实例化的过程中，会通过ES5的Object.defineProperty方法给对象a的b属性添加getter和setter方法，同时，Vue.js会对模板做编译，解析生成一个个的指令对象，每个指令对象都会关联一个watcher，当我们获取a.b的值的时候，就会触发它的getter方法，把依赖收集到watcher里面。当设置a.b的值的时候，会触发setter方法，通知watcher，watcher会对a.b再次求值，并将求值结果与原值进行比较，当发现新值与原来的值不一样，watcher就会通知指令对象，调用指令的update方法。由于指令是对DOM的封装，所以它就会调用DOM里的方法去更新视图，这样就完成了从数据改变到视图自动更新的过程。

### 1.7 Vue.js的组件化

组件化的目的是扩展HTML元素，封装可重用的代码。

### 1.8 vue-cli

首先安装它：

```
npm i vue-cli -g
```

vue-cli是Vue.js的脚手架工具，可以帮助我们搞定目录结构、本地调试、代码部署、热加载、单元测试。它的使用命令是：

vue init <template-name> <project-name>

例如：

```
vue init webpack vueapp
```

我们发现生成的目录的static目录下只有一个.gitkeep文件，它是干什么用的呢？实际上，它是为了让src这个空目录能够正常上传到git上去的，因为默认情况下，空目录是不会上传到git上的，会被自动忽略掉。

### 1.9 .babelrc

它是babel的一些配置。

```
{
    "presets": ["es2015", "stage-2"],
    "plugins": ["transform-runtime"],
    "comments": false
}
```

presets是babel编译的时候需要预先加载的一些模块，因为我们这里需要编译ES6，所以需要预先加载babel-preset-es2015模块。那么，这里的stage-x表示什么呢？它表示从stage-x到stage-3的范围，比如，这里stage-2表示的就是从stage-2到stage-3的范围。stage-0、stage-1、stage-2、stage-3分别是ECMAScript不同阶段的提案。在preset中加入stage-x的目的是让babel在编译时除了预先加载babel-preset-es2015模块外，也去加载babel-preset-stage-x模块。babel-preset-stage-x模块包含了一些ES2015中还未包含的更新的语法，我们姑且称它为ES2015+语法。

#### stage-x

任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。

一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。

- Stage 0 - Strawman（展示阶段）

- Stage 1 - Proposal（征求意见阶段）

- Stage 2 - Draft（草案阶段）

- Stage 3 - Candidate（候选人阶段）

- Stage 4 - Finished（定案阶段）

一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 TC39 的官方网站[Github.com/tc39/ecma262](https://github.com/tc39/ecma262)查看。

#### transform-runtime是干什么的，与babel-polyfill又是什么关系呢？

babel-polyfill 使用场景：

Babel 默认只转换新的 JavaScript 语法，而不转换新的 API。例如，Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise 等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转译。如果想使用这些新的对象和方法，必须使用 babel-polyfill，为当前环境提供一个垫片。

官网是这么说的，那些需要修改内置api才能达成的功能，譬如：扩展`String.prototype`，给上面增加includes方法，就属于修改内置API的范畴。这类操作就由babel-polyfill提供。

babel-runtime使用场景：

Babel 转译后的代码要实现源代码同样的功能需要借助一些帮助函数，例如，`{ [name]: 'JavaScript' }`转译后的代码如下所示：

```
'use strict';
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj = _defineProperty({}, 'name', 'JavaScript');
```

类似上面的帮助函数 _defineProperty 可能会重复出现在一些模块里，导致编译后的代码体积变大。Babel 为了解决这个问题，提供了单独的包 babel-runtime 供编译模块复用工具函数。

启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数，转译代码如下：

```
'use strict';
// 之前的 _defineProperty 函数已经作为公共模块 `babel-runtime/helpers/defineProperty` 使用
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');
var _defineProperty3 = _interopRequireDefault(_defineProperty2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = (0, _defineProperty3.default)({}, 'name', 'JavaScript');
```

除此之外，babel 还为源代码的非实例方法（`Object.assign`，实例方法是类似这样的 `"foobar".includes("foo")`）和 babel-runtime/helps 下的工具函数自动引用了 polyfill。这样可以避免污染全局命名空间，非常适合于 JavaScript 库和工具包的实现。例如 `const obj = {}, Object.assign(obj, { age: 30 });` 转译后的代码如下所示：

```
'use strict';
// 使用了 core-js 提供的 assign
var _assign = require('babel-runtime/core-js/object/assign');
var _assign2 = _interopRequireDefault(_assign);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = {};
(0, _assign2.default)(obj, {
  age: 30
});
```

为什么说babel-runtime适合 JavaScript 库和工具包的实现呢？

避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；

在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill 就行了。

总结：

具体的项目还是需要使用 babel-polyfill的，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；

JavaScript 库和工具的开发则可以只使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill。

参考资料：

http://www.ruanyifeng.com/blog/2011/09/restful.html

http://www.ruanyifeng.com/blog/2014/05/restful_api.html

https://segmentfault.com/q/1010000005596587?from=singlemessage&isappinstalled=1

