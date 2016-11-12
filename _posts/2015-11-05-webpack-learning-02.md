---
layout:     post
title:      "最简明易懂的webpack使用教程（二）"
subtitle:   ""
date:       2015-11-05 23:02:12
author:     "Paian"
catalog: true
tags:
    - webpack
---

## 最简明易懂的webpack使用教程（二）

上一篇我们介绍了webpack的一些入门知识。这一篇我们进行一些更复杂的操作。

### 1、为项目设置多个入口文件，以便于根据这多个入口将它们打成多个包，这样便可以在不同的页面根据需要引用这其中的某几个包

可以像下面这样做：

```
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

### 2、配置打包时生成source maps以便于调试

要在webpack打包的同时生成source maps，需得在webpack.config.js中配置devtool配置项。该配置项有以下4个可选的取值。各具优缺点，描述如下：

|devtool选项|配置结果|
|---| ---|
|source-map|在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source maps，但是它会减慢打包文件的构建速度；|
|cheap-module-source-map|在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；|
|eval-source-map|使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；|
|cheap-module-eval-source-map|这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；|

上表的四个选项，从上到下打包速度越来越快，相应的副作用也越来越多。对于小到中型的项目，eval-source-map是一个很适合的选项，不过记得只在开发阶段使用它。而对于大型项目，可以考虑改用cheap-module-eval-source-map，以获取更快的打包速度。

我们在webpack.config.js中加入这个配置项之后，代码变成如下：

```
module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/pages/test-normal/test-normal.js',
    output: {
        path: __dirname + '/build',
        filename: '/js/test-normal.js'
    }
}
```

总之，配置devtool: 'eval-source-map'，可以较大限度地保证打包速度的同时也让出现错误时，能够直接定位到出错位置。

### 3、externals

当我们想在项目中require一些其它的类库或者API，而又不想让这些类库的源码被构建到运行时文件中，这在实际开发中很有必要。此时我们就可以通过配置externals参数来解决这个问题：

```
 externals: {
     "zepto": "Zepto"
 }
