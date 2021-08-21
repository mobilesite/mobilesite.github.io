---
layout:     post
title:      "《Webpack实战：入门、进阶与调优》读书笔记"
subtitle:   ""
date:       2020-12-06 18:14:12
author:     "Paian"
catalog: true
tags:
    - Webpack
    - 读书笔记
---

该书作者：居玉皓

### 前言

> 在写作本书之前的一段时间，我一直负责与前端项目构建相关的工作，也曾做过一系列Webpack在线课程，但是当接到写一本关于Webpack的书的提议时，我着实犹豫了很久。最大的担忧在于Webpack本身已经有详尽的文档，社区中也有无数关于它的博客文章，自己如何能找到一个新的角度，让读者有所受益。

> 于是我开始回想自己最初学习Webpack时的经历——在了解它的过程中遇到哪些曲折，使用时碰到了哪些问题，有哪些点是我觉得如果当初我早就知道就好了的。通过回忆这些曾遇到过的磕磕绊绊，**我逐渐找到了写作本书的出发点——用我的语言尽可能简单、直白地介绍Webpack，让从来没有接触过Webpack的开发者也可以比较容易上手；同时把我所趟过的一些坑写出来，让读到的人少走一些弯路。**

> 有时能听到一种戏称——**Webpack配置工程师**，从这里面大概能体会到Webpack的使用并不简单。

> **而这本书的作用之一大概就是把里面比较晦涩的部分解释清楚，让大家了解Webpack是怎么工作的，它其实并不神秘。**

【笔记】

**有的时候虽然一门技术已经有相关的文档了，但是，由于是英文或者表述得不够清楚，文档常常不那好理解。而且，很容易缺乏结合实践的示例，缺乏延伸性的解释，甚至还有很多待填的坑，这又进一步增加了新手入门的难度。而这，恰恰就是书籍和分享之所以总是被需求的原因。**

> 代码示例：书中有很多代码片段，为了在线运行方便，我在GitHub上整理了一个示例仓库，如果需要，可以到https://github.com/yuhaoju/webpack-config-handbook进行查看。

### 第1章 Webpack简介

> 主要包括以下几个部分：
> - 何为Webpack；
> - 使用Webpack的意义；
> - 安装Webpack；
> - 如何开始一个Webpack工程。

#### 1.1 何为Webpack

> Webpack是一个开源的JavaScript模块打包工具，其最核心的功能是解决模块之间的依赖，把各个模块按照特定的规则和顺序组织在一起，最终合并为一个JS文件（有时会有多个，这里讨论的只是最基本的情况）。这个过程就叫作模块打包。

> **你可以把Webpack理解为一个模块处理工厂。我们把源代码交给Webpack，由它去进行加工、拼装处理，产出最终的资源文件，等待送往用户。**

【笔记】

**在抽象层次上看，编辑器产品和Webpack存在某种共通之处，甚至可以说许许多多的工具都存在共通之处，那就是输入五花八门的资源，进攻一系列的加工工序，输出加工后的结果。**

#### 1.2 为什么需要Webpack

> 开发一个简单的Web应用，其实只需要浏览器和一个简单的编辑器就可以了。最早的Web应用就是这么开发的，因为需求很简单。**当应用的规模大了之后，就必须借助一定的工具**，否则人工维护代码的成本将逐渐变得难以承受。学会使用工具可以让开发效率成倍地提升，所谓“工欲善其事，必先利其器”就是这个意思。

##### 1.2.1 何为模块

> **在设计程序结构时，把所有代码都堆到一起是非常糟糕的做法。更好的组织方式是按照特定的功能将其拆分为多个代码段，每个代码段实现一个特定的目的。你可以对其进行独立的设计、开发和测试，最终通过接口来将它们组合在一起。这就是基本的模块化思想。**

##### 1.2.2 JavaScript中的模块

> **在大多数程序语言中（如C、C++、Java），开发者都可以直接使用模块化进行开发。工程中的各个模块在经过编译、链接等过程后会被整合成单一的可执行文件并交由系统运行。**

> **对于JavaScript来说，情况则有所不同。在过去的很长一段时间里，JavaScript这门语言并没有模块这一概念。如果工程中有多个JS文件，我们只能通过script标签将它们一个个插入页面中。**

> 为何偏偏JavaScript没有模块呢？如果要追溯历史原因，**JavaScript之父——Brendan Eich最初设计这门语言时只是将它定位成一个小型的脚本语言，用来实现网页上一些简单的动态特性，远没有考虑到会用它实现今天这样复杂的场景，模块化当然也就显得多余了。**

> 随着技术的发展，JavaScript已经不仅仅用来实现简单的表单提交等功能，引入多个script文件到页面中逐渐成为一种常态，但我们发现**这种做法有很多缺点：**

> - **需要手动维护JavaScript的加载顺序。页面的多个script之间通常会有依赖关系，但由于这种依赖关系是隐式的，除了添加注释以外很难清晰地指明谁依赖了谁，这样当页面中加载的文件过多时就很容易出现问题。**

> - **每一个script标签都意味着需要向服务器请求一次静态资源，在HTTP 2还没出现的时期，建立连接的成本是很高的，过多的请求会严重拖慢网页的渲染速度。**

> - **在每个script标签中，顶层作用域即全局作用域，如果没有任何处理而直接在代码中进行变量或函数声明，就会造成全局作用域的污染。**

> **模块化则解决了上述的所有问题：**

> - **通过导入和导出语句我们可以清晰地看到模块间的依赖关系。**

> - **模块可以借助工具来进行打包，在页面中只需要加载合并后的资源文件，减少了网络开销。**

> - **多个模块之间的作用域是隔离的，彼此不会有命名冲突。**

> **从2009年开始，JavaScript社区开始对模块化进行不断的尝试，并依次出现了AMD、CommonJS、CMD等解决方案。**

> **但这些都只是由社区提出的，并不能算语言本身的特性。而在2015年，ECMAScript 6.0（ES6）正式定义了JavaScript模块标准，使这门语言在诞生了20年之后终于拥有了模块这一概念。**

> **ES6模块标准目前已经得到了大多数现代浏览器的支持，但在实际应用方面还需要等待一段时间。主要有以下几点原因：**
> - **无法使用code splitting和tree shaking（Webpack的两个特别重要的特性，后面会介绍）。**
> - **大多数npm模块还是CommonJS的形式，而浏览器并不支持其语法，因此这些包没有办法直接拿来用。**
> - **仍然需要考虑个别浏览器及平台的兼容性问题。**

> **这就到了模块打包工具出场的时候了。**

【笔记】

**这里很清楚地解释了如下几个问题：**

**1、JavaScript起初为什么没有不支持模块的原因（最初的定位只是用来实现网页上一些动态特性的小型脚本语言）。**

**2、不支持模块所带来的缺点：加载顺序（依赖关系）难维护、增加请求数从而拖慢网页加载速度、不同文件间变量冲突。**

**3、模块化正好解决了上述问题，现社区模块化规范（AMD、CommonJS、CMD，2009年陆续开始），再有语言本身的标准（ECMAScript 6.0（ES6），2015年）。**

**4、为什么有了ES6标准还需要模块化打包工具（因为不支持code splitting和tree shaking、多数npm模块还是CommonJS的形式、浏览器的兼容性问题）。**

##### 1.2.3 模块打包工具

> **模块打包工具（module bundler）的任务就是解决模块间的依赖，使其打包后的结果能运行在浏览器上。**
> 它的工作方式主要分为两种：
> - 将存在依赖关系的模块按照特定规则合并为单个JS文件，一次全部加载进页面中。
> - 在页面初始时加载一个入口模块，其他模块异步地进行加载。
> 目前社区中比较流行的模块打包工具有Webpack、Parcel、Rollup等。

##### 1.2.4 为什么选择Webpack

> **1）Webpack默认支持多种模块标准，包括AMD、CommonJS，以及最新的ES6模块，而其他工具大多只能支持一到两种。**这对于一些同时使用多种模块标准的工程非常有用，Webpack会帮我们处理好不同类型模块之间的依赖关系。

> **2）Webpack有完备的代码分割（code splitting）解决方案。它可以分割打包后的资源，首屏只加载必要的部分，不太重要的功能放到后面动态地加载。**

> 这对于资源体积较大的应用来说尤为重要，可以有效地减小资源体积，提升首页渲染速度。

> **3）Webpack可以处理各种类型的资源。除了JavaScript以外，Webpack还可以处理样式、模板，甚至图片等，而开发者需要做的仅仅是导入它们。**

> 而这一切都可以由loader来处理。

> **4）Webpack拥有庞大的社区支持。**除了Webpack核心库以外，还有无数开发者来为它编写周边插件和工具，绝大多数的需求你都可以直接找到已有解决方案，甚至会有多个解决方案供你挑选。

#### 1.3 安装

> Webpack对于操作系统没有要求，使用Windows、Mac、Linux操作系统均可。它唯一的依赖就是Node.js，

> **这里建议使用本地安装的方式，主要有以下两点原因：**
> - **如果采用全局安装，那么在与他人进行项目协作的时候，由于每个人系统中的Webpack版本不同，可能会导致输出结果不一致。**
> - **部分依赖于Webpack的插件会调用项目中Webpack的内部模块，这种情况下仍然需要在项目本地安装Webpack，而如果全局和本地都有，则容易造成混淆。**

> **安装Webpack的命令：**

> ```sh
> npm install webpack webpack-cli –-save-dev
> ```

> **webpack是核心模块，webpack-cli则是命令行工具，**

> 安装结束之后，在命令行执行npx webpack-v以及npx webpack-cli-v，可显示各自的版本号，即证明安装成功。

#### 1.4 打包第一个应用

##### 1.4.1 Hello World

> ```sh
> npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
> ```

> **参数mode指的是打包模式。Webpack为开发者提供了development、production、none三种模式。当置于development和production模式下时，它会自动添加适合于当前模式的一系列配置，减少了人为的工作量。在开发环境下，一般设置为development模式就可以了。**

##### 1.4.2 使用npm scripts

> 编辑工程中的package.json文件：
>```json
> ……
> "scripts": {
>    "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=development"
> },
> ……
> ```

> **scripts是npm提供的脚本命令功能，在这里我们可以直接使用由模块所添加的指令（比如用“webpack”取代之前的“npx webpack”）。**

【笔记】

**npm script中执行项安装的模块的时候，不用加./node_modules/.bin/，也不加npx。**

##### 1.4.3 使用默认目录配置

> 工程源代码放在/src中，输出资源放在/dist中。

> **对于资源输出目录来说，Webpack已经默认是/dist**，我们不需要做任何改动。

> 另外需要提到的是，Webpack默认的源代码入口就是src/index.js，因此现在可以省略掉entry的配置了

> 编辑package.json：
>
> ```json
> ……
> "scripts": {
>   "build": "webpack --output-filename=bundle.js --mode=development"
> },
> ……
> ```
>
> 虽然目录命名并不是强制的，Webpack提供了配置项让我们去进行更改，但还是建议遵循统一的命名规范，这样会使得大体结构比较清晰，也利于多人协作。

##### 1.4.4 使用配置文件

> ```sh
> npx webpack –h
> ```

> **Webpack的默认配置文件为webpack.config.js**（也可以使用其他文件名，需要使用命令行参数指定）。

> 现在让我们在工程根目录下创建webpack.config.js，并添加如下代码：

```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  mode: 'development',
}
```

> **在Webpack配置中，我们经常会遇到这种分层的属性关系。这是由于Webpack本身配置实在太多，如果都放在同一级会难以管理，因此出现了这种多级配置。当开发者要修改某个配置项时，通过层级关系找下来会更加清晰、快捷。**

> 之前的参数--output-filename和--output-path现在都成为了output下面的属性。

> 而在webpack.config.js中，我们通过调用Node.js的路径拼装函数——path.join，将__dirname（Node.js内置全局变量，值为当前文件所在的绝对路径）与dist（输出目录）连接起来，得到了最终的资源输出路径。

##### 1.4.5 webpack-dev-server

```sh
npm install webpack-dev-server --save-dev
```

> 为了便捷地启动webpack-dev-server，我们在package.json中添加一个dev指令：

```json
……
"scripts": {
  "build": "webpack",
  "dev": "webpack-dev-server"
},
……
```

> 最后，我们还需要对webpack-dev-server进行配置。编辑webpack.config.js如下：

```js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: './bundle.js',
  },
  mode: 'develpoment',
  devServer: {
    publicPath: '/dist',
  },
};
```

> 可以看到，**我们在配置中添加了一个devServer对象，它是专门用来放webpack-dev-server配置的。webpack-dev-server可以看作一个服务者，它的主要工作就是接收浏览器的请求，然后将资源返回。**

> **当服务启动时，会先让Webpack进行模块打包并将资源准备好（在示例中就是bundle.js）。当webpack-dev-server接收到浏览器的资源请求时，它会首先进行URL地址校验。如果该地址是资源服务地址（上面配置的publicPath），就会从Webpack的打包结果中寻找该资源并返回给浏览器。反之，如果请求地址不属于资源服务地址，则直接读取硬盘中的源文件并将其返回。综上我们可以总结出webpack-dev-server的几大职能：**

> - **令Webpack进行模块打包，并处理打包结果的资源请求。**
> - **作为普通的Web Server，处理静态资源文件请求。**

> **这里有一点需要注意。直接用Webpack开发和使用webpack-dev-server有一个很大的区别，前者每次都会生成bundle.js，而webpack-dev-server只是将打包结果放在内存中，并不会写入实际的bundle.js，在每次webpack-dev-server接收到请求时都只是将内存中的打包结果返回给浏览器。**

> - **webpack-dev-server还有一项很便捷的特性就是live-reloading（自动刷新）。**当webpack-dev-server发现工程源文件进行了更新操作就会自动刷新浏览器，显示更新后的内容。该特性可以提升我们本地开发的效率。

【笔记】

**webpack-dev-server有三个职能：借住Webpack进行打包并处理打包结果的请求，作为Web Server处理静态资源文件请求，实现监听文件修改自动刷新页面**。

### 第2章 模块打包

> **模块之于程序，就如同细胞之于生物体**，是具有特定功能的组成单元。不同的模块负责不同的工作，它们以某种方式联系在一起，共同保证程序的正常运转。

> 本章将包含以下几个部分：
> - 不同模块的标准以及它们之间的区别；
> - 如何编写模块；
> - 模块打包的原理。
> 随着JavaScript语言的发展，社区中产生了很多模块标准。在认识这些标准的同时，也要了解其背后的思想。

> 例如，它为什么会有这个特性，或者为什么要这样去实现。这对我们自己编写模块也会有所帮助。

#### 2.1 CommonJS

> **CommonJS是由JavaScript社区于2009年提出的包含模块、文件、IO、控制台在内的一系列标准。在Node.js的实现中采用了CommonJS标准的一部分，并在其基础上进行了一些调整。我们所说的CommonJS模块和Node.js中的实现并不完全一样，现在一般谈到CommonJS其实是Node.js中的版本，而非它的原始定义。**

> **CommonJS最初只为服务端而设计，直到有了Browserify——一个运行在Node.js环境下的模块打包工具，它可以将CommonJS模块打包为浏览器可以运行的单个文件。这意味着客户端的代码也可以遵循CommonJS标准来编写了。**

> **不仅如此，借助Node.js的包管理器，npm开发者还可以获取他人的代码库，或者把自己的代码发布上去供他人使用。这种可共享的传播方式使CommonJS在前端开发中逐渐流行了起来。**

##### 2.1.1 模块

CommonJS中规定每个文件是一个模块。将一个JavaScript文件直接通过script标签插入页面中与封装成CommonJS模块最大的不同在于，前者的顶层作用域是全局作用域，在进行变量及函数声明时会污染全局环境；而后者会形成一个属于模块自身的作用域，所有的变量及函数只有自己能访问，对外是不可见的。请看下面的例子：// calculator.jsvar name = 'calculator.js';// index.jsvar name = 'index.js';require('./calculator.js');console.log(name); // index.js这里有两个文件，在index.js中我们通过CommonJS的require函数加载calculator.js。运行之后控制台结果是“index.js”，这说明calculator.js中的变量声明并不会影响index.js，可见每个模块是拥有各自的作用域的。

##### 2.1.2 导出

> 导出是一个模块向外暴露自身的唯一方式。在CommonJS中，通过module.exports可以导出模块中的内容，如：module.exports = {    name: 'calculater',    add: function(a, b) {        return a + b;    }};

> CommonJS模块内部会有一个module对象用于存放当前模块的信息，可以理解成在每个模块的最开始定义了以下对象：var module = {...};// 模块自身逻辑module.exports = {...};module.exports用来指定该模块要对外暴露哪些内容

> 为了书写方便，CommonJS也支持另一种简化的导出方式—直接使用exports。

> exports.name = 'calculater';exports.add = function(a, b) {    return a + b;};

> 在实现效果上，这段代码和上面的module.exports没有任何不同。其内在机制是将exports指向了module.exports，而module.exports在初始化时是一个空对象。

> 我们可以简单地理解为，CommonJS在每个模块的首部默认添加了以下代码：

> var module = {    exports: {},};var exports = module.exports;

> 因此，为exports.add赋值相当于在module.exports对象上添加了一个属性。在使用exports时要注意一个问题，即不要直接给exports赋值，否则会导致其失效。如：exports = {    name: 'calculater'};

> 上面代码中，由于对exports进行了赋值操作，使其指向了新的对象，module.exports却仍然是原来的空对象，因此name属性并不会被导出。

> 另一个在导出时容易犯的错误是不恰当地把module.exports与exports混用。exports.add = function(a, b) {    return a + b;};module.exports = {    name: 'calculater'};

> 上面的代码先通过exports导出了add属性，然后将module.exports重新赋值为另外一个对象。这会导致原本拥有add属性的对象丢失了，最后导出的只有name。

> 另外，要注意导出语句不代表模块的末尾，在module.exports或exports后面的代码依旧会照常执行。

> 比如下面的console会在控制台上打出“end”：module.exports = {    name: 'calculater'};

> console.log('end');

> 在实际使用中，为了提高可读性，不建议采取上面的写法，而是应该将module.exports及exports语句放在模块的末尾。

##### 2.1.3 导入

在CommonJS中使用require进行模块导入。

> 当我们require一个模块时会有两种情况：·require的模块是第一次被加载。这时会首先执行该模块，然后导出内容。·require的模块曾被加载过。这时该模块的代码不会再次执行，而是直接导出上次执行后得到的结果。

> 请看下面的例子：// calculator.jsconsole.log('running calculator.js');module.exports = {    name: 'calculator',    add: function(a, b) {        return a + b;    }};// index.jsconst add = require('./calculator.js').add;const sum = add(2, 3);console.log('sum:', sum);const moduleName = require('./calculator.js').name;console.log('end');控制台的输出结果如下：running calculator.jssum: 5end从结果可以看到，尽管我们有两个地方require了calculator.js，但其内部代码只执行了一遍。

> 我们前面提到，模块会有一个module对象用来存放其信息，这个对象中有一个属性loaded用于记录该模块是否被加载过。

> 它的值默认为false，当模块第一次被加载和执行过后会置为true，后面再次加载时检查到module.loaded为true，则不会再次执行模块代码。

> 有时我们加载一个模块，不需要获取其导出的内容，只是想要通过执行它而产生某种作用，比如把它的接口挂在全局对象上，此时直接使用require即可。require('./task.js');

> 另外，require函数可以接收表达式，借助这个特性我们可以动态地指定模块加载路径。const moduleNames = ['foo.js', 'bar.js'];moduleNames.forEach(name => {    require('./' + name);});

#### 2.2 ES6 Module

