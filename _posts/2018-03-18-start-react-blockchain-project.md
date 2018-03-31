---
layout:     post
title:      "用React.js从零开始搭建一个区块链项目"
subtitle:   ""
date:       2018-3-18 13:43:25
author:     "Paian"
catalog: true
tags:
    - 区块链
    - React.js
---

## 用React.js从零开始启动一个区块链项目

[上一篇](http://mobilesite.github.io/2018/03/11/geth-private-chain/) 中介绍了通过Geth搭建多节点私有链网络，为Dapp的开发准备了前提条件，本文将帮助你用React.js从零开始搭建起一个区块链项目。

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
                  plugins: () => [
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

至此，一个基本的项目启动就已经完成了。在这个基础上，我们可以开发各种复杂的业务功能了。



















编写异步载入组件方法：

// 使用方法
// import { asyncComponent } from './asyncComponent'
// const Foo = asyncComponent(() => import("./foo"))
// <Route path="/xx" component={Foo} />

import React, { Component } from "react";

export const asyncComponent = loadComponent => (
    class AsyncComp extends Component {
        state = {
            ComponentToLoad: null
        }
    
        _hasLoaded(){
            return this.state.ComponentToLoad !== null;
        }
    
        componentWillMount(){
            if (this._hasLoaded()) {
                return;
            }
    
            // 注意asyncComponent接收的参数loadComponent是一个函数： () => import("./foo")
            // 返回的import("./foo")又是一个Promise，所以可以用then
            loadComponent()
            .then(module => {
                debugger;
                return module.default;
            })
            .then(ComponentToLoad => {
                this.setState({ ComponentToLoad });
            })
            .catch(err => {
                console.error(`Load component error in asyncComponent!`);
                throw err;
            })
        }
    
        render(){
            const { ComponentToLoad } = this.state;
            return ComponentToLoad ? <ComponentToLoad {...this.props}/> : null;
        }
    }
)


安装

npm install babel-plugin-transform-decorators-legacy --save-dev

以支持

openModal = event => {}的写法。

并在.babelrc中添加该plugin：

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
        ],
        "transform-decorators-legacy"
    ]
}
```

添加动画支持：

npm i react-transition-group -S

import { TransitionGroup, CSSTransition } from 'react-transition-group';

<Router>
    <Route render={({location}) => (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="slide-left" timeout={{enter: 500, exit: 300}}>
                <Switch key={location.key} location={location}>
                    <Route exact path="/" component={My}/>
                    <Route component={Notfound}/>
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    )}/>
</Router>

不知道为什么需要到放到render中才有效果。

切换时出现这个错误：

Uncaught TypeError: Cannot read property 'classList' of null

所以需要在上面的CSSTransition和Switch之间嵌套一个div。

参见：https://github.com/ReactTraining/react-router/issues/5279

因为ReactDOM.findDOMNode will return null when the component is unmounted 

这是因为code split导致的。

改成这样：

```
<Router>
    <Route render={({location}) => (
        <TransitionGroup>
                <CSSTransition key={location.pathname.split('/')[1]} classNames="slide-left" timeout={{enter: 500, exit: 300}}>
                    <div className="wrapper">
                        <Switch key={location.pathname.split('/')[1]} location={location}>
                            <Route exact path="/" component={My}/>
                            <Route component={Notfound}/>
                        </Switch>
                    </div>
                </CSSTransition>
           
        </TransitionGroup>
    )}/>
</Router>
```

过渡样式：

.slide-left-enter {
    opacity: 0.01;
    transform: translate3d(100%, 0, 0);
}

.slide-left-enter.slide-left-enter-active {
    opacity: 1;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translate3d(0, 0, 0);
}
.slide-left-exit {
    opacity: 1;
    transform: translate3d(0, 0, 0);
}

.slide-left-exit.slide-left-exit-active {
    opacity: 0.01;
    transition: opacity 0.5s ease, transform 0.5s ease;
    transform: translate3d(-100%, 0, 0);
}

完善动画效果，使得不同页面可定制：

const defaultTransition = {
    classNames: "slide-left",
    timeout: 400
};
const transitionMap = {
    my: { classNames: "slide-right", timeout: 400 }
};

return (
    <Router>
        <Route
            render={({ location }) => {
                const current = location.pathname.split("/")[1];
                return (
                    <TransitionGroup>
                        <CSSTransition
                            key={current}
                            classNames={defaultTransition.classNames}
                            timeout={defaultTransition.timeout}
                            {...transitionMap[current]}
                            mountOnEnter={true}
                            unmountOnExit={true}
                        >
                            <div className="wrapper">
                                <Switch key={current} location={location} >
                                    <Route exact path="/" component={My} />
                                    <Route component={Notfound} />
    
                                </Switch>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                );
            }}
        />
    </Router>
);

让底部导航在路由动画时无错位：

.ej-root {
    position: relative;
    height: 100%;
}
.ej-page {
    position: absolute;
    width: 100%;
    height: 100%;
}

### 添加redux

```
npm i redux react-redux -S
```

```
import { Provider } from 'react-redux';
import { store } from './store';
```

在Layout外面包一层Provider, 并传入store：

```
<Provider store={store}>
    <Layout></Layout>
</Provider>
```

新建store.js文件：

```
import { createStore, combineReducers } from 'redux';
import account from './reducers/account';

let store = createStore(combineReducers({
    account
}))

export { //注意这里没有default
    store
};
```
(Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。

createStore(reducer, [initialState], enhancer)
创建一个 Redux store 来以存放应用中所有的 state。
应用中应有且仅有一个 store。

其中，Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。

新建reducers/account.js文件：

这个文件其实是个reducer，所谓reducer本质上是一个函数。
reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 。

如果 state 是普通对象，永远不要修改它！比如，reducer 里不要使用 Object.assign(state, newData)，应该使用 Object.assign({}, state, newData)。这样才不会覆盖旧的 state。也可以使用 Babel 阶段 1 中的 ES7 对象的 spread 操作 特性中的 return { ...state, ...newData }。

```
const initState = {
    
}

export default function account(state=initState, action) {
    return state;
};
```

在组件中应用：

```
import { connect } from 'react-redux';
```

```
@connect(state => {
    return state
})
```

引入saga:

```
npm i redux-saga -S
```

```
import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/index';

const sagaMidlleware = createSagaMiddleware();
const middlewareArray = [
    sagaMidlleware
]
const middlewares = applyMiddleware(...middlewareArray);
 
const store = createStore(reducers, undefined, compose(middlewares));

sagaMidlleware.run(sagas);

export {
    store
};
```

compose(...functions)


从右到左来组合多个函数。这是函数式编程中的方法，为了方便，被放到了 Redux 里。 当需要把多个 store 增强器 依次执行的时候，需要用到它。

新建sagas/index.js

```js
import { fork, all, take, call, takeEvery, put, select, cancel } from 'redux-saga/effects';
import watchAccount from './account';

export default function* rootSaga(){
    yield all([
        fork(watchAccount)
    ])
}
```



然后安装redux-saga和redux-persist：

```
npm i redux-saga redux-persist  --save
```

redux-persist从4到5有较大变化。

新建sagas/account.js

```js
import { fork, all, take, call, takeEvery, put, select, cancel } from 'redux-saga/effects';
import types from '../types/index';

function* createAccount(action){

}

function* importAccount(action){

}

function* updateAccount(action){

}

export default function* watchAccount(){
    yield takeEvery(types.CREATE_ACCOUNT_PENDING, createAccount);
    yield takeEvery(types.IMPORT_ACCOUNT_PENDING, importAccount);
    yield takeEvery(types.UPDATE_ACCOUNUT_PENDING, updateAccount);
}
```

遇到问题：

Uncaught ReferenceError: regeneratorRuntime is not defined

解决办法：

```
npm i babel-polyfill -S
```

然后在文件的最开头引入一下：

```
import 'babel-polyfill';

```

引入调试插件的支持：

```
const store = createStore(
    reducers,
    undefined,
    compose(
        middlewares,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
```

正式环境由于代码压缩，是不会出现window.__REDUX_DEVTOOLS_EXTENSION__的，所以也不会出现允许调试的情况，因此不用增加process.env && process.env.NODE_ENV === 'development'这样的判断。

action和reducer的配合：

组件中：
```
import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as modalActions from "../../actions/modal";

@connect(
    state => {
        return {};
    },
    dispatch => {
        return bindActionCreators(modalActions, dispatch);
    }
)
export default class ModalLink extends Component {
    openModal = event => {
        if (this.props.preOpenHandler) {
            this.props.preOpenHandler(event);
        }
        this.props.openModal(this.props.modalID);
    };

    render() {
        const cls = this.props.className
            ? `ej-modal-link ${this.props.className}`
            : "ej-modal-link";
        return (
            <a className={cls} onClick={this.openModal}>
                {this.props.children}
            </a>
        );
    }
}
```

action中
```
import * as types from '../types' 

export function openModal(modalID){
    return {
        type: types.OPEN_MODAL,
        data: {
            modalID
        }
    }
}

export function closeModal(modalID){
    return {
        type: types.CLOSE_MODAL,
        data: {
            modalID
        }
    }
}
```

reducer中
```
import { combineReducers } from 'redux';

import account from './account';
import modal from './modal';

const reducers = combineReducers({
    accounts: account,
    modals: modal,
})

export default reducers; 
```

### 添加web3

npm i web3@1.0.0-beta.29 -S



### 添加对装饰器如@connect这样语法的支持

```
npm i babel-plugin-transform-decorators-legacy -D
```

并在babel的plugins中添加：

["transform-decorators-legacy"]

### service is not defined no-undef

是eslint检查引起的，暂时先去掉检查

### 安装一批依赖

"es6-promise": "^4.1.0",
"ethereumjs-tx": "^1.3.1",
"ethereumjs-util": "^5.1.2",
"ethereumjs-wallet": "^0.6.0",
"fastclick": "^1.0.6",
"web3": "^0.19.1",
"react-select": "^@1.2.0",
"react-password-strength": "^2.0.0",

### 添加react-router-redux和history

```bash
npm install --save react-router-redux@next
npm install --save history
```

```js
import { ConnectedRouter } from "react-router-redux";
import history from "../../history";
```

并在<Router>外面包上：

```js
<ConnectedRouter history={history}>
</ConnectedRouter>
```

通过this.props.history可以拿到history

可以进行形如this.props.history.replace的操作


## 二、解读kyber wallet的老版代码

### web3.js 0.2x 版本如何进行一笔交易

```
export function sendTokenFromAccount(
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring,
  password, callback) {

  var txData = ethereum.sendTokenData(sourceToken, sourceAmount, destAddress)

  const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: sourceToken,
    value: 0,
    data: txData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 1337
  }
  const tx = sealTxByKeystore(txParams, keystring, password)

  store.dispatch(doTransaction(id, ethereum, tx, callback))
}
```

1、通过代币合约拿到要携带的数据data

`myContractInstance.myMethod.getData(...)`

```
sendTokenData(sourceToken, sourceAmount, destAddress) {
    var tokenContract = this.erc20Contract.at(sourceToken);
    return tokenContract.transfer.getData(destAddress, sourceAmount);
}
```

获取

`this.erc20Contract`是什么呢？它是一个合约对象。

```
this.rpc = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
);
this.erc20Contract = this.rpc.eth.contract(constants.ERC20); //创建一个合约对象
```

this.rpc是一个Web3实例，所以实际就是用了Web3.eth.contract(ABIArray)。传入的参数是一个ABI对象数组，里面包含了一到多个ABI对象。所谓ABI对象，就是描述合约的函数、事件的对象。

这里有个ERC20，它是什么呢？它是一个协议。市面上出现了大量的用ETH做的代币，它们都遵守ERC20协议。

2、获取到nonce, gasPrice, gasLimit, to, value, data, chainId等字段

nonce, gasPrice, gasLimit 分别怎么拿到，后两者是不是应该有个默认值？

3、基于上述字段，通过ethereumjs-tx模块创建交易，通过unlock方法获得私钥，然后用私钥对交易进行签名

```
export function sealTxByKeystore(params, keystore, password) {
  const tx = new EthereumTx(params) //EthereumTx是来自ethereumjs-tx模块的
  const privKey = unlock(keystore, password, true) //获得密钥
  tx.sign(privKey)
  return tx
}
```

其中，EthereumTx是来自ethereumjs-tx模块的，用于创建交易

### 如何获得某一个代币的余额

```
getTokenBalance(address, ownerAddr, callback) {
    var instance = this.erc20Contract.at(address); //在某地址上实例化一个代币合约，亦即使用一个在某个地址上已经存在的合约
    instance.balanceOf(ownerAddr, (error, result) => {
        if (error != null) {
            console.log(error);
        } else {
            callback(result);
        }
    });
}
```

要弄清楚这一点，首先我们需要搞清楚，代币对象是个什么结构？

#### 代币对象的结构

```
export default class Token {
  constructor(name, icon, symbol, address, owner, balance = 0) {
    this.name = name
    this.icon = icon
    this.symbol = symbol
    this.address = address
    this.ownerAddress = owner
    this.balance = balance
  }

