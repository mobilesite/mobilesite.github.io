---
layout:     post
title:      "理解Vuex，看这篇就够了"
subtitle:   ""
date:       2016-12-18 23:53:15
author:     "Paian"
catalog:    true
tags:
    - Vue.js
    - Vuex
---

## 理解Vuex，看这篇就够了

由于Vuex的官方文档在各个模块之间缺乏一些过渡，另外新概念很多，使得初读时总有些云里雾里的感觉。于是本文在官方文档的基础上补充了一些自己的理解及相关的背景知识，尤其是试图让各个部分之间形成一定的连贯关系。希望能帮助初学者更快地理解Vuex。

### 一、Vuex是干什么用的？

它是用于对复杂应用进行状态管理用的（官方说法是它是一种状态管理模式）。

“杀鸡不用宰牛刀”。对于简单的项目，根本用不着Vuex这把“宰牛刀”。那简单的项目用什么呢？用Vue.js官方提供的[事件总线](https://cn.vuejs.org/v2/guide/components.html#非父子组件的通信)就可以了。

### 二、我们import进来的Vuex对象都包含些什么呢？

我们使用Vuex的时候怎么用呢？通常都是这样：

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

new Vuex.Store({
	state: {     //放置state的值
    	count: 0,
    	str:"abcd234"
    },
  	getters: {   //放置getters方法
      	strLen: state => state.str.length
  	},
  	// mutations只能是同步操作
  	mutations: {   //放置mutations方法
       increment(state, payload) {
          //在这里改变state中的数据
          state.count = payload.number;
       }
  	},
  	// actions可以是异步操作
  	actions: {      //放置actions方法
       	actionName({ commit }) {
          	//dosomething
         	commit('mutationName')
       	},
       	getSong ({commit}, id) {
          	api.getMusicUrlResource(id).then(res => {
            	let url = res.data.data[0].url;
          	})
          	.catch((error) => {  // 错误处理
              	console.log(error);
         	});
      	}
	}
});

new Vue({
  el: '#app',
  store,
  ...
});
```

这里import进来的Vuex是个什么东西呢？我们用`console.log`把它输出一下：

```
console.log(Vuex)
```

通过输出，我们发现其结构如下：

> {
>
> ​	Store: function Store(){},
>
> ​	mapActions: function(){},      // 对应Actions的结果集
>
> ​	mapGetters: function(){},     // 对应Getters的结果集
>
> ​	mapMutations: function(){},  // 对应Mutations的结果集
>
> ​	mapState: function(){},         // 对应State的结果集
>
> ​	install: function install(){},
>
> ​	installed: true
>
> }

**可见，import进来的Vuex它实际上是一个对象，里面包含了Store这一构造函数，还有几个mapActions、mapGetters、mapMutations、mapState这几个辅助方法**（后面再讲）。

**除此之外，还有一个`install`方法。我们发现，import之后要对其进行`Vue.use(Vuex);`的操作。根据这两个线索，我们就明白了，Vuex本质上就是一个Vue.js的插件。**不信你去对照下Vue.js的官方文档中对于插件的解释就知道了（[见这里](https://cn.vuejs.org/v2/guide/plugins.html#main)）。

### 三、创建好的store实例怎么在各个组件中都能引用到？

**new Vuex.Store实例，怎么才能在各个组件中都能引用到呢？因为这个store实例是个全局单例。Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中：**

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

**通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store`访问到。**

### 四、Vuex中的几大核心概念

#### 1、State

这个很好理解，就是状态数据。Vuex所管理的就是状态，其它的如Actions、Mutations都是来辅助实现对状态的管理的。Vue组件要有所变化，也是直接受到State的驱动来变化的。

**可以通过this.$store.state来直接获取状态，也可以利用vuex提供的mapState辅助函数将state映射到计算属性（computed）中去。**

##### `mapState` 辅助函数

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键：

```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

#### 2、Getters

**Getters本质上是用来对状态进行加工处理。Getters与State的关系，就像Vue.js的computed与data的关系。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。**

**可以通过this.$store.getters.valueName对派生出来的状态进行访问。或者直接使用辅助函数mapGetters将其映射到本地计算属性中去。**

##### `mapGetters` 辅助函数

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```
mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

**上面这段代码中，有个写法大家可能会奇怪，就是`...mapGetters`。这是什么鬼东西呢？**

**其中mapGetters实际上是一个方法Vuex对象上的一个方法，这从本文开头打印的那个Vuex对象的内容可以看出来。...这个符号是ES2015的一个新的语法糖，即将mapGetters处理后的内容展开后填入。**

#### 3、Mutations

**Mutations的中文意思是“变化”，利用它可以更改状态。事实上，更改 Vuex 的 store 中的状态的唯一方法就是提交 （commit）mutation。不过，mutation触发状态改变的方式有一点特别，所谓commit一个mutation，实际是像触发一个事件一样，传入一个mutation的类型以及携带一些数据（称作payload，载荷）。**

本文开头那段代码中所指明的mutations，即：

```
mutations: {   //放置mutations方法
	increment(state, payload) {
		//在这里改变state中的数据
		state.count = payload.number;
	}
},
```

其中所包含的，**实际上是一个个的mutation处理函数，用于指明收到这个mutation的commit之后，应该做些什么（当然，主要就是改变state，只是改变哪些state值的问题）。**

那commit一个mutation在代码层面怎么表示呢？

```
this.$store.commit('increment', {
  amount: 10
})
```

或者这样：

```
this.$store.commit({
  type: 'increment',
  amount: 10
})
```

**除了这种使用 `this.$store.commit('xxx')` 提交 mutation的方式之外，还有一种方式，即使用 `mapMutations` 辅助函数将组件中的 methods 映射为 `this.$store.commit`。**例如：

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

经过这样的映射之后，就可以通过调用方法的方式来触发其对应的（所映射到的）mutation commit了，比如，上例中调用add()方法，就相当于执行了`this.$store.commit('increment')`了。

像上面这样，就既声明了收到mutation后怎么处理，又清楚了怎么触发一个mutation。是不是特别像事件的处理函数（handler）以及事件的触发（emit）之间的关系？

**考虑到触发的mutation的type必须与mutations里声明的mutation名称一致，比较好的方式是把这些mutation都集中到一个文件（如mutation-types）中以常量的形式定义，在其它地方再将这个文件引入，便于管理。而且这样做还有一个好处，就是整个应用中一共有哪些mutation type可以一目了然。**就像下面这样：

```
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

**值得注意的是，mutation必须是同步函数，目的是为了在dev-tools中能够捕捉到每一条mutation前后状态的快照**（参见https://www.zhihu.com/question/48759748）。

#### 4、Actions

**与必须是同步函数Mutation所不同，Action可以包含异步的操作。**

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

或者用ES2015的参数解构，可以简写成：

```
actions: {
    increment ({commit}) {
      	commit('increment')
    }
}
```

**和mutation类似，我们像上面这样生命action的处理函数。它接收的第一个参数是一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters。**

**不过，mutation处理函数中所做的事情是改变state，而action处理函数中所做的事情则是commit mutation。**

**那么，怎么触发action呢？按照Vuex的叫法，这叫分发（dispatch），我觉得这个名字让人不好理解，我们反正知道它实际上是触发的意思就行了。具体的触发方法是`this.$store.dispatch(actionType, payload)`。所传的两个参数一个是要触发的action的类型，一个是所携带的数据（payload），类似于上文所讲的commit mutation时所传的那两个参数。具体如下：**

```
// 以载荷形式分发
this.$store.dispatch('incrementAsync', {
  amount: 10
})

或

// 以对象形式分发
this.$store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

**还有一种方法是使用 `mapActions` 辅助函数将组件的 methods 映射为 `this.$store.dispatch` 调用。如下：**

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

**另外，你需要知道， `this.$store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `this.$store.dispatch` 仍旧返回 Promise。**

再来看一些组合性的异步操作：

```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

现在你可以：

```
$this.store.dispatch('actionA').then(() => {
  // ...
})
```

在另外一个 action 中也可以：

```
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

最后，如果我们利用 [async / await](https://tc39.github.io/ecmascript-asyncawait/) 这个 JavaScript 即将到来的新特性，我们可以像这样组合 action：

```
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

**这实际上就实现了action嵌套另一个action的情况。**

**讲了这么多action，你可能会纳闷一个问题：action这鬼东西不是和mutation看起来好多地方都很像吗，直接触发mutation去改变state岂不更好？为什么还要先触发action，再由action去触发mutation才达到改变state的目的？**

**这是个好问题。还记得上面我们提到过mutation只能是同步的操作而action可以是包含异步操作吗？那么，若想进行异步操作，通过mutation显然是无法完成的，所以就有了action。**我们来看一个更加实际的购物车示例，涉及到**调用异步 API** 和**分发多重 mutation**：

```
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

#### 5、Module

**Module是什么概念呢？它实际上是对于store的一种切割。由于Vuex使用的是单一状态树，这样整个应用的所有状态都会集中到一个比较大的对象上面，那么，当应用变得非常复杂时，store 对象就很可能变得相当臃肿！**

为了解决以上问题，Vuex 允许我们将 store 分割成一个个的**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。就像这样：

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

##### 模块的局部状态

对于每个模块内部的 mutation 和 getter，接收的第一个参数就是**模块的局部状态对象**。

```
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：

```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

##### 命名空间

**默认情况下，模块内部的 action、mutation 和 getter 是注册在**全局命名空间**的——这样使得多个模块能够对同一 mutation 或 action 作出响应。**

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为命名空间模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：

```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

启用了命名空间的 getter 和 action 会收到局部化的 `getter`，`dispatch` 和 `commit`。

##### 在命名空间模块内访问全局内容（Global Assets）

**如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetter` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。**

**若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit`即可。**

```
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 带命名空间的绑定函数

当使用 `mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定命名空间模块时，写起来可能比较繁琐：

```
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo',
    'some/nested/module/bar'
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo',
    'bar'
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

##### 给插件开发者的注意事项

如果你开发的[插件（Plugin）](https://vuex.vuejs.org/zh-cn/plugins.html)提供了模块并允许用户将其添加到 Vuex store，可能需要考虑模块的空间名称问题。对于这种情况，你可以通过插件的参数对象来允许用户指定空间名称：

```
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}

