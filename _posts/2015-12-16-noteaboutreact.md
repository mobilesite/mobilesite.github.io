---
layout:     post
title:      "React.js学习笔记"
subtitle:   ""
date:       2016-05-05 23:18:02
author:     "Paian"
header-img: ""
catalog: true
tags:
    - React.js
---

## React.js学习笔记

JSX = JavaScript Syntax(语法) Extension 用它来书写会让代码更加直观

class属性不能直接写class，而要写成className。因为class是JavaScript保留字。

### react组件的生命周期

Mounted——React Component被render解析，生成对应的DOM节点，并被插入DOM浏览器的DOM结构的一个过程；
Update——一个Mounted的React Component被重新render的过程；
Unmounted——一个Mounted的React Component对应的DOM节点被从DOM结构中移除的过程；

Mounting:
getDefaultProps()——》getInitialState()——》componentWillMount——》render——》componentDidMount

Updating:
setProps——》componentWillReceiveProps——》setState——》shouldComponentUpdate——(if true)——》componentWillUpdate——》render——》componentDidUpdate

Unmounting:
componenWillUnmount

```
var Hello = React.createClass({
    getInitialState: function(){
        alert('init');
        return {
            opacity: 1.0,
            fontSize: '12px'
        };
    },
    render: function(){
        return <div>Hello {this.props.name}</div>
    },
    componentWillMount：function(){
        alert('will');
    },
    componentDidMount: function(){
        alert('did');

        var self = this;
        window.setTimeout(function(){
            _self.setState({
                opacity: 0.5,
                fontSize: '44px'
            })
        },1000);
    }
});
React.render(<Hello name="world"/>,document.getElementById('container'));
```

### 组件嵌套

组件嵌套的本质是父组件与子组件的通信关系。

一种方式是：父组件可以通过属性（props）向子组件传递内容；

另一种方式为：父组件中定义事件处理函数，然后在子组件中将事件绑定为父组件中定义的事件处理函数，这样的话，当子组件中的相应事件触发时，调用的是父组件中定义的事件函数进行处理，这叫委托。

组件嵌套的优缺点：

优点：

逻辑清晰——父子关系和人类社会的父子关系对应，易于理解；

代码模块化——每个模块对应一个功能，不同的模块可以同步开发；

封装细节——开发者只需要关注组件的功能，不用关心组件的实现细节。

缺点：

编写难度高——父子关系的具体实现需要经过深思熟虑，冒然编写将导致关系混乱、代码难以维护；

无法掌握所有细节——使用者只知道组件用法，不知道实现细节，遇到问题难以修复。

例子：典型父子关系的实现

### Mixin的编写和使用

#### Mixin的含义

Mixin的本质是一组被抽离出来的公共方法。

Mixin的目的是横向抽离出组件的相似代码。

相似概念：面向切面编程、插件

例子：
```
var SetIntervalMixin = {
    componentWillMount: function(){
        this.intervals = [];
    },
    setInterval: function(){
        this.intervals.push(setInterval.apply(null,arguments));
    },
    componentWillUnmount:function(){
        this.intervals.map(clearInterval);
    }
};

var TickTock = React.createClass({
    mixins:[SetIntervalMixin],
    getInitialState:function({
        return {seconds:0};
    }),
}).

```

#### Mixin的优点和缺点

优点：

代码复用——抽离出通用代码，减少开发成本，提高开发效率；

即插即用——可以直接使用许多现有的Mixin来编写自己的组件；

适应性强——改动一次代码，影响多个组件。

缺点：

编写难度高——Mixin可能被用在各种环境中，兼容多种环境就需要更多的逻辑和代码，通用的代价是提高复杂度；

降低代码可读性——组件的优势在于将逻辑和界面直接结合在一起，Mixin本质上会分散逻辑，理解起来难度更大。