  shallowClone() {
    return new Token(
      this.name, this.icon, this.symbol, this.address,
      this.ownerAddress, this.balance)
  }

  sync(ethereum, callback) {
    ethereum.getTokenBalance(
      this.address, this.ownerAddress, (balance) => {
        const tok = this.shallowClone()
        tok.balance = balance
        callback(tok)
    })
  }
}
```

这是代币的类。从中可以看出，代币有name, icon, symbol, address, owner, balance 等字段。其中，name, icon, symbol, address这四个字段都是固定的，它们分别是代币的名称、logo、符号（如以太币的符号是ETH）、地址。

而owner是代币持有者的地址，balance就是余额了。

**注意，上面的Token中的address是该代币币种合约的部署地址，所以它是唯一的。而ownerAddress是代币所有者的地址。**

#### 拿到代币合约实例

`var instance = this.erc20Contract.at(address); `在某地址上实例化一个代币合约，亦即使用一个在某个地址上已经存在的合约，这里的参数的address是代币的地址，就是刚刚我们提到的那个每一种代币的唯一、固定的地址。

拿到这个代币合约实例之后，我们就可以调用合约了。通过调用智能合约可以做很多的事情。比如：

获得代币交易时需要发送的data:

```
sendTokenData(sourceToken, sourceAmount, destAddress) {
    var tokenContract = this.erc20Contract.at(sourceToken);
    return tokenContract.transfer.getData(destAddress, sourceAmount);
}
```

### 如何创建智能合约源码、编译智能合约、部署一个智能合约(这部分内容待验证，好像是不太好用了)

实现智能合约的方式很多种，可以用truffle框架来实现，编译，部署。
这里介绍一种简单的使用nodejs来实现，编译，部署的方法。
创建一个nodejs项目，实现一个简单的智能合约。

```
mkdir sm && cd sm
npm init
mkdir contracts && cd contracts
```

#### 创建智能合约源码

下面我们新建一个智能合约文件：

```
vi BaseToken.sol
```

```
//BaseToken.sol
contract Token{
    address public owner;
    mapping (address => uint) public balances;
    event Sent(address from, address to, uint amount)

    //查看代币量
    function Token(){
        owner = msg.sender;
        balances[owner] = 100000000;
    }

    //传入 接收者地址 和 发送的代币量 进行转账
    function send(address receiver, uint amount){
        if (balances[msg.sender] < amount) return;
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        Sent(msg.sender, receiver, amount);
    }
}
```

这个合约实现了一个造币和转币的逻辑。
我们的合约是运行在EVM(Ether虚拟机)上面的字节码，solidity是静态语言，需要通过编译器生成evm的字节码。

#### 编译智能合约

```
vi compile.js
```

```
// compile.js
const fs = require('fs')
const solc = require('solc') 

let source = fs.readFileSync("./contracts/BaseToken.sol", 'utf8') //读取合约源码文件
console.log('compiling contract...');
let compiledContract = solc.compile(source); //编译合约
console.log('done');

for (let contractName in compiledContract.contracts) {
    var bytecode = compiledContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compiledContract.contracts[contractName].interface);
}
console.log(bytecode)
```

执行```node compile.js```,对BaseToken进行编译，生成字节码。编译之后，会有bytecode和interface，bytecode是智能合约字节码，interface可以JSON.parse出智能合约的abi数组。

#### 部署智能合约

web3中提供了一个部署合约的接口，使用如下。下面进行估算：

```
let gasEstimate = web3.eth.estimateGas({data: '0x' + bytecode});

console.log('gasEstimate: ' + gasEstimate)

let MyContract = web3.eth.contract(abi);

console.log('deploying contract...');


let myContractReturned = MyContract.new(
    [], 
    {
        from: address,
        data: '0x' + bytecode,
        gas: gasEstimate+50000
    }, 
    function(err, myContract){
        if(!err){
            if(!myContract.address){
                console.log(`myContract.transactionHash = ${myContract.transactionHash}`);
            }else{
                console.log(`myContract.address = ${myContract.address}`); // the contract address
                global.contractAddress = myContract.address;
            }
        }else{
            console.log(err);
        }
    }
);
```

`web3.eth.estimateGas()`节点中执行一个消息调用，或交易。但是不会合入区块链中。返回使用的gas量。

利用编译生成的abi和bytecode，创建一个合约对象，然后进行发布，等待着异步执行的方法输出合约地址contractAddress，这样就完成了部署。不过这种方式有一个问题，就是在发布合约时，你的私钥处于联网状态，出于安全策略，我们需要尽量避免私钥在联网状态。

以太坊上部署合约是向空地址发送一个附有字节码的签名交易，其中发送者就是这个合约的拥有者。因此我们只需要将合约构建成一笔交易，我们在无网状态下对这笔交易进行签名，然后将签名发送到以太坊网络中。这样能够降低我们私钥被泄漏的风险。

对合约的签名方法如下：

```
var Tx = require('ethereumjs-tx')
const rawTx = {
    nonce: '0x6', //这个是你的地址的交易次数+1，0开始
    gasPrice: '0x12a05f200',
    gasLimit: '0x493e0',
    data: bytecode,
    from: address,
    to: ""
};
const tx = new Tx(rawTx);
tx.sign(privateKey);
const serializedTx = tx.serialize();
console.log(serializedTx.toString('hex'));
```

**以上对一个合约签名，这里需要注意的问题是，to的地址需要是空地址。**

完成签名之后，我们把这笔交易发送出去就好，最简单的方法就是使用etherscan的发送Tx的方式，一旦发送完成，部署完成，就可以看到合约地址。

## 三、从web3.js 0.x 升级到web3.js 1.0beta

### 1、改变库

```bash
npm i web3@1.0.0-beta.28 bignumber.js --save
```

bignumber.js 版本6和版本5之间api有变化，所以我们装版本5，否则会出错。比如说没有round方法等。

### 2、修改智能合约对象的生成

this.rpc.eth.contract(ABIarray)

改成

new this.rpc.eth.Contract(ABIarray)

### 3、修改智能合约的实例化

将

`this.rpc.eth.contract(ABIarray).at(contractAddress)`

改成

`new this.rpc.eth.Contract(ABIarray, contractAddress);`

将

`this.erc20Contract.at(contractAddress)`

改成

```js
var tokenContract = this.erc20Contract;
tokenContract.options.address = contractAddress;
```


### 4、eth.filter已经废弃了，所以this.rpc.eth.filter的监听需要改成用setInterval实现。

### 5、调用智能合约的方法的方式变了

```this.networkContract.getRate(source, dest, reserve, callback) {...}```

改成

```this.networkContract.methods.getRate(source, dest, reserve).call().then(...).catch(...)```

### 6、最坑的一点，升级之后，智能合约output解析出错：

Error: Couldn't decode uint256 from ABI: 0x

在此环节中value==''，导致抛出错误，至今不知如何修改。

https://github.com/jdkanani/web3.js/commit/085a2962dca6cc3a1fc1bcf0a31c946a591708f1


智能合约的调用的实例化方式变了（从给at传参的方式变成了设置options.address），调用智能合约内函数的方法也变了（变成了.methods）,getData也变了等等，可参见下面这个例子。

旧的：

```
sendTokenData(sourceToken, sourceAmount, destAddress) {
    var tokenContract = this.erc20Contract.at(sourceToken);
    return tokenContract.transfer.getData(destAddress, sourceAmount);
}
```

新的：

```
sendTokenData(sourceToken, sourceAmount, destAddress) {
    var tokenContract = this.erc20Contract;
    tokenContract.options.address = sourceToken;
    return tokenContract.methods.transfer(destAddress, sourceAmount).encodeABI();
}
```

## 四、读kyber wallet新版的源码

### 修正一个导致在本机运行时，不能导入账户的错误

web3-eth库的index.js文件中，有一个错误，config一直没能添加进来，所以手动地加入：

```
var helpers = require('web3-core-helpers');

