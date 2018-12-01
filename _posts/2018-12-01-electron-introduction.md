---
layout:     post
title:      "electron桌面应用程序开发入门"
subtitle:   ""
date:       2018-12-01 23:56:21
author:     "Paian"
catalog:    true
tags:
    - electron
    - vue
    - 桌面应用程序开发
---

### 一、初始化一个项目

官方文档：https://electronjs.org/docs

新建一个文件夹electron-demo

然后
```
cd electron-demo
npm init
npm i electron -S
```

新建一个index.js：

```
const { app, BrowserWindow } = require('electron');

const username = 'test electron variable';
global.username = username;

app.on('ready', () => {
  const win = new BrowserWindow();
  win.webContents.openDevTools(); //打开调试面板
  win.loadFile('./layout/index.html'); //载入web页面
});
```

这个index.js是在主进程中执行。而layout/index.html则是在另一个渲染进程中执行。

layout/index.html的内容如下：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Window</h1>
  <script>
    const { remote } = require('electron');
    // console.log(username); // 直接拿主进程中的全局变量内容是拿不到的
    // 但是可以通过 electron 的 romote 属性的 getGloabal() 来拿到
    console.log(remote.getGlobal('username'));
  </script>
</body>
</html>
```

### 二、进程之间通信：IPC

ipcRenderer从渲染进程到主进程的通信。

ipcMain则是在主进程中使用的。

下面看一段渲染进程向主进程发送消息以及主进程中接受消息的代码：

index.js
```
const { app, BrowserWindow, ipcMain } = require('electron');

const username = 'test electron variable';
global.username = username;

const datas = {
  username: 'hanmeimei',
  gender: 'male'
};

app.on('ready', () => {
  const win = new BrowserWindow();
  win.webContents.openDevTools(); //打开调试面板
  win.loadFile('./layout/index.html'); //载入web页面

  // 监听渲染进程发送过来的消息
  ipcMain.on('getData', function (e, key) {
    console.log(key);
    // 通过e.sender对象返回消息给渲染进程
    e.sender.send('sendData', datas[key]);
  })
});
```

layout/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Window</h1>
  <button>按钮</button>
  <script>
    const { remote, ipcRenderer } = require('electron');
    // console.log(username); // 直接拿主进程中的全局变量内容是拿不到的
    // 但是可以通过 electron 的 romote 属性的 getGloabal() 来拿到
    console.log(remote.getGlobal('username'));

    const btn = document.querySelectorAll('button')[0];
    btn.onclick = function() {
      ipcRenderer.send('getData', 'username');
    }

    ipcRenderer.on('sendData', function(e, data) {
      console.log(e, data);
    })
  </script>
</body>
</html>
```

### 三、两个窗口之间的通信

主要的是通过localstorage来通信。

index.js
```
const { app, BrowserWindow, ipcMain } = require('electron');

const username = 'test electron variable';
global.username = username;

const datas = {
  username: 'hanmeimei',
  gender: 'male'
};

app.on('ready', () => {
  const win = new BrowserWindow();
  win.webContents.openDevTools(); //打开调试面板
  win.loadFile('./layout/index.html'); //载入web页面

  // 监听渲染进程发送过来的消息
  ipcMain.on('getData', function (e, key) {
    console.log(key);
    // 通过e.sender对象返回消息给渲染进程
    e.sender.send('sendData', datas[key]);
  })


  const win2 = new BrowserWindow();
  win2.webContents.openDevTools(); //打开调试面板
  win2.loadFile('./layout/index2.html'); //载入web页面
});
```

index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Window</h1>
  <button>按钮1</button>
  <button>按钮2</button>
  <script>
    const { remote, ipcRenderer } = require('electron');
    // console.log(username); // 直接拿主进程中的全局变量内容是拿不到的
    // 但是可以通过 electron 的 romote 属性的 getGloabal() 来拿到
    console.log(remote.getGlobal('username'));

    const btns = document.querySelectorAll('button');
    btns[0].onclick = function() {
      ipcRenderer.send('getData', 'username');
    }

    ipcRenderer.on('sendData', function(e, data) {
      console.log(e, data);
    })

    btns[1].onclick = function() {
      localStorage.setItem('myname', 'paian');
    }
  </script>
</body>
</html>
```

index2.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Window2</h1>
  <button>按钮</button>
  <script>
    const btns = document.querySelectorAll('button');
    btns[0].onclick = function() {
      const myname = localStorage.getItem('myname');
      console.log(myname);
    };
  </script>
</body>
</html>
```

### 四、自定义窗口
怎么设置一个窗口的大小和隐藏默认边框和按钮？
```
const win = new BrowserWindow({
width: 1920,
height: 1080,
frame: false, // 隐藏默认边框和按钮
resizable: false // 不可拖拽改变窗口大小
});
```

因为默认的按钮被隐藏了，所以需要自己在html页面中实现一个header来替代。
/* 实现标题头的可拖拽 */
.header {
-webkit-app-region: drag;
}

.header .close{
-webkit-app-region: no-drag;
}

.header .min{
-webkit-app-region: no-drag;
}

### 五、与Vue.js结合使用

在electron中引入Vue.js，可以在layout/index.html中手动用script标签引入 或者 用electron-vue

下面是一个关于应用关闭和窗口缩小的实现，并且使用了Vue.js。

index.js
```
const { app, BrowserWindow, ipcMain } = require('electron');

const username = 'test electron variable';
global.username = username;

const datas = {
  username: 'hanmeimei',
  gender: 'male'
};

app.on('ready', () => {
  const win = new BrowserWindow();
  win.webContents.openDevTools(); //打开调试面板
  win.loadFile('./layout/index.html'); //载入web页面

  // 监听渲染进程发送过来的消息
  ipcMain.on('getData', function (e, key) {
    console.log(key);
    // 通过e.sender对象返回消息给渲染进程
    e.sender.send('sendData', datas[key]);
  })

  const win2 = new BrowserWindow({
    width: 720,
    height: 480,
    frame: false,
    resizable: false
  });
  win2.webContents.openDevTools(); //打开调试面板
  win2.loadFile('./layout/index2.html'); //载入web页面
});
```

layout/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>Window</h1>
  <button>按钮1</button>
  <button>按钮2</button>
  <script>
    const { remote, ipcRenderer } = require('electron');
    // console.log(username); // 直接拿主进程中的全局变量内容是拿不到的
    // 但是可以通过 electron 的 romote 属性的 getGloabal() 来拿到
    console.log(remote.getGlobal('username'));

    const btns = document.querySelectorAll('button');
    btns[0].onclick = function() {
      ipcRenderer.send('getData', 'username');
    }

    ipcRenderer.on('sendData', function(e, data) {
      console.log(e, data);
    })

    btns[1].onclick = function() {
      localStorage.setItem('myname', 'paian');
    }
  </script>
</body>
</html>
```

index2.html
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    body {
      font-family: sans-serif;
    }

    .header {
      -webkit-app-region: drag;
      display: flex;
    }

    .header .close {
      -webkit-app-region: no-drag;
    }

    .header .mini {
      -webkit-app-region: no-drag;
    }

    .header .title {
      flex: 1;
    }

    .header .button {
      display: inline-block;
      cursor: pointer;
      width: 30px;
      text-align: center;
    }

    .header .button:focus {
      border: none;
    }
  </style>
  <script src="./vue.min.js"></script>
</head>

<body>
  <div id="root">
    <header class="header">
      <h1 class="title" v-text="title"></h1>
      <div class="buttons">
        <a class="button mini" @click="miniWindow">-</a>
        <a class="button close" @click="closeApp">x</a>
      </div>
    </header>
  </div>

  <script>
    const {
      remote
    } = require('electron');
    new Vue({
      el: '#root',
      data: {
        title: 'Window2'
      },
      methods: {
        closeApp() {
          // 关闭整个应用，当有多个窗口时，多个窗口均会被关闭
          remote.app.exit();
        },
        miniWindow() {
          // 只是最小化当前窗口
          remote.getCurrentWindow().minimize();
        }
      }
    });
  </script>
</body>

</html>
```

### 六、使用electron-builder进行打包

```
npm i electron-builder -D
```

安装后我们需要在package.json中做一下配置：

```
"build": {
    "appId": "com.abc.paian",
    "copyright": "copyright © 2018 paian",
    "productName": "electron-demo",
    "directories": {
      "output": "./dist"
    },
    "win": {
      "target": ["nsis", "zip"],
      "icon": "./source/logo.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "installerIcon": "./source/logo.ico",
      "installerHeader": "./source/header.bmp",
      "license": "./source/license.txt"
    }
  }
```

注意：.ico必须大于256x256像素，否则打包会报错。

更多详细的配置请参看这里:

https://www.electron.build/configuration/configuration#configuration


打包的脚本也可以在package.json中配置：

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "./node_modules/.bin/electron .",
    "build": "./node_modules/.bin/electron-builder -w"
  },
```

其中build一行即是。

-w   windows

-m   mac

-l     linux

更多参见：

https://www.electron.build/cli

打包的时候还得注意，因为electron-builder会自动将electron打到包里，所以应该将package.json中的"electron": "^3.0.10"从dependencies中转移到devDependencies中，否则会提示错误：
> Package "electron" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json。
