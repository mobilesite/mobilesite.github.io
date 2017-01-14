vue.js的使用

### :是v-bind的缩写，例如，:class相当于v-bind:class

module.exports = {
    props: ['data'],
    data: function(){
        return {
            ...
        }
    },
    methods: {
        reload: function(){
            window.location.reload();
        }
    }
}


### props

期望使用的父组件数据的属性。可以是数组或对象。对象用于高级配置，如类型检查，自定义验证，默认值等。

示例：

// 简单语法
Vue.component('props-demo-simple', {
  props: ['size', 'myMessage']
})

// 对象语法，指定验证要求
Vue.component('props-demo-advanced', {
  props: {
    // 只检测类型
    size: Number,
    // 检测类型 + 其它验证
    name: {
      type: String,
      required: true
    }
  }
})



### Vue.component

注册或获取全局组件。

// 注册组件，传入一个扩展的构造器
Vue.component('my-component', Vue.extend({ /* ... */}))

// 注册组件，传入一个选项对象（自动调用 Vue.extend）
Vue.component('my-component', { /* ... */ })

// 获取注册的组件（始终返回构造器）
var MyComponent = Vue.component('my-component')



### 

我们可以用 Vue.extend() 创建一个组件构造器：

var MyComponent = Vue.extend({
  // 选项...
})
要把这个构造器用作组件，需要用 Vue.component(tag, constructor) 注册 ：

// 全局注册组件，tag 为 my-component
Vue.component('my-component', MyComponent)

在注册之后，组件便可以用在父实例的模块中，以自定义元素 <my-component> 的形式使用。要确保在初始化根实例之前注册了组件：

<div id="example">
  <my-component></my-component>
</div>
// 定义
var MyComponent = Vue.extend({
  template: '<div>A custom component!</div>'
})

// 注册
Vue.component('my-component', MyComponent)

// 创建根实例
new Vue({
  el: '#example'
})
渲染为：

<div id="example">
  <div>A custom component!</div>
</div>

局部注册

不需要全局注册每个组件。可以让组件只能用在其它组件内，用实例选项 components 注册：

var Child = Vue.extend({ /* ... */ })

var Parent = Vue.extend({
  template: '...',
  components: {
    // <my-component> 只能用在父组件模板内
    'my-component': Child
  }
})
这种封装也适用于其它资源，如指令、过滤器和过渡。

注册语法糖

为了让事件更简单，可以直接传入选项对象而不是构造器给 Vue.component() 和 component 选项。Vue.js 在背后自动调用 Vue.extend()：

// 在一个步骤中扩展与注册
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})

// 局部注册也可以这么做
var Parent = Vue.extend({
  components: {
    'my-component': {
      template: '<div>A custom component!</div>'
    }
  }
})
组件选项问题

传入 Vue 构造器的多数选项也可以用在 Vue.extend() 中，不过有两个特例： data and el。试想如果我们简单地把一个对象作为 data 选项传给 Vue.extend()：

var data = { a: 1 }
var MyComponent = Vue.extend({
  data: data
})
这么做的问题是 MyComponent 所有的实例将共享同一个 data 对象！这基本不是我们想要的，因此我们应当使用一个函数作为 data 选项，函数返回一个新对象：

var MyComponent = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
同理，el 选项用在 Vue.extend() 中时也须是一个函数。




### beforeCompile

类型： Function

详细：

在编译开始前调用。


### $on

vm.$on( event, callback )

参数：

{String} event
{Function} callback
用法：

监听当前实例上的自定义事件。事件可以由 vm.$emit, vm.$dispatch 或 vm.$broadcast触发。传入这些方法的附加参数都会传入这个方法的回调。

示例：

vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// -> "hi"
vm.$once( event, callback )

参数：

{String} event
{Function} callback
用法：

监听一个自定义事件，但是只触发一次，在第一次触发之后删除监听器。

vm.$off( [event, callback] )

参数：

{String} [event]
{Function} [callback]
用法：

删除事件监听器。

如果没有参数，则删除所有的事件监听器；

如果只提供了事件，则删除这个事件所有的监听器；

如果同时提供了事件与回调，则只删除这个回调。

vm.$emit( event, […args] )

参数：

{String} event
[...args]
触发当前实例上的事件。附加参数都会传给监听器回调。

vm.$dispatch( event, […args] )

参数：

{String} event
[...args]
用法：

派发事件，首先在实例上触发它，然后沿着父链向上冒泡在触发一个监听器后停止，除非它返回 true。附加参数都会传给监听器回调。

示例：

// 创建父链
var parent = new Vue()
var child1 = new Vue({ parent: parent })
var child2 = new Vue({ parent: child1 })

parent.$on('test', function () {
  console.log('parent notified')
})
child1.$on('test', function () {
  console.log('child1 notified')
})
child2.$on('test', function () {
  console.log('child2 notified')
})

child2.$dispatch('test')
// -> "child2 notified"
// -> "child1 notified"
// 没有通知 parent，因为 child1 的回调没有返回 true
另见： 父子组件通信

vm.$broadcast( event, […args] )

参数：

{String} event
[...args]
用法：

广播事件，通知给当前实例的全部后代。因为后代有多个枝杈，事件将沿着各“路径”通知。每条路径上的通知在触发一个监听器后停止，除非它返回 true。

