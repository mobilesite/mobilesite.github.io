## 如何理解 Facebook 的 flux 应用架构？

**Flux的核心就是一个简单的约定：视图层组件不允许直接修改应用状态。应用的状态必须独立出来放到 store 里面统一管理，通过侦听 action 来执行具体的状态操作。

所谓的单向数据流，就是当用户进行操作的时候，会从组件发出一个 action，这个 action 流到 store 里面，触发 store 对状态进行改动，然后 store 又触发组件基于新的状态重新渲染。

action——》store——》state

这样做的好处：

1. 视图组件变得很薄，只包含了渲染逻辑和触发 action 这两个职责，即所谓 "dumb components"。

2. 要理解一个 store 可能发生的状态变化，只需要看它所注册的 actions 回调就可以。

3. 任何状态的变化都必须通过 action 触发，而 action 又必须通过 dispatcher 走，所以整个应用的每一次状态变化都会从同一个地方流过。其实 Flux 和传统 MVC 最不一样的就在这里了。React 在宣传的时候一直强调的一点就是 “理解你的应用的状态变化是很困难的 (managing state changing over time is hard)”，Flux 的意义就在于强制让所有的状态变化都必须留下一笔记录，这样就可以利用这个来做各种 debug 工具、历史回滚等等。

市面上各种各样的 Flux 实现那么多，归根结底是因为 1. Flux 这个概念本来就定义松散，具体怎么实现大家各有各的看法；2. 官方实现又臭又长，不好用。

最后，Flux 并不一定要配套 React，其思想在传统的 MV* 体系中也完全可以应用。


## 如何通俗易懂的理解 Redux？