```

##### 模块动态注册

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：

```
// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如，[`vuex-router-sync`](https://github.com/vuejs/vuex-router-sync) 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理。

你也可以使用 `store.unregisterModule(moduleName)` 来动态卸载模块。注意，你不能使用此方法卸载静态模块（即创建 store 时声明的模块）。

##### 模块重用

有时我们可能需要创建一个模块的多个实例，例如：

- 创建多个 store，他们公用同一个模块
- 在一个 store 中多次注册同一个模块

如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题。

实际上这和 Vue 组件内的 `data` 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态（仅 2.3.0+ 支持）：

```
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutation, action 和 getter 等等...
}
```

### 六、严格模式

Vuex的严格模式，是指其在开启严格模式的情况下，只要发现某个状态变更不是由 mutation 函数引起的，都将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

开启严格模式，仅需在创建 store 的时候传入 `strict: true`：

```
const store = new Vuex.Store({
  // ...
  strict: true
})
```

注意：

**不要在发布环境下启用严格模式，以避免性能损失！**严格模式会深度监测状态树来检测不合规的状态变更。

类似于插件，我们可以让构建工具来处理这种情况：

```
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

### 七、双向绑定的处理

当在严格模式中使用 Vuex 时，在属于 Vuex 的 state 上使用 `v-model` 会比较棘手：

```
<input v-model="obj.message">