示例：

var parent = new Vue()
// child1 和 child2 是兄弟
var child1 = new Vue({ parent: parent })
var child2 = new Vue({ parent: parent })
// child3 在 child2 内
var child3 = new Vue({ parent: child2 })

child1.$on('test', function () {
  console.log('child1 notified')
})
child2.$on('test', function () {
  console.log('child2 notified')
})
child3.$on('test', function () {
  console.log('child3 notified')
})

parent.$broadcast('test')
// -> "child1 notified"
// -> "child2 notified"
// 没有通知 child3，因为 child2 的回调没有返回 true


### 下面是一个aaa.vue文件，用var bbb = require('aaa');拿到的实际上就是module.exports 吐出来的那个对象。即


{
        props: ['data'],
        data: function(){
            ...
        },
        methods: {
            ...
        }
    }


<style lang="less" scoped>
    @import "skin.less";
</style>

<template>
    <div :class="['error-wrap'].concat(errorObj.errorClass)">
        <div class="icon"></div>
        <p class="text" v-text="errorObj.errorText"></p>
        <button class="action" v-text="errorObj.errorBtnText" @click="reload"></button>
    </div>
</template>

<script>
    var errorMap = {
        'fail': {
            errorClass: 'error-fail',
            errorText: 'wuli菌出错啦，请稍后再试',
            errorBtnText: '刷新'
        }
    };
    module.exports = {
        props: ['data'],
        data: function(){
            var _this = this;
            return {
                errorObj: errorMap['fail']
            }
        },
        methods: {
            reload: function(){
                window.location.reload();
            }
        }
    }
</script>


### vue-router的使用

如果使用 CommonJS 模块规范, 需要显式的使用 Vue.use() 安装路由模块：

var Vue = require('vue')
var VueRouter = require('vue-router')

Vue.use(VueRouter)
使用独立编译文件是不需要这样做，因为路由模块会自动安装。

// 定义组件
var Foo = Vue.extend({
    template: '<p>This is foo!</p>'
})

var Bar = Vue.extend({
    template: '<p>This is bar!</p>'
})

// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
var App = Vue.extend({})

// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
var router = new VueRouter()

// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({
    '/foo': {
        component: Foo
    },
    '/bar': {
        component: Bar
    }
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app')



定义路由规则
最主要是 main.js 的变化，直接在文件中讲解了：

// 引入vue以及vue-router
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 引入组件！直接使用es6的语法
import index from './components/app.vue';
import list from './components/list.vue';
import hello from './components/hello.vue';
//开启debug模式
Vue.config.debug = true;
// new Vue(app);//这是上一篇用到的，新建一个vue实例，现在使用vue-router就不需要了。
// 路由器需要一个根组件。
var App = Vue.extend({});
// 创建一个路由器实例
var router = new VueRouter();
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map({//定义路由映射
    '/index':{//访问地址
        name:'index',//定义路由的名字。方便使用。
        component:index,//引用的组件名称，对应上面使用`import`导入的组件
        //component:require("components/app.vue")//还可以直接使用这样的方式也是没问题的。不过会没有import集中引入那么直观
    },
    '/list': {
        name:'list',
        component: list
    },
});
router.redirect({//定义全局的重定向规则。全局的重定向会在匹配当前路径之前执行。
    '*':"/index"//重定向任意未匹配路径到/index
});
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');


实现路由跳转
主要抽出 app.vue 中的内容来讲解，的内容是：( list.vue 里面的内容自行设置查看吧)

<template>
<div>
    <h1>姓名：{{name}}</h1>
    <h2>{{age}}</h2>
    <button @click="golist">$route.router.go查看</button>
    <a v-link="{ name: 'list' }">v-link查看列表</a>
    <a v-link="{ name: 'index' }">回去主页</a>
</div>
</template>
<script>
    export default {//这里是官方的写法，默认导出，ES6
        data () { //ES6，等同于data:function(){}
            return {    //必须使用这样的形式，才能创建出单一的作用域
                name:"guowenfh",
                age:"21"
            }
        },
        methods :{
            golist () {//方法，定义路由跳转，注意这里必须使用this，不然报错
                this.$route.router.go({name:"list"});
            }
        }
    }
</script>
<style></style>
<!-- 样式自行设置，或者直接看源码就好 -->
因为自刷新的缘故，直接切换到浏览器。

点击上面使用的 v-link ，与 router.go 的方式都可以跳转到 list 定义的路由。（ 观察浏览器地址栏的变化 ）在这里我们使用的 {name:"list"} ，使用 { path: '/list' } 会有同样的效果。

### scoped

在我的源码中是在 <style scoped></style> 标签中定义样式的，请注意 scoped 的使用，它表示在该 style 中定义的样式只会在当前的组件中起到效果，而不会去影响全局的css样式。

最简单的理解应该就是：

未写该 scoped 属性的所有组件中的样式，在经过 vue-loader 编译之后拥有全局作用域。相当于共用一份 css 样式表。

而写了该属性的的组件中定义的样式，拥有独立作用域。相当于除去引入了公用的一份 css 样式表外，但单独拥有一份 css 的样式表。


### 自定义filter

Vue.filter('image', function (value, size, doPng) {
})



### 自定义directive
Vue.directive('lazyload', {})