在JavaScript之父Brendan Eich最初设计这门语言时，原本并没有包含模块的概念。基于越来越多的工程需求，为了使用模块化进行开发，JavaScript社区中涌现出了多种模块标准，其中也包括CommonJS。一直到2015年6月，由TC39标准委员会正式发布了ES6（ECMAScript 6.0），从此JavaScript语言才具备了模块这一特性。

> 一直到2015年6月，由TC39标准委员会正式发布了ES6（ECMAScript 6.0），从此JavaScript语言才具备了模块这一特性。

##### 2.2.1 模块

> ES6 Module也是将每个文件作为一个模块，每个模块拥有自身的作用域，不同的是导入、导出语句。import和export也作为保留关键字在ES6版本中加入了进来（CommonJS中的module并不属于关键字）。

> ES6 Module会自动采用严格模式，这在ES5（ECMAScript 5.0）中是一个可选项。

> 以前我们可以通过选择是否在文件开始时加上“use strict”来控制严格模式，在ES6 Module中不管开头是否有“use strict”，都会采用严格模式。如果将原本是CommonJS的模块或任何未开启严格模式的代码改写为ES6 Module要注意这点。

##### 2.2.2 导出

在ES6 Module中使用export命令来导出模块。export有两种形式：·命名导出·默认导出

> 一个模块可以有多个命名导出。它有两种不同的写法：

> // 写法1export const name = 'calculator';export const add = function(a, b) { return a + b; };// 写法2const name = 'calculator';const add = function(a, b) { return a + b; };export { name, add };

> 第1种写法是将变量的声明和导出写在一行；第2种则是先进行变量声明，然后再用同一个export语句导出。两种写法的效果是一样的。

> 在使用命名导出时，可以通过as关键字对变量重命名。如：const name = 'calculator';const add = function(a, b) { return a + b; };export { name, add as getSum }; // 在导入时即为 name 和 getSum

> 与命名导出不同，模块的默认导出只能有一个。如：export default {    name: 'calculator',    add: function(a, b) {        return a + b;    }};

> 我们可以将export default理解为对外输出了一个名为default的变量，因此不需要像命名导出一样进行变量声明，直接导出值即可。// 导出字符串export default 'This is calculator.js';// 导出 classexport default class {...}// 导出匿名函数export default function() {...}

##### 2.2.3 导入

ES6 Module中使用import语法导入模块。首先我们来看如何加载带有命名导出的模块

> 加载带有命名导出的模块时，import后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完全一致。

> 导入变量的效果相当于在当前作用域下声明了这些变量（name和add），并且不可对其进行更改，也就是所有导入的变量都是只读的。

> 与命名导出类似，我们可以通过as关键字可以对导入的变量重命名。如：import { name, add as calculateSum } from './calculator.js';calculateSum(2, 3);

> 在导入多个变量时，我们还可以采用整体导入的方式。如：import * as calculator from './calculator.js';console.log(calculator.add(2, 3));console.log(calculator.name);

> 使用import*as<myModule>可以把所有导入的变量作为属性值添加到<myModule>对象中，从而减少了对当前作用域的影响。

> 对于默认导出来说，import后面直接跟变量名，并且这个名字可以自由指定（比如这里是myCalculator），它指代了calculator.js中默认导出的值。从原理上可以这样去理解：import { default as myCalculator } from './calculator.js';

> 最后看一个两种导入方式混合起来的例子：// index.jsimport React, { Component } from 'react';这里的React对应的是该模块的默认导出，而Component则是其命名导出中的一个变量。

> 注意　这里的React必须写在大括号前面，而不能顺序颠倒，否则会提示语法错误。

##### 2.2.4 复合写法

> 在工程中，有时需要把某一个模块导入之后立即导出，比如专门用来集合所有页面或组件的入口文件。此时可以采用复合形式的写法：export { name, add } from './calculator.js';复合写法目前只支持当被导入模块（这里的calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。import calculator from "./calculator.js ";export default calculator;

### 2.3 CommonJS与ES6 Module的区别

##### 2.3.1 动态与静态

> CommonJS与ES6 Module最本质的区别在于前者对模块依赖的解决是“动态的”，而后者是“静态的”。在这里“动态”的含义是，模块依赖关系的建立发生在代码运行阶段；而“静态”则是模块依赖关系的建立发生在代码编译阶段。

> 在CommonJS模块被执行前，并没有办法确定明确的依赖关系，模块的导入、导出发生在代码的运行阶段。

> // calculator.jsexport const name = 'calculator';// index.jsimport { name } from './calculator.js';

> ES6 Module的导入、导出语句都是声明式的，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在if语句中）。因此我们说，ES6 Module是一种静态的模块结构，在ES6代码的编译阶段就可以分析出模块的依赖关系。它相比于CommonJS来说具备以下几点优势：·死代码检测和排除。

> ·模块变量类型检查。JavaScript属于动态类型语言，不会在代码执行前检查类型错误（比如对一个字符串类型的值进行函数调用）。ES6 Module的静态模块结构有助于确保模块之间传递的值或接口类型是正确的。

> ·编译器优化。在CommonJS等动态模块系统中，无论采用哪种方式，本质上导入的都是一个对象，而ES6 Module支持直接导入变量，减少了引用层级，程序效率更高。

##### 2.3.2 值拷贝与动态映射

> 在导入一个模块时，对于CommonJS来说获取的是一份导出值的拷贝；而在ES6 Module中则是值的动态映射，并且这个映射是只读的。

> // calculator.jsvar count = 0;module.exports = {    count: count,    add: function(a, b) {        count += 1;        return a + b;    }};

> // index.jsvar count = require('./calculator.js').count;var add = require('./calculator.js').add;console.log(count); // 0（这里的count是对 calculator.js 中 count 值的拷贝）add(2, 3);console.log(count); // 0（calculator.js中变量值的改变不会对这里的拷贝值造成影响）count += 1;console.log(count); // 1（拷贝的值可以更改）

> index.js中的count是对calculator.js中count的一份值拷贝，因此在调用add函数时，虽然更改了原本calculator.js中count的值，但是并不会对index.js中导入时创建的副本造成影响。另一方面，在CommonJS中允许对导入的值进行更改。

> 下面我们使用ES6 Module将上面的例子进行改写：// calculator.jslet count = 0;const add = function(a, b) {    count += 1;    return a + b;};export { count, add };// index.jsimport { count, add } from './calculator.js';console.log(count); // 0（对 calculator.js 中 count 值的映射）add(2, 3);console.log(count); // 1（实时反映calculator.js 中 count值的变化）// count += 1; // 不可更改，会抛出SyntaxError: "count" is read-only

> 我们不可以对ES6 Module导入的变量进行更改，可以将这种映射关系理解为一面镜子，从镜子里我们可以实时观察到原有的事物，但是并不可以操纵镜子中的影像

##### 2.3.3 循环依赖

> 循环依赖是指模块A依赖于模块B，同时模块B依赖于模块A。

> a.jsimport { foo } from './b.js';foo();// b.jsimport { bar } from './a.js';bar();一般来说工程中应该尽量避免循环依赖的产生，因为从软件设计的角度来说，单向的依赖关系更加清晰，而循环依赖则会带来一定的复杂度。

> 而在实际开发中，循环依赖有时会在我们不经意间产生，因为当工程的复杂度上升到足够规模时，就容易出现隐藏的循环依赖关系。
> 简单来说，A和B两个模块之间是否存在直接的循环依赖关系是很容易被发现的。但实际情况往往是A依赖于B，B依赖于C，C依赖于D，最后绕了一大圈，D又依赖于A。当中间模块太多时就很难发现A和B之间存在着隐式的循环依赖。因此，如何处理循环依赖是开发者必须要面对的问题。

> 我们首先看一下在CommonJS中循环依赖的例子。

> // foo.jsconst bar = require('./bar.js');console.log('value of bar:', bar);module.exports = 'This is foo.js';// bar.jsconst foo = require('./foo.js');console.log('value of foo:', foo);module.exports = 'This is bar.js';

> // index.jsrequire('./foo.js');

> 为什么foo的值会是一个空对象呢？

> 1）index.js导入了foo.js，此时开始执行foo.js中的代码。2）foo.js的第1句导入了bar.js，这时foo.js不会继续向下执行，而是进入了bar.js内部。3）在bar.js中又对foo.js进行了require，这里产生了循环依赖。需要注意的是，执行权并不会再交回foo.js，而是直接取其导出值，也就是module.exports。但由于foo.js未执行完毕，导出值在这时为默认的空对象，因此当bar.js执行到打印语句时，我们看到控制台中的value of foo就是一个空对象。

> 4）bar.js执行完毕，将执行权交回foo.js。5）foo.js从require语句继续向下执行，在控制台打印出value of bar（这个值是正确的），整个流程结束。

> 由上面可以看出，尽管循环依赖的模块均被执行了，但模块导入的值并不是我们想要的。因此在CommonJS中，若遇到循环依赖我们没有办法得到预想中的结果。

> 我们再从Webpack的实现角度来看，将上面例子打包后，bundle中有这样一段代码非常重要：// The require functionfunction __webpack_require__(moduleId) {  if(installedModules[moduleId]) {    return installedModules[moduleId].exports;  }  // Create a new module (and put it into the cache)  var module = installedModules[moduleId] = {    i: moduleId,    l: false,    exports: {}  };  ...}

> 当index.js引用了foo.js之后，相当于执行了这个__webpack_require__函数，初始化了一个module对象并放入installedModules中。当bar.js再次引用foo.js时，又执行了该函数，但这次是直接从installedModules里面取值，此时它的module.exports是一个空对象。这就解释了上面在第3步看到的现象。

> 接下来让我们使用ES6 Module的方式重写上面的例子。// foo.jsimport bar from './bar.js';console.log('value of bar:', bar);export default 'This is foo.js';// bar.jsimport foo from './foo.js';console.log('value of foo:', foo);export default 'This is bar.js';// index.jsimport foo from './foo.js';执行结果如下：value of foo: undefinedfoo.js:3 value of bar: This is bar.js很遗憾，在bar.js中同样无法得到foo.js正确的导出值，只不过和CommonJS默认导出一个空对象不同，这里获取到的是undefined。

> 上面我们谈到，在导入一个模块时，CommonJS获取到的是值的拷贝，ES6 Module则是动态映射，那么我们能否利用ES6 Module的特性使其支持循环依赖呢？

> //index.jsimport foo from './foo.js';foo('index.js');// foo.jsimport bar from './bar.js';function foo(invoker) {    console.log(invoker + ' invokes foo.js');    bar('foo.js');}export default foo;// bar.jsimport foo from './foo.js';let invoked = false;function bar(invoker) {    if(!invoked) {        invoked = true;        console.log(invoker + ' invokes bar.js');        foo('bar.js');    }}export default bar;

> 上面代码的执行结果如下：index.js invokes foo.jsfoo.js invokes bar.jsbar.js invokes foo.js

> 1）index.js作为入口导入了foo.js，此时开始执行foo.js中的代码。2）从foo.js导入了bar.js，执行权交给bar.js。

> 3）在bar.js中一直执行到其结束，完成bar函数的定义。注意，此时由于foo.js还没执行完，foo的值现在仍然是undefined。

> 4）执行权回到foo.js继续执行直到其结束，完成foo函数的定义。由于ES6 Module动态映射的特性，此时在bar.js中foo的值已经从undefined成为了我们定义的函数，这是与CommonJS在解决循环依赖时的本质区别，CommonJS中导入的是值的拷贝，不会随着被夹在模块中原有值的变化而变化。

> 5）执行权回到index.js并调用foo函数，此时会依次执行foo→bar→foo，并在控制台打出正确的值。

> 由上面的例子可以看出，ES6 Module的特性使其可以更好地支持循环依赖，只是需要由开发者来保证当导入的值被使用时已经设置好正确的导出值。

#### 2.4 加载其他类型模块

##### 2.4.1 非模块化文件

> 非模块化文件指的是并不遵循任何一种模块标准的文件。

> 如何使用Webpack打包这类文件呢？其实只要直接引入即可，如：

> import './jquery.min.js';

> 但假如我们引入的非模块化文件是以隐式全局变量声明的方式暴露其接口的，则会发生问题。如：// 通过在顶层作用域声明变量的方式暴露接口var calculator = {    // ...}

> 由于Webpack在打包时会为每一个文件包装一层函数作用域来避免全局污染，上面的代码将无法把calculator对象挂在全局，因此这种以隐式全局变量声明需要格外注意。

##### 2.4.2 AMD

AMD是英文Asynchronous Module Definition（异步模块定义）的缩写，它是由JavaScript社区提出的专注于支持浏览器端模块化的标准。从名字就可以看出它与CommonJS和ES6 Module最大的区别在于它加载模块的方式是异步的。

> 下面的例子展示了如何定义一个AMD模块。define('getSum', ['calculator'], function(math) {    return function(a, b) {        console.log('sum: ' + calculator.add(a, b));    }});在AMD中使用define函数来定义模块，它可以接受3个参数。第1个参数是当前模块的id，相当于模块名；第2个参数是当前模块的依赖，比如上面我们定义的getSum模块需要引入calculator模块作为依赖；第3个参数用来描述模块的导出值，可以是函数或对象。如果是函数则导出的是函数的返回值；如果是对象则直接导出对象本身。

> 和CommonJS类似，AMD也使用require函数来加载模块，只不过采用异步的形式。require(['getSum'], function(getSum) {    getSum(2, 3);});

> require的第1个参数指定了加载的模块，第2个参数是当加载完成后执行的回调函数。

> 通过AMD这种形式定义模块的好处在于其模块加载是非阻塞性的，当执行到require函数时并不会停下来去执行被加载的模块，而是继续执行require后面的代码，这使得模块加载操作并不会阻塞浏览器。

> 尽管AMD的设计理念很好，但与同步加载的模块标准相比其语法要更加冗长。另外其异步加载的方式并不如同步显得清晰，并且容易造成回调地狱（callback hell）。在目前的实际应用中已经用得越来越少，大多数开发者还是会选择CommonJS或ES6 Module的形式。

##### 2.4.3 UMD

> 有时对于一个库或者框架的开发者来说，如果面向的使用群体足够庞大，就需要考虑支持各种模块形式。严格来说，UMD并不能说是一种模块标准，不如说它是一组模块形式的集合更准确。UMD的全称是Universal Module Definition，也就是通用模块标准，它的目标是使一个模块能运行在各种环境下，不论是CommonJS、AMD，还是非模块化的环境（当时ES6 Module

> 还未被提出）。

> 请看下面的例子：// calculator.js(function (global, main) {    // 根据当前环境采取不同的导出方式    if (typeof define === 'function' && define.amd) {        // AMD        define(...);    } else if (typeof exports === 'object') {        // CommonJS        module.exports = ...;    } else {        // 非模块化环境        global.add = ...;    }}(this, function () {    // 定义模块主体    return {...}}));可以看出，UMD其实就是根据当前全局对象中的值判断目前处于哪种模块环境。当前环境是AMD，就以AMD的形式导出；当前环境是CommonJS，就以CommonJS的形式导出。

> 需要注意的问题是，UMD模块一般都最先判断AMD环境，也就是全局下是否有define函数，而通过AMD定义的模块是无法使用CommonJS或ES6 Module的形式正确引入的。在Webpack中，由于它同时支持AMD及CommonJS，也许工程中的所有模块都是CommonJS，而UMD标准却发现当前有AMD环境，并使用了AMD方式导出，这会使得模块导入时出错。当需要这样做时，我们可以更改UMD模块中判断的顺序，使其以CommonJS的形式导出即可。

##### 2.4.4 加载npm模块

> 很多语言都有包管理器，比如Java的Maven，Ruby的gem。目前，JavaScript最主流的包管理器有两个——npm和yarn。两者的仓库是共通的，只是在使用上有所区别。

> 截至目前，npm平台上已经有几十万个模块（package，也可称之为包），并且这个数字每天都在增加，各种主流的框架类库都可以在npm平台上找到。

> 每一个npm模块都有一个入口。当我们加载一个模块时，实际上就是加载该模块的入口文件。这个入口被维护在模块内部package.json文件的main字段中。

> 比如对于前面的lodash模块来说，它的package.json内容如下：// ./node_modules/underscore/package.json{  "name": "lodash",  ……  "main": "lodash.js"}当加载该模块时，实际上加载的是node_modules/lodash/lodash.js。

> 除了直接加载模块以外，我们也可以通过<package_name>/<path>的形式单独加载模块内部的某个JS文件。如：import all from 'lodash/fp/all.js';console.log('all', all);

> 这样，Webpack最终只会打包node_modules/lodash/fp/all.js这个文件，而不会打包全部的lodash库，通过这种方式可以减小打包资源的体积。

#### 2.5 模块打包原理

> 面对工程中成百上千个模块，Webpack究竟是如何将它们有序地组织在一起，并按照我们预想的顺序运行在浏览器上的呢？下面我们将从原理上进行探究。

> 还是使用前面calculator的例子。// index.jsconst calculator = require('./calculator.js');const sum = calculator.add(2, 3);console.log('sum', sum);// calculator.jsmodule.exports = {    add: function(a, b) {        return a + b;    }};上面的代码经过Webpack打包后将会成为如下的形式（为了易读性这里只展示代码的大体结构）：

> // 立即执行匿名函数(function(modules) {    //模块缓存    var installedModules = {};    // 实现require    function __webpack_require__(moduleId) {        ...    }    // 执行入口模块的加载    return __webpack_require__(__webpack_require__.s = 0);})({    // modules：以key-value的形式储存所有被打包的模块    0: function(module, exports, __webpack_require__) {        // 打包入口        module.exports = __webpack_require

