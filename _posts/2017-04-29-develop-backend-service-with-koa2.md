---
layout:     post
title:      "用Koa 2搭建服务器"
subtitle:   ""
date:       2017-04-29 10:20:11
author:     "Paian"
catalog: true
tags:
    - koa2
    - 服务端开发
    - node.js
---

## 用Koa 2搭建服务器

### 一、初始化项目

在buduhuisi根目录下执行如下命令，初始化出来一个server文件夹，其中放置的内容是一个koa项目，我们在此基础上开发项目的服务端程序。

```
npm i -g koa-generator
koa2 server
npm i
```

### 二、熟悉用到的各种中间件


#### 1、koa-logger

Development style logger middleware for koa。

详见[https://www.npmjs.com/package/koa-logger](https://www.npmjs.com/package/koa-logger)

```
const logger = require('koa-logger');
app.use(logger());
```

建议把`app.use(logger());`放在其它的中间件被`app.use(...)`之前。

#### 2、koa-views

koa-view 是用在koa上的模板渲染中间件。详见[官方文档](https://www.npmjs.com/package/koa-views)

使用：

```
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');

// Must be used before any router is used
app.use(views(__dirname + '/views', {
    extension: 'jade',
    map: {
        html: 'underscore'
    },
    engineSource: {
        foo: () => Promise.resolve('bar')
    },
    options: {
        helpers: {
            uppercase: (str) => str.toUpperCase()
        },
        partials: {
            subTitle: './my-partial' // requires ./my-partial.hbs
        }
    }
}));
```

注意：`app.use(views(...))`的执行必须在router之前。

可以看到，koa-views在使用的时候包含两个参数ions：

一个是root，指明view文件的绝对路径（注意这里不能用相对路径）；

另一个是opt，这里面又包含着四个配置项：

- extension，用于指明view文件的默认后缀名。

- map，指明后缀名为某种类型的文件采用何种引擎进行处理。如上例中即指明后缀为.html的文件使用underscore引擎进行处理。

- engineSource，指明后缀名为某类型的文件采用某engine source来进行处理，替换掉默认的engine source —— consolidate。上例中表示所有以.foo为后缀的文件会被返回'bar'。

- options，这是传入helpers和partials的地方，这些options会被传入到view engine中。

开启koa-views的debug模式：

在启动koa服务的时候添加一个 DEBUG=koa-views 环境变量。

#### 3、koa-json

美观的输出JSON response的Koa中间件，详见[https://www.npmjs.com/package/koa-json](https://www.npmjs.com/package/koa-json)。

有两种使用方式：

一种是总是返回美化了的json数据：

```
const json = require('koa-json');
app.use(json());
```

另一种是默认不进行美化，但是当地址栏传入pretty参数的时候，则返回的结果是进行了美化的。

```
app.use(json({ pretty: false, param: 'pretty' }));
```

这样的话，当访问时带上?pretty的时候就返回美化过的结果。

#### koa-onerror

 是koa的错误处理中间件。详见[https://www.npmjs.com/package/koa-onerror](https://www.npmjs.com/package/koa-onerror)

```
const onerror = require('koa-onerror');
onerror(app);
```

onerror还可以传入第二个参数：option，其中包含如下几个配置项：

all: if option.all exist, ignore negotiation
text: text error handler
json: json error handler
html: html error handler
redirect: if accepct html, can redirect to another error page

koa-onerror 会自动地把err.status当作response的status code, 而且自动地把err.headers当作response的headers。

#### 4、koa-bodyparser

一个koa的body parser，详见[https://www.npmjs.com/package/koa-bodyparser](https://www.npmjs.com/package/koa-bodyparser)

使用:

```
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(async ctx => {
  // the parsed body will store in ctx.request.body
  // if nothing was parsed, body will be an empty object {}
  ctx.body = ctx.request.body;
});
```

`bodyParser()`中可以传入一个参数option，其中可包含如下这些配置项：

- enableTypes: bodyParser只有在请求的类型匹配enableTypes（默认为['json', 'form']）的时候才会工作。

- encode: requested encoding. 默认是utf-8

- formLimit: the urlencoded body的大小限制。如果超出大小限制，将会返回413错误码。默认的限制大小是56kb。

- jsonLimit: limit of the json body. Default is 1mb.

- textLimit: limit of the text body. Default is 1mb.

- strict: when set to true, JSON parser will only accept arrays and objects. Default is true. In strict mode, ctx.request.body will always be an object(or array), this avoid lots of type judging. But text body will always return string type.

- detectJSON: 自定义 json request 检测函数。 Default is null.

```
app.use(bodyparser({
  detectJSON: function (ctx) {
    return /\.json$/i.test(ctx.path);
  }
}));
```

- extendTypes: support extend types:

```
app.use(bodyparser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));
```

- onerror: support 自定义的 error handle, 如果koa-bodyparser抛出错误异常, 你可以像如下这样来自定义response:

```
app.use(bodyparser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));
```

- disableBodyParser: you can dynamic disable body parser by set ctx.disableBodyParser = true.

```
app.use(async (ctx, next) => {
  if (ctx.path === '/disable') ctx.disableBodyParser = true;
  await next();
});
app.use(bodyparser());
```

#### 5、koa-static

用于koa的静态文件服务中间件。详见[https://www.npmjs.com/package/koa-static](https://www.npmjs.com/package/koa-static)

使用：

```
const staticServe = require('koa-static');
app.use(staticServe(root, opts));
```

它可以传入两个参数：

一个是root，静态文件的根目录。即只有包含在此根目录以内的文件才会提供静态服务。

另一个是option，其中包含如下配置项：

- maxage

浏览器缓存的最大时间（max-age），单位是milliseconds（毫秒）。默认为0

- hidden

允许传送隐藏文件，默认为false

- index

Default file name, defaults to 'index.html'

- defer

If true, serves after yield next, allowing any downstream middleware to respond first.

- gzip

当client支持 gzip 而且被请求的文件也有一个以 .gz 为扩展名的文件的时候，自动以所请求文件对应的 .gz 文件进行返回。默认为true

- extensions

Try to match extensions from passed array to search for file when no extension 是合格的 in URL. First found is served. (defaults to false)

#### 6、koa-router

koa路由中间件。

详见[https://www.npmjs.com/package/koa-router](https://www.npmjs.com/package/koa-router)

使用：

- 基本用法

```
var Router = require('koa-router');

var router = new Router();

router.get('/', function (ctx, next) {...});

app
  .use(router.routes())
  .use(router.allowedMethods());

```

- router.get/post/put/del/all

```
router
  .get('/', function (ctx, next) {
        ctx.body = 'Hello World!';
  })
  .post('/users', function (ctx, next) {

  })
  .put('/users/:id', function (ctx, next) {

  })
  .del('/users/:id', function (ctx, next) {

  })
  .all('/users/:id', function (ctx, next) {

  });
```

`router.all()` can be used to match against all methods.

- 多个中间件例子

```
router.get(
  '/users/:id',
  function (ctx, next) {
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      return next();
    });
  },
  function (ctx) {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

- 嵌套路径

```
var forums = new Router();
var posts = new Router();

posts.get('/', function (ctx, next) {...});
posts.get('/:pid', function (ctx, next) {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());

// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

- 路由前缀

```
var router = new Router({
  prefix: '/users'
});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```

- 重定向

```
router.redirect('/login', 'sign-in');
//其中，'/login'是source，'sign-in'是destination

This is equivalent to:

router.all('/login', function (ctx) {
  ctx.redirect('/sign-in');
  ctx.status = 301;
});
```

- 命名路由

```
router.get('user', '/users/:id', function (ctx, next) {
 // ...
});

outer.url('/users/:id', {id: 1});
或者：
router.url('user', 3);
// => "/users/3"
```

即：`router.url(name, params)`

- URL parameters

```
router.get('/:category/:title', function (ctx, next) {
  console.log(ctx.params);
  // => { category: 'programming', title: 'how-to-node' }
});
```

命名的route parameters被捕获并添加到ctx.params中（Named route parameters are captured and added to ctx.params）。

### 三、一些其它模块的使用

#### 1、cross-env模块

跨平台配置环境变量的模块。

```
npm install --save-dev cross-env
```

使用：

./node_modules/.bin/cross-env NODE_ENV=development

./node_modules/.bin/cross-env 后面可以紧跟着配置多个不同的环境变量，比如：

./node_modules/.bin/cross-env NODE_ENV=development  DEBUG=*,-not_this

#### 2、debug模块

大概可以把它理解为一个封装过的`console.log()`。详见[https://www.npmjs.com/package/debug](https://www.npmjs.com/package/debug)

可以通过添加环境变量的配置来开启debug模块的使用：

./node_modules/.bin/cross-env DEBUG=*,-not_this DEBUG_COLORS=true

DEBUG_COLORS是用来配置是否以彩色输出debug信息的，默认情况下是开启的。若要将它关闭，配置环境变量DEBUG_COLORS=false即可。

#### 3、nodemon模块

nodemon的作用是在你的服务正在运行的情况下，修改文件可以自动重启服务。

```
npm install --save-dev nodemon
```

#### 4、log4js模块

上文中已经讲到过koa-logger这个中间件，它是tj大神写的koa开发时替换console.log输出的一个插件。不过，如果你需要按照时间或者按照文件大小，本地输出log文件的话，建议还是采用log4js。

```
npm install log4js
```

下面，我们来编写程序记录服务器的服务日志：

首先，我们先在server目录下新建一个utils文件夹，再在文件夹中添加一个文件——logUtil.js，内容如下：

```
const log4js = require('log4js');
const fs = require('fs');

const logConfig = require('../config/log/main'); // 加载配置文件

log4js.configure(logConfig); // 将配置添加到log4js中

let logUtil = {};


// 确定目录是否存在，如果不存在则创建目录
const createPath = (pathStr) => {
    if(!fs.existsSync(pathStr)){
        fs.mkdirSync(pathStr);
        console.log(`createPath:${pathStr}`);
    }
};

// 初始化log相关目录
const initLogPath = () => {
    //创建log的根目录'logs'
    if(logConfig.baseLogPath){
        //创建log根目录
        createPath(logConfig.baseLogPath);

        //根据不同的logType创建不同的子目录
        logConfig.appenders.map((item) => {
            if(item.path){
                createPath(logConfig.baseLogPath + item.path);
            }
        });
    }
};

// 自动初始化log输出所需要的目录
initLogPath();

const errorLogger = log4js.getLogger('errorLogger');
const resLogger = log4js.getLogger('resLogger');

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};

//格式化响应日志
const formatRes = (ctx, resTime) => {
    var logText = new String();

    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //响应状态码
    logText += "response status: " + ctx.status + "\n";

    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";

    return logText;
}

//格式化错误日志
const formatError = (ctx, err, resTime) => {
    var logText = '';

    //错误信息开始
    logText += `\n*************** error log start ***************\n`;

    //添加请求日志
    logText += formatReqLog(ctx.request, resTime);

    //错误名称
    logText += `err name:${err.name}\n`;
    //错误信息
    logText += `err message:${err.message}\n`;
    //错误详情
    logText += `err stack:${err.stack}\n`;

    //错误信息结束
    logText += `*************** error log end ***************\n`;

    return logText;
};

//格式化请求日志
const formatReqLog = (req, resTime) => {
    let logText = '';
    let method = req.method;

    //访问方法
    logText += `request method: ${method}\n`;

    //请求原始地址
    logText += `request originalUrl: ${req.originalUrl}\n`;

    //客户端ip
    logText += `request client ip: ${req.ip}\n`;

    //请求参数
    if (method === 'GET') {
        logText += `request query: ${JSON.stringify(req.query)}\n`;
    } else {
        logText += `request body: \n${JSON.stringify(req.body)}\n`;
    }

    //服务器响应时间
    logText += `response time:${resTime}\n`;

    return logText;
};

module.exports = logUtil;
```

其次，我们再来建立上面引用到的log4js的配置文件——server/config/log/main.js：

```
const path = require('path');
const pathResolve = path.resolve;
const pathJoin = path.join;
const rootPath = pathResolve(__dirname);

//日志根目录
const baseLogPath = pathResolve(__dirname, '../../logs')

//错误日志目录
const errorPath = "/error";
//错误日志文件名
const errorFileName = "error";
//错误日志输出完整路径
const errorLogPath = baseLogPath + errorPath + "/" + errorFileName;

//响应日志目录
const responsePath = "/response";
//响应日志文件名
const responseFileName = "response";
//响应日志输出完整路径
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName;

module.exports = {
    // 定义两个输出源（appenders）
    "appenders": [
        // 错误日志
        {
            "category":"errorLogger",             //logger名称
            "type": "dateFile",                   //日志类型
            "filename": errorLogPath,             //日志输出位置
            "alwaysIncludePattern":true,          //是否总是有后缀名
            "pattern": "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
            "path": errorPath                     //自定义属性，错误日志的根目录
        },
        // 响应日志
        {
            "category":"resLogger",
            "type": "dateFile",
            "filename": responseLogPath,
            "alwaysIncludePattern":true,
            "pattern": "-yyyy-MM-dd-hh.log",
            "path": responsePath
        }
    ],
    //设置logger名称对应的的日志等级
    "levels": {
        "errorLogger": "ERROR",
        "resLogger": "ALL"
    },
    //设置log输出的根目录
    "baseLogPath": baseLogPath
}
```

最后，我们在服务器程序中引入logUtil.js这个文件，并且使用它进行日志的记录。

```
const logUtil = require('./utils/logUtil');

// logger
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //请求处理完毕的时刻 减去 开始处理请求的时刻 = 处理请求所花掉的时间
    let ms;
    try {
        await next();

        ms = new Date() - start;

        //记录响应日志
        logUtil.logResponse(ctx, ms);
    } catch (error) {
        ms = new Date() - start;

        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});
```

这样，在服务器运行的时候，相应的响应（response）日志 和 错误日志会被分别记录到server/logs/response 和 server/logs/error 目录下。

顺便提一下，npm script中的四个缩写

在npm中，有四个常用的缩写：

`npm start`是`npm run start`

`npm stop`是`npm run stop`的简写

`npm test`是`npm run test`的简写

`npm restart`是`npm run stop && npm run restart && npm run start`的简写

### 四、用mocha和chai测试

```
npm i mocha --save-dev
npm i chai --save-dev
```

mocha使用详见[http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)

在package.json的scripts配置项中设置：

"test": "./node_modules/.bin/mocha server/test/ --watch --recursive --reporter tap"

其中，

 server/test/ 是存放测试文件的路径。不指定路径的情况下，mocha会自动到根目录的test目录下去查找命名能匹配`/test\.js$/`的文件。

 --watch参数用来监视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha。

 --recursive表示子目录下面所有的测试用例----不管在哪一层----都会执行。mocha默认执行test目录下的测试脚本，但是不会运行test下的子目录中的脚本。想要执行子目录中的测试脚本，可以在运行时添加--recursive参数。

 --reporter tap输出日志报告

然后在server/test目录下新建一个test.js：

```
const expect = require('chai').expect;

/**
 * describe 测试套件(test suite)表示一组相关的测试
 * it 测试用例(test case)表示一个单独的测试
 * assert 断言 表示对结果的预期
 */
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function(){
            expect([1,2,3].indexOf(4)).to.equal(-1);
        })
    })
});
```