```

这样我们就可以放心的在项目中使用这些API了：var Zepto = require("zepto");

### 4、用webpack构建本地服务器以实现在每次修改源代码后浏览器自动刷新预览修改后的页面

Webpack提供一个可选的本地开发服务器，这个本地服务器基于node.js构建，可以实现你想要的这个功能。不过它是一个单独的组件，在webpack中进行配置之前需要单独安装它作为项目依赖，安装的命令如下：

```
npm install webpack-dev-server --save-dev
```

那么，怎么对这个本地开发服务器进行配置呢？我们可以通过webpack的devserver配置项来进行配置。其中可以配置的子配置项如下表所示：

|devserver配置选项|功能描述|
|---|---|
|contentBase|默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录|
|port|设置默认监听端口，如果省略，默认为“8080”|
|inline|设置为true，当源文件改变时会自动刷新页面，而且当URL改变时，会在浏览器地址栏体现出来。除了inline mode之外，webpack-dev-server还支持另外一种自动刷新页面的方式，叫做iframe mode，它是将页面嵌入到一个iframe中，源文件更改时，刷新的是iframe，URL地址的改变不会反应到浏览器地址栏中。|
|colors|设置为true，使终端输出的内容为彩色的|
|historyApiFallback|在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html|
|proxy: {'http://a.b.c/api/*': {target: 'http://localhost:5000/api/',secure: false}}|后端是一个RESTful的api的时候，假定在他是类似http://localhost:5000/api/xxx这类的请求，而你在本地实际上现在添加proxy配置让ajax请求可以直接代理过去。http://a.b.c/api/xxx|

### 5、让webpack在打包完成后自动打开浏览器

如果我们还想更懒一点——想在热更新模式下，编译完成后让webpack自动打开浏览器预览效果。那么如何实现呢？我们可以通过这个插件open-browser-webpack-plugin解决：

引用插件

// webpack.config.js

```
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
```

配置插件，这个配置要根据项目的具体情况去配置：

// webpack.config.js

```
...
plugins: [
 new OpenBrowserPlugin({url: 'http://localhost:8080' + PATHS.publicPath + 'index.html'})
]
...
```

### 6、webpack的loaders

在 Webpack 当中, 所有的资源都被当作是模块（如js, css, 图片， ES6文件，JSX文件，……等等）。因此, Webpack 当中 js 可以引用 css, css 中可以嵌入图片 dataUrl。对应各种不同文件类型的资源, Webpack 有对应的模块 loader。比如 CoffeeScript 用的是 coffee-loader, 类似的还有很多，可以看这里[http://webpack.github.io/docs/list-of-loaders.html](http://webpack.github.io/docs/list-of-loaders.html)。

Loaders需要单独安装, 并且需要在webpack配置文件的module关键字下的loaders中进行配置。loaders是一个数组，数组的每一项的配置选项包括以下几方面：

|loaders配置选项|功能描述|
|---|---|
|test|一个匹配loaders所处理的文件的拓展名的正则表达式（必须）|
|loader|loader的名称（必须）|
|include/exclude|手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）|
|query|为loaders提供额外的设置选项（可选）|

loaders在webpack配置文件中的写法大只如下:

```
module: {
	loaders: [
		  {
		  		test: /\.coffee$/,
		  		loader: 'coffee-loader'
		  },
		  {
		  		test: /\.js$/,
		  		loader: 'jsx-loader?harmony', // loaders can take parameters as a querystring
		  		exclude : './node_modules'
		  }
	]
},
```

loaders的include配置项表示必须要包含的文件或者目录，而exclude表示需要排除的目录。例如，我们在配置中一般要排除node_modules目录。官方的建议是：优先采用include，并且include最好是文件目录。

####  6.1 让webpack能够ES6和JSX语法

让webpack能够处理ES6的语法。要实现这个功能，我们需要用到babel-loader。首先我们需要安装它。

```
npm install babel-loader --save-dev
```

不过，要想安装babel-loader，我们还得先安装它的依赖：babel-core。

```
npm install babel-core --save-dev
```

此外，因为Babel 6.x及以后的babel版本，babel将不再为编译指定默认的transformations，需要你手动指定。所以，我们还得安装一个transformations：babel-preset-es2015。

```npm install babel-preset-es2015 --save-dev```

如果需要解析JSX语法，还需要安装babel-preset-react：

```npm install  babel-preset-react --save-dev```

然后，我们需要手动地对配置babel-loader：
```
module: {
    loaders: [
        {
            test:/\.js$/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
        }
    ]
}
```

注意，这里有一个特别容易犯的错误，就是把module误写成modules。如果你犯下这个错误的话，会使得你的loaders全部不生效，但是在打包时却不会报出任何错误，只在浏览器运行打包后的代码时会不断报出“Uncaught SyntaxError: Unexpected token import”这样的错误。

上面，如果不指定query的话，也可以在项目根目录下新建一个.babelrc文件，把内容设置成如下，以达到同样的效果。因为babel默认会去读.babelrc这个文件。

.babelrc

```
{
	"presets": ["es2015","react"]
}
```

为了验证效果，下面提供一个ES6语法写的文件清单以便于进行验证：

/src/components/say-hi-es6/say-hi-es6.js

```
'use strict';
class People{
    constructor(name){
        this.name = name;
    }
    sayHi(){
        alert(`hi ${this.name} !`);
    }
}
export default People;
```

／src/pages/es6/es6.js

```
'use strict';
import People from '../../components/say-hi-es6/say-hi-es6';
let tom = new People('Tom');
tom.sayHi();
```

/src/pages/es6/es6.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html,body{
            font-size: 16px;
        }
    </style>
</head>
<body>
<div id="say_container"></div>
<script src="../../../build/js/es6.js"></script>
</body>
</html>
```

webpack.config.js

```
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        bundle: __dirname + '/src/index.js',
        es6: __dirname + '/src/pages/es6/es6.js'
    },
    output: {
        path: __dirname + '/build/js/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
```