redux的github: [https://github.com/reactjs/redux](https://github.com/reactjs/redux)

redux是管理State的一个东东，所有State都需要经过redux来操作。

redux中有三个基本概念，Action，Reducer，Store。

小马发现家具的摆放不合理 ---> 画出规划图纸 ---> 小明给李雷和韩梅梅分配任务 ---> 李雷和韩梅梅动手搬家具 ---> 家具布局改变

接下来看看Redux/React与这个故事的联系：
view(React) = 家具的摆放在视觉的效果上
action = 小明分配任务(谁应该干什么)
reducer = 具体任务都干些什么(把电视搬到沙发正对面然后靠墙的地方)
store(state) = 每个家具在空间内的坐标(如：电视的位置是x:10, y: 400)

所以这个过程应该是这样的：

**view 
---> action(是个对象或者返回对象的函数——实际上结果还是一个对象，有type属性指示要干嘛，有其它属性携带操作中用到的数据) 
---> reducer（是个函数，参数为action和state，作用就是根据action中的type和数据对state进行处理，返回处理后的state。真正开发项目的时候State会涉及很多功能，在一个Reducer处理所有逻辑会非常混乱，所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分State数据。然后在由一个主rootReducers来专门管理这些小Reducer。） 
---> store(store的创建：createStore方法，有两个参数，Reducer 和 initialState。一个应用只能有一个store。store提供 getState() 方法获取 state；提供 dispatch(action) 方法更新 state；通过 subscribe(listener) 注册监听器，监听store中的数据发生变化时进行怎样的回调；replaceReducer(reducer)：替换 store 当前用来处理 state 的 reducer。
常用的是dispatch，这是修改State的唯一途径) 
---> view**

**如果放入一个web app中，用户与view的交互会产生action，这些action会触发reducer因而改变state，然后state的改变又造成了view的变化。**

```
// 首先定义一个改变数据的函数，成为reducer
function count (state, action) {
    var defaultState = {
        year: 2015,
      };
    state = state || defaultState;
    switch (action.type) {
        case 'add':
            return {
                year: state.year + 1
            };
        case 'sub':
            return {
                year: state.year - 1
            }
        default :
            return state;
    }
}

// store的创建
var createStore = require('redux').createStore;
var store = createStore(count);//其中count就是前面定义的action

// 定义store里面的数据发生改变时，触发的回调函数
store.subscribe(function () {
	console.log('the year is: ', store.getState().year);
});

// action: 触发state改变的唯一方法(按照redux的设计思路)
var action1 = { type: 'add' };
var action2 = { type: 'add' };
var action3 = { type: 'sub' };

// 改变store里面的方法
store.dispatch(action1); // 'the year is: 2016
store.dispatch(action2); // 'the year is: 2017
store.dispatch(action3); // 'the year is: 2016

```

Action 有两个作用。Action就像leader，告诉我们应该做哪些事，并且给我们提供‘资源（就是上面说的数据）’，真正干活的是苦逼的Reducer。

用Action来分辨具体的执行动作。比如是create 还是delete？或者是update？
操作数据首先得有数据。比如添加数据得有数据，删除数据得有ID。action就是存这些数据的地方。

一个应用只有一个Store。Store提供了一些方法。让我们很方便的操作数据。我们不用关心Reducer和Action是怎么关联在一起的，Store已经帮我们做了这些事

Store 有以下职责：

维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器。

## 详细介绍Action、Reducer、Store

这部分主要讲解redux如何在项目中使用。

### Action

Action 是一个普通对象。

redux约定 Action 内使用一个字符串类型的 type 字段来表示将要执行的动作。

  {
    type: 'ADD_ITEM'
  }
除了 type 之外，Action可以存放一些其他的想要操作的数据。例如：

  {
    type: 'ADD_ITEM',
    text: '我是Berwin'
  }
上面例子表示

我要创建一条数据
创建的数据为大概是这样的
  {
    text: '我是Berwin'
  }

但在实际应用中，我们需要一个函数来为我们创建Action。这个函数叫做actionCreator。它看起来是这样的：
```
function addItem(text) {
  return {
    type: types.ADD_ITEM,
    text
  }
}
```

### Reducer很简单，但有三点需要注意

**不要修改 state。
在 default 情况下返回旧的 state。遇到未知的 action 时，一定要返回旧的 state。如果在default或没有传入旧State的情况下不返回旧的State或initialState。。。那么当前的State会被重置为undefined！！
如果没有旧的State，就返回一个initialState，这很重要！！！**

这是一部分核心源码：

// currentState 是当前的State，currentReducer 是当前的Reducer
currentState = currentReducer(currentState, action);

在使用combineReducers方法时，它也会检测你的函数写的是否标准。如果不标准，那么会抛出一个大大的错误！！

#### combineReducers

**真正开发项目的时候State会涉及很多功能，在一个Reducer处理所有逻辑会非常混乱，所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分State数据。然后在由一个主rootReducers来专门管理这些小Reducer。**

Redux提供了一个方法 combineReducers 专门来管理这些小Reducer。

它看起来是下面这样：

```
/**
 * 这是一个子Reducer
 *
 * @param State
 * @param Action
 *
 * @return new State
 */
let list = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [createItem(action.text), ...state]

    default:
      return state
  }
}

// 这是一个简单版的子Reducer，它什么都没有做。
let category = (state = {}, action) => state;

/**
 * 这是一个主Reducer
 *
 * @param State
 * @param Action
 *
 * @return new State
 */
let rootReducers = combineReducers({list, category});

```
**combineReducers 生成了一个类似于Reducer的函数。为什么是类似于，因为它不是真正的Reducer，它只是一个调用Reducer的函数，只不过它接收的参数与真正的Reducer一模一样~**

这是一部分核心源码：

function combineReducers(reducers) {

  // 过滤reducers，把非function类型的过滤掉~
  var finalReducers = pick(reducers, (val) => typeof val === 'function');

  // 一开始我一直以为这个没啥用，后来我发现，这个函数太重要了。它在一开始，就已经把你的State改变了。变成了，Reducer的key 和 Reducer返回的initState组合。
  var defaultState = mapValues(finalReducers, () => undefined);

  return function combination(state = defaultState, action) {
    // finalReducers 是 reducers
    var finalState = mapValues(finalReducers, (reducer, key) => {

      // state[key] 是当前Reducer所对应的State，可以理解为当前的State
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);

      return nextStateForKey;      
    });

    // finalState 是 Reducer的key和stat的组合。。
  }
}
从上面的源码可以看出，combineReducers 生成一个类似于Reducer的函数combination。

当使用combination的时候，combination会把所有子Reducer都执行一遍，子Reducer通过action.type 匹配操作，因为是执行所有子Reducer，所以如果两个子Reducer匹配的action.type是一样的，那么都会成功匹配。

### Store

上面已经介绍什么是Store，以及它是干什么的，这里我就讲讲如何创建Store，以及如何使用Store的方法。

创建Store非常简单。createStore 有两个参数，Reducer 和 initialState。

```
let store = createStore(rootReducers, initialState);
```

store有四个方法。

getState： 获取应用当前State。
subscribe：添加一个变化监听器。
dispatch：分发 action。修改State。
replaceReducer：替换 store 当前用来处理 state 的 reducer。
常用的是dispatch，这是修改State的唯一途径，使用起来也非常简单，他看起来是这样的~

```
/**
 * 创建Action
 *
 * @param 添加的数据
 *
 * @return {Object} Action
 */
function addItem(text) {
  return {
    type: types.ADD_ITEM,
    text
  }
}


// 新增数据
store.dispatch(addItem('Read the docs'));
```

真正开发项目的时候State会涉及很多功能，在一个Reducer处理所有逻辑会非常混乱，所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分State数据。然后在由一个主rootReducers来专门管理这些小Reducer。




## Redux 与 react-redux

Redux本身和React并没有之间的关联，它是一个通用Javscript App模块，用做App State的管理。

要在React的项目中使用Redux，比较好的方式是借助react-redux这个库来做连接，这里的意思是，并不是没有react-redux，这两个库就不弄一起用了，而是说react-redux提供了一些封装，一种更科学的代码组织方式，让我们更舒服地在React的代码中使用Redux。

