---
layout:     post
title:      "那些在使用webpack时踩过的坑"
subtitle:   ""
date:       2017-02-18 23:52:12
author:     "Paian"
catalog: true
tags:
    - Webpack
    - bug
    - 自动化工作流
---

用webpack的过程，就是一个不断入坑和出坑的过程。回望来时路，一路都是坑啊！现把曾经趟过的那些坑整理出来，各位看官有福了~

文章末尾有我用到的依赖的版本信息，若你发现某个问题与我在本文中的描述不一致时，可以看看是否版本与我所使用的不同所致。

### 一、Mac平台和Windows平台的差异导致的问题

#### 1、路径上的差异

在配置entry选项的时候，我这么配置：

```
entry: {
    main: __dirname + '/src/index.js'
}
```

这样写在Mac下完全没有问题，但在Windows下会报错：

    ERROR in Entry module not found: Error: Can't resolve 'd:\demo\config/src/index.js' in 'd:\demo'

这是因为两个平台的路径是存在差异的。Mac是`/`，而Windows是`\`。

解决办法是：

```
const path = require('path');
const entryPath = path.resolve(__dirname, '/src/index.js');
entry: {
    main: entryPath
}
```

#### 2、设置node环境变量的差异

在Mac上，可以在package.json中配置：

```
"scripts": {
     "build"："NODE_ENV=production && ..."
}
```

但在Windows中是不行的。要解决这个问题，需要用到cross-env模块。

先安装它：

```
npm i cross-env --save-dev
```

然后把上面的配置可以改成：

```
"scripts": {
     "build"："./node_modules/.bin/cross-env NODE_ENV=production && ..."
}
```

### 二、babel配置中的坑

对于babel的配置，容易出现两个问题：

1、容易在presets配置的时候少一层[]。

配置成这样是有问题的：

```
presets: [
   'es2015',
   'react',
   'stage-2'
],
```

这在打包的时候会报错：

    Using removed Babel 5 option: foreign.modules -
    Use the corresponding module transform plugin in the `plugins` option

babel 6中，这里一定要包这层[]，完整的应写成如下这样。

```
{
    test: /\.(js|es|es6|jsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
               presets: [
                   ['es2015', {modules: false, loose: true}],
                   ['react'],
                   ['stage-2']
               ],
               plugins: [
                   ['transform-runtime']
               ],
               comments: false,
               cacheDirectory: true
            }
        },
        {
            loader: 'eslint-loader',
            options: {
                configFile: eslintConfigPath
            }
        }
    ],
    exclude: excludeReg
},
```

其中的`modules: false`配置项是告诉es2015 preset避免把import statements编译成CommonJS，这样Webpack才好做tree shaking。

2、容易忽略掉.vue文件中的待转码的babel语句。

如上文这样配置，对于.js、.es、.es6、.jsx等JavaScript文件的转码是不成问题了，但是，这些配置却无法影响到.vue文件。不过，.vue文件在编译的时候，vue-loader会默认去加载.babelrc中的配置。所以，我们应该把这些babel的配置写入.babelrc文件中，以便于与.vue文件的编译共用。使这些配置项在JavaScript文件和.vue文件编译的时候都发生作用。

所以，我们将babel的配置options抽出来，放到.bablerc文件中，代码为：

```
{
    presets: [
        ["react"],
        [
            "es2015", {"modules": false, "loose": true}
        ],
        ["stage-2"]
    ],
    plugins: [
        ["transform-runtime"]
    ],
    comments: false
}

