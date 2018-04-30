---
layout:     post
title:      "webpack 4的新特性"
subtitle:   ""
date:       2018-4-8 22:13:32
author:     "Paian"
catalog: true
tags:
    - webpack
---

webpack 4有许多重要的变化。根据网上的一些文章，归纳整理出如下这些比较重要的变化点：

### 一、webpack 4 更快

有人在社区中请求大家对 webpack 4 进行构建性能测试，得出的结果是，构建时间大致降低了 60%-98%。

### 二、依赖的Node.js版本变成了>=6.11.5

依赖的Node.js版本变成了>=6.11.5。考虑到最佳的ES6特性实现，建议node版本可以升级到V8.9.4或以上版本。

备注：当使用webpack4时，最好确保使用 Node.js的版本 >= 8.9.4。因为webpack4使用了很多JS新的语法，它们在新版本的 v8 里经过了优化。

### 三、用更加快捷的mode模式来优化配置文件

webpack4中提供的mode有两个可选值：development和production，默认值是 production。

mode是为减小生产环境构建体积以及节约开发环境的构建时间提供的一种优化方案。

开启方式 1：直接在启动命令后加入参数

```
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}
```

开启方式 2：可以在配置文件中加入一个mode属性：

```
module.exports = {
  mode: 'production' 或者 'development'
};
```

development模式下，将侧重于功能调试和优化开发体验，包含如下内容：

- 浏览器调试工具;

- 开发阶段的详细错误日志和提示;

- 快速和优化的增量构建机制

production模式下，将侧重于模块体积优化和线上部署，包含如下内容：

- 开启所有的优化代码;

- 更小的bundle大小;

- 去除掉只在开发阶段运行的代码;

- Scope hoisting和Tree-shaking;

- 自动启用uglifyjs对代码进行压缩

webpack一直以来最饱受诟病的就是其配置门槛极高，配置内容复杂而繁琐，容易让人从入门到放弃，而它的后起之秀如rollup、parcel等均在配置流程上做了极大的优化，做到开箱即用，webpack 4中应该也从中借鉴了不少经验来提升自身的配置效率。

最明显的点 是 webpack4 以后拥有默认值了，简单配置一下便能使用。

以下是默认值：

- entry 的默认值是 ./src

- output.path 的默认值是 ./dist

- mode 的默认值是 production

- UglifyJs 插件默认开启 caches 和 parallizes

在 mode 为 develoment 时：

- 开启 output.pathinfo

- 关闭 optimization.minimize

在 mode 为 production 时：

- 关闭 in-memory caching

- 开启 NoEmitOnErrorsPlugin

- 开启 ModuleConcatenationPlugin

- 开启 optimization.minimize

### 四、移除了commonchunk插件，改用optimization属性进行更加灵活的配置

这也应该是从V3升级到V4的代码修改过程中最为复杂的一部分，下面的代码即是optimize.splitChunks 中的一些配置参考，

```
module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: true, 
   splitChunks: {
    chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
    minSize: 0,                // 最小尺寸，默认0
    minChunks: 1,              // 最小 chunk ，默认1
    maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    maxInitialRequests: 1,    // 最大初始化请求书，默认1
    name: () => {},              // 名称，此选项可接收 function
    cacheGroups: {                 // 这里开始设置缓存的 chunks
      priority: "0",                // 缓存组优先级 false | object |
      vendor: {                   // key 为entry中定义的 入口名称
        chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
        name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
        minSize: 0,
        minChunks: 1,
        enforce: true,
        maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        maxInitialRequests: 1,    // 最大初始化请求数，默认1
        reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
      }
    }
  }
}
```

从中我们不难发现，其主要变化有如下几个方面：

`commonchunk`配置项被彻底去掉，之前需要通过配置两次`new webpack.optimize.CommonsChunkPlugin`来分别获取manifest和vendor的通用chunk方式已经做了整合， 直接在`optimization`中配置`runtimeChunk`和`splitChunks`即可，提取功能也更为强大，具体配置见： splitChunks

`runtimeChunk`可以配置成true、single或者对象，用自动计算当前构建的一些基础chunk信息，类似之前版本中的manifest信息获取方式。

`webpack.optimize.UglifyJsPlugin`现在也不需要了，只需要使用`optimization.minimize`为`true`就行，production mode下面自动为true，当然如果想使用第三方的压缩插件也可以在`optimization.minimizer`的数组列表中进行配置。