> __("3qiv");    },    "3qiv": function(module, exports, __webpack_require__) {        // index.js内容    },    jkzz: function(module, exports) {        // calculator.js 内容    }});

> ·最外层立即执行匿名函数。它用来包裹整个bundle，并构成自身的作用域。·installedModules对象。每个模块只在第一次被加载的时候执行，之后其导出值就被存储到这个对象

> 里面，当再次被加载的时候直接从这里取值，而不会重新执行。

> ·__webpack_require__函数。对模块加载的实现，在浏览器中可以通过调用__webpack_require__(module_id)来完成模块导入。

> ·modules对象。工程中所有产生了依赖关系的模块都会以key-value的形式放在这里。key可以理解为一个模块的id，由数字或者一个很短的hash字符串构成；value则是由一个匿名函数包裹的模块实体，匿名函数的参数则赋予了每个模块导出和导入的能力。

> 接下来让我们看看一个bundle是如何在浏览器中执行的。

> 1）在最外层的匿名函数中会初始化浏览器执行环境，包括定义installedModules对象、__webpack_require__函数等，为模块的加载和执行做一些准备工作。2）加载入口模块。每个bundle都有且只有一个入口模块，在上面的示例中，index.js是入口模块，在浏览器中会从它开始执行。3）执行模块代码。如果执行到了module.exports则记录下模块的导出值；如果中间遇到require函数（准确地说是__webpack_require__），则会暂时交出执行权，进入__webpack_require__函数体内进行加载其他模块的逻辑。4）在__webpack_require__中会判断即将加载的模块是否存在于installedModules中。如果存在则直接取值，否则回到第3步，执行该模块的代码来获取导出值。5）所有依赖的模块都已执行完毕，最后执行权又回到入口模块。当入口模块的代码执行到结尾，也就意味着整个bundle运行结束。

> 不难看出，第3步和第4步是一个递归的过程。Webpack为每个模块创造了一个可以导出和导入模块的环境，但本质上并没有修改代码的执行逻辑，因此代码执行的顺序与模块加载的顺序是完全一致的，这就是Webpack模块打包的奥秘。

#### 2.6 本章小结

> CommonJS和ES6 Module是目前使用较为广泛的模块标准。它们的主要区别在于前者建立模块依赖关系是在运行时，后者是在编译时；在模块导入方面，CommonJS导入的是值拷贝，ES6 Module导入的是只读的变量映射；ES6 Module通过其静态特性可以进行编译过程中的优化，并且具备处理循环依赖的能力。

### 第3章 资源输入输出

> 本章则主要关注资源的输入和输出，

> 即如何定义产品的原材料从哪里来，以及组装后的产品送到哪里去。

#### 3.1 资源处理流程

> 在一切流程的最开始，我们需要指定一个或多个入口（entry），也就是告诉Webpack具体从源码目录下的哪个文件开始打包。如果把工程中各个模块的依赖关系当作一棵树，那么入口就是这棵依赖树的根，如图3-1所示。这些存在依赖关系的模块会在打包时被封装为一个chunk。

> chunk字面的意思是代码块，在Webpack中可以理解成被抽象和包装过后的一些模块。它就像一个装着很多文件的文件袋，里面的文件就是各个模块，Webpack在外面加了一层包裹，从而形成了chunk。


> [插图]图3-1　依赖关系树

> 从上面我们已经了解到，Webpack会从入口文件开始检索，并将具有依赖关系的模块生成一棵依赖树，最终得到一个chunk。由这个chunk得到的打包产物我们一般称之为bundle。entry、chunk、bundle的关系如图3-2所示。

> [插图]图3-2　entry、chunk、bundle的关系

> 在工程中可以定义多个入口，每一个入口都会产生一个结果资源。

> 在一般情形下

> entry与bundle存在着对应关系，如图3-3所示。[插图]图3-3　entry与bundle的对应关系

> 在一些特殊情况下，一个入口也可能产生多个chunk并最终生成多个bundle，

> 本书后面的章节会对这些情况进行更深入的介绍。

#### 3.2 配置资源入口

> Webpack通过context和entry这两个配置项来共同决定入口文件的路径。在配置入口时，实际上做了两件事：

> ·确定入口模块位置，告诉Webpack从哪里开始进行打包。·定义chunk name。如果工程只有一个入口，那么默认其chunk name为“main”；如果工程有多个入口，我们需要为每个入口定义chunk name，来作为该chunk的唯一标识。

##### 3.2.1 context

context可以理解为资源入口的路径前缀，在配置时要求必须使用绝对路径的形式。

> // 以下两种配置达到的效果相同，入口都为 <工程根路径>/src/scripts/index.jsmodule.exports = {    context: path.join(__dirname, './src'),    entry: './scripts/index.js',};module.exports = {    context: path.join(__dirname, './src/scripts'),    entry: './index.js',};配置context的主要目的是让entry的编写更加简洁，尤其是在多入口的情况下。context可以省略，默认值为当前工程的根目录。

##### 3.2.2 entry

> 与context只能为字符串不同，entry的配置可以有多种形式：字符串、数组、对象、函数。

> 1.字符串类型入口直接传入文件路径：module.exports = {    entry: './src/index.js',    output: {        filename: 'bundle.js',    },    mode: 'development',};

> 2.数组类型入口传入一个数组的作用是将多个资源预先合并，在打包时Webpack会将数组中的最后一个元素作为实际的入口路径。

> module.exports = {    entry: ['babel-polyfill', './src/index.js'] ,};上面的配置等同于：// webpack.config.jsmodule.exports = {    entry: './src/index.js',};// index.jsimport 'babel-polyfill';

> 3.对象类型入口如果想要定义多入口，则必须使用对象的形式。对象的属性名（key）是chunk name，属性值（value）是入口路径。如：module.exports = {    entry: {        // chunk name为index，入口路径为./src/index.js        index: './src/index.js',

> // chunk name为lib，入口路径为./src/lib.js        lib: './src/lib.js',    },};对象的属性值也可以为字符串或数组。如：module.exports = {    entry: {        index: ['babel-polyfill', './src/index.js'],        lib: './src/lib.js',    },};

> 在使用字符串或数组定义单入口时，并没有办法更改chunk name，只能为默认的“main”。在使用对象来定义多入口时，则必须为每一个入口定义chunk name。

> 4.函数类型入口

> 用函数定义入口时，只要返回上面介绍的任何配置形式即可，如：// 返回一个字符串型的入口module.exports = {    entry: () => './src/index.js',};// 返回一个对象型的入口module.exports = {    entry: () => ({        index: ['babel-polyfill', './src/index.js'],        lib: './src/lib.js',    }),};传入一个函数的优点在于我们可以在函数体里添加一些动态的逻辑来获取工程的入口。另外，函数也支持返回一个Promise对象来进行异步操作。

> module.exports = {    entry: () => new Promise((resolve) => {        // 模拟异步操作        setTimeout(() => {            resolve('./src/index.js');        }, 1000);    }),};

##### 3.2.3 实例

1.单页应用

> 在Webpack默认配置中，当一个bundle大于250kB时（压缩前）会认为这个bundle已经过大了，在打包时会发生警告，如图3-4所示。

[插图]图3-4　大于250kB的资源会有[big]提示

> 2.提取vendor试想一下，假如工程只产生一个JS文件并且它的体积很大，一旦产生代码更新，即便只有一点点改动，用户都要重新下载整个资源文件，这对于页面的性能是非常不友好的。

> 为了解决这个问题，我们可以使用提取vendor的方法。vendor的意思是“供应商”，在Webpack中vendor一般指的是工程所使用的库、框架等第三方模块集中打包而产生的bundle。

> module.exports = {    context: path.join(__dirname, './src'),    entry: {        app: './src/app.js',        vendor: ['react', 'react-dom', 'react-router'],    },};

> 那么问题来了，我们并没有为vendor设置入口路径，Webpack要如何打包呢？这时我们可以使用CommonsChunkPlugin（在Webpack 4之后CommonsChunkPlugin已被废弃，可以采用optimization.splitChunks

> ，具体参考第6章内容），将app与vendor这两个chunk中的公共模块提取出来。通过这样的配置，app.js产生的bundle将只包含业务模块，其依赖的第三方模块将会被抽取出来生成一个新的bundle，这也就达到了我们提取vendor的目标。由于vendor仅仅包含第三方模块，这部分不会经常变动，因此可以有效地利用客户端缓存，在用户后续请求页面时会加快整体的渲染速度。3.多页应用

> 对于多页应用的场景，为了尽可能减小资源的体积，我们希望每个页面都只加载各自必要的逻辑，而不是将所有页面打包到同一个bundle中。因此每个页面都需要有一个独立的bundle，这种情形我们使用多入口来实现。

> module.exports = {    entry: {        pageA: './src/pageA.js',        pageB: './src/pageB.js',        pageC: './src/pageC.js',    },};

> 另外，对于多页应用的场景，我们同样可以使用提取vendor的方法，将各个页面之间的公共模块进行打包。如：module.exports = {    entry: {        pageA: './src/pageA.js',        pageB: './src/pageB.js',        pageC: './src/pageC.js',        vendor: ['react', 'react-dom'] ,    },};

> 可以看到，我们将react和react-dom打包进了vendor，之后再配置optimization.splitChunks，将它们从各个页面中提取出来，生成单独的bundle即可。

#### 3.3 配置资源出口

> 所有与出口相关的配置都集中在output对象里

> const path = require('path');module.exports = {    entry: './src/app.js',    output: {        filename: 'bundle.js',        path: path.join(__dirname, 'assets'),        publicPath: '/dist/',    },};

> output对象里可以包含数十个配置项，其中的大多数在日常开发中使用频率都不高

##### 3.3.1 filename

> module.exports = {    entry: './src/app.js',    output: {        filename: 'bundle.js',    },};

> 使用上面的配置打包的结果如图3-5所示。

[插图]图3-5　生成bundle.js

> filename可以不仅仅是bundle的名字，还可以是一个相对路径，即便路径中的目录不存在也没关系，Webpack会在输出资源时创建该目录。

> module.exports = {    entry: './src/app.js',    output: {        filename: './js/bundle.js',    },};

> 在多入口的场景中，我们需要为对应产生的每个bundle指定不同的名字，Webpack支持使用一种类似模板语言的形式动态地生成文件名，如：module.exports = {    entry: {        app: './src/app.js',        vendor: './src/vendor.js',    },    output: {        filename: '[name].js',    },};

> 在资源输出时，上面配置的filename中的[name]会被替换为chunk name，因此最后项目中实际生成的资源是vendor.js与app.js，

> 表3-1　filename配置项模板变量[插图]


> 上述变量一般有如下两种作用：·当有多个chunk存在时对不同的chunk进行区分。如[name]、[chunkhash]和[id]，它们对于每个chunk来说都是不同的。·控制客户端缓存。表中的[hash]和[chunkhash]都与chunk内容直接相关，在filename中使用了这些变量后，当chunk的内容改变时，可以同时引起资源文件名的更改，从而使用户在下一次请求资源文件时会立即下载新的版本而不会使用本地缓存。[query]也可以起到类似的效果，只不过它与chunk内容无关，要由开发者手动指定。

> 在实际工程中，我们使用比较多的是[name]，它与chunk是一一对应的关系，并且可读性较高。如果要控制客户端缓存，最好还要加上[chunkhash]，因为每个chunk所产生的[chunkhash]只与自身内容有关，单个chunk内容的改变不会影响其他资源，可以最精确地让客户端缓存得到更新。

> 让我们看以下的例子：module.exports = {    entry: {        app: './src/app.js',        vendor: './src/vendor.js',    },    output: {        filename: '[name]@[chunkhash].js',    },};

> 注意　更新缓存一般只用在生产环境的配置下，在开发环境中可以不必配置[chunkhash]，详见第7章介绍分离配置文件的部分。

##### 3.3.2 path

path可以指定资源输出的位置，要求值必须为绝对路径。

> const path = require('path');module.exports = {    entry: './src/app.js',    output: {        filename: 'bundle.js',        path: path.join(__dirname, 'dist') ,    },};

> 上述配置将资源输出位置设置为工程的dist目录。在Webpack 4以前的版本中，打包资源默认会生成在工程根目录，因此我们需要上述配置；而在Webpack 4之后，output.path已经默认为dist目录，除非我们需要更改它，否则不必单独配置。

##### 3.3.3 publicPath

> path用来指定资源的输出位置，而publicPath则用来指定资源的请求位置。

> ·输出位置：打包完成后资源产生的目录，一般将其指定为工程中的dist目录。·请求位置：由JS或CSS所请求的间接资源路径。页面中的资源分为两种，一种是由HTML页面直接请求的，比如通过script标签加载的JS；另一种是由JS或CSS请求的，如异步加载的JS、从CSS请求的图片字体等。publicPath的作用就是指定这部分间接资源的请求位置。

> publicPath有3种形式，下面我们逐一进行介绍。

> 1.HTML相关

> 与HTML相关，也就是说我们可以将publicPath指定为HTML的相对路径，在请求这些资源时会以当前页面HTML所在路径加上相对路径，构成实际请求的URL。如：// 假设当前HTML地址为 https://example.com/app/index.html// 异步加载的资源名为 0.chunk.jspublicPath: "" // 实际路径https://example.com/app/0.chunk.jspublicPath: "./js" // 实际路径https://example.com/app/js/0.chunk.jspublicPath: "../assets/" // 实际路径https://example.com/aseets/0.chunk.js

> 2.Host相关

> 若publicPath的值以“/”开始，则代表此时publicPath是以当前页面的host name为基础路径的。如：// 假设当前HTML地址为 https://example.com/app/index.html// 异步加载的资源名为 0.chunk.jspublicPath: "/" // 实际路径https://example.com/0.chunk.jspublicPath: "/js/" // 实际路径https://example.com/js/0.chunk.jspublicPath: "/dist/" // 实际路径https://example.com/dist/0.chunk.js

> 3.CDN相关

> // 假设当前页面路径为 https://example.com/app/index.html// 异步加载的资源名为 0.chunk.jspublicPath: "http://cdn.com/" // 实际路径http://cdn.com/0.chunk.jspublicPath: "https://cdn.com/" // 实际路径https://cdn.com/0.chunk.jspublicPath: "//cdn.com/assets/" 实际路径 //cdn.com/assets/0.chunk.js

> webpack-dev-server的配置中也有一个publicPath，值得注意的是，这个publicPath与Webpack中的配置项含义不同，它的作用是指定webpack-dev-server的静态资源服务路径。请看下面的例子：const path = require('path');module.exports = {    entry: './src/app.js',    output: {        filename: 'bundle.js',        path: path.join(__dirname, 'dist'),    },    devServer: {        publicPath: '/assets/',        port: 3000,    },};从上面可以看到，Webpack配置中output.path为dist目录，因此bundle.js应该生成在dist目录。但是当我们启动webpack-dev-server的服务后，访问localhost：3000/dist/bundle.js时却会得到404。这是因为devServer.publicPath配置项将资源位置指向了localhost：3000/assets/，因此只有访问localhost：3000/assets/bundle.js才能得到我们想要的结果。

> 为了避免开发环境和生产环境产生不一致而造成开发者的疑惑，我们可以将webpack-dev-server的publicPath与Webpack中的output.path保持一致，这样在任何环境下资源输出的目录都是相同的。请看下面的例子：

> const path = require('path');module.exports = {    entry: './src/app.js',    output: {        filename: 'bundle.js',        path: path.join(__dirname, 'dist') ,    },    devServer: {        publicPath: '/dist/',        port: 3000,    },};

> 上面的配置可以保证访问localhost：3000/dist/bundle.js时得到预期的结果。

##### 3.3.4 实例

> 资源的输出目录为dist（Webpack 4以后已经默认）。此时我们还不需要配置output.publicPath，但是对于webpack-dev-server来说需要为其指定资源的服务路径，因此我们设置了devServer.publicPath为/dist/。

#### 3.4 本章小结

> 当第三方依赖较多时，我们可以用提取vendor的方法将这些模块打包到一个单独的bundle中，以更有效地利用客户端缓存，加快页面渲染速度。

### 第4章 预处理器

> 本章我们会介绍预处理器（loader），它赋予了Webpack可处理不同资源类型的能力，极大丰富了其可扩展性。本章包含以下几方面内容：

> ·Webpack“一切皆模块”的思想与loader的概念；·loader的原理；·如何引入一个loader；·常用loader介绍；·如何编写一个loader。

#### 4.1 一切皆模块

> 一个Web工程通常会包含HTML、JS、CSS、模板、图片、字体等多种类型的静态资源，

> 并且这些资源之间都存在着某种联系。

> 比如，JS文件之间有互相依赖的关系，在CSS中可能会引用图片和字体等。

> 对于Webpack来说，所有这些静态资源都是模块，我们可以像加载一个JS文件一样去加载它们，如在index.js中加载style.css：// index.jsimport './style.css';

> 对于刚开始接触Webpack的人来说，可能会认为这个特性很神奇，甚至会觉得不解：从JS中加载CSS文件具有怎样的意义呢？从结果来看，其实和之前并没有什么差别，这个style.css可以被打包并生成在输出资源目录下，对index.js文件也不会产生实质性的影响。这句引用的实际意义是描述了JS文件与CSS文件之间的依赖关系。


> [插图]图4-1　使用Webpack前后依赖关系图对比

#### 4.2 loader概述

> 每个loader本质上都是一个函数。在Webpack 4之前，函数的输入和输出都必须为字符串；在Webpack 4之后，loader也同时支持抽象语法树（AST）的传递，通过这种方法来减少重复的代码解析。用公式表达loader的本质则为以下形式：output=loader(input)

> 这里的input可能是工程源文件的字符串，也可能是上一个loader转化后的结果，包括转化后的结果（也是字符串类型）、source map，以及AST对象；output同样包含这几种信息，转化后的文件字符串、source map，以及AST。如果这是最后一个loader，结果将直接被送到Webpack进行后续处理，否则将作为下一个loader的输入向后传递。

> loader可以是链式的。我们可以对一种资源设置多个loader，第一个loader的输入是文件源码，之后所有loader的输入都为上一个loader的输出。

> 如在工程中编译SCSS时

> 为了更好地阐释loader是如何工作的，下面来看一下loader的源码结构：

> 为了更好地阐释loader是如何工作的，下面来看一下loader的源码结构：module.exports = function loader (content, map, meta) {   var callback = this.async();   var result = handler(content, map, meta);   callback(       null,           // error       result.content, // 转换后的内容       result.map,     // 转换后的 source-map       result.meta,    // 转换后的 AST   );};

> module.exports = function loader (content, map, meta) {   var callback = this.async();   var result = handler(content, map, meta);   callback(       null,           // error       result.content, // 转换后的内容       result.map,     // 转换后的 source-map       result.meta,    // 转换后的 AST   );};

> 从上面代码可以看出，loader本身就是一个函数，在该函数中对接收到的内容进行转换，然后返回转换后的结果（可能包含source map和AST对象）。

#### 4.3 loader的配置

> Webpack本身只认识JavaScript，对于其他类型的资源必须预先定义一个或多个loader对其进行转译，输出为Webpack能够接收的形式再继续进行，因此loader做的实际上是一个预处理的工作。

##### 4.3.1 loader的引入

> module.exports = {    // ...    module: {        rules: [{            test: /\.css$/,            use: ['css-loader'],        }],    },}；与loader相关的配置都在module对象中，其中module.rules代表了模块的处理规则。每条规则内部可以包含很多配置项，这里我们只使用了最重要的两项—test和use。·test可接收一个正则表达式或者一个元素为正则表达式的数组，只有正则匹配上的模块才会使用这条规则。在本例中以/\.css$/来匹配所有以.css结尾的文件。·use可接收一个数组，数组包含该规则所使用的loader。在本例中只配置了一个css-loader，在只有一个loader时也可以简化为字符串“css-loader”。

> 此时我们再进行打包，之前的错误应该已经消失了，但是CSS的样式仍然没有在页面上生效。这是因为css-loader的作用仅仅是处理CSS的各种加载语法（@import和url()函数等），如果要使样式起作用还需要style-loader来把样式插入页面。css-loader与style-loader通常是配合在一起使用的。

##### 4.3.2 链式loader

> 对于SCSS类型的资源来说，我们需要sass-loader来处理其语法，并将其编译为CSS；接着再用css-loader处理CSS的各类加载语法；最后使用style-loader来将样式字符串包装成style标签插入页面。

> 接着之前的配置，更改rules中的规则。 module.exports = {    // ...    module: {        rules: [            {                test: /\.css$/,                use: ['style-loader', 'css-loader'],            }        ],    },}；我们把style-loader加到了css-loader前面，这是因为在Webpack打包时是按照数组从后往前的顺序将资源交给loader处理的，因此要把最后生效的放在前面。

##### 4.3.3 loader options

loader作为预处理器通常会给开发者提供一些配置项，在引入loader的时候可以通过options将它们传入。

> rules: [    {        test: /\.css$/,        use: [            'style-loader',            {                loader: 'css-loader',                options: {                    // css-loader 配置项                },            }        ],    },],

> 有些loader可能会使用query来代替options，从功能来说它们并没有太大的区别，具体参阅loader本身的文档。

##### 4.3.4 更多配置

> 下面介绍其他场景下loader的相关配置。1.exclude与include

> exclude与include是用来排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），以及由它们组成的数组。

> rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        exclude: /node_modules/,    }],

> 上面exclude的含义是，所有被正则匹配到的模块都排除在该规则之外，也就是说node_modules中的模块不会执行这条规则。该配置项通常是必加的，否则可能拖慢整体的打包速度。

> 举个例子，在项目中我们经常会使用babel-loader（后面章节会介绍）来处理ES6+语言特性，但是对于node_modules中的JS文件来说，很多都是已经编译为ES5的，因此没有必要再使用babel-loader来进行额外处理。

> 除exclude外，使用include配置也可以达到类似的效果。请看下面的例子：rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        include: /src/,    }],

> include代表该规则只对正则匹配到的模块生效。假如我们将include设置为工程的源码目录，自然而然就将node_modules等目录排除掉了。exclude和include同时存在时，exclude的优先级更高。

> 请看下面的例子：rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        exclude: /node_modules/,        include: /node_modules\/awesome-ui/,    }],此时，node_modules已经被排除了，但是假如我们想要让该规则对node_modules中的某一个模块生效，即便加上include也是无法覆盖exclude配置的。要实现这样的需求我们可以更改exclude中的正则。

> rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        // 排除node_modules中除了foo和bar以外的所有模块        exclude: /node_modules\/(?!(foo|bar)\/).*/,    }],另外，由于exclude优先级更高，我们可以对include中的子目录进行排除。

> rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        exclude: /src\/lib/,        include: /src/,    }],

> 通过include，我们将该规则配置为仅对src目录生效，但是仍然可以通过exclude排除其中的src/lib目录。

> 2.resource与issuerresource与issuer可用于更加精确地确定模块规则的作用范围。请看下面的例子：// index.jsimport './style.css';在Webpack中，我们认为被加载模块是resource，而加载者是issuer。如上面的例子中，resource为/path/of/app/style.css，issuer是/path/of/app/index.js。前面介绍的test、exclude、include本质上属于对resource也就是被加载者的配置，如果想要对issuer加载者也增加条件限制，则要额外写一些配置。

> 比如，如果我们只想让/src/pages目录下的JS可以引用CSS，应该如何设置呢？请看下面的例子：rules: [    {        test: /\.css$/,        use: ['style-loader', 'css-loader'],        exclude: /node_modules/,        issuer: {            test: /\.js$/,            include: /src/pages/,        },    }],

> 可以看到，我们添加了issuer配置对象，其形式与之前对resource条件的配置并无太大差异。但只有/src/pages/目录下面的JS文件引用CSS文件，这条规则才会生效；如果不是JS文件引用的CSS（比如JSX文件），或者是别的目录的JS文件引用CSS，则规则不会生效。

> 上面的配置虽然实现了我们的需求，但是test、exclude、include这些配置项分布于不同的层级上，可读性较差。事实上我们还可以将它改为另一种等价的形式。rules: [    {        use: ['style-loader', 'css-loader'],        resource: {            test: /\.css$/,            exclude: /node_modules/,        },        issuer: {            test: /\.js$/,            exclude: /node_modules/,        },    }],

> 通过添加resource对象来将外层的配置包起来，区分了resource和issuer中的规则，这样就一目了然了。上面的配置与把resource的配置写在外层在本质上是一样的，然而这两种形式无法并存，只能选择一种风格进行配置。

> 3.enforceenforce用来指定一个loader的种类，只接收“pre”或“post”两种字符串类型的值。

> Webpack中的loader按照执行顺序可分为pre、inline、normal、post四种类型，上面我们直接定义的loader都属于normal类型，inline形式官方已经不推荐使用，而pre和post则需要使用enforce来指定。请看下面的例子：rules: [    {        test: /\.js$/,        enforce: 'pre',        use: 'eslint-loader',    }],

> 可以看到，在配置中添加了一个eslint-loader来对源码进行质量检测，其enforce的值为“pre”，代表它将在所有正常loader之前执行，这样可以保证其检测的代码不是被其他loader更改过的。类似的，如果某一个loader是需要在所有loader之后执行的，我们也可以指定其enforce为“post”。

> 事实上，我们也可以不使用enforce而只要保证loader顺序是正确的即可。配置enforce主要的目的是使模块规则更加清晰，可读性更强，尤其是在实际工程中，配置文件可能达到上百行的情况，难以保证各个loader都按照预想的方式工作，使用enforce可以强制指定loader的作用顺序。

#### 4.4 常用loader介绍

> 时每刻都可能有新的loader发布到npm上（这也是Webpack社区强大的体现）。

##### 4.4.1 babel-loader

> 在安装时推荐使用以下命令：npm install babel-loader @babel/core @babel/preset-env

> 各个模块的作用如下。·babel-loader：它是使Babel与Webpack协同工作的模块。·@babel/core：顾名思义，它是Babel编译器的核心模块。·@babel/preset-env：它是Babel官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译ES6+代码。

> 在配置babel-loader时有一些需要注意的地方。请看下面的例子：rules: [  {    test: /\.js$/,    exclude: /node_modules/,    use: {      loader: 'babel-loader',      options: {        cacheDirectory: true,        presets: [[          'env', {            modules: false,          }        ]],      },    },  }],

> 1）由于babel-loader通常属于对所有JS后缀文件设置的规则，所以需要在exclude中添加node_modules，否则会令babel-loader编译其中所有的模块，这将严重拖慢打包的速度，并且有可能改变第三方模块的原有行为。2）对于babel-loader本身我们添加了cacheDirectory配置项，它会启用缓存机制，在重复打包未改变过的模块时防止二次编译，同样也会加快打包的速度。

> cacheDirectory可以接收一个字符串类型的路径来作为缓存路径，这个值也可以为true，此时其缓存目录会指向node_modules/.cache/babel-loader。

> 3）由于@babel/preset-env会将ES6 Module转化为CommonJS的形式，这会导致Webpack中的tree-shaking特性失效（关于tree-shaking会在第8章详细介绍）。将@babel/preset-env的modules配置项设置为false会禁用模块语句的转化，而将ES6 Module的语法交给Webpack本身处理。

> babel-loader支持从.babelrc文件读取Babel配置，因此可以将presets和plugins从Webpack配置文件中提取出来，也能达到相同的效果。

##### 4.4.2 ts-loader

> Typescript本身的配置并不在ts-loader中，而是必须要放在工程目录下的tsconfig.json中。

> 如：{    "compilerOptions": {        "target": "es5",        "sourceMap": true,    },},

##### 4.4.3 html-loader

> html-loader用于将HTML文件转化为字符串并进行格式化，这使得我们可以把一个HTML片段通过JS加载进来。

> 使用示例如下：// header.html<header>    <h1>This is a Header.</h1></header>// index.jsimport headerHtml from './header.html';document.write(headerHtml);header.html将会转化为字符串，并通过document.write插入页面中。

##### 4.4.4 handlebars-loader

handlebars-loader用于处理handlebars模板，在安装时要额外安装handlebars。

> Webpack配置如下：rules: [    {        test: /\.handlebars$/,        use: handlebars-loader',    }],使用示例如下：// content.handlebars<div class="entry">    <h1>{{ title }}</h1>    <div class="body">{{ body }}</div></div>// index.jsimport contentTemplate from './content.handlebars';const div = document.createElement('div');div.innerHTML = contentTemplate({         title: "Title",         body: "Your books are due next Tuesday"});document.body.appendChild(div);handlebars文件加载后得到的是一个函数，可以接收一个变量对象并返回最终的字符串。

##### 4.4.5 file-loader

> file-loader用于打包文件类型的资源，并返回其publicPath。

> 安装命令如下：npm install file-loaderWebpack配置如下：const path = require('path');module.exports = {    entry: './app.js',    output: {        path: path.join(__dirname, 'dist'),        filename: 'bundle.js',    },    module: {        rules: [            {                test: /\.(png|jpg|gif)$/,                use: 'file-loader',            }        ],    },

> }；上面我们对png、jpg、gif这类图片资源使用file-loader，然后就可以在JS中加载图片了。

> import avatarImage from './avatar.jpg';console.log(avatarImage); // c6f482ac9a1905e1d7d22caa909371fc.jpg第3章介绍过，output.path是资源的打包输出路径，output.publicPath是资源引用路径（具体可以翻阅前文内容）。使用Webpack打包完成后，dist目录下会生成名为c6f482ac9a1905e1d7d22caa909371fc.jpg的图片文件。由于配置中并没有指定output.publicPath，因此这里打印出的图片路径只是文件名，默认为文件的hash值加上文件后缀。让我们观察下添加了output.publicPath之后的情况。请看下面的例子：

> const path = require('path');module.exports = {    entry: './app.js',    output: {        path: path.join(__dirname, 'dist'),        filename: 'bundle.js',        publicPath: './assets/',    },    module: {        rules: [            {                test: /\.(png|jpg|gif)$/,                use: 'file-loader',            }        ],    },}；此时图片路径会成为如下形式：import avatarImage from './avatar.jpg';console.log(avatarImage); // ./assets/c6f482ac9a1905e1d7d22caa909371fc.jpg

> file-loader也支持配置文件名以及publicPath（这里的publicPath会覆盖原有的output.publicPath），通过loader的options传入。rules: [    {        test: /\.(png|jpg|gif)$/,        use: {            loader: 'file-loader',            options: {                name: '[name].[ext]',                publicPath: './another-path/',            },        },    }] ,

> 上面的配置会使图片路径成为如下形式：import avatarImage from './avatar.jpg';console.log(avatarImage); // ./another-path/avatar.jpg可以看到，file-loader中options.publicPath覆盖了Webpack配置的publicPath，因此图片路径为./another-path/avatar.jpg。

##### 4.4.6 url-loader

url-loader与file-loader作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，当大于该阈值时与file-loader一样返回publicPath，而小于该阈值时则返回文件base64形式编码。

> 安装命令如下：npm install url-loaderWebpack配置如下：rules: [    {        test: /\.(png|jpg|gif)$/,        use: {            loader: 'url-loader',            options: {                limit: 10240,                name: '[name].[ext]',                publicPath: './assets-path/',            },        },    }],

> url-loader可接收与file-loader相同的参数，如name和publicPath等，同时也可以接收一个limit参数。使用示例如下：import avatarImage from './avatar.jpg';console.log(avatarImage); // data:image/jpeg;base64,/9j/2wCEAAgGBg……由于图片小于limit，因此经过url-loader转化后得到的是base64形式的编码。

##### 4.4.7 vue-loader

> vue-loader用于处理vue组件

> vue-loader可以将组件的模板、JS及样式进行拆分。在安装时，除了必要的vue与vue-loader以外，还要安装vue-template-compiler来编译Vue模板，以及css-loader来处理样式（如果使用SCSS或LESS则仍需要对应的loader）。

> 安装命令如下：npm install vue-loader vue vue-template-compiler css-loaderWebpack配置如下：rules: [    {        test: /\.vue$/,        use: 'vue-loader',    }],

> vue-loader支持更多高级配置，这里不再详述，感兴趣的读者可参阅文档https://vue-loader.vuejs.org/zh-cn。

#### 4.5 自定义loader

> 1.loader初始化

> 我们将实现一个loader，它会为所有JS文件启用严格模式，也就是说它会在文件头部加上如下代码：'use strict';

> 在开发一个loader时，我们可以借助npm/yarn的软链功能进行本地调试（当然之后可以考虑发布到npm等）。

> 创建一个force-strict-loader目录

> 然后在该目录下执行npm初始化命令。

> npm init –y

> 接着创建index.js，也就是loader的主体。module.exports = function(content) {     var useStrictPrefix = '\'use strict\';\n\n';     return useStrictPrefix + content;}现在我们可以在Webpack工程中安装并使用这个loader了。npm install <path-to-loader>/force-strict-loader

> 在Webpack工程目录下使用相对路径安装，会在项目的node_modules中创建一个指向实际force-strict-loader目录的软链，也就是说之后我们可以随时修改loader源码并且不需要重复安装了。

> 下面修改Webpack配置。module: {    rules: [        {            test: /\.js$/,            use: 'force-strict-loader'        }    ]}

> 2.启用缓存当文件输入和其依赖没有发生变化时，应该让loader直接使用缓存，而不是重复进行转换的工作。在Webpack中可以使用this.cacheable进行控制，修改我们的loader。

> // force-strict-loader/index.jsmodule.exports = function(content) {    if (this.cacheable) {        this.cacheable();    }    var useStrictPrefix = '\'use strict\';\n\n';    return useStrictPrefix + content;}通过启用缓存可以加快Webpack打包速度，并且可保证相同的输入产生相同的输出。

> 3.获取options

> 前文讲过，loader的配置项通过use.options传进来，如：rules: [    {        test: /\.js$/,        use: {            loader: 'force-strict-loader',            options: {                sourceMap: true,            },        },    }],

> 上面我们为force-strict-loader传入了一个配置项sourceMap，接下来我们要在loader中获取它。首先需要安装一个依赖库loader-utils，它主要用于提供一些帮助函数。在force-strict-loader目录下执行以下命令：npm install loader-utils接着更改loader。// force-strict-loader/index.jsvar loaderUtils = require("loader-utils");module.exports = function(content) {    if (this.cacheable) {        this.cacheable();    }    // 获取和打印 options    var options = loaderUtils.getOptions(this) || {};    console.log('options', options);    // 处理 content    var useStrictPrefix = '\'use strict\';\n\n';    return useStrictPrefix + content;}

> 下面我们来看如何实现一个source-map功能。4.source-mapsource-map可以便于实际开发者在浏览器控制台查看源码。如果

> 没有对source-map进行处理，最终也就无法生成正确的map文件，在浏览器的dev tool中可能就会看到错乱的源码。下面是支持了source-map特性后的版本：// force-strict-loader/index.jsvar loaderUtils = require("loader-utils");var SourceNode = require("source-map").SourceNode;var SourceMapConsumer = require("source-map").SourceMapConsumer;module.exports = function(content, sourceMap) {    var useStrictPrefix = '\'use strict\';\n\n';    if (this.cacheable) {        this.cacheable();    }    // source-map    var options = loaderUtils.getOptions(this) || {};    if (options.sourceMap && sourceMap) {        var currentRequest = loaderUtils.getCurrentRequest(this);        var node = SourceNode.fromStringWithSourceMap(            content,            new SourceMapConsumer(sourceMap)        );        node.prepend(useStrictPrefix);        var result = node.toStringWithSourceMap({ file: currentRequest });        var callback = this.async();        callback(null, result.code, result.map.toJSON());    }    // 不支持source-map情况    return useStrictPrefix + content;}首先，在loader函数的参数中我们获取到sourceMap对象，这是由Webpack或者上一个loader传递下来的，只有当它存在时我们的loader才能进行继续处理和向下传递。之后我们通过source-map这个库来对map进行操作，包括接收和消费之前的文件内容和source-map，对内容节点进行修改，最后产生新的source-map。在函数返回的时候要使用this.async获取callback函数（主要是为了一次性返回多个值）。callback函数的3个参数分别是抛出的错误、处理后的源码，以及source-map。以上介绍了自定义loader的基本形式，更多API可以查阅Webpack官方文档https://doc.webpack-china.org/api/loaders/。

#### 4.6 本章小结

> loader就像Webpack的翻译官。Webpack本身只能接受JavaScript，为了使其能够处理其他类型的资源，必须使用loader将资源转译为Webpack能够理解的形式。

> 在配置loader时，实际上定义的是模块规则（module.rules），它主要关注两件事：该规则对哪些模块生效（test、exclude、include配置），使用哪些loader（use配置）。loader可以是链式的，并且每一个都允许拥有自己的配置项。

> oader本质上是一个函数。第一个loader的输入是源文件，之后所有loader的输入是上一个loader的输出，最后一个loader则直接输出给Webpack。

### 第5章 样式处理

> 本章将包含以下几方面的内容：·如何使用Webpack打包样式；·样式相关loader；·如何分离样式文件；·组件化样式。

#### 5.1 分离样式文件

> Webpack社区有专门的插件：extract-text-webpack-plugin（适用于Webpack 4之前版本）和mini-css-extract-plugin（适用于Webpack 4及以上版本），它们就是专门用于提取样式到CSS文件的。

##### 5.1.1 extract-text-webpack-plugin

> npm install extract-text-webpack-plugin

> 在webpack.config.js中引入：const ExtractTextPlugin = require('extract-text-webpack-plugin');module.exports = {    entry: './app.js',    output: {        filename: 'bundle.js',    },    mode: 'development',    module: {        rules: [            {                test: /\.css$/,                use: ExtractTextPlugin.extract({                    fallback: 'style-loader'，                    use: 'css-loader',                }),            }        ],    },    plugins: [        new ExtractTextPlugin("bundle.css")    ],};

> 在module.rules中我们设置了处理CSS文件的规则，其中的use字段并没有直接传入loader，而是使用了插件的extract方法包了一层。内部的fallback属性用于指定当插件无法提取样式时所采用的loader（目前还接触不到这种场景，后面会介绍），use（extract方法里面的）用于指定在提取样式之前采用哪些loader来预先进行处理。除此之外，还要在Webpack的plugins配置中添加该插件，并传入提取后的资源文件名。

> 。plugins用于接收一个插件数组，我们可以使用Webpack内部提供的一些插件，也可以加载外部插件。


> [插图]图5-1　打包结果

> 可以看到Asset中增加了bundle.css，正是我们在插件中指定的文件名。

##### 5.1.2 多样式文件的处理

> 样式的提取是以资源入口开始的整个chunk为单位的（重温一下chunk的概念：chunk是对一组有依赖关系的模块的封装）。假设我们的应用从index.js开始一层层引入了几百个模块，也许其中很多模块都引入了各自的样式，但是最终只会生成一个CSS文件，因为它们都来自同一个入口模块。

> 上面我们将bundle.css作为文件名传给了extract-text-webpack-plugin，但当工程有多个入口时就会发生重名问题。就像在前面的章节中我们配置动态的output.filename一样，这里我们也要对插件提取的CSS文件使用类似模板的命名方式。

> plugins: [        new ExtractTextPlugin('[name].css')    ],

> 我们使用了[name].css来动态生成CSS为文件名。那么问题来了，这里的[name]指代的是谁的名字呢？

> 这里的[name]和在output.filename中的意义一样，都是指代chunk的名字，即entry中我们为每一个入口分配的名字（foo、bar）。我们可以来验证一下打包结果，如图5-2所示。


[插图]图5-2　动态生成的CSS文件名

> [name]指代的是chunk的名字，Asset与Chunk Names是相对应的。

##### 5.1.3 mini-css-extract-plugin

> mini-css-extract-plugin可以理解成extract-text-webpack-plugin的升级版，它拥有更丰富的特性和更好的性能，从Webpack 4开始官方推荐使用该插件进行样式提取（Webpack 4以前的版本是用不了的）。

> 说到mini-css-extract-plugin的特性，最重要的就是它支持按需加载CSS，以前在使用extract-text-webpack-plugin的时候我们是做不到这一点的。

> 举个例子，a.js通过import()函数异步加载了b.js，b.js里面加载了style.css，那么style.css最终只能被同步加载（通过HTML的link标签）。但是现在mini-css-extract-plugin会单独打包出一个0.css（假设使用默认配置），这个CSS文件将由a.js通过动态插入link标签的方式加载。请看下面的例子：// app.jsimport './style.css';import('./next-page');document.write('app.js<br/>');// next-page.jsimport './next-page.css';document.write('Next page.<br/>');/* style.css */body { background-color: #eee; }/* next-page.css */body { background-color: #999; }// webpack.config.jsconst MiniCssExtractPlugin = require('mini-css-extract-plugin');module.exports = {  entry: './app.js',  output: {    filename: '[name].js',  },  mode: 'development',  module: {    rules: [{      test: /\.css$/,      use: [        {          loader: MiniCssExtractPlugin.loader,          options: {            publicPath: '../',          },        },        'css-loader'      ],    }],  },  plugins: [    new MiniCssExtractPlugin({      filename: '[name].css',      chunkFilename: '[id].css',    })  ]

> };在配置上mini-css-extract-plugin与extract-text-webpack-plugin有以下几点不同：

> ·loader规则设置的形式不同，并且mini-css-extract-plugin支持配置publicPath，用来指定异步CSS的加载路径。·不需要设置fallback。·在plugins设置中，除了指定同步加载的CSS资源名（filename），还要指定异步加载的CSS资源名（chunkFilename）。

> 我们来看一下上面例子的实际运行情况。如图5-3所示。[插图]


> 图5-3　异步加载CSS

#### 5.2 样式预处理

##### 5.2.1 Sass与SCSS

> Sass本身是对CSS的语法增强，它有两种语法，现在使用更多的是SCSS（对CSS3的扩充版本）。所以你会发现，在安装和配置loader时都是sass-loader，而实际的文件后缀是.scss。

> sass-loader就是将SCSS语法编译为CSS，因此在使用时通常还要搭配css-loader和style-loader。类似于我们装babel-loader时还要安装babel-core，loader本身只是编译核心库与Webpack的连接器，因此这里我们除了sass-loader以外还要安装node-sass，node-sass是真正用来编译SCSS的，而sass-loader只是起到黏合的作用。

> 安装命令如下：npm install sass-loader node-sass

> 安装node-sass时需要下载一个系统相关的二进制包，这个二进制包通常下载较慢，甚至有可能超时，因此通常我们会为其设置一个cnpm的镜像地址。可使用如下命令：npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

> 接着我们来添加处理SCSS文件的Webpack配置。module: {    rules: [        {            test: /\.scss$/,            use: ['style-loader', 'css-loader', 'sass-loader'],        }    ],},

> 值得一提的是，假如我们想要在浏览器的调试工具里查看源码，需要分别为sass-loader和css-loader单独添加source map的配置项。

> module: {    rules: [        {            test: /\.scss$/,            use: [                'style-loader',                {                    loader: 'css-loader',                    options: {                        sourceMap: true,                    },                }, {                    loader: 'sass-loader',                    options: {                        sourceMap: true,                    },                }            ],        }    ],},

##### 5.2.2 Less

> npm install less-loader less

> 在配置上也与SCSS十分类似。module: {    rules: [        {            test: /\.less/,            use: [                'style-loader',                {                    loader: 'css-loader',                    options: {                        sourceMap: true,                    },                }, {                    loader: 'less-loader',                    options: {                        sourceMap: true,                    },                }            ],        }    ],},

#### 5.3 PostCSS

> 严格说来，PostCSS并不能算是一个CSS的预编译器，它只是一个编译插件的容器。

> 它的工作模式是接收样式源代码并交由编译插件处理，最后输出CSS。开发者可以自己指定使用哪些插件来实现特定的功能。

##### 5.3.1 PostCSS与Webpack

> npm install postcss-loader配置起来也很简单。module: {    rules: [        {            test: /\.css/,            use: [                'style-loader',                'css-loader',                'postcss-loader',            ] ,        }    ],},

> postcss-loader可以结合css-loader使用，也可以单独使用，也就是说不配置css-loader也可以达到相同的效果。

> 唯一不同的是，单独使用postcss-loader时不建议使用CSS中的@import语句，否则会产生冗余代码，因此官方推荐还是将postcss-loader放在css-loader之后使用。

> 除此之外，PostCSS要求必须有一个单独的配置文件。在最初的版本中，其配置是可以通过loader来传入的，而在Webpack 2对配置添加了更严格的限制之后，PostCSS不再支持从loader传入。因此我们需要在项目的根目录下创建一个postcss.config.js。

##### 5.3.2 自动前缀

PostCSS一个最广泛的应用场景就是与Autoprefixer结合，为CSS自动添加厂商前缀。

> Autoprefixer是一个样式工具，可以根据caniuse.com上的数据，自动决定是否要为某一特性添加厂商前缀，并且可以由开发者为其指定支持浏览器的范围。

> 使用npm安装。npm install autoprefixer在postcss.config.js中添加autoprefixer。const autoprefixer = require('autoprefixer');module.exports = {    plugins: [        autoprefixer({            grid: true,            browsers: [                '> 1%',                'last 3 versions',                'android 4.2',                'ie 8',            ],        })    ],};

> 我们可以在autoprefixer中添加需要支持的特性（如grid）以及兼容哪些浏览器（browsers）。配置好之后，我们就可以使用一些较新的CSS特性。如：.container {    display: grid;}

> 由于我们指定了grid：true，也就是为grid特性添加IE前缀，经过编译后则会成为：

> .container {    display: -ms-grid;    display: grid;}

##### 5.3.3 stylelint

> stylelint是一个CSS的质量检测工具，就像eslint一样，我们可以为其添加各种规则，来统一项目的代码风格，确保代码质量。

> npm install stylelint

> 在postcss.config.js中添加相应配置。const stylelint = require('stylelint');module.exports = {    plugins: [        stylelint({            config: {                rules: {                    'declaration-no-important': true,                },            },        })    ],};

> 这里我们添加了declaration-no-important这样一条规则，当我们的代码中出现了“！important”时就会给出警告。比如下面的代码：body {    color: #09c!important;}执行打包时会在控制台输出警告信息，

> 使用stylelint可以检测出代码中的样式问题（语法错误、重复的属性等），帮助我们写出更加安全并且风格更加一致的代码。

##### 5.3.4 CSSNext

> PostCSS可以与CSSNext结合使用，让我们在应用中使用最新的CSS语法特性。

> npm install postcss-cssnext

> 在postcss.config.js中添加相应配置。const postcssCssnext = require('postcss-cssnext');module.exports = {    plugins: [        postcssCssnext({            // 指定所支持的浏览器            browsers: [                '> 1%',                'last 2 versions',            ],        })    ],

> };

> PostCSS会帮我们把CSSNext的语法翻译为浏览器能接受的属性和形式。比如下面的代码：

> /* style.css */:root {    --highlightColor: hwb(190, 35%, 20%);}body {    color: var(--highlightColor);}

> 打包后的结果如下：body {    color: rgb(89, 185, 204);}

#### 5.4 CSS Modules

> CSS Modules是近年来比较流行的一种开发模式，其理念就是把CSS模块化，让CSS也拥有模块的特点，具体如下：

> ·每个CSS文件中的样式都拥有单独的作用域，不会和外界发生命名冲突。·对CSS进行依赖管理，可以通过相对路径引入CSS文件。·可以通过composes轻松复用其他CSS模块。

> 使用CSS Modules不需要额外安装模块，只要开启css-loader中的modules配置项即可。

> module: {    rules: [        {            test: /\.css/,            use: [                'style-loader',                {                    loader: 'css-loader',                    options: {                        modules: true,                        localIdentName: '[name]__[local]__[hash:base64:5]',                    },                }            ],        }    ],},

> 这里比较值得一提的是localIdentName配置项，它用于指明CSS代码中的类名会如何来编译。假设源码是下面的形式：/* style.css */.title {    color: #f938ab;}经过编译后可能将成为.style__title__1CFy6。让我们依次对照上面的配置：

> ·[name]指代的是模块名，这里被替换为style。·[local]指代的是原本的选择器标识符，这里被替换为title。·[hash：base64：5]指代的是一个5位的hash值，这个hash值是根据模块名和标识符计算的，因此不同模块中相同的标识符也不会造成样式冲突。

> 在使用的过程中我们还要注意在JavaScript中引入CSS的方式。之前只是直接将CSS文件引入就可以了，但使用CSS Modules时CSS文件会导出一个对象，我们需要把这个对象中的属性添加到HTML标签上。请看下面的示例：/* style.css */.title {    color: #f938ab;}// app.jsimport styles from './style.css';document.write(`<h1 class="${styles.title}">My Webpack app.</h1>`);

> 最终这个HTML中的class才能与我们编译后的CSS类名匹配上。

### 第6章 代码分片

> 实现高性能应用其中重要的一点就是尽可能地让用户每次只加载必要的资源，优先级不太高的资源则采用延迟加载等技术渐进式地获取，这样可以保证页面的首屏速度。代码分片（code splitting）是Webpack作为打包工具所特有的一项技术，通过这项技术我们可以把代码按照特定的形式进行拆分，使用户不必一次全部加载，而是按需加载。

> 代码分片可以有效降低首屏加载资源的大小，但同时也会带来新的问题，比如我们应该对哪些模块进行分片、分片后的资源如何管理等，这些也是需要关注的。

> 本章将会包含以下几方面的内容：·代码分片与公共模块提取；·CommonsChunkPlugin与SplitChunksPlugin；·资源异步加载原理。

#### 6.1 通过入口划分代码

> 在Webpack中每个入口（entry）都将生成一个对应的资源文件，通过入口的配置我们可以进行一些简单有效的代码拆分。对于Web应用来说通常会有一些库和工具是不常变动的，可以把它们放在一个单独的入口中，由该入口产生的资源不会经常更新，因此可以有效地利用客户端缓存，让用户不必在每次请求页面时都重新加载。

> 如：// webpack.config.jsentry: {    app: './app.js',    lib: ['lib-a', 'lib-b', 'lib-c']}// index.html<script src="dist/lib.js"></script><script src="dist/app.js"></script>

#### 6.2 CommonsChunkPlugin

CommonsChunkPlugin是Webpack 4之前内部自带的插件（Webpack 4之后替换为了SplitChunks）。

> 它可以将多个Chunk中公共的部分提取出来。公共模块的提取可以为项目带来几个收益：

> ·开发过程中减少了重复模块打包，可以提升开发速度；·减小整体资源体积；·合理分片后的代码可以更有效地利用客户端缓存。

> const webpack = require('webpack');module.exports = {    entry: {        foo: './foo.js',        bar: './bar.js',    },    output: {        filename: '[name].js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({            name: 'commons',            filename: 'commons.js',        })    ],}；

> 这里我们使用了两个配置项。

> ·name：用于指定公共chunk的名字。·filename：提取后的资源文件名。


> [插图]图6-2　提取公共模块后的打包结果

> 最后，记得在页面中添加一个script标签来引入commons.js，并且注意，该JS一定要在其他JS之前引入。

##### 6.2.1 提取vendor

> 虽然CommonsChunkPlugin主要用于提取多入口之间的公共模块，但这不代表对于单入口的应用就无法使用。

> 我们仍然可以用它来提取第三方类库及业务中不常更新的模块，只需要单独为它们创建一个入口即可。

> // webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: {        app: './app.js',        vendor: ['react'],    },    output: {        filename: '[name].js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({

> name: 'vendor',            filename: 'vendor.js',        })    ],};// app.jsimport React from 'react';document.write('app.js', React.version);

> 为了将react从app.js提取出来，我们在配置中加入了一个入口vendor，并使其只包含react，这样就把react变为了app和vendor这两个chunk所共有的模块。

> 在插件内部配置中，我们将name指定为vendor，这样由CommonsChunkPlugin所产生的资源将覆盖原有的由vendor这个入口所产生的资源。


> [插图]图6-3　提取react到vendor.js的结果

##### 6.2.2 设置提取范围

通过CommonsChunkPlugin中的chunks配置项可以规定从哪些入口中提取公共模块，

> // webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: {        a: './a.js',        b: './b.js',        c: './c.js',    },    output: {        filename: '[name].js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({            name: 'commons',            filename: 'commons.js',            chunks: ['a', 'b'],        })    ],};我们在chunks中配置了a和b，这意味着只会从a.js和b.js中提取公共模块。打包结果如图6-4所示。

[插图]图6-4　通过chunks设定提取范围

> 对于一个大型应用来说，拥有几十个页面是很正常的，这也就意味着会有几十个资源入口。这些入口所共享的模块也许会有些差异，在这种情况下，我们可以配置多个CommonsChunkPlugin，并为每个插件规定提取的范围，来更有效地进行提取。

##### 6.2.3 设置提取规则

> CommonsChunkPlugin的默认规则是只要一个模块被两个入口chunk所使用就会被提取出来，比如只要a和b用了react，react就会被提取出来。然而现实情况是，有些时候我们不希望所有的公共模块都被提取出来，比如项目中一些组件或工具模块，虽然被多次引用，但是可能经常修改，如果将其和react这种库放在一起反而不利于客户端缓存。

> 此时我们可以通过CommonsChunkPlugin的minChunks配置项来设置提取的规则。该配置项非常灵活，支持多种输入形式。

> （1）数字minChunks可以接受一个数字，当设置minChunks为n时，只有该模块被n个入口同时引用才会进行提取。另外，这个阈值不会影响通过数组形式入口传入模块的提取。这个听上去不是很好理解，让我们看以下例子：

> // webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: {        foo: './foo.js',        bar: './bar.js',        vendor: ['react'],    },    output: {        filename: '[name].js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({            name: 'vendor',            filename: 'vendor.js',            minChunks: 3,        })    ],};

> 我们令foo.js和bar.js共同引用一个util.js。// foo.jsimport React from 'react';import './util';document.write('foo.js', React.version);// bar.jsimport React from 'react';import './util';document.write('bar.js', React.version);// util.jsconsole.log('util');如果实际打包应该可以发现，由于我们设置minChunks为3，util.js并不会被提取到vendor.js中，然而react并不受这个的影响，仍然会出现在vendor.js中。这就是所说的数组形式入口的模块会照常提取。

> （2）Infinity设置为无穷代表提取的阈值无限高，也就是说所有模块都不会被提取。这个配置项的意义有两个。第一个是和上面的情况类似，即我们只想让Webpack提取特定的几个模块，并将这些模块通过数组型入口传入，这样做的好处是提取哪些模块是完全可控的；另一个是我们指定minChunks为Infinity，为了生成一个没有任何模块而仅仅包含Webpack初始化环境的文件，这个文件我们通常称为manifest。

> （3）函数minChunks支持传入一个函数，它可以让我们更细粒度地控制公共模块。

> Webpack打包过程中的每个模块都会经过这个函数的处理，当函数的返回值是true时进行提取。

> new webpack.optimize.CommonsChunkPlugin({    name: 'verndor',    filename: 'vendor.js',    minChunks: function(module, count) {        // module.context 模块目录路径        if(module.context && module.context.includes('node_modules')) {            return true;        }        // module.resource 包含模块名的完整路径        if(module.resource && module.resource.endsWith('util.js')) {            return true;

> }        // count 为模块被引用的次数        if(count > 5) {            return true;        }    },}),

> 借助上面的配置，我们可以分别提取node_modules目录下的模块、名称为util.js的模块，以及被引用5次（不包含5次）以上的模块。

##### 6.2.4 hash与长效缓存

> 使用CommonsChunkPlugin时，一个绕不开的问题就是hash与长效缓存。当我们使用该插件提取公共模块时，提取后的资源内部不仅仅是模块的代码，往往还包含Webpack的运行时（runtime）。Webpack的运行时指的是初始化环境的代码，如创建模块缓存对象、声明模块加载函数等。

> 在较早期的Webpack版本中，运行时内部也包含模块的id，并且这个id是以数字的方式不断累加的（比如第1个模块id是0，第2个模块id是1）。这会造成一个问题，即模块id的改变会导致运行时内部的代码发生变动，进一步影响chunk

> hash的生成。一般我们会使用chunk hash作为资源的版本号优化客户端的缓存，版本号改变会导致用户频繁地更新资源，即便它们的内容并没有发生变化也会更新。这个问题解决的方案是：将运行时的代码单独提取出来。

> new webpack.optimize.CommonsChunkPlugin({            name: 'manifest',        })

> 上面的配置中，通过添加了一个name为manifest的CommonsChunkPlugin来提取Webpack的运行时。

> [插图]图6-5　提取manifest.js

注意　manifest的CommonsChunkPlugin必须出现在最后，否则Webpack将无法正常提取模块。

> 在我们的页面中，manifest.js应该最先被引入，用来初始化Webpack环境。如：<!-- index.html --><script src="dist/manifest.js"></script><script src="dist/vendor.js"></script><script src="dist/app.js"></script>

> 通过这种方式，app.js中的变化将只会影响manifest.js，而它是一个很小的文件，我们的vendor.js内容及hash都不会变化，因此可以被用户所缓存。

##### 6.2.5 CommonsChunkPlugin的不足

在提取公共模块方面，CommonsChunkPlugin可以满足很多场景的需求，但是它也有一些欠缺的地方。1）一个CommonsChunkPlugin只能提取一个vendor，假如我们想提取多个vendor则需要配置多个插件，这会增加很多重复的配置代码

> 。2）前面我们提到的manifest实际上会使浏览器多加载一个资源，这对于页面渲染速度是不友好的。3）由于内部设计上的一些缺陷，CommonsChunkPlugin在提取公共模块的时候会破坏掉原有Chunk中模块的依赖关系，导致难以进行更多的优化。比如在异步Chunk的场景下CommonsChunkPlugin并不会按照我们的预期正常工作。比如下面的例子：

> // webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: './foo.js',    output: {        filename: 'foo.js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({            name: 'commons',            filename: 'commons.js',        })    ],};// foo.jsimport React from 'react';import('./bar.js');document.write('foo.js', React.version);// bar.jsimport React from 'react';document.write('bar.js', React.version);打包结果如图6-6所示。

[插图]图6-6　commons.js并没有提取react

> 关于异步加载的部分本章后面会讲到，因此这里的细节可以不必过于在意。这个例子只是为了体现CommonsChunkPlugin的缺陷。从结果可以看出，react仍然在foo.js中，并没有按照我们的预期被提取到commons.js里。

#### 6.3 optimization.SplitChunks

> optimization.SplitChunks（简称SplitChunks）是Webpack 4为了改进CommonsChunk-Plugin而重新设计和实现的代码分片特性。

> 它不仅比CommonsChunkPlugin功能更加强大，还更简单易用。

> 比如我们前面异步加载的例子，在换成Webpack 4的SplitChunks之后，就可以自动提取出react了。

> optimization: {        splitChunks: {            chunks: 'all',        },    },

> // foo.jsimport React from 'react';import('./bar.js');document.write('foo.js', React.version);// bar.jsimport React from 'react';console.log('bar.js', React.version);

> 此处Webpack 4的配置与之前相比有两点不同：·使用optimization.splitChunks替代了CommonsChunkPlugin，并指定了chunks的值为all，这个配置项的含义是，SplitChunks将会对所有的chunks生效（默认情况下，SplitChunks只对异步chunks生效，并且不需要配置）。

> 打包结果如图6-7所示。

[插图]图6-7　react被提取到单独的chunk中原本我们打包的结果应该是foo.js及0.foo.js（异步加载bar.js的结果，后面会介绍），但是由于SplitChunks的存在，又生成了一个vendors~main.foo.js，并且把react提取到了里面。

##### 6.3.1 从命令式到声明式

> 以下是SplitChunks默认情形下的提取条件：·提取后的chunk可被共享或者来自node_modules目录。这一条很容易理解，被多次引用或处于node_modules中的模块更倾向于是通用模块，比较适合被提取出来。·提取后的Javascript chunk体积大于30kB（压缩和gzip之前），CSS chunk体积大于50kB。这个也比较容易理解，如果提取后的资源体积太小，那么带来的优化效果也比较一般。·在按需加载过程中，并行请求的资源最大值小于等于5。按需加载指的是，通过动态插入script标签的方式加载脚本。我们一般不希望同时加载过多的资源，因为每一个请求都要花费建立链接和释放链接的成本，因此提取的规则只在并行请求不多的时候生效。

> ·在首次加载时，并行请求的资源数最大值小于等于3。和上一条类似，只不过在页面首次加载时往往对性能的要求更高，因此这里的默认阈值也更低。

> 通过前面的例子我们可以进一步解释这些条件。在从foo.js和bar.js提取react前，会对这些条件一一进行验证，只有满足了所有条件之后react才会被提取出来。下面我们进行一下比对：·react属于node_modules目录下的模块。·react的体积大于30kB。·按需加载时的并行请求数量为1，为0.foo.js。·首次加载时的并行请求数量为2，为foo.js和vendors-main.foo.js。之所以vendors-main.foo.js不算在第3条是因为它需要被添加在HTML的script标签中，在页面初始化的时候就会进行加载。

##### 6.3.2 默认的异步提取

> 实际上SplitChunks不需要配置也能生效，但仅仅针对异步资源。

##### 6.3.3 配置

> 为了更好地了解SplitChunks是怎样工作的，我们来看一下它的默认配置。

> splitChunks: {    chunks: "async",    minSize: {      javascript: 30000,      style: 50000,    },    maxSize: 0,    minChunks: 1,    maxAsyncRequests: 5,    maxInitialRequests: 3,    automaticNameDelimiter: '~',    name: true,    cacheGroups: {        vendors: {            test: /[\\/]node_modules[\\/]/,            priority: -10,        },        default: {            minChunks: 2,            priority: -20,            reuseExistingChunk: true,        },    },},（1）匹配模式通过chunks我们可以配置SplitChunks的工作模式。它有3个可选值，分别为async（默认）、initial和all。async即只提取异步chunk，initial则只对入口chunk生效（如果配置了initial则上面异步的例子将失效），all则是两种模式同时开启。

> （2）匹配条件minSize、minChunks、maxAsyncRequests、maxInitialRequests都属于匹配条件，前文已经介绍过了，不赘述。

> （3）命名配置项name默认为true，它意味着SplitChunks可以根据cacheGroups和作用范围自动为新生成的chunk命名，并以automaticNameDelimiter分隔。如vendors~a~b~c.js意思是cacheGroups为vendors，并且该chunk是由a、b、c三个入口chunk所产生的。（4）cacheGroups

> 可以理解成分离chunks时的规则。默认情况下有两种规则——vendors和default。vendors用于提取所有node_modules中符合条件的模块，default则作用于被多次引用的模块。

> 我们可以对这些规则进行增加或者修改，如果想要禁用某种规则，也可以直接将其置为false。当一个模块同时符合多个cacheGroups时，则根据其中的priority配置项确定优先级。

#### 6.4 资源异步加载

资源异步加载主要解决的问题是，当模块数量过多、资源体积过大时，可以把一些暂时使用不到的模块延迟加载。这样使页面初次渲染的时候用户下载的资源尽可能小，后续的模块等到恰当的时机再去触发加载。因此一般也把这种方法叫作按需加载。

##### 6.4.1 import()

在Webpack中有两种异步加载的方式——import函数及require.ensure。require.ensure是Webpack 1支持的异步加载方式，从Webpack 2开始引入了import函数，并且官方也更推荐使用它，因此我们这里只介绍import函数。与正常ES6中的import语法不同，通过import函数加载的模块及其依赖会被异步地进行加载，并返回一个Promise对象。

> // foo.jsimport('./bar.js').then(({ add }) => {    console.log(add(2, 3));});// bar.jsexport function add(a, b) {    return a + b;}

> 这里还需要我们更改一下Webpack的配置。module.exports = {    entry: {        foo: './foo.js'    },    output: {        publicPath: '/dist/',        filename: '[name].js',    },    mode: 'development',    devServer: {        publicPath: '/dist/',        port: 3000,    },};

> 在第3章中资源输出配置的部分我们讲过，首屏加载的JS资源地址是通过页面中的script标签来指定的，而间接资源（通过首屏JS再进一步加载的JS）的位置则要通过output.publicPath来指定。

> 上面我们的import函数相当于使bar.js成为了一个间接资源，我们需要配置publicPath来告诉Webpack去哪里获取它。

> import函数还有一个比较重要的特性。ES6 Module中要求import必须出现在代码的顶层作用域，而Webpack的import函数则可以在任何我们希望的时候调用。

> 如：

> if (condition) {    import('./a.js').then(a => {        console.log(a);    });} else {    import('./b.js').then(b => {        console.log(b);    });}

> 这种异步加载方式可以赋予应用很强的动态特性，它经常被用来在用户切换到某些特定路由时去渲染相应组件，这样分离之后首屏加载的资源就会小很多。

##### 6.4.2 异步chunk的配置

> // webpack.config.jsmodule.exports = {    entry: {        foo: './foo.js',    },    output: {        publicPath: '/dist/',        filename: '[name].js',        chunkFilename: '[name].js',    },    mode: 'development',};// foo.jsimport(/* webpackChunkName: "bar" */ './bar.js').then(({ add }) => {    console.log(add(2, 3));});

> 可以看到，我们在Webpack的配置中添加了output.chunkFilename，用来指定异步chunk的文件名。其命名规则与output.filename基本一致，不过由于异步chunk默认没有名字，其默认值是[id].js，这也是为什么我们在例子中看到的是0.js。如果有更多的异步chunk，则会依次产生1.js、2.js等。

### 第7章 生产环境配置

> 在生产环境中我们关注的是如何让用户更快地加载资源，涉及如何压缩资源、如何添加环境变量优化打包、如何最大限度地利用缓存等。

> 本章将会包含以下内容：·环境变量的使用；·source map机制与策略；·资源压缩；

> ·优化hash与缓存；·动态HTML。

#### 7.1 环境配置的封装

> 如何让Webpack可以按照不同环境采用不同的配置呢？一般来说有以下两种方式。1）使用相同的配置文件。

> 比如令Webpack不管在什么环境下打包都使用webpack.config.js，只是在构建开始前将当前所属环境作为一个变量传进去

> 2）为不同环境创建各自的配置文件。

> {  ...  "scripts": {    "dev": " webpack-dev-server --config=webpack.development.config.js",    "build": " webpack --config=webpack.production.config.js"  },}上面我们通过--config指定打包时使用的配置文件。但这种方法存在一个问题，即webpack.development.config.js和webpack.production.config.js肯定会有重复的部分，一改都要改，不利于维护。在这种情况下，可以将公共的配置提取出来，比如我们单独创建一个webpack.common.config.js。module.exports = {  entry: './src/index.js',  // development 和 production共有配置};

> 然后让另外两个JS分别引用该文件，并添加上自身环境的配置即可。除此之外，也可以使用9.1.2节介绍的webpack-merge，

#### 7.2 开启production模式

> 以至于Webpack 4中直接加了一个mode配置项，让开发者可以通过它来直接切换打包模式。如：// webpack.config.jsmodule.exports = {    mode: 'production',};

> 这意味着当前处于生产环境模式，Webpack会自动添加许多适用于生产环境的配置项，减少了人为手动的工作。

> Webpack这样做其实是希望隐藏许多具体配置的细节，而将其转化为更具有语义性、更简洁的配置提供出来。从Webpack 4开始我们已经能看到它的配置文件不应该越写越多，而是应该越写越少。大部分时候仅仅设置mode是不够的，下面我们继续介绍其他与生产环境相关的自定义配置。

#### 7.3 环境变量

> 通常我们需要为生产环境和本地环境添加不同的环境变量，在Webpack中可以使用DefinePlugin进行设置。

> // webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: './app.js',    output: {        filename: 'bundle.js',    },    mode: 'production',    plugins: [        new webpack.DefinePlugin({            ENV: JSON.stringify('production'),        })    ],};// app.jsdocument.write(ENV);

> 上面的配置通过DefinePlugin设置了ENV环境变量，最终页面上输出的将会是字符串production。

> 除了字符串类型的值以外，我们也可以设置其他类型的环境变量。new webpack.DefinePlugin({    ENV: JSON.stringify('production'),    IS_PRODUCTION: true,    ENV_ID: 130912098,    CONSTANTS: JSON.stringify({        TYPES: ['foo', 'bar']    })})

> 注意　我们在一些值的外面加上了JSON.stringify，这是因为DefinePlugin在替换环境变量时对于字符串类型的值进行的是完全替换。假如不添加JSON.stringify的话，在替换后就会成为变量名，而非字符串值。因此对于字符串环境变量及包含字符串的对象都要加上JSON.stringify才行。

> 许多框架与库都采用process.env.NODE_ENV作为一个区别开发环境和生产环境的变量。process.env是Node.js用于存放当前进程环境变量的对象；而NODE_ENV则可以让开发者指定当前的运行时环境，当它的值为production时即代表当前为生产环境，库和框架在打包时如果发现了它就可以去掉一些开发环境的代码，如警告信息和日志等。这将有助于提升代码运行速度和减小资源体积。具体配置如下：new webpack.DefinePlugin({    process.env.NODE_ENV: 'production',})

> 如果启用了mode：production，则Webapck已经设置好了process.env.NODE_ENV，不需要再人为添加了。

#### 7.4 source map

source map指的是将编译、打包、压缩后的代码映射回源代码的过程。

> 经过Webpack打包压缩后的代码基本上已经不具备可读性，此时若代码抛出了一个错误，要想回溯它的调用栈是非常困难的。而有了source map，再加上浏览器调试工具（dev tools），要做到这一点就非常容易了。同时它对于线上问题的追查也有一定帮助。

##### 7.4.1 原理

> 文件默认就是打包后的文件名加上.map，如bundle.js.map。

> 在生成mapping文件的同时，bundle文件中会追加上一句注释来标识map文件的位置。如：// bundle.js(function() {  // bundle 的内容})();/##/# sourceMappingURL=bundle.js.map

> 当我们打开了浏览器的开发者工具时，map文件会同时被加载，这时浏览器会使用它来对打包后的bundle文件进行解析，分析出源代码的目录结构和内容。



> JavaScript的source map的配置很简单，只要在webpack.config.js中添加devtool即可。module.exports = {    // ...    devtool: 'source-map',};对于CSS、SCSS、Less来说，则需要添加额外的source map配置项。如下面例子所示：const path = require('path');module.exports = {    // ...    devtool: 'source-map',    module: {        rules: [            {                test: /\.scss$/,                use: [                    'style-loader',                    {                        loader: 'css-loader',                        options: {                            sourceMap: true,                        },                    }, {                        loader: 'sass-loader',                        options: {                            sourceMap: true,                        },                    }                ] ,            }        ],    },}；

> 开启source map之后，打开Chrome的开发者工具，在“Sources”选项卡下面的“webpack：//”目录中可以找到解析后的工程源码，如图7-1所示

> Webpack支持多种source map的形式。除了配置为devtool：'source-map'以外，还可以根据不同的需求选择cheap-source-map、eval-source-map等。通常它们都是source map的一些简略版本，因为生成完整的source map会延长整体构建时间，如果对打包速度需求比较高的话，建议选择一个简化版的source map。比如，在开发环境中，cheap-module-eval-source-map通常是一个不错的选择，属于打包速度和源码信息还原程度的一个良好折中。

> 在生产环境中由于我们会对代码进行压缩，

> 没有那么多选择，我们只能使用source-map、hidden-source-map、nosources-source-map这3者之一。下面介绍一下这3种source map在安全性方面的不同。

##### 7.4.3 安全

> 有了source map也就意味着任何人通过浏览器的开发者工具都可以看到工程源码，对于安全性来说也是极大的隐患。那么如何才能在保持其功能的同时，防止暴露源码给用户呢？Webpack提供了hidden-source-map及nosources-source-map两种策略来提升source map的安全性。

> hidden-source-map意味着Webpack仍然会产出完整的map文件，只不过不会在bundle文件中添加对于map文件的引用。这样一来，当打开浏览器的开发者工具时，我们是看不到map文件的，浏览器自然也无法对bundle进行解析。如果我们想要追溯源码，则要利用一些第三方服务，将map文件上传到那上面。目前最流行的解决方案是Sentry。

> S

> entry是一个错误跟踪平台，开发者接入后可以进行错误的收集和聚类，以便于更好地发现和解决线上问题。Sentry支持JavaScript的source map，我们可以通过它所提供的命令行工具或者Webpack插件来自动上传map文件。同时我们还要在工程代码中添加Sentry对应的工具包，每当JavaScript执行出错时就会上报给Sentry。

> Sentry在接收到错误后，就会去找对应的map文件进行源码解析，并给出源码中的错误栈。

> 另一种配置是nosources-source-map，它对于安全性的保护则没那么强，但是使用方式相对简单。打包部署之后，我们可以在浏览器开发者工具的Sources选项卡中看到源码的目录结构，但是文件的具体内容会被隐藏起来。对于错误来说，我们仍然可以在Console控制台中查看源代码的错误栈，或者console日志的准确行数。它对于追溯错误来说基本足够，并且其安全性相对于可以看到整个源码的source-map配置来说要略高一些。

> 在所有这些配置之外还有一种选择，就是我们可以正常打包出source map，然后通过服务器的nginx设置（或其他类似工具）将.map文件只对固定的白名单（比如公司内网）开放，这样我们仍然能看到源码，而在一般用户的浏览器中就无法获取到它们了。

#### 7.5 资源压缩

> 在将资源发布到线上环境前，我们通常都会进行代码压缩，或者叫uglify，意思是移除多余的空格、换行及执行不到的代码，缩短变量名，在执行结果不变的前提下将代码替换为更短的形式。一般正常的代码在uglify之后整体体积都将会显著缩小。同时，uglify之后的代码将基本上不可读，在一定程度上提升了代码的安全性。

##### 7.5.1 压缩JavaScript

> 压缩JavaScript大多数时候使用的工具有两个，一个是UglifyJS（Webpack 3已集成），另一个是terser（Webpack 4已集成）。后者由于支持ES6+代码的压缩，更加面向于未来，因此官方在Webpack 4中默认使用了terser的插件terser-webpack-plugin。

> 在Webpack 3中的话，开启压缩需调用webpack.optimize.UglifyJsPlugin。如下面例子所示：// Webpack version < 4const webpack = require('webpack');module.exports = {    entry: './app.js',    output: {        filename: 'bundle.js',    },    plugins: [new webpack.optimize.UglifyJsPlugin()],};从Webpack 4之后，这项配置被移到了config.optimization.minimize。下面是Webpack 4的示例（如果开启了mode：production，则不需要人为设置）：module.exports = {    entry: './app.js',    output: {        filename: 'bundle.js',    },    optimization: {        minimize: true,    },};

> terser-webpack-plugin插件支持自定义配置。表7-1列出了其中一些常用配置。表7-1　常用自定义配置[插图]


> 下面的例子展示了如何自定义terser-webpack-plugin插件配置。const TerserPlugin = require('terser-webpack-plugin');module.exports = {    //...    optimization: {        // 覆盖默认的 minimizer        minimizer: [            new TerserPlugin({                /* your config */                test: /\.js(\?.*)?$/i,                exclude: /\/excludes/,            })        ],    },};

##### 7.5.2 压缩CSS

> 压缩CSS文件的前提是使用extract-text-webpack-plugin或mini-css-extract-plugin将样式提取出来，接着使用optimize-css-assets-webpack-plugin来进行压缩，这个插件本质上使用的是压缩器cssnano，当然我们也可以通过其配置进行切换。

> 具体请看下面的例子：const ExtractTextPlugin = require('extract-text-webpack-plugin');const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');module.exports = {    // ...    module: {        rules: [            {                test: /\.css$/,                use: ExtractTextPlugin.extract({                    fallback: 'style-loader',                    use: 'css-loader',                }),            }        ],    },    plugins: [new ExtractTextPlugin('style.css')],    optimization: {        minimizer: [new OptimizeCSSAssetsPlugin({            // 生效范围，只压缩匹配到的资源            assetNameRegExp: /\.optimize\.css$/g,            // 压缩处理器，默认为 cssnano            cssProcessor: require('cssnano'),            // 压缩处理器的配置            cssProcessorOptions: { discardComments: { removeAll: true } },            // 是否展示 log            canPrint: true,        })],    },};

#### 7.6 缓存

> 缓存是指重复利用浏览器已经获取过的资源。合理地使用缓存是提升客户端性能的一个关键因素。具体的缓存策略（如指定缓存时间等）由服务器来决定，浏览器会在资源过期前一直使用本地缓存进行响应。

> 这同时也带来一个问题，假如开发者想要对代码进行了一个bug fix，并希望立即更新到所有用户的浏览器上，而不要让他们使用旧的缓存资源应该怎么做？此时最好的办法是更改资源的URL，这样可迫使所有客户端都去下载最新的资源。

##### 7.6.1 资源hash

> 我们通常使用chunkhash来作为文件版本号，因为它会为每一个chunk单独计算一个hash。

> 请看下面的例子：module.exports = {    entry: './app.js',    output: {        filename: 'bundle@[chunkhash].js',    },    mode: 'production',};

> 打包结果如图7-2所示。

[插图]图7-2　使用chunkhash作为版本号

##### 7.6.2 输出动态HTML

> 接下来我们面临的问题是，资源名的改变也就意味着HTML中的引用路径的改变。每次更改后都要手动地去维护它是很困难的，理想的情况是在打包结束后自动把最新的资源名同步过去。使用html-webpack-plugin可以帮我们做到这一点。请看下面的例子：

> const HtmlWebpackPlugin = require('html-webpack-plugin');module.exports = {    // ...    plugins: [        new HtmlWebpackPlugin()    ],};

> html-webpack-plugin还支持更多的个性化配置，具体请参阅其官方文档https://github.com/jantimon/html-webpack-plugin，这里不一一详述。

##### 7.6.3 使chunk id更稳定

> 理想状态下，对于缓存的应用是尽量让用户在启动时只更新代码变化的部分，而对没有变化的部分使用缓存。

> 我们之前介绍过使用CommonsChunkPlugin和SplitChunksPlugin来划分代码。

> 通过它们来尽可能地将一些不常变动的代码单独提取出来，与经常迭代的业务代码区别开，这些资源就可以在客户端一直使用缓存。

> 然而，如果你使用的是Webpack 3或者以下的版本，在使用CommonsChunkPlugin时要注意vendor chunk hash变动的问题，它有可能影响缓存的正常使用。请看下面的例子：// app.jsimport React from 'react';document.write('app.js');// webpack.config.jsconst webpack = require('webpack');module.exports = {    entry: {        app: './app.js',        vendor: ['react'],    },    output: {        filename: '[name]@[chunkhash].js',    },    plugins: [        new webpack.optimize.CommonsChunkPlugin({            name: 'vendor',        })    ],};此时我们的打包结果如图7-4所示。


[插图]图7-4　vendor chunk hash为db8cd17169e747e1b537接下来我们创建一个util.js，并在app.js里面引用它。// util.jsconsole.log('util.js');// app.jsimport React from 'react';import './util';document.write('app.js');此时如果我们进行打包，预期的结果应该是app.js的chunk hash发生变化，而vendor.js的则保持不变。然而打包结果如图7-5所示。


[插图]图7-5　vendor chunk hash为6b014379c28917a6630f上面的结果中vendor.js的chunk hash也发生了变化，这将会导致客户端重新下载整个资源文件。产生这种现象的原因在于Webpack为每个模块指定的id是按数字递增的，当有新的模块插入进来时就会导致其他模块的id也发生变化，进而影响了vendor chunk中的内容。

> 解决的方法在于更改模块id的生成方式。在Webpack 3内部自带了HashedModuleIds-Plugin，它可以为每个模块按照其所在路径生成一个字符串类型的hash id。稍稍更改一下之前的配置就可以解决。plugins: [    new webpack.HashedModuleIdsPlugin(),    new webpack.optimize.CommonsChunkPlugin({        name: 'vendor',    })]

> 对于Webpack 3以下的版本，由于其不支持字符串类型的模块id，可以使用另一个由社区提供的兼容性插件webpack-hashed-module-id-plugin，可以起到一样的效果。从Webpack 4以后已经修改了模块id的生成机制，也就不再有该问题了。

#### 7.7 bundle体积监控和分析

> 为了保证良好的用户体验，我们可以对打包输出的bundle体积进行持续的监控，以防止不必要的冗余模块被添加进来。

> VS Code中有一个插件Import Cost可以帮助我们对引入模块的大小进行实时监测。每当我们在代码中引入一个新的模块（主要是node_modules中的模块）时，它都会为我们计算该模块压缩后及gzip过后将占多大体积，如图7-6所示。[插图]

> 图7-6　通过Import Cost计算出引入模块的体积

> 当我们发现某些包过大时就可以采取一些措施，比如寻找一些更小的替代方案或者只引用其中的某些子模块，如图7-7所示。

[插图]图7-7　通过引用子模块来减小体积

> 另外一个很有用的工具是webpack-bundle-analyzer，它能够帮助我们分析一个bundle的构成。使用方法也很简单，只要将其添加进plugins配置即可。

> const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;module.exports = {    // ...    plugins: [        new Analyzer()    ],};

> 它可以帮我们生成一张bundle的模块组成结构图，每个模块所占的体积一目了然，如图7-8所示。

[插图]图7-8　使用webpack-bundle-analyzer分析bundle构成

> 最后我们还需要自动化地对资源体积进行监控，bundlesize这个工具包可以帮助做到这一点。安装之后只需要在package.json进行一下配置即可。{  "name": "my-app",  "version": "1.0.0",  "bundlesize": [    {      "path": "./bundle.js",      "maxSize": "50 kB"    }  ],  "scripts": {    "test:size": "bundlesize"  }}通过npm脚本可以执行bundlesize命令，它会根据我们配置的资源路径和最大体积验证最终的bundle是否超限。我们也可以将其作为自动化测试的一部分，来保证输出的资源如果超限了不会在不知情的情况下就被发布出去。

#### 7.8 本章小结

> 开发环境中我们可能关注的是打包速度，而在生产环境中我们关注的则是输出的资源体积以及如何优化客户端缓存来缩短页面渲染时间。

### 第8章 打包优化

> 目的是让打包的速度更快，输出的资源更小。首先重述一条软件工程领域的经验——不要过早优化，在项目的初期不要看到任何优化点就拿来加到项目中，这样不但增加了复杂度，优化的效果也不会太理想。一般是当项目发展到一定规模后，性能问题随之而来，这时再去分析然后对症下药，才有可能达到理想的优化效果。

> 本章将会包含以下内容：·多线程打包与HappyPack；·缩小打包作用域；·动态链接库思想与DllPlugin；·死代码检测与tree shaking。

####  8.1 HappyPack

#####  8.1.1 工作原理

> 我们可以简单地将代码转译的工作流程概括如下：1）从配置中获取打包入口；2）匹配loader规则，并对入口模块进行转译；3）对转译后的模块进行依赖查找（如a.js中加载了b.js和c.js）；4）对新找到的模块重复进行步骤2）和步骤3），直到没有新的依赖模块。


> HappyPack适用于那些转译任务比较重的工程，当我们把类似babel-loader和ts-loader迁移到HappyPack之上后，一般都可以收到不错的效果，而对于其他的如sass-loader、less-loader本身消耗时间并不太多的工程则效果一般。

##### 8.1.2 单个loader的优化

> // 使用HappyPack的配置const HappyPack = require('happypack');module.exports = {  //...  module: {    rules: [      {        test: /\.js$/,        exclude: /node_modules/,        loader: 'happypack/loader',      }    ],  },  plugins: [    new HappyPack({      loaders: [        {          loader: 'babel-loader',          options: {            presets: ['react'],          },        }      ],    })  ],};

> 在module.rules中，我们使用happypack/loader替换了原有的babel-loader，并在plugins中添加了HappyPack的插件，将原有的babel-loader连同它的配置插入进去即可。

##### 8.1.3 多个loader的优化

> 在使用HappyPack优化多个loader时，需要为每一个loader配置一个id，否则HappyPack无法知道rules与plugins如何一一对应。

```js
const HappyPack = require('happypack');
module.exports = {
  /...
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=js',
    }, {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'happypack/loader?id=ts',
    }],
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: [{
        loader: 'babel-loader',
        options: {}, // babel options
      }],
    }),
    new HappyPack({
      id: 'ts',
      loaders: [{
        loader: 'ts-loader',
        options: {}, // ts options
      }],
    })
  ]
};
```

> 同时我们也可以为每个插件设置具体不同的配置项，如使用的线程数、是否开启debug模式等。

#### 8.2 缩小打包作用域

> 从宏观角度来看，提升性能的方法无非两种：增加资源或者缩小范围。增加资源就是指使用更多CPU和内存，用更多的计算能力来缩短执行任务的时间；缩小范围则是针对任务本身，比如去掉冗余的流程，尽量不做重复性的工作等。前面我们说的HappyPack属于增加资源，那么接下来我们再谈谈如何缩小范围。

##### 8.2.1 exclude和include

> 在第4章我们介绍过exclude和include，在配置loader的时候一般都会加上它们。对于JS来说，一般要把node_modules目录排除掉，另外当exclude和include规则有重叠的部分时，exclude的优先级更高。下面的例子使用include使babel-loader只生效于源码目录。module: {  rules: [    {      test: /\.js$/,      include: /src\/scripts/,      loader: 'babel-loader,    }  ],},

##### 8.2.2 noParse

有些库我们是希望Webpack完全不要去进行解析的，即不希望应用任何loader规则，库的内部也不会有对其他模块的依赖，那么这时可以使用noParse对其进行忽略。

> 请看下面的例子：module.exports = {  //...  module: {    noParse: /lodash/,  }};

> 上面的配置将会忽略所有文件名中包含lodash的模块，这些模块仍然会被打包进资源文件，只不过Webpack不会对其进行任何解析。

> 在Webpack 3及之后的版本还支持完整的路径匹配。如：module.exports = {  //...  module: {    noParse: function(fullPath) {      // fullPath是绝对路径，如： /Users/me/app/webpack-no-parse/lib/lodash.js      return /lib/.test(fullPath);    },  }};上面的配置将会忽略所有lib目录下的资源解析。

##### 8.2.3 IgnorePlugin

> exclude和include是确定loader的规则范围，noParse是不去解析但仍会打包到bundle中。最后让我们再看一个插件IgnorePlugin，它可以完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中。

> 这对于排除一些库相关文件非常有用。一些由库产生的额外资源我们用不到但又无法去掉，因为引用的语句处于库文件的内部。比如，Moment.js是一个日期时间处理相关的库，为了做本地化它会加载很多语言包，对于我们来说一般用不到其他地区的语言包，但它们会占很多体积，这时就可以用IgnorePlugin来去掉。plugins: [  new webpack.IgnorePlugin({    resourceRegExp: /^\.\/locale$/, // 匹配资源文件    contextRegExp: /moment$/, // 匹配检索目录  })],

##### 8.2.4 Cache

> 有些loader会有一个cache配置项，用来在编译代码后同时保存一份缓存，在执行下一次编译前会先检查源码文件是否有变化，如果没有就直接采用缓存，也就是上次编译的结果。这样相当于实际编译的只有变化了的文件，整体速度上会有一定提升。在Webpack 5中添加了一个新的配置项“cache：{type："filesystem"}”，它会在全局启用一个文件缓存。要注意的是，该特性目前仅仅是实验阶段，并且无法自动检测到缓存已经过期。

> 比如我们更新了babel-loader及一些相关配置，但是由于JS源码没有发生变化，重新打包后还会是上一次的结果。目前的解决办法就是，当我们更新了任何node_modules中的模块或者Webpack的配置后，手动修改cache.version来让缓存过期。同时官方也给出了声明说，未来会优化这一块，尽量可以自动检测缓存是否过期。

#### 8.3 动态链接库与DllPlugin

> 动态链接库是早期Windows系统由于受限于当时计算机内存空间较小的问题而出现的一种内存优化方法。当一段相同的子程序被多个程序调用时，为了减少内存消耗，可以将这段子程序存储为一个可执行文件，当被多个程序调用时只在内存中生成和使用同一个实例。

> DllPlugin借鉴了动态链接库的这种思路，对于第三方模块或者一些不常变化的模块，可以将它们预先编译和打包，然后在项目实际构建过程中直接取用即可

> 。当然，通过DllPlugin实际生成的还是JS文件而不是动态链接库，取这个名字只是由于方法类似罢了

> 。在打包vendor的时候还会附加生成一份vendor的模块清单，这份清单将会在工程业务模块打包时起到链接和索引的作用。

> DllPlugin和Code Splitting有点类似，都可以用来提取公共模块，但本质上有一些区别。Code Splitting的思路是设置一些特定的规则并在打包的过程中根据这些规则提取模块；DllPlugin则是将vendor完全拆出来，有自己的一整套Webpack配置并独立打包，在实际工程构建时就不用再对它进行任何处理，直接取用即可。因此，理论上来说，DllPlugin会比Code Splitting在打包速度上更胜一筹，但也相应地增加了配置，以及资源管理的复杂度。

##### 8.3.1 vendor配置

> 首先需要为动态链接库单独创建一个Webpack配置文件，比如命名为webpack.vendor.config.js，用来区别工程本身的配置文件webpack.config.js。请看下面的例子：

> // webpack.vendor.config.jsconst path = require('path');const webpack = require('webpack');const dllAssetPath = path.join(__dirname, 'dll');const dllLibraryName = 'dllExample';module.exports = {  entry: ['react'],  output: {    path: dllAssetPath,    filename: 'vendor.js',    library: dllLibraryName,  },  plugins: [

> new webpack.DllPlugin({      name: dllLibraryName,      path: path.join(dllAssetPath, 'manifest.json'),    })  ],};

> 配置中的entry指定了把哪些模块打包为vendor。plugins的部分我们引入了Dll-Plugin，并添加了以下配置项。·name：导出的dll library的名字，它需要与output.library的值对应。·path：资源清单的绝对路径，业务代码打包时将会使用这个清单进行模块索引。

##### 8.3.2 vendor打包

接下来我们就要打包vendor并生成资源清单了。为了后续运行方便，可以在package.json中配置一条npm script，如下所示：// package.json{  ...  "scripts": {    "dll": "webpack --config webpack.vendor.config.js"  },}

> 运行npm run dll后会生成一个dll目录，里面有两个文件vendor.js和manifest.json，前者包含了库的代码，后者则是资源清单。

> 可以预览一下生成的vendor.js，它以一个立即执行函数表达式的声明开始。var dllExample = (function(params) {   // ...})(params);上面的dllExample正是我们在webpack.vendor.config.js中指定的dllLibraryName。

> 接着打开manifest.json，其大体内容如下：{  "name": "dllExample",  "content": {    "./node_modules/fbjs/lib/invariant.js": {      "id": 0,      "buildMeta": { "providedExports": true }    },    ...  }}manifest.json中有一个name字段，这是我们通过DllPlugin中的name配置项指定的。

##### 8.3.3 链接到业务代码

> 将vendor链接到项目中很简单，这里我们将使用与DllPlugin配套的插件DllReferencePlugin，它起到一个索引和链接的作用。在工程的webpack配置文件（webpack.config.js）中，通过DllReferencePlugin来获取刚刚打包好的资源清单，然后在页面中添加vendor.js的引用就可以了。

> // webpack.config.jsconst path = require('path');const webpack = require('webpack');module.exports = {  // ...  plugins: [    new webpack.DllReferencePlugin({      manifest: require(path.join(__dirname, 'dll/manifest.json')),

> })  ]};// index.html<body>  <!-- ... -->  <script src="dll/vendor.js"></script>  <script src="dist/app.js"></script></body>

> 当页面执行到vendor.js时，会声明dllExample全局变量。而manifest相当于我们注入app.js的资源地图，app.js会先通过name字段找到名为dllExample的library，再进一步获取其内部模块。这就是我们在webpack.vendor.config.js中给DllPlugin的name和output.library赋相同值的原因。如果页面报“变量dllExample不存在”的错误，那么有可能就是没有指定正确的output.library，或者忘记了在业务代码前加载vendor.js。

##### 8.3.4 潜在问题

目前我们的配置还存在一个潜在的问题。当我们打开manifest.json后，可以发现每个模块都有一个id，其值是按照数字顺序递增的。业务代码在引用vendor中模块的时候也是引用的这个数字id。当我们更改vendor时这个数字id也会随之发生变化。假设我们的工程中目前有以下资源文件，并为每个资源都加上了chunk hash。·vendor@[hash].js（通过DllPlugin构建）·page1@[hash].js·page2@[hash].js·util@[hash].js现在vendor中有一些模块，不妨假定其中包含了react，其id是5。当尝试添加更多的模块到vendor中（比如util.js使用了moment.js，我们希望moment.js也通过DllPlugin打包）时，那么重新进行Dll构建时moment.js有可能会出现在react之前，此时react的id就变为了6。page1.js和page2.js是通过id进行引用的，因此它们的文件内容也相应发生了改变。此时我们可能会面临以下两种情况：·page1.js和page2.js的chunk hash均发生了改变。这是我们不希望看到的，因为它们内容本身并没有改变，而现在vendor的变化却使得用户必须重新下载所有资源。·page1.js和page.js的chunk hash没有改变。这种情况大多发生在较

> 老版本的Webpack中，并且比第1种情况更为糟糕。因为vendor中的模块id改变了，而用户却由于没有更新缓存而继续使用过去版本的page1.js和page2.js，也就引用不到新的vendor模块而导致页面错误。对于开发者来说，这个问题很难排查，因为在开发环境下一切都是正常的，只有在生产环境会看到页面崩溃。

> 这个问题的根源在于，当我们对vendor进行操作时，本来vendor中不应该受到影响的模块却改变了它们的id。解决这个问题的方法很简单，在打包vendor时添加上HashedModuleIdsPlugin。请看下面的例子：// webpack.vendor.config.jsmodule.exports = {  // ...  plugins: [    new webpack.DllPlugin({      name: dllLibraryName,      path: path.join(dllAssetPath, 'manifest.json'),    }),    new webpack.HashedModuleIdsPlugin(),  ]};

> 这个插件是在Webpack 3中被引入进来的，主要就是为了解决数字id的问题。从Webpack 3开始，模块id不仅可以是数字，也可以是字符串。

> HashedModuleIdsPlugin可以把id的生成算法改为根据模块的引用路径生成一个字符串hash。比如一个模块的id是2NuI（hash值），因为它的引用路径不会因为操作vendor中的其他模块而改变，id将会是统一的，这样就解决了我们前面提到的问题。

#### 8.4 tree shaking

> ES6 Module依赖关系的构建是在代码编译时而非运行时。基于这项特性Webpack提供了tree shaking功能

> ，它可以在打包过程中帮助我们检测工程中没有被引用过的模块，这部分代码将永远无法被执行到，因此也被称为“死代码”。

> tree shaking有时可以使bundle体积显著减小，而实现tree shaking则需要一些前提条件。

##### 8.4.1 ES6 Module

tree shaking只能对ES6 Module生效。

> 有时我们会发现虽然只引用了某个库中的一个接口，却把整个库加载进来了，而bundle的体积并没有因为tree shaking而减小。这可能是由于该库是使用CommonJS的形式导出的，为了获得更好的兼容性，目前大部分的npm包还在使用CommonJS的形式。也有一些npm包同时提供了ES6 Module和CommonJS两种形式导出，我们应该尽可能使用ES6 Module形式的模块，这样tree shaking的效率更高。

##### 8.4.2 使用Webpack进行依赖关系构建

> 如果我们在工程中使用了babel-loader，那么一定要通过配置来禁用它的模块依赖解析。因为如果由babel-loader来做依赖解析，Webpack接收到的就都是转化过的CommonJS形式的模块，无法进行tree-shaking。禁用babel-loader模块依赖解析的配置示例如下：module.exports = {  // ...  module: {    rules: [{      test: /\.js$/,      exclude: /node_modules/,      use: [{        loader: 'babel-loader',        options: {          presets: [            // 这里一定要加上 modules: false            [@babel/preset-env, { modules: false }]          ],        },      }],    }],  },};

##### 8.4.3 使用压缩工具去除死代码

tree shaking本身只是为死代码添加上标记，真正去除死代码是通过压缩工具来进行的。使用我们前面介绍过的terser-webpack-plugin即可。在Webpack 4之后的版本中，将mode设置为production也可以达到相同的效果。

#### 8.5 本章小结

在这一章中，我们介绍了加快打包速度，减小资源体积的一些方法。对于一些对性能要求高的项目来说这些方法可以起到一定的效果。最后需要强调的是，每一种优化策略都有其使用场景，并不是任何一个点放在一切项目中都有效。当我们发现性能的问题时，还是要根据现有情况分析出瓶颈在哪里，然后对症下药。

### 第9章 开发环境调优

> 本章将包含以下内容：·Webpack周边插件介绍；·模块热替换及其原理。

#### 9.1 Webpack开发效率插件

##### 9.1.1 webpack-dashboard

Webpack每一次构建结束后都会在控制台输出一些打包相关的信息，但是这些信息是以列表的形式展示的，有时会显得不够直观。webpack-dashboard就是用来更好地展示这些信息的。

> npm install webpack-dashboard

> 我们需要把webpack-dashboard作为插件添加到webpack配置中，如下所示：const DashboardPlugin = require('webpack-dashboard/plugin');module.exports = {  entry: './app.js',  output: {    filename: '[name].js',  },  mode: 'development',  plugins: [    new DashboardPlugin()  ],};

> 为了使webpack-dashboard生效还要更改一下webpack的启动方式，就是用webpack-dashboard模块命令替代原本的webpack或者webpack-dev-server的命令，并将原有的启动命令作为参数传给它。举个例子，假设原本的启动命令如下：// package.json{  ...  "scripts": {    "dev": "webpack-dev-server"  }}加上webpack-dashboard后则变为：// package.json{  ...  "scripts": {    "dev": "webpack-dashboard -- webpack-dev-server"  }}启动后的效果如图9-1所示。

[插图]图9-1　webpack-dashboard控制台

> webpack-dashboard的控制台分为几个面板来展示不同方面的信息。比如左上角的Log面板就是Webpack本身的日志；下面的Modules面板则是此次参与打包的模块，从中我们可以看出哪些模块资源占用比较多；而从右下方的Problems面板中可以看到构建过程中的警告和错误等。

##### 9.1.2 webpack-merge

对于需要配置多种打包环境的项目来说，webpack-merge是一个非常实用的工具。

> // webpack.prod.jsconst commonConfig = require('./webpack.common.js');const ExtractTextPlugin = require('extract-text-webpack-plugin');module.exports = Object.assign(commonConfig, {  mode: 'production',  module: {    rules: [      {        test: /\.(png|jpg|gif)$/,        use: 'file-loader',      },      {        test: /\.css$/,        use: ExtractTextPlugin.extract({          fallback: 'style-loader',          use: 'css-loader',        }),      }    ],  },});

> 是不是一下子感觉有些冗余了呢？这是因为通过Object.assign我们没有办法准确找到CSS的规则并进行替换，所以必须替换掉整个module的配置。

> npm install webpack-merge

> 更改webpack.prod.js如下：const merge = require('webpack-merge');const commonConfig = require('./webpack.common.js');const ExtractTextPlugin = require('extract-text-webpack-plugin');module.exports = merge.smart(commonConfig, {  mode: 'production',  module: {    rules: [      {        test: /\.css$/,        use: ExtractTextPlugin.extract({          fallback: 'style-loader',          use: 'css-loader',        }),      }    ]  },

> 可以看到，我们用merge.smart替换了

> Object.assign，这就是webpack-merge“聪明”的地方。它在合并module.rules的过程中会以test属性作为标识符，当发现有相同项出现的时候会以后面的规则覆盖前面的规则，这样我们就不必添加冗余代码了。

##### 9.1.3 speed-measure-webpack-plugin

> 觉得Webpack构建很慢但又不清楚如何下手优化吗？那么可以试试speed-measure-webpack-plugin这个插件（简称SMP）。SMP可以分析出Webpack整个打包过程中在各个loader和plugin上耗费的时间，这将会有助于找出构建过程中的性能瓶颈。

> npm install speed-measure-webpack-plugin

> const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');const smp = new SpeedMeasurePlugin();module.exports = smp.wrap({  entry: './app.js',  ...});

##### 9.1.4 size-plugin

一般而言，随着项目的开发，产出的资源会越来越大，最终生成的资源会逐渐变得臃肿起来。size-plugin这个插件可以帮助我们监控资源体积的变化，尽早地发现问题。

> 安装命令如下：npm install size-plugin

> onst SizePlugin = require('size-plugin');

> new SizePlugin(),

> 在每次执行Webpack打包命令后，size-plugin都会输出本次构建的资源体积（gzip过后），以及与上次构建相比体积变化了多少，如图9-3所示。

> [插图]

> 图9-3　展示两次构建资源体积的变化该插件目前还不够完善，理想情况下它应该可以把这些结果以文件的形式输出出来，这样就便于我们在持续集成平台上对结果进行对比了。不过它还在快速完善中，也许未来会添加类似的功能。

#### 9.2 模块热替换

> Webpack则在live reload的基础上又进了一步，可以让代码在网页不刷新的前提下得到最新的改动，我们甚至不需要重新发起请求就能看到更新后的效果。这就是模块热替换功能（Hot Module

> Replacement，HMR）。

##### 9.2.1 开启HMR

> HMR是需要手动开启的，并且有一些必要条件。首先我们要确保项目是基于webpack-dev-server或者webpack-dev-middle进行开发的，Webpack本身的命令行并不支持HMR。

> webpack-dev-server开启HMR的例子。const webpack = require('webpack');module.exports = {  // ...  plugins: [    new webpack.HotModuleReplacementPlugin()  ],  devServer: {    hot: true,  },

> };

> 上面配置产生的结果是Webpack会为每个模块绑定一个module.hot对象，这个对象包含了HMR的API。借助这些API我们不仅可以实现对特定模块开启或关闭HMR，也可以添加热替换之外的逻辑。比如，当得知应用中某个模块更新了，为了保证更新后的代码能够正常工作，我们可能还要添加一些额外的处理。

> 调用HMR API有两种方式，一种是手动地添加这部分代码；另一种是借助一些现成的工具，比如react-hot-loader、vue-loader等。

> 如果应用的逻辑比较简单，我们可以直接手动添加代码来开启HMR。比如下面这个例子：// index.jsimport { add } from 'util.js';add(2, 3);if (module.hot) {  module.hot.accept();}

> 假设index.js是应用的入口，那么我们就可以把调用HMR API的代码放在该入口中，这样HMR对于index.js和其依赖的所有模块都会生效。当发现有模块发生变动时，HMR会使应用在当前浏览器环境下重新执行一遍index.js（包括其依赖）的内容，但是页面本身不会刷新。

> 大多数时候，还是建议应用的开发者使用第三方提供的HMR解决方案，因为HMR触发过程中可能会有很多预想不到的问题，导致模块更新后应用的表现和正常加载的表现不一致。

> 为了解决这类问题，Webpack社区中已经有许多相应的工具提供了解决方案。比如react组件的热更新由react-hot-loader来处理，我们直接拿来用就行。

##### 9.2.2 HMR原理

> 在开启HMR的状态下进行开发，你会发现资源的体积会比原本的大很多，这是因为Webpack为了实现HMR而注入了很多相关代码。

> 在本地开发环境下，浏览器是客户端，webpack-dev-server（WDS）相当于是我们的服务端。HMR的核心就是客户端从服务端拉取更新后的资源（准确地说，HMR拉取的不是整个资源文件，而是chunk diff，即chunk需要更新的部分。

> 第1步就是浏览器什么时候去拉取这些更新。这需要WDS对本地源文件进行监听。实际上WDS与浏览器之间维护了一个websocket，当本地资源发生变化时WDS会向浏览器推送更新事件，并带上这次构建的hash，让客户端与上一次资源进行比对。通过hash的比对可以防止冗余更新的出现。

> websocket发送的事件列表如图9-4所示。[插图]

> 图9-4　websocket事件列表

> 当然webscoket并不是只有开启了HMR才会有，live reload其实也是依赖这个而实现的。

> 有了恰当的拉取资源的时机，下一步就是要知道拉取什么。

> 现在客户端已经知道新的构建结果和当前的有了差别，就会向WDS发起一个请求来获取更改文件的列表，即哪些模块有了改动。通常这个请求的名字为[hash].hot-update.json。图9-5、图9-6分别展示了该接口的请求地址和返回值。

[插图]图9-5　请求chunk地址


> [插图]图9-6　WDS向浏览器的返回值该返回结果告诉客户端，需要更新的chunk为main，版本为（构建hash）e388ea0f

> 0e0054e37cee。这样客户端就可以再借助这些信息继续向WDS获取该chunk的增量更新。

> 图9-7、图9-8展示了一个获取增量更新接口的例子。

> [插图]图9-7　URL中包含了需要更新的chunk name及其版本信息

[插图]图9-8　增量更新接口返回值

> 现在客户端已经获取到了chunk的更新，到这里又遇到了一个非常重要的问题，即客户端获取到这些增量更新之后如何处理？哪些状态需要保留，哪些又需要更新？这个就不属于Webpack的工作了，但是它提供了相关的API（如前

> 面我们提到的module.hot.accept），开发者可以使用这些API针对自身场景进行处理。像react-hot-loader和vue-loader也都是借助这些API来实现的HMR。

##### 9.2.3 HMR API示例

> // index.jsimport { logToScreen } from './util.js';let counter = 0;console.log('setInteval starts');setInterval(() => {  counter += 1;  logToScreen(counter);}, 1000);// util.jsexport function logToScreen(content) {  document.body.innerHTML = `content: ${content}`;}

> if (module.hot) {  module.hot.accept();}前面已经提到，这段代码的意思是让index.js及其依赖只要发生改变就在当前环境下全部重新执行一遍。但是我们发现它会带来一个问题：在当前的运行时我们已经有了一个setInterval，而每次HMR过后又会添加新的setInterval，并没有对之前的进行清除，所以最后我们会看到屏幕上有不同的数字闪来闪去。

> 为了避免这个问题，我们可以让HMR不对index.js生效。也就是说，当index.js发生改变时，就直接让整个页面刷新，以防止逻辑出现问题，但对于其他模块来说我们还想让HMR继续生效。那么可以将上面的代码修改如下：

> if (module.hot) {  module.hot.decline();  module.hot.accept(['./util.js']);}module.hot.decline是将当前index.js的HMR关掉，当index.js自身发生改变时禁止使用HMR进行更新，只能刷新整个页面。而后面一句module.hot.accept(['./util.js'])的意思是当util.js改变时依然可以启用HMR更新。

> 上面只是一个简单的例子，展示了如何针对不同模块进行HMR的处理。

### 第10章 更多JavaScript打包工具

> 本章我们将对其中的Rollup和Parcel进行介绍，了解这些工具将有助于从更多的角度来认识打包工具的发展，以及未来工程的技术选型。


> ·JavaScript打包工具发展趋势；·如何选择合适的打包工具。

#### 10.1 Rollup

> Webpack的优势在于它更全面，基于“一切皆模块”的思想而衍生出丰富的loader和plugin可以满足各种使用场景；而Rollup则更像一把手术刀，它更专注于JavaScript的打包。当然Rollup也支持许多其他类型的模块，但是总体而言在通用性上还是不如Webpack。如果当前的项目需求仅仅是打包JavaScript，比如一个JavaScript库，那么Rollup很多时候会是我们的第一选择。

##### 10.1.1 配置

> // rollup.config.jsmodule.exports = {  input: 'src/app.js',  output: {    file: 'dist/bundle.js',    format: 'cjs',  },};// src/app.jsconsole.log('My first rollup app.');

> 与Webpack一般装在项目内部不同，Rollup直接全局安装即可。(sudo) npm i rollup -g然后我们使用Rollup的命令行指令进行打包。rollup -c rollup.config.js-c参数是告诉Rollup使用该配置文件。打包结果如下：'use strict';console.log('My first rollup app.');

> 可以看到，我们打包出来的东西很干净，Rollup并没有添加什么额外的代码（就连第1行的'use strict'都可以通过配置output.strict去掉）。

> 而对于同样的源代码，我们试试使用Webpack来打包，配置如下：// webpack.config.jsmodule.exports = {  entry: './src/app.js',  output: {    filename: 'bundle.js',  },  mode: 'production',};产出结果如下：!(function(e) {  var t = {};  function r(n) {    if (t[n]) return t[n].exports;    var o = (t[n] = { i: n, l: !1, exports: {}, });    return e[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;  }  // 此处省略了50行 Webpack 自身代码...})([  function(e, t) {    console.log('My first rollup app.');  }]);

> 可以看到，即便我们的项目本身仅仅有一行代码，Webpack也需要将自身代码注入进去（大概50行左右）。显然Rollup的产出更符合我们的预期，不包含无关代码，资源体积更小。

##### 10.1.2 tree shaking

> 实际上tree shaking这个特性最开始是由Rollup实现的，而后被Webpack借鉴了过去。

> Rollup的tree shaking也是基于对ES6 Modules的静态分析，找出没有被引用过的模块，将其从最后生成的bundle中排除。

> // app.jsimport { add } from './util';console.log(`2 + 3 = ${add(2, 3)}`);// util.jsexport function add(a, b) {  return a + b;}export function sub(a, b) {  return a - b;}Rollup的打包结果如下：'use strict';function add(a, b) {  return a + b;}console.log(`2 + 3 = ${add(2, 3)}`);

> 可以看到，util.js中的sub函数没有被引用过，因此也没有出现在最终的bundle.js中。与之前一样，输出的内容非常清晰简洁，没有附加代码。

##### 10.1.3 可选的输出格式

> Rollup有一项Webpack不具备的特性，即通过配置output.format开发者可以选择输出资源的模块形式。

> 上面例子中我们使用的是cjs（CommonJS），除此之外Rollup还支持amd、esm、iife、umd及system。

> 这项特性对于打包JavaScript库特别有用，因为往往一个库需要支持多种不同的模块形式，而通过Rollup几个命令就可以把一份源代码打包为多份。下面使用一段简单的代码进行举例。'use strict';export function add(a, b) {  return a + b;}export function sub(a, b) {  return a - b;}

> 当output.format是cjs（CommonJS）时，输出如下：Object.defineProperty(exports, '__esModule', { value: true });function add(a, b) {  return a + b;}function sub(a, b) {  return a - b;}exports.add = add;exports.sub = sub;

> 当output.format是esm（ES6 Modules）时，输出如下：function add(a, b) {  return a + b;}function sub(a, b) {  return a - b;}export { add, sub };

##### 10.1.4 使用Rollup构建JavaScript库

在实际应用中，Rollup经常被用于打包一些库或框架（比如React和Vue）。

> 在React团队的一篇博文中曾提到，他们将React原有的打包工具从Browserify迁移到了Rollup，并从中获取到了以下几项收益：·最低限度的附加代码；·对ES6 Module的良好支持；·通过tree shaking去除开发环境代码；·通过自定义插件来实现React一些特殊的打包逻辑。

> Rollup在设计之初就主要偏向于JavaScript库的构建，以至于它没有Webpack对于应用开发那样强大的支持（各种loader和plugin、HMR等），所以我们在使用Rollup进行这类项目开发前还是要进行仔细斟酌。

#### 10.2 Parcel

> Parcel在JavaScript打包工具中属于相对后来者（根据npm上的数据，Parcel最早的版本上传于2017年8月，Webpack和Rollup则分别是2012年3月和2015年5月）。

> 在Parcel官网的Benchmark测试中，在有缓存的情况下其打包速度要比Webpack快将近8倍，且宣称自己是零配置的。它的出现正好契合了当时开发者们对于Webpack打包速度慢和配置复杂的抱怨，从而吸引了众多用户。

##### 10.2.1 打包速度

Parcel在打包速度的优化上主要做了3件事：·利用worker来并行执行任务；·文件系统缓存；·资源编译处理流程优化。

> 上面3种方法中的前两个Webpack已经在做了。比如Webpack在资源压缩时可以利用多核同时压缩多个资源（但是在资源编译过程中还没实现）；本地缓存则更多的是在loader的层面，像babel-loader就会把编译结果缓存在项目中的一个隐藏目录下，并通过本地文件的修改时间和状态来判断是否使用上次编译的缓存。

> babel-loader的工作流程，大体可以分为以下几步：·将ES6形式的字符串内容解析为AST（abstract syntax tree，抽象语法树）；·对AST进行语法转换；·生成ES5代码，并作为字符串返回。

> 这就是一个很正常的资源处理的过程。但假如是多个loader依次对资源进行处理呢？比如说在babel-loader的后面我们又添加了两个loader来处理另外一些特殊语法。整体的JavaScript编译流程如图10-1所示。

[插图]图10-1　Webpack多个loader资源处理流程

> 中我们可以看到，其中涉及大量的String和AST之间的转换，这主要是因为loader在设计的时候就只能接受和返回字符串，不同的loader之间并不需要知道彼此的存在，只要完成好各自的工作就可以了。虽然会产生一些冗余的步骤，但是这有助于保持loader的独立性和可维护性。

> Parcel并没有明确地暴露出一个loader的概念，其资源处理流程不像Webpack一样可以对loader随意组合，但也正因为这样它不需要那么多String与AST的转换操作。

> Parcel的资源处理流程可以理解为如图10-2所示。可以看到，Parcel里面资源处理的步骤少多了，这主要得益于在它在不同的编译处理流程之间可以用AST作为输入输出。对于单个的每一步来说，如果前面已经解析过AST，那么直接使用上一步解析和转换好的AST就可以了，只在最后一步输出的时候再将AST转回String即可。

> 试想一下，对于一些规模比较庞大的工程来说，解析AST是个十分耗时的工作，能将其优化为只执行一次则会节省很多时间。

> [插图]图10-2　Parcel资源处理流程

##### 10.2.2 零配置

> 接着我们看看Parcel的另一个特性——零配置。下面是一个完全不需要任何配置的例子：<!-- index.html --><html><body>  <script src="./index.js"></script></body></html>// index.jsdocument.write('hello world');执行Parcel打包（和Rollup类似，Parcel也使用npm全局安装）。parcel index.html

> 这样就启动了Parcel的开发模式，使用浏览器打开localhost：1234即可观察到效果。如果要打包为文件，则执行以下命令：parcel build index.htmlParcel会创建一个dist目录，并在其中生成打包压缩后的资源，如图10-3所示。

[插图]图10-3　Parcel生成的dist目录从上面可以看出和Webpack的一些不同之处。首先，Parcel是可以用HTML文件作为项目入口的，从HTML开始再进一步寻找其依赖的资源；并且可以发现对于最后产出的资源，Parcel已经自动为其生成了hash版本号及source map。

> 另外，如果打开产出的JS文件会发现，内容都是压缩过的，而此时我们还没有添加任何配置或者命令行参数。可见在项目初始化的一些配置上Parcel确实比Webpack简洁很多。

> 然而话说回来，对于一个正常Web项目来说，没有任何配置是几乎不可能的，因为如果完全没有配置也就失去了定制性。虽然Parcel并没有属于自己的配置文件，但本质上它是把配置进行了切分，交给Babel、PostHTML和PostCSS等一些特定的工具进行分别管理。比如当项目中有.babelrc时，那么Parcel打包时就会采用它作为ES6代码解析的配置。

> 另外，Parcel提供了多种不同类型工程的快速配置方法。举个例子，在使用Webpack时，假如我们要使用Vue则必然会需要vue-loader。

> 但是使用Parcel的话并不需要手动安装这样一个特殊的工具模块来对.vue文件进行处理。在一个Parcel工程中要使用Vue则只需安装Vue本身及parcel-bundler即可，如下面所示：

> npm install --save vuenpm install --save-dev parcel-bundler这样就可以了，并不需要进行更多的配置。Parcel已经帮我们处理好后面的工作，看上去是不是很简单、直接呢？

> Parcel相比Webpack的优势在于快和灵巧。

> 假如我们需要在很短的时间内搭建一个原型，或者不需要进行深度定制的工程，那么使用Parcel的话前期开发速度会很快。以前即便做一个小工程使用Webpack也要先写一堆配置，现在我们多了另外一种选择。

#### 10.3 打包工具的发展趋势

> 除了上面介绍的Rollup和Parcel以外，JavaScript社区中还有许多打包工具（如FuseBox、Microbundle、Pax等，限于它们相对比较小众，这里不做过多介绍）。我们不妨对所有这些进行一个总览，来总结一下近年来JavaScript打包工具的发展趋势。

##### 10.3.1 性能与通用性

> 无论什么时候性能都是我们关注一个打包工具的重要指标，但是性能与通用性有时是一对互相制衡的指标。若一个工具通用性特别强，可以适用在各种场景，那么它往往无法针对某一种场景做到极致，必然会有一些取舍，性能上可能就不如那些更加专注于某一个小的领域的工具。

> 比如，Parcel利用Worker来进行多核编译的特性，Webpack在这方面就落后了不少。不是Webpack不想加，而是它本身的体量比Parcel大得多，要很好地支持并不容易。

> 鉴于现在Webpack社区的繁荣，其实它在通用性上已经做得很好了。因此现在对于新出现的工具的趋势是，专注在某一特定领域，比Webpack做得更好更精，性能更强。我们在进行技术选型时也要看当前项目的需求，在通用性与性能之间做一些权衡和取舍。

##### 10.3.2 配置极小化与工程标准化

> 对于所有的JavaScript打包工具来说，配置极小化甚至是零配置逐渐成为了一个重要的特性。Parcel的出现让开发者们意识到，打包工具不一定非要写一大堆配置，很多东西其实是可以被简化的。

> 于是一系列打包工具都开始往这方面进行改进，以简洁的配置作为卖点。Parcel出现不久后就连Webpack也在4.0的版本中宣称自己支持零配置。

> 在配置极小化的背后体现出来的其实是JavaScript工程的标准化。最简单的就是源码目录和产出资源目录。

> 以前大家可能没有太多这方面的意识，都是随意地组织目录和进行命名，因此到了打包工具这边每个项目的配置都不太一样。而现在，越来越多的工程都开始趋同，比如用src作为源码目录，以dist作为资源输出目录。当它成为一种约定俗成的东西之后其实就不要特别的配置了，作为构建时默认的项目就好了。

> 类似的还有很多工程配置，如代码压缩、特定类型的资源编译处理等。

> 经过大家一段时间的实践，社区中已经基本形成了一套可以面向大多数场景的解决方案，并不需要特别个性化的东西，现有方案拿来即用。

> 在前两年的JavaScript社区发展中，各种工具和库层出不穷，处于一个爆炸式膨胀的状态。但随着一些东西逐渐成熟，经过了一些打磨和沉淀，一些共识也逐渐被大家接纳和采用，这对于整个社区的发展其实是一个好事

##### 10.3.3 WebAssembly

WebAssembly是一项近年来快速发展的技术，它的主要特性是性能可以媲美于原生，另外像C和Java等语言都可以编译为WebAssembly在现代浏览器上运行。因此在游戏、图像识别等计算密集型领域中，WebAssembly拥有很广阔的发展前景。

> 目前，不管你使用Webpack、Rollup还是Parcel，均能找到对WebAssembly的支持。比如我们可以这样使用以下.wasm的模块：import { add } from './util.wasm';add(2, 3);

> 试想一下，假如我们的loader及同类的编译工具足够强大，是否甚至也可以直接引用一个其他语言的模块呢？你可以引用一段C语言的代码或者Rust的代码，然后让它们运行在我们的浏览器环境中。这看起来很不可思议，但其实并没有我们想象的那么遥不可及。

#### 10.4 本章小结

> Rollup更加专注于JavaScript的打包，它自身附加的代码更少，具备tree shaking，且可以输出多种形式的模块。

> Parcel在资源处理流程上做了改进，以追求更快的打包速度。同时其零配置的特性可以减少很多项目开发中花费在环境搭建上面的成本。

> 在进行技术选型的时候，我们不仅要结合目前工具的一些特性，也要看其未来的发展路线图。如果其能在后续保持良好的社区生态及维护状况，对于项目今后的发展也是非常有利的。