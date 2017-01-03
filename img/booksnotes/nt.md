### 麦子学院Webpack学习笔记

##### webpack是什么？

是一个打包工具，可以处理的文件类型有JavaScript、CoffeeScript、jade、CSS、LESS、SASS和png等。

#### 为什么需要打包？

原因有三：

第一，如今的前端开发越来越复杂，不可能将开发文件放在一个文件中去编写代码，为了便于组织和管理，需要将项目的实现拆分成一个个的模块去开发；
第二，在项目上线时，加载项目的实现代码的时候又不可能一个个地去分别加载各个模块的代码，否则这样的请求数量太多，势必访问速度非常慢，所以需要将模块打包、压缩成一个或者几个文件；
第三，在项目实现中的一个浏览器无法识别的代码如LESS、CoffeeScript、JSF和ECMAScript6等需要编译成浏览器可以识别的代码，而这个编译过程也可以在打包的过程中完成。

#### Webpack有什么特点？

与require.js相比：

require.js对AMD支持得比较好，而对CommonJS的支持不如Webpack支持得好，然而越来越多的前端开始采用CommonJS（NPM模块都是基于CommonJS规范），Webpack可以很好地支持AMD和CommonJS规范，CommonJS的社区讨论也非常活跃。

与browserify相比：

（1）broserify主要支持了CommonJS，但是对于AMD支持得不好，而Webpack可以很好地支持AMD和CommonJS规范，还支持ECMAScript6的import引入模块的方式；

（2）browserify只支持JavaScript文件的打包，而Webpack不仅支持JavaScript文件的打包，而且支持CSS以及图片的打包。

Webpack的特点：

同时支持CommonJS和AMD规范；不仅支持JavaScript文件的打包，而且支持CSS以及图片的打包；可以灵活地设置哪些文件需要打包成一个文件。


## 容易拖慢效率的环节

1、文案在开发之前不能确定

这个问题会导致反复地确认、修改、发布，文案涉及的地方一般都比较分散，虽然改起来简单，但是修改的时间累加起来也不少。

2、过于关注一些无关紧要的bug

在项目早期阶段，最重要的可能不是有没有一些无关紧要的小问题，而是需要保证关键流程、主要功能正确可用。过分关注一些无关紧要的bug会使得开发人员为了避免出现这样的问题而花大量的时间去反复检测和review，由此导致的成本将大量提高。而产出则只是避免了一些无关紧要的bug。投入产出比不可观。


### 关于创新的思考

效果比从前好，功能比从前完善（用户体验的提升）
和别人/从前的技术方案不同（实现方式不同、结构不同、方法步骤不同、产生的效果不同等）
实现了以前别人不能实现的业务目的，自己心中很得意（如何实现的）
新的业务实现模式

在原有方案上的改进、变动
实现某个功能或作用的新途径（方法、过程、系统、结构）
现有技术方案的新用途（与原用途关联不大）
市场未来可能的技术趋势
客户提出的或潜在的需求
友商/竞争对手产品的可能发展方向
自己有他人无的产品技术特点

### bug管理好方法

bug到记录到系统，便于记录和追踪。

### 用例完善方法

跳出功能点，不只写功能用例，上下游及流程的测试用例容易被忽略掉。有时候可能需求不够细致，对于测试用例能否考虑完善是一个前置性的影响。

#### 自动化测试不适合场景

不适合验证UI，自动化不能识别UI正不正确，只能录下来一步步怎么操作，具体UI正确与否，自动化是无法识别的，而接口对不对，通常是可以自动化测试的；写自动化测试（如单元测试代码）需要很多的时间，不适合开发周期非常紧张的项目；自动化测试相对适合不是那种适合快速变化的业务。

#### 文案和数据统计需要体现在项目管理中

#### 接口需要提供一个使用人能看懂的接口文档说明，以提高沟通效率。

### Vue2.0比1.0的变化

性能更好

体积更小 v1.0.28 31.3KB -> v2.0.1 26.7KB

支持JSX

支持服务端渲染

`ready`钩子被`mounted`替代

`.sync`变成了不推荐的用法，使用将被警告。对于表单组件，官方给出的例子是因为 `v-model="xx"`等价于`:value="xx" @input="xx = $event.target.value"`,所以可以在子组件中手动`$emit('input',$event.target.value)`来回传。

现在可以使用`const eventManager = new Vue()`来快速创建事件代理
	- A组件中使用 `eventManager.$emit('EventName',Params);`来触发事件
	- B组件中使用 `eventManager.$on('EventName', Handle );`来响应事件

为了获得Vue的 pre-complie 和 执行分离的效果，所有的组件必须提前定义在.vue中，不能动态定义。
	
## 用nvm管理node版本

目前浏览器对于ECMAScript6支持得还不是很好，node平台对它的支持度相对要高不少。使用工具来管理node版本，会更加方便在不同node版本之间切换。