### 四、在webpack 4中，使用extract-text-webpack-plugin将会报错：

> Error: Chunk.entrypoints: Use Chunks.groupsIterable and filter by instanceof  Entrypoint instead

解决办法是改成使用mini-css-extract-plugin（如下所述）或者 `yarn add extract-text-webpack-plugin@next -D`

由于webpack4以后对css模块支持的逐步完善和commonchunk插件的移除，在处理css文件提取的计算方式上也做了些调整，之前我们首选使用的 extract-text-webpack-plugin也完成了其历史使命，将让位于 mini-css-extract-plugin。

用法参见这里：

https://www.npmjs.com/package/mini-css-extract-plugin

基本配置如下：

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
          "css-loader"
        ]
      }
    ]
  }
}
```

生产环境下的配置优化：

```
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true 
      }),
      new OptimizeCSSAssetsPlugin({})  // use OptimizeCSSAssetsPlugin
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
    })
  ]
  ....
}
```

将多个css chunk合并成一个css文件：

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {            
          name: 'styles',
          test: /.scss|css$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true
        }
      }
    }
  }
}
```

### 五、插件和loader调整

NoEmitOnErrorsPlugin 废弃，使用optimization.noEmitOnErrors替代，在生产环境中默认开启该插件。

ModuleConcatenationPlugin 废弃，使用optimization.concatenateModules替代，在生产环境默认开启该插件。

NamedModulesPlugin- > optimization.namedModules（在开发模式下默认开启）

uglifyjs-webpack-plugin升级到了v1.0版本, 默认开启缓存和并行功能。

webpack命令优化 -> 发布了独立的 webpack-cli命令行工具包

webpack-dev-server -> 建议升级到最新版本

file-loader -> 建议升级到最新版本

url-loader -> 建议升级到最新版本

### 六、移除了`loaders`，必须使用`rules`

在webpack3.x中还保留之前版本的loaders，与rules并存都可以使用，在新版中完全移除了loaders，必须使用rules。

### 七、开箱即用WebAssembly

WebAssembly(wasm)会带来运行时性能的大幅度提升，由于在社区的热度，webpack4对它做了开箱即用的支持。你可以直接对本地的wasm模块进行import或者export操作，也可以通过编写loaders来直接import C++、C或者Rust。

### 八、支持多种模块类型

webpack 4支持5种模块类型：

javascript/auto: 在webpack3里，默认开启对所有模块系统的支持，包括CommonJS、AMD、ESM。

javascript/esm: 只支持ESM这种静态模块。

javascript/dynamic: 只支持CommonJS和AMD这种动态模块。

json: 只支持JSON数据，可以通过require和import来使用。

webassembly/experimental: 只支持wasm模块，目前处于试验阶段。

### 九、支持sideEffects

在npm模块的package.json中添加`sideEffects:false`后，当使用`export`部分导出模块内容的时候，webpack不会打包`export`之外的其它文件，使打包的文件更小。

可以参考[这里](https://github.com/webpack/webpack/tree/master/examples/side-effects)。

### 十、html-webpack-plugin需要使用临时fork出来的版本

升级到webpack 4之后，原有的html-webpack-plugin不能用了，会报错：

> compilation.mainTemplate.applyPluginsWaterfall is not a function

解决方案： `yarn add webpack-contrib/html-webpack-plugin -D`

webpack-contrib/html-webpack-plugin这个是fork出来的版本，由于原作者暂时无时间修改，待原作者有空把这个fork merge进去就好了。暂时可以使用这个fork版本。

### 十一、一些被删除的功能

去除 module.loaders

去除 loaderContext.options

删除 Compilation.notCacheable标志

去除 NoErrorsPlugin

去除 Dependency.isEqualResource

去除 NewWatchingPlugin

去除 CommonsChunkPlugin

### 十二、Webpack 5展望

已经有不少关于webpack5的计划正在进行中了，包括以下：

对WebAssembly的支持更加稳定；

支持开发者自定义模块类型；

去除ExtractTextWebpackPlugig插件，支持开箱即用的CSS模块类型；

支持Html模块类型；

持久化缓存。

最后，附上webpack 4的详细更新列表：

[https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0](https://github.com/webpack/webpack/releases/tag/v4.0.0-beta.0)



