---
layout:     post
title:      "如何将一个node.js开发的应用部署到heroku上"
subtitle:   ""
date:       2017-11-18 22:37:15
author:     "Paian"
catalog:    true
tags:
    - heroku
    - node.js
---

首先，你需要去[https://id.heroku.com/](https://id.heroku.com/)上先注册一个账号。注意，注册的时候qq.com、163.com的邮箱是无法注册成功的，我使用的是微软的邮箱，据说你可以使用Gmail的邮箱、foxmail邮箱也是可以的。

再安装一下heroku命令行工具Heroku CLI，到[https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)下载安装即可。
或者直接用`npm install -g heroku-cli`安装。

下面我们就可以愉快地开始heroku之旅了。

### 一、了解一些常用的命令行

```
heroku login   #登陆heroku，要求输入账号（邮箱）、密码
```

当看到Logged as xxx。表示登陆成功了。

```
heroku create paianblog   #在heroku上创建一个名为paianblog的应用（app）。
```

名字最短为3个字符，且不能与别人已经创建的应用重名。注意，这个名字尽量取得短一些，因为这个名字会与heroku为这个应用生成的域名相关。比如我这里生成的域名就是：[https://paianblog.herokuapp.com/](https://paianblog.herokuapp.com/)

在创建heroku应用的同时，heroku帮你创建好了一个git（如，https://git.heroku.com/paianblog.git）。接下来你就可以clone到本地了：

```
git clone https://git.heroku.com/paianblog.git

或者用

heroku git:clone -a paianblog
```

你可以用

```
npm init
```
创建一个package.json文件，

再新建一个README.md 和 .gitignore文件。

执行

```
git add .
git commit -m 'update'
git push origin master
```

提交到heroku上去，就跟操作github一样。

```
heroku restart     #重启服务
heroku run bash   #可以进入你远程应用下的bash模式，在这里你可以执行`ls`查看服务器上的文件等操作，就像本地命令行一样，只不过是操作的是服务器上的内容。
heroku run node   #进入服务器上的node模式（REPL），可以测试写一点调试性的node.js代码，比如，require某个模块，做点什么事情等等
heroku local          #在本地模拟heroku上的环境试跑你的应用
heroku buildpacks:set heroku/nodejs   #设置采用heroku官方的node.js buildpack, 参见[https://github.com/heroku/heroku-buildpack-nodejs/tree/master/bin](https://github.com/heroku/heroku-buildpack-nodejs/tree/master/bin)

heroku open   #用浏览器访问你的应用
heroku ps        #查看你的应用运行情况，可以看到状态


#绑定你自己的域名，绑定后别忘了修改对应的域名解析
heroku domains:add test.com   
heroku domains:add www.test.com

heroku apps:rename newname    #重命名你的应用
```


如果不小心把node_modules的内容也提交到了heroku应该怎么处理呢？

```
echo "node_modules" >> .gitignore
$ git rm -r --cached node_modules
$ git commit -am 'untracked node_modules'
```

### 二、mongodb数据库的准备与连接

我采用的是在[https://mlab.com/](https://mlab.com/)上注册的免费mongodb数据库。在上面注册后，你会拿到一个如下这样的数据库连接地址：

mongodb://<dbuser>:<dbpassword>@ds113636.mlab.com:13636/<dbname>

其中，<dbuser>、<dbpassword>、<dbname>处分别替换成你自己在mlab上注册的用户名、密码
和创建的数据库名称。有了这个地址，就可以通过mongoose去与之建立连接了，具体代码如下：

```
const connect = () => {
    // const DB_URL = 'mongodb://localhost:27017/<dbname>';
    const DB_URL = 'mongodb://<dbuser>:<dbpassword>@ds113636.mlab.com:13636/<dbname>';
    const mongoose = require('mongoose');

    mongoose.connect(DB_URL, { useMongoClient: true });

    const con = mongoose.connection;

    con.on('connected', () => {
        console.log('数据库连接成功: ' + DB_URL);
    });
    con.on('open', () => {
        console.log('数据库连接打开成功: ' + DB_URL);
    });
    con.on('error', (err) => {
        console.log('数据库连接异常: ' + err);
    });
    con.on('disconnected', () => {
        console.log('数据库连接断开');
    });
};

module.exports = connect;
```
### 三、node.js部署中各种坑

部署heroku的过程看似简单，其实真的就是一个不断淌坑的过程。这里我要恭喜你，你很幸运，下面这些坑你不用再淌一遍了。

1、在根目录下需要新建一个Procfile

里面写上如下这样的内容：

web:  node server/app.js

用于指定服务器以什么命令启动服务，如果你不定义这个文件，那么heroku将会默认地以你npm start这个script上定义的内容来启动服务。

2、需要在package.json中指明node和npm的版本

就像这样：

```
"engines": {
    "node": "9.2.0",
    "npm": "5.5.1"
  },
```

3、需要在package.json的dependencies中包含全部require到的模块

当你漏掉任何一个require到的模块的时候，会在部署的时候出错。这个问题的最坑之处在于你执行git push显示是没有错误的，你执行`heroku local`也是可以在本地顺利跑起来应用的，但一部署到线上，你再去访问线上的这个页面，无论如何就是出不来，一直显示个错误页面。最终我是用`heroku logs`这个命令工具看出来的。发现了其中有某个模块未找到的错误日志。所以，在push之后如果你发现页面显示得有问题，首先你需要用这个命令行去看看错误日志。

出现这种依赖的定义错误，有可能是因为你本地曾经全局安装过某个模块，但是在heroku上是找不到这个模块的，除非你在package.json中的dependencies中有写明。

4、node服务所listen的端口号要从process.env.PORT中取

这是heroku抛出的一个环境变量。如果你在代码中写死为某个端口的话，比如80，那么，部署上去是一直显示错误页面的。

所以，我们可以这么写：

```
const PORT = process.env.PORT || 80;

// other codes here ...

app.listen(PORT);
console.log(`listening on port ${PORT}`);
```

heroku的常用内容其实就这么一些，对于一些细节的内容，用到的时候再去查文档即可。

（1）怎么开始创建一个简单的node.js应用，参见官方给出的例子: [https://github.com/heroku/node-js-getting-started](https://github.com/heroku/node-js-getting-started)

（2）如果你想自己定义一些部署过程中的命令或环境变量，参见：[https://devcenter.heroku.com/articles/nodejs-support#cache-behavior](https://devcenter.heroku.com/articles/nodejs-support#cache-behavior)