```

假设这里的 `obj` 是在计算属性中返回的一个属于 Vuex store 的对象，在用户输入时，`v-model` 会试图直接修改 `obj.message`。在严格模式中，由于这个修改不是在 mutation 函数中执行的, 这里会抛出一个错误。

用“Vuex 的思维”去解决这个问题的方法是：给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用 action:

```
<input :value="message" @input="updateMessage">

```

```
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}

```

下面是 mutation 函数：

```
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}

```

#### 双向绑定的计算属性

必须承认，这样做比简单地使用“`v-model` + 局部状态”要啰嗦得多，并且也损失了一些 `v-model` 中很有用的特性。另一个方法是使用带有 setter 的双向绑定计算属性：

```
<input v-model="message">

// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

### 八、热重载

使用 webpack 的 [Hot Module Replacement API](https://webpack.github.io/docs/hot-module-replacement.html)，Vuex 支持在开发过程中热重载 mutation、module、action 和 getter。你也可以在 Browserify 中使用 [browserify-hmr](https://github.com/AgentME/browserify-hmr/) 插件。

对于 mutation 和模块，你需要使用 `store.hotUpdate()` 方法：

例子（来自[https://github.com/vuejs/vuex/blob/dev/examples/counter-hot/store/index.js](https://github.com/vuejs/vuex/blob/dev/examples/counter-hot/store/index.js)）：

```
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  count: 0,
  history: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
```

主要是下面这一小段代码：

```
if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}
```

### 九、实际使用时的文件结构和关系

来看一个Vuex综合运用的例子：

来自：[https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart](https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)

//入口文件：app.js

```
import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import { currency } from './currency'

Vue.filter('currency', currency)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
```

//store/index.js

```
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import products from './modules/products'
import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

if (module.hot) {
  module.hot.accept([
    './actions',
    './getters',
    './modules/cart',
    './modules/products'
  ], () => {
    store.hotUpdate({
      actions: require('./actions'),
      getters: require('./getters'),
      modules: {
    	cart: require('./modules/cart'),
    	products: require('./modules/products')
      },
      mutations: require('./mutations')
    })
  })
}
```

//store/mutation-types.js

```
export const ADD_TO_CART = 'ADD_TO_CART'
export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
```

//store/getters.js

```
export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}
```

//store/actions.js

```
import * as types from './mutation-types'

export const addToCart = ({ commit }, product) => {
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
```

//store/modules/cart.js

```
import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  added: [],
  checkoutStatus: null
}

// getters
const getters = {
  checkoutStatus: state => state.checkoutStatus
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.added]
    commit(types.CHECKOUT_REQUEST)
    shop.buyProducts(
      products,
      () => commit(types.CHECKOUT_SUCCESS),
      () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
    )
  }
}

// mutations
const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },

  [types.CHECKOUT_REQUEST] (state) {
    // clear cart
    state.added = []
    state.checkoutStatus = null
  },

  [types.CHECKOUT_SUCCESS] (state) {
    state.checkoutStatus = 'successful'
  },

  [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
    // rollback to the cart saved before sending the request
    state.added = savedCartItems
    state.checkoutStatus = 'failed'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

//store/modules/products.js

```
import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allProducts: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    shop.getProducts(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.all = products
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
```

//components/App.vue

```
<template>
  <div id="app">
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list></product-list>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import Cart from './Cart.vue'
export default {
  components: { ProductList, Cart }
}
</script>
```

//components/Cart.vue

```
<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li v-for="p in products">
        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
</script>
```

//components/ProductList.vue

```
<template>
  <ul>
    <li v-for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <button
        :disabled="!p.inventory"
        @click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: mapActions([
    'addToCart'
  ]),
  created () {
    this.$store.dispatch('getAllProducts')
  }
}
</script>
```

### 十、总结

1、应用层级的状态应该集中到单个 store 对象中，状态对象太复杂的时候可以划分**module**。

2、提交 **mutation** 是更改状态的唯一方法。

3、在触发方法上：

action的触发是dispatch

mutation的触发是commit；

4、在功能上：

state保存的是数据

getters是对state进行二次加工

action的处理函数的功能最终是commit mutation

mutation处理函数的功能最终是改变state

5、在同步异步上：

异步逻辑都应该封装到 **action** 里面

**mutation** 是同步的，不能出现异步

6、在流程上：

vue component----dispatch---->actions----commit---->mutations----mutate---->state----render---->vue component。从而形成闭环。见图：

![](https://vuex.vuejs.org/zh-cn/images/vuex.png)

7、辅助方法的映射上：

mapGetters、mapState 都是用在computed声明里面；

mapActions、mapMutations则都是用在methods声明里面。

参考： https://vuex.vuejs.org/zh-cn/intro.html