接下来我再为你提供一份测试JSX是否解析成功的代码：

不过，你得先安装react和react-dom:

```
npm install react --save-dev

npm install react-dom --save-dev
```

下面是测试JSX打包是否配置成功的代码清单：

/src/pages/test-react/test-react.js

```
'use strict';
import React from 'react';
import {render} from 'react-dom';
import Say from '../../components/say-react/say-react';

render(<Say msg="黄晓明"></Say>, document.getElementById('say_container'));
```

/src/components/say-react/say-react.js

```
'use strict';

import React, {Component} from 'react';
class Say extends Component{
    render(){
        return (<p>hi, {this.props.msg} !</p>);
    }
}

export default Say;
```

/src/pages/test-react/test-react.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        html,body{
            font-size: 16px;
        }
    </style>
</head>
<body>
<div id="say_container"></div>
<script src="../../../build/js/test-react.js"></script>
</body>
</html>
```

webpack.config.js

```
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        bundle: __dirname + '/src/index.js',
        es6: __dirname + '/src/pages/es6/es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js'
    },
    output: {
        path: __dirname + '/build/js/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的,这里可以省略掉"-loader"的
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
```

#### 6.2 用webpack处理LESS／CSS

（1）让webpack处理LESS和CSS

首先我们需要安装三个loader：

```
npm install less-loader style-loader css-loader --save-dev
```
这三个loader主要功能如下：

css-loader   是处理css文件中的url(...)等；

style-loader 将css插入到页面的style标签；

less-loader  是将less文件编译成css。

然后，我们准备一组文件来实现webpack对LESS的处理。

/src/pages/test-less/test-less.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<div class="test-less">
    <a href="https://mobilesite.github.io">1.欢迎访问拍岸的博客<br>https://mobilesite.github.io</a>
    <a href="https://mobilesite.github.io">2.欢迎访问拍岸的博客<br>https://mobilesite.github.io</a>
    <a href="https://mobilesite.github.io">3.欢迎访问拍岸的博客<br>https://mobilesite.github.io</a>
</div>
<script src="../../../build/js/test-less.js"></script>
</body>
</html>
```

/src/pages/test-less/test-less.js

```
'use strict';
require('./test-less.less');
```

/src/pages/test-less/test-less.less

```
@height: 100px;
.test-less{
    width: 100%;
    height: @height;

    display: flex;
    justify-content: center;
    align-items: center;

    a{
        flex:1;
        color: #fff;
        word-break: break-all;
        padding: 20px;
        text-decoration: none;
        &:nth-child(3n+1){
            background-color: red;
        }
        &:nth-child(3n+2){
            background-color: green;
        }
        &:nth-child(3n+3){
            background-color: blue;
        }
    }
}
```

webpack.config.js

```
module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'test-normal': __dirname + '/src/pages/test-normal/test-normal.js',
        'test-es6': __dirname + '/src/pages/test-es6/test-es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js',
        'test-less': __dirname + '/src/pages/test-less/test-less.js'
    },
    output: {
        path: __dirname + '/build/js/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader:'style!css!less'
            }
        ]
    }
}
```

注意到没有？`loader:'style!css!less'`中每个loader是用!分隔的。而且，实际上，一串loader是从右往左依次执行的。它也可以写成`loaders:['style','css','less']`。


（2）让webpack处理图片

首先安装图片处理用到的url-loader：

```
npm install url-loader --save-dev
```

然后在webpack.config.js中增加配置：

```
{
    test: /\.(png|jpg|svg)$/,
    loader: 'url?limit=5120&name=[name].[ext]?[hash]'
}
```

或者：

```
{
    test: /\.(png|jpg|svg)$/,
    loader: 'url',
    query: {
        name: '[name].[ext]?[hash]',
        limit: 5120
    }
}
```

这个配置项表示的意思是当图片小于5120kb时，会转成base64编码URL，而超过这个值的时候，会转成图片地址，并在后面加上hash。两种配置方式的意思一样。

这样就可以处理图片了。

关于url-loader对于文件的配置，其实还有更多的query项可选，这一点在url-loader的官方文档中没有详细写。但是url-loader实际上实现了file-loader的功能，所以看file-loader的query文档就可以了，详见[这里](https://github.com/webpack/file-loader)。

顺便提一下，iconfont的处理也是用这个url-loader。通常如下配置即可：

```
{
	test: '/\.woff|ttf|eot$',
	loader: 'url',
	query: {
		limit: 20480
	}
}
```


（3）根据浏览器的兼容性自动给CSS添加厂商前缀

有一个用于支持通过JavaScript插件来处理CSS的工具，叫[postcss](https://github.com/postcss/)，它给我们提供了一个[postcss-loader](https://github.com/postcss/postcss-loader)，可以用在webpack中。通过postcss-loader以及它提供的JavaScript插件autoprefixer，可以完成根据caniuse的浏览器兼容性数据自动给CSS添加厂商前缀的任务。

首先，我们安装postcss-loader和autoprefixer。

```
npm install postcss-loader autoprefixer --save-dev
```

如果你需要你的样式文件的某部分不进行autoprefix处理，则你可以在该块样式中加入注释，类似如下这样：

```
b {
    /* autoprefixer: off */
    transition: 1s;
    display: box;
}
```

这样的话, 凡是在b这个区块内的代码均不会进行autoprefix处理。

更多的关于autoprefixer的选项，可以看[这里](https://github.com/postcss/autoprefixer)。

下面是这个功能的文件清单：

/src/pages/test-autoprefixer/test-autoprefixer.css

```
.test-autoprefixer{
    padding: 20px;
    background-color: red;

    display: flex;
    border-radius: 10px;
}

.test-autoprefixer .no-prefix{
    /* autoprefixer: off */
    /* 这句是用来在本小区块内禁用掉autoprefixer的 */
    display: flex;
}
```

/src/pages/test-autoprefixer/test-autoprefixer.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

<a href="https://mobilesite.github.io" class="test-autoprefixer">1.欢迎访问拍岸的博客<br>https://mobilesite.github.io
    <span class="no-prefix">看看我有没有被autoprefixer吧</span>
</a>
<script src="../../../build/js/test-autoprefixer.js"></script>
</body>
</html>
```


/src/pages/test-autoprefixer/test-autoprefixer.js

```
'use strict';
require('./test-autoprefixer.css');
```

webpack.config.js

```
var autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'test-normal': __dirname + '/src/pages/test-normal/test-normal.js',
        'test-es6': __dirname + '/src/pages/test-es6/test-es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js',
        'test-less': __dirname + '/src/pages/test-less/test-less.js',
        'test-autoprefixer': __dirname + '/src/pages/test-autoprefixer/test-autoprefixer.js'
    },
    output: {
        path: __dirname + '/build/js/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css!postcss"
            },
            {
                test: /\.less$/,
                loader:'style!css!postcss!less'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20&name=[name].[ext]?[hash]'
                // ,
                // query: {
                //     name: '[name].[ext]?[hash]',
                //     limit: 20
                // }
            }
        ]
    },
    postcss: function () {
        return {
            defaults: [autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    }
}
```

对于postcss的配置，除了配置到loader中之外，我们还需要单独配置一个postcss配置项。在其中，我们配置了defaults和cleaner两个项。这主要是为了方便日后对于不同的内容可以做不同的autoprefixer的处理选择的。当我们对整个文件都不需要用到autoprefixer处理时，可以把对应的loader改成：loader:'style!css!postcss?pack=cleaner!less'就可以了。


6.4 支持处理Vue

安装vue-loader:

```
npm install vue-loader --save-dev
```

安装vue.js依赖：

```
npm install vue --save
```

下面是文件清单：

/src/pages/test-vue/test-vue.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="container"></div>
    <script src="../../../build/js/common.js"></script>
    <script src="../../../build/js/test-vue.js"></script>
</body>
</html>
```

/src/pages/test-vue/test-vue.js

```
import Vue from 'vue/dist/vue.js';
import TestVue from './test-vue.vue';

new Vue({
    template: '<test-vue></test-vue>',
    replace: false,
    el: '#container',
    components: {
        TestVue
    },
    ready: function () {

    }
});
```

/src/pages/test-vue/test-vue.less

```
.test-vue{
  color: green;
  text-decoration: none;
}
```


/src/pages/test-vue/test-vue.vue

```
<style lang="less">
    @import "./test-vue";
</style>

<template>
    <div>
        <a class="test-vue" href="https://mobilesite.github.io">欢迎访问拍岸的博客! https://mobilesite.github.io</a>
        <say-vue msg="我是Vue组件哦~ "></say-vue>
    </div>
</template>

<script type="text/babel">
    import SayVue from 'components/say-vue/say-vue';

    export default{
        data: function () {
          return {
              msg: ''
          }
        },
        components: {
            SayVue
        }
    }
</script>
```


/src/components/say-vue/say-vue.vue

```
<style lang="less">
    .say-vue{
        color: deeppink;
    }
</style>

<template>
    <p class="say-vue">hi,<span v-text="msg"></span></p>
</template>

<script type="text/babel">
    export default{
        props: ['msg']
    }
</script>
```

webpack.config.js

```
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin(chunkName='common',filename='js/common.js');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {allChunks: true});
var lessExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {allChunks: true});

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'test-normal': __dirname + '/src/pages/test-normal/test-normal.js',
        'test-es6': __dirname + '/src/pages/test-es6/test-es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js',
        'test-less': __dirname + '/src/pages/test-less/test-less.js',
        'test-autoprefixer': __dirname + '/src/pages/test-autoprefixer/test-autoprefixer.js',
        'test-vue': __dirname + '/src/pages/test-vue/test-vue.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '/js/[name].js',
        publicPath: '../'           //publicPath影响着单独作为css文件输出的css中对于图片的引用路径
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: cssExtractTextPlugin.extract('style', 'css!postcss')
                // , loader: "style!css!postcss"
            },
            {
                test: /\.less$/,
                loader: lessExtractTextPlugin.extract('style', 'css!postcss!less?sourceMap')
                // ,loader:'style!css!postcss!less'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20&name=/images/[name].[ext]?[hash]'
                // ,
                // query: {
                //     name: 'images/[name].[ext]?[hash]',
                //     limit: 20
                // }
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    postcss: function () {
        return {
            defaults: [autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    },
    plugins: [
        cssExtractTextPlugin,
        lessExtractTextPlugin,
        commonsPlugin,
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        })
    ],
    resolve: {
        alias: {
            'components': '../../../src/components'
        },
        extensions: ['', '.js', '.coffee', '.json', '.css', '.vue', '.less',  '.png', '.jpg']
    }
}
```


webpack.config.js主要是进行了resolve.alias配置，以缩短组件路径的编写。对一些经常要被import或者require的库，如react，我们最好可以直接指定它们的位置，这样webpack可以省下不少搜索硬盘的时间。通过命令```webpack --profile --colors --display-modules```可以查看到打包的执行时间。通过添加resolve.alias前后对比就能明显看出来其对打包时间的优化效果。

通过path这个npm模块来获取路径，存成变量，简化路径的书写

比如，上面的例子中可以看到， webpack.config.js这个文件中，有很多类似__dirname + '/src/pages/...'这样的配置。这么写是不是很烦？当然！那么办法是？对了，你可以把这些反复用到的路径存成变量。

像这样：

```
var rootPath = __dirname;
var srcPath = rootPath + '/src/pages/';
var includePath = rootPath + '/src/';
```

而resolve.extentions是用来描述引用时，哪些扩展名可以省略掉的。此外，增加了vue-loader。

### 7、将CSS样式打成单独的文件

如果我们希望将样式通过 <link> 引入，而不是放在 <style> 标签内的话，就需要把样式打成一个单独的文件了。首先安装完成这个功能用到的插件:

```
npm install extract-text-webpack-plugin --save-dev
```

然后按照下面这样配置webpack.config.js

```
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {
    allChunks: true
});
var lessExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {
    allChunks: true
});

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'test-normal': __dirname + '/src/pages/test-normal/test-normal.js',
        'test-es6': __dirname + '/src/pages/test-es6/test-es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js',
        'test-less': __dirname + '/src/pages/test-less/test-less.js',
        'test-autoprefixer': __dirname + '/src/pages/test-autoprefixer/test-autoprefixer.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '/js/[name].js'
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: cssExtractTextPlugin.extract('style', 'css!postcss')
                // , loader: "style!css!postcss"
            },
            {
                test: /\.less$/,
                loader: lessExtractTextPlugin.extract('style', 'css!postcss!less?sourceMap')
                // ,loader:'style!css!postcss!less'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20&name=images/[name].[ext]?[hash]'
                // ,
                // query: {
                //     name: 'images/[name].[ext]?[hash]',
                //     limit: 20
                // }
            }
        ]
    },
    postcss: function () {
        return {
            defaults: [autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    },
    plugins: [
        cssExtractTextPlugin,
        lessExtractTextPlugin
    ]
}
```

上面你可能已注意到了一个{allChunks: true}参数，这是干什么的呢？默认在打包时，是只提取最初的chunk，要提取所有的chunk则需要使用{allChunks: true}配置。

值得注意的是，只能保证把同一entry中的多个CSS/LESS文件打包在一起，而不能实现不同entry的文件打在一起。

另外,你可能会发现，当改成将CSS作为文件单独输出后，在上面的例子中，图片实际被输出到了build/images/目录下。但是输出的CSS文件中的对该图片的引用却是build/css/images，这两者对不上了。怎么修正呢？其实图片之所以被输出到了build/images/目录下,这是由path配置项和url-loader中的query.name的配置共同作用的结果。而对于CSS中关于图片的引用路径，则除了受到query.name配置项的影响外，还由publicPath共同决定。所以，你只需要设置```publicPath:'../'```就可以让CSS中图片的引用得到修复。

那么这个publicPath选项具体表示的是什么呢？

官网的表述是：

	The publicPath specifies the public URL address of the output files when referenced in a browser. For loaders that embed `<script>` or `<link>` tags or reference assets like images, publicPath is used as the href or url() to the file when it’s different then their location on disk (as specified by path).

大致意思就是：publicPath指定了输出文件中静态资源的URL地址，这个静态资源URL地址就是含有href或者url('...')等属性的标签(如<script>，<img>，<link>等)或CSS样式中你引用相应的资源如图片、JS文件、CSS文件、字体文件等所用到的地址。也就是webpack打包之后，你期望在浏览器中用什么地址来引用你的静态资源文件，它会包括你的图片、脚本以及样式加载的地址，一般用于线上发布以及CDN部署的时候使用。

例如，你在本地静态资源是打包到了build目录下，而如果你发布后在CDN上的地址是http://localhost:63342/webpackdemo/build目录下，你就可以这样设置：

```
output: {
	path: __dirname + "./build/",
	publicPath: "http://localhost:63342/webpackdemo/build/"
}
```

### 8、将公共的JS代码抽离出来，以便共用

比如，提取多个页面之间的公共模块（A.js, B.js => a.js, b.js, common.js），并将该模块打包为 common.js

我们可以在上面用到过的test-es6.js和test-normal.js中分别都require('zepto')，当然，你必须先```npm install zepto --save```，然后把webpack.config.js修改成：

```
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin(chunkName='common',filename='js/common.js');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {allChunks: true});
var lessExtractTextPlugin = new ExtractTextPlugin("css/[name].css", {allChunks: true});

module.exports = {
    devtool: 'eval-source-map',
    entry: {
        'test-normal': __dirname + '/src/pages/test-normal/test-normal.js',
        'test-es6': __dirname + '/src/pages/test-es6/test-es6.js',
        'test-react': __dirname + '/src/pages/test-react/test-react.js',
        'test-less': __dirname + '/src/pages/test-less/test-less.js',
        'test-autoprefixer': __dirname + '/src/pages/test-autoprefixer/test-autoprefixer.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '/js/[name].js',
        publicPath: '../'           //publicPath影响着单独作为css文件输出的css中对于图片的引用路径
    },
    devServer: {
        contentBase: './build/',
        port: '9090',
        inline: true,
        colors: true
    },
    module: {
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',//这里写babel或babel-loader都是可以的
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: cssExtractTextPlugin.extract('style', 'css!postcss')
                // , loader: "style!css!postcss"
            },
            {
                test: /\.less$/,
                loader: lessExtractTextPlugin.extract('style', 'css!postcss!less?sourceMap')
                // ,loader:'style!css!postcss!less'
            },
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=20&name=/images/[name].[ext]?[hash]'
                // ,
                // query: {
                //     name: 'images/[name].[ext]?[hash]',
                //     limit: 20
                // }
            }
        ]
    },
    postcss: function () {
        return {
            defaults: [autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    },
    plugins: [
        cssExtractTextPlugin,
        lessExtractTextPlugin,
        commonsPlugin
    ]
}
```

记得要在HTML中手动引入/build/js/common.js

上面是自动在所有入口的js中提取公共代码，并打包为common.js。有时候我们希望能更加个性化一些(自定义公共模块提取)，比如我希望:

A.js+C.js => AC-common.js

B.js+D.js => BD-common.js

我们可以这样配：

module.exports = {
    entry: {
        A: "./a.js",
        B: "./b.js",
        C: "./c.js",
        D: "./d.js",
        E: "./e.js"
    },
    output: {
        filename: "[name].js"
    },
    plugins: [
        new CommonsChunkPlugin("AC-commons.js", ["A", "C"]),
        new CommonsChunkPlugin("BD-commons.js", ["B", "D"])
    ]
};

// a.html: AC-commons.js, A.js
// b.html: BD-commons.js, B.js
// c.html: AC-commons.js, C.js
// d.html: BD-commons.js, D.js
// e.html: E.js

值得注意的是：如果使用CommonsChunkPlugin生成了公共文件，但是在页面中却没有引入CommonsChunkPlugin生成的公共文件或者引入这个公共文件的位置不在其它用webpack打包的JS文件的前面，在浏览页面时就会出现"Uncaught ReferenceError: webpackJsonp is not defined"的报错。

### 9、定义全局环境变量，以便于凡是引用了webpack打包的模块的页面都可以引用到这些变量

这是因为，通过webpack编译输出后的项目中，虽然页面已经引用了Zepto等库，但是还是无法直接使用‘$’等对象，虽然我们也可以```var $ = require('zepto')；```这样再引用一下，但每个用到的地方都需要这么做，实在是太烦人了！

好在，我们可以在plugin配置项中定义：

```
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: '"dev"'
    },
    $: 'zepto',
	Zepto: 'zepto',
	'window.Zepto': 'zepto'
})
```

### 10、module.noParse——设置对那些不包含require、define以及类似的关键字的模块不被loaders解析

被module.noParse配置项所匹配的模块将不会被loaders解析。所以当我们使用的库如果太大，并且其中不包含require、define或者类似的关键字的时候，我们就可以使用这项配置来提升性能。

而对于包含了require、define或者类似的关键字的模块，如果被noParse匹配到，不进行loader解析，则会报错，例如：

no-parse-example.js

```
var cheerio = require('cheerio');
module.exports = function() { console.log(cheerio); }
```

如果在webpack.config.js中进行配置：

```
module : {
	loaders : [
		{ test : /\.js$/, loader : 'babel' },
		{ test : /\.css$/, loader : 'style!css' }
	],
	noParse : /no-parse.js/
}
```

这样在浏览器访问引用了这个模块的页面时报错“require is not defined”。

### 11、页面自动引入打包后的文件

尤其当打包的文件添加了hash号之后，webpack每次编译后的资源chunkhash会随着内容的变化而变化要将文件手工插入到html文档中显然是一件不现实的事情。因此，我们需要将这件事情交给webpack来做。这时我们要用到webpack的插件：html-webpack-plugin。这个插件的目的是生成html，当然还有其他的功能。

首先安装它：

```
npm install html-webpack-plugin --save-dev
```

然后我们在webpack.config.js中引入它：

```
var HtmlPlugin = require('html-webpack-plugin');
```

然后再在webpack.config.js中配置：

```
plugins: [
	new HtmlPlugin({
	    filename: 'pages/test-normal.html',
	    template: srcPath + 'test-normal/test-normal.html',
	    inject: true
	}),
	new HtmlPlugin({
	    filename: 'pages/test-es6.html',
	    template: srcPath + 'test-es6/test-es6.html',
	    inject: true
	}),
	new HtmlPlugin({
	    filename: 'pages/test-react.html',
	    template: srcPath + 'test-react/test-react.html',
	    inject: true
	}),
	new HtmlPlugin({
	    filename: 'pages/test-vue.html',
	    template: srcPath + 'test-vue/test-vue.html',
	    inject: true
	})
]
```

这样，webpack就会在输出的.html文件中插入那些打包好的bundle文件了。

### 12、对JS文件进行压缩

可以利用webpack自带的插件进行类似如下的设置：

```
plugins:[
    new webpack.optimize.UglifyJsPlugin({
        mangle: { // 排除不想要压缩的对象名称
            except: ['$', 'exports', 'require', 'module']
        },
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    })
]
```
mangle.except 可以设置一些不想被压缩混淆的对象名称。

### 13、配置环境变量，以区别使用不同的配置

```
// 获取当前运行的模式
var currentTarget = process.env.npm_lifecycle_event;
var config;

if (currentTarget == "dev") {
	// 开发调试模式
   config = require('./webpack.dev.config.js');

} else if (currentTarget == "build") {
   // 发布上线模式
   config = require('./webpack.prod.config.js');
}
```

然后在package.json中设置scripts为：

```
"scripts": {
    "dev": "webpack-dev-server  --profile --progress --colors --display-modules --display-error-details",
    "build": "webpack  --profile --progress --colors --display-error-details"
}
```

然后再用`npm run dev`和`npm run build`来分别运行开发环境和生产环境的打包。

### 14、进行代码分割，让代码按需加载

在单页面应用中，当我们加载其他的模板文件时，想要引用这个模板文件对应的js。如果我们通过这种方式require(),那么webpack会将这个模板文件对应的js也会和当前js打包成一个js。如果项目比较大，那么js文件也将越来越大。我们希望的是加载模板文件的时候动态的引用这个模板文件对应的js。那么我们可以通过require.ensure()的方式。

比如现在有两个导航菜单：

```
<ul>
	<li><a href="#home">home</a></li>
	<li><a href="#about">about</a></li>
</ul>
```

我们给这两个菜单绑定点击事件，当点击‘home’时引用对应的‘home.js’;当点击‘about’时引用对应的‘about.js’,那么大致可以这样：

```
function loadJs(jsPath) {
    var currentMod;
    if (jsPath === './home') {
        require.ensure([], function (require) {
            currentMod = require('./home');
        }, 'home');
    }
    else if (jsPath === './about') {
        require.ensure([], function (require) {
            currentMod = require('./about');
        }, 'about');
    }
}
```

## 15、因为window 使用 \ 作为路径分隔符, 而Mac OS和Linux则是/, 为了保证路径的统一性而不出错, 引入path模块来处理路径

```
npm intstall path --save-dev
```

```
var path = require('path');
path.join(__dirname, '/src');
```

至于使用path前后的不同, 可以在windows平台运行如下代码来看出区别:

```
console.log(path.resolve(__dirname, "src"));
// 输出: C:\Users\joeyguo\Desktop\src

console.log(__dirname + '/src');
// 输出: C:\Users\joeyguo\Desktop/src
```

## 16、require 同级目录的文件引用需要带上 './',否则会报错

比如, 如果引用同级目录下的index.less时写成`require('index.less');`则会在打包时报错说找不到该模块。应该改成`require('./index.less');`