```

而修改后的babel-loader配置为：

```
{
    test: /\.(js|es|es6|jsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
               cacheDirectory: true
            }
        },
        {
            loader: 'eslint-loader',
            options: {
                configFile: eslintConfigPath
            }
        }
    ],
    exclude: excludeReg
},
```

### 三、处理未模块化的库，如 Zepto

对于未模块化的库，如果直接`import`，在webpack打包的时候会报错的。详见：[https://juejin.im/entry/588ca3018d6d81006c237c85](https://juejin.im/entry/588ca3018d6d81006c237c85)

解决的办法就是在module的rules下增加如下配置项：

```
{
    test: require.resolve('zepto'),
    loader: 'exports-loader?window.Zepto!script-loader'
}
```

其中，`require.resolve() `是 nodejs 用来查找模块位置的方法，返回模块的入口文件，如 zepto 为 ./node_modules/zepto/dist/zepto.js。

此外，这里还用到了两个loader，我们需要先安装他们：

```
npm i --save-dev script-loader exports-loader
```

### 四、clean-webpack-plugin的root配置项不能少

```
var CleanWebpackPlugin = require('clean-webpack-plugin');
new CleanWebpackPlugin(baseConfig.output.path, {
    root: rootPath,
    verbose: true
}),
```

这个root配置项不能缺少，否则会出现如下提示，并且clean操作被跳过。

    clean-webpack-plugin: ...\build is outside of the project root. Skipping...

另外，这verbose配置项挺有些费解。verbose的意思是冗长的，啰嗦的。实际表示的意义是Write logs to console，即是否要往终端上输出log。

### 五、extract-text-webpack-plugin的坑

1、目前不能在使用web-dev-server的时候使用该插件

在使用web-dev-server的时候，不要使用extract-text-webpack-plugin，目前不支持。参见：[https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/384](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/384)

2、如果webpack的多个配置文件中（如webpack.base.config.js、webpack.dev.config.js、webpack.prod.config.js等），在用`Object.assign`合并时，后一个配置文件会将前一个文件的plugins选项覆盖掉，或者当配置文件中误将plugins选项错误地放置到了module下面，将会因为plugins选项下缺少extract-text-webpack-plugin插件的配置而报如下错，不仔细观察很难排查错误原因：

    Module build failed: Error: "extract-text-webpack-plugin" loader is used without the corresponding plugin

参见：[https://github.com/webpack/extract-text-webpack-plugin/issues/50](https://github.com/webpack/extract-text-webpack-plugin/issues/50)

### 六、用less-loader的时候得同时安装less模块，单独安装less-loader模块时，不会自动安装less模块

使用less-loader的时候得同时安装less模块，否则会报出错误：

    Module build failed: Error: Cannot find module 'less'。

less-loader需要依赖less才能实现。因为npm3.0+中less是不会随着less-loader自动安装的。

### 七、hash、chunkhash、contenthash之间的误用

这三个“鬼东西”，真的很容易让人傻傻分不清楚！

关于hash、chunkhash的区分，详见：[http://www.cnblogs.com/ihardcoder/p/5623411.html](http://www.cnblogs.com/ihardcoder/p/5623411.html)

chunkhash是随着某一特定chunk的内容变化而变化，即根据某个特定chunk的内容计算出的hash值。webpack计算chunkhash时，根据入口文件(entry)不同而分别计算。当chunk中有一部分内容变化时（不管是js还是css），就会重新计算chunkhash。webpack使用NodeJS内置的crypto模块计算chunkhash。每个chunk资源会生成与其内容相关的chunkhash。

hash是随着compilation进行而产生，而在项目中任何一个文件改动后都会创建新的compilation，相应的hash值也就会更新。hash可以理解为项目总体文件的hash值，而不是针对某个具体chunk的。即它是受到所有chunks影响的hash。每次编译生成一个唯一hash，但所有资源全打上同一个 hash，无法完成持久化缓存的需求。

有人说，热更新模式下，将hash改成chunkhash后，vendors文件会变成undefined，试了很多种传参格式，依然无法达到目的。最后发现只是在webpack热更新模式下才会如此，又因为开发环境可以忽略版本控制，所以拆分两个环境下的配置解决此问题。

不要在开发环境使用 [chunkhash]/[hash]/[contenthash]，因为不需要在开发环境做持久缓存，而且这样会增加编译时间，开发环境用 [name] 就可以了。

extract-text-webpack-plugin提供了另外一种hash值：contenthash。顾名思义，contenthash代表的是文本文件内容的hash值，也就是只有style文件的hash值。

因为可以在生产环境配置上：

```
new ExtractTextWebpackPlugin({
    filename: 'css/[name].[contenthash].css',
    allChunks: true
})
```

还应在生产环境配置上生成稳定的模块ID的插件:

```
new webpack.HashedModuleIdsPlugin(),
```

### 八、`new webpack.optimize.UglifyJsPlugin`打包时的错误

注意，当前版本的UglifyJsPlugin在打包时会存在如下报错：

    ERROR in build.js from UglifyJsSyntaxError:
    Unexpected token punc «(», expected punc «:»

原因在于这个插件依赖了uglify-js，但是当前版本的uglify-js是不支持ES6代码的压缩的，解决的办法是：

在package.json的devDependencies中加入如下依赖，然后重新执行一遍`npm install`。

```
"uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony"
```

参见：https://github.com/webpack-contrib/uglifyjs-webpack-plugin

```
new webpack.optimize.UglifyJsPlugin({
    mangle: { // 排除不想要压缩的对象名称
        except: ['$', 'exports', 'require', 'module']
    },
    compress: {
        // http://lisperator.net/uglifyjs/compress
        warnings: false,    // warn about potentially dangerous optimizations/code
        conditionals: true, // optimize if-s and conditional expressions
        unused: true,       // drop unused variables/functions
        comparisons: true,  // optimize comparisons
        sequences: true,    // join consecutive statements with the "comma operato"
        dead_code: true,    // discard unreachable code 丢弃未使用的代码
        evaluate: true,     // evaluate constant expressions
        join_vars: true,    // join var declarations
        if_return: true     // optimize if-s followed by return/continue
    },
    output: {
        // https://github.com/mishoo/UglifyJS2/blob/master/lib/output.js
        comments: false
    },
    sourceMap: false         //将错误信息的位置映射到模块。这会减慢编译的速度。仅在开发环境下使用。
}),
```

顺便，注意一下上面UglifyJsPlugin的那些压缩选项的配置。

是unused和dead_code这两个选项在允许tree shaking。

### 九、`new webpack.optimize.CommonsChunkPlugin`打包出的公共文件忘记引入或引入顺序不对导致的错误

注意：如果使用CommonsChunkPlugin生成了公共文件，但是在页面中却没有引入CommonsChunkPlugin生成的公共文件或者引入这个公共文件的位置不在其它用webpack打包的JS文件的前面，在浏览页面时就会出现报错：

    Uncaught ReferenceError: webpackJsonp is not defined

为了确保这些文件引入的顺序正确，需要在html-webpack-plugin插件的配置项中加入这个配置项：

```
// necessary to consistently work with multiple chunks via CommonsChunkPlugin
chunksSortMode: 'dependency'
```

附：依赖模块版本信息列表

```
"dependencies": {
    "babel-polyfill": "^6.23.0",
    "element-ui": "^1.2.5",
    "es6-promise": "^4.1.0",
    "vue": "^2.2.4",
    "vue-router": "^2.3.0",
    "vuex": "^2.2.1",
    "zepto": "^1.2.0"
},
"devDependencies": {
    "autoprefixer": "^6.6.1",
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-es2015-webpack": "^6.4.3",
    "babel-preset-latest": "^6.22.0",
    "babel-preset-react": "^6.23.0",
    "babel-preset-stage-2": "^6.22.0",
    "clean-webpack-plugin": "^0.1.15",
    "css-loader": "^0.26.1",
    "eslint": "^3.14.0",
    "eslint-config-airbnb": "^14.0.0",
    "eslint-loader": "^1.6.1",
    "eslint-plugin-html": "^2.0.1",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^3.0.2",
    "eslint-plugin-react": "^6.9.0",
    "exports-loader": "^0.6.4",
    "expose-loader": "^0.7.3",
    "extract-text-webpack-plugin": "^2.0.0-beta.5",
    "file-loader": "^0.9.0",
    "glob": "^7.1.1",
    "html-loader": "^0.4.5",
    "html-webpack-plugin": "^2.26.0",
    "ink-docstrap": "^1.3.0",
    "jsdoc-webpack-plugin-v2": "0.0.1",
    "less": "^2.7.2",
    "less-loader": "^2.2.3",
    "node-sass": "^4.3.0",
    "path": "^0.12.7",
    "postcss-loader": "^1.2.2",
    "sass-loader": "^4.1.1",
    "script-loader": "^0.7.0",
    "style-loader": "^0.13.1",
    "uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
    "url-loader": "^0.5.7",
    "vue-loader": "^11.1.4",
    "vue-template-compiler": "^2.2.4",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.2.0"
}
```


