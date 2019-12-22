---
layout:     post
title:      "通过webpack打包实现以类Vue.js的方式编写微信小程序"
subtitle:   ""
date:       2018-04-28 18:16:22
author:     "Paian"
catalog:    true
tags:
    - webpack
    - 微信小程序
    - 学习笔记
---

### 一、主要目标

先说明一下要做什么。主要实现两个功能：

1、实现以类似Vue.js文件的方式编写小程序（将模板、JS、样式写在一个文件中），这种组织方式比较方便，而且一目了然；

2、实现对于pug(前身是jade)模板语法的支持，这样可以不用写一堆标签闭合类的东西了，让需要编写的模板内容更少、更简洁。

希望打包后的文件将被输出到dist文件夹下，而且输出的文件就是标准的小程序文件和目录结构，这样才能保证在小程序中正常可用。

### 二、具体实现

说明，本文使用的webpack版本是4.6.0。

#### 1、首先，需要把每个页面文件改造成模板、JS、样式整合到一个个文件中的样子

我们把一个示例小程序改造成我们需要的样子，即把它每个页面的模板、JS、样式整合到一个文件中，并把文件名后缀改为mina。

提示：pug语法中，元素嵌套以缩进的形式体现，class名以点号（.）+class形式表示，id以井号（#）+id的形式表示，属性写在括号里面，属性值用单引号引起来，变量插值用双花括号包裹。

page/index/index.mina

```
<template lang='pug'>
  view.container
    view.userInfo(bindTap='bindViewTap')
      text.userinfo-nickname {{userInfo.nickName}}
</template>

<script>
  const { regeneratorRuntime, util } = global;
  var app = getApp();

  Page({
    data: {
      motto: 'Hello World!',
      userInfo: {
        nickName: 'paian'
      }
    },
    bindViewTap(){
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    async onLoad(){
      console.log('onLoad');
      var that = this;

      //调用应用实例的方法获取全局数据
      const setting = await wx.getSettingAsync();

      if(!setting.authSetting['scope.userInfo']) {
        wx.authorize({
          scope: 'scope.userInfo',
          async success(){
            const userInfo = await wx.getUserInfoAsync();

            //更新数据
            that.setData({
              userInfo: userInfo.userInfo
            })
          }
        })
      }

    }
  })
</script>

<style lang="sass">
.userinfo
  display: flex
  flex-direction: column

.userinfo-avatar
  width: 128rpx
  height: 128rpx
  margin: 20rpx
  border-radius: 50%

.userinfo-nickname
  color: #aaa

.usermotto
  margin-top: 200px

</style>
```

page/logs/logs.mina

```
<template>
view.container.log-list
  block(wx:for='{{logs}}', wx:for-item='log')
    text.log-item {{index + 1}}. {{log}}
</template>

<script>
var util = require('../../util/util.js');
Page({
  data: {
    logs: []
  },
  onLoad: function(){
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function(log){
        return util.formatTime(new Date(log));
      })
    })
  }
})
</script>

<style lang='sass'>
.log-list
  display: flex
  flex-direction: column
  padding: 40rpx

.log-item
  margin: 10rpx
</style>
```

style/base.sass
```
.container
  display: flex
  flex-direction: column
  min-height: 100%
  justify-content: space-between
  font-size: 32rpx
  font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif

```

#### 2、创建打包流程和配置文件

task/build.js

```
require('shelljs/global');
const webpack = require('webpack');
const fs = require('fs');
const { resolve } = require('path');
const r = url => resolve(__dirname, url);

const webpackConfig = require('./webpack.config');
const minaConfig = require(r('./mina.config'));
const assetsPath = r('../dist');

//每次打包先清除输出目录，再创建输出目录（也就是dist文件夹）
rm('-rf', assetsPath);
mkdir(assetsPath);

var renderConfig = webpackConfig;

renderConfig.entry = minaConfig.json.pages.reduce((en, i) => {
  en[i] = resolve(process.cwd(), './', `${i}.mina`)

  return en;
}, {});

renderConfig.entry.app = minaConfig.app;

renderConfig.output = {
  path: r('../dist'),
  filename: '[name].js'
}

var compiler = webpack(renderConfig);

//写入小程序的app.json文件
fs.writeFileSync(r('../dist/app.json'), JSON.stringify(minaConfig.json), 'utf8');

compiler.watch({
  aggregateTimeout: 300,
  poll: true
}, (err, stats) => {
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: true,
    chunks: true,
    chunkModules: true
  }) + '\n\n')
});
```

值得一提的是，这里用到了数组的reduce方法，它的语法是这样的：

```
arr.reduce(function(accumulator, currentValue, currentIndex, arr), initialValue)
```

