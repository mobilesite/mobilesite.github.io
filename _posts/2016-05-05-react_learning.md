---
layout:     post
title:      "React.js学习笔记"
subtitle:   ""
date:       2016-3-05 23:18:02
author:     "Paian"
catalog: true
tags:
    - React.js
---

## React.js学习笔记

JSX = JavaScript Syntax(语法) Extension 用它来书写会让代码更加直观

class属性不能直接写class，而要写成className。因为class是JavaScript保留字。

调试工具React devtools: [https://github.com/facebook/react-devtools/releases](https://github.com/facebook/react-devtools/releases)

# 第一章 React概述

## 1.1 什么是React

### 1.1.1

## 1.2 编写第一个React程序

### 1.2.1

## 1.3 React开发环境搭建

### 1.3.1


# 第二章 JSX语法及特点介绍

## 2.1 什么是JSX

### 2.1.1

## 2.2 如何使用JSX

### 2.2.1

## 2.3 非DOM属性介绍

### 2.3.1

## 2.4 JSX解释器架构介绍

### 2.4.1


# 第三章 组件生命周期详解

## 3.1 什么是生命周期

### 3.1.1

## 3.2 初始化阶段介绍

### 3.2.1

## 3.3 运行中阶段介绍

### 3.3.1

## 3.4 销毁阶段介绍

### 3.4.1


# 第四章 属性和状态详解

## 4.1 属性的含义和用法

### 4.1.1

## 4.2 状态的含义和用法

### 4.2.1

## 4.3 属性和状态对比

### 4.3.1


# 第五章 React中事件的用法

## 5.1 事件处理函数的使用

### 5.1.1

## 5.2 事件对象介绍

### 5.2.1

## 5.3 事件和状态关联

### 5.3.1


# 第六章 组件的协同使用

## 6.1 组件协同使用介绍

### 6.1.1

## 6.2 组件嵌套

### 6.2.1 什么是组件嵌套

组件嵌套的本质是父组件与子组件的通信关系。

一方面父组件可以通过属性（props）向子组件传递；

另一方面，父组件中可以定义事件处理函数，然后在子组件中将事件绑定为父组件中定义的事件处理函数，这样的话，当子组件中的相应事件触发时，调用的是父组件中的定义的事件函数进行处理，这叫做委托。

### 6.2.2 组件嵌套的优缺点

组件嵌套的优缺点：

优点：

逻辑清晰——父子关系和人类社会的父子关系对应，易于理解

代码模块化——每个模块对应一个功能，不同的模块可以同步开发

封装细节——开发者只需要关注组件的功能，不用关心组件的实现细节

缺点：

编写难度高——父子关系的具体实现需要经过深思熟虑，贸然编写将导致关系混乱、代码难以维护

无法掌握所有细节——使用者只知道组件用法，不知道实现细节，遇到问题难以修复

例子：典型父子关系的实现

	<script type="text/jsx">
	    var GenderSelect = React.createClass({
	        render:function(){
	            return <select onChange={this.props.handleSelect}>
	            <option value="0">男</option>
	            <option value="1">女</option>
	            </select>
	        }
	    })

	    var SignUpForm = React.createClass({
	        getInitialState: function(){
	            return {
	                name:'',
	                password:'',
	                gender:''
	            }
	        },
	        handleChange:function(name,event){
	            var newState = {};
	            newState[name] = event.target.value;
	            this.setState(newState);
	        },
	        handleSelect:function(event){
	            this.setState({gender:event.target.value})
	        },
	        render:function(){
	            console.log(this.state);
	            return <form>
	            <input type="text" placeholder="请输入用户名" onChange={this.handleChange.bind(this,'name')}/>
	            <input type="password" placeholder="请输入密码" onChange={this.handleChange.bind(this,'password')}/>
	            <GenderSelect handleSelect={this.handleSelect}></GenderSelect>
	            </form>
	        }
	    })

	    React.render(<SignUpForm></SignUpForm>,document.body);
	</script>

## 6.3 Mixin的编写和使用

### 6.3.1 Mixin的含义

Mixin的本质是一组被抽离出来的公共方法。

Mixin的目的是横向抽离出组件的相似代码。

相似概念：面向切面编程、插件

例子：

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

### 6.3.2 Mixin的优点和缺点

优点：

代码复用——抽离出通用代码，减少开发成本，提高开发效率

即插即用——可以直接使用许多现有的Mixin来编写自己的组件

适应性强——改动一次代码，影响多个组件

缺点：

编写难度高——Mixin可能被用在各种环境中，兼容多种环境就需要更多的逻辑和代码，通用的代价是提高复杂度

降低代码可读性——组件的优势在于将逻辑和界面直接结合在一起，Mixin本质上会分散逻辑，理解起来难度更大


# 第七章 表单详解

## 7.1 不可控组件和可控组件

### 7.1.1 什么是不可控组件

数据被写死在属性中，而不是写在状态中。这样组件中的数据和状态是不对应的。

例如类似下面这样写：

	<input type="text" defaultValue="Hello World!"/>

不可控组件怎样取到value呢？

	var inputValue = React.findDOMNode(this.refs.input).value;

### 7.1.2 什么是可控组件

	<input type="text" defaultValue="{this.state.value}"/>

可控组件如何取到value呢？

	var inputValue = this.state.value;

### 7.1.3 为什么组件要可控

组件可控的好处：

（1）符合React的数据流；

（2）数据存储在state中，便于使用（不用像不可控组件那样通过DOM去取 类似` React.findDOMNode(this.refs.input).value`）

（3）便于对数据进行处理，只需要处理好state就可以了，本质上还是符合React的数据流的结果

### 7.1.4 实例演示

1、不可控组件的实例

	<!DOCTYPE html>
	<html>
	<head>
	    <title></title>
	    <script src="../lib/react.js"></script>
	    <script src="../lib/react-dom.js"></script>
	    <script src="../lib/browser.min.js"></script>
	</head>
	<body>
	    <div id="container"></div>
	    <script type="text/babel">
	        var MyForm = React.createClass({
	            submitHandler: function(event){
	                event.preventDefault();
	                var helloTo = ReactDOM.findDOMNode(this.refs.helloTo).value;
	                alert(helloTo)
	            },
	            render:function(){
	                return <form onSubmit={this.submitHandler}>
	                <input ref="helloTo" type="text" defaultValue="Hello World!"/>
	                <br/>
	                <br/>
	                <button type="submit">Speak</button>
	                </form>
	            }
	        })

	        ReactDOM.render(<MyForm></MyForm>, document.getElementById('container'));
	    </script>
	</body>
	</html>

2、可控组件的实例

	<!DOCTYPE html>
	<html>
	<head>
	    <title></title>
	    <script src="../lib/react.js"></script>
	    <script src="../lib/react-dom.js"></script>
	    <script src="../lib/browser.min.js"></script>
	</head>
	<body>
	    <div id="container"></div>
	    <script type="text/babel">
	        var MyForm = React.createClass({
	            getInitialState:function(){
	                return {
	                    helloTo :"Hello World!"
	                };
	            },
	            handleChange:function(event){
	                this.setState({
	                    helloTo: event.target.value
	                })
	            },
	            submitHandler: function(event){
	                event.preventDefault();
	                alert(this.state.helloTo)
	            },
	            render:function(){
	                return <form onSubmit={this.submitHandler}>
	                    <input type="text" value={this.state.helloTo} onChange={this.handleChange}/>
	                    <br/>
	                    <br/>
	                    <button type="submit">Speak</button>
	                </form>
	            }
	        })

	        ReactDOM.render(<MyForm></MyForm>, document.getElementById('container'));
	    </script>
	</body>
	</html>

## 7.2 不同表单元素的使用

## 7.3 事件处理函数复用

## 7.4 表单组件自定义


# 第八章 React动画效果实现

## 8.1 网页动画介绍

### 8.1.1

## 8.2 CSS3动画介绍

### 8.2.1

## 8.3 JS模拟动画介绍

### 8.3.1

## 8.4 rAF动画介绍

### 8.4.1