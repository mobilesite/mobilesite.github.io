---
layout:     post
title:      "用React.js从零开始启动一个DAPP项目"
subtitle:   ""
date:       2018-3-18 13:43:25
author:     "Paian"
catalog: true
tags:
    - 区块链
    - React.js
---

[上一篇](https://mobilesite.github.io/2018/03/11/geth-private-chain/) 中介绍了通过Geth搭建多节点私有链网络，为Dapp的开发准备了前提条件，本文将帮助你用React.js从零开始搭建起一个区块链项目。

当然，虽然本文选择的框架是React.js，但如果你想使用Vue.js的话，也是可以的。只需要在理解本文的基础上，适当迁移即可。笔者之前曾开发过一个快速启动Vue.js项目的脚手架工具[generator-enjoy-vue](https://github.com/mobilesite/generator-enjoy-vue)，其中对许多常用的功能进行了二次封装，并曾在产品级的项目中使用过，相信会大大提升你的开发效率。（呀，一不小心就广告了~ 哈哈）

### 一、初始化项目

简便起见，我们借助Facebook发布的create-react-app这个脚手架工具来快速初始化一个项目。在Git Bash控制台中执行如下命令：

```bash
cd d:/
npm install -g create-react-app
create-react-app dapp
```

如果命令执行成功，你将看到如下提示：

```bash
Success! Created dapp at D:\dapp
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd dapp
  npm start

Happy hacking!
```

其中给出了运行、打包、测试项目的命令，值得注意的是最后一个命令`npm run eject`。它的作用是：

    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

意思就是说这个命令是用来把项目打包所需要的配置文件“弹射”（reject）出来，让你可以修改这些配置文件。因为不做“弹射”的情况下，默认生成的项目中是看不到配置文件的，被“隐藏起来”了（默认的项目目录结构如下图）。

![](./img/in-post/start-react-blockchain-project1.png)

下面就将这些配置文件“弹射”出来，以便于更自由地对其中的配置进行修改扩展：

```bash
cd dapp
npm start
npm run eject
```

执行“弹射”命令的时候，会询问你

>  ? Are you sure you want to eject? This action is permanent. (y/N)

只需要输入y回车确认即可。现在，再来看看“弹射”之后的项目目录结构。

![](./img/in-post/start-react-blockchain-project2.png)

其中明显增加了两个文件夹：config和scripts。里面放的就是打包相关的配置文件和流程控制文件。至此，项目初始化的工作已经完成。但目前这个项目只有一些最基本的功能，离满足我们进行Dapp开发的要求还相去甚远。接下来就一步步去完善它。

### 二、完善项目配置

#### 1、添加对SASS的支持

```bash
npm i node-sass sass-loader -D
```

然后在./config/webpack.config.dev.js 和 ./config/webpack.config.prod.js中添加less文件的loader配置，可以从对css文件的loader配置中拷贝一下，稍加修改，加上sass-loader即可，如下:

```
{
            test: /\.scss$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('sass-loader'),
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins_dir: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
},
```

然后把项目中原有的.css文件改成.scss文件，并把文件中对于.css的引用都更新成对相应的.scss文件的引用。并随便找其中一个文件加入一句less代码，再执行`npm start`运行一下项目，以验证是否配置成功。

### 2、添加对antd-mobile的支持

考虑到项目中肯定需要用到一些组件。尤其是对于开发成本较高的复杂组件，你可能需要通过引入第三方组件的形式来节约开发成本。所以，这里特地添加蚂蚁金服团队所开发的[antd-mobile](https://mobile.ant.design/)组件库的支持。如果你选择其它组件库，请自行参照其官方文档引入即可，一般都非常简单。

首先，需要改造babel-loader的配置，以适应对于antd-mobile的支持。这里，先把依赖装上：

```bash
npm i antd-mobile --save
npm i babel-preset-env babel-preset-stage-2 babel-plugin-import -D
```

在根目录下新建.babelrc文件，内容为：

```
{
    "presets": [
        ["env", { "modules": false }],
        "react",
        "stage-2"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd-mobile",
                "style": "css"
            }
        ]
    ]
}
```

在package.json中删除如下这一段（因为.babelrc中配置与这一段有冲突）：

```
"babel": {
    "presets": [
        "react-app"
    ]
},
```

其中用到了[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，通过上述的配置，在你需要用到某个组件的时候，可以只引入该组件的相关JavaScript和样式，而不是整个库。而且引入方式更为简单。比如：

```
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);
```

就相当于同时引入了该组件及其样式文件，等同如下代码的效果：

```
var _button = require('antd/lib/button');
require('antd/lib/button/style/css');
ReactDOM.render(<_button>xxxx</_button>);
```

现在，我们可以在App.js中添加一个对antd-mobile组件的引入来验证一下是否配置成功：

```
import { Button } from 'antd-mobile';
```

```
<Button>测试</Button>
```

### 3、添加对TypeScript的支持

这两年TypeScript被越来越多的人使用，对于非常复杂的项目和组件的编写来说，用它来做类型检查，确实是一种值得考虑的减少错误的方案。所以，这里也添加一下对TypeScript的支持。不过，在项目中引入TypeScript也会增加一定的复杂度。具体是否真正需要TypeScript，各位读者还需根据自身的项目情况和技术掌握情况来做出选择。

第一步，安装typescript、ts-loader这两个支持TypeScript打包所依赖的库。

```bash
npm i typescript ts-loader -D
```

第二步，在./config/webpack.config.dev.js中添加：

```
{
    test: /\.(tsx)$/,
    include: paths.appSrc,
    use: [
        {
            loader: require.resolve('babel-loader'),
            options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
            },
        },
        {
            loader: require.resolve('ts-loader'),
        }
    ]
},
```

在./config/webpack.config.prod.js中添加：

```
{
    test: /\.(tsx)$/,
    include: paths.appSrc,
    use: [
        {
            loader: require.resolve('babel-loader'),
            options: {
                compact: true,
            }
        },
        {
            loader: require.resolve('ts-loader'),
        }
    ],
},
```

配置的意思就是让webpack对于后缀名为.tsx的文件，先用ts-loader处理，然后再用babel-loader处理。

注意这些配置一定要写在上述两个文件的`oneOf`对象里面，而不要写错位置了，否则会出现错误：

> Cannot find name 'module'

的错误。

此外，还需要在上述两个配置文件的`resolve.extensions`中都添加上`'.tsx'`。

第三步，在根目录下添加tsconfig.json文件，内容如下：

```
{
    "compilerOptions": {
        "strictNullChecks": true,
        "moduleResolution": "node",
        "jsx": "preserve",
        "noUnusedParameters": true,
        "noUnusedLocals": false,
        "allowSyntheticDefaultImports": true,
        "target": "es6",
        "types": [
            "classnames",
            "react",
            "react-dom",
            "react-native"
        ]
    },
    "exclude": [
        "node_modules",
        "lib",
        "es"
    ],
    "compileOnSave": false
}
```

第四步，安装上面tsconfig.json配置文件中用到的一些types：

```bash
npm i @types/classnames  @types/react @types/react-dom @types/react-native --save
```

**值得注意的是，目前（2018年3月18日），create-react-app创建的项目只支持webpack3.8.1，还不支持webpack 4，而ts-loader 4.x必须webpack 4才能支持，所以，我们只能装ts-loader 3.x版。**

```
npm i ts-loader@3.5.0 -D
```

此外，为了方便组装className，我们引入一个库：classnames。

```
npm i classnames --save
```

第五步，创建一个TypeScript编写的组件来验证效果：

./src/components/checkbox/index.tsx

```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.less';
import { Button } from 'antd-mobile';
import Checkbox from './components/checkbox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button>测试</Button>

        <Checkbox checked="true" label="我同意用户条款"></Checkbox>
      </div>
    );
  }
}

export default App;

```

./src/components/checkbox/index.less

```
.myui__checkbox{
    display: flex;
    align-items: center;
    &--checked{
        .myui__checkbox__icon{
            position: relative;
            border-color: #108ee9;
            background: #108ee9;

            &:after{
                content: "";
                position: absolute;
                z-index: 999;
                left: 50%;
                top: 50%;
                margin-top: -1px;
                transform: translate(-50%, -50%) rotate(45deg);
                width: 5px;
                height: 11px;
                border-style: solid;
                border-width: 0 1px 1px 0;
                border-color: #fff;
            }
        }
    }
    &--disabled{
        .myui__checkbox__icon{
            background-color: transparent;
            border-color: #ccc;
            opacity: .3;
            &:after{
                border-color: #888;
            }
        }
        .myui__checkbox__title{
            color: #bbb;
        }
    }
    &__icon{
        position: relative;
        margin-right: 5px;
        width: 21px;
        height: 21px;
        border: 1px solid #ccc;
        border-radius: 50%;
    }
    &__input{
        display: none;
    }
    &__title{
        flex: 1;
    }
}
```

并在App.js中引入它：

```
<Checkbox checked="true" label="我同意用户条款"></Checkbox>
```

### 4、进行redux相关配置

先安装一些相关的模块

```
npm i redux react-redux react-router react-router-dom history  react-router-redux  --save
```

将index.js改成如下：

```
import React from 'react';
import { render } from 'react-dom';

import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
```



下面进行react-redux相关配置。

将App.js改成如下：

```
import React, { Component } from 'react';
import Layout from './containers/layout'
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { Link, BrowserRouter, HashRouter } from 'react-router-dom';
import {store} from './store';
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Layout></Layout>
            </Provider>
        );
    }
}

export default App;
```

并新建如下几个文件，以配置好store以及types、reducers、actions：

./store.js

```
import { createStore, combineReducers } from 'redux';
import global from './reducers/global.js';

let store = createStore(combineReducers({
    global,
}))

export { //注意这里没有default
    store
};
```



./types.js

```
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
```



./reducers/index.js

```
const initState = {

}

export default function global(state=initState, action) {
    return state;
};
```



./actions/global.js

```
import * as types from '../types.js';

export function global(state, action){
    switch(action.type){
        case types.OPEN_MODAL:
            const id = action.payload;
            let newState = {...state};
            if(!newState.modals[id]){
                newState.modals[id] = {}
            }
            newState.modals[id].isOpen = true;
            return newState;
        case types.OPEN_MODAL:
            const id = action.payload;
            let newState = {...state};
            if(!newState.modals[id]){
                newState.modals[id] = {}
            }
            newState.modals[id].isOpen = false;
            return newState;
        default:
            return state;
    }
}
```



### 5、进行路由相关配置

我们让默认访问主域名的时候进入/home页，点击home页面的“我的”按钮时，进入/my页面。当访问的路由不存在时，显示notfound组件，提示页面不存在。

./containers/layout/index.js

```
import React, { Component, Fragment } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from '../home';
import My from '../my';
import Notfound from '../notfound';

const history = createBrowserHistory()

export default class Layout extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/my" component={My}></Route>
                    <Route exact path="*" component={Notfound}></Route>
                </Switch>
            </Router>
        )
    }
}
```



./containers/home/index.js

```
import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import Checkbox from '../../components/checkbox';

export default class Home extends Component {
    render(){
        return (
            <div>
                <h2>Home</h2>
                <Button>测试</Button><br/>
                <Link to="/my">我的</Link><br/>
                <br/><br/>
                <Checkbox checked="true" label="我同意用户条款"></Checkbox>
            </div>
        )
    }
}
```



./containers/my/index.js

```
import React, { Component, Fragment } from 'react';

export default class My extends Component {
    render(){
        return (
            <div>
                <h2>My</h2>
            </div>
        )
    }
}
```



./containers/notfound/index.js

```
import React, { Component, Fragment } from 'react';

export default class Notfound extends Component {
    render(){
        return (
            <div>
                <h2>该页面不存在</h2>
            </div>
        )
    }
}
```

至此，一个基本的项目启动就已经完成了。在这个基础上，我们可以开始进行应用的开发了。你可以在[这里](https://github.com/mobilesite/dapp) 下载到完整的源码。