通过迭代函数遍历数组（arr）中的每个元素，每次返回的值会作为下一次迭代时迭代函数的第一个参数(accumulator)使用。 如果没有提供initialValue，则arr中的第一个元素作为初始值。initialValue参数在第一次迭代的时候作为迭代函数第一个参数使用。迭代函数有4个参数：
(accumulator, currentValue, currentIndex|currentKey, arr)。

提示：lodash库中也有一个_.reduce方法，作用非常相似，参见[这里](http://www.css88.com/doc/lodash/)


task/webpack.config.js

```
const { resolve } = require('path');
const r = url => resolve(__dirname, url);
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  devtool: false,
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  output: {
    path: r('../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      util: r('../util/util')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              'env',
              {
                modules: false
              }
            ]
          ]
        }
      },
      {
        test: /\.sass$/,
        use: [
          {
            loader: 'style-loader'
          },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader' //css-loader 解释(interpret) @import 和 url()
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins_dir: (loader) => [
                require('autoprefixer')({
                  browsers: [
                    '> 1%',
                    'last 2 versions',
                    'not ie <= 8'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.mina$/,
        loader: 'wechat-mina-loader',
        options: {
          path: r('../'),
          dist: './dist'
        }
      }
    ]
  },
  plugins_dir: [
    //提取出来样式写入到.wxss中
    new MiniCssExtractPlugin({
      filename: '[name].wxss'
    }),
    new CopyWebpackPlugin([
      {
        from: {
          glob: 'pages/**/*.json',
        },
        to: ''
      },
      {
        from: 'static',
        to: 'static'
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ProgressBarPlugin()
  ],
}
```

task/mina.config.js

```
const { resolve } = require('path');
const r = url => resolve(__dirname, url);
module.exports = {
  json: {
    // 这些内容主要来自app.json
    pages: [
      'pages/index/index',
      'pages/logs/logs',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'Wechat',
      navigationBarTextStyle: 'black'
    }
  },
  style: {
    url: r('../style/base.sass'),
    lang: 'sass'
  },
  app: r('../app.js')
}
```

#### 3、其它文件的处理

新建style/base.sass

```
.container
  display: flex
  flex-direction: column
  min-height: 100%
  justify-content: space-between
  font-size: 32rpx
  font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif
```

在根目录下新建一个文件夹，叫static，里面放个.gitkeep文件。

#### 4、安装所需依赖

```bash
npm init

npm i shelljs webpack babel-core babel-loader wechat-mina-loader  style-loader css-loader postcss-loader node-sass sass-loader babel-preset-env  copy-webpack-plugin mini-css-extract-plugin progress-bar-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin vue-template-compiler -D

npm i pug ramda regenerator-runtime consolidate  -S
```

#### 5、打包

在package.json中配置：

```
"scripts": {
    "build": "node ./task/build"
},
```

然后通过：

```
npm run build
```

就可完成打包。打包后可以通过微信开发者工具“管理项目”来添加一个小程序的项目，并把项目目录结构指向我们打包生成的那个dist文件夹，即可进行小程序的预览。

项目的源码可以到[这里](https://github.com/mobilesite/miniapp)下载。

### 6、wetchat-mina-loader的源码分析

上面，我们所需要的功能已经实现了，但是，其中很重要的一部分工作是由wetchat-mina-loader来实现的，那么，究竟它是怎么做到的呢？下面就让我们一起来扒一扒它的源码。

#### （1）入口文件

其入口文件是这样的：

```
const loaderUtils = require('loader-utils')
const renderWxml = require('./lib/render-wxml')
const renderWxss = require('./lib/render-wxss')
const renderScript = require('./lib/render-script')
const { parseComponent } = require('vue-template-compiler')

module.exports = function (content) {
  this.cacheable()
  var cb = this.async()

  const parts = parseComponent(content)

  if (parts.template) {
    renderWxml.call(this, parts.template)
  }
  if (parts.styles && parts.styles.length) {
    renderWxss.call(this, parts.styles[0])
  }
  if (parts.script) {
    renderScript.call(this, parts.script, cb)
  } else {
    cb(null, '')
  }
}
```

比较关键的是下面这两句：

```
const { parseComponent } = require('vue-template-compiler')
```

```
const parts = parseComponent(content)
```

它借用了vue-template-compiler来将`<template>`、`<script>`和`<style>`三个标签中的内容分别抽取出来进行处理。这就是为什么它能够支持将类似Vue.js组件的写法转成小程序的原因。

那么对于抽取出来的那三个部分具体怎么处理的呢？它们分别被lib/render-wxml、lib/render-script、lib/render-wxss这三个文件所处理。

另外，这个文件中有一句`var cb = this.async()`值得关注：

async()用于声明当前loader为异步loader，如果不需要依赖其它模块的loader可以这样处理，提升编译性能，就像这样:

```
module.exports = function(source) {
    var callback = this.async();
    // 这个模块异步执行，在回掉中拿到结果
    doSomeAsyncOperation(content, function(err, result) {
        callback(null, result);
    });
};
```

#### （2）模板的处理

先来看lib/render-wxml:

```
const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve, join } = require('path')
const con = require('consolidate')

const render = (lang, html, opt) => new Promise(resolve => {
  con[lang]
    .render(html, opt, (err, res) => {
      if (err) throw err

      resolve(res)
    })
})

module.exports = async function (template) {
  this.cacheable()

  const lang = template.lang
  const options = loaderUtils.getOptions(this)
  const fullPath = loaderUtils.interpolateName(this, `[path][name].mina`, options)
  const filename = loaderUtils.interpolateName(this, `[name].wxml`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)
  const dirname = loaderUtils.interpolateName(this, `[path]`, options)
  let html = template.content

  const dist = options.dist || 'dist'

  if (lang) {
    let opt = {
      raw: true,
      engine: lang,
      filename: fullPath
    }

    html = await render(lang, html, opt)
  }

  fs.outputFileSync(resolve(process.cwd(), `${dist}/pages/${folder}/${filename}`), html, 'utf8')

  return ``
}
```

其中用到了loader-utils这个模块，用来获取loader的options（`const options = loaderUtils.getOptions(this)`），以及用来获得一些文件路径、文件目录等相关的信息。

另外，用到了consolidate这一模板引擎来处理vue-template-compiler的parseComponent函数解出来的`<template>`标签中的内容，经过处理后，把pug语法的内容转换成正常的小程序代码，并通过`fs.outputFileSync`输出到.wxml文件中。

#### （3）JS的处理：

再来看看lib/render-script：

```
const con = require('consolidate')
const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve } = require('path')
const { transform } = require('babel-core')

module.exports = function (script, cb) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const fullPath = loaderUtils.interpolateName(this, `[path][name].mina`, options)
  const filename = loaderUtils.interpolateName(this, `[name].js`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)
  const filePath = loaderUtils.interpolateName(this, `[path]`, options)

  let result = transform(script.content, {
    presets: [
      [
        'env', {
          modules: false
        }
      ]
    ]
  })

  cb(null, result.code)
}
```

这里用了babel-core的transform方法（`const { transform } = require('babel-core')`），传入了如下选项来将`<script>`标签中的内容进行babel转换。

```
presets: [
  [
    'env',
    {
      modules: false
    }
  ]
]
```

转换完成后将结果传入回调函数，并执行回调函数。可见处理后的JS并不是在这个loader中直接输出的，而是给回到了webpack，由它最终输出。输出的文件名依赖于webpack.config.js中的如下配置：

```
output: {
  path: r('../dist'),
  filename: '[name].js'
},
```

#### （4） 样式的处理

看看lib/render-wxss这个文件：

```
const loaderUtils = require('loader-utils')
const fs = require('fs-extra')
const { resolve } = require('path')

const con = {
  stylus: (file, data) => new Promise(resolve => {
    require('stylus').render(data, { filename: file }, (err, css) => {
      if (err) throw err

      resolve(css)
    })
  }),
  less: (file, data) => new Promise(resolve => {
    require('less').render(data, {}, (err, result) => {
      if (err) throw err

      resolve(result.css)
    })
  }),
  scss: (file, data) => new Promise(resolve => {
    require('node-sass').render({
      file,
      data,
      outputStyle: 'compressed'
    }, (err, result) => {
      if (err) throw err

      resolve(result.css)
    })
  }),
  sass: (file, data) => new Promise(resolve => {
    require('node-sass').render({
      file,
      data,
      outputStyle: 'compressed',
      indentedSyntax: true
    }, (err, result) => {
      if (err) throw err

      resolve(result.css)
    })
  })
}


module.exports = async function (style) {
  this.cacheable()

  const options = loaderUtils.getOptions(this)
  const fullPath = loaderUtils.interpolateName(this, `[path][name].mina`, options)
  const filename = loaderUtils.interpolateName(this, `[name].wxss`, options)
  const folder = loaderUtils.interpolateName(this, `[folder]`, options)
  const dist = options.dist || 'dist'

  let stylesheet = style.content
  let lang = style.lang

  if (lang) {
    const render = con[style.lang]

    stylesheet = await render(fullPath, stylesheet)
  }

  fs.outputFileSync(resolve(process.cwd(), `${dist}/pages/${folder}/${filename}`), stylesheet)

  return ``
}
```

这个文件主要是借助了node-sass、less、stylus这三个模块的`render`方法对于样式进行转码，并通过fs-extra模块的`outputFileSync`方法将转码后的样式内容输出到.wxss文件中。

至此，这个loader就分析完了，是不是很简单。其实，经过这样的分析之后，你自己完全也可以去写一个类似的loader了。本质上，实际上，它的本质也不过就是一个小模块而已。

恭喜你离前端大牛又近了一步，加油！