react-redux提供两个关键模块：Provider和connect。

### Provider这个模块是作为整个App的容器，在你原有的App 

Container的基础上再包上一层，它的工作很简单，就是接受Redux的store作为props，并将其声明为context的属性之一，子组件可以在声明了contextTypes之后可以方便的通过this.context.store访问到store。不过我们的组件通常不需要这么做，将store放在context里，是为了给下面的connect用的。

这个是Provider的使用示例：

// config app root
const history = createHistory()
const root = (
  <Provider store={store} key="provider">
    <Router history={history} routes={routes} />
  </Provider>
)

// render
ReactDOM.render(
  root,
  document.getElementById('rootWrap')
)

### connect

这个模块是算是真正意义上连接了Redux和React，正好它的名字也叫connect。

先考虑Redux是怎么运作的：首先store中维护了一个state，我们dispatch(分发)一个action，接下来reducer根据这个action更新state。

映射到我们的React应用中，store中维护的state就是我们的app state，一个React组件作为View层，做两件事：render和响应用户操作。于是connect就是将store中的必要数据作为props传递给React组件来render，并包装action creator用于在响应用户操作时dispatch一个action。

好了，详细看看connect这个模块做了什么。先从它的使用来说，它的API如下：

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])


connect 会把State和dispatch转换成props传递给子组件。它看起来是下面这样的：
```
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
```
**connect会让我们传递一些参数：mapStateToProps(就是一个把state映射成props的函数)，mapDispatchToProps（一个函数把dispatch映射到props的函数），mergeProps（可不填）和React组件。**

之后这个方法会进行一系列的黑魔法，把state，dispatch转换成props传到React组件上，返回给我们使用。

#### mapStateToProps：

mapStateToProps 是一个普通的函数。

当它被connect调用的时候会为它传递一个参数State。

mapStateToProps需要负责的事情就是 返回需要传递给子组件的State，返回需要传递给子组件的State，返回需要传递给子组件的State，（重要的事情说三遍。。。。）然后connect会拿到返回的数据写入到react组件中，然后组件中就可以通过props读取数据啦~~~~

它看起来是这样的：

function mapStateToProps(state) {
  return { list: state.list }
}
因为state是全局State，里面包含整个项目的所有State，但是我不需要拿到所有State，我只拿到我需要的那部分State即可，所以需要返回 state.list 传递给组件

#### mapDispatchToProps：

与mapStateToProps很像，mapDispatchToProps也是一个普通的函数。

当它被connect调用的时候会为它传递一个参数dispatch。

mapDispatchToProps负责返回一个 dispatchProps

dispatchProps 是actionCreator的key和dispatch(action)的组合。

dispatchProps 看起来长这样：
```
{
  addItem: (text) => dispatch(action)
}
```
connect 收到这样的数据后，会把它放到React组件上。然后子组件就可以通过props拿到addItem并且使用啦。
```
this.props.addItem('Hello World~');
```
如果觉得复杂，不好理解，，那我用大白话描述一下

就是通过mapDispatchToProps这个方法，把actionCreator变成方法赋值到props，每当调用这个方法，就会更新State。。。。额，，这么说应该好理解了。。

bindActionCreators：

但如果我有很多个Action，总不能手动一个一个加。Redux提供了一个方法叫 bindActionCreators。

bindActionCreators 的作用就是将 Actions 和 dispatch 组合起来生成 mapDispatchToProps 需要生成的内容。

它看起来像这样：
```
let actions = {
  addItem: (text) => {
    type: types.ADD_ITEM,
    text
  }
}

bindActionCreators(actions, dispatch); // @return {addItem: (text) => dispatch({ type: types.ADD_ITEM, text })}
```
这是一部分核心源码：

```
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}
```
```
// mapValues： map第一个参数的每一项，返回对象，key是key，value是第二个参数返回的数据

/*
 * mapValues： map第一个参数的每一项，返回对象，key是key，value是第二个参数返回的数据
 * 
 * @param actionCreators
 * @param dispatch
 *
 * @return {actionKey: (...args) => dispatch(actionCreator(...args))}
 */
export default function bindActionCreators(actionCreators, dispatch) {
  return mapValues(actionCreators, actionCreator =>
    bindActionCreator(actionCreator, dispatch)
  );
}
```
可以看到，bindActionCreators 执行这个方法之后，它把 actionCreators 的每一项的 key 不变，value 变成 dispatch(actionCreator(...args)) 这玩意，这表示， actionCreator 已经变成了一个可执行的方法，执行这个方法，就会执行 dispatch 更新数据。








## 属性类型校验：React.PropTypes

随着应用的增长，确保你的组件正确使用是有必要的。React允许我们指定propTypes。React.PropTypes声明了一系列的校验确保我们接收的数据是合法的。如果不合法的数据出现在属性当中，控制台会打印警告信息。





