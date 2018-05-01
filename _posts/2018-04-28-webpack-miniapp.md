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
              plugins: (loader) => [
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
  plugins: [
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