首先需要注意的是，nvm不支持windows，如果你使用的是windows平台，可以使用[nvm-windows github](https://github.com/coreybutler/nvm-windows)

### 1、nvm-windows的安装与使用

- 安装

下载安装[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

- 使用

```
	nvm install <version>: The version can be a node.js version or "latest" for the latest stable version. 
	
	nvm list [available]: List the node.js installations. Type available at the end to show a list of versions available for download.
		
	nvm proxy [url]: Set a proxy to use for downloads. Leave [url] blank to see the current proxy. Set [url] to "none" to remove the proxy.
		
	nvm uninstall <version>: Uninstall a specific version.
		
	nvm use <version> : Switch to use the specified version. 
		
	nvm version: Displays the current running version of NVM for Windows.
```

### 2、nvm(Node Version Manager)的安装与使用：

- 安装

	[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

该命令运行后，nvm会默认安装在用户主目录的.nvm子目录。

然后，激活nvm。

	source ~/.nvm/nvm.sh
	
- 使用

nvm的常用操作：

	nvm install 某node版本号
	nvm use 某node版本号	
	nvm alias default 某node版本号 # 默认使用某个版本的node，否則每次关掉Terminal就得重新nvm use一次，很麻烦
	nvm ls	#列出所有已安裝的node版本
	nvm ls-remote	#列出所有的远程可供安装的node版本
	
## Babel转码器

因为好多环境对ECMAScript6都没实现全面支持，为了便于使用ES6，我们需要一个转码工具。Babel就是一个广泛使用的ES6转码器，可以将ES6代码转为ES5代码。

### 1、配置文件.babelrc

Babel的配置文件是.babelrc，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

该文件用来设置转码规则和插件，基本格式如下。

	{
		"prestes":[],
		"plugins":[]
	}

`presets`字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

```
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0
$ npm install --save-dev babel-preset-stage-1
$ npm install --save-dev babel-preset-stage-2
$ npm install --save-dev babel-preset-stage-3
```

然后，将这些规则加入`.babelrc`。

```javascript
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

注意，***以下所有Babel工具和模块的使用，都必须先写好`.babelrc`***。

### 2、命令行转码工具`babel-cli`

Babel提供`babel-cli`工具，用于命令行转码。

用法：

将`babel-cli`安装在项目之中。***不要把babel安装在全局环境下，因为这意味着无法支持不同项目使用不同版本的Babel。***

```bash
# 安装
$ npm install --save-dev babel-cli
```

然后，改写`package.json`。

```javascript
{
  // ...
  "devDependencies": {
    "babel-cli": "^6.0.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  },
}
```

转码的时候，就执行下面的命令。

```javascript
$ npm run build
```

更多关于Babel的转码参数用法如下：

```bash

# --out-file 或 -o 指定转码结果输出到一个文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### 3、babel-polyfill

***Babel默认只转换新的JavaScript句法（syntax），而不转换新的API***，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如`Object.assign`）都不会转码。

举例来说，ES6在`Array`对象上新增了`Array.from`方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用`babel-polyfill`，为当前环境提供一个垫片。

Babel默认不转码的API非常多，详细清单可以查看`babel-plugin-transform-runtime`模块的[definitions.js](https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-runtime/src/definitions.js)文件。

***因为项目中很可能会用到这些新对象、新对象的新方法及原有对象的新方法，所以，一般情况下babel-polyfill是不能少的。***

安装命令如下。

```bash
$ npm install --save babel-polyfill
```

然后，在脚本头部，加入如下一行代码。

```javascript
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

### 4、在线转换

Babel提供一个[REPL在线编译器](https://babeljs.io/repl/)，可以在线将ES6代码转为ES5代码。转换后的代码，可以直接作为ES5代码插入网页运行。

### 5、babel-core

如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。

### 6、与其它工具的配合，如ESLint和Mocha

许多工具需要Babel进行前置转码，这里举两个例子：ESLint和Mocha。

[ESLint](https://github.com/eslint/eslint)用于静态检查代码的语法和风格，安装命令如下。

```bash
$ npm install --save-dev eslint babel-eslint
```

然后，在项目根目录下，新建一个配置文件`.eslintrc`，在其中加入`parser`字段。

```javascript
{
  "parser": "babel-eslint",
  //babel-eslint is a wrapper around the Babel parser that makes it compatible with ESLint.
  //它是一个Babel parser的包装器，这个包装器使得Babel parser可以和ESLint协调工作
  "rules": {
    ...
  }
}
```

再在`package.json`之中，加入相应的`scripts`脚本。

```javascript
  {
    "name": "my-module",
    "scripts": {
      "lint": "eslint my-files.js"
    },
    "devDependencies": {
      "babel-eslint": "...",
      "eslint": "..."
    }
  }
```

Mocha则是一个测试框架，如果需要执行使用ES6语法的测试脚本，可以修改`package.json`的`scripts.test`。

```javascript
"scripts": {
  "test": "mocha --ui qunit --compilers js:babel-core/register"
}
```

上面命令中，`--compilers`参数指定脚本的转码器，规定后缀名为`js`的文件，都需要使用`babel-core/register`先转码。


### 7、babel-node

`babel-cli`工具自带一个`babel-node`命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

它不用单独安装，而是随`babel-cli`一起安装。然后，执行`babel-node`就进入REPL环境。

`babel-node`命令可以直接运行ES6脚本。将上面的代码放入脚本文件`es6.js`，然后直接运行。

```bash
$ babel-node es6.js
2
```

`babel-node`也可以安装在项目中。

```bash
$ npm install --save-dev babel-cli
```

然后，改写`package.json`。

```javascript
{
  "scripts": {
    "script-name": "babel-node script.js"
  }
}
```

上面代码中，使用`babel-node`替代`node`，这样`script.js`本身就不用做任何转码处理。***适合只执行ES6，而无需对ES6进行转码的情况。***

### 8、浏览器环境中引用babel进行ES6临时转码

Babel也可以用于浏览器环境。例如：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.4.4/babel.min.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

但是，***网页中实时将ES6代码转为ES5，对性能会有影响。所以此法不适合在生产环境使用。***从Babel 6.0开始，不再直接提供浏览器版本。


## ECMAScript 7

2013年3月，ES6的草案封闭，不再接受新功能了。新的功能将被加入ES7。

任何人都可以向TC39提案，从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由TC39委员会批准。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

一个提案只要能进入Stage 2，就差不多等于肯定会包括在ES7里面。

ECMAScript当前的所有提案，可以在TC39的官方网站[Github.com/tc39/ecma262](https://github.com/tc39/ecma262)查看。

Babel转码器可以通过安装和使用插件来使用各个stage的语法。
---
	
---
## 网上常见cookie解析

```
function getValueByKey(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return decodeURIComponent(arr[2]);
    } else {
        return null;
    }
}

return {
    get: getValueByKey
}
```
```
var ua = navigator.userAgent;
var iOSV  = ua.match(/os\s+([\d_]+)/i); //iOS版本号
var isIOS = ua.match(/iphone|ipod|ipad/i);
```

___

## jar文件无法打开的处理办法？

最新版wget在macbook air 的jdk1.8中无法安装，可能原因是它是用jdk1.6打的jar包。
  
  先下载安装jdk：http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
  
  然后下载安装wedget：
  
  wget工具for Mac
  
  1.下载zip包Download;
  
  http://files.cnblogs.com/kiss007/wget-1.13.4.tar.gz.zip
  
  2.解压到到Mac系统根目录,生成"wget-1.13.4.tar.gz"文件;
  
  3.打开终端;
  
  4.输入:tar zxvf wget-1.13.4.tar.gz
  
  5.输入:cd wget-1.13.4
  
  6.输入:sudo ./configure --with-ssl=openssl 等待结束;
  
  7.输入:sudo make 等待结束;
  
  8.输入:sudo make install 等待结束;
  
  成功测试:进入刚刚安装的目录用cd命令;输入:wget www.baidu.com
  
  有人说，后来才发现问题关键在于 中文目录！ 如果同样有下载jar文件的朋友请尽量不要把jar文件放在自己新建的中文目录下。（系统自带文件夹无妨）。把文件所在子目录改成英文就可以正常启动了，与jdk没有太大关系。另外java设置没有是因为我装了好几次jdk的环境后没有重启（不知道是不是个别原因），我是重启后能在偏好设置里找到了。希望对油相同问题的朋友帮助。


## 使用 transform 有一个缺陷，就是当计算结果含有小数时（比如 0.5），会让整个元素看起来是模糊的

main {
  position: relative;
}
main div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
使用 transform 有一个缺陷，就是当计算结果含有小数时（比如 0.5），会让整个元素看起来是模糊的，一种解决方案就是设置父级元素的 transform-style: preserve-3d;

main {
  -webkit-transform-style: preserve-3d;
     -moz-transform-style: preserve-3d;
          transform-style: preserve-3d;
}
main div {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}


## 前端自动化工具——grunt

一、概述

前端团队代码风格不统一，如何强制开发规范。
前端开发的组件库如何维护和使用。
如何模块化前端项目。
服务器部署前必须的压缩等流程如何简化和完善。

主流的前端自动化解决方案有哪些？
yoeman + bower + grunt/gulp
codekit（只适用mac系统）
FIS
以及腾讯的Spirit（只适用移动端）

在linux下使用node命令行的话，得注意一下用户名是否含有空格。而空格会影响到一些命令行的顺利执行，所以如果你已经这样做了，可以新建一个账户来解决掉这个问题。

windows下的控制台无法执行bash脚本，所以推荐安装一个git bash shell。



npm install 命令后面没有指定安装什么时，会去查找当前所在目录下时否有package.json文件中有没有devDependencies指定依赖项，如果有，则会安装它们。

yeoman的作用——快速搭建现代web app的脚手架。

yeoman的安装：npm install -g yo   注意：苹果系统下要加sudo，下面的包安装也同样
安装后可以执行yo -v查看安装的yeoman版本。

bower的作用——web的包管理器

bower的安装：npm install -g bower
安装完之后，执行bower -v

grunt的作用——任务运行器，有强大的各种功能器件的支持

grunt的安装，npm install -g grunt-cli  注意别少了-cli


二、yeoman实践

yeoman官网的generator列表中，前面有八字胡图标的generator是yeoman官方提供的，而没有这个图标的则是非yeoman官方出品的。

现在我门安装一个generator：
npm install -g generator-angular

下面我们使用它：
mkdir yo-in-action
cd yo-in-action
mkdir angular-in-action
cd angular-in-action
因为使用angular generator会在当前文件下生成一个项目，所以我们给该项目先建立好一个文件夹angular-in-action
，然后进入到该文件中再去执行生成项目的命令。
下面我们执行用generator创建项目的命令。
yo angular learangular
其中angular是生成器的名气，而learnangular是项目的名字，体现在在package.json文件内部的name项中，这并不是文件夹名。文件夹名是刚创建的angular-in-action。
然后接下来会问你是否需要用sass\bootstrap等，需要的话yes，不需要的话no
再接下来还会问你是否需要包含一些组件，可以按空格和方向键来依次选择和取消选择。

一些常见的bash命令行：
pwd     显示当前所在目录路径
ls -al  打印当前目录下所有文件及文件夹的列表
rm -rf 文件夹／文件名  删除文件／文件夹，-rf这个参数的意思是递归删除，且不需要二次确认。

下面看一下package.json这个文件：
dependenceis 是该项目发布后，用户在使用该项目时，需要安装的依赖文件。
devDependencies 是该项目开发过程中或者其它开发协作者在参与该项目的开发时，需要依赖的文件。
依赖项的内容以键值对的方式存在，例如：
“grunt” : “^0.4.1”
^表示主版本号，是对版本的一个宽松的约定。就是说在该主版本号内的版本都是可以的。在我们执行npm install或者npm update的时候，如果发现有该主版本号之内的版本已发布，则会帮我们更新成左新版本。在这里，即只要是0.打头的grunt版本都是可以更新的，比如0.9.0，而如果出现了1.打头的版本，如1.0.0，则不会更新。
同样，还有“grunt” : “～0.4.1”，这里～的意思是，只对0.4.打头的版本进行更新，如0.4.2，而如果出现了0.5.0这样的版本，是不会更新的。

“engines” : {
	“node”: ">= 0.10.0"
} 
指定node的版本必须大于0.10.0
“scripts” : {
	“test” : “grunt test"
}
这里指定的是在npm命令行中输入的命令与实际命令的对应关系。例如，这里是说当我们在控制台输入npm test的时候，实际执行npm grunt test。

三、bower实践

mkdir bower-in-action
cd bower-in-action
mkdir jquery-bootstrap-in-action
cd jquery-bootstrap-in-action

bower install jquery 
把jquery装上其最新稳定版本
bower install bootstrap

http://bower.io/search 这个地址支持对所有的官网可获得的bower包的搜索。在其中输入jquery owner:jquery，可以搜索出所有jquery团队开发的包含jquery关键字的包。如果只输入jquery，则所有包含jquery关键字的包都会出现，不管它是不是jquery团队开发的。   
如果你需要安装的是比较小众的包，而这个包在bower的库中没有怎么办呢？bower提供了其它的几种方式可供使用。
1、通过github的短写安装，如bower install jquery/jquery   前面一个jquery是jquery在github上注册账号的名字，后一个jquery在github上项目的名字
2、通过github完整的项目地址，如bower install https://github.com/jquery/jquery.git
3、通过URL进行安装，例如npm install http://lib.sinaapp.com/js/jquery/1.7.2/jquery.min.js

在项目中设置一个bower.json文件之后，执行bower install就会把其中定义的所有以来都安装好。要生成bower.json文件，只需要输入bower init命令即可。
生成一个.bowerrc文件：
输入一个vim .bowerrc命令
然后编辑其内容为：
{
“directory”:”bower_coponents”,                //设置安装bower包的目录
“proxy”:”http://proxy.tencent.com:8080”,      //用于配置代理
“https-proxy”:”https://proxy.tencent.com:8080”,      //如果代理用的是https，则用这种方式配置代理
“timeout”:60000                                  //如果你的网络环境非常的差，可以设置一下timeout，其默认值是60000，单位时ms，你可以将其改为更长的时间，以便于安装或更新其中的依赖包的时候可以顺利安装。
}


四、grunt实践

npm install -g generator-webapp

mkdir grunt-in-action
cd grunt-in-action
mkdir grunt-by-yo
cd grunt-by-yo
yo webapp grunt-by-yo

提示是否使用node-sass时选择no，因为这个工具目前还存在一些莫名其妙的问题，不是很好用。

在编辑器中打开当前项目。然后打开Gruntfile.js：

‘use strict’

module.exports = function(grunt){
	require(’time-grunt’)(grunt);//这个模块用于记录任务花了多长时间运行，在我们优化项目build的时间时有用
	require(‘load-grunt-tasks’)(grunt);//自动加载tasks
	
	//可配置的路径
	var config = {
		app:’app’,
		dist:’dist'
	};

        
	grunt.initConfig({
		config : config,  //像config这样的项，由于没有同名插件，对于这种没有通明插件的项，会被作为常量存储起来，在配置文件中以<%= %>这样的方式调用，如下文的<%= config.app %>
			   watch: {	  //而像watch这样的项，由于存在同名插件grunt-contrib-watch，这个插件在运行的时候，会直接读取Gruntfile.js中的同名项，然后根据其中的配置来运行。

。当然，要让grunt-contrib-watch插件运行，必须加载它，即grunt.loadNpmTask(‘grunt-npm-watch’)；但是，如果有很多任务需要加载的时候，一个个去加载他们显然有些费劲，因此就有人开发了一个工具，自动将package.json中所定义的依赖作为任务全部加载进来。即上文的require(‘load-grunt-tasks’)(grunt);这一句。load-grunt-tasks就是这个工具的模块名字。

			bower: {
				files: ['bower.json'],
				tasks: ['wiredep’]
			},
			js: {
				files:[‘<%= config.app %>/scripts/{,*/}*.js’],
				tasks: [‘jshint’],
				options:{
					livereload:true
				}
			},
			jstest: {
				files: [’test/spec/{,*/}*.js’],
				tasks: [’test:watch']
			}
		}
	})
}


其中的config : config, 除了这种方式，还有一种常用的方式如下 ：
pkg : grunt.file.readJSON(‘package.json’),
就是把package.json中的所有配置读取进来，供后面以<%= pkg.***** %>的方式使用。

每一个task中又可以包含自己的options和target

比如，执行sass这一task下的dis这个target，则可以用命令行：
grunt sass:dist
一个个的task可以组合在一起，组合在一起的组合任务还可以和其它的组合任务组合成更大的组合目录。

两种注册任务的方式：

grunt.registerTask(‘某组合task的名字’，function(target){
	grunt.task.run([’任务名’，’任务名’,’任务名’]);
})

或者

grunt.registerTask(‘某组合task的名字’,[
	‘任务名’,
	‘任务名’,
	‘任务名’
])



grunt 命令后面不跟任何参数的时候，会默认执行default这一组合task

常见的开源协议的宽松度比较：

MIT的宽松度>BSD> ISC> Apache> GPL

npm init
npm install grunt --save-dev    在安装安装包的时候，加入--save-dev参数的话，意味着同时将其加入package.json的devDependencies项中；而如果只加 --save参数的

话，意味着加入dependencies项中。

npm install load-grunt-tasks --save-dev
npm install time-grunt --save-dev
touch Gruntfile.js


grunt 的文件拷贝依赖于官方的插件 grunt-contrib-copy，用如下命令行安装：
grunt install grunt-contrib-copy —save-dev
grunt 中文件的删除则依赖于官方的插件 grunt-contrib-clean，用如下命令安装：
grunt install grunt-contrib-clean —save-dev


下面一步步创建项目：

Gruntfile.js：

```
‘use strict’

module.exports = function(grunt){
	require(’time-grunt’)(grunt);//这个模块用于记录任务花了多长时间运行，在我们优化项目build的时间时有用
	require(‘load-grunt-tasks’)(grunt);//自动加载tasks
	
	//可配置的路径
	var config = {
		app:’app’,
		dist:’dist'
	};

        
	grunt.initConfig({
		config : config,  //像config这样的项，由于没有同名插件，对于这种没有通明插件的项，会被作为常量存储起来，在配置文件中以<%= %>这样的方式调用，如下文的<%= config.app %>

		copy：｛
			dist: {
				files:{
					'<%= config.dist %>/index.html' : '<%= config.dist %>/index.html',   //这里键值对的键是目标文件，值是源文件，值既可以是单个值，也可以是一个数组
					'<%= config.dist %>/js/index.js' : ［'<%= config.dist %>/js/index.js'］
				}
			},
			dist_js: {
				files:[
					{
						expand:true,
						cwd:'<%= config.app %>/', //注意：初学者经常忘记这里的/
						src:'*.html',
						dest:'<%= config.dist %>/',
						ext:'.min.js',
						extDot:'last', //表示从源文件命中的第一个点处开始修改文件的后缀，比如，源文件是index.max.js的话，目标文件会变成index.max.min.js。这个值还可以设置成first
						flatten: true, //flatten为true的话会直接把中间各层目录去掉，导致的结果是生成的文件在dist目录下，而且dist目录下的js目录被删除掉了。
						rename: function(dest,src){
							return dest + 'js/' + src;   //这样又可以将生成的文件放回dist的js文件夹下。它是在ext,extDoc,flatten等参数执行完之后才执行的。
						}
					}
				]
			}
		｝

		clean:{
			dist:{
				src:['<%= config.dist %>/**/*'],    //注意，一个＊表示匹配任意一个字符，但不包括反斜杠；两个＊表示匹配任意个数的任意字符，包括反斜杠。｛a,b}的形式则表示匹配a或者b。如果是！，则表示匹配取反。
				filter:'isFile'，  //filter的取值既可以是node.js的
				//fs.Status这个类下的函数名，包括isFile\isDrectory\isBlockDevice\isCharacterDevice\isSumbolicLink\isFIFO\isSocket，也可以是function(filepath){ return (!grunt.file.isDir(filepath)); } 这样的自定义处理函数。这里的设置是指删除文件，不删除文件夹的意思。
				dot: true, // dot为真的话，会命中以.开头的通明文件。比如，我们如果我们前面有设置匹配的是index.html文件话，那么如果设置了dot:true则会把.index.html也同时匹配上。
				matchBase:true, // 如果我们要匹配的是a?b，那么这里指的是可以匹配到／xyz/123/acb，但不会匹配到/xyz／acb/123
				expand:true, //意味着我们要处理动态的src到dest文件的映射。
			}
		}


		watch: {	  //而像watch这样的项，由于存在同名插件grunt-contrib-watch，这个插件在运行的时候，会直接读取Gruntfile.js中的同名项，然后根据其中的配置来运行。当然，要让grunt-contrib-watch插件运行，必须加载它，即grunt.loadNpmTask(‘grunt-npm-watch’)；但是，如果有很多任务需要加载的时候，一个个去加载他们显然有些费劲，因此就有人开发了一个工具，自动将package.json中所定义的依赖作为任务全部加载进来。即上文的require(‘load-grunt-tasks’)(grunt);这一句。load-grunt-tasks就是这个工具的模块名字。

			bower: {
				files: ['bower.json'],
				tasks: ['wiredep’]
			},
			js: {
				files:[‘<%= config.app %>/scripts/{,*/}*.js’],
				tasks: [‘jshint’],
				options:{
					livereload:true
				}
			},
			jstest: {
				files: [’test/spec/{,*/}*.js’],
				tasks: [’test:watch']
			}
		}
	})
}
```

剖析grunt tasks —— grunt serve
mkdir grunt-in-action
cd grunt-in-action
mkdir grunt-yo-webapp
cd grunt-yo-webapp
yo webapp grunt-yo-webapp

完成之后，查看Gruntfile.js可以看到关于serve这个task组合的配置。

下面开始对这个项目自动生成的Gruntfile.js进行解析：

我们在命令行中输入grunt serve,即可看到项目的浏览效果。而且如果我们在编辑器中修改页面的代码，动态地就可以展示到浏览器上，不用我们刷新浏览器。这是serve这个组合task帮我们自动完成的。如果在运行grunt serve命令的时候加上--allow-remote，则可以在局域网的其它机器上通过运行这个任务的机器的ip地址:9000/页面地址的方式访问到项目中的页面。

connect:dist:keepalive这个语句是什么意思呢？
对于task名:abc:def:ghi这样的语句，grunt会解析成
this.flags  { abc:true, def:true, ghi:true}
然后在执行任务的时候会去读取this.flags中的这些值。

wiredep这个task是用来根据bower.json的依赖文件来自动引入这些依赖的js和css文件到页面代码中。避免一个个手动去引入。

 concurrent:server用来通过concurrent这个任务来指定server这一target并行执行。因为grunt中的任务默认是串行执行的。concurrent这个任务是用来让任务并行执行的。其中的server这一target从其源代码查看可知它是用来将sass编译成css，并拷贝到对应的输出目录。

 因为webapp-generator生成的项目中使用了 sass，而sass依赖于ruby，所以用brew install ruby命令先把ruby 安装上。然后用sudo npm install -g sass把sass安装上。
 ___
 

### 无线设备高清屏幕判断

几乎所有的浏览器都支持 devicePixelRatio 但是
IE and Firefox don’t support the property at all. I assume the next versions will implement it.
Opera desktop on retina devices give 1, while it should be 2. I assume the next Opera version will fix this.
Opera Mobile 10 does not support it, but 12 implements the property correctly.
UC always gives 1, but UC is quite confused when it comes to viewport properties.
Chrome implemented this property only recently on retina devices. Chrome 19 incorrectly returns 1; Chrome 22 correctly returns 2.
MeeGo WebKit (Nokia N9/N950) does something horrible: it changes the value from 1 to 1.5 when you apply a meta viewport.
一般情况下直接使用 devicePixelRatio判断就可以，如果devicePixelRatio 不起作用的时候需要通过 matchMedia 做额外的检测
```
    function isHiDPI () {
        var mediaQuerys = ["(-webkit-min-device-pixel-ratio: 1.5)",
                           "(-o-min-device-pixel-ratio: 1.5)",
                           "(min--moz-device-pixel-ratio: 1.5)",
                           "(min-resolution: 144dpi)"], // 分辨率大于每英寸144点的设备
            w = window;
        if (w.devicePixelRatio >= 1.5) return true;

        if(w.matchMedia){
            for(var mediaQuery in mediaQuerys ){
                if(w.matchMedia(mediaQuery).matches) return true;
            }
        }
        return false;
    }
```

### 限定几行，文本溢出自动变。。。

一行的时候 text-overflow: ellipsis; 在现在的mobile 移动端的支持的不错，但是有时候的需求是2/3行 多处的时候自动隐藏，这个时候单单 text-overflow 不能满足需求，这个时候 css3 的高级属性就派上用处了。

注意：这是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical; 

例子：

.demo{
    margin:40px;
}
.text-overflow2{
/*两行文字超出后显示省略号的样式*/
    margin-bottom: 5px;
    line-height: 20px;
    display: -moz-box;
    -moz-line-clamp: 2;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  /*  display: box;
    line-clamp: 2;
    box-orient: vertical;*/
    overflow: hidden;
    text-overflow: ellipsis;
}

.text-overflow3{
/*三行文字超出后显示省略号的样式*/
    margin-bottom: 5px;
    line-height: 20px;
    display: -moz-box;
    -moz-line-clamp: 3;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: box;
    line-clamp: 3;
    box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
        


### css3 arrow

视觉稿上的剪头，最普通的方式就切图通过css sprite的方式，但是对于移动端来说，切图不够优雅，还有要有一个图片请求。

现在的移动端 浏览器对css 的支持都是比较好,以后会更加的好，那么就用纯css来做箭头吧，

实现原理 通过:after :before 可以少一层嵌套，这样就比较简洁。然后通过控制 2条边框 颜色和边宽来控制 设置样式和颜色。这个时候发现角度好像还是有问题。箭头应该水平的或者垂直的。不用急，transform 就能解决这个问题。最后就能出现你想要的箭头了。
注意：select标签 after before 无效，可以外面包一层。
代码如下：
```
.arrow-1 {
  position: relative;
}
.arrow-1:after {
  position: absolute;
  display: block;
  z-index: 1;
  right: 18px;
  top: 17px;
  content: '';
  font-size: 0;
  border-top: 1px solid #bdbdbd;
  border-left: 1px solid #bdbdbd;
  width: 7px;
  height: 7px;
  background-color: transparent;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
```


例子：

```
<html><head>
        <meta charset="utf8">
        <title>pure css arrow</title>

        <link href="index.less" rel="stylesheet" type="text/less"><style type="text/css" id="less:mobilex-know-pureCssArrow-index">.arrow-1 {
  position: relative;
}
.arrow-1:after {
  position: absolute;
  display: block;
  z-index: 1;
  right: 18px;
  top: 17px;
  content: '';
  font-size: 0;
  border-top: 1px solid #bdbdbd;
  border-left: 1px solid #bdbdbd;
  width: 7px;
  height: 7px;
  background-color: transparent;
  -webkit-transform: rotate(135deg);
  transform: rotate(135deg);
}
.arrow-2 {
  position: relative;
}
.arrow-2:before {
  position: absolute;
  display: block;
  z-index: 1;
  right: 18px;
  top: 17px;
  content: '';
  font-size: 0;
  border-top: 1px solid #ff0000;
  border-left: 1px solid #ff0000;
  width: 10px;
  height: 10px;
  background-color: transparent;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
}
.arrow-2:after {
  position: absolute;
  display: block;
  z-index: 1;
  right: 18px;
  top: 10px;
  content: '';
  font-size: 0;
  border-top: 1px solid #ff0000;
  border-left: 1px solid #ff0000;
  width: 10px;
  height: 10px;
  background-color: transparent;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
}
.arrow-3 {
  position: relative;
}
.arrow-3:after {
  position: absolute;
  display: block;
  z-index: 1;
  right: 14px;
  top: 15px;
  content: '';
  font-size: 0;
  border-style: solid;
  border-color: transparent;
  border-left-color: #ff0000;
  border-width: 7px;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  background-color: transparent;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.arrow-4 {
  position: relative;
}
.arrow-4:before {
  position: absolute;
  display: block;
  z-index: 1;
  right: 12px;
  top: 15px;
  content: '';
  font-size: 0;
  border-style: solid;
  border-color: transparent;
  border-left-color: #ff0000;
  border-width: 7px;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  background-color: transparent;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.arrow-4:after {
  position: absolute;
  display: block;
  z-index: 1;
  right: 16px;
  top: 15px;
  content: '';
  font-size: 0;
  border-style: solid;
  border-color: transparent;
  border-left-color: #000000;
  border-width: 7px;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  background-color: transparent;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
</style>
    <style>
        .demo{
            margin:0 auto;
            max-width:800px;
        }
        .arrow-1,.arrow-2,.arrow-3,.arrow-4{
            margin:10px;
            border:1px solid #ccc;
            padding:10px;
        }
    </style></head>
    
    <body>
        <div class="demo">
        <div class="arrow-1">
            一个箭头
        </div>
        <div class="arrow-2">
            2个箭头
        </div>
        <div class="arrow-3">
            1个箭头
        </div>
        <div class="arrow-4">
            2个箭头
        </div>
        </div>
        <script src="../less-1.7.0.min.js"></script>
    
</body></html>
```

### Android 选中会用背景高亮，iOS tap事件 ui 闪一下

-webkit-tap-highlight-color 设置就可以修复这个问题

-webkit-tap-highlight-color :rgba(255, 0, 0, 0.5)

ios tap的时候闪一下的问题，将透明度修改为0，或者颜色设置为 transparent


### 不尽人意的overflow:scroll

移动端对容器内部overflow:scroll 属性支持的不如人意，需要使用overflow-scroll属性开启原生滚动条的支持，才能更为流畅的体验。

目前支持的设备是 Android 3+, iOS 5+. 流程体验最好的事IOS6+的设备。

基于性能和渐进增强。推荐使用原生属性，

.module {
   width: 300px;
   height: 200px;
   overflow-y: scroll;
   -webkit-overflow-scrolling: touch
}



### gem install 'auto_response'报错：


处理办法：
sudo gem sources -r https://rubygems.org
sudo gem sources -a http://rubygems.org  

貌似意思是将https替换成http，再试了一下，果然可以了，但是安装完后别忘了把它设回来： 
sudo gem sources -r http://rubygems.org
sudo gem sources -a https://rubygems.org

解决方案参考来源： 
http://stackoverflow.com/a/19179835/1227911 
------------------------ 更新 --------------------------- 
虽然用了以上的方法，但是还是时不时的抽风，这要归功于天朝的网络了，现在还有另外的一个方案，就是使用国内提供的RubyGems镜像作为源：
sudo gem sources -r https://rubygems.org/
sudo gem sources -a http://ruby.xxxxxx.org/ 
这下速度就刷刷的了 



### 兼容所有浏览器的线性渐变：

background-color:#007288;  //加上背景颜色，以防渐变属性不起作用
    filter:progid:DXImageTransform.Microsoft.Gradient(gradientType='0', startColorStr='#02b0c0', endColorStr='#007288');  //IE9及以下版本的浏览器使用滤镜来实现
    background:-moz-linear-gradient(top, #02b0c0 0%, #007288 100%) #007288;  //firefox3.6+
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#02b0c0), color-stop(100%,#007288));  //chrome,safari4+
    background:-webkit-linear-gradient(top, #02b0c0 0%, #007288 100%) #007288;  //chrome10+,safari5.1+
    background:-o-linear-gradient(top, #02b0c0 0%, #007288 100%) #007288;  //opera11.10+
    background:-ms-linear-gradient(top, #02b0c0 0%, #007288 100%) #007288;  //ie10+
    background:linear-gradient(top, #02b0c0 0%, #007288 100%) #007288;  //最后来个w3c标准的


#### git rm -r --cached .idea

### 原生transform
```
    function doTransform(obj,type,value){
          if( 'webkitTransform' in document.documentElement.style) {
            obj.style.webkitTransform = type + '(' + value + ')';
          }
          if( 'mozTransform' in document.documentElement.style) {
            obj.style.mozTransform = type + '(' + value + ')';
          }
          if( 'oTransform' in document.documentElement.style) {
            obj.style.oTransform = type + '(' + value + ')';
          }
          if( 'msTransform' in document.documentElement.style) {
            obj.style.msTransform =  type + '(' + value + ')';
          }
          if( 'transform' in document.documentElement.style) {
            obj.style.transform =  type + '(' + value + ')';
          }
    }
```
    

### html5中，js可以通过.dataset['title']这样的方式来直接获得data-title="abc"这样的属性的值。
    使用dataset操作data 要比使用getAttribute稍微慢些。
    

    把translate换成translate3d，可以明显地改善在移动端性能卡的现象。对于代码中那些计算量较小的部分，可以不用换成translate3d，它们对性能的影响不大。比如

    if( 'webkitTransform' in document.documentElement.style) {
          i.appendTo(a.container)
            .css({left: d, opacity: e})
            .animate(
            {'-webkit-transform': 'translate3d(' + g + 'px,' + f + 'px,0)', opacity: .2},
            {duration: h, easing: "linear", complete: function () {
              i.remove()
            }}
          )
        }


### mac下强制刷新快捷键：command + r

        
### 3d

```
      -webkit-backface-visibility: hidden;//设置进行转换的元素的背面在面对用户时是否可见：隐藏
      -webkit-transform-style: preserve-3d; //设置内嵌的元素在 3D 空间如何呈现：保留 3D
```

### 垂直无缝滚动：

```
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <style>
    #scroll{
      overflow: hidden; width: 160px; height: 235px
    }
    #scrollCont1>div,#scrollCont2>div{
      height: 100px;
    }
  </style>
</head>
<body>

<div id="scroll">
  <div id="scrollCont1">
    <div>1111</div>
    <div>222</div>
    <div>333</div>
    <div>444</div>
    <div>555</div>
    <div>666</div>
  </div>
  <div id="scrollCont2"></div>
</div>


<script>
  var speed=65;
  var h = 100;
  var scroll = document.getElementById('scroll');
  var scrollCont1 = document.getElementById('scrollCont1');
  var scrollCont2 = document.getElementById('scrollCont2');
  scrollCont2.innerHTML=scrollCont1.innerHTML;
  function Marquee2(){
    if(scrollCont2.offsetTop-scroll.scrollTop<=0)
      scroll.scrollTop-=scrollCont1.offsetHeight
    else{
      scroll.scrollTop++
    }
  }
  var MyMar2=setInterval(Marquee2,speed)
  scroll.onmouseover=function() {clearInterval(MyMar2)}
  scroll.onmouseout=function() {MyMar2=setInterval(Marquee2,speed)}
</script>

</body>
</html>
```

### 文字超出现实省略号：

 单行：
 设置高度，并且 :
 ```
 .line-clamp-1{
 text-overflow:ellipsis;
 overflow:hidden;
 white-space:nowrap;
 }
 ```
 
两行或以上：
```
.line-clamp-2 {
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  -o-line-clamp: 2;
  -ms-line-clamp: 2;
  line-clamp: 2;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: -ms-box;
  display: box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}



 .line-clamp-4 {
  -webkit-line-clamp: 4;
  -moz-line-clamp: 4;
  -o-line-clamp: 4;
  -ms-line-clamp: 4;
  line-clamp: 4;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: -ms-box;
  display: box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
```



### What does void 0 mean?

void[MDN] is a prefix keyword that takes one argument and always returns undefined.

Examples

void 0
void (0)
void "hello"
void (new Date())
//all will return undefined

void 0 returns undefined and can not be overwritten while undefined can be overwritten.



### location.hash 和 location.search

例如，对于http://www.example.com/index.html?a=vvv#print
其中，location.search 是?a=vvv，而location.hash是#print


### Gulp安装及配合组件构建前端开发一体化：
http://www.dbpoo.com/getting-started-with-gulp/
gulp的官方文档：
https://github.com/gulpjs/gulp/blob/master/docs/API.md
gulp插件搜索：
http://gulpjs.com/plugins/
使用一个插件时注意它有没有依赖于其它的插件，如果有，则需要先安装好。
然后要修改nwcard.home的index.js的中的如下内容：
var RPC = {
        getDataList: "/home/card/getDataList.json"
};
实际就是在/card前面加了/home，这样才能访问到数据。


### 对小数进行四舍五入的方法：

rounded = Math.round(somenum);
rounded = ~~ (0.5 + somenum); //～表示取反，通过两个取反（取反再取反）来让小数丢失
rounded = (0.5 + somenum) | 0; 通过or运算来让小数丢失
rounded = (0.5 + somenum) << 0;通过移位运算来让小数丢失
上述四种方法中，后三种都是hack方法，但是以最后一种方法的效率最高。详见：
http://jsperf.com/math-round-vs-hack/3

### 提高canvas画布性能的几种方法：
英文：http://www.html5rocks.com/en/tutorials/canvas/performance/
中文：http://www.cnblogs.com/rhcad/archive/2012/11/17/2774794.html

1.PRE-RENDER TO AN OFF-SCREEN CANVAS

 我们在写一个游戏的时候常常会遇到在多个连续的帧中重绘相似的物体的情况。在这中情况下，你可以通过预渲染场景中的大部分物体来获取巨大的性能提 升。预渲染即在一个或者多个临时的不会在屏幕上显示的canvas中渲染临时的图像，然后再把这些不可见的canvas作为图像渲染到可见的canvas 中。对于计算机图形学比较熟悉的朋友应该都知道，这个技术也被称做display list。

例如，假定你在重绘以每秒60帧运行的Mario。你既可以在每一帧重绘他的帽子、胡子和“M”也可以在运行动画前预渲染Mario。

没有预渲染的情况：

// canvas, context are defined  
function render() {  
  drawMario(context);  
  requestAnimationFrame(render);  
}  
预渲染的情况：

var m_canvas = document.createElement('canvas');  
m_canvas.width = 64;  
m_canvas.height = 64;  
var m_context = m_canvas.getContext(‘2d’);  
drawMario(m_context);  
function render() {  
  context.drawImage(m_canvas, 0, 0);  
  requestAnimationFrame(render);  
}  
关于requestAnimationFrame的使用方法将在后续部分做详细的讲述。下面的图标说明了显示了利用预渲染技术所带来的性能改善情况。（来自于jsperf）：


当渲染操作（例如上例中的drawmario）开销很大时该方法将非常有效。其中很耗资源的文本渲染操作就是一个很好的例子。从下表你可以看到利用预渲染操作所带来的强烈的性能提升。（来自于jsperf）:


然而，观察上边的例子我们可以看出松散的预渲染（pre-renderde loose）性能很差。当使用预渲染的方法时，我们要确保临时的canvas恰好适应你准备渲染的图片的大小，否则过大的canvas会导致我们获取的性 能提升被将一个较大的画布复制到另外一个画布的操作带来的性能损失所抵消掉。

上述的测试用例中紧凑的canvas相当的小：

can2.width = 100;  
can2.height = 40;  
如下宽松的canvas将导致糟糕的性能：

can3.width = 300;  
can3.height = 100;  


2.BATCH CANVAS CALLS TOGETHER

因为绘图是一个代价昂贵的操作，因此，用一个长的指令集载入将绘图状态机载入，然后再一股脑的全部写入到video缓冲区。这样会会更佳有效率。

例如，当需要画对条线条时先创建一条包含所有线条的路经然后用一个draw调用将比分别单独的画每一条线条要高效的多：

or (var i = 0; i < points.length - 1; i++) {  
  var p1 = points[i];  
  var p2 = points[i+1];  
  context.beginPath();  
  context.moveTo(p1.x, p1.y);  
  context.lineTo(p2.x, p2.y);  
  context.stroke();  
}  
通过绘制一个包含多条线条的路径我们可以获得更好的性能：

ontext.beginPath();  
for (var i = 0; i < points.length - 1; i++) {  
  var p1 = points[i];  
  var p2 = points[i+1];  
  context.moveTo(p1.x, p1.y);  
  context.lineTo(p2.x, p2.y);  
}  
context.stroke();  
这个方法也适用于HTML5 canvas。比如，当我们画一条复杂的路径时，将所有的点放到路径中会比分别单独的绘制各个部分要高效的多（jsperf）：


然而，需要注意的是，对于canvas来说存在一个重要的例外情况：若欲绘制的对象的部件中含有小的边界框（例如，垂直的线条或者水平的线条），那么单独的渲染这些线条或许会更加有效（jsperf）：




3.AVOID UNNECESSARY CANVAS STATE CHANGES

HTML5 canvas元素是在一个状态机之上实现的。状态机可以跟踪诸如fill、stroke-style以及组成当前路径的previous points等等。在试图优化绘图性能时，我们往往将注意力只放在图形渲染上。实际上，操纵状态机也会导致性能上的开销。

例如，如果你使用多种填充色来渲染一个场景，按照不同的颜色分别渲染要比通过canvas上的布局来进行渲染要更加节省资源。为了渲染一副条纹的图案，你可以这样渲染：用一种颜色渲染一条线条，然后改变颜色，渲染下一条线条，如此反复：

for (var i = 0; i < STRIPES; i++) {  
  context.fillStyle = (i % 2 ? COLOR1 : COLOR2);  
  context.fillRect(i * GAP, 0, GAP, 480);  
}  
也可以先用一种颜色渲染所有的偶数线条再用另外一种染色渲染所有的基数线条：

context.fillStyle = COLOR1;  
for (var i = 0; i < STRIPES/2; i++) {  
  context.fillRect((i*2) * GAP, 0, GAP, 480);  
}  
context.fillStyle = COLOR2;  
for (var i = 0; i < STRIPES/2; i++) {  
  context.fillRect((i*2+1) * GAP, 0, GAP, 480);  
}  
下面的性能测试用例分别用上边两种方法绘制了一副交错的细条纹图案（jsperf）：


正如我们预期的，交错改变状态的方法要慢的多，原因是变化状态机是有额外开销的。


4.RENDER SCREEN DIFFERENCES ONLY, NOT THE WHOLE  NEW STATE

这个很容易理解，在屏幕上绘制较少的东西要比绘制大量的东西节省资源。重绘时如果只有少量的差异你可以通过仅仅重绘差异部分来获得显著的性能提升。换句话说，不要在重绘前清除整个画布。：

context.fillRect(0, 0, canvas.width, canvas.height);  
跟踪已绘制部分的边界框，仅仅清理这个边界之内的东西：

context.fillRect(last.x, last.y, last.width, last.height);  
下面的测试用例说明了这一点。该测试用例中绘制了一个穿过屏幕的白点（jsperf）：


如果您对计算机图形学比较熟悉，你或许应该知道这项技术也叫做“redraw technique”，这项技术会保存前一个渲染操作的边界框，下一次绘制前仅仅清理这一部分的内容。

这项技术也适用于基于像素的渲染环境。这篇名为JavaScript NIntendo emulator tallk的文章说明了这一点。


5.USE MUTIPLE LAYERED CANVASES FOR COMPLEX SCENES

我们前边提到过，绘制一副较大的图片代价是很高昂的因此我们应尽可能的避免。除了前边讲到的利用另外得不可见的canvas进行预渲染外，我们也可以叠在 一起的多层canvas。图哦你的过利用前景的透明度，我们可以在渲染时依靠GPU整合不同的alpha值。你可以像如下这么设置，两个绝对定位的 canvas一个在另一个的上边：

<canvas id="bg" width="640" height="480" style="position: absolute; z-index: 0">  
</canvas>  
<canvas id="fg" width="640" height="480" style="position: absolute; z-index: 1">  
</canvas>  
相对于仅仅有一个canvas的情况来讲，这个方法的优势在于，当我们需要绘制或者清理前景canvas时，我们不需要每次都修改背景 canvas。如果你的游戏或者多媒体应用可以分成前景和背景这样的情况，那么请考虑分贝渲染前景和背景来获取显著的性能提升。下面的图表比较了只有一个 canvas的情况和有前景背景两个canvas而你只需要清理和重绘前景的情况(jsperf)：


你可以用相较慢的速度（相对于前景）来渲染背景，这样便可利用人眼的一些视觉特性达到一定程度的立体感，这样会更吸引用户的眼球。比如，你可以在每一帧中渲染前景而仅仅每N帧才渲染背景。

注意，这个方法也可以推广到包含更多canvas曾的复合canvas。如果你的应用利用更多的曾会运行的更好时请利用这种方法。


6.AVOID SHADOWBLUR

跟其他很多绘图环境一样，HTML5 canvas允许开发者对绘图基元使用阴影效果，然而，这项操作是相当耗费资源的。

context.shadowOffsetX = 5;  
context.shadowOffsetY = 5;  
context.shadowBlur = 4;  
context.shadowColor = 'rgba(255, 0, 0, 0.5)';  
context.fillRect(20, 20, 150, 100);  
下面的测试显示了绘制同一场景使用何不使用阴影效果所带来的显著的性能差异（jsperf）：




7.KNOW VARIOUS WAYS TO CLEAR THE CANVAS

因为HTML5 canvas 是一种即时模式（immediate mode）的绘图范式（drawing paradigm），因此场景在每一帧都必需重绘。正因为此，清楚canvas的操作对于 HTML5 应用或者游戏来说有着根本的重要性。

正如在 避免 canvas 状态变化的一节中提到的，清楚整个canvas的操作往往是不可取的。如果你必须这样做的话有两种方法可供选择：调用

context.clearRect(0, 0, width, height)  
或者使用 canvas特定的一个技巧

canvas.width = canvas.width  
在书写本文的时候，cleaRect方法普遍优越于重置canvas宽度的方法。但是，在某些情况下，在Chrome14中使用重置canvas宽度的技巧要比clearRect方法快很多（jsperf）：


请谨慎使用这一技巧，因为它很大程度上依赖于底层的canvas实现，因此很容易发生变化，欲了解更多信息请参见 Simon Sarris 的关于清除画布的文章。



8.AVOID FLOATING POINT COORDINATES

HTML5 canvas 支持子像素渲染（sub-pixel rendering），而且没有办法关闭这一功能。如果你绘制非整数坐标他会自动使用抗锯齿失真以使边缘平滑。以下是相应的视觉效果（参见Seb Lee-Delisle的关于子像素画布性能的文章）


如果平滑的精灵并非您期望的效果，那么使用 Math.floor方法或者Math.round方法将你的浮点坐标转换成整数坐标将大大提高运行速度(jsperf)：


为使浮点坐标抓换为整数坐标你可以使用许多聪明的技巧，其中性能最优越的方法莫过于将数值加0.5然后对所得结果进行移位运算以消除小数部分。

// With a bitwise or.  
rounded = (0.5 + somenum) | 0;  
// A double bitwise not.  
rounded = ~~ (0.5 + somenum);  
// Finally, a left bitwise shift.  
rounded = (0.5 + somenum) << 0;  
两种方法性能对比如下（jsperf）：


9.OPTIMIZE YOUR ANIMATIONS WITH ‘REQUESTANIMATIONFRAME’

相对较新的 requeatAnimationFrame API是在浏览器中实现交互式应用的推荐标准。与传统的以固定频率命令浏览器进行渲染不同，该方法可以更友善的对待浏览器，它会在浏览器可用的时候使其来 渲染。这样带来的另外一个好处是当页面不可见的时候，它会很聪明的停止渲染。

requestAnimationFrame调用的目标是以60帧每秒的速度来调用，但是他并不能保证做到。所以你要跟踪从上一次调用导线在共花了多长时间。这看起来可能如下所示：

var x = 100;  
var y = 100;  
var lastRender = new Date();  
function render() {  
  var delta = new Date() - lastRender;  
  x += delta;  
  y += delta;  
  context.fillRect(x, y, W, H);  
  requestAnimationFrame(render);  
}  
render();  
注意requestAnimationFrame不仅仅适用于canvas 还适用于诸如WebGL的渲染技术。

在书写本文时，这个API仅仅适用于Chrome，Safari以及Firefox，所以你应该使用这一代码片段

MOST MOBILE CANVAS IMPLEMENTATION ARE SLOW

让我们来讨论一下移动平台。不幸的是在写这篇文章的时候，只有IOS 5.0beta 上运行的Safari1.5拥有GPU加速的移动平台canvas实现。如果没有GPU加速，移动平台的浏览器一般没有足够强大的CPU来处理基于 canvas的应用。上述的JSperf测试用例在移动平台的运行结果要比桌面型平台的结果糟糕很多。这极大的限制了跨设备类应用的成功运行。
CONCLUSION

j简要的讲，本文较全面的描述了各种十分有用优化方法以帮助开发者开发住性能优越的基于HTML5 canvas的项目。你已经学会了一些新的东西，赶紧去优化你那令人敬畏的创造吧！如果你还没有创建过一个应用或者游戏，那么请到Chrome Experiment 和Creative JS看看吧，这里能够激发你的灵感。


### handlebars模版的使用：

通过{{}}取出来的内容，都会经过编码，也就是说，如果取出的内容中包含html标签，会被转码成纯文本，不会被当成html解析，实际上就是做了类似这样的操作：把<用&lt;替代。

这样做是很好的，既可以显示html代码，又可以避免xss注入。这个功能在做代码展示的时候是非常有用的。

但是有时候我们可能需要解析html，不要转码，很简单，把{{}}换成{{{}}}就可以啦。

由于该模板的条件判断语句功能比较弱，可以建立helper方法
{{#compare age 20}}
        <tr>
                <td>{{name}}</td>
                <td>{{sex}}</td>
                <td>{{age}}</td>
        </tr>
{{else}}

//注册一个比较大小的Helper,判断v1是否大于v2
Handlebars.registerHelper("compare",function(v1,v2,options){
    if(v1>v2){
        //满足添加继续执行
        return options.fn(this);
    }else{
        //不满足条件执行{{else}}部分
        return options.inverse(this);
    }
});

另一种helper方法：
<td>{{transformat sex}}</td>

//注册一个翻译用的Helper，0翻译成男，1翻译成女
Handlebars.registerHelper("transformat",function(value){
    if(value==0){
        return "男";
    }else if(value==1){
        return "女";
    }
});

用with改变上下文：
{{#with favorite}}
        {{#each this}}
                <p>{{this}}</p>
        {{/each}}
{{/with}}

 Handlebars.js中获取循环索引很简单，只需在循环中使用{{@index}}即可。
 虽然用{{@index}}可以获取到索引，但遗憾的是，索引是从0开始的。。。这样让人看起来很不舒服。因此，我们可以使用一个Helper来让索引+1，变成从1开始。
例如：
<td>{{addOne @index}}</td>

//注册一个Handlebars Helper,用来将索引+1，因为默认是从0开始的
Handlebars.registerHelper("addOne",function(index,options){
        return parseInt(index)+1;
});


<!DOCTYPE html>
<html>
  <head>
    <META http-equiv=Content-Type content="text/html; charset=utf-8">
    <title>each嵌套 - by 杨元</title>
  </head>
  <body>
    <h1>each嵌套</h1>
    <!--基础html框架-->
    <div id="dataList"></div>
    
    <!--插件引用-->
    <script type="text/javascript" src="script/jquery.js"></script>
    <script type="text/javascript" src="script/handlebars-1.0.0.beta.6.js"></script>
    
    <!--Handlebars.js模版-->
    <!--Handlebars.js模版放在script标签中，保留了html原有层次结构,模版中要写一些操作语句-->
    <!--id可以用来唯一确定一个模版,type是模版固定的写法-->
    <script id="table-template" type="text/x-handlebars-template">
      {{#each this}}
        {{#each info}}
          {{../name}}的{{this}}<br>
        {{/each}}
      {{/each}}
    </script>
    
    <!--进行数据处理、html构造-->
    <script type="text/javascript">
      $(document).ready(function() {
        //模拟的json对象
         var data = [{
                      "name":"张三",
                      "info":[
                        "眼睛",
                        "耳朵",
                        "鼻子"
                      ]
                    },{
                      "name":"李四",
                      "info":[
                        "爸爸",
                        "妈妈",
                        "妻子"
                      ]
                    }];
        
        //注册一个Handlebars模版，通过id找到某一个模版，获取模版的html框架
        //$("#table-template").html()是jquery的语法，不懂的童鞋请恶补。。。
        var myTemplate = Handlebars.compile($("#table-template").html());
        
        //将json对象用刚刚注册的Handlebars模版封装，得到最终的html，插入到基础table中。
        $('#dataList').html(myTemplate(data));
      });
    </script>
  </body>
</html>

上边的例子演示了两个关键点：each嵌套的可实现性、如何在each嵌套中读取父each中的数据。

例子很简单，info本身是一个信息列表，是属于某个人的，我们先用each遍历所有的人，然后再遍历每个人的info信息，这样就形成了each嵌套。但是我们想在内层each中获取外层each的数据，达到“谁的什么”这样的显示效果。

显然，如果直接在内层each中使用{{name}}，是取不到任何数据的，因为内层each的上下文是info，而name属性在表示人的上下文中。

此时，可以用{{../name}}从内层each获取上一级each的name属性，语法和html的路径表示一样，简单吧？

{{#unless}}这个语法是反向的if语法也就是当判断的值为false时他会渲染DOM
例如：

{{#unless data}}
<ul id="list">  
    {{#each list}}
        <li>{{this}}</li>
    {{/each}}
</ul>  
{{else}}
    <p>{{error}}</p>
{{/unless}}


function sendMtop(){
  var args  = [].slice.call(arguments);
  var isRet = false, isTimeout = false;
  var success = typeof args[1] == 'function' ? args[1] : null;
  var error = typeof args[2] == 'function' ? args[2] : null;

  window.setTimeout(function(){
    isTimeout = true;
    if(isRet) {
      return;
    }

    if(error){ error({ data: { code: -99999  } }); }
  }, 20000);

  var fnOK  = function(){
    isRet = true;
    if(isTimeout) { return; }
    if(success){ success.apply(null, [].slice.call(arguments)); }
  };


  var fnErr = function(){
    isRet = true;
    if(isTimeout) { return; }
    if(error){ error.apply(null, [].slice.call(arguments)); }
  };

  args[1] = fnOK;
  args[2] = fnErr;
  lib.mtop.request.apply(lib.mtop.request, args);
}

Handlebar的注释（comments）

Handlebars也可以使用注释写法如下

{{! handlebars comments }}
Handlebars的访问（Path）

Handlebar支持路径和mustache,Handlebar还支持嵌套的路径，使得能够查找嵌套低于当前上下文的属性

可以通过.来访问属性也可以使用../,来访问父级属性。
例如:（使用.访问的例子）

<h1>{{author.id}}</h1>  
对应json数据

{
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
  };
例如：（使用../访问）

{{#with person}}
    <h1>{{../company.name}}</h1>
{{/with}}
对应适用json数据

{
    "person":
    { "name": "Alan" },
        company:
    {"name": "Rad, Inc." }
};


call 和 apply的使用：

var Person = function(name,age){
      this.name = name;
      this.age = age;
    };
    var Student = function(name,age,description){
      //用Student去执行Person里面的内容
//      Person.apply(this,arguments);
      Person.call(this,name,age,description);
      this.description = description;
    };
    Student.prototype = {
      sayHi: function(){
        alert('Hi,my name is '+this.name+'. I am '+this.age+' years old! And my description is '+this.description);
      }
    }
    var m = new Student('tom',20,'靠谱');
    m.sayHi();

    


git删除本地分支：
先切换到其它分支，然后用git branch -d 分支名来删除本地的分支


在使用underscore模板和bootstrap框架开发的页面，underscore模板中有一个a标签i href="#select" ，结果把页面的html代码给截断了，把它改成 href="#select1" 居然就没有问题了。

在由多个弹出层使用同一个外层容器时，如果对弹出层使用setTimeout事件，要特别注意，有可能出现如下错误。你本来是需要对弹出层容器里的内容a做setTimeout处理，但是实际上等到超时事件执行时，弹出层容器里的内容已经换成了内容b，所以事件就错误的作用在了内容b上面。


iframe中的js如何查找其父窗口的元素？如何设置弹窗的定位？

/*如果存在id为J_IFrame的iframe，则弹出窗口时禁止J_IFrame超出时的滚动，并禁用其父窗口超出时的滚动*/
  function setModalPosition(){
    if($('.myModalMask').length==0){
      $('body').append('<div class="myModalMask"></div>');
    }
    if($("#J_IFrame",window.parent.document).length > 0){
      $("#J_IFrame",window.parent.document).attr('scrolling','no');//在父窗口中找到iframe本身，进行'scrolling'为'no'的设置
      $('html, body',window.parent.document).css({'overflow':'hidden'});
      $('#myModal').css({'top':$(window.parent).scrollTop()+60}); //$(window.parent).scrollTop()为iframe父窗口的scrollTop()
    }
  }

  /*如果存在id为J_IFrame的iframe，则弹出窗口关闭时允许J_IFrame超出时可滚动，并让其父窗口超出时可滚动*/
  function unsetModalPosition() {
    $('body').find('.myModalMask').remove();
    if ($("#J_IFrame", window.parent.document).length > 0) {
      $("#J_IFrame", window.parent.document).attr('scrolling', 'auto');
      $('html, body', window.parent.document).css({'overflow': 'auto'});
    }
  }


问题描述
在 IE Chrome Safari 中，IFRAME 元素引入的子页面 HTML 元素的 "overflow:hidden" 会使 IFRAME 元素的 scrolling 属性失效，IFRAME 元素不会出现滚动条。

在 Chrome Safari 中，虽然 IFRAME 元素的 scrolling 属性为 "no"，但若其子页面的 HTML 或 BODY 元素的 'overflow' 特性为 'scroll'，则 IFRAME 仍会被渲染上滚动条。

造成的影响
各浏览器 IFRAME 元素的 scrolling 属性与其子页面 HTML 与 BODY 元素 'overflow' 特性的制约关系上的差异，可能造成子页面滚动条的渲染差异。

在用js改变iframe的scrolling属性的情况下，在某个情况下出现了明明iframe的scrolling属性的值已被js修改回auto，但是该iframe的内容却不可以滚动。
最后给该iframe的src所指向的页面添加了如下样式解决了该问题：
html,body{
  overflow:auto;
}
怀疑是动态修改scrolling所导致的浏览器渲染问题。


在使用myDate97控件时，无法捕获日期input框的change事件。最后的解决办法是在该input框上添加了属性 onFocus="WdatePicker({lang:'zh-cn',onpicked:function(){$(this).change()}})" readonly style="cursor: default;background-color: #fff"，通过onpicked来触发change 事件。


### 设置css3倒影:

-webkit-box-reflect: below 0 -webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(.5, transparent), to(rgba(255,255,255,.3)));


### webp的检测和使用：

不使用 Cookie

不使用 Cookie 而保存用户信息的方法，大家肯定都想到 localStorage 了。我们转而使用 localStorage 的理由是：支持 WebP 的浏览器都是高级浏览器，它们一定都支持 localStorage。于是我们得到第三版的检测代码如下：

function detectWebp () {
    if (!window.localStorage || typeof localStorage !== 'object') return;

    var name = 'webpa'; // webp available
    if (!localStorage.getItem(name) || (localStorage.getItem(name) !== 'available' && localStorage.getItem(name) !== 'disable')) {

        var img = document.createElement('img');

        img.onload = function () {
            try {
                localStorage.setItem(name, 'available');
            } catch (ex) {
            }
        };

        img.onerror = function () {
        try {
                localStorage.setItem(name, 'disable');
            } catch (ex) {
            }
        };
        img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    }
}
更优的方案

使用 loacalstorage 会带来另一个问题：美团有很多子域，当用户切换城市后，每个子域下都会保存一个 localStorage 的记录，从而浪费空间。本组同学实现了一个跨域 localStorage 的功能：通过通信机制实现将检测结果保存在www子域中。实现的原理是通过在多个子域中的页面中插入www 子域下的 iframe。

使用这种方案必须通过回调的方式获取信息，且需要等到 iframe 加载完全。但切换图片图片是在非常前期进行的，如果依赖这种方案，会导致所有图片的渲染比较靠后进行。

回过头来看，其实美团是提供本地服务的，频繁切换城市的情况非常少。所以，使用原生的 localStorage 是可行的。

为了实现为了能给浏览器种下 WebP 支持能力的“种子”，在检测代码上线两天后再上线替换逻辑。

切换逻辑

之前提到，图片服务器已经提供了 WebP 格式图片，只需请求带有 .webp 链接的图片即可。切换 WebP 的原理很简单，就是给 img 的 src 属性切换不同的链接即可。

因为美团中85%以上的图片均是懒加载的，这就不依赖服务器来替换图片 URL 。我们只需要在 JavaScript 替换图片 URL 的时候，选择是否在 URL 后面加上'.webp'。

于是，我们只是在懒加载函数中增加一个如下切换逻辑即可：

_getwebpsrc: function (ndimg, imgsrc) {
    var needwebp = false,
        src = '';
    if (window.localStorage && typeof localStorage === 'object') {
        needwebp = localStorage.getitem('webpa') === 'available';
    }
    src = needwebp ? imgsrc + '.webp' : imgsrc;

    return src;
}
懒加载的功能是在合适的时机设置 img 的 src 属性，而只要在替换之前，使用如上逻辑设置要替换的值即可。

上线方案

具体在上线 WebP 的时候，我们给测试用户的页面中的图片增加"J-webp"属性，而在替换逻辑中也只替换带有 J-webp 属性的图片。替换逻辑改成如下：

_getwebpsrc: function (ndimg, imgsrc) {
    var webp_class = 'J-webp',
        needwebp = false,
        src = '';
    if (window.localStorage && typeof localStorage === 'object') {
        needwebp = localStorage.getitem('webpa') === 'available' && ndimg.hasClass(webp_class);
    }
    src = needwebp ? imgsrc + '.webp' : imgsrc;

    return src;
}


为什么自定义的jsonpCallback有时会报出错误：Uncaught TypeError: myJsonpCallback is not a function (in AJAX callback)？

  
The problem is in how jQuery works with callback with JSONP. Here's the idea:

JSONP is fired;Callback is set;JSONP returns;Callback is fired;Callback is deleted;

Now everything works fine if you don't define custom jsonpCallback (by default jQuery assigns unique callback to each JSONP request). Now what happens if you do and you fire two JSONP request at the same time?

JSONP1 is fired;Callback with name callback is set.JSONP2 is fired;Callback callback is overriden by JSONP2;JSONP1 returns;Callback callback is fired for JSONP1;JSONP1 deletes callback;JSONP2 returns;JSONP2 tries to fire callback, but that is already deleted;TypeError is thrown.

Simple solution is not to override jsonpCallback option.

大致的意思是本来$.ajax发送请求时已经带上了形如callback=jQuery111308027742146514356_1438857413806的callback参数了，它自带的这每个callback是不同的，所以不会有冲突。而你如果在$.ajax中指定jsonp: 'callback', jsonpCallback: "myJsonpCallback",这两个参数的话，页面中有多个ajax请求时，互相之间会干扰。比如，在第一个ajax请求发出后，第二个ajax请求发出，并且很快第二个ajax请求收到反馈，然后把myJsonpCallback删除掉，这样当第一个请求返回回来时，myJsonpCallback已经没有了，所以就会报错。


!!的作用是什么？
undefined、null、0、''、false之前加上一个!结果都是true
undefined、null、0、''、false之前加上两个!结果都是false
所以，!!的作用就在于将undefined、null、0、''、false统一转成false
对于布尔类型的true和false，前面加一个!值会取反
但要注意，对于字符串类型的'true'和'false'，前面加一个!结果都是false，前面加两个!，结果都是true





点击chrome工具栏右上的齿轮按钮，在general选项卡中，选中Disable cache (while DevTools is open)。


png图片优化地址：
优化的比例非常的高。


关于字体的使用：

PC

需要考虑 Windows Mac Linux 几个平台，建议使用如下设置：

font-family: tahoma,arial,'Hiragino Sans GB',\5b8b\4f53,sans-serif
tahoma arial 两款字体在多数系统里默认自带，英文也比较好看；
'Hiragino Sans GB' 仅存在于 Mac 里，从日文字体修改而来，中文显示效果很棒，译名为「冬青黑体」；
\5b8b\4f53 这个主要是兼容 XP 系统，就是传说中的「宋体」了；
或者

font-family: 'Lantinghei SC','Microsoft YaHei','WenQuanYi Micro Hei',sans-serif
'Lantinghei SC' 这款字体仅存在于 Mac 里，中文名为「兰亭黑」，中文显示效果纤细，比较好看；
'Microsoft YaHei' 为微软雅黑的英文字体名称，适用于 Vista 以上版本的 Windows 系统；
'WenQuanYi Micro Hei' 为了适配 Linux 系统，多数中文 Linux 都默认带上了文泉驿字体。





zepto默认构建包含以下模块： Core, Ajax, Event, Form, IE.，需要更多的其它模板功能，需要自己填加到JS文件里，再压缩一下。github有所有的模块打包下载



几个常用的css3动画属性：

 -webkit-animation-name:'goup';/*动画属性名，也就是keyframes定义的动画名*/
-webkit-animation-duration: 1s;/*动画持续时间*/
-webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
-webkit-animation-delay: 0s;/*动画延迟时间*/
 -webkit-animation-iteration-count: 0;/*定义播放次数，infinite为无限次*/
-webkit-animation-direction: alternate;/*定义动画方式，normal  默认值，表示动画应该正常播放；alternate 表示动画应该轮流反向播放。*/


第一屏中手指向上滑动后整屏向上滚走的特效：
function next(){
    var startH = 0, endH = 0;

    $('.section0').height(window.innerHeight);

    $('.section0').on('touchstart', function(e){
        var touch = e.targetTouches[0];

        startH = touch.pageY;
    });

    $('.section0').on('touchmove', function(e){
        return false;
    });

    $('.section0').on('touchend', function(e){
        var touch = e.changedTouches[0];

        endH = touch.pageY;

        if(endH < startH){
            $.scrollTo({
                endY: window.innerHeight
            });
        }
    });
}

changedTouches/touches/targetTouches

touches：为屏幕上所有手指的信息

PS：因为手机屏幕支持多点触屏，所以这里的参数就与手机有所不同

targetTouches：手指在目标区域的手指信息

changedTouches：最近一次触发该事件的手指信息

比如两个手指同时触发事件，2个手指都在区域内，则容量为2，如果是先后离开的的话，就会先触发一次再触发一次，这里的length就是1，只统计最新的

PS：一般changedTouches的length都是1

touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息
这里要使用哪个数据各位自己看着办吧，我也不是十分清晰（我这里还是使用changedTouches吧）

参数信息(changedTouches[0])

几个重要通用点：

① clientX：在显示区的坐标

② pageX：鼠标在页面上的位置

③ screenX：鼠标在显示屏上的坐标（我是双屏所以x很大）

④ target：当前元素

几个重要不同点：

① layerX：这个是相对距离，这个不同，所以不要用这个东西了

② ......


看万象平台代码的收获：

1、如果定义多个变量时，可以采取如下方式，把,号提前，以便于编辑代码和防止漏写逗号：
var a = 1
     , b = 2
     , c = 3;
2、对于有多个构造函数.prototype的情况，建议写成:
fn = 构造函数.ptototype，便于后面写多个。
例如：

fn.init = function(){
  
}

fn.render = function(){
  
}

...

不写成构造函数.prototype = {
  ...
}
的原因是这样的话一个大括号之间的语句太多，不便于代码分块。看起来很累眼。

3、可以写一些公共的处理函数库

比如，下面是返回指定的格式的日期时间的方法：

var defaultOpts = {
   timeout : 10 * 1000,  //默认10秒超时
};

var Common = function (opts) {
        this.opts = $.extend({}, defaultOpts, opts);
    };
    var fn = Common.prototype;
    
    /**
     * 获取指定格式的系统时间
     * @param format 日期格式 如： "yyyy-MM-dd"
     * @return 指定格式的日期字符串 如： "2013-06-27"
     */
    fn.getFormatDate = function(format){
      var _self = this
        , param = _self.opts
      , date = new Date()
      , fullYear = date.getFullYear()
      , month = date.getMonth() + 1 + ""
      , day = date.getDate() + ""
      , hour = date.getHours() + ""
      , min = date.getMinutes() + ""
      , second = date.getSeconds() + ""
      , result = format
      , checkLength = function(str){
        if(str.length == 1){
          str = "0" + str;
          }
        return str;
      };
      month = checkLength(month);
      day = checkLength(day);
      hour = checkLength(hour);
      min = checkLength(min);
      second = checkLength(second);
      if(_self.isNotEmpty(result)){
        result = result.indexOf("yyyy") >= 0 ? result.replace("yyyy",fullYear) : result;
        result = result.indexOf("MM") >= 0 ? result.replace("MM",month) : result;
        result = result.indexOf("dd") >= 0 ? result.replace("dd",day) : result;
        result = result.indexOf("hh") >= 0 ? result.replace("hh",hour) : result;
        result = result.indexOf("mm") >= 0 ? result.replace("mm",min) : result;
        result = result.indexOf("ss") >= 0 ? result.replace("ss",second) : result;
      }
      return result;
    };

    封装ajax请求：

    /**
     * 发送异步请求
     * @param obj       
   *    包括url,
   *    data,
   *    type:get\post,
   *    datatype:json\html\text
     * @param callback 回到函数
     */
    fn.sendAjax = function(obj,callback,errorBack){
       var _self = this
       , param = _self.opts
       , timeout = obj.timeout ? obj.timeout : param.timeout;
       
       $.ajax({
         url : obj.url,
         data : obj.data,
         dataType : obj.dataType,
         type : obj.type,
         timeout : timeout
       }).done(function(o) {
         if(callback){
            callback(o);
         }         
       }).error(function(o){
         if(errorBack){
           errorBack(o);
         }
       });
    };

   



微信分享页面开发中：

用接口生成签名信息，以便于作为调试数据，生成一次可以用两个小时，两个小时后失效.

在require中require了zepto，然后在页面中又用script标签引入了一个zepto，两个zepto会产生冲突，估计原因是多个jsonp的ajax请求时，callback参数出现了共用，导致一个ajax请求结束时候把callback函数（如jsonp1、jsonp2等），另一个使用了同名ajax 请求再回来的时候，callback参数被删除了。解决办法是把requrie 里面的zepto去掉，把script标签对zepto的引用提前到require.js的引用之前。

mac如何命令行查看本机IP？
终端中输入ifconfig，查看其中en0里面的inet即可。

r.js的使用：

grunt.registerTask(taskName, [description, ] taskFunction) 

grunt.registerTask的第一个参数是任务名，第二个参数可选，是任务描述，第三个参数是任务函数。



下面这个函数可以用于懒加载：

getBoundingClientRect()

    这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。

var box=document.getElementById('box');         // 获取元素

alert(box.getBoundingClientRect().top);         // 元素上边距离页面上边的距离

alert(box.getBoundingClientRect().right);       // 元素右边距离页面左边的距离

alert(box.getBoundingClientRect().bottom);      // 元素下边距离页面上边的距离

alert(box.getBoundingClientRect().left);        // 元素左边距离页面左边的距离

注意：IE、Firefox3+、Opera9.5、Chrome、Safari支持，在IE中，默认坐标从(2,2)开始计算，导致最终距离比其他浏览器多出两个像素，我们需要做个兼容。

document.documentElement.clientTop;  // 非IE为0，IE为2

document.documentElement.clientLeft; // 非IE为0，IE为2

functiongGetRect (element) {

    var rect = element.getBoundingClientRect();

    var top = document.documentElement.clientTop;

    var left= document.documentElement.clientLeft;

    return{

        top    :   rect.top - top,

        bottom :   rect.bottom - top,

        left   :   rect.left - left,

        right  :   rect.right - left

    }

}

分别加上外边据、内边距、边框和滚动条，用于测试所有浏览器是否一致。



zepto 的get方法：

get()   ⇒ array
get(index)   ⇒ DOM node
从当前对象集合中获取所有元素或单个元素。当index参数不存在的时，以普通数组的方式返回所有的元素。当指定index时，只返回该置的元素。这点与eq不同，该方法返回的是DOM节点，不是Zepto对象集合。

var elements = $('h2')
elements.get()   //=> get all headings as an array
elements.get(0)  //=> get first heading node



ios系统上音频播放遇到的坑：
前几天做了一个H5活动页面，产品要求初始化播放音乐，因晓得H5 Audio标签支持Autoplay就没在意。 完了在手机上测试，发现手机上打开页面死活就是不会自动播放，点击播放按钮才可以播放，很是纠结。 然后网上查了下发现iOS上禁止了Audio的Autoplay属性，原因如下：

User Control of Downloads Over Cellular Networks

In Safari on iOS (for all devices, including iPad), where the user may be on a cellular network and be charged per data unit, preload and autoplay are disabled. No data is loaded until the user initiates it. This means the JavaScript play() and load() methods are also inactive until the user initiates playback, unless the play() or load() method is triggered by user action. In other words, a user-initiated Play button works, but an onLoad="play()" event does not.

This plays the movie: <input type="button" value="Play" onclick="document.myMovie.play()">

This does nothing on iOS: <body onload="document.myMovie.play()">

详细查看Safari HTML5 Audio and Video Guide

借助Google翻译了解到：苹果为了用户着想，禁止了Autoplay和JS "onload" 加载播放。

官方禁用，和产品沟通了下，产品发了"友站"网页给我说是可以让我参考下，确实可以，但代码太多，弃之。

还是去http://search.yahoo.com找答案了，在IBM开发者找到了答案：

// run on page load
var audio = document.getElementById('audio');
jQuery.ajax({
url: 'ajax.js',
async: false,
success: function() {
audio.play(); // audio will play in iOS before 4.2.1
}
});

详细查看IBM开发者

但iOS4.2.1以后就失效了，现在都iOS8了，真是无语了，但也没找到其它方法，就死马当活马医试一下，结果，神奇的一幕出现了，打开竟然自动播放音乐了，哈哈哈...

不是说失效了么，这是为何呢？哦，刚才只是在微信里打开的，我再用Safari打开就不会自动播放音乐了，还好，我们H5活动仅限微信里面打开。

好了，不过Bug马上又来了，测试发现一台安卓机在微信里打开也不能自动播放，我拿来试了下，确实如此，然后打开"友站"的发现也是不能自动播放，产品确认了下，让参考"友站"的优化一下，就是触摸一下就会自动播放。

document.addEventListener('touchstart', function(){ 
    audio.play();
}, false);
这次是真的好了，除了那台Android5.x系统的手机，其它在微信打开都可以自动播放了。

总结一下吧：

移动端Audio Autoplay

苹果认为这是种不友好的行为
安卓同上
我同上
国内流量很贵的，哎哟我的钱啊。 我们通过"投机"绕过系统限制而达到了目的，这样真的好吗？

这样对用户的体验真的好吗？

我们真的值得这样做么？


function mp3Stop(){
    try {
        mp3.currentTime = 0;
    } catch(error) { // iOS 6、7 中，Safari 处理 currentTime 会有异常
        if (error.code === 11) {
            function trackTo(evt) {
                evt.target.currentTime = 0;
                evt.target.removeEventListener("loadeddata", trackTo);
            }
            this.addEventListener("loadeddata", trackTo);
        }
    }
    mp3.pause();
}




javascript常见的20个问题与解决方法


1、offsetWidth/offsetHeight，clientWidth/clientHeight与scrollWidth/scrollHeight的区别
1）offsetWidth/offsetHeight返回值包含content+padding+border，效果与e.getBoundingClientRect()相同
2）clientWidth/clientHeight返回值只包含content+padding，如果有滚动条，也不包含滚动条
3）scrollWidth/scrollHeight返回值包含content+padding+溢出内容的尺寸

2、XMLHttpRequest通用属性和方法
1）readyState：表示请求状态的整数，取值：
UNSENT(0)：对象已创建
OPENED(1)：open()成功调用，在这个状态下，可以为xhr设置请求头，或者使用send()发送请求
HEADERS_RECEIVED(2)：所有重定向已经自动完成访问，并且最终响应的http头已经收到
LOADING(3)：响应体正在接收
DONE(4)：数据传输完成或者传输产生错误
2）onreadystatechange：readyState改变时调用的函数
3）status：服务器返回的http状态码（如：200,404）
4）statusText：服务器返回的http状态信息（如：ok，no content）
5）responseText：作为字符串形式的来自服务器的完整响应
6）responseXML：Document对象，表示服务器的响应解析成的XML文档
7）abort()：取消异步http请求
8）getAllResponseHeaders()：返回一个字符串，包含响应中服务器发送的全部http报头。每个报头都是一个用冒号分隔开的名/值对，并且使用一个回车/换行来分隔报头行
9）getResponseHeader(headerName)：返回headName对应的报头值
10）open(method,url,asynchronous [,user,password])：初始化准备发送到服务器上的请求
method：http方法，不区分大小写
url：请求发送的相对或绝对url
asynchronous：表示请求是否异步
user和password：提供身份验证
11）setRequestHeader(name,value)：设置http报头
12）send(body)：对服务器请求进行初始化。参数body包含请求的主体部分，对于post请求为键值对字符串；对于get请求，为null

3、focus/blur与focusin/focusout的区别与联系
1）focus/blur不冒泡，focusin/focusout冒泡
2）focus/blur兼容性好，focusin/focusout在除FireFox外的浏览器下都保持良好兼容性，如需使用事件托管，可考虑在FireFox下使用事件捕获elem.addEventListener('focus',handler,true)
3）可获得焦点的元素：
i.window
ii.链接被点击或键盘操作
iii.表单空间被点击或键盘操作
iv.设置tabindex属性的元素被点击或键盘操作

4、mouseover/mouseout与mouseenter/mouseleave的区别与联系
1）mouseover/mouseout是标准事件，所有浏览器都支持；mouseenter/mouseleave是IE5.5引入的特有事件，后来被DOM3标准采纳，现代标准浏览器也支持
2）mouseover/mouseout是冒泡事件；mouseenter/mouseleave不冒泡。需要为多个元素监听鼠标移入/出事件时，推荐mouseover/mouseout托管，提高性能
3）标准事件模型中event.target表示发生移入/出的元素，event.relatedTarget对应移出/入元素；在老IE中event.srcElement表示发生移入/出的元素，event.toElement表示移出的目标元素，event.fromElement表示移入时的来源元素
例子：鼠标从div#target元素移出时进行处理，判断逻辑如下：
<div id="target"><span>test</span></div>

<script type="text/javascript">
var target = document.getElementById('target');
if (target.addEventListener) {
target.addEventListener('mouseout', mouseoutHandler, false);
} else if (target.attachEvent) {
target.attachEvent('onmouseout', mouseoutHandler);
}

function mouseoutHandler(e) {
e = e || window.event;
var target = e.target || e.srcElement;

// 判断移出鼠标的元素是否为目标元素
if (target.id !== 'target') {
return;
}

// 判断鼠标是移出元素还是移到子元素
var relatedTarget = event.relatedTarget || e.toElement;
while (relatedTarget !== target
&& relatedTarget.nodeName.toUpperCase() !== 'BODY') {
relatedTarget = relatedTarget.parentNode;
}

// 如果相等，说明鼠标在元素内部移动
if (relatedTarget === target) {
return;
}

// 执行需要操作
//alert('鼠标移出');

}
</script>

 

5、sessionStorage，localStorage，cookie区别
1）都会在浏览器端保存，有大小限制，同源限制
2）cookie会在请求时发送到服务器，作为会话标识，服务器可修改cookie；web storage不会发送到服务器
3）cookie有path概念，子路径可以访问父路径cookie，父路径不能访问子路径cookie
4）有效期：cookie在设置的有效期内有效，默认为浏览器关闭；sessionStorage在窗口关闭前有效，localStorage长期有效，直到用户删除
5）共享：sessionStorage不能共享，localStorage在同源文档之间共享，cookie在同源且符合path规则的文档之间共享
6）localStorage的修改会触发其他文档窗口的update事件
7）cookie有secure属性，要求https传输
8）浏览器不能保存超过300个cookie，单个服务器不能超过20个，每个cookie不能超过4k。web storage大小支持能达到5M

6、javascript跨域通信
同源：两个文档同源需满足
1）协议相同
2）域名相同
3）端口相同
跨域通信：js进行DOM操作、通信时如果目标与当前窗口不满足同源条件，浏览器为了安全会阻止跨域操作。
跨域通信通常有以下方法：
1）如果是log之类的简单单项通信，新建<img>，<script>，<link>，<iframe>元素，通过src，href属性设置为目标url，实现跨域请求
2）如果请求json数据，使用<script>进行jsonp请求
3）现代浏览器中多窗口通信使用html5规范的targetWindow.postMessage(data,origin);其中data是需要发送的对象，origin是目标窗口的origin。window.addEventListener('message',handler,false);handler的event.data是postMessage发送来的数据，event.orgin是发送窗口的origin，event.source是发送消息的窗口引用
4）内部服务器代理请求跨域url，然后返回数据
5）跨域请求数据，现代浏览器可使用html5规范的cors功能，只要目标服务器返回http头部Access-Control-Allow-Origin:*即可像普通ajax一样访问跨域资源

7、javascript有哪几种数据类型？
六种基本数据类型：
undefined
null
string
boolean
number
symbol
一种引用类型
Object

8、什么是闭包？闭包有什么用？
闭包是在某个作用域内定义的函数，它可以访问这个作用域内的所有变量。
闭包作用域链通常包括三个部分：
1）函数本身作用域
2）闭包定义时的作用域
3）全局作用域
闭包常见用途：
1）创建特权方法用于访问控制
2）事件处理程序及回调

9、javascript有哪几种方法定义函数？
1）函数声明表达式
2）function操作符
3）Function构造函数
4）ES6：arrow function

10、应用程序存储和离线web应用
html5新增应用程序缓存，允许web应用将应用程序自身保存到用户浏览器中，用户离线状态也能访问。
1）为html元素设置manifest属性：<html manifest="myapp.appcache">，其中后缀名只是一个约定，真正识别方式是通过text/cache-manifest作为MIME类型。所以需要配置服务器保证设置正确
2）manifest文件首行为CACHE MANIFEST，其余就是要缓存的URL列表，每个一行，相对路径都相对于manifest文件的url。注释以#开头
3）url分为三种类型：CACHE为默认类型，NETWORK表示资源从不缓存，FALLBACK每行包含两个url，第二个url是指需要加载和存储在缓存中的资源，第一个url是一个前缀。任何匹配该前缀的url都不会缓存，如果从网络中载入这样的url失败的话，就会用第二个url指定的缓存资源来替代。以下是一个文件例子：
CACHE MANIFEST

CACHE:
myapp.html
myapp.css
myapp.js

FALLBACK:
videos/ offline_help.html

NETWORK:
cgi/

 

11、客户端存储localStorage和sessionStorage
1）localStorage有效期为永久，sessionStorage有效期为顶层窗口关闭前
2）同源文档可以读取并修改localStorage数据，sessionStorage只允许同一个窗口下的文档访问，如通过iframe引入的同源文档
3）Storage对象通常被当做普通js对象使用：通过设置属性来存取字符串值，也可以通过setItem(key,value)设置，getItem(key)读取，removeItem(key)删除，clear()删除所有数据，length表示已存储的数据项数目，key(index)返回对应索引的key
localStorage.setItem('x', 1); // storge x->1
localStorage.getItem('x); // return value of x

// 枚举所有存储的键值对
for (var i = 0, len = localStorage.length; i < len; ++i ) {
var name = localStorage.key(i);
var value = localStorage.getItem(name);
}

localStorage.removeItem('x'); // remove x
localStorage.clear(); // remove all data

 

12、cookie及其操作
1）cookie是web浏览器存储的少量数据，最早设计为服务器端使用，作为HTTP协议的扩展实现。cookie数据会自动在浏览器和服务器之间传输。
2）通过读写cookie检测是否支持
3）cookie属性有名，值，max-age，path, domain，secure；
4）cookie默认有效期为浏览器会话，一旦用户关闭浏览器，数据就丢失，通过设置max-age=seconds属性告诉浏览器cookie有效期
5）cookie作用域通过文档源和文档路径来确定，通过path和domain进行配置，web页面同目录或子目录文档都可访问
6）通过cookie保存数据的方法为：为document.cookie设置一个符合目标的字符串如下
7）读取document.cookie获得'; '分隔的字符串，key=value,解析得到结果
document.cookie = 'name=qiu; max-age=9999; path=/; domain=domain; secure';

document.cookie = 'name=aaa; path=/; domain=domain; secure';
// 要改变cookie的值，需要使用相同的名字、路径和域，新的值
// 来设置cookie，同样的方法可以用来改变有效期

// 设置max-age为0可以删除指定cookie

//读取cookie，访问document.cookie返回键值对组成的字符串，
//不同键值对之间用'; '分隔。通过解析获得需要的值

 

13、javascript有哪些方法定义对象？
1）对象字面量：var obj = {};
2）构造函数：var obj = new Object();
3）Object.create()：var obj = Object.create(Object.prototype);

14、===运算符判断相等的流程是怎样的？
1）如果两个值不是相同类型，它们不相等
2）如果两个值都是null或者都是undefined，它们相等
3）如果两个值都是布尔类型true或者都是false，它们相等
4）如果其中有一个是NaN，它们不相等
5）如果都是数值型并且数值相等，它们相等，-0等于0
6）如果它们都是字符串并且在相同位置包含相同的16位值，它们相等；如果在长度或者内容上不等，它们不相等；两个字符串显示结果相同但是编码不同，==和===都认为它们不相等
7）如果它们指向相同对象、数组、函数，它们相等；如果指向不同对象，它们不相等

15、==运算符判断相等的流程是怎样的？
1）如果两个值类型相同，按照===比较方法进行比较
2）如果类型不同，使用如下规则进行比较
i.如果其中一个值是null，另一个是undefined，它们相等
ii.如果一个值是数字另一个是字符串，将字符串转换为数字进行比较
iii.如果有布尔类型，将true转换为1，false转换为0，然后用==规则继续比较
iv.如果一个值是对象，另一个是数字或字符串，将对象转换为原始值然后用==规则继续比较
v.其他所有情况都认为不相等

16、对象到字符串的转换步骤
1）如果对象有toString()方法，js调用它。如果返回一个原始值（primitive value如：string,number,boolean），将这个值转换为字符串作为结果
2）如果对象没有toString()方法或者返回值不是原始值，js寻找对象的valueOf()方法，如果存在就调用它，返回结果是原始值则转为字符串作为结果
3）否则，js不能从toString()或者valueOf()获得一个原始值，此时throws a TypeError

17、对象到数字的转换步骤
1）如果对象有valueOf()方法并且返回元素值，js将返回值转换为数字作为结果
2）否则，如果对象有toString()并且返回原始值，js将返回结果转换为数字作为结果
3）否则，throws a TypeError

18、+运算符工作流程
1）如果有操作数是对象，转换为原始值
2）此时如果有一个操作数是字符串，其他的操作数都转换为字符串并执行连接
3）否则，所有操作数都转换为数字并执行家法

19、函数内部arguments变量有哪些特性,有哪些属性,如何将它转换为数组？
1）arguments所有函数中都包含的一个局部变量，是一个类数组对象，对应函数调用时的实参。如果函数定义同名参数会在调用时覆盖默认对象
2）arguments[index]分别对应函数调用时的实参，并且通过arguments修改实参时会同时修改实参
3）arguments.length为实参的个数（Function.length表示形参长度）
4）arguments.callee为当前正在执行的函数本身，使用这个属性进行递归调用时需注意this的变化
5）arguments.caller为调用当前函数的函数（已被遗弃）
6）转换为数组：var args = Array.prototype.slice.call(arguments, 0);

20、评价一下三种方法实现继承的优缺点，并改进
function Shape() {}

function Rect() {}

// 方法1
Rect.prototype = new Shape();

// 方法2
Rect.prototype = Shape.prototype;

// 方法3
Rect.prototype = Object.create(Shape.prototype);

Rect.prototype.area = function () {
// do something
};
方法1：
1）优点：正确设置原型链实现继承
2）优点：父类实例属性得到继承，原型链查找效率提高，也能为一些属性提供合理的默认值
3）缺点：父类实例属性为引用类型时，不恰当地修改会导致所有子类被修改
4）缺点：创建父类实例作为子类原型时，可能无法确定构造函数需要的合理参数，这样提供的参数继承给子类没有实际意义，当子类需要这些参数时应该在构造函数中进行初始化和设置
5）总结：继承应该是继承方法而不是属性，为子类设置父类实例属性应该是通过在子类构造函数中调用父类构造函数进行初始化
方法2：
1）优点：正确设置原型链实现继承
2）缺点：父类构造函数原型与子类相同。修改子类原型添加方法会修改父类
方法3：
1）优点：正确设置原型链且避免方法1.2中的缺点
2）缺点：ES5方法需要注意兼容性
改进：
1）所有三种方法应该在子类构造函数中调用父类构造函数实现实例属性初始化
function Rect() {
Shape.call(this);
}
2）用新创建的对象替代子类默认原型，设置Rect.prototype.constructor = Rect;保证一致性
3）第三种方法的polyfill：
function create(obj) {
if (Object.create) {
return Object.create(obj);
}

function f() {};
f.prototype = obj;
return new f();
}


Firefox内置了响应式测试工具，可以通过Firefox 工具-》Web 开发者-》自适应设计视图

各种调试方式汇总：

1、使用 iOS Simulator 调试开发

iOS Simulator 是 Xcode 开发工具内置的 iOS 模拟器，因此该功能仅能在 Mac 系统下使用。按照如下方式即可打开：

打开Xcode >> 点击左上角的xcode菜单>>选择open developer tools>> 选择IOS simulator>>点击打开的simulator底部的safari浏览器>>点击simulator顶部的地址栏区域，可以用虚拟键盘输入调试页面地址，例如m.test.com，也可以在该地址栏上点击右键，出现paste菜单时点击paste把你剪贴板中的地址粘贴进来进行访问。

它可以直接打开本地 localhost 的页面，无须任何设置。你可以选择上面菜单中的“硬件”来模拟其他 iOS 设备，包括 iPad 等。如果你升级了你的 OS X 系统和 Xcode 6，你还可以模拟 iPhone 6 和 iPhone 6 Plus。

然后再打开桌面版的 Safari，Safari 默认是隐藏开发选项的，在第一次使用的时候，需要在 Safari 中选择 “偏好设置”-》“高级”-》“在菜单栏中显示开发选项”。然后在“开发”菜单中的IOS simulator菜单项中选择要调试的页面，即可打开 Safari 调试面板进行调试。

2、iOS 设备真机调试

模拟器已经足够强大方便了，但有些手势操作测试以及最真实的用户体验测试还是需要真机。Safari 调试真机上的网页也是非常简单的。

首先需要在 iPhone 等设备上设置一下 Safari 浏览器，开启调试功能。具体步骤：“设置”-》“Safari”-》“高级”-》“Web 检查器”。使用数据线连接电脑，在设备上用 Safari 浏览器打开需要调试的页面，之后在桌面版的 Safari 开发选项中即可看到进行调试，跟用 iOS Simulator 一样，只不过现在换成了真机。

但是调试本地网站，你可能要将手机与电脑连在一个局域网内，然后开启一个局域网 IP 的服务器进行调试，稍微麻烦。

3、调试Android上的UC

获取Android设备的IP，一般在WLAN设置内，假设为 10.62.19.173
用和手机处于同一网段的PC或MAC中使用请使用Chrome 15+,或者Safari 5.1.3+浏览器访问上述获得的IP后加上 :9998 ，如例子中即为 10.62.19.173:9998
在Android设备上弹出的是否允许远程调试上，选择“允许”，即可开始调试。
其他参考链接

http://www.uc.cn/business/download/developer.pdf


4、Weinre远程真机调试

首先安装 Weinre：

npm install -g weinre 
安装完成之后，要在本地开启一个监听服务器，需要获取本机的局域网地址：

Mac 在终端执行ipconfig getifaddr en0命令。
Win 在命令行执行ipconfig命令。
这时候拿到一个 IP，就本例而言，我的 IP 为10.62.71.170，这时候执行：

weinre --boundHost  10.62.71.170

这时候会启动一个服务器：
http://10.62.71.170:8080

用手机打开你所要调试的页面，然后在pc浏览器访问http://10.62.71.170:8080
在该页面中找到
debug client user interface:  http://10.62.71.170:8080/client/#anonymous，点击进去。可以在http://10.62.71.170:8080/client/#anonymous页面的左上角的Targets中看到你手机浏览器正在访问的调试页面，点击它，然后点击页面中的elements菜单栏，就可以开始调试了。


node版本升级：

首先安装n模块：

npm install -g n
第二步：
升级node.js到最新稳定版

n stable
是不是很简单？！
n后面也可以跟随版本号比如：

n v0.10.26
或

n 0.10.26


//动态创建画布的一种错误写法
var str = '<canvas id="' + canvasName + '"  class="' + canvasName + '"></canvas>';
var tempHtml = document.querySelector('body').innerHTML;
document.querySelector('body').innerHTML = tempHtml + str;


Math.pow(底数,几次方)
如：double a=2.0;
    double b=3.0;
double c=Math.pow(a,b);
就是2的三次方是多少；
c最终为8；

浏览器检测：
ua = navigator.userAgent,
isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);


科学计数法表示：
ie4  =  10000

var me = this, wrap = function(fn){
      return function(me,e) {
        fn.call(me,e);
      }
}

zepto里面的on可以相当于jquery里面的delegate，传三个参数。
var elem = $('#content')
// observe all clicks inside #content:
elem.on('click', function(e){ ... })
// observe clicks inside navigation links in #content
elem.on('click', 'nav a', function(e){ ... })
// all clicks inside links in the document
$(document).on('click', 'a', function(e){ ... })




function scrollTo(scrollTo, time) {
        var scrollFrom = parseInt(document.body.scrollTop),
            i = 0,
            runEvery = 5;

        scrollTo = parseInt(scrollTo);
        time /= runEvery;

        var interval = setInterval(function () {
            i++;
            document.body.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
            document.documentElement.scrollTop = (scrollTo - scrollFrom) / time * i + scrollFrom;
            if (i >= time) {
                clearInterval(interval);
            }
        }, runEvery);
    }


    .nums(@n, @i: 0) when (@i =< @n) {
        &.n@{i} {
            background-image: png8-data-uri('./img/white/@{i}.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
        .nums(@n, (@i + 1));
    }

    .nums(9);

.loading-pic {
    background-image: data-uri("./img/loading.gif") !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
    background-size: 32px 32px !important;    
}

.before-as-loading:before:extend(.loading-pic) {
    //-webkit-animation: rotate linear 1.0s infinite;
    //animation: rotate linear 1.0s infinite;
    display: block;
    content: '';
    height: 100%;
    width: 100%;   
}

var pageWidth = currScript.dataset['defaultwidth'] || 320;
var defaultWidth = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));

function flex(){
    document.documentElement.style.fontSize = (document.documentElement.getBoundingClientRect().width / pageWidth ) + 'px';
    document.body.style.fontSize = defaultWidth;
}

window.addEventListener('resize', flex, false);
flex();


Webkit硬件加速的方式，会把需要渲染的元素放到特定的『Composited Layer』中
头部的那个轮播动画元素的存在居然会导致下面所有相对和绝对定位的元素都被放到复合层中。。。
大家可以用支持『硬件加速』的『安卓』手机浏览器测试上述页面，给动画元素加z-index前后的性能差距非常明显。

不过也不是所有浏览器都有这个问题，我在mac上的Safari、firefox都没有明显差异，安卓手机上的QQ浏览器好像也正常，猎豹、UC、欧朋、webview等浏览器差距明显，更多测试就靠大家来发现吧。

最后总结一下：

使用3D硬件加速提升动画性能时，最好给元素增加一个z-index属性，人为干扰复合层的排序，可以有效减少chrome创建不必要的复合层，提升渲染性能，移动端优化效果尤为明显。



bug：IE浏览器中，对于内容为空的绝对定位的a标签，无法点击中。解决办法是给该标签设置background为一张透明png的背景图片。



一般来说，样式的写操作之后，如果有下面这些属性的读操作，都会引发浏览器立即重新渲染。
offsetTop/offsetLeft/offsetWidth/offsetHeight
scrollTop/scrollLeft/scrollWidth/scrollHeight
clientTop/clientLeft/clientWidth/clientHeight
getComputedStyle()

所以，从性能角度考虑，尽量不要把读操作和写操作，放在一个语句里面。

// bad
div.style.left = div.offsetLeft + 10 + "px";
div.style.top = div.offsetTop + 10 + "px";

// good
var left = div.offsetLeft;
var top  = div.offsetTop;
div.style.left = left + 10 + "px";
div.style.top = top + 10 + "px";
一般的规则是：
样式表越简单，重排和重绘就越快。
重排和重绘的DOM元素层级越高，成本就越高。
table元素的重排和重绘成本，要高于div元素

最近在做一个页面的时候，发现在ie8浏览器（也包括ie7）中，字体有显示发虚，甚至大小不一样的问题。
经过追查，发现原来是使用透明滤镜后，对字体的渲染造成了影响。
解决方法有两种：
若需要使用透明滤镜，可以给使用滤镜的元素加一个背景色。不过字体还是有一些发虚。
当然，最根本的方法还是避免使用滤镜了。

chrome v8 在对 Array.prototype.sort这个方法的实现上做了一些优化，
传送门  https://code.google.com/p/v8/source/browse/trunk/src/array.js （有兴趣的可以去看下,需要梯子）
代码中做过判断，数量小于或等于10的时候 走的是插入排序（InsertionSort）；否则快速排序（QuickSort）。
对排序算法如果有了解的应该知道 InsertionSort是稳定的排序算法，QuickSort则是不稳定的算法。
既然浏览器对Array.prototype.sort的实现不一样，解决这个问题只要自己写一个排序算法就行了，是要追求效率还是稳定性自己可以根据业务需求控制。

工具/网站推荐
查看设备的屏幕参数http://mydevice.io/
设计keyframes http://cssanimate.com/
动画灵感哪里找：http://codepen.io/，https://dribbble.com/
动画效果可视化的工具，可以挑选好的效果：http://daneden.github.io/animate.css/
重力感应js库：https://github.com/wagerfield/parallax


在线图片处理工具：
智图，可转webp  http://zhitu.isux.us/
tinypng, png的压缩效果明显：https://tinypng.com/
photoshop输出svg图形格式插件：https://github.com/janily/svgartisan
切图工具，cutternman：http://www.cutterman.cn/v2/cutterman
png压缩与格式转换工具：http://isparta.github.io/



但是有一种hack的方法可以让IOS微信侧页面自动播放（SAFARI依旧无效）音乐：
通过new一张图片，监听一张图片的onload事件，结束后回调执行音频播放audio.play()即可，原理估计是动了dom结构，相当于执行了一次交互。（有人也用过createEvent模拟，原理也是动了dom。）
因此，记得暴露一个音乐关闭/打开的按钮，不然肯定被用户骂死。


移动H5前端性能优化指南
来自：http://isux.tencent.com/h5-performance.html
概述

1. PC优化手段在Mobile侧同样适用
2. 在Mobile侧我们提出三秒种渲染完成首屏指标
3. 基于第二点，首屏加载3秒完成或使用Loading
4. 基于联通3G网络平均338KB/s(2.71Mb/s)，所以首屏资源不应超过1014KB
5. Mobile侧因手机配置原因，除加载外渲染速度也是优化重点
6. 基于第五点，要合理处理代码减少渲染损耗
7. 基于第二、第五点，所有影响首屏加载和渲染的代码应在处理逻辑中后置
8. 加载完成后用户交互使用时也需注意性能
优化指南

[加载优化]
加载过程是最为耗时的过程，可能会占到总耗时的80%时间，因此是优化的重点

· 减少HTTP请求
因为手机浏览器同时响应请求为4个请求（Android支持4个，iOS 5后可支持6个），所以要尽量减少页面的请求数，首次加载同时请求数不能超过4个
a) 合并CSS、JavaScript
b) 合并小图片，使用雪碧图

· 缓存
使用缓存可以减少向服务器的请求数，节省加载时间，所以所有静态资源都要在服务器端设置缓存，并且尽量使用长Cache（长Cache资源的更新可使用时间戳）
a) 缓存一切可缓存的资源
b) 使用长Cache（使用时间戳更新Cache）
c) 使用外联式引用CSS、JavaScript

· 压缩HTML、CSS、JavaScript
减少资源大小可以加快网页显示速度，所以要对HTML、CSS、JavaScript等进行代码压缩，并在服务器端设置GZip
a) 压缩（例如，多余的空格、换行符和缩进）
b) 启用GZip

· 无阻塞
写在HTML头部的JavaScript（无异步），和写在HTML标签中的Style会阻塞页面的渲染，因此CSS放在页面头部并使用Link方式引入，避免在HTML标签中写Style，JavaScript放在页面尾

部或使用异步方式加载

· 使用首屏加载
首屏的快速显示，可以大大提升用户对页面速度的感知，因此应尽量针对首屏的快速显示做优化

· 按需加载
将不影响首屏的资源和当前屏幕资源不用的资源放到用户需要时才加载，可以大大提升重要资源的显示速度和降低总体流量
PS：按需加载会导致大量重绘，影响渲染性能
a) LazyLoad
b) 滚屏加载
c) 通过Media Query加载

· 预加载
大型重资源页面（如游戏）可使用增加Loading的方法，资源加载完成后再显示页面。但Loading时间过长，会造成用户流失
对用户行为分析，可以在当前页加载下一页资源，提升速度
a) 可感知Loading(如进入空间游戏的Loading)
b) 不可感知的Loading（如提前加载下一页）

· 压缩图片
图片是最占流量的资源，因此尽量避免使用他，使用时选择最合适的格式（实现需求的前提下，以大小判断），合适的大小，然后使用智图压缩，同时在代码中用Srcset来按需显示
PS：过度压缩图片大小影响图片显示效果
a) 使用智图（ http://zhitu.tencent.com/ ）
b) 使用其它方式代替图片(1. 使用CSS3 2. 使用SVG 3. 使用IconFont)
c) 使用Srcset
d) 选择合适的图片(1. webP优于JPG 2. PNG8优于GIF)
e) 选择合适的大小（1. 首次加载不大于1014KB 2. 不宽于640（基于手机屏幕一般宽度））

· 减少Cookie
Cookie会影响加载速度，所以静态资源域名不使用Cookie

· 避免重定向
重定向会影响加载速度，所以在服务器正确设置避免重定向

· 异步加载第三方资源
第三方资源不可控会影响页面的加载和显示，因此要异步加载第三方资源

[脚本执行优化]
脚本处理不当会阻塞页面加载、渲染，因此在使用时需当注意

· CSS写在头部，JavaScript写在尾部或异步

· 避免图片和iFrame等的空Src
空Src会重新加载当前页面，影响速度和效率

· 尽量避免重设图片大小
重设图片大小是指在页面、CSS、JavaScript等中多次重置图片大小，多次重设图片大小会引发图片的多次重绘，影响性能

· 图片尽量避免使用DataURL
DataURL图片没有使用图片的压缩算法文件会变大，并且要解码后再渲染，加载慢耗时长

[CSS优化]
· 尽量避免写在HTML标签中写Style属性

· 避免CSS表达式
CSS表达式的执行需跳出CSS树的渲染，因此请避免CSS表达式

· 移除空的CSS规则
空的CSS规则增加了CSS文件的大小，且影响CSS树的执行，所以需移除空的CSS规则

· 正确使用Display的属性
Display属性会影响页面的渲染，因此请合理使用
a) display:inline后不应该再使用width、height、margin、padding以及float
b) display:inline-block后不应该再使用float
c) display:block后不应该再使用vertical-align
d) display:table-*后不应该再使用margin或者float

· 不滥用Float
Float在渲染时计算量比较大，尽量减少使用

· 不滥用Web字体
Web字体需要下载，解析，重绘当前页面，尽量减少使用

· 不声明过多的Font-size
过多的Font-size引发CSS树的效率

· 值为0时不需要任何单位
为了浏览器的兼容性和性能，值为0时不要带单位

· 标准化各种浏览器前缀
a) 无前缀应放在最后
b) CSS动画只用 （-webkit- 无前缀）两种即可
c) 其它前缀为 -webkit- -moz- -ms- 无前缀 四种，（-o-Opera浏览器改用blink内核，所以淘汰）

· 避免让选择符看起来像正则表达式
高级选择器执行耗时长且不易读懂，避免使用

[JavaScript执行优化]
· 减少重绘和回流
a) 避免不必要的Dom操作
b) 尽量改变Class而不是Style，使用classList代替className
c) 避免使用document.write
d) 减少drawImage

· 缓存Dom选择与计算
每次Dom选择都要计算，缓存他

· 缓存列表.length
每次.length都要计算，用一个变量保存这个值

· 尽量使用事件代理，避免批量绑定事件

· 尽量使用ID选择器
ID选择器是最快的

· TOUCH事件优化
使用touchstart、touchend代替click，因快影响速度快。但应注意Touch响应过快，易引发误操作

[渲染优化]
· HTML使用Viewport
Viewport可以加速页面的渲染，请使用以下代码
<meta name=”viewport” content=”width=device-width, initial-scale=1″>

· 减少Dom节点
Dom节点太多影响页面的渲染，应尽量减少Dom节点

· 动画优化
a) 尽量使用CSS3动画
b) 合理使用requestAnimationFrame动画代替setTimeout
c) 适当使用Canvas动画 5个元素以内使用css动画，5个以上使用Canvas动画（iOS8可使用webGL）

· 高频事件优化
Touchmove、Scroll 事件可导致多次渲染
a) 使用requestAnimationFrame监听帧变化，使得在正确的时间进行渲染
b) 增加响应变化的时间间隔，减少重绘次数

· GPU加速
CSS中以下属性（CSS3 transitions、CSS3 3D transforms、Opacity、Canvas、WebGL、Video）来触发GPU渲染，请合理使用
PS：过渡使用会引发手机过耗电增加

参考资料

移动页面性能优化
[译] 如何做到一秒渲染一个移动页面
首屏渲染优化提案反馈（原：Re: 答复: 中文兴趣小组5月5日电话会议）
HTML5游戏前端开发秘籍
被解放的GPU
CSS动画
High Performance Animations
PageSpeed Insights规则
Best Practices for Speeding Up Your Web Site
How to lose weight (in the browser)
关注 CSS Lint
HTML5应用开发功耗调优化小结
理解WebKit和Chromium: Chromium WebView和Chrome浏览器渲染机制
Optimizing Performance — Web Fundamentals
移动前端工作的那些事—前端制作之动画效率问题简析
Optimizing the Critical Rendering Path
7 天打造前端性能监控系统
数据驱动设计
为你的移动页面寻找一丝新意（技术篇）——手机互动网页项目总结（下）
Image Optimization
[webapp的优化整理]要做移动前端优化的朋友进来看看吧
Egret Framework Canvas Renderer性能优化
Roundup on Parallel Connections
2014年第二季度全国网速实测报告



WebP 探寻之路
来自：http://isux.tencent.com/introduction-of-webp.html
Hahn
2014.12.15
前言
不管是 PC 还是移动端，图片一直是流量大头，以苹果公司 Retina 产品为代表的高 PPI 屏对图片的质量提出了更高的要求，如何保证在图片的精细度不降低的前提下缩小图片体积，成为了一个有价值且值得探索的事情。

但如今对于 JPEG、PNG 和 GIF 这些图片格式的优化几乎已经达到了极致， 若想改变现状开辟新局面，便要有釜底抽薪的胆量和气魄，而 Google 给了我们一个新选择：WebP。

对 WebP 的研究缘起于手机 QQ 原创表情商城，由于表情包体积较大，在 2G/3G 的网络环境下加载较慢。同事小贝恰好因为 2013 Google I/O Event 了解到了 WebP，于是我们便一起开始了没羞没躁的技术预研，期待在原创表情图片的质量与体积之间寻找最美的平衡。

WebP 探寻之路

今年 WebP 图片格式得到越来越多的关注，很多团队也开始布道，前阵子的前端圈“走进腾讯互娱前端技术专场”也有相关专题。借此热潮，在这里把上一年的探索过程以及今年 WebP 新的发展一同分享出来，同时也期待更多的人将其应用于实际业务中。

什么是 WebP？
WebP（发音 weppy，项目主页），是一种支持有损压缩和无损压缩的图片文件格式，派生自图像编码格式 VP8。根据 Google 的测试，无损压缩后的 WebP 比 PNG 文件少了 45％ 的文件大小，即使这些 PNG 文件经过其他压缩工具压缩之后，WebP 还是可以减少 28％ 的文件大小。

2010 年发布的 WebP 已经不算是新鲜事物了，在 Google 的明星产品如 Youtube、Gmail、Google Play 中都可以看到 WebP 的身影，而 Chrome 网上商店甚至已完全使用了 WebP。国外公司如 Facebook、ebay 和国内公司如腾讯、美团等也早已尝鲜。目前 WebP 也在我厂很多的项目中得到应用，如腾讯新闻客户端、腾讯网、QQ空间等，同时也有一些针对 WebP 的图片格式转换工具，如 智图，iSparta 等。

WebP 探寻之路
（Google 已和正在部署的 WebP 的产品）

可喜的是，直到今年，Google 对 WebP 依旧投入了持续的热情，2014 年的 Google I/O Event 中也出现了两个介绍 WebP 应用的视频。WebP 已大量应用于全球流量消耗最多的 Google 产品中，你还有理由拒绝它吗？

WebP 探寻之路

WebP 的优势
上面只是简单介绍了这种图片格式的背景和应用，不过 “talk is cheap”，这种格式优势在哪里？除了压缩效果极好，图片质量能否得到保障？这需要更理性客观的数据：

这里列举一个简单的测试：对比 PNG 原图、PNG 无损压缩、PNG 转 WebP（无损）、PNG 转 WebP（有损）的压缩效果。更多测试查看这里（请用 Chrome 浏览器打开）

WebP 探寻之路

可以得出结论：
PNG 转 WebP 的压缩率要高于 PNG 原图压缩率，同样支持有损与无损压缩
转换后的 WebP 体积大幅减少，图片质量也得到保障（同时肉眼几乎无法看出差异）
转换后的 WebP 支持 Alpha 透明和 24-bit 颜色数，不存在 PNG8 色彩不够丰富和在浏览器中可能会出现毛边的问题
 
WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都非常优秀、稳定和统一。

科技博客 Gig‍‍‍aOM 曾报道：YouTube 的视频略缩图采用 WebP 格式后，网页加载速度提升了 10%；谷歌的 Chrome 网上应用商店采用 WebP 格式图片后，每天可以节省几 TB 的带宽，页面平均加载时间大约减少 1/3；Google+ 移动应用采用 WebP 图片格式后，每天节省了 50TB 数据存储空间。

兼容性与可用性
现在问题来了：WebP 的支持度和兼容性如何？

根据对目前国内浏览器占比与 WebP 的兼容性分析，大约有 50% 以上的国内用户可以直接体验到 WebP，如果你的网站以图片为主，或者你的产品基于 Chromium 内核，建议体验尝试。假如你打算在 App 中使用 WebP，除了 Android4.0 以上提供的原生支持外，其他版本以及 iOS 都可以直接使用官方提供的解析库（Android 、iOS ）。

为了验证 WebP 图片格式的业务可行性，我们从流畅度、解码耗时、CPU 使用、内存占用几个维度进行的分析，在开发同学们的帮助下得到了非常宝贵的测试数据：

测试一：AndroidQQ 下 PNG 和 WebP 各指标对比。
测试环境：AndroidQQ、Galaxy Nexus、Android4.2.2 系统
测试对象：WebP、PNG
测试数据（部分）：

WebP 探寻之路

测试结论：
解码耗时：WebP 的解码时间是 PNG 格式的 4.4 倍（24.8ms）
流畅程度：两种格式下，AIO 滑动流畅度无明显差异
CPU使用：两种格式下，连续发送 15 个表情，CPU 使用均在 10%—26% 之间波动，两者无明显差异
内存占用：两者格式下，连续发送 15 个表情，PSS 内存占用跨度均为 11M，无明显差异
测试二：iPhoneQQ 下 PNG 和 WebP 各指标对比。
测试环境：iPhoneQQ、iPhone4、iOS5.1.1 系统
测试对象：WebP、PNG
测试数据（部分）：

WebP 探寻之路

测试结论：
解码耗时：WebP 的解码时间是 PNG 的 5 倍 左右（64.1ms）
流畅程度：WebP 的 FPS 平均值会比 PNG 的平均值要小，但是比较稳定，跨度不大，性能也相差不大
CPU使用：总体上看，PNG 格式的表情使用 CPU 波动比较大。从平均值来看 WebP 格式表情占用的 CPU 会比 PNG 表情的占用率大
内存占用：WebP 格式表情，占用内存的跨度为 4M，波动比较明显。PNG 格式表情，占用内存的跨度为 5M，没有明显波动。停止发送表情后，40s 左右内存均有回降
可见除了 WebP 在解码时间与 PNG 有较明显差异（毫秒级别）之外，总体使用体验和 PNG 基本无差异。同时也需要明确，移动设备的发展迅猛，硬件升级快，上一年的表现也许在今年又有了明显的提升。所以，在 App 中使用 WebP 基本没有技术阻碍。

对原创表情商城的技术指导
在验证了业务可行性之后，WebP 又激发了我们对另外一些方向的思考：既然它表现如此优秀，能否进一步摸清其“秉性”，得到一些能在未来使用中遵循的指导方案？

于是，为了更深入了解 WebP 特性，我们针对原创表情项目 “不同的表情图片，如何获得 WebP 的最佳压缩效率” 问题继续展开探究，主要从图片规格、色彩数（颜色数量）、参数配置几个维度进行：

探索一：图片规格
通过阅读文献了解到 WebP 使用的是 Fancy 采样算法，既然是采样算法必然有采样区块，而 JPEG 的采样区块是 8*8，对于原始图片的长宽不是 8 的倍数，都需要先补成 8 的倍数，使其能一块块的处理，所以对于 8 的整数倍的图片，压缩会更高效。

那么 WebP 的采样区块会是多少？我们在其他因素保持不变的前提下改变图片规格，选取了 200*200 附近多个规格值，得到了一些数据。将数据可视化之后可以看到凡是以 16*16 倍数（160*160、176*176、192*192、256*256）为规格的图片，有损压缩的比例都明显大于以 4*4 或 8*8 的倍数为规格的图片。

WebP 探寻之路

结论：原创表情可以考虑使用 “16n*16n” 的规格。目前原创表情选择的是 200*200 的规格大小，实际上选择 256*256 或者 192*192 能获得更高的 WebP 压缩效率，量级在千分之几。

探索二：色彩数
在 JPEG 和 PNG 格式的选择经验上可以知道，对于色彩复杂的图片，一般使用 JPEG 格式，而对于色彩单一的图片，使用 PNG 格式。可见色彩数会影响图片的压缩效果。于是我们通过 Photoshop 中的色阶分离功能调整表情图片的色彩数，在其他因素保持不变的前提下对比不同色彩数对于 WebP 有损无损压缩的影响。

WebP 探寻之路

可见，在色彩数相对较少的前提下，无损压缩的效果要优于有损压缩；而色彩数很多时，有损压缩效果要优于无损压缩，这个分界点在 256±100 之间。

结论：建议原创表情尽量控制颜色数在 256 色以内，采用无损压缩性价比最高。
小于 256 色：以图标，图形，剪贴画为代表，最适合采用 WebP 无损压缩，精细度完美，体积大幅减少；
大于 256 色：以多数表情图，广告图为代表，最适合采用 WebP 有损压缩，选择较高压缩比（建议压缩质量为 100% ~ 75%）
远大于 256 色：以风景照，视频截图为代表，最适合采用 WebP 有损压缩，选择适中压缩比（建议压缩质量为 75% 以下）
 

探索三：色温、渐变与杂色、直线与直线、描边
WebP 探寻之路

随后又从色温、渐变与杂色、直线曲线、是否需要描边上进行了分析，最后的结论即：

色温并不会影响表情图片的压缩效果，可大胆用色
渐变与杂色理论上都是增加色彩数，它的压缩规律从符合第二条，但建议表情图片少用渐变杂色和不必要的线条
直线与曲线理论上也是增加了色彩数（因为曲线边缘会存在渐变），建议如果表情中可以“直”的地方就不要“弯”
WebP 格式的图片不会存在毛边问题，所以不需要为表情图片添加描边
 

探索四：压缩配置
为了得到无损压缩和有损压缩的最佳压缩配置，我们通过对 900 张表情图片进行不同压缩配置的测试（大部分表情图片的色彩数都在 256 色以上），得到下面的数据：

WebP 探寻之路

压缩参数说明：
-lossless：无损压缩
-q：压缩质量，值越大越图片质量越好
-m：压缩方式，值越大则图片质量越好，体积越小，但是耗时较长
可以发现，无损压缩表现很稳定，压缩质量越高，压缩效果也越好。而有损压缩在压缩质量设置为 75 以上之后，压缩效果反而减弱，甚至压缩后的图片体积会大于压缩前的体积。所以得出以下结论：

选择无损压缩时，“-lossless -q 100” 是最佳方案
选择有损压缩时，“-q 75”是最佳方案（图片质量与体积大小达到均衡）
无论何种压缩参数，加上“-m 6”都能使得输出的 WebP 图片进一步减少体积，量级是1%~2%，但是会增加耗时
最终，得出了一个正反面案例，从技术角度分析不同的表情图标的优劣（强调一下是“技术角度”，这里列举的表情都很赞 ^_^）。

WebP 探寻之路

动态 WebP 初探
了解完静态 WebP，下面再了解一下动态 WebP（Animated WebP）：2013 年 11 月 21 日，Animated WebP 终于取得进展，并在 Chrome32 Beta 中得到了支持。目前 Animated WebP 支持将 GIF 直接转换成 Animated WebP，或者将多张 WebP 图片组合成 Animated WebP。与传统的 GIF 图比较，Animated WebP 的优势在于：

支持有损和无损压缩，并且可以合并有损和无损图片帧
体积更小，GIF 转成有损 Animated WebP 后可以减小 64% 的体积，转成无损可以节省 19% 的体积
颜色更丰富，支持 24-bit 的 RGB 颜色以及 8-bit 的 Alpha 透明通道（而 GIF 只支持 8-bit RGB 颜色以及 1-bit 的透明）
添加了关键帧、metadata 等数据
假如你在使用 Chrome32 以上的浏览器，可以点这里体验。

WebP 探寻之路

但新兴的事物必然存在不足的地方，Animated WebP 存在的问题：
消耗较多的 CPU 和解码时间（多 1.5~2.2 倍）
和 GIF 相比起来支持度还不够，目前仍无法通用
为了支持 Animated WebP，Chrome 的新内核 Blink 添加了近 1500 行的代码
根据自己实际的测试，发现 Animated WebP 的压缩效果较不稳定，在默认压缩配置下达不到 Google 官方提供的示例效果。但 Animated WebP 依然有很多值得期待的空间，值得继续关注。

综合技术方案
对于不同场景下 WebP 的使用，我们总结了一些解决方案，如下：

1、若使用场景是浏览器，可以：
JavaScript 能力检测，对支持 WebP 的用户输出 WebP 图片
使用 WebP 支持插件：WebPJS
2、若使用场景是 App，可以：
Android 4.0 以下 WebP 解析库（链接）
iOS WebP 解析库（链接）
3、转换工具：
智图
iSparta
iSparta 是我们组针对 WebP 和 APNG 两种新型图片格式的转化而开发的一款桌面应用，直接图片批量转换为 WebP，同时提供多种参数配置，欢迎体验。

WebP 探寻之路

参考文献
http://en.wikipedia.org/wiki/WebP
https://developers.google.com/speed/webp/
http://tech.qq.com/a/20140721/074637.htm
http://faso.me/slides/2014/webp/
http://www.webpagetest.org/video/compare.php?tests=141121_3W_JT7,141121_6Q_JSM



判断一个变量是对象:

if(typeof a == 'object' && Object.prototype.toString.apply(a) != '[object Array]' && a != undefined)




---



---

sticky元素在前，relative元素在后，且都无z-index时，sticky元素会被遮盖

---


---

### bug 父元素的translate3D导致position:fixed定位错误。

### chrome浏览器 －》 x个标签页——》还原所有标签页 可以在打开上次退出浏览器时未关闭的标签页

### `<input type="number">`的上下加减箭头的消除

input[type=number]::-webkit-inner-spin-button {
     -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
     -webkit-appearance: none;
}

---


## 名言

从现在起，我开始谨慎地选择我的生活，我不再轻易让自己迷失在各种诱惑里。我心中已经听到来自远方的呼唤，再不需要回过头去关心身后的种种是非与议论。我已无暇顾及过去，我要向前走。

—— 米兰·昆德拉《生命中不能承受之轻》


## 高清屏幕1px 方案和实践：

思路
一般情况下我们拿到的视觉稿是2倍于普通的视觉效果，所有的尺寸都是需要除于2，那么拿到1px 的边框的时候，在高清屏幕下展示页面上css 设置0.5px，这样就能得到1px 物理像素点的精致的效果。但是。。。直接设置0.5px 渲染的结果0，（ps,设置0.99px 才有效果 ，ios 7.1 iphone4）
实现的思路还是一样的，基于css 0.5px 出发，最终的结果还是想要1physical pixel边框。

### 方案一 transform: scale(0.5)

实现方式

height:1px;
-webkit-transform: scaleY(0.5);
-webkit-transform-origin:0 0;
overflow: hidden;
优点

如果单独画一条线，使用的代码也不是很多

缺点

只能单独使用，如果嵌套，scale的作用也会对包含的元素产生不想要的影响

### 方案二 box-shadow

实现方式

利用css 对阴影处理的方式实现0.5px的效果

底部一条线

-webkit-box-shadow:0 1px 1px -1px rgba(0, 0, 0, 0.5);

优点

基本所有场景都能满足，例如 包含圆角的button，单条，多条线，

缺点

颜色不好处理， 黑色 rgba(0,0,0,1) 最浓的情况了。除了颜色之外，没有啥挑剔的问题

### 方案三 background-image

实现方式

设置1px通过css 实现的image，50%有颜色，50%透明

linear-gradient(180deg, #ddd, #ddd 50%, transparent 50%)

优点

配合background-image,background-size,background-position 可以实现单条，多条边框。边框的颜色随意设置，

缺点

如果有圆角的效果，很sorry圆角的地方没有线框的颜色。都要写的代码也不少，

### 方案四（用图片）

直接做一个图片吧，通过background-image 或者border－image (不解释了。)，让设计给图片娃哈哈。

总结

各有优缺点，看你想怎么用了，个人觉得最简单最省力的觉得还是box-shadow




### JSON.parse的兼容问题
使用 

`JSON.parse($('#my_schema').html()) `

必须引入var JSON = require('json') 不然会造成ie8不兼容。


### 修改windows  下的hosts:

c:\windows\system32\drivers\etc\下的hosts文件，右键“属性”－“安全”－“编辑”－选择“users”－勾选“完全控制”－“应用”


## 关于iconfont

iconfont做的图标在iphone中被点击的时候，有一定几率会出现icon的点击事件未生效，但图标却向下偏移的情况。解决办法是改用图片或者svg。推测有可能是因为没有设置行高导致iconfont图标比外部容器更高，出现了滚动，但未验证是否属实。

## iPhone中监听不到keyup事件
iPhone中监听不到keyup事件，所以需要换成input事件。但input事件的event中没有keyCode。

## 搜索输入框获得焦点时，怎样将iPhone软键盘中的“搜索”两字显示出来
要让iphone中的软件盘在```<input type="search">```时出现“搜索”而不是“换行”两个字，必须在input的外面套一个form元素，并且设置action属性。如果你并没有真正需要跳转的action，可以设置一个假的值（比如#），并且对它进行e.preventDefault，然后把处理逻辑用JavaScript写在onSubmit事件中。

## 输入框后面的清除按钮的实现

搜索框中输入内容后，会有一个清除输入内容的“x”号，但是它在一些机器中（如iphone中）并不存在。所以还是需要模拟实现。模拟实现的时候，可以用```<input type="reset">```元素来实现重置的效果。当然，如果有进行搜索的按钮，则可以用```<input type="submit">```元素来实现。

## 带边线的九宫格列表组件的边线设置

在做带边线的九宫格列表组件的时候，写边线的时候得考虑到格子的个数只有单个的情况，所以边线设置应该包含右边线和下边线，这样最后一个格子即便不是一行中的最后那一个格子，也是有右边线的。如果把边线设在左、下的话，则有可能出现最后一个格子没有右边线的情况。


5、容易忽略的问题：

## jquery和zepto中```$.extend```的使用

```
var a = {x:1};
var b = {x:2,y:3}
var c = $.extend({},a,b);
console.log(a); // {x:1}
console.log(c); // {x:2,y:3}

var d = $.extend(a,b)
console.log(a); // {x:2,y:3}
console.log(d); // {x:2,y:3}
```

可见，如果前面不加一个空对象，a的值会被改变。此外，如果被合并的对象中有相同的属性，最后合并的结果中，该相同属性的取值是最后一个对象的那个属性的值。

如果要合并数组，需要使用```var c = a.concat(b)```，值得注意的是，```a.concat(b)```进行a和b数组的合并时，a并没有改变，合并后的结果是在返回的新数组中，所以要用新数组进行接收才行，这一点与对象合并的```$.extend(a,b)```是不一样的。

```
var a = [1,2,3,4];
var b = [5,6,7];
$.extend(a,b);
```

此时```$.extend(a,b)```所做的并不是我们所期望的数组合并的效果，而是将数组b中下标为0,1,2的项目替换数组1中下标为0,1,2的项，其实还是当作了对象去做的，即把下标当成属性，下标相同即认为是相同的属性，属性相同时用后一个的值覆盖前一个。


###关于语音输入

```x-webkit-speech x-webkit-grammar="builtin:translate"```
 
做为拿来主义者，自己新建一个html文件，将以上的代码放到网页中，打开测试好用。再测试发现只在Google Chrome上通过，其它的IE，firefox,Opera上测试均不显示。
 
实际上w3c对语音输入有官方的说明：http://www.w3.org/2005/Incubator/htmlspeech/2010/10/google-api-draft.html
 使用语音输入作用有：
1.提供除了键盘和鼠标的另一个输入方法，针对pc用户，当键盘不可用时也可以使用语音输入。
2.为手机用户提供更加方便的输入方法。
 
支持的浏览器
 x-webkit-speech是webkit内核浏览器的私有属性(废话)。但现在只能在google的chrome 11以上才能使用。
实现过程大概是捕捉到语音后，数据发送到google的服务器进行语音识别，然后返回结果。所以没有足够强大大的研发能力和服务器资源，真没法支持这个服务。
 
支持的标签
输入标签有input和textarea，实际上目前只有input支持。
 
检测浏览器是否支持

``` 
if (document.createElement("input").webkitSpeech === undefined) {
    alert("Speech input is not supported in your browser.");
}
```
 
直接使用
 
```<input type="search" x-webkit-speech />```
 
捕捉到语音输入后会直接将关键词填入到输入框里。

监听输入
 
若要监听输入变化以便做其他处理，使用onwebkitspeechchange属性添加处理函数。

关于语音输入：

```<input type="search" x-webkit-speech onwebkitspeechchange="onChange()"/>```

``` 
<script type="text/javascript">
    function onChange() {
        alert('changed');
    }
</script>
```
 
注意：
如果原input中value不为空，输入会直接添加在原有文字后面。既然用webkit就要用placeholder了，不要再使用value为作输入提示了。
 
相关属性
lang
设置语言种类：
 
```<input type="text" x-webkit-speech lang="zh-CN" />```
 
onwebkitspeechchange
语音输入事件，当发声语音改变时触发：
 
```<input type="text" x-webkit-speech onwebkitspeechchange="foo()" />```
 
x-webkit-grammar
语音输入语法，”builtin:search”值使得语音输入的内容尽量靠近搜索内容，去除多余的字符，例如「的」
 
```<input type="text" x-webkit-speech x-webkit-grammar="builtin:search" />```
 
 
测试了下效果，语音识别率还不错，但中英夹杂的时候就很悲剧了，而且该服务需要走google的服务器所以有时响应速度很慢，当然，对于我这种普通话不能很标准的人来使用，想达到很的效果，那真就是……


## 一些有用的辅助函数

注意学习下标准化的注释方法。

/**
 * Check whether the object has the property.
 *
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function hasOwn(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

一些原生方法：
Object.getOwnPropertyDescriptor(obj, prop) 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）



vue对象特有的属性。
.isVue
._data

## 关于npm的版本号

x.y.z   x是主版本号(major),y是小版本号(minor),z是补丁版本号(patch)。

～ 表示：
   当y不为0时，锁定的范围是只增加z（patch）,不改变x.y。即表示[x.y.z,x.(y+1).0)
   当y为0时，锁定的范围是只增加y(minor)，不增加x。即表示[x.0.z,(x+1).0.0)
   
^ 表示：
	锁定的位置为以不改变左边起第一个非0位置为准。
	^0.0.z     表示 0.0.z
	^0.y.z     表示 [0.y.z,0.(y+1).0)
	^x.y.z     表示 [x.y.z,(x+1).0.0)
	
x 表示x.y.z中对应一位可任选

0.0.x       
0.x.0
x.0.0
等等
	
* 表示任意版本

更多参考： https://docs.npmjs.com/misc/semver

## 查看网页源代码
 
在地址栏中的URL前面加上view-source:

## vue中运行代码发生如下错误

Uncaught SyntaxError: Unexpected token

原因是你新增了文件之后没有重启webpack服务，因为一些es6的语法不能直接在浏览器跑，要用webpack编译之后才能在浏览器运行。

## 项目构建工具打包时出现如下错误，
Error: listen EADDRINUSE 0.0.0.0:80

80端口被占用

在活动监视器中“显示菜单”选“所有进程”，然后找到node进程，将它强制结束。

## box-shadow参数含义

投影方式；X轴偏移量；Y轴偏移量；阴影模糊半径；阴影扩展半径；阴影颜色;

演示见：

[http://www.cssmatic.com/box-shadow](http://www.cssmatic.com/box-shadow)  

## iconfont转svg

下载iconfont中的svg文件，得到类似如下如所示的一段代码：

```
<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="200" height="200" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[
@font-face { font-family: ifont; src: url("//at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("//at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("//at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg"); }

]]></style></defs><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M652.807956 885.860826c-15.683191 0-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891 0.933255-44.055378 21.399379-52.707432 119.467929-50.487881 196.668195-166.901241 196.668195-296.572556 0-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783 334.560752 190.19783 512c0 129.671315 77.200266 246.084675 196.668195 296.572556 20.466124 8.652054 30.051433 32.250518 21.399379 52.707432-8.652054 20.466124-32.231075 30.080086-52.707432 21.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367 0-221.798549 180.453908-402.252457 402.252457-402.252457s402.252457 180.453908 402.252457 402.252457c0 162.079422-96.487541 307.582307-245.810429 370.679367C663.33573 884.839567 658.022725 885.860826 652.807956 885.860826zM512 874.027313m-40.225143 0a39.309 39.309 0 1 0 80.450287 0 39.309 39.309 0 1 0-80.450287 0ZM512 773.463943c-22.213931 0-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931 18.011212-40.225143 40.225143-40.225143 55.446823 0 100.56337-45.115524 100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337 45.115524-100.56337 100.56337c0 22.213931-18.011212 40.225143-40.225143 40.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147 81.20651-181.013657 181.013657-181.013657s181.013657 81.20651 181.013657 181.013657c0 85.989443-60.278875 158.171416-140.788513 176.505993l0 64.84589C552.225143 755.452731 534.213931 773.463943 512 773.463943z" fill="#ffffff"></path></g></g></svg>
```

清除其中的无效内容，得到余下的有用代码：

```
<svg width="200" height="200" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M652.807956 885.860826c-15.683191 0-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891 0.933255-44.055378 21.399379-52.707432 119.467929-50.487881 196.668195-166.901241 196.668195-296.572556 0-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783 334.560752 190.19783 512c0 129.671315 77.200266 246.084675 196.668195 296.572556 20.466124 8.652054 30.051433 32.250518 21.399379 52.707432-8.652054 20.466124-32.231075 30.080086-52.707432 21.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367 0-221.798549 180.453908-402.252457 402.252457-402.252457s402.252457 180.453908 402.252457 402.252457c0 162.079422-96.487541 307.582307-245.810429 370.679367C663.33573 884.839567 658.022725 885.860826 652.807956 885.860826zM512 874.027313m-40.225143 0a39.309 39.309 0 1 0 80.450287 0 39.309 39.309 0 1 0-80.450287 0ZM512 773.463943c-22.213931 0-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931 18.011212-40.225143 40.225143-40.225143 55.446823 0 100.56337-45.115524 100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337 45.115524-100.56337 100.56337c0 22.213931-18.011212 40.225143-40.225143 40.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147 81.20651-181.013657 181.013657-181.013657s181.013657 81.20651 181.013657 181.013657c0 85.989443-60.278875 158.171416-140.788513 176.505993l0 64.84589C552.225143 755.452731 534.213931 773.463943 512 773.463943z" fill="#ffffff"></path></g></g></svg>
```

然后在修改其中的fill属性来改变svg的颜色。

```
<svg width="200" height="200" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M652.807956 885.860826c-15.683191 0-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891 0.933255-44.055378 21.399379-52.707432 119.467929-50.487881 196.668195-166.901241 196.668195-296.572556 0-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783 334.560752 190.19783 512c0 129.671315 77.200266 246.084675 196.668195 296.572556 20.466124 8.652054 30.051433 32.250518 21.399379 52.707432-8.652054 20.466124-32.231075 30.080086-52.707432 21.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367 0-221.798549 180.453908-402.252457 402.252457-402.252457s402.252457 180.453908 402.252457 402.252457c0 162.079422-96.487541 307.582307-245.810429 370.679367C663.33573 884.839567 658.022725 885.860826 652.807956 885.860826zM512 874.027313m-40.225143 0a39.309 39.309 0 1 0 80.450287 0 39.309 39.309 0 1 0-80.450287 0ZM512 773.463943c-22.213931 0-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931 18.011212-40.225143 40.225143-40.225143 55.446823 0 100.56337-45.115524 100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337 45.115524-100.56337 100.56337c0 22.213931-18.011212 40.225143-40.225143 40.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147 81.20651-181.013657 181.013657-181.013657s181.013657 81.20651 181.013657 181.013657c0 85.989443-60.278875 158.171416-140.788513 176.505993l0 64.84589C552.225143 755.452731 534.213931 773.463943 512 773.463943z" fill="#ff0000"></path></g></g></svg>
```

下面我们来进行data-uri的处理。

（1）在浏览器的console中执行

```document.write(encodeURIComponent('<svg width="200" height="200" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg"><g class="transform-group"><g transform="scale(0.1953125, 0.1953125)"><path d="M652.807956 885.860826c-15.683191 0-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891 0.933255-44.055378 21.399379-52.707432 119.467929-50.487881 196.668195-166.901241 196.668195-296.572556 0-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783 334.560752 190.19783 512c0 129.671315 77.200266 246.084675 196.668195 296.572556 20.466124 8.652054 30.051433 32.250518 21.399379 52.707432-8.652054 20.466124-32.231075 30.080086-52.707432 21.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367 0-221.798549 180.453908-402.252457 402.252457-402.252457s402.252457 180.453908 402.252457 402.252457c0 162.079422-96.487541 307.582307-245.810429 370.679367C663.33573 884.839567 658.022725 885.860826 652.807956 885.860826zM512 874.027313m-40.225143 0a39.309 39.309 0 1 0 80.450287 0 39.309 39.309 0 1 0-80.450287 0ZM512 773.463943c-22.213931 0-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931 18.011212-40.225143 40.225143-40.225143 55.446823 0 100.56337-45.115524 100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337 45.115524-100.56337 100.56337c0 22.213931-18.011212 40.225143-40.225143 40.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147 81.20651-181.013657 181.013657-181.013657s181.013657 81.20651 181.013657 181.013657c0 85.989443-60.278875 158.171416-140.788513 176.505993l0 64.84589C552.225143 755.452731 534.213931 773.463943 512 773.463943z" fill="#ff0000"></path></g></g></svg>'));```

得到输出的代码如下：

```
%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20class%3D%22transform-group%22%3E%3Cg%20transform%3D%22scale(0.1953125%2C%200.1953125)%22%3E%3Cpath%20d%3D%22M652.807956%20885.860826c-15.683191%200-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891%200.933255-44.055378%2021.399379-52.707432%20119.467929-50.487881%20196.668195-166.901241%20196.668195-296.572556%200-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783%20334.560752%20190.19783%20512c0%20129.671315%2077.200266%20246.084675%20196.668195%20296.572556%2020.466124%208.652054%2030.051433%2032.250518%2021.399379%2052.707432-8.652054%2020.466124-32.231075%2030.080086-52.707432%2021.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367%200-221.798549%20180.453908-402.252457%20402.252457-402.252457s402.252457%20180.453908%20402.252457%20402.252457c0%20162.079422-96.487541%20307.582307-245.810429%20370.679367C663.33573%20884.839567%20658.022725%20885.860826%20652.807956%20885.860826zM512%20874.027313m-40.225143%200a39.309%2039.309%200%201%200%2080.450287%200%2039.309%2039.309%200%201%200-80.450287%200ZM512%20773.463943c-22.213931%200-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931%2018.011212-40.225143%2040.225143-40.225143%2055.446823%200%20100.56337-45.115524%20100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337%2045.115524-100.56337%20100.56337c0%2022.213931-18.011212%2040.225143-40.225143%2040.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147%2081.20651-181.013657%20181.013657-181.013657s181.013657%2081.20651%20181.013657%20181.013657c0%2085.989443-60.278875%20158.171416-140.788513%20176.505993l0%2064.84589C552.225143%20755.452731%20534.213931%20773.463943%20512%20773.463943z%22%20fill%3D%22%23ff0000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E
```

（2）我们在这段代码中将(替换成```%28```,将)替换成```%29```，并在代码开头加入```data:image/svg+xml,```得到如下代码：

```
data:image/svg+xml,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20class%3D%22transform-group%22%3E%3Cg%20transform%3D%22scale%280.1953125%2C%200.1953125%29%22%3E%3Cpath%20d%3D%22M652.807956%20885.860826c-15.683191%200-30.581506-9.222035-37.07336-24.580838-8.652054-20.455891%200.933255-44.055378%2021.399379-52.707432%20119.467929-50.487881%20196.668195-166.901241%20196.668195-296.572556%200-177.439248-144.362922-321.80217-321.80217-321.80217S190.19783%20334.560752%20190.19783%20512c0%20129.671315%2077.200266%20246.084675%20196.668195%20296.572556%2020.466124%208.652054%2030.051433%2032.250518%2021.399379%2052.707432-8.652054%2020.466124-32.231075%2030.080086-52.707432%2021.399379-149.322887-63.09706-245.810429-208.599945-245.810429-370.679367%200-221.798549%20180.453908-402.252457%20402.252457-402.252457s402.252457%20180.453908%20402.252457%20402.252457c0%20162.079422-96.487541%20307.582307-245.810429%20370.679367C663.33573%20884.839567%20658.022725%20885.860826%20652.807956%20885.860826zM512%20874.027313m-40.225143%200a39.309%2039.309%200%201%200%2080.450287%200%2039.309%2039.309%200%201%200-80.450287%200ZM512%20773.463943c-22.213931%200-40.225143-18.011212-40.225143-40.225143l0-100.56337c0-22.213931%2018.011212-40.225143%2040.225143-40.225143%2055.446823%200%20100.56337-45.115524%20100.56337-100.56337s-45.116547-100.56337-100.56337-100.56337-100.56337%2045.115524-100.56337%20100.56337c0%2022.213931-18.011212%2040.225143-40.225143%2040.225143s-40.225143-18.011212-40.225143-40.225143c0-99.807147%2081.20651-181.013657%20181.013657-181.013657s181.013657%2081.20651%20181.013657%20181.013657c0%2085.989443-60.278875%20158.171416-140.788513%20176.505993l0%2064.84589C552.225143%20755.452731%20534.213931%20773.463943%20512%20773.463943z%22%20fill%3D%22%23ff0000%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E
```

不过，在进行上述data-uri处理之前，可以把代码存为xxx.svg文件，然后用less的```data-uri('./xxx.svg')```进行data-uri的处理（保存svg文件可以便于后续修改，更易于维护）。


## pageShow 

onpageshow 事件在用户浏览网页时触发。
onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
为了查看页面是直接从服务器上载入还是从缓存中读取，你可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 ture，否则返回 false 

兼容性情况见：

http://caniuse.com/#search=pageshow

比如，做一种返回时的强制刷新：

```
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};
```

## +操作符

这个操作符与各位从初中数学中见过的“正号”类似，放在一个变量或表达式的前面。对数字类型的变量而言，+操作符对结果没有影响; 对于其他类型的变量则是转化成数字类型的变量，如果转化失败，则为特殊数字类型常量。

+new Date  //会获得当前时间的时间戳数字

Tue Aug 23 2016 15:31:14 GMT+0800 (CST)

## 调用栈（call stack）的跟踪

比如你想查看一下是什么原因导致进入了下面这个错误回调，就可以打个端点，然后用chrome的开发者工具条查看call stack, 越靠上的是最近调用的，越靠下的是最早调用的。

```
errorFn: function (res) {
    debugger;
    this.$errorHandler(true, res);
}
```

比如我们逐个往下追踪到下面这一个调用：

```
try {
    if (res.ret[0].indexOf('SUCCESS') >= 0 && (api['isPublic'] || res.data.code == 200)) {
        fn && fn(null, res);
    }
    else {
        fn && fn(true, res);
    }
} catch(e) {
    fn && fn(true, res);

    if (process.env.NODE_ENV === 'dev') {
        throw e;
    }
}
```

我们怀疑是try中的语句出现了异常，所以落入了错误回调。因此把如下代码复制到Chrome的console中执行一下，就能看到报出的错误异常是什么。这是利用了console执行有错误的代码时会报出错误这一规则。

```
if (res.ret[0].indexOf('SUCCESS') >= 0 && (api['isPublic'] || res.data.code == 200)) {
        fn && fn(null, res);
    }
    else {
        fn && fn(true, res);
    }
```

上面这种方法在错误异常的锁定时非常常用。

## nodejs

nodejs的process是一个全局对象，他提供了一些方法和属性

process.env
返回当前linux系统的信息，我可以输入一下代码来看系统信息
console.log(JSON.stringify(process.env));


## a链接实现了和window.location一样的一些属性

例如：

```
// Create anchor element and use href property for the purpose of this example
// A more correct alternative is to browse to the URL and use document.location or window.location
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```
所以，当你有一个链接，需要获取其中的某个部分的时候，就可以创建一个a标签，并把其href设置成这个链接，然后通过这个a标签的属性去获取对应的url的某个部分。

如果此时给a标签设置一个//开头的链接，获取的origin会自动把http或https补上。如下：

```
var a = document.createElement('a')
undefined
a.href="//www.baidu.com"
"//www.baidu.com"
a.origin
"https://www.baidu.com"
```

### 替换url中的某个参数

```someurl.replace(/(paramname=)[^&]*/, '$1' + newValue);```

## 动画优化

在一些机型、或者app容器中，某个带动画效果的元素展示不出来了，或者出现补间动画消失的情况，或者在滚动屏幕的时候动画元素消失等问题。排查中首先都可以考虑是不是因为动画效果引起的。具体来说：

(1）排查关键帧动画opacity

(2) transition中进行补间动画的属性不能是all

(3) -webkit-transform: translate3D(0,0,0)有时时修复各种奇葩bug的神器


## 留意错误与异常

所有的错误都有原因，不要溜过

## input type="file"是不可以用js动态修改其value值的，除非你只是把value设置为''（空）

因为如果可以赋值的话，就可以随意用js获取用户机器上的文件了，那样太不安全了。

## mtop接口带有emoji表情的时候，如果不用encodeURICompent处理，会报参数非法的错误，请求无法成功。


## 如何使用app的debug功能

安卓app：

安装上有打开了debug功能的app的debug版本，用手机线连接手机，打开chrome://inspect/#devices，选择相应设备进行调试。使用这一功能的前提是安卓手机系统版本要在4.2及以上。

此外，对于安卓自带浏览器的调试，也可以采用此办法（chrome://inspect/#devices）进行调试。

## 前端获取文件大小

本地文件大小获取，一般是在文件上传的场景下，这个场景一般使用 <input type="file" /> 的dom对象的size属性就可获得，这个绝大多数上传代码里都已经在熟练使用了，此处不再赘述。本文章主要阐述获取线上文件大小的通用方案。

```
var oReq = new XMLHttpRequest();
    oReq.open("GET", '线上文件地址', true);
    oReq.responseType = "arraybuffer";

oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response; // 注意:不是oReq.responseText
    if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        var size = byteArray.length / 1024;
        size = Math.ceil(size * 10) / 10;
        console.log(byteArray.length); // 文件大小，单位 KB

    }
};

oReq.send(null);

```

## android4.4之后，web页面唤起app

在android4.4之后的webkit，google采用了chrome的游览器核心，而不是android webkit核心，

Android 4.4 (API level 19) introduces a new version of WebView that is based on Chromium. This change upgrades WebView performance and standards support for HTML5, CSS3, and JavaScript to match the latest web browsers. Any apps using WebView will inherit these upgrades when running on Android 4.4 and higher.
引用自“https://developer.android.com/guide/webapps/migrating.html”

在chrome里，为了保证协议的安全性，android禁止使用私有协议来唤起app，类似 alipay:// 的方式，只能采用 intent的方式

A little known feature in Android lets you launch apps directly from a web page via anAndroid Intent. One scenario is launching an app when the user lands on a page, which you can achieve by embedding an iframe in the page with a custom URI-scheme set as the src, as follows: . This works in the Chrome for Android browser, version 18 and earlier. It also works in the Android browser, of course.
The functionality has changed slightly in Chrome for Android, versions 25 and later. It is no longer possible to launch an Android app by setting an iframe's src attribute. For example, navigating an iframe to a URI with a custom scheme such as paulsawesomeapp:// will not work even if the user has the appropriate app installed. Instead, you should implement a user gesture to launch the app via a custom scheme, or use the “intent:” syntax described in this article.
引用自“https://developer.chrome.com/multidevice/android/intents”。

因此在android4.4之后，下载页面使用了intent协议来唤起原生app。

但是现在通过测试发现，在android4.4的app里嵌入了webview，在webview中需要打开app，是无法通过intent协议来唤起的，还是需要通过私有协议（例如alipay://）来唤起的。

这样会出现这样的情况，在下载页中，针对android4.4 chrome核心的游览器需要有两个分支逻辑：
1. 在webview中，采用alipay:// 协议唤起钱包app
2. 在原生浏览器中，采用intent:// 协议唤起钱包app

不过由于无法判断是否在webview中，（在微信、微博、来往里可以通过app设置的userAgent，但是不能保证后面的所有app都会这样做，也不适合在逻辑里，为每个app都写上特有的app的userAgent的判断），因此无法很好地判断，该页面是否在webview中还是在原生浏览器中。

现在有两个方案：
通过判断各个app的特性userAgent来确认是否在webview中，好处：能准确判断是否是某个app里的webview 弊端：后续需要不断添加app的userAgent，如果有个app，没有userAgent的特征，就无法判断了。
alipay://协议和intent://协议都尝试唤起一遍，好处：无需关于特性的平台（webview还是原生浏览器），一套代码，逻辑清晰 弊端：如果哪天，在android后续版本中，google修改了现有的方案，让webview既支持alipay又支持intent协议，这样会唤起两遍app。
两个方案，都无法完美的解决该问题。前一个依赖app的特征userAgent以及需要后续不断维护各app的特征userAgent,后一个依赖google，对私有协议和intent协议的支持度。

本人倾向后一个方案，可以对每个后续的google的版本以及重点机型做一下测试，如果发现问题，及时解决。毕竟android版本不会非常频繁的发。前一个方案过于依赖外部的app，万一某些app，对alipay做了某些特殊处理，页面就会非常难办。



## 创建附注标签

```git tag -a v0.1.2 -m “0.1.2版本”```

创建轻量标签不需要传递参数，直接指定标签名称即可。
创建附注标签时，参数a即annotated的缩写，指定标签类型，后附标签名。参数m指定标签说明，说明信息会保存在标签对象中。

## U+2028/2029和DOM based XSS的那些事儿

U+2028是行分隔符  http://unicode-table.com/cn/2028/
Unicode编号是```U+2028```，HTML代码是```&#8232;```

U+2029是段分隔符  http://unicode-table.com/cn/2029/
Unicode编号是```U+2029```，HTML代码是```&#8233;```

原文地址：http://masatokinugawa.l0.cm/2013/09/u2028u2029.domxss.html
原文发布时间:2013/09/17
小弟略懂日语。所以翻译出来和大家分享一下

在ECMAScript的规范里面有这样一段记载。除了0x0A/0x0D以外U+2028/2029也可以作为换行符来使用。我个人认为这个应该是很少有人知道的。让我们来举个例子：
<script>
//[U+2028]alert(1)
</script>
复制代码
正如我们所知上面的javascript是有效的。在我看来，就算知道U+2028/2029是什么，在开发的过程当中会连U+2028/2029都考虑进去的程序猿，应该是少之甚少吧。实际上由于这个问题在报错的程序有很多，但是如果只是报错我觉得也就说不上是什么问题了。但是正因为这个，我发现了几枚因为U+2028/2029引起的Google XSS.

案例1:只在IE和Chrome有效的一个vulnerability
下面是tools.google.com的一个例子
https://tools.google.com/foo/bar/install.html
复制代码
var url = String(window.location);
    var match = url.match(/(.*)www\.google\.com(.*\/install.html)/);
    if (match) {
    window.location = match[1]+"tools.google.com"+match[2];
    }
复制代码
正如大家看到的，这段代码会试图通过正则来获取URL并进一步进行redirect.但是遗憾的是，这段代码是有缺陷的。Exploit可以像这样：
https://tools.google.com/foo/bar/install.html#[U+2028]javascript:alert(1)//www.google.com/install.html
复制代码
在这里，这里正则会试图匹配所有换行符以外的文字。虽然不能直接在URL里插入0x0D或0x0A，但是在IE和chrome中对于【#】后面出现的U+2028/2029不会进行encode而直接包含在URL当中。最后匹配的「.*」也就会很顺利地变成「javascript:alert(1)//进而导致XSS漏洞的产生。
以上漏洞可以在chrome和IE9以上的版本重现。顺便说一下IE9以下的版本如果不是document mode，就无法漏洞的重现。 
案例2：只在IE下有效的例子
我发现了这样的一个页面。
https://www.google.com/intl/en/nexus/features.html
复制代码
var a = window.location.toString();
    return a.indexOf("intl") > -1 ? a.match("/(.*)/nexus/")[0] :
    "/nexus/"
复制代码
path最前端的「/intl/en/」为google service在很多地方会用到的URL.如果是「en」就是代表英语,「ja」就代表日语，进而同过相应的语言来显示页面。让我们来看看如何去欺骗这个正则吧！经测试发现，/intl/en/里面「en」处基本上是可以任意输入的。而当服务端发现该值异常时，就会自动跳到英语页面。然而实际上IE在处理#以后还是之外的部分，不论是path还是query都不会对U+2028/2029进行编码而直接包含在URL当中。如果是这样的话，只要像下面这样处理一下，就可以避开从第一个[/]到nexsus之间的正则。成功的exploit可以像这样:
https://www.google.com/intl/en[U+2028]/nexus/features.html?[U+2028]//attacker.example.com/nexus/#/help
复制代码
对于过分去解释这些正则，说实话我觉得确实有点麻烦。所以请你自己仔细看一下在这个url当中，正则到底会匹配什么。说实话 我觉得这几个XSS与其说是换行符的问题，我觉得是态度问题。顺便说1下，第一个XSS我拿了$3,133.7，而第二个XSS我拿了$5,000。


If we look at the JSON specification we see that the only place where a U+2028 or U+2029 can occur is in a string. Therefore we can simply replace every U+2028 with \u2028 (the escape sequence) and U+2029 with \u2029 whenever we need to send out some JSONP.



## 数组的浅拷贝比较简单的方法，用slice()

仔细比较一下下面的差别。

```
var a = [1,2,3];
var b = a.slice();
console.log(b); //[1,2,3]
a[0] = 666;
console.log(a); //[666,2,3]
console.log(b); //[1,2,3]


var a = [{c:1},{c:2},{c:3}];
var b = a.slice();
console.log(b); //[{c:1},{c:2},{c:3}]
a[0].c = 666;
console.log(a); //[{c:666},{c:2},{c:3}]
console.log(b); //[{c:666},{c:2},{c:3}]
```

## 条件判断


条件表达式例如 if 语句通过抽象方法 ToBoolean 强制计算它们的表达式并且总是遵守下面的规则：

对象 被计算为 true
Undefined 被计算为 false
Null 被计算为 false
布尔值 被计算为 布尔的值
数字 如果是 +0、-0 或 NaN 被计算为 false，否则为 true
字符串 如果是空字符串 '' 被计算为 false，否则为 true

```
if ([0]) {
  // true
  // 一个数组就是一个对象，对象被计算为 true
}

// bad
if (name !== '') {
  // ...stuff...
}

// good
if (name) {
  // ...stuff...
}

// bad
if (collection.length > 0) {
  // ...stuff...
}

// good
if (collection.length) {
  // ...stuff...
}
```

## h5中软键盘弹出和收起状态的判断

在编写h5页面的时候的，我们经常需要判断键盘弹出和收起的状态，来展示和隐藏元素。按正常理解，一个texterea或者input元素，onfocus事件的时候会触发键盘弹出，onblur的时候触发键盘收起。但是光靠这两个事件并不能判断键盘的弹出和收拢状态。android上，点击软键盘的收拢键，或者点击物理键的回退键，都会回收拢软键盘，但不会触发onblur事件。而在ios上，当点击textarea和input区域外时并不会触发onblur事件。那有什么方式可以来判断软键盘的状态呢？

在android上，当软键盘状态改变的时候，会触发window的resize事件，所以我们可以进入页面的时候保存一次window.innerHeight的值，当window的resize事件触发的时候，比较window.innerHeight的值与前一次保存的window.innerHeight的值大小来判断软键盘的收拢和弹出状态。
```
var winHeight = window.innerHeight;
if (isAndroid) {
    window.addEventListener('resize', function(e) {
        var tempHeight = window.innerHeight
        if (tempHeight < winHeight) {
            bShowRec = false;
        } else {
            bShowRec = true;
        }
    });
}
```
而在ios上，软键盘状态改变的时候，并不会触发window的resize事件，但是当软键盘的“完成”按钮被点击的时候，会触发onblur事件。所以正常通过onfocus和onblur事件来判断就行。

注：

上述方法在旋转屏幕的时候会有问题，应该加一个逻辑判断—— 判断window.innerHeight是否改变的同时判断当前window.innerHeight是否就等于原来的window.innerWidth


## white-space的另外几个属性

white-space: normal | nowrap | pre | pre-wrap | pre-line 

我们重点关注pre开头的几个属性。pre是preserve(保留)的缩写。没错，它就跟保留空格有关系。

pre: 保留所有的空格和回车，且不允许折行。 

pre-wrap: 保留所有的空格和回车，但是允许折行。 

pre-line: 会合并空格，且保留折行



pre：
用等宽字体显示预先格式化的文本，不合并文字间的空白距离，当文字超出边界时不换行。可查阅pre对象

nowrap：
强制在同一行内显示所有文本，合并文本间的多余空白，直到文本结束或者遭遇br对象。

pre-wrap：
用等宽字体显示预先格式化的文本，不合并文字间的空白距离，当文字碰到边界时发生换行。

pre-line：
保持文本的换行，不保留文字间的空白距离，当文字碰到边界时发生换行。


## 为什么浏览器会自动压缩空格？

规范如此,就是这么任性 https://www.w3.org/TR/REC-html40/struct/text.html#h-9.1
如果不自动压缩空格，那我们写html的时候就只能写成1行了，否则先这样的代码就会出现大段的空白。

平文本可以配合white-space: pre-wrap来解决多空格压缩显示问题
富文本采用的解决方案是对空格进行间隔html转义，这种方法更灵活，可以适应不同的场景，也适用于平文本。

http://www.alloyteam.com/2016/05/css-word-for-word-breaker-do-you-really-understand/


## 奇葩的隐式转换

![]
//false

!![]
//true

![[]]
//false

+[]
//0

[]+[]
//""

![true]
//false

[true]+[false]
//"truefalse"

+[true]
//NaN

+[false]
//NaN

+[0]
//0

+[1]
//1

+[100]
//100

+[]
//0

!+[]
//true

+!+[]
//1

true + true
//2

true + false
//1

+!+[]+!+[]
//2




false       =>  ![]
true        =>  !![]
undefined   =>  [][[]]
NaN         =>  +[![]]
0           =>  +[]
1           =>  +!+[]
2           =>  !+[]+!+[]
10          =>  [+!+[]]+[+[]]
Array       =>  []
Number      =>  +[]
String      =>  []+[]
Boolean     =>  ![]
Function    =>  []["filter"]
eval        =>  []["filter"]["constructor"]( 'alert()' )()
window      =>  []["filter"]["constructor"]("return this")()

http://www.jsfuck.com/


## 一种比较方便的控制按钮disable状态的方法

直接使用disabled属性(这一点在使用vue.js等框架时尤为方便)。当按钮为disabled的时候，click事件自动会失效。而如果要设置disable状态的样式，可以用:disabled伪类选择器。


## 设计模式

如果程序员没有明确意识到他使用过某些模式, 那么下次他也许会错过更合适的设计 (这段话来自《松本行弘的程序世界》)


## 一些学习历程和学习方法
摘自：https://zhuanlan.zhihu.com/p/22545574

### 被误以为的学习

我不否认知乎存在有价值的知识，但，根本不值得你花那么多时间，去发现那少的可怜的知识。去读书吧。用最系统的逻辑，去学会一项技能…… 现在，最可怕的是大家在知乎上消费着垃圾，却依然觉得自己在吃着奶酪。

### 目标和激励很重要

对于很多初学者来说，总是抱着书学，其实也是同样的后果，你无法获得任何的反馈和激励，以至于觉得一件事情越做越难。学习的过程，最好能定一个简单的目标，比如：“我即便现在什么都不会，我就要做个小游戏出来，这个游戏应该是这样的一个玩儿法，blablabla。”，做出来后，快些去找用户，可以是你的朋友，也可以是你的父母，最好是那些不吝惜赞美的朋友们，让他们无形之中给你一些动力。

### 你永远无法一步达到完美

很多的开发者在刚开始的时候，缺乏清晰的计划，却想一步登顶完美的境地。这是很可怕的想法。就好比，我一个很少登山的人，却在第一次的时候，就决定登顶珠峰，结果自然可想而知。在实践自己想法的时候，最好能考虑以最低成本去展现你想法的核心部分，而非一个大而全的方案。

从最小成本的想法核心，一步步的去验证自己的想法，去收集反馈，调整策略。最终抵达一个正确的目标。

### 培养一些对产品的感觉

看些什么呢？看看一个优秀的 App 早起的冷启动是怎么做的，看看 Apple Store 或者 Google Play 上最近有没有什么新奇的 App 出现，看看 Tech Crunch 上最近又有什么天马行空的项目融到了钱。

想些什么呢？想想一个产品功能的存在有没有意义，他的下个阶段又会怎么发展，想想某段文案是否会降低产品某个功能的转换率，想想某个动画效果是否是很恼人的存在，如果你可以对微信加一个功能，减一个功能，你又会作何选择。

### 每个人都应该有个 idea list

我在西安读大学那会儿开始，就有一个小本子，记录着突然冲入自己脑海的一些靠谱或是离谱小想法。上面会写着类似：

做个 Every big moment，用手机记录自己的每个值得纪念的瞬间，然后打印成相册发给我或者放在网上当做自己的 Profile。
狗狗出门便便，主人打扫很不方便，有没有更好的方案？
程序一旦崩溃，直接发送操作记录和堆栈信息到 Dashboard，而不要让测试人员努力重现，写个 SDK，搭建一套服务，一定会很好用。
很多的 Bug 追踪服务，为什么不在错误堆栈旁边，展示出来这个 Bug 的解决方案，哪怕是一个 StackOverflow 的链接也好，这样我就不用去自己搜索了。
那个小本上记录了自己好多做产品的想法，有不少，后来市面上都出来了相应的产品。也有一些现在看来很可笑，有的想法今天再翻看的时候，仍然会冲动的想要组团队去实现。

Idea list 总是能激发你去创造的欲望，有空，就去不断的记录自己的 Idea list 吧。

另外，不要把自己的 idea 当做一个秘密，多和人去讨论自己的想法，在不断的否认和肯定中，完善自己的想法，idea 是不值钱的，只有实现它才是有价值的。


## HTTP状态码

100  Continue  继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
200  OK   正常返回信息
201  Created  请求成功并且服务器创建了新的资源
202  Accepted  服务器已接受请求，但尚未处理
301  Moved Permanently  请求的网页已永久移动到新位置。
302 Found  临时性重定向。
303 See Other  临时性重定向，且总是使用 GET 请求新的 URI。
304  Not Modified  自从上次请求后，请求的网页未修改过。

400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
401 Unauthorized  请求未授权。
403 Forbidden  禁止访问。
404 Not Found  找不到如何与 URI 相匹配的资源。

500 Internal Server Error  最常见的服务器端错误。
503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

## 获取指定范围内的随机数

这个功能在生成测试用的假数据时特别有数，比如介与指定范围内的工资数。
var x = Math.floor(Math.random() * (max - min + 1)) + min;


## 验证是否是数组

function isArray(obj){
    return Object.prototype.toString.call(obj) === '[object Array]' ;
}


## uc下的一个bug

不支持.classnam:before{xxx}这样的伪类样式

## IE6-8下的CSS选择符限制

摘自：http://www.blueidea.com/tech/web/2009/7003.asp

IE中每个style标签或css文件的选择符个数不能超过4095。其实style属性也应该有这个限制，但是几乎不可能发生。这个限制在IE6、IE7和IE8中存在。参见demo: http://www.blueidea.com/articleimg/2009/09/7003/index.html

DEMO中的 style.css 有4913个选择符，大小为554kb，但在IE中却在4095个选择符之后失效。所以在IE中对style标签使用 addRule方法 和 cssText属性 添加样式时都可能会碰到这个限制，比如使用addRule方法添加第4096个选择符时会报“Invalid Argument”的异常。


## 两种ie7-8下实现nth-child的替代方法：

（1）用+选择符代替实现:nth-child的作用

摘自：http://blog.abouthalf.com/development/poor-mans-nth-child-selector-for-ie-7-and-8/

Internet Exploer 7, and 8 do not support the nth-child pseudo element selector, but they do support the adjacent sibling selector. This means you can fake a basic nth-child selector for IE with the following:

/* standard nth */
ul.menu li:nth-child(3)
{
    /* styles for the 3rd LI */
}

/* IE nth */
ul.menu>li + li + li 
{
    /* styles for the 3rd LI */
}

/* alternate, more specific IE nth */
ul.menu>li:first-child + li + li 
{
    /* styles for the 3rd LI */
}

（2）使用JQuery解决IE8不支持CSS3的nth-child()问题

摘自：http://www.openkee.com/post-184.html

jQuery :nth-child() 选择器的使用方法和 CSS3 的:nth-child()没什么两样，兼容性不必担心。


:nth-child(odd)用于匹配奇数子元素

:nth-child(even)用于匹配偶数子元素

:nth-child(n)用于匹配第n个元素

:nth-child(an)用于匹配倍数为a的元素，如3n、5n…

可以是一个公式，如:nth-child(3n+1)匹配第1、第4、第7…个元素

:nth-child(-n+3)匹配前3个元素

:nth-child(-3n+8)匹配第8、第5、第2个元素


关键是判断是否为 IE8 浏览器，然后执行代码

```
if($.browser.msie && parseInt($.browser.version, 10) == 8) {
...
}
```


## IE6下的一些bug

### IE6下最小高度问题 在IE6下元素的高度的小于19px的时候，会被当做19px来处理

解决办法:overflow:hidden;

## IE6-8不支持的样式和属性

window.innerWidth 和 window.innerHeight， 这两个属性在ie6-8都是undefined

对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
window.innerHeight - 浏览器窗口的内部高度
window.innerWidth - 浏览器窗口的内部宽度
对于 Internet Explorer 8、7、6、5：
document.documentElement.clientHeight
document.documentElement.clientWidth
或者
document.body.clientHeight
document.body.clientWidth
实用的 JavaScript 方案（涵盖所有浏览器）：

var w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


## Markdown 插入表格语法

例子1：

```
| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------| ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |
```
显示解雇如下：

| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------| ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

例子2:

```
| 左对齐标题 | 右对齐标题 | 居中对齐标题 |
| :------| ------: | :------: |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |
```

显示结果如下：

| 左对齐标题 | 右对齐标题 | 居中对齐标题 |
| :------| ------: | :------: |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

语法说明：

（1）|、-、:之间的多余空格会被忽略，不影响布局。

（2）默认标题栏居中对齐，内容居左对齐。-:表示内容和标题栏居右对齐，:-表示内容和标题栏居左对齐，:-:表示内容和标题栏居中对齐。

（3）内容和|之间的多余空格会被忽略，每行第一个|和最后一个|可以省略，-的数量至少3个。


### Touch事件对象

当事件类型为touchend时，移开屏幕的那个触摸点，只会包含在 changedTouches 列表中，而不会包含在 touches 或 targetTouches 列表中

```
ele.addEventListener('touchend', function (e){
    var point = e.changedTouches[0];
    console.log( point );
}, false)
```

### 当文字控制n行超出截断时，有时候会出现剩余的行显示一点点的情况，这时可以给它加上`-webkit-box-pack: center;`用以控制它垂直居中，以便把多余的那一点点被显示的内容隐藏起来。

### background-clip: border-box|padding-box|content-box; 

![](http://www.w3school.com.cn/tiy/c.asp?f=css_background-clip)


### canvas画线

lineTo的值超过超过999999999，不显示

画1px细线变得很粗，用ctx.translate(0.5,0.5);进行修正


### 调整chrome浏览器的最小字号

在chrome://settings/中“显示高级设置”——》“网络内容”——》“自定义字体”——》“最小字体”拖动到“最小”, 这样就可以在chrome浏览器中调整最小字体了。


### 当一行文字以中文书名号开头的时候，要想跟另一行非中文书名号开头的文字对齐，可以用让该行文字左移动小半个字符宽度的方式使之对齐，比如，可以设置：

```
position: relative;
left: -0.4em; //或者right: 0.4rem
```


### 通过设置v-if来控制在数据没出来之前不渲染组件

### vue.js获取当前组件的元素可以用 v-el:progress ， 然后再用this.$els.progress去引用。但要注意，是v-el:progress 而不是 v-el="progress"


### 一个效果不错的缓动函数

```
 -webkit-transition: all 600ms cubic-bezier(0.23, 1, 0.32, 1);
  transition:         all 600ms cubic-bezier(0.23, 1, 0.32, 1);
```
  
  缓动进入.
  
  更多效果见这里： http://easings.net/zh-cn#

this.canvasWidth = containerWidth * ratio;
                    this.canvasHeight = containerHeight * ratio;



### svg一像素细线

.mixin-svg-thin-line(@clr) {
    @svg-code: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="6" height="6"><rect x="0" y="0" width="6" height="6" fill="none" stroke="@{clr}"/></svg>');
    -webkit-border-image: @svg-code 2 round;
    border-width: 1px;
}

.thin-line-blk-10 {
    .mixin-svg-thin-line(fade(#000, 20));
}

.xxx:extend(.thin-line-blk-10){ border-width: 1px 0 0 0; }

### 

document.referrer在app native中跳过来的时候没有，在app 中pushwindow过来的时候也没有。

### pulldata调试

}, this.processData.bind(this));

processData: function (x,result) {

try{

}catch(e){
	console.log(e)
}


### 安卓下点击穿透与¥的乱码问题

最近无线的业务做的比较多，一个字，一步一坑，这两个问题比较典型，总结一下。

页面基于KIMI

点击穿透
设备：
三星i9100，android 4.3

场景：
商品列表页，点击出现浮层，再点关闭浮层的时候，同时触发了浮层下面列表页的超链接，导致页面跳转。

排查：
对点击对象（关闭按钮）绑定tap事件做隐藏浮层操作，并对其touchstart，touchmove，touchend事件都做了preventDefault，照样穿透。

    $('.km-dialog').on(‘touchstart touchend touchmove','.km-dialog-btn',function(ev){
        ev.preventDefault()
    }).on('tap', '.km-dialog-btn', function(ev) {
            ev.preventDefault();
            $('.km-dialog').css('visibility', 'hidden');
         })
注释掉事件响应函数中的其他脚本（隐藏浮层visibility:hidden；），只保留preventDefault，结果，穿透被阻止。

原因：
因为采用的事件代理，当事件代理的对象.km-dialog被隐藏掉的时候，事件代理随之失效，对应的preventDefault自然也失效，此处使用display:none;效果一样。

解决方案：
看代码就知道了

    if($.os.android){
                $('.km-dialog').css('opacity', 0);
                timer = setTimeout(function(){
                    $('.km-dialog').css('visibility', 'hidden');
                    $('.km-dialog').css('opacity', 1);
                },700);
        }
没错，先设置opacity:0，再延迟隐藏，因为不知道还有哪些奇葩的安卓版本和手机会有这个情况，所以对安卓都这样处理了。

¥的乱码问题
设备：
华为Ascend P7 ， android 4.4

场景：
用&yen;表示人民币符号的时候始终显示小方块

排查：
以为是name不识别，换做&#165;，&#xa5;，%A5，%C2%A5 ，通通通不行
以为是受iconfont影响，检查了一下，没有使用iconfont
以为是没有设置font-family，设了 Arial，Tahoma等等其他字体，不管用
最后在google上中英文各种搜终于找到一点蛛丝马迹：部分Android设备内嵌页人民币￥符号显示错误，经过人民币货币符号是「Y」加一横还是两横？以及全角半角的研究，终于理清了思路。
原因：
¥这个特殊字符在Unicode中有两种标识’U+00A5’和’U+FFE5’，前者叫YEN SIGN，后者叫FULLWIDTH YEN SIGN，意思很简单，一个是半角，一个是全角。
计算机诞生之初，原本一个字节已经搞定所有的英文和拉丁文，也就是半角，但是等中日韩等国人民登上计算机历史舞台之后，明显不够用了，所以改用两个字节来表示汉字，但为了书写整齐以及配套，原先只需要一个字节的其他符号包括¥也都有了双字节版本，这就是全角。
&yen;这个符号其实是半角的羊角符，而我国国标码指定的人民币货币代号是U+FFE5，也就是全角的羊角符&#65509;
所以这种问题在国外品牌手机中一般是不会出现的，而华为，中兴，小米。。。等等国产手机，你懂得，必须遵从国标，所以。。
解决方案：
&yen;改成&#65509;

但是！
到这里肯定会有人问？为什么我的页面用了&yen;，在华为手机上也能正常显示¥？
的确，这种情况不是随时出现的，大部分情况下，&yen;会被识别，那是什么导致的无法识别呢？

答案是：

不知道！

我比对了乱码和不乱码的两个页面，没有找到区别，问题多半出在app的webview或者手机的编码支持上，这个问题暂时就留给各位看官吧，有答案的请不吝指教。

补充：
有基友提示可能是受html lang的影响。

### 字体设置最佳实践

body {
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
}
iOS 4.0+ 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica。

中文字体设置为华文黑体STHeiTi。

需补充说明，华文黑体并不存在iOS的字体库中(http://support.apple.com/kb/HT5484?viewlocale=en_US)， 但系统会自动将华文黑体STHeiTi兼容命中系统默认中文字体黑体-简或黑体-繁：

Heiti SC Light 黑体-简 细体
Heiti SC Medium 黑体-简 中黑
Heiti TC Light 黑体-繁 细体
Heiti TC Medium 黑体-繁 中黑
原生Android下中文字体与英文字体都选择默认的无衬线字体。

4.0之前版本英文字体原生Android使用的是Droid Sans，中文字体原生Android会命中Droid Sans Fallback。

4.0+ 中英文字体都会使用原生Android新的Roboto字体。

其他第三方Android系统也一致选择默认的无衬线字体。

### 消除 transition 闪屏

两个方法

-webkit-transform-style: preserve-3d;
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-backface-visibility: hidden;
/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/

消除 IE10 里面的那个叉号

input:-ms-clear{display:none;}
来源出处：http://msdn.microsoft.com/en-us/library/windows/apps/hh767361.aspx

### 电脑安装ios app的调试包

给IOS模拟器装上app

使用xcode对app源码进行编译，成功后在下方路径产生app包

~/Library/Developer/Xcode/DerivedData/{your app}/Build/Products/Debug/{Project Name}.app

我们可以将此包提取出来提供给没有源码权限的同学来使用

然后我们可以使用hpm sim install 进行安装



模拟器中安装APP：  xcrun simctl install booted app_file_path.app
模拟器中手淘打开页面： xcrun simctl openurl booted xxx://wwww.aaa.com

xcrun simctl install booted <app path>

xcrun simctl launch booted <app identifier>


安装charles： http://www.charlesproxy.com/download/
手机安装证书：
Charles版本是3.10版本以前的，证书下载地址： http://www.charlesproxy.com/documentation/additional/legacy-ssl-proxying/ 下载后可以通过邮件附件的形式发送到手机，然后手机下载安装。
Charles 3.10版本以及之后的版本，证书安装方式：
首先确保手机连接charles作为代理（手机上请求charles可以抓到）
然后手机浏览器访问：http://www.charlesproxy.com/getssl/
下载证书后直接安装即可
Charles配置： 在Charles的菜单栏上点击Proxy，选择Proxy Settings，切换到SSL选项卡（新版本是 点击Proxy选择SSL Proxying Settings），勾选Enable SSL proxying，然后在locations 中添加需要抓包的接口 charles配置
手机连接charles后即可抓到https请求，示例如下： charles抓包
fiddler抓包https请求
备注：android可用，测试发现ios不可用……

fiddler配置 菜单：Tools-> Fiddler Options->Connections，勾选"Capture HTTPS CONNECTs"后，再勾选"Decrypt HTTPS traffic"、"Ignore server certificate errors"。
下载HTTPS证书 首先确定Fiddler所在电脑的IP地址：例:10.1.231.120 打开被测手机浏览器，访问http://10.1.231.120:8888， 点“FiddlerRoot certificate" 下载证书 或者pc上下载后导入到手机的存储卡中
安装证书 点击系统的设置—》安全—》从存储设置安装—》选择证书所在的目录，点击安装即可。
遇到问题
手机无法连接charles或者fiddler代理，但是pc浏览器可以（此问题多出现在重装charles或者fiddler后） 解决方案：进入windows防火墙页面，点击’允许程序或功能通过windows防火墙’，然后将charles和fiddler程序都勾选上。 防火墙设置1
防火墙设置2

设置SSL Proxying Settings的时候，可以把host和port都填写*,就设置默认匹配所有的https的包。

安装https证书的坑：有些手机安装不了，需要在设置》安全下安装证书。

在pc端，证书安装完后要选择信任证书。

### 

那些高产出的人，未必动作更快，而是更善于判断，什么事情对结果是最有效的，然后，用尽一切办法保证结果达成，而不是死守着原有的工作任务。

思维训练营里，有学员问我：如何让自己对一个行业有真知灼见？
想想看，如果是你，会如何回答？
我的回答方式，是反问她：具备真知灼见的目的是什么呢？是想让客户更加信任你、还是想让老板看到你的进步？
假设你是希望客户信任你，觉得你懂他，那你要做的，就是看这个行业里的客户有什么痛点，然后针对这几个痛点，下功夫研究和分析，有更多洞见，然后借机沟通出去。了解一个行业，是一个太大的话题，没有目标，根本无从下手。

他们每天起来的第一件事，不是规划当天的工作，而是马上投入工作，以至于到了下班之后，发现还有很多事情没做完，而没做完的，可能又是最重要的。

当你正在工作的时候，老板布置了一个任务、客户又来了一个问题，你会如何呢？很多人就直接扑到临时任务上去了，但真正好的做法是，如果不是十万火急，你可以快速用关键词记在笔记本上，不需要任何思考，然后马上回到刚才的任务，做完再看笔记本。

另外，你在一天当中，学到了什么、犯了什么错误，当时也要记下来，因为过了那个时候，你很快就会忘，然后继续犯这个错误。当然，这些记录，晚上都需要进行整理。 

另外，记录还有一个好处，就是可以减轻大脑负担。每天的例行工作、自己常犯的错误，这些都可以列清单。你的大脑是用来思考的，是很宝贵的，别把一支笔就可以做的事情，强加给你的大脑来做。

实际上，工作性质对一个人的思维方式、行为习惯的影响，大到超乎想象。

在噪音极大、灯光昏暗的厂房里，我看着流水线工人机械地盯着机器、等待换箱，几个小时下来，我自己也开始反应迟钝、敏锐度下降了。

很多公司并不像Google那样，重视对新人工作方式的培养，将Work Smart提到非常高的位置。 
他们往往只重视教员工What（需要做哪些事情、用什么工具等等），却没有How（如何聪明地做这些事情）和Why（这些事情对公司、对客户有什么帮助、要达到何种目的），导致员工的聪明才干发挥不出来，没有成就感。

###

h5底部输入框被键盘遮挡问题

暁麦 暁麦 浏览 127 2015-11-20 17:40:09 发表于： 猿来如此
前端与交互设计   修改标签   标签历史
移动端的软键盘一直是个头疼的问题，最坑爹的问题之一，就是在ios下，如果输入框在页面底部，键盘弹起会遮挡住输入框

如下图

系统自带输入法

1

第三方输入法

2

而且很奇葩的是，系统自带输入法，第一次进页面，focus输入框的时候，一定会被键盘遮挡住，第二次进页面就正常了；而第三方输入法，则是每次必现。

从表现上来看，很像是软键盘高度没有把form辅助区（也就是done那一行内容）计算进去，导致键盘出现把整个webview顶起的高度不对。

那么这个问题如何解决呢？

一开始我是走进了死胡同，想着native来解决。当然，本质上，这还是webview的问题，从根本上解决还是要靠native。在h5群里咨询过，暂时无解。

那么换个思路，用前端的技术手段能否解决。输入框被挡住，如果能让输入框滚动到可见区域就好了。不知道大家有没有想起来一个方法——*scrollIntoView*

scrollIntoView
这个方法是通过滚动使节点可见，文档

element.scrollIntoView(alignWithTop);
alignWithTop 可选。如果为true，则节点被滚动到滚动区域的上边界。如果为false，节点出现在下边界。
这么看如果在focus的时候执行scrollIntoView(false)，应该是可行，那么试一下

3

可以看到输入框完全显示出来，只是样式上有点小问题，输入框下面的白色padding没了
这个解决方案就比较简单了，如图

4

问题到这里其实还没有完全解决，如果切换输入法，由于不同输入法高度不同，又会出现被遮挡问题。解决思路也很简单，如果能捕获到切换输入法按钮的keyup/keydown事件，那么再scrollIntoView一下就好啦。

坑爹的是，无法捕获到切换输入法按钮的keydown事件，po主内心是崩溃的

5

只能出大杀器了！轮询！！其实我很拒绝这样...

最后，产品二维码



### 支付宝测试离线包一定要用rc包

### 前端代码保障的方法分为五个部分

静态代码扫描
单元测试
UI 测试
线上监控
文档

其中静态代码扫描和单元测试主要在代码还没有上线前生效，它们的作用是保证最基本的应用逻辑及语法不出问题；UI 测试及线上监控则需要应用上线（daily、预发、线上）后才能开始使用，主要是保证线上环境稳定；文档则是为了保证代码的可读性和可维护性。

### mac终端下运行shell脚本
 
1、写好自己的 脚本，比如aa.sh 
 
2、打开终端 执行，方法一： 输入命令    ./aa.sh     ,
 
方法二：直接把 aa.sh 拖入到终端里面。

### 关于webpack打包，加入postcss后时间增长的测试

console.log(((34089+34161+34752+35186+32289)-(31884+31030+32794+31267+30722))/5)

//2556ms

写个printtime.js文件

```
console.log(new Date().getTime());
```

然后在package.json的scripts下对应的选项中加入`node /Users/user/05proj/aaa/pinttime.js`，并用` && `进行连接。


1、2、3、4、7、8


### 比较少用到的一些函数

Object.keys

返回的是一组key串组成的数组。

location.replace()

Location.replace()方法以给定的URL来替换当前的资源。 与assign() 方法 不同的是调用replace()方法后，当前页面不会保存到会话历史中（session History），这样用户点击回退按钮将不会再跳转到该页面。


### 从cookie中解析某个属性

```
var userId = document.cookie.match(/(?:^|\s)uid=([^;]+)(?:;|$)/); 
```

//各个cookie键值对之间会有一个空格。每个键值对之间以分号进行分割。

### 如果你想在自己写的 Android WebView Demo 上调试你的 web 页面，请在你的工程初始化 WebView 的地方加上这么一句代码： webView.setWebContentsDebuggingEnabled(true); 打开 WebView 调试模式。

### 如何在android app 上调试h5

安装 ADB

ADB 包含在 Android SDK 里，所以你需要安装 Android SDK。

方法一：

使用 HomeBrew 快速安装 

`brew install android-sdk`

配置环境变量，在 ~/.bashrc 或者 ~/.zshrc 中添加 
export ADB_HOME=/Users/{User}/Library/Android/sdk/platform-tools

export ANDROID_HOME=/Users/{User}/Library/Android/sdk

方法二：

手动安装，到这里去下载最新版本的 Android Studio，然后在首次启动时，Android Studio 会替你把所有的环境都下载好，你只需要付出一些等待的时间。
下载 Genymotion

点此下载，你需要先注册一个账号，后面用于下载 Android 虚拟机包。


打开 Genymotion 模拟器(这里我为了方便截图演示，所以不在真机上调试)，使用 adb 安装日常包，

adb install -f app-debug-unaligned.apk 

安装的时候可能会遇到安装失败的情况，这可能是因为CPU 架构不匹配导致的，http://blog.csdn.net/wjr2012/article/details/16359113下载GenyMotion-ARM-Translation_v1.1.zip，然后在Genymotion中启动一个虚拟机，把下载好的那个文件拖进去，然后重启虚拟机即可。

现在在 Chrome 上新开一个新窗口，地址栏输入 chrome://inspect，打开 DevTool 工具，找到我们需要调试的那个页面，这里是众包-首页广场页面，点击 inspect ，Chrome 会打开一个调试页面，是不是很熟悉，接下来就可以进行调试了

手淘安卓客户端在 5.3.2 版本更换了 WebView 的内核，换成了 UC 浏览器内核，所以，在手淘客户端上调试 H5 页面也就等同于在 UC 内核上调试。


1. 安装 ADB

ADB 包含到 Android SDK 里，所以我们先安装 Android SDK，你可以使用 HomeBrew 快速安装

`brew install android-sdk`，或者开启人工智能模式 Android SDK

我不确定 ADB 是否需要 JDK（严格来说只有开发阶段才会用到 JDK，如果需要也应该是 JRE 才对），我已经安装了 Java，如果不是拿刀架在我脖子上，我是肯定不会卸载了测试下的，遇到问题的同学可以点这个 Java
我使用的 brew 安装，安装完遇到的第一个问题就是 执行 adb 找不到 Platform-tools，原因是 SDK 并未包含 Platform-tools 包，此时你需要 

`open /usr/local/opt/android-sdk `找到 tools 目录下的 android，执行它，会弹出 SDK 管理器，并安装 Platform-tools。

如果遇到 log 提示 "Failed to fetch URL https://..." 是因为 https 不可用（why?），此时点击工具栏 preferences，勾选 "Force https://... sources to be fetched using http://..." 即可。

这时执行`adb devices`，应该可以看到有设备连接了，如果没有，执行

```
adb kill-server
adb start-server
```
 
并重新连接 USB


开始 Debug

手机打开任意页面，连接设备后，执行`adb forward tcp:端口号 tcp:9998` 这时访问 127.0.0.1:端口号，会被代理到移动端 127.0.0.1:9998，这时就可以愉快的 Debug 了。

你也可以无线 Debug，移动端连接 WIFI，并连接设备，执行 adb shell ifconfig wlan0 获得设备 IP， 这时可以断开 USB，开始无线调试（你可以权衡下是否需要这么做）。

###  iOS app调试（真机）

如果你有源码并能在 Xcode 中编译运行的话，就可以直接在真机上调试移动端 H5 应用。从 Xcode 7 开始真机调试不再需要苹果开发者账号了，只要一般的 Apple 账号即可。Xcode会根据你的苹果账号生成 development provision file 并安装到设备上，以支持真机调试。


### 在写代码时要想象最终维护你的代码的人是个有暴力倾向的精神病患者，而且他知道你住在哪儿（这样你就能更谨慎地写好代码了）。 John F. Woods, 1991 年 11 月


### 简单版的显示FPS的办法

```
showFps : function(){
    let requestAnimationFrame =
        window.requestAnimationFrame || //Chromium
        window.webkitRequestAnimationFrame || //Webkit
        window.mozRequestAnimationFrame || //Mozilla Geko
        window.oRequestAnimationFrame || //Opera Presto
        window.msRequestAnimationFrame || //IE Trident?
        function(callback) { //Fallback function
          window.setTimeout(callback, 1000/60);
        };
    let fps = 0;
    let last = Date.now();
    let step = function(){
      let offset = Date.now() - last;
      fps += 1;
      if( offset >= 1000 ){
        last += offset;
        let sv = document.querySelector('#debug-info-fps').innerHTML = 'FPS : ' + fps;
        fps = 0;
      }
      requestAnimationFrame( step );
    };
    step()
  }
```

### 对于该不该写测试？测试用例覆盖到何种程度的见解

个人比较倾向于先写少量的测试用例覆盖到80%+的场景，保证覆盖主要使用流程。一些极端场景出现的bug可以在迭代中形成测试用例沉淀，场景覆盖也将逐渐趋近100%。但对于迭代较快的业务逻辑以及生存时间不长的活动页面之类的就别花时间写测试用例了，维护测试用例的时间大了去了，成本太高。


1、测试框架： Mocha 、 Jasmine 等等  主要提供了清晰简明的语法来描述测试用例。
Mocha既支持TDD也支持BDD，而Jasmine只支持BDD

2、断言库： Should.js 、 chai 、 expect.js 断言库提供了很多语义化的方法来对值做各种各样的判断。

3、代码覆盖率： istanbul 等等为代码在语法级分支上打点，运行了打点后的代码，根据运行结束后收集到的信息和打点时的信息来统计出当前测试用例的对源码的覆盖情况。


### 获取当前路径

path.basename(process.cwd())

### JSON.stringify(value, replacer, space) 后面可以带三个参数

使用`JSON.stringify(value, null, 4)`可以将value的所有字段格式化成缩进为4个空白字符的格式。比如，在编写脚手架的时候，可以用它来生成package.json文件的格式。

参数

- value
将要序列化成 JSON 字符串的值。

- replacer 可选

如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；
如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；
如果该参数为null或者未提供，则对象所有的属性都会被序列化；
关于该参数更详细的解释和示例，请参考使用原生的 JSON 对象一文。

- space 可选
指定缩进用的空白字符串，用于美化输出（pretty-print）；
如果参数是个数字，它代表有多少的空格；上限为10。改值若小于1，则意味着没有空格；
如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；
如果该参数没有提供（或者为null）将没有空格。

```
fs    = require('fs');

function versionIncrement(version) {
    try {
        var pkg = JSON.parse(fs.readFileSync('package.json'));

        if (version) {
            pkg.version = version;
        } else {
            var versionList = (pkg.version || '0.0.1').split('.');

            versionList[2] = parseInt(versionList[2]) + 1;
            pkg.version = versionList.join('.');
        }

        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 4));
    } catch (e) {
        console.log('Modify version failed!');
        throw e;
    }
}

versionIncrement(process.argv.splice(2)[0]);
```


### JS中return有时会遇到这种情况，具体表现为:

google浏览器等浏览器可以继续执行，IE浏览器不能执行return，并且
google浏览器:执行时会显示SyntaxError: Illegal return statement；
IE浏览器：
问题原因：'return' 语句在函数之外。
JS语法中return是不能写在函数外的，例如说
```
<html>
<body>
<script>
var a=“精益六西格玛公开班”;
return a;
</script>
</body>
</html>
```
这样写是会报错的。

解决方法：如果确实需要return
两种解决方法：
一、把return写到其他的函数里面去。
二、写成闭包：(function(){return;})();



4、*

匹配前一个字符0次或者是多次。

所以：

.*  表示匹配除了换行符（\n）之外的任何字符0个或多个

5、?

匹配前面一个字符0次或者1次，和{0,1}有相同的效果。

所以：

(?:\.(jpg|png|gif|jpeg|webp))? 匹配.jpg、.png、.gif、.jpeg、.webp

(\/.*(?:\.(jpg|png|gif|jpeg|webp))?) 匹配/开头中间包含任意多个非换行字符。结尾可以是.jpg、.png、.gif、.jpeg、.webp这几个文件格式，也可以没有这几个文件格式，即/xxxx的形式。

值得注意的是：如果'?'紧跟在在任何量词*, + , ?，或者是{}的后面，将会使量词变成非贪婪模式（匹配最少的次数），和默认的贪婪模式（匹配最多的次数）正好相反。比如，使用/\d+/非全局的匹配“123abc”将会返回“123”，如果使用/\d+?/,那么就只会匹配到“1”。


### 回头看

2016.2.3

项目推进：

1、通过自测调用以往的微信签名接口成功，在得到服务端确认可以使用现有接口的情况下，使用现有接口，节省成本；
2、域名开通后，将kfc关键词过滤接口改成新域名的接口，自测中发现接口不支持https，同时再向运行确认了下是否有推广到必需https场景的地方，以初回复只考虑在微信中推广，因此接口仍旧维持只支持http；
3、给运营同学简单讲解了数据填录的注意事项，并让运营同学初步填入了一部分数据，以便于测试查看排版是否走样。

项目接近尾声，总结一下在其中的收获：

项目方面：
1、需求确认阶段尽量从多方面考虑问题的场景、场景、依赖等，会有助于消除部分潜在的风险；
2、将与项目关系人相关的一些点以文字形式先期约定下来，有助于节约后期的沟通成本，即便是比较小的需求也会有帮助，通常需求虽小，五脏俱全。

技术方面：
1、大体上走了一遍新TMS无线开发的流程，大体上已经熟悉了其流程和基本困扰点，已开ATA文章进行了一部分总结，见http://www.atatech.org/articles/48113。
2、在kimi中引入微信JSSDK的时候，需要用kimi模块的方式对其进行再包装，形式如下：

>
define(function(require){
	function Weixin(){
		//wechat jssdk code goes here
	};
	return Weixin();
}

经过了解，其原因在于kimi 并没遵循严格的 CMD 规范，严格的 CMD 规范存在 define.cmd 属性，而kimi 没有 。而微信JSSDK是按照严格CMD规范来做模块化的。因此需要用kimi的方法对微信JSSDK进行一下模块封装。

3、在测试中发现，稍复杂的gif动画在部分手机上会有明显的丢帧、卡顿现象（我的感受是手机对gif动画敏感情况超出我原有的想象），且新TMS发布环节的性能检测中有每使用一个git动画会扣掉5分的规则（虽然可以绕开发布检测但不建议这么做），后续遇到有gif动画时，尤其是多个gif动画或有稍复杂的gif动画时，可以先期建议和准备采取其它的动画实现方式。

4、在手机的亮度、对比度被设置得比较低时，对于UI的识别会大大减弱，所以重要的信息、操作点、提示点应该留意一下在此中情况下是否存在难以被识别或者直接被忽略的问题。



# 关于产品的思考

大家都在晒朋友圈，晒的后面实际上是怎样一种心理？为了记录，为了炫耀，为了告知，为了存在，为了获得认同和表扬？

思考我们手里有什么资源，所以可以做什么？

基于地理位置 ＋ 事件，想要知道的都让它告诉我，实际上这是一个个人管家。

LBS的需求，要看哪些是高频度的需求，哪些是低频的。行业很多，我们可以做哪个行业？LBS是location而不仅仅是local。

有时我们想要获得信息，又不希望泄漏我们的真实信息。

现在的应用归纳起来解决两类问题，效率的问题，品质的问题。比如，提高人的生活品质。

秀高品质生活这个需求，对于高端人士可能长期存在，但对于普通人可能一年只有偶尔的那么几次，属于低频度的，黏度不大。

消费品质的升级会有什么机会吗？升级可能需要一定的时间，在大面积升级之前，做什么可以见到效果，而不是等到大面积升级来临时候才看到效果。

我们的目标用户是谁？如果让他们来用我们的产品，产品自身会给这些用户提供什么，能驱动他们继续用它？

我们是否可以从做擦边球开始，比如，陌陌初期的yuepao，淘宝初期的廉价商品？不过，这会带来一个怎么洗白的问题。

评审需求的时候，我们不仅希望评这个需求，而且需要知道这个需求在整体的产品规划或者动作中处于什么样的位置，那样可以更好地理解需求，理解要做什么以及为什么要这么做，理解我们的目标是什么，同时找寻看有没有可以补充点？

某种程度上说，产品方向定了，才好谈技术的可扩展性，否则，在变换产品方向的时候，因为大部分可能推倒重来，技术可扩展性就无从谈起了。


## forEach 用在数组上，而不能用在对象上


"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function (name) {
    class2type["[object " + name + "]"] = name.toLowerCase()
});

/**
 * 是否为纯对象
 * @param obj
 * @returns {boolean}
 */
export function isPlainObject(obj) {
    return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}


### 简单的对象数组深度拷贝

function ext(target, source, deep) {
    let isArray = Array.isArray;
    for (let key in source)
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key]))
                target[key] = {}
            if (isArray(source[key]) && !isArray(target[key]))
                target[key] = []
            extend(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) target[key] = source[key]
}

/**
 * 对象合并, 支持深拷贝
 * @param {Object} target 目标对象
 * @param {Object} [deep] 是否深拷贝
 * @returns {Object} target
 */
export function extend(target, deep) {
    let deep, args = [].slice.call(arguments, 1)
    if (typeof target == 'boolean') {
        deep = target
        target = args.shift()
    }
    args.forEach(function(arg){ ext(target, arg, deep) })
    return target
}

## constructor() 与 Object.prototype.constructor

constructor():

一个class只能有一个constructor()

在子class的constructor中，可以用super()来调用其父classd的construtor()方法，当然，调用时可以给super()传入参数。

Object.prototype.constructor:

返回对创建对象实例的Object构造函数的引用。需要注意的是，该属性的值是那个函数本身，而不是一个包含函数名称的字符串。对于原始值（如1，true 或 "test"），该属性为只读。

所有对象都会从它的原型上继承一个 constructor 属性。

```
var o = new Object // 或者 o = {}
o.constructor == Object
var a = new Array  // 或者 a = []
a.constructor == Array
var n = new Number(3)
n.constructor == Number
```

### 抛出异常

`throw new Error(help);`

### webpack2 异常和坑

找不到.模块  

tracking util里有个动态require，webpack2估计处理这个和1不一样了

"the request of a dependency is an expression" == "there is a dynamic import here and dynamic imports should not be used".

https://github.com/webpack/webpack/issues/196

改成类似：

const iconPath: require("routes/Home/assets/two-people-icon.svg");

const createBlurb = (featureObject) => {
  return (
    <div>
      <img
        src={iconPath}
      />
    </div>
  )
};

### 一些eslint报出错误及处理

error 1:  'document' is not defined 
这个提示有点尴尬，很显然在ESLint中需要设定一个当前环境的宿主变量

    error 2:  JSX not allowed in files with extension '.js'
这里指 jsx的语法不应该出现在js文件中，很多同学习惯于js文件编辑，可能也不太适应。
综合以上2个错误，我们修改 .eslintrc.js 配置如下：

module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [2, { extensions: ['.js','.jsx'] }] // 让js文件支持jsx语法
    },
    "env": {
        "browser": true // 让ESLint支持window、document等宿主变量
    }
};
rules覆盖了上面 react plugins 的规则，这也是ESLint 可自定义规则的表现。
env属性告诉了ESLint预定了哪些变量

 error 4:  Component should be written as a pure function
当我们使用的React版本>=15.0.0时，在使用下面代码时会出现上述错误。

这是提示你应该用无状态组件的方法写这个Component，优化后：

    //good
    import React from 'react';

    export default function App() {
      return (
        <p>Hello World</p>
      );
    }
    
ESLint在控制台的 error log 是不错，但还不够直观，需要根据错误行数去找到出错位置。如果可以在 IDE 中集成错误提示才更加直观。

sublime text与eslint的集成：

{
    "user": {
        "debug": false,
        "delay": 0.25,
        "error_color": "D02000",
        "gutter_theme": "Packages/SublimeLinter/gutter-themes/Default/Default.gutter-theme",
        "gutter_theme_excludes": [],
        "lint_mode": "background",
        "linters": {
            "eslint": {
                "@disable": false,
                "args": [],
                "excludes": []
            },
            "stylelint": {
                "@disable": false,
                "args": [],
                "excludes": []
            }
        },
        "mark_style": "outline",
        "no_column_highlights_line": false,
        "passive_warnings": false,
        "paths": {
            "linux": [],
            "osx": [],
            "windows": []
        },
        "python_paths": {
            "linux": [],
            "osx": [],
            "windows": []
        },
        "rc_search_limit": 3,
        "shell_timeout": 10,
        "show_errors_on_save": false,
        "show_marks_in_minimap": true,
        "syntax_map": {
            "html (django)": "html",
            "html (rails)": "html",
            "html 5": "html",
            "javascript (babel)": "javascript",
            "magicpython": "python",
            "php": "html",
            "python django": "python",
            "pythonimproved": "python"
        },
        "warning_color": "DDB700",
        "wrap_find": true
    }
}

### 一个打包错误：Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin, refer to https://github.com/webpack/extract-text-webpack-plugin for the usage example


https://github.com/webpack/extract-text-webpack-plugin/issues/173 自己来了，看github，似乎在node 6.0.0 和 6.1.0都有这样的问题

换成 6.2.0 问题消失！

### 脚本文件中不加#!/bin/bash可以吗？

:#! /bin/sh 是指此脚本使用,/bin/sh来解释执行,#!是特殊的表示符,其后面根的是此解释此脚本的shell的路径。

因为一般linux用户的默认shell都是bash，脚本运行时候会用用户的默认shell来解释脚本（如果#!/bin/bash不写的话），但很多unix系统可能会用bourne shell、csh或者ksh等来作为用户默认shell，如果脚本中包含的有符合bash语法却又让其他shell无法解释的代码存在，那么就必须在第一行写上这个（当然还要这个系统上安装了bash），以保证脚本的正常运行  

### vuex

state 状态
getters 对于状态的计算属性
mutations 对状态的计算
actions 触发计算
modules 将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters、甚至是嵌套子模块——从上至下进行类似的分割

### node.js

Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象。

回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制try…catch对于异步操作行不通，所以只能把错误交给回调函数处理。

try {
  db.User.get(userId, function(err, user) {
    if(err) {
      throw err
    }
    // ...
  })
} catch(e) {
  console.log(‘Oh no!’);
}
上面代码中，db.User.get方法是一个异步操作，等到抛出错误时，可能它所在的try…catch代码块早就运行结束了，这会导致错误无法被捕捉。所以，Node统一规定，一旦异步操作发生错误，就把错误对象传递到回调函数。

如果没有发生错误，回调函数的第一个参数就传入null。这种写法有一个很大的好处，就是说只要判断回调函数的第一个参数，就知道有没有出错，如果不是null，就肯定出错了。

分别用process.nextTick和setTimeout方法，在下一轮事件循环抛出两个异常，代表异步操作抛出的错误。它们都无法被try ... catch代码块捕获，因为catch代码块所在的那部分已经运行结束了。

一种解决方法是将错误捕获代码，也放到异步执行。

全局对象和全局变量:

Node提供以下几个**全局对象**，它们是所有模块都可以调用的。

global：表示Node所在的全局环境，类似于浏览器的window对象。需要注意的是，如果在浏览器中声明一个全局变量，实际上是声明了一个全局对象的属性，比如var x = 1等同于设置window.x = 1，但是Node不是这样，至少在模块中不是这样（REPL环境的行为与浏览器一致）。在模块文件中，声明var x = 1，该变量不是global对象的属性，global.x等于undefined。这是因为模块的全局变量都是该模块私有的，其他模块无法取到。

process：该对象表示Node所处的当前进程，允许开发者与该进程互动。

console：指向Node内置的console模块，提供命令行环境中的标准输入、标准输出功能。

Node提供两个**全局变量**，都以两个下划线开头。

__filename：指向当前运行的脚本文件名。
__dirname：指向当前运行的脚本所在的目录。
除此之外，还有一些对象实际上是模块内部的局部变量，指向的对象根据模块不同而不同，但是所有模块都适用，可以看作是伪全局变量，主要为module, module.exports, exports等。

**Node模块采用CommonJS规范。**


EventEmitter接口的error事件:

发生错误的时候，也可以用EventEmitter接口抛出error事件。

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();

emitter.emit('error', new Error('something bad happened'));
**使用上面的代码必须小心，因为如果没有对error事件部署监听函数，会导致整个应用程序崩溃。所以，一般总是必须同时部署下面的代码。**

emitter.on('error', function(err) {
  console.error('出错：' + err.message);
});


unhandledRejection事件
iojs有一个unhandledRejection事件，用来监听没有捕获的Promise对象的rejected状态。

var promise = new Promise(function(resolve, reject) {
  reject(new Error("Broken."));
});

promise.then(function(result) {
  console.log(result);
})
上面代码中，promise的状态变为rejected，并且抛出一个错误。但是，不会有任何反应，因为没有设置任何处理函数。

只要监听unhandledRejection事件，就能解决这个问题。

process.on('unhandledRejection', function (err, p) {
  console.error(err.stack);
})
需要注意的是，unhandledRejection事件的监听函数有两个参数，第一个是错误对象，第二个是产生错误的promise对象。这可以提供很多有用的信息。

var http = require('http');

http.createServer(function (req, res) {
  var promise = new Promise(function(resolve, reject) {
    reject(new Error("Broken."))
  })

  promise.info = {url: req.url}
}).listen(8080)

process.on('unhandledRejection', function (err, p) {
  if (p.info && p.info.url) {
    console.log('Error in URL', p.info.url)
  }
  console.error(err.stack)
})

## Array.from()

Array.from() 方法可以将一个类数组对象或可遍历对象转换成真正的数组。

Array.from(arrayLike[, mapFn[, thisArg]])
参数

arrayLike
想要转换成真实数组的类数组对象或可遍历对象。
mapFn
可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。
thisArg
可选参数，执行 mapFn 函数时 this 的值。
返回值

一个新的Array实例

你可以使用 Array.from() 将下面的两种对象转换成数组：

类数组对象（拥有一个 length 属性和若干索引属性的任意对象）
可遍历对象（你可以从它身上迭代出若干个元素的对象，比如有 Map 和 Set 等）


## URL正则

const URL_REG = new RegExp(
    '^([a-z0-9-]+\:)?' +                  //protocol
    '[/]{2}' +                            //slash x 2
    '(?:([^@/:\?]+)(?::([^@/:]+))?@)?' +  //username:password@
    '([^:/?#]+)' +                        //hostname
    '(?:[:]([0-9]+))?' +                  //port
    '([/][^?#;]*)?' +                     //pathname
    '(?:[?]([^#]*))?' +                   //search
    '([#][^?]*)?$'                        //hash
, 'i');

### 开启对CSS grid的快速支持

在Chrome浏览器中通过chrome://flags/#enable-experimental-web-platformfeatures打开Chrome浏览器实验网络平台功能。


### 更好的工作

周报除了给了解你的人看，也给不了解你的人看，周报除了体现做什么之外，也应该反馈一些问题和建议，导向是这种问题的改善和建议的采纳，会产生较明显的积极影响，产出相比于投入是合适的。

做一款产品之后一定要看看其做完后的数据表现情况，看做这件事情是否值得。如果做完后发现没什么效果，需要分析和寻找原因，并且看看后续是否还有必要去做。

不规范容易带来各种安全问题，敏感权限不申请。（如第三方工具等）

关于个人成长和技术分享：可以考虑结合业务进行技术研究和深挖，进行分享

文案知识库：手机所有常用软件的文案，归纳出有哪些门类，并分门别类整理成库，进行参考、比较分析、优选和优化迭代

普通前端工程师如何进一步深入、拓展，进入更高级的阶段。

针对多如牛毛的文档，需要提供一个统一的入口，让人快速到达目标文档。最好有一些助记的功能，帮助完善自身的知识树，一点点把知识挂到树上去，逐步形成一个庞大的知识体系树。

层出不穷的新技术，如何快速上手？需要一个这样的模式或者说方法论。


需要一个一揽子搞定所有平台的分享的服务，让所有的这种分享需求之需要介入一下这个服务就好，不用为这些平台的分享去花费重复的力气。

正则表达式难读难写难验证，可以借助可视化工具。https://regexper.com/#%2F%5E%5B%5Cw-%5D%2B(%5C.(%3F%3D%5B%5Cw-%5D%2B))%3F%40%5B%5Cw%5C-%5D%2B(%5C.)%5B%5Cw%5C-%5D%2B%24%2F

离线包、客户端发版慢，周期长，难以响应快速修改的需求。

做一件事情的时候，最好给出一个推进计划和预计什么时候有什么产出的说明。

一个产品需求提过来的时候，不是急于探讨如何实现，而是考虑下需求是有有价值，是否真的有意义。什么是有意义？就是有助于对当前目标产生好的效果，从投入与产出的比较来说，合适。
除了考虑是否有价值之外，也需要从技术的角度就需求是否合理给出建议，对于有负面影响的需求，比如删除用户评论等，保持敏感性。

出了脚踏实地做事情之外，也需要对外输出影响力，把好的东西分享出去，输出出去。

前端技术的工作不止需要给懂前端技术的人看，也需要给不懂这门技术的人看。那么让不懂这门技术的人如何看你的工作呢？如何对你的工作进行评价呢？技术当然非常重要，但技术之外，还有很多维度。比如带项目行不行，推进事情做得好不好，等等等等。

高级工程师需要发展发现问题、解决问题的能力。技术专家和团队管理者需要发展遇见未来，以未来的眼光看当下，发现未来可能出现的问题，并提前着手预防和处理的能力（可以叫制造问题）。

## QQ正则
//QQ, QQ号码是从10000开始
const QQ = /^[1-9][0-9]{4,}$/;
const isQQ = (str) => QQ.test(str);



















 
  











 














































