//下面的这几行是自己添加的
helpers.config = {
    defaultBlock: 'latest',
    defaultAccount: null
}
console.log('自己修改helpers，添加了config：', helpers);
```

同时需要修改webpack.config.js中的配置，以便于能够将上面这个修改打包进去。

```
exclude: /node_modules\/(?!(web3-eth)\/).*/,
```

### docs 文件夹

无关紧要

### env 文件夹

主要是用通过 process.env.npm_config_chain 这个环境变量来切换不同的网络，默认是 kovan，还有 ropsten 和 mainnet。与之对应的，package.json 中有--env.chain=ropsten之类的配置选项。

这个env文件夹里面有几个.json 文件用来配置不同环境下的配置项，包括连接的地址，支持哪些代币等等。

并通过一个 js 文件将配置作为一个对象进行了抛出。

```json
{
    "connections": {
        "http": [
            "https://ropsten.infura.io/DtzEYY0Km2BA3YwyJcBG",
            "https://ropsten.infura.io/0BRKxQ0SFvAxGL72cbXi",
            "https://ropsten.infura.io/Ho4cy66JFfTvvAVlXvii",
            "https://ropsten.infura.io/aFvzEJSCQtTUJJ0Ec0mW",
            "https://ropsten.infura.io/uF2YCXrIz7yUFEXd2yo0",
            "https://ropsten.infura.io/NhLyl78p5UrUgBN5GSty"
        ],
        "ws": "wss://ropsten.kyber.network/ws/"
    },
    "history_endpoint": "https://cache.kyber.network",
    "api_usd": "https://api.coinmarketcap.com",
    "tokens": {
        "ETH": {
            "name": "Ethereum",
            "symbol": "ETH",
            "icon": "eth.svg",
            "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "decimal": 18,
            "usd_id": "ethereum"
        },
        "KNC": {
            "name": "KyberNetwork",
            "symbol": "KNC",
            "icon": "knc.svg",
            "address": "0xa59826bfd12c6cddff70137a5f3e29b75215c531",
            "decimal": 18,
            "usd_id": "kyber-network"
        },
        "OMG": {
            "name": "OmiseGO",
            "symbol": "OMG",
            "icon": "omg.svg",
            "address": "0x98541419c0f9873acf6bf449cb7246f9df600d2c",
            "decimal": 18,
            "usd_id": "omisego"
        },
        "DGD": {
            "name": "DigixDAO",
            "symbol": "DGD",
            "icon": "dgd.svg",
            "address": "0xe8c213a416646b5dfc04845d1b3e471b35599722",
            "decimal": 9,
            "usd_id": "digixdao"
        },
        "CVC": {
            "name": "Civic",
            "symbol": "CVC",
            "icon": "cvc.svg",
            "address": "0x5313256342e3b2a12188b91eee310f8311b8aa73",
            "decimal": 8,
            "usd_id": "civic"
        },
        "FUN": {
            "name": "FunFair",
            "symbol": "FUN",
            "icon": "fun.svg",
            "address": "0xf96a8f7cd011a3cf2f2c8f5fdf8aaf0471ec3302",
            "decimal": 8,
            "usd_id": "funfair"
        },
        "MCO": {
            "name": "Monaco",
            "symbol": "MCO",
            "icon": "mco.svg",
            "address": "0xec8530552d545aa50668af7d75a96d9359d7388a",
            "decimal": 8,
            "usd_id": "monaco"
        },
        "GNT": {
            "name": "Golem",
            "symbol": "GNT",
            "icon": "gnt.svg",
            "address": "0x4d46106343242999b7617e6c1a8f6d4927831582",
            "decimal": 18,
            "usd_id": "golem-network-tokens"
        },
        "ADX": {
            "name": "AdEx",
            "symbol": "ADX",
            "icon": "adx.svg",
            "address": "0xf0de273c82a7eddd6057d963b848cd21309364bf",
            "decimal": 4,
            "usd_id": "adx-net"
        },
        "PAY": {
            "name": "TenX",
            "symbol": "PAY",
            "icon": "pay.svg",
            "address": "0xa8f3612baea3998fee82673506189dc277eb8973",
            "decimal": 18,
            "usd_id": "tenx"
        },
        "BAT": {
            "name": "BasicAttention",
            "symbol": "BAT",
            "icon": "bat.svg",
            "address": "0xfe35c93a01af76dbe1116f13dd903578f340ab7d",
            "decimal": 18,
            "usd_id": "basic-attention-token"
        },
        "EOS": {
            "name": "Eos",
            "symbol": "EOS",
            "icon": "eos.svg",
            "address": "0x7d7fd73fede850a0d3f044af79ba83490830ae4b",
            "decimal": 18,
            "usd_id": "eos"
        },
        "LINK": {
            "name": "ChainLink",
            "symbol": "LINK",
            "icon": "link.svg",
            "address": "0xfab56a845dbb07f6ffdadf225713de8617e37d5c",
            "decimal": 18,
            "usd_id": "chainlink"
        }
    },
    "ethScanUrl": "https://ropsten.etherscan.io/",
    "bank": "0xcbae93b11b0a7a944649f26f17ab5566a1526f6f",
    "reserve": "0x488b362e51a53e969cb28f42eadc41411f20a835",
    "pricing": "0x6dcf29f5dc0f207e6d850d9436e35281079bc063",
    "network": "0xe801403a9b8dae494f9088a4687c1c139fae2fe4",
    "wrapper": "0x54556ac5afbd73b6a9d1c3d2d679477dd33ea81f",
    "trade_topic":
        "0xec0d3e799aa270a144d7e3be084ccfc657450e33ecea1b1a4154c95cedaae5c3",
    "endpoint": "https://ropsten.infura.io/DtzEYY0Km2BA3YwyJcBG",
    "averageBlockTime": 6000,
    "networkId": 3,
    "chainName": "Ropsten",
    "faucet": "https://faucet.kyber.network/",
    "server_logs": {
        "url": "ropsten.etherscan.io",
        "api_key": "D8YAEQ3V4THAPDA9YSB1YGA1QY9KAMHY6M"
    }
}
```

疑问：

network、wrapper分别是什么？如果 network 是网络地址的话，wrapper 又有什么用呢？从使用上看，两者都是合约地址。

```js
initContract() {
    this.erc20Contract = new this.rpc.eth.Contract(constants.ERC20)
    this.networkAddress = BLOCKCHAIN_INFO.network
    this.wrapperAddress = BLOCKCHAIN_INFO.wrapper
    this.networkContract = new this.rpc.eth.Contract(constants.KYBER_NETWORK, this.networkAddress)
    this.wrapperContract = new this.rpc.eth.Contract(constants.KYBER_WRAPPER, this.wrapperAddress)
}
```

### lang 目录下主要是所支持的各个语言包（.json 文件）

默认是英语。

抛出了：

`module.exports = { supportLanguage, defaultLanguage, loadAll, defaultAndActive, otherLang }`

语言包的格式如下：

```json
{
    "pack": "cn",
    "pack_icon": "cn.svg",
    "pack_label": "中文",
    "pack_active": true,
    "layout": {
        "info": "信息",
        "terms_of_service": "服务条款",
        "privacy_policies": "隐私政策"
    },

    "transaction_list": {
        "transaction_history": "最近交易"
    },

    "address": {
        "address": "地址",
        "import_address": "导入地址",
        "my_balance": "余额",
        "total": "估值",
        "hide_zero_balance": "隐藏小额资产"
    },
    "transaction": {
        "exchange": "交易",
        "exchange_from": "从",
        "exchange_to": "到",

        "transfer": "转移",
        "transfer_to_address": "转移到地址",
        "amount": "数量",
        "select_token": "选择代币",

        "advanced": "高级选项",
        "transaction_fee": "交易费",

        "address_balance": "地址余额",
        "balance": "余额",
        "password_needed_exchange": "每笔交易都需要密码",

        "password_needed_transfer": "每笔转移都需要密码",
        "next": "下一个",
        "exit": "退出",
        "back": "主页",
        "new_tx": "新的转移",
        "new_ex": "新的交易",
        "done": "完成!",
        "failed": "失败!",
        "broadcasted": "交易上链完成!",
        "broadcasting": "交易上链中!",
        "success_ex_msg": "成功地将 ${source} 交易为 ${dest} 了",
        "success_tx_msg": "成功地将 ${token} 转移至 ${address}",
        "copy_tx": "拷贝交易哈希",
        "analyze_error": "失败原因",
        "copied": "拷贝成功",
        "analyze": "显示原因",

        "broadcast": "交易上链",
        "transaction": "交易",
        "broadcasted_title": "将您的交易广播至区块链",
        "close_browser_or_make_new_exchange":
            "您现在可以关闭浏览器窗口或进行另一币交易",
        "close_browser_or_make_new_transfer":
            "您现在可以关闭浏览器窗口或进行另一币转移",
        "broadcasting_blockchain": "您的交易正在被上链至区块链",
        "cound_not_broadcast": "无法将您的交易上链至区块链",
        "current_address_balance": "当前地址余额",
        "transaction_error": "交易错误",
        "waiting_transaction": "您的交易正在等待被挖掘",

        "about_to_exchange": "您将开始交易",
        "about_to_transfer": "您将开始转移",
        "processing": "处理中",
        "gas_limit": "燃料限额",
        "gas_price": "燃料价格",
        "for": "换至",
        "to": "至",
        "best_rate": "最小价格",
        "token_amount": "代币／数量",

        "transfer_tooltip": "转移以太或代币至其它地址",
        "transaction_gasprice_50":
            "更高的燃料价格，更快的交易速度。最高燃料价格：50 Gwei",
        "transaction_gasprice": "更高的燃料价格，更快的交易速度",
        "best_rate_tooltip": "市场波动时，更低的价格可以带来更好的成功率",
        "terms_and_conditions":
            "<span>条款和 <br  class='show-for-small-only'>条件</span>",

        "error_tx_log": "空的日志",
        "error_tx_contract": "警告！合约执行过程中发生了错误",
        "no_pedding_tx": "没有待处理的交易",
        "rate_info":
            "价格也许会在结算过程中发生变化。<br> 您可以点击\"高级选项\"来显示您的最低价格。"
    },

    "modal": {
        "enter_password": "输入密码",
        "confirm": "确认",
        "import": "导入",
        "enter_password_placeholder": "输入钱包密码进行确认",
        "select_hd_path": "选择硬盘派生路径",
        "select_trezor_address": "选择TREZOR地址",
        "select_ledger_address": "选择LEDGER地址",
        "select_address": "选择您想要使用的地址",
        "previous_addresses": "以前的地址",
        "more_addresses": "更多地址",
        "custom_path": "您的自定义路径",
        "view_on_etherscan": "在Etherscan上查看",
        "press_confirm_if_really_want": "请按确认以继续",
        "waiting_for_confirmation": "正在等待您钱包的确认信息",
        "confirm_exchange_title": "交易确认",
        "confirm_transfer_title": "转移确认",

        "select_your_language": "选择你的语言",
        "select_source_token": "选择原始代币",
        "select_dest_token": "选择终点代币",
        "select_trasfer_from_token": "选择 \"TRANSFER FROM\" 代币",

        "approve_exchange":
            "您需要获取Kyber钱包的许可才能在当前地址与<strong>${ token }</strong>交互",
        "eth_token_exchange": "ETH代币交易",
        "approve": "批准"
    },

    "error": {
        "select_same_token": "无法和同种代币进行交易",
        "select_token_token": "这个代币交易对目前还不支持",
        "source_amount_too_high": "原始数量过高",
        "source_amount_too_high_cap":
            "原始数量超过了你的额度。你的额度是${ cap }ETH",
        "source_amount_too_small": "原始数量过低",
        "source_amount_rate_error": "当前无法交易",
        "source_amount_too_high_for_reserve":
            "原始数量过高 （交易对目前还不支持）",
        "source_amount_is_not_number": "原始数量不是一个数字",

        "dest_address": "这不是一个地址",
        "amount_transfer_too_hign": "数量过高",
        "amount_must_be_number": "数量必须是一个数字",

        "error_occurred": "发生错误",
        "cannot_connect_metamask": "无法获取Metamask账户",
        "cannot_connect_trezor": "无法连接至Trezor",
        "cannot_connect_ledger": "无法连接至Ledger",
        "invalid_private_key": "无效的密钥",
        "no_balance": "您的地址上没有我们支持的代币。请导入其它的地址。",
        "clear_data_timeout":
            "由于您的会话超时，我们清除了您的数据 ${time} 分钟",
        "minutes": " 分钟",
        "time_out": "超时",
        "network_error": "目前无法连接到区块链。请稍后再尝试。",
        "term_error": "您必须先同意服务条款！",

        "path_not_support_by_trezor": "Trezor不支持这个路径",
        "check_right_application_selected": "检查是否选择了正确的应用",
        "network_not_match":
            "Metamask需要连接到${expectedName}网络，而您现在连接的是${currentName}",
        "network_not_match_unknow": "Metamask需要连接到${expectedName}",
        "not_supported": "不支持",
        "metamask_not_install":
            "无法连接至metamask。请确认您已经安装了metamask。",

        "gas_price_not_number": "燃料价格不是数字",
        "rate_not_number": "交易价格不是数字",
        "gas_price_limit": "燃料价格必须小于 ${maxGas} Gwei",
        "passphrase_error": "秘钥派生失败",
        "gas_price_exceeded_limit": "燃料价格超过了最高限制。t",
        "issue_token_ether":
            "交易失败，由于发送eth的同时还试图用该eth与其它代币交易。",
        "issue_allowance": "交易失败，由于许可数量低于srcAmount",
        "issue_balance": "交易失败，由于代币余额低于scrAmount",
        "issue_ether_amount": "交易失败，由于用户没有发送准确的eth数量",
        "issue_user_cap": "交易失败，由于原始数量超过了用户限额。",
        "min_rate_too_high": "你设置的最交易低价格太高了！"
    },

    "import": {
        "from_metamask": "连接至<br>Metatmask",
        "from_keystore": "选择或拖动<br />您的密钥库",
        "from_trezor": "从<br />Trezor导入",
        "from_ledger": "从<br />Ledger导入",
        "from_private_key": "请输入您的<br />密钥",
        "from_private_key_input_title": "请输入您的密钥",
        "from_private_key_input_title_placehoder": "请输入您的密钥"
    },

    "info": {
        "title": "Kyber测试网络",
        "version": "版本",
        "chain": "链",
        "node_endpoint": "节点端",
        "reserve_address": "储蓄库合约地址",
        "network_address": "网络合约地址",
        "kyber_homepage": "Kyber主页",
        "get_free_kovan": "获取免费的",
        "warning":
            "请不要发送以太或代币到以上的任何地址.<br></br>他们都是测试网络的地址！",
        "here": "这里"
    },

    "footer": {
        "info": "信息",
        "language": "语音"
    },

    "history": {
        "second_ago": "秒之前",
        "minutes_ago": "分钟之前",
        "hours_ago": "小时之前",
        "days_ago": "天之前",
        "months_ago": "月之前",
        "years_ago": "年之前",
        "date": "日期",
        "rate": "汇率",
        "description": "描述",
        "amount": "数量"
    },

    "terms": {
        "title": "Kyber钱包 - 使用条款",
        "content":
            "Kyber测试网络钱包提供了一个让大家能够实验和了解我们的交易和支付的服务平台。 目前的版本可能不安全。 使用它可能会导致资金损失，并可能危及用户的隐私。 用户对使用Kyber测试网络钱包的任何结果承担全部责任。",
        "use_testnet": "请务必使用测试网络的钱包！！！",
        "use_real": "请千万不要使用真实的以太坊账户！！！",
        "accept": "Accept"
    },

    "landing_page": {
        "title": "以太坊代币的去中心化交易",
        "trustless": "无需信赖",
        "instant": "迅速",
        "liquid": "流动性",
        "compatible": "兼容",
        "get_started": "开始"
    },

    "product_feedback": "产品反馈",
    "help": "帮助"
}
```

### server 目录，主要功能是本机后台接口服务

这个目录有一个 eth 目录，这个目录主要是用来与以太坊进行连接和交互用的。

这里面，baseProvider、httpProvider、wsProvider三个文件是用来封装出两个provider组件，一个是http服务的，一个是ws服务的。而baseProvider则是二者的共同基础，提供了一个BaseEthereumProvider类，类中提供了如下一些方法：

initContract方法 将三个合约对象、两个合约地址挂载到this上；

version方法 返回当前所用的web3.js的版本；

getLatestBlockFromEtherScan、getLatestBlockFromNode getLatestBlockFromEtherScan先从某个服务端API中去拿最新区块的区块number序号（估计是考虑缓存的关系，但是为什么要缓存呢，是什么原因导致不够快需要缓存？），拿不到的情况下再调用getLatestBlockFromNode去以太坊节点上拿。返回的是个数字。

疑问：

getRate、getAllRate、getAllRatesFromEtherscan、getAllRatesFromBlockchain、getAllRateFromNode、getAllRateUSD、getRateUSD、getLogExchange、getLogExchangeFromNode

等方法，暂时没弄清楚其细节。具体是在什么地方用到的还不是很清楚？

这些接口没有的话也是可以的，直接用testnet上的就好了，或者直接由 mock 数据的平台进行数据 mock。咨询过相关开发人员，说其实这些node.js开发的这些本地接口是废弃掉了，因为不稳定，所以改成了go的接口，不过不开源。

执行`npm run server`实际执行的是 server 目录下的 server_http.js 文件（package.json 中有配置）。

```js
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
```

上述代码用于允许任何域名跨域访问。cors 是一个可以进行各种参数配置，解决跨域问题的模块。

https://www.npmjs.com/package/cors

在该目录下保存着一个日志文件，error.log。采用了 simple-node-logger 模块来打日志。https://www.npmjs.com/package/simple-node-logger

在 server_http.js 中，通过 sqlitePersist.js 中创建的 SqlitePersist 类提供的方法先是初始化了各个表，然后提供了一系列接口服务，/getRate、/getHistory、/getHistoryTwoColumn、/getHistoryOneColumn、/countHistory、/getLatestBlock、/getRateUSD、/getLanguagePack 等接口服务。这些接口服务都是放在https://cache.kyber.network/下的。是因为web3.js无法实现这些功能呢，还是为了速度更快？

这些接口背后都是在 sqlitePersist.js 中创建的 SqlitePersist 类通过直接操作 sqlite 数据库而实现的。接口的返回的数据格式如下：

/getRate

```json
[
    {
        "id": 1,
        "source": "ETH",
        "dest": "ETH",
        "rate": "0",
        "minRate": "0",
        "expBlock": "0",
        "balance": "0"
    },
    {
        "id": 2,
        "source": "ETH",
        "dest": "ETH",
        "rate": "0",
        "minRate": "0",
        "expBlock": "0",
        "balance": "0"
    }
]
```

/getUSD 各种代币兑美元的价格

```json
[
    {
        "symbol": "ETH",
        "price_usd": "1076.22"
    },
    {
        "symbol": "KNC",
        "price_usd": "3.98993"
    },
    {
        "symbol": "OMG",
        "price_usd": "17.4549"
    },
    {
        "symbol": "DGD",
        "price_usd": "189.409"
    },
    {
        "symbol": "CVC",
        "price_usd": "0.751849"
    },
    {
        "symbol": "FUN",
        "price_usd": "0.110938"
    },
    {
        "symbol": "MCO",
        "price_usd": "13.2256"
    },
    {
        "symbol": "GNT",
        "price_usd": "0.63423"
    },
    {
        "symbol": "ADX",
        "price_usd": "2.0149"
    },
    {
        "symbol": "PAY",
        "price_usd": "2.50536"
    },
    {
        "symbol": "BAT",
        "price_usd": "0.563943"
    },
    {
        "symbol": "EOS",
        "price_usd": "14.6735"
    },
    {
        "symbol": "LINK",
        "price_usd": "0.94457"
    }
]
```

/getHistoryTwoColumn

```json
{
    "eth": [
        {
            "id": 1035,
            "actualDestAmount": "72435007953030924402",
            "actualSrcAmount": "1000000000000000000",
            "dest": "0x7d7fd73fede850a0d3f044af79ba83490830ae4b",
            "source": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": null,
            "blockNumber": 2501159,
            "txHash":
                "0x01ca789571c4bb6746a72cf0167093277f2e800af06b5d77ea5e41d5c1d9a2b3",
            "timestamp": 1516606600,
            "status": "mined"
        },
        {
            "id": 1034,
            "actualDestAmount": "122174031265158964378",
            "actualSrcAmount": "2000000000000000000",
            "dest": "0x98541419c0f9873acf6bf449cb7246f9df600d2c",
            "source": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            "sender": null,
            "blockNumber": 2501146,
            "txHash":
                "0x91987292f81b1ea8870b6d0445eaa033c8ba81ea4097f24faca08f25668a4b53",
            "timestamp": 1516606435,
            "status": "mined"
        }
    ]
}
```

/getLatestBlock
2501287

/countHistory
1036

/getLanguagePack
目前未实现，大概本来是考虑用来进行语言包方面处理的


### 解读baseProvider，其中封装了很多的基础操作方法

#### 获取 gasPrice

```js
getGasPrice() {
    return new Promise((resolve, reject) => {
      this.rpc.eth.getGasPrice()
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
}
```

#### 判断是否连接上节点

因为 web3.js 好像没有提供直接的 API，所以需要自行处理。我们可以通过获取最近一个块，看能不能获取到来实现节点连接成功与否的判断。

```js
isConnectNode() {
    return new Promise((resolve, reject) => {
      this.rpc.eth.getBlock("latest", false).then((block) => {
        if (block != null) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch((errr) => {
        resolve(false)
      })
    })
}
```

#### 获取ETH的余额

```js
getBalance(address) {
    return new Promise((resolve, reject) => {
      this.rpc.eth.getBalance(address)
        .then((balance) => {
          if (balance != null) {
            resolve(balance)
          }
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
}
```

#### 获取所有代币的余额

这里针对ETH和其它代币需要分别进行处理。

获取ETH的余额上面实现了；

而获取其它代币的余额是需要调用erc20Contract的balanceOf方法来处理的：

先是通过`var data = instance.methods.balanceOf(ownerAddr).encodeABI()`获得消息调用所需的数据。

然后通过web3.eth.call方法执行消息调用，`web3.eth.call`执行的消息调用只会在节点的VM中直接执行，但不会被挖到区块链上去。

`web3.eth.call`的用法如下：

```
web3.eth.call({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);
```

最后通过`web3.eth.abi.decodeParameter(type, hexString);`将ABI编码参数解码成其JavaScript对象，从而从中拿到我们需要的值。

解码 ABI encoded parameters的使用方法如下：

```
web3.eth.abi.decodeParameters(typesArray, hexString);
```

```
web3.eth.abi.decodeParameters(['string', 'uint256'], '0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000ea000000000000000000000000000000000000000000000000000000000000000848656c6c6f212521000000000000000000000000000000000000000000000000');
> Result { '0': 'Hello!%!', '1': '234' }
```

这种调用智能合约拿数据、通过`web3.eth.call`进行消息调用，通过三步走的方法非常常用。

```
getAllBalancesToken(address, tokens) {
    var promises = Object.keys(tokens).map(index => {
      var token = tokens[index]
      if (token.symbol === 'ETH') {
        return new Promise((resolve, reject) => {
          this.getBalance(address).then(result => {
            resolve({
              symbol: 'ETH',
              balance: result
            })
          }).catch(err => {
            reject(new Error("Cannot get balance of ETH"))
          })
        })

      } else {
        return new Promise((resolve, reject) => {
          this.getTokenBalance(token.address, address).then(result => {
            resolve({
              symbol: token.symbol,
              balance: result
            })
          }).catch(err => {
            reject(new Error("Cannot get balance of " + token.symbol))
          })
        })
      }
    })
    return Promise.all(promises)
}

getTokenBalance(address, ownerAddr, blockno) {
    var instance = this.erc20Contract
    instance.options.address = address

    var data = instance.methods.balanceOf(ownerAddr).encodeABI()

    return new Promise((resolve, reject) => {
      this.rpc.eth.call({
        to: address,
        data: data
      }, blockno ? blockno : this.rpc.eth.defaultBlock)
        .then(result => {
          var balance = this.rpc.eth.abi.decodeParameters(['uint256'], result)
          resolve(balance[0])
        }).catch((err) => {
          // console.log(err)
          reject(err)
        })
	})
}
```

#### 获取最近一个区块的区块序号

```js
function getLatestBlockFromNode(){
    new Promise(resolve, reject){
        web3.eth.getBlock("latest", false)
        .then(result => {
            resolve(result.number)
        })
        .catch(err => {
            reject(err)
        })
    }
}
```

### 更多对于智能合约的操控

#### 创建智能合约对象

`new web3.eth.Contract(jsonInterface[, address][, options])`

第一个参数是智能合约中的abi对象，第二个参数是地址（可选，也可以后续通过.options.address指定），第三个参数，可选项，是携带的一些options参数

```
new web3.eth.Contract(constants.KYBER_NETWORK, this.networkAddress)
```

#### 调用“常量”方法并在EVM中执行其智能合约方法（这不会发送交易，这种方式也不能改变智能合约状态。）

`myContract.methods.myMethod([param1[, param2[, ...]]]).call(options[, callback])`

```
getRate(source, dest, quantity) {
    return new Promise((resolve, rejected) => {
      this.networkContract.methods.getExpectedRate(source, dest, quantity).call().then((result) => {
        if (result != null) {
          resolve(result)
        }
      }).catch(e =>{
        rejected(e)
      })
    })
}
```

这个就调用了KYBER_NETWORK的getExpectedRate方法，传入了三个参数source, dest, quantity，这三个参数正好是KYBER_NETWORK的智能合约ABI对象数组中name: "getExpectedRate"所对应的inputs(如下)：

```js
{
    constant: true,
    inputs: [
        { name: "source", type: "address" },
        { name: "dest", type: "address" },
        { name: "srcQuantity", type: "uint256" }
    ],
    name: "getExpectedRate",
    outputs: [
        { name: "expectedPrice", type: "uint256" },
        { name: "slippagePrice", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
}
```

#### 怎么获得合约的某方法的编码过的ABI字节码，可以用在发送交易, 调用方法, 或作为参数传给另一个智能合约方法

`myContract.methods.myMethod([param1[, param2[, ...]]]).encodeABI()`

```js
var dataAbi = this.wrapperContract.methods.getExpectedRates(this.networkAddress, sources, dests, quantity).encodeABI()
var options = {
    host: serverPoint,
    path: `/api?module=proxy&action=eth_call&to=${this.wrapperAddress}&data=${dataAbi}&tag=latest&apikey=${api}`
}
```

### 对于新版kyber wallet交易流程的剖析

点击的时候会触发this.processTx。

```js
processTx = (password) => {
    try {
      if (this.props.account.type !== "keystore") {
        password = ''
      }
      const params = this.formParams()
      // sending by wei
      var account = this.props.account
      var ethereum = this.props.ethereum
      var formId = "transfer"
      var data = this.recap()
      this.props.dispatch(transferActions.processTransfer(formId, ethereum, account.address,
        params.token, params.amount,
        params.destAddress, params.nonce, params.gas,
        params.gasPrice, account.keystring, account.type, password, account, data, this.props.keyService, params.balanceData)
      )
    } catch (e) {
      console.log(e)
      	this.props.dispatch(transferActions.throwPassphraseError(this.props.translate("error.passphrase_error")))
    }
}
```

actions/transferActions.js中：

```js
export function processTransfer(formId, ethereum, address,
  token, amount,
  destAddress, nonce, gas,
  gasPrice, keystring, type, password, account, data, keyService, balanceData) {
  return {
    type: "TRANSFER.PROCESS_TRANSFER",
    payload: {
      formId, ethereum, address,
      token, amount,
      destAddress, nonce, gas,
      gasPrice, keystring, type, password, account, data, keyService, balanceData
    }
  }
}
```

sagas/transferActions.js中：

```js
export function* watchTransfer() {
  yield takeEvery("TRANSFER.TX_BROADCAST_PENDING", broadCastTx)
  yield takeEvery("TRANSFER.PROCESS_TRANSFER", processTransfer)
}
```

```js
export function* processTransfer(action) {
  const { formId, ethereum, address,
    token, amount,
    destAddress, nonce, gas,
    gasPrice, keystring, type, password, account, data, keyService, balanceData } = action.payload
  var callService = token == constants.ETHER_ADDRESS ? "sendEtherFromAccount" : "sendTokenFromAccount"
  switch (type) {
    case "keystore":
      yield call(transferKeystore, action, callService)
      break
    case "privateKey":
    case "trezor":
    case "ledger":
      yield call(transferColdWallet, action, callService)
      break
    case "metamask":
      yield call(transferMetamask, action, callService)
      break
  }
}
```

```js
function* transferKeystore(action, callService) {
  const { formId, ethereum, address,
    token, amount,
    destAddress, nonce, gas,
    gasPrice, keystring, type, password, account, data, keyService, balanceData } = action.payload
  try {
    var rawTx = yield call(keyService.callSignTransaction, callService, formId, ethereum, address,
      token, amount,
      destAddress, nonce, gas,
      gasPrice, keystring, type, password)
  } catch (e) {
    yield put(actions.throwPassphraseError(e.message))
    return
  }
  try {
    yield put(actions.prePareBroadcast(balanceData))
    const hash = yield call(ethereum.call("sendRawTransaction"), rawTx, ethereum)
    yield call(runAfterBroadcastTx, ethereum, rawTx, hash, account, data)
  } catch (e) {
    yield call(doTransactionFail, ethereum, account, e.message)
  }
}
```

services/keys/keystore.js中：
```js
import * as keyService from "./baseKey"
import EthereumTx from "ethereumjs-tx"
import { unlock } from "../../utils/keys"

export default class KeyStore {
  callSignTransaction = (funcName, ...args) =>{
    const { txParams, keystring, password } = keyService[funcName](...args)
    const tx = this.sealTx(txParams, keystring, password)
    return new Promise((resolve) => {
      resolve(tx)
    })
  }

  sealTx = (txParams, keystring, password) => {
    const tx = new EthereumTx(txParams)
    const privKey = unlock(keystring, password, true)
    tx.sign(privKey)
    return tx
  }
}
```

services/keys/baseKey.js中：

```js
//发送以太币
export const sendEtherFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password) => {

  const txParams = {
    from:account,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: destAddress,
    value: sourceAmount,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: BLOCKCHAIN_INFO.networkId
  }

  return { txParams, keystring, password }
}

//发送其他代币
export const sendTokenFromAccount = (
  id, ethereum, account, sourceToken, sourceAmount,
  destAddress, nonce, gas, gasPrice, keystring, accountType,
  password) => {

  var txData = ethereum.call("sendTokenData")(
    sourceToken, sourceAmount, destAddress)
  const txParams = {
    from:account,
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: sourceToken,
    value: '0x0', //这个地方是不是错误的？
    data: txData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: BLOCKCHAIN_INFO.networkId
  }
  return { txParams, keystring, password }
}
```

sendEtherFromAccount发送以太币：

直接从将传入的参数进行了组装后返回，返回的是`{ txParams, keystring, password }`的形式

sendTokenFromAccount发送其他太币：
调用的是

```
var txData = ethereum.call("sendTokenData")(
    sourceToken, sourceAmount, destAddress)
```

方法来获得txData。

然后同样也是组成了{ txParams, keystring, password }进行返回。不同的是，txParams中所包含的字段数量是不一样的。

ethereum: 是一个EthereumService类的实例。

EthereumService类提供了一个call方法：

```js
call(fn) {
    return this.currentProvider[fn].bind(this.currentProvider)
}
```

执行的是this.currentProvider上的方法，并且指定执行时this为this.currentProvider。

this.currentProvider是HttpEthereumProvider类 或者 WebsocketEthereumProvider类的实例，而HttpEthereumProvider类 或者 WebsocketEthereumProvider类都扩展自BaseEthereumProvider类，所以call方法最后应该可以访问 BaseEthereumProvider类 以及 HttpEthereumProvider类 或者 WebsocketEthereumProvider类中的方法。

sendTokenData就是BaseEthereumProvider类中的方法。

```js
sendTokenData(sourceToken, sourceAmount, destAddress) {
    var tokenContract = this.erc20Contract
    tokenContract.options.address = sourceToken
    return tokenContract.methods.transfer(destAddress, sourceAmount).encodeABI()
}
```

调用的实际上是以发送者的地址为地址的ERC20合约实例的`.transfer(destAddress, sourceAmount).encodeABI()`方法，传入参数是发往的地址和数量。

其中， `this.erc20Contract = new this.rpc.eth.Contract(constants.ERC20)`

```js
import * as ethUtil from 'ethereumjs-util'
import scrypt from 'scryptsy'
import crypto from 'crypto'

function decipherBuffer(decipher, data) {
  return Buffer.concat([decipher.update(data), decipher.final()])
}

export function unlock(input, password, nonStrict) {
    var json = (typeof input === 'object') ? input : JSON.parse(nonStrict ? input.toLowerCase() : input)
    if (json.version !== 3) {
        throw new Error('Not a V3 wallet')
    }
    var derivedKey
    var kdfparams
    if (json.crypto.kdf === 'scrypt') {
        kdfparams = json.crypto.kdfparams
        derivedKey = scrypt(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen) 
    } else if (json.crypto.kdf === 'pbkdf2') {
        kdfparams = json.crypto.kdfparams
        if (kdfparams.prf !== 'hmac-sha256') {
            throw new Error('Unsupported parameters to PBKDF2')
        }
        derivedKey = crypto.pbkdf2Sync(new Buffer(password), new Buffer(kdfparams.salt, 'hex'), kdfparams.c, kdfparams.dklen, 'sha256')
    } else {
        throw new Error('Unsupported key derivation scheme')
    }
    var ciphertext = new Buffer(json.crypto.ciphertext, 'hex') //密文
    var mac = ethUtil.sha3(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
    if (mac.toString('hex') !== json.crypto.mac) {
        throw new Error('Key derivation failed - possibly wrong password')
    }
    var decipher = crypto.createDecipheriv(json.crypto.cipher, derivedKey.slice(0, 16), new Buffer(json.crypto.cipherparams.iv, 'hex')) //译文
    var seed = decipherBuffer(decipher, ciphertext, 'hex')
    while (seed.length < 32) {
        var nullBuff = new Buffer([0x00]);
        seed = Buffer.concat([nullBuff, seed]);
    }
    return seed
}
```

unlock函数在拿到导入的钱包数据后，解析成json对象，根据这个对象的.crypto.kdf字段来决定使用哪种密钥派生函数，

若是scryptsy，拿到json对象中的信息传入scryptsy(一个Scrypt密钥派生函数的JS实现库, https://www.npmjs.com/package/scryptsy)

`scrypt（key，salt，n，r，p，keyLenBytes，[progressCallback]）`

key：key。无论是Buffer或string。

salt：盐。无论是Buffer或string。

n：迭代次数。number（整数）

r：记忆因子。number（整数）

p：并行化因子。number（整数）

keyLenBytes：要返回的字节数。number（整数）

progressCallback：调用每个1000操作的回调。{current, total, percent}作为第一个参数传入progressCallback()。
退货Buffer。

若是pbkdf2，拿到json对象中的信息传入crypto(node.js自带模块）的pbkdf2Sync方法，也是得到priveKey。

得到这些priveKey后，再配合ethereumjs-util库进行一系列处理，最终得到seed。

## 五、fetch的使用

### 使用 fetch 调用接口

fetch 是 JavaScript 的内置 API，可以直接使用，但记得要经过 `babel` 的转换。

```js
getLatestBlock() {
    return new Promise((resolve, rejected) => {
      fetch(BLOCKCHAIN_INFO.history_endpoint + '/getLatestBlock', {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        return response.json()
      }).then((data) => {
        if (data && typeof data == 'number' && data > 0) {
          resolve(data)
        } else {
          throw ('cannot get lastest block from server')
        }
      })
        .catch((err) => {
          this.rpc.eth.getBlock("latest", false).then((block) => {
            if (block != null) {
              resolve(block.number)
            }
          })
        })
    })
}
```

线上好像是从`api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${apikey}`来获取,
比如 apikey = D8YAEQ3V4THAPDA9YSB1YGA1QY9KAMHY6M。

即从http://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=D8YAEQ3V4THAPDA9YSB1YGA1QY9KAMHY6M来获取。

返回的结果如下：

```json
{ 
    "jsonrpc": "2.0", 
    "id": 83, 
    "result": "0x4b9e30" 
}
```

### 封装一个更通用的 fetch:

```js
const defaultHeaders = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
}

export function fetchRequest(url, params, headers=defaultHeaders, method) {
    return new Promise((resolve, reject) => {
        let obj = {};

        if(method === 'POST'){
            obj.body = params;
        } else {
            if(params != null) {
                let paramsArr = [];

                Object.keys(params).map((item) => {
                    paramsArr.push(`${item}=${params[item]}`)
                })

                if(url.indexOf('?') > -1){
                    url += '&'
                } else {
                    url += '?'
                }

                url += ${paramsArr.join('&')}
            }
        }
        obj.method = method;
        obj.headers = headers;

        fetch(url, obj)
        .then(response => {
            return response.json()
        })
        .then(data => {
            resolve(data)
        })
        .catch(err => {
            reject(err)
        });
    });
}

export function get(url, params, headers=defaultHeaders){
    fetchRequest(url, params, headers, 'Get');
}

export function post(url, data, headers=defaultHeaders){
    fetchRequest(url, data, headers, 'Post');
}
```

## 六、国际化

react-localize-redux

https://ryandrewjohnson.github.io/react-localize-redux/getting-started/

## 七、truffle的使用和智能合约的简单操作

### 使用truffle之前的注意点

`truffle init`之后自带的打包流程比较简陋，需要自己集成webpack。比较可行的方法第一种是找一个集成了truffle和webpack的模版来改。

第二种是直接truffle init之后，把原有的webpack打包的项目拷贝整合进来，修改一些配置。借助"truffle-solidity-loader": "0.0.8"进行整合。完全抛弃truffle那些命令，而使用webpack命令。

提供了合约抽象接口，可以直接通过`var meta = MetaCoin.deployed();`拿到合约对象后，在Javascript中直接操作对应的合约函数。原理是使用了基于web3.js封装的Ether Pudding工具包。简化开发流程。

但是，**目前truffle（包括truffle-contract也是）只支持到web3.js的0.2x版本，与web3.js 1.0-beta并不兼容。**

所以，最终发现truffle在使用web3.js 1.0-beta版的时候核心功能完全不可用。

### 初始化一个truffle项目

npm i -g truffle

mkdir trufflewallet
cd trufflewallet

truffle init

目录结构简单说明如下：

contract/ - Truffle默认的合约文件存放地址。
migrations/ - 存放发布脚本文件
test/ - 用来测试应用和合约的测试文件
truffle.js - Truffle的配置文件

切记不要删除./contract/Migrations.sol合约，它是Truffle用来帮助部署的。

新建一个src文件夹：

src - 你的应用文件运行的默认目录。这里面包括推荐的javascript文件和css样式文件目录，但你可以完全决定如何使用这些目录。


### truffle的网络与测试

- Mainnet-以太坊主网，通常是所有客户端的默认网络。

- Ropsten（https://github.com/ethereum/ropsten） - 以太坊使用工作量证明的主测试网络。这个网络，因为低的计算量，容易遭到DDOS攻击，分片，或者其它问题。垃圾邮件攻击后被暂时放弃，最近才恢复使用。

```
geth --testnet removedb
geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303"
```

- ganache

```
npm install -g ganache-cli
```

待研究：

https://github.com/trufflesuite/ganache-cli/

注：ganache-cli就是原来的testrpc，现在改名成了这个。


### truffle中关于合约的操作

- 引入合约依赖：

`import "./AnotherContract.sol";`

此外也支持其它的引入方式：

http://solidity.readthedocs.io/en/latest/layout-of-source-files.html#importing-other-source-files

- 部署合约：

当你部署一个智能合约，你实际进行的操作是向地址0x0发送了一个交易，使用当前合约内容作为参数。

ETHPM是一个去中心化的智能合约包管理资源库。使用ETHPM，你可以关联或连接到某个著名的合约或库，减少代码重复，尽可能理想的为未来的开发提供好的基础。

这里的这个规范(https://github.com/ethereum/EIPs/issues/190)，详细的说明了相关的信息以及背景。Truffle和Embark均可与之集成，并创造一个愉快的开发体验。（待研究）

- 创建一个简单的智能合约

```js
pragma solidity ^0.4.0;

contract Greeter {
    address creater;
    string greeting;

    function Greeter(string _greeting) public {
        creater = msg.sender;
        greeting = _greeting;
    }

    function greet() public constant returns (string) {
        return greeting;
    }

    function setGreeting(string _newGreeting) public {
        greeting = _newGreeting;
    }

    function kill() public {
        if (msg.sender == creater) {
            selfdestruct(creater); // kills this contract and sends remaining funds back to creator
        }
    }
}
```

- 在线编写和试验合约的IDE: Remix

可以把上述合约放上去编译和运行一下，然后在create输入框中输入"abc"来创建一个合约实例感受一下，注意abc必须带有双引号，否则会报错。

https://ethereum.github.io/browser-solidity/

```bash
truffle migrate
truffle migrate --reset #重置
```

拿上面这个合约在truffle中compile一下。

在migrations目录下新建一个文件：

2_deploy_contract.js

```js
var Greeter = artifacts.require('./Greeter.sol');

module.exports = function(deployer, network){
    deployer.deploy(Greeter, 'abc')
}
```

然后执行

```bash
truffle develop
migrate
```
这会部署到`truffle develop`启动的默认网络上：http://127.0.0.1:9545

或者我们可以部署到指定的网络上，按如下步骤操作：

（1）先安装和运行（ganache-cli）：

```
npm i -g ganache-cli
ganache-cli 
```
这样会在本机启动http://localhost:8545服务。

（2）在truffle.js中配置网络

```js
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!

    networks: {
        live: {
            network_id: 1 // Ethereum public network
            // optional config values
            // host // 默认是localhost
            // port // 默认是8545
            // gas // Gas limit used for deploys. Default is 4712388.
            // gasPrice // Gas price used for deploys. Default is 100000000000 (100 Shannon).
            // from //  From address used during migrations. 如果没有指定，默认是你的以太坊客户端第一个可用帐户。
            // provider: Default web3 provider using host and port options: new Web3.providers.HttpProvider("http://<host>:<port>")
        },
        // morden: {
        //     network_id: 2, // Official Ethereum test network
        //     host: "178.25.19.88", // Random IP for example purposes (do not use)
        //     port: 80
        // },
        staging: {
            network_id: 1337 // custom private network
            // use default rpc settings
        },
        dev: {
            host: "localhost",
            port: "8545",
            network_id: "default",
            gas: 4712388
        }
    }
};
```

(3)执行下列命令来指定部署到哪个网络：

```bash
truffle migrate --network dev
```

这里--network dev所指定的就是上面truffle.js中配置的dev网络。

然后，你可以通过如下命令进入truffle控制台。

```bash
truffle console --network dev
```

不管是`truffle develop`还是`truffle console --network dev`的方式，只是指定的部署网络不同，但功能上还是一致的。
现在，在truffle控制台里面都能够使用web3.js的功能了。

比如：

```bash
web3.eth.accounts   #输出所有帐号
```

除此以外，还有很多其它功能。

```
version     # Truffle v4.0.6 (core: 4.0.6)  Solidity v0.4.19 (solc-js)
networks    # 查看有哪些network可用
test        # 执行测试
```

### 集成进webpack

```
npm i truffle-solidity-loader -D
```

并在webpack的config文件中添加如下关于loader的配置：

```js
{
    test: /\.sol$/,
    loader: require.resolve('truffle-solidity-loader')
},
```

在`resolve.alias`中添加：

`contracts: path.resolve('contracts')`

```js
import Greeter from 'contracts/Greeter.sol';
console.log(Greeter.deployed().setGreeting);
```

现在truffle-solidity-loader好像存在bug，会出现"ReferenceError: artifacts is not defined"的错误，暂时只能通过在migrations文件夹下的每个文件中，都把形如`var Migrations = artifacts.require("./Migrations.sol");`的代码给注释掉。

### 处理无法import src以外目录的异常

这个是因为create-react-app脚手架生成的项目通过ModuleScopePlugin做了限制所导致的，所以正确的做法是把这个插件从配置文件中移除掉。

参见：https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory


### 编译合约的时候报出异常： Truffle mingration: Error: authentication needed: password or unlock 的处理

用ganance-cli作为网络客户端的时候，似乎没有出现这个异常，但是，改成用geth之后，异常就出现了，估计原因应该是ganance-cli是默认解锁了账户的，而geth则没有。

在`geth console`中

`eth.accounts`

["0xedd76ffedac43ed63dceda537787b760bc1c00c1", "0x291b8b0d26dab0f1f4114f5d471c4c5ab2934fee"]

拿到第一个地址：

`personal.unlockAccount('0xedd76ffedac43ed63dceda537787b760bc1c00c1', '123456', 999)`

总结成一条命令就是：

```
personal.unlockAccount(eth.accounts[0], '123456', 99999)
```

部署合约的时候要开始挖矿才能部署成功。

```
miner.start()
```


## 八、生成器函数 和 redux-saga

生成器函数执行到yeild处的时候会暂停。

在生成器函数的函数名前需要加一个*号。

执行第一次`next()`的时候才会执行第一个yield；

执行第二次`next()`的时候会执行第二个yield；

以此类推。

`throw`用于从生成器中抛出异常。这让生成器完全停止执行，并在调用者中继续执行，正如通常情况下抛出异常一样。

```js
function* count(){
	yield 1;
	yield 2;
	yield 3;
}
let c = count().next();

c.next();  //{value: 1, done: false}
c.next();  //{value: 2, done: false}
c.next();  //{value: 3, done: false}
c.next();  //{value: undefined, done: true}
```

## 九、geth的启动

starthttp.sh

```bash
#!/bin/bash

geth=${GETH:-geth}

$geth  --datadir '/Users/dennis/gethinit/wallet' --rpc --rpcapi "db,eth,net,web3" --rpcaddr="localhost" --rpcport="8545" --rpccorsdomain "*" --nodiscover --dev console
```

## 十、基础知识

### 基本概念

- 智能合约

智能合约与平时的代码其实没有什么区别，只是运行于一个以太坊这样的分布式平台上而已。这个运行的平台，赋予了这些代码不可变，确定性，分布式和可自校验状态等特点。代码运行过程中状态的存储，是不可变的。每一个人，都可以开一个自己的节点，重放整个区块链，将会获得同样的结果（译者注：能控制所有节点都达到一致状态，就是所谓的共识）。

在以太坊中，每个合约都有一个唯一的地址来标识它自己（由创建者的哈希地址和曾经发送过的交易的数量推算出来）。客户端可以与这个地址进行交互，可以发送ether，调用函数，查询当前的状态等。

智能合约，本质上来说就是代码，以及代码运行后存储到区块链上的状态两个元素组成。比如，你用来收发ETH的钱包，本质上就是一个智能合约，只是外面套了一个界面。

概念非常强大，而我相信你已经看完了。而你在看相关的新闻，经常听到这个非常有潜力，经常听到资产/权利管理，分权自治组织（DAO），身份，社交网络等炫酷。但他本质就是这些。

- ABI

ABI是以太坊的一种合约间调用时的一个消息格式。类似Webservice里的SOAP协议一样；也就是定义操作函数签名，参数编码，返回结果编码等。

http://www.jianshu.com/p/3106aaab76af

### 基本数据结构

钱包帐号

```
{
    address
    ownerAddress
    name
    description
    balance
    tokens   //所支持的令牌合约
    createdTime
}
```

令牌合约

```
{
    name
    icon
    symbol   //令牌合约的代号
    address
    ownerAddress
    balance
}
```

交易

一笔交易的原始数据（签名前的交易数据）

```
const txParams = {
    nonce: nonce,
    gasPrice: gasPrice,
    gasLimit: gas,
    to: wallet.address,
    value: 0,
    data: txData,
    // EIP 155 chainId - mainnet: 1, ropsten: 3
    chainId: 42
}
```

通过签名的处理：

`sealTxByKeystore(txParams, keystring, password)`



```
{
    hash
    from
    gas
    gasPrice
    nonce   //该账户（地址）发出过的交易数量

    status  //success、failed、mined、pending
    type
    data    //data can be used to store wallet name
    address
    threw   //是否丢弃 true or false
    error
    errorInfo
}

hash: String - 32字节，交易的哈希值。
from: String - 20字节，交易发起者的地址。
gas: Number - 交易发起者提供的gas。.
gasPrice: BigNumber - 交易发起者配置的gas价格，单位是wei。
nonce: Number - 交易的发起者在之前进行过的交易数量。即该账户（地址）发出过的交易数量

blockHash: String - 32字节。交易所在区块的哈希值。当这个区块处于pending将会返回null。
blockNumber: Number - 交易所在区块的块号。当这个区块处于pending将会返回null。
transactionIndex: Number - 整数。交易在区块中的序号。当这个区块处于pending将会返回null。
to: String - 20字节，交易接收者的地址。当这个区块处于pending将会返回null。
value: BigNumber - 交易附带的货币量，单位为Wei。
input: String - 交易附带的数据。
```

`web3.eth.getBlock`获取到的区块的数据结构：

```
{
  "number": 3,
  "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
  "nonce": "0xfb6e1a62d119228b",
  "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
  "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
  "miner": "0x8888f1f195afa192cfee860698584c030f4c9db1",
  "difficulty": BigNumber,
  "totalDifficulty": BigNumber,
  "size": 616,
  "extraData": "0x",
  "gasLimit": 3141592,
  "gasUsed": 21662,
  "timestamp": 1429287689,
  "transactions": [
    "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
  ],
  "uncles": []
}
```

number - 区块号。当这个区块处于pending将会返回null。

hash - 字符串，区块的哈希串。当这个区块处于pending将会返回null。

parentHash - 字符串，32字节的父区块的哈希值。

nonce - 字符串，8字节。POW生成的哈希。当这个区块处于pending将会返回null。

sha3Uncles - 字符串，32字节。叔区块的哈希值。

叔区块（uncle block）：最长的链被认为是绝对的正确。如果一个块不是最长链的一部分，那么它被称为是“叔块”。一个叔块是一个块，它也是合法的，但是发现的稍晚，或者是网络传输稍慢，而没有能成为最长的链的一部分。

logsBloom - 字符串，区块日志的[布隆过滤器](https://zh.wikipedia.org/wiki/%E5%B8%83%E9%9A%86%E8%BF%87%E6%BB%A4%E5%99%A8)。当这个区块处于pending将会返回null。

transactionsRoot - 字符串，32字节，区块的交易前缀树的根。

stateRoot - 字符串，32字节。区块的最终状态前缀树的根。

miner - 字符串，20字节。这个区块获得奖励的矿工。

difficulty - BigNumber类型。当前块的难度，整数。

totalDifficulty - BigNumber类型。区块链到当前块的总难度，整数。

extraData - 字符串。当前块的extra data字段。

size - Number。当前这个块的字节大小。

gasLimit - Number，当前区块允许使用的最大gas。

gasUsed - 当前区块累计使用的总的gas。

timestamp - Number。区块打包时的unix时间戳。

transactions - 数组。交易对象。或者是32字节的交易哈希。

uncles - 数组。叔哈希的数组。


`web3.eth.getTransactionReceipt`获得交易收据的数据结构：

通过一个交易哈希，返回一个交易收据对象。

```
{
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": 0,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "contractAddress": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
  "cumulativeGasUsed": 314159,
  "gasUsed": 30234,
  "logs": [{
         // logs as returned by getFilterLogs, etc.
     }, ...]
}

blockHash: String - 32字节，这个交易所在区块的哈希。
blockNumber: Number - 交易所在区块的块号。
transactionHash: String - 32字节，交易的哈希值。
transactionIndex: Number - 交易在区块里面的序号，整数。
from: String - 20字节，交易发送者的地址。
to: String - 20字节，交易接收者的地址。如果是一个合约创建的交易，返回null。
cumulativeGasUsed: Number - 当前交易执行后累计花费的gas总值。
gasUsed: Number - 执行当前这个交易单独花费的gas。
contractAddress: String - 20字节，创建的合约地址。如果是一个合约创建交易，返回合约地址，其它情况返回null。
logs: Array - 这个交易产生的日志对象数组。
```

### web3.js

底层实现上，它通过RPC 调用与本地节点通信。web3.js可以与任何暴露了RPC接口的以太坊节点连接。web3中有eth对象 - web3.eth 具体来表示与以太坊区块链之间的交互。shh对象 - web3.shh表示Whisper协议的相关交互。

老版本的文档：

http://web3.tryblockchain.org/Web3.js-api-refrence.html#fn9

beta版的文档：

`web3.eth.contract(abiArray)` 创建一个合约对象，传入的参数是一个数组，里面包含了一到多个ABI对象。所谓ABI对象，就是描述合约的函数、事件的对象。

你可以或者使用一个在某个地址上已经存在的合约，或者使用编译后的字节码部署一个全新的的合约。

```
var MyContract = web3.eth.contract(abiArray);

// 使用某地址上已经存在的合约
var contractInstance = MyContract.at([address]);

// 创建一个合约对象
var contractInstance = MyContract.new([contructorParam1] [, contructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
```

`web3.eth.compile.solidity`编译Solidity合约：

一个在线跑solidity的工具：

https://ethereum.github.io/browser-solidity/#version=soljson-v0.4.19+commit.c4cbbb05.js

`web3.eth.compile.solidity(sourceString [, callback])`

编译Solidity源代码。

参数：

String - Solidity源代码。
Function -（可选）回调函数，用于支持异步的方式执行7。
返回值：

Object - 合约和编译信息。

示例：

```
var source = "" + 
    "contract test {\n" +
    "   function multiply(uint a) returns(uint d) {\n" +
    "       return a * 7;\n" +
    "   }\n" +
    "}\n";
var compiled = web3.eth.compile.solidity(source);
console.log(compiled); 
// {
  "test": {
    "code": "0x605280600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b60376004356041565b8060005260206000f35b6000600782029050604d565b91905056",
    "info": {
      "source": "contract test {\n\tfunction multiply(uint a) returns(uint d) {\n\t\treturn a * 7;\n\t}\n}\n",
      "language": "Solidity",
      "languageVersion": "0",
      "compilerVersion": "0.8.2",
      "abiDefinition": [
        {
          "constant": false,
          "inputs": [
            {
              "name": "a",
              "type": "uint256"
            }
          ],
          "name": "multiply",
          "outputs": [
            {
              "name": "d",
              "type": "uint256"
            }
          ],
          "type": "function"
        }
      ],
      "userDoc": {
        "methods": {}
      },
      "developerDoc": {
        "methods": {}
      }
    }
  }
}
```

一个简单的Solidity合约：

```
我们打算用来测试的合约如下：

pragma solidity ^0.4.0;

contract Calc{
  /*区块链存储*/
  uint count;

  /*执行会写入数据，所以需要`transaction`的方式执行。*/
  function add(uint a, uint b) returns(uint){
    count++;
    return a + b;
  }

  /*执行不会写入数据，所以允许`call`的方式执行。*/
  function getCount() constant returns (uint){
    return count;
  }
}
```

`add()`方法用来返回输入两个数据的和，并会对`add()`方法的调用次数进行计数。需要注意的是这个计数是存在区块链上的，对它的调用需要使用`transaction`。

`getCount()`返回`add()`函数的调用次数。由于这个函数不会修改区块链的任何状态，对它的调用使用`call`就可以了。

编译合约：

```
//编译合约
let source = "pragma solidity ^0.4.0;contract Calc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() returns (uint){    return count;  }}";

let calc = web3.eth.compile.solidity(source);
```

如果编译成功，结果如下：

```
{
    code: '0x606060405234610000575b607e806100176000396000f3606060405260e060020a6000350463771602f781146026578063a87d942c146048575b6000565b3460005760366004356024356064565b60408051918252519081900360200190f35b3460005760366077565b60408051918252519081900360200190f35b6000805460010190558181015b92915050565b6000545b9056', //这个code是合约编译后的二进制码
    info: {
        source: 'pragma solidity ^0.4.0;contract Calc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() returns (uint){    return count;  }}',
        language: 'Solidity',
        languageVersion: '0.4.6+commit.2dabbdf0.Emscripten.clang',
        compilerVersion: '0.4.6+commit.2dabbdf0.Emscripten.clang',
        abiDefinition: [
            [
                Object
            ],
            [
                Object
            ]
        ],
        userDoc: {
            methods: {
                
            }
        },
        developerDoc: {
            methods: {
                
            }
        }
    }
}
```

发布合约：

```
let myContractReturned = calcContract.new({
    data: deployCode,
    from: deployerAddr
}, function(err, myContract) {
    if (!err) {
        // 注意：这个回调会触发两次
        //一次是合约的交易哈希属性完成
        //另一次是在某个地址上完成部署

        // 通过判断是否有地址，来确认是第一次调用，还是第二次调用。
        if (!myContract.address) {
            console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值

            // 合约发布成功
        } else {

        }
});
```

部署过程中需要主要的是，new方法的回调会执行两次，第一次是合约的交易创建完成，第二次是在某个地址上完成部署。需要注意的是只有在部署完成后，才能进行方法该用，否则会报错TypeError: myContractReturned.add is not a function。

调用合约：

由于web3.js封装了合约调用的方法。我们可以使用可以使用web3.eth.contract的里的sendTransaction来修改区块链数据。在这里有个坑，有可能会出现Error: invalid address，原因是没有传from，交易发起者的地址。在使用web3.js的API都需留意，出现这种找不到地址的，都看看有没有传from字段吧。

```
//使用transaction方式调用，写入到区块链上
myContract.add.sendTransaction(1, 2,{
    from: deployerAddr
});
console.log("after contract deploy, call:" + myContract.getCount.call());
```

需要注意的是，如果要修改区块链上的数据，一定要使用sendTransaction，这会消耗gas。如果不修改区块链上的数据，使用call，这样不会消耗gas。

使用web3.js编译，发布，调用的完整源码

```
let Web3 = require('web3');
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//编译合约
let source = "pragma solidity ^0.4.0;contract Calc{  /*区块链存储*/  uint count;  /*执行会写入数据，所以需要`transaction`的方式执行。*/  function add(uint a, uint b) returns(uint){    count++;    return a + b;  }  /*执行不会写入数据，所以允许`call`的方式执行。*/  function getCount() constant returns (uint){    return count;  }}";
let calcCompiled = web3.eth.compile.solidity(source);

console.log(calcCompiled);
console.log("ABI definition:");
console.log(calcCompiled["info"]["abiDefinition"]);

//得到合约对象
let abiDefinition = calcCompiled["info"]["abiDefinition"];
let calcContract = web3.eth.contract(abiDefinition);

//2. 部署合约

//2.1 获取合约的代码，部署时传递的就是合约编译后的二进制码
let deployCode = calcCompiled["code"];

//2.2 部署者的地址，当前取默认账户的第一个地址。
let deployerAddr = web3.eth.accounts[0];

//2.3 异步方式，部署合约
let myContractReturned = calcContract.new({
    data: deployCode,
    from: deployerAddr
}, function(err, myContract) {
    if (!err) {
        // 注意：这个回调会触发两次
        //一次是合约的交易哈希属性完成
        //另一次是在某个地址上完成部署

        // 通过判断是否有地址，来确认是第一次调用，还是第二次调用。
        if (!myContract.address) {
            console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值

            // 合约发布成功后，才能调用后续的方法
        } else {
            console.log("contract deploy address: " + myContract.address) // 合约的部署地址

            //使用transaction方式调用，写入到区块链上
            myContract.add.sendTransaction(1, 2,{
                from: deployerAddr
            });

            console.log("after contract deploy, call:" + myContract.getCount.call());
        }

        // 函数返回对象`myContractReturned`和回调函数对象`myContract`是 "myContractReturned" === "myContract",
        // 所以最终`myContractReturned`这个对象里面的合约地址属性也会被设置。
        // `myContractReturned`一开始返回的结果是没有设置的。
    }
});

//注意，异步执行，此时还是没有地址的。
console.log("returned deployed didn't have address now: " + myContractReturned.address);

//使用非回调的方式来拿到返回的地址，但你需要等待一段时间，直到有地址，建议使用上面的回调方式。
/*
setTimeout(function(){
  console.log("returned deployed wait to have address: " + myContractReturned.address);
  console.log(myContractReturned.getCount.call());
}, 20000);
*/

//如果你在其它地方已经部署了合约，你可以使用at来拿到合约对象
//calcContract.at(["0x50023f33f3a58adc2469fc46e67966b01d9105c4"]);
```

一个很有帮助的博客：

http://me.tryblockchain.org/

http://www.8btc.com/smart-contract-dapp


### 开发Dapp的一些可选架构：

Meteor

https://github.com/ethereum/wiki/wiki/Dapp-using-Meteor

Truffle

https://github.com/trufflesuite/truffle

http://truffle.tryblockchain.org/

http://www.jianshu.com/u/b0b33da4c474


### 以太币的单位

Unit	Wei Value	Wei
wei	1	1 wei
Kwei (babbage)	1e3 wei	1,000
Mwei (lovelace)	1e6 wei	1,000,000
Gwei (shannon)	1e9 wei	1,000,000,000
microether (szabo)	1e12 wei	1,000,000,000,000
milliether (finney)	1e15 wei	1,000,000,000,000,000
ether	1e18 wei	1,000,000,000,000,000,000

### web3.js中的各种转换方法：

`web3.toDecimal`

十六进制字符串转为十进制数字

`web3.toDecimal(hexString)`

```
var number = web3.toDecimal('0x15');
console.log(number); // 21
```

`web3.fromDecimal`

十进制数字或者十进制字符串转为十六进制

```
var value = web3.fromDecimal('21');
console.log(value); // "0x15"
```

`web3.fromWei`



```
var value = web3.fromWei('21000000000000', 'ether');
console.log(value); //0.000021
```

`web3.toWei`

把以太坊单位(包含代币单位)转为 wei

```
var value = web3.toWei('1', 'ether');
console.log(value); // "1000000000000000000"
web3.toBigNumber(numberOrHexString)
```

把给定数字或十六进制字符串转为 BigNumber 类型的实例。

```
var value = web3.toBigNumber('200000000000000000000001');
console.log(value); // instanceOf BigNumber
console.log(value.toNumber()); // 2.0000000000000002e+23
console.log(value.toString(10)); // '200000000000000000000001'
```

关于 BigNumber 需要注意:

在使用BigNumber类型的时候，我们会发现，如果有20位以上的浮点值，仍会导致出错。所以，我们推荐尽量让帐户余额以wei为单位，仅仅在需要向用户展示时，才转换为其它单位。

```
var balance = new BigNumber('13124.234435346456466666457455567456');

balance.plus(21).toString(10); // toString(10) converts it to a number string, but can only show max 20 floating points 
// "13145.23443534645646666646" // you number would be cut after the 20 floating point
```

例子：

举个交易的例子

```
>eth.sendTransaction({from:eth.coinbase,to:"0x2bda4364bb076187f0ef0067a61ccb95d636e383",value:web3.toWei(1,"ether")})
转账的数量是1个 ether(以太币)
```

`web3.toWei(1,"ether")`把以太币转为 wei，再来通过获取以太坊账户的余额看看在区块链中这些代币数量的存储方式。

```
> web3.eth.getBalance(eth.coinbase)
267999999999999999999
> web3.fromWei(web3.eth.getBalance(eth.coinbase),"ether")
267.999999999999999999
```

可以看出，在交易过程中，无论交易的代币是什么，都需要把这些代币转为 wei 存储在以太坊区块链中。上面获取账户余额例子中，就是获取钱包中 coinbase 账户的余额，得到的结果单位是 wei ,我们通过 `fromWei` 把wei转为了ether(以太币)。

### ethereumjs-util

文档： https://github.com/ethereumjs/ethereumjs-util/blob/master/docs/index.md

`.sha3(data, bits)`

Creates SHA-3 hash of the input  

### 如何生成keystring

首先，调用了ethereumjs-wallet模块的generate方法，该方法中执行了ethereumjs-wallet模块的`new Wallet(crypto.randomBytes(32))`，返回的是这个new出来的Wallet对象，其中`crypto.randomBytes(32)`是生成32位伪随机数，即钱包的私钥。

钱包对象提供了一系列方法，参见ethereumjs-wallet模块文档：

https://github.com/ethereumjs/ethereumjs-wallet

然后，对返回的这个钱包对象调用了`newWallet.toV3(passphrase, {kdf: "pbkdf2", c: 10240})`，传入的第一个参数是用户输入的密码，第二个参数是中kdf属性是采用哪种加密算法，c是迭代次数。返回一个对象（Version 3 of the Ethereum wallet format），格式如下：

```
{
    version: 3,
    id: uuid.v4({ random: opts.uuid || crypto.randomBytes(16) }),
    address: this.getAddress().toString('hex'),
    crypto: {
      ciphertext: ciphertext.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex')
      },
      cipher: opts.cipher || 'aes-128-ctr',
      kdf: kdf,
      kdfparams: kdfparams,
      mac: mac.toString('hex')
    }
  }
}
```

最后，JSON.stringify一下该对象。

得到的结果样例如下：

```
{
    "version":3,
    "id":"9def8185-2fea-4af2-945a-641608eba616","address":"3c1ea6a6b8ac3f8ded298ead480ae219aae658cf",
    "crypto":{
        "ciphertext":"af76ece242eb1fad0fd68bfda5847920b66c7f989b0dcbc45bc984fa282280c2",
        "cipherparams":{
            "iv":"e9524f297425bc84fdd39010263e6ca4"
        },
        "cipher":"aes-128-ctr",
        "kdf":"pbkdf2",
        "kdfparams":{
            "dklen":32,"salt":"3192873765d02ad5a9f0e7f3e0d950a5227e5e439346888f861235795eeeb007",
            "c":10240,
            "prf":"hmac-sha256"
        },"mac":"3fd47d4224c5619a6a694692403ce56db9e5577a76fa6466e4f9f33c91ba6884"
    }
}
```

这就是keystore文件的内容。

### 下载keystore

见/src/containers/GlobalControl/CreateAccountModal.js

因为浏览器端是无权限写入文件的，所以采用点击一个按钮时，实际上是做了类似如下这样的操作：

```
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
```

参见：https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server

### 一些待解决的问题

1、基本的依赖有压缩后有1兆多，可见相关的依赖还是比较重的，在html5上应该会造成一定的性能问题

2、如何解决数据的大量加载？

### 创建钱包

npm i ethereumjs-wallet --save


### asyncComponent会在dispatch后导致组件unmount，从而组件重新初始化。setState看起来没有效果。

### 生成地址唯一头像

"ethereum-blockies": "git+https://github.com/MyEtherWallet/blockies.git"

### 使用mixins

mixins/index.js

```js
export const JumpToLogin = {
    componentWillMount(){
        if(!Object.keys(this.props.currentAccount).length){
            console.log(this.props.history);
            let history = this.props.history;
            history.replace(`/manage?redirectUrl=${encodeURIComponent(history.location.pathname)}`);
        }
    }
}
```

```
import * as mixins from '../../mixins';
```

在constructor中：

```
this.componentWillMount = mixins.JumpToLogin.componentWillMount.bind(this);
```

### 支持mock数据

在webpack的config文件中配置：

```
{
	test: /\.mock$/,
	use: [{
	  loader: 'file-loader',
	  query: {
	    name: path.join(path.join(paths.appSrc, '/mock'), '[name]_[hash:8].[ext]')
	  }
	}]
},
```

在src目录下新建mock文件夹，在其下新建:

getRateUSD.mock

```
[
    { "symbol": "ETH", "price_usd": "850.568" },
    { "symbol": "KNC", "price_usd": "1.92194" },
    { "symbol": "OMG", "price_usd": "16.3758" }
]
```

然后像下面这样使用：

```
_switchUrl(name){
    let url;
    if (isLocal) {
        url = require(`../mock/${name}.mock`);
    } else {
        url = `${env.history_endpoint}/${name}`;
    }
    console.log(url)
    return url;
}

let url = _switchUrl('getRateUSD');
```

### 在以太坊虚拟机上执行一个消息调用事务

web3.eth.call({
    to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
    data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
})
.then(console.log);

### 把一个ABI encoded parameter解成（decode）JavaScript type

消息调用事务执行之后，得到的是ABI encoded parameter，需要解成JavaScript type才方便使用。

web3.eth.abi.decodeParameter(type, hexString);

Decodes an ABI encoded parameter to its JavaScript type.

一个例子综合运用上面两个方法：

```
getAllRate(sources, dests, quantity) {
    var dataAbi = this.wrapperContract.methods.getExpectedRates(this.networkAddress, sources, dests, quantity).encodeABI()
    
    return new Promise((resolve, rejected) => {
      this.rpc.eth.call({
        to: this.wrapperAddress,
        data: dataAbi
      })
        .then((data) => {
          try {
            var dataMapped = this.rpc.eth.abi.decodeParameters([
              {
                type: 'uint256[]',
                name: 'expectedPrice'
              },
              {
                type: 'uint256[]',
                name: 'slippagePrice'
              }
            ], data)
            resolve(dataMapped)
          } catch (e) {
            console.log(e)
            resolve([])
          }
        })
        .catch((err) => {
          console.log("GET request error")
          resolve([])
        })
    })
}
```

### 添加一个功能通常需要修改几处地方

ethereum.js >>> types >>> actions >>> sagas >>> baseService.js >>> reducers

1、修改ethereum.js，添加新功能函数，并在fetchData函数，添加对新功能的调用

```
this.fetchRateData()
```

```
fetchRateData() {
    var state = store.getState()
    var ethereum = state.connection.ethereum
    store.dispatch(updateAllRate(ethereum, env.tokens))
}
```

2、修改types/index.js

增加对应的type

```
export const UPDATE_ALL_RATE_PENDING = 'UPDATE_ALL_RATE_PENDING'
export const UPDATE_ALL_RATE_FINISHED = 'UPDATE_ALL_RATE_FINISHED'
```

3、修改actions/account.js，添加对应的action，在ethereum.js中需要引入到其中的action updateAllRate

```
export function updateAllRate(ethereum, tokens) {
    return {
        type: types.UPDATE_ALL_RATE_PENDING,
        payload: { ethereum, tokens}
    }
}

export function updateAllRateFinished(rates) {
    return {
        type: types.UPDATE_ALL_RATE_FINISHED,
        payload: { rates }
    }
}
```

4、修改sagas/account.js

添加对action的监听

```
yield takeEvery(types.UPDATE_ALL_RATE_PENDING, updateAllRatePending);
```

引入actions/account.js中的updateAllRateFinished

添加监听到对应action的处理函数

```
export function* updateAllRatePending(action){
    const { ethereum, tokens } = action.payload
    try {
        const rates = yield call([ethereum, ethereum.call("getAllRatesFromServer")], tokens)
        console.log(rates)
        yield put(updateAllRateFinished(rates))
    }
    catch (err) {
        //get rate from blockchain
        try {
            const rates = yield call([ethereum, ethereum.call("getAllRatesFromBlockchain")], tokens)
            console.log(rates)
            yield put(updateAllRateFinished(rates))
        }
        catch (err) {
            console.log(err)
        }
    }
}
```

5、修改baseService.js，添加对应的功能函数

上面用到了baseService.js的getAllRatesFromServer和getAllRatesFromBlockchain，所以都需要添加。

```
    getAllRatesFromServer(tokens) {
        let _this = this;
        return new Promise((resolve, rejected) => {
            let url = _this._switchUrl('getRate')
            fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
            .then(function (response) {
                if (response.status == 404) {
                    rejected(new Error('404'))
                } else {
                    resolve(response.json())
                }
            })
            .catch((err) => {
                rejected(err)
            })
        })
    }

    getAllRatesFromBlockchain(tokensObj) {
        var arrayTokenAddress = Object.keys(tokensObj).map((tokenName) => {
          return tokensObj[tokenName].address
        });
    
        var arrayEthAddress = Array(arrayTokenAddress.length).fill(config.ETH.address)
    
        var arrayQty = Array(arrayTokenAddress.length * 2).fill("0x0") //数量（quantity），都是0
    
        return this.getAllRate(arrayTokenAddress.concat(arrayEthAddress), arrayEthAddress.concat(arrayTokenAddress), arrayQty)
        .then((result) => {
            debugger
          var returnData = []
          Object.keys(tokensObj).map((tokenSymbol, i) => {
            returnData.push({
              source: tokenSymbol,
              dest: "ETH",
              rate: result.expectedPrice[i],
              minRate: result.slippagePrice[i]
            })
    
            returnData.push({
              source: "ETH",
              dest: tokenSymbol,
              rate: result.expectedPrice[i + arrayTokenAddress.length],
              minRate: result.slippagePrice[i + arrayTokenAddress.length]
            })
          });
          console.log('getAllRatesFromBlockchain:', returnData)
          return returnData
        })
    }

    getAllRate(sources, dests, quantity) {
        var dataAbi = this.wrapperContract.methods.getExpectedRates(this.networkAddress, sources, dests, quantity).encodeABI()
    
        return new Promise((resolve, rejected) => {
          this.rpc.eth.call({
            to: this.wrapperAddress,
            data: dataAbi
          })
            .then((data) => {
              try {
                var dataMapped = this.rpc.eth.abi.decodeParameters([
                  {
                    type: 'uint256[]',
                    name: 'expectedPrice'
                  },
                  {
                    type: 'uint256[]',
                    name: 'slippagePrice'
                  }
                ], data)
                resolve(dataMapped)
              } catch (e) {
                console.log(e)
                resolve([])
              }
            })
            .catch((err) => {
              console.log("GET request error")
              resolve([])
            })
        })
    }
```

6、修改reducers/token.js

增加对应的处理

```
case types.UPDATE_ALL_RATE_FINISHED: {
    let tokens = { ...state.tokens }
    let { rates } = action.payload
    if (!rates){
      return state
    }
    //map token
    let mapToken = {}
    rates.map(rate => {
      if (rate.source !== "ETH") {
        if (!mapToken[rate.source]) {
          mapToken[rate.source] = {}
        }
        mapToken[rate.source].rate = rate.rate
        mapToken[rate.source].minRate = rate.minRate
      } else {
        if (!mapToken[rate.dest]) {
          mapToken[rate.dest] = {}
        }
        mapToken[rate.dest].rateEth = rate.rate
        mapToken[rate.dest].minRateEth = rate.minRate
      }
    })
  
    //push data
    let newTokens = {}
    Object.keys(tokens).map(key => {
      var token = tokens[key]
      if (mapToken[key] && mapToken[key].rate) {
        token.rate = mapToken[key].rate
        token.minRate = mapToken[key].minRate
      }
      if (mapToken[key] && mapToken[key].rateEth) {
        token.rateEth = mapToken[key].rateEth
        token.minRateEth = mapToken[key].minRateEth
      }
      newTokens[key] = token
    })

    console.log('UPDATE_ALL_RATE_FINISHED:', Object.assign({}, state, { tokens: newTokens }))
  
    return Object.assign({}, state, { tokens: newTokens })
}
```

每次修改的文件不同，但大概可以按照这个套路来进行，不容易乱。

### render内部不能使用setState

遇到过一个错误

``` 
<div className="account-item__tokens">{this._getTokens()}</div>
```

然后我在
`this._getTokens`中使用了`setState`，导致了报错：

> index.js:2178 Warning: Cannot update during an existing state transition (such as within `render` or another component's constructor). Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern, but can be moved to `componentWillMount`.

同时在该页面中的另一个组件的render方法中又有：

```
this.jump();
```

```
jump = (history) => {
    let redirectUrl = getQueryObj().redirectUrl;

    if(Object.keys(this.props.currentAccount).length && redirectUrl){
        redirectUrl = decodeURIComponent(redirectUrl)
        this.props.history.replace(redirectUrl)
    }
}
```

这也会导致这个问题


所以，两处代码均会导致这个问题，导致了问题排查的困难。

### 无状态组件

react中的无状态组件可复用性更强，而且可以在props变化的情况下自动更新该无状态组件内部根据props计算而得到的内容，并反应在。

### 不同加密算法的效率差别非常大

newAddress.toV3(passphrase, { kdf: 'pbkdf2', c: 10240 })
// newAddress.toV3(passphrase, { kdf: 'scrypt', n:262144, p:1, r:8 }) //经过试验，采用kdf: 'scrypt' 创建帐号和修改帐号的时间明显要更长，可能跟这两个算法的效率有关

经过试验，从效率上来说，pbkdf2要快很多。

下面是用两种不同的算法生成的keystore：

```
{
	"version":3,
	"id":"693f9de4-428a-406b-98e5-e8680302532c",
	"address":"3ae0ed61a67273c36abc038bd92c7a44b888940d",
	"crypto":{
		"ciphertext":"c5255a689442609e4a11c5addbb75f90d93a3778d3bba9872df348f33c089e68",
		"cipherparams":{
			"iv":"6eaa020dd8d5ef9c192fad0cf730b3ef"
		},
		"cipher":"aes-128-ctr",
		"kdf":"pbkdf2",
		"kdfparams":{
			"dklen":32,
			"salt":"92eab185957c7ac0ebf75075d598dcd41b8abd045ef25d754d83e27ffb4501ca",
			"c":10240,
			"prf":"hmac-sha256"
		},
			"mac":"cd0b47874f0dd6a26def7f612cbfc0d00a79244db8148d4ac13afcec221a54cd"
		}
}



{
	"version":3
	"id":"cf537c70-a31c-460a-8f37-7b9d920049f6",
	"address":"291b8b0d26dab0f1f4114f5d471c4c5ab2934fee",
	"crypto":{
		"ciphertext":"93d2d94aad1780f0f351389170a8b699ab6e8591ca40ec758b0a0ef051a6983a",
		"cipherparams":{
			"iv":"c164e1079be284f30f61522252186087"
		},
		"cipher":"aes-128-ctr",
		"kdf":"scrypt",
		"kdfparams":{
			"dklen":32,
			"n":262144,
			"p":1,
			"r":8,
			"salt":"08c06400fd86c0c0cd41c9ede8e9c4a6ee37d10d00a6f1a120d142756af30237"
		},
		"mac":"f1e6ed07f79e8f8b379e2119492605b46f17ddf92c03996dda65173f2588ca59"
	},
}
```

### 查看一笔成功的交易

在ropsten网络下，比如，如果交易地址是：

0x8cf6959e16fc6bc95a88131a28bd2a3f76daae793f77ae72c0c899a6b66baa95

则交易详情的查看地址为：

https://ropsten.etherscan.io/tx/0x8cf6959e16fc6bc95a88131a28bd2a3f76daae793f77ae72c0c899a6b66baa95


### 需要测试助记词中有单词重复的情况（备份助记词时这里容易出错）

一个助记词例子：

until ship mom method funny traffic fee select oyster bring indoor bring



