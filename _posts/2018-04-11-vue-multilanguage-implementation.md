---
layout:     post
title:      "一种Vue.js前端多语言方案"
subtitle:   ""
date:       2018-04-11 22:10:17
author:     "Paian"
catalog:    true
tags:
    - Vue.js
    - 国际化方案
---

## 一种Vue.js前端多语言方案

前端的国际化是一个比较常见的需求。但比较奇怪的是，网上关于这一块的直接可用的方案却比较少。最近刚做了一版基于Vue.js的多语言实现，在此简单做一个小结。

### 一、通常有哪些内容需要处理

总的来说，一个Web应用中，需要做多语言切换的内容主要包括如下方面：

1、模板中的内容，如Vue.js的`<template>`标签中的文字内容

2、JS代码中的文字内容

3、图片中的文案内容

4、页面title

5、第三方组件中的文案（比如，我的项目中用到了Vux的组件）

6、后端接口中需要展示到前端的数据内容

7、后端接口返回的错误提示

### 二、基本思路

#### 1、首先，需要确定以什么样的方式来获取到当前应该展示何种语言

我采用的是用URL传递`?lang=en`或者`?lang=zh-CN`这样的传递参数的形式。这样做的好处在于可以通过链接指定用哪种语言。但是，只依赖于地址栏参数也是不方便的。比如，在页面跳转的时候，这个地址栏参数可能就丢失了。这会导致你在页面跳转之后就不知道该用那种语言展示了。而理想的的方式应该是，进入某个页面的时候带有这个参数（这个时候就获取到该使用何种语言了），等再跳转到其它页面的时候就不必再带这个lang参数了，因为此时你已经知道该用那种语言了。所以，应该在一进入第一个页面的时候就把这个参数存下来，比如，存在localstorage中，存在vuex的state中。

这里，就印出来一个语言判断的优先级问题。

因为地址栏里可能有lang参数，localstorage中可能也有相关的存储字段（因为上次访问过本应用），你可能还想设置默认的降级语言，等等。其优先级应该如何处理呢？

正确的优先级应该是：

先看地址栏参数中有没有；

再看localstorage中有没有；

然后再通过`navigator.language`获取浏览器默认语言，看是否是你的应用所支持的语言，若是，则采用之；

最后才是使用回退语言（例如，比较通用的英语）。

当然，你可以根据你的需求来做一些简化。

#### 2、其次，采用什么工具来解决语言转换和打包的问题？

（1）i18n相关工具的选择——由谁来提供多语言转换函数（通常是`$t`）？

目前国际化通用方式多数基于i18n，我们也无需再去造轮子了。但就i18n的具体使用上，有很多不同的NPM模块。比如vuex-i18n、vue-i18n、simplest-i18n等。因为多数复杂一点的项目都会上vuex，所以复杂一点的项目选择vuex-i18n会比vue-i18n更方便。

而simplest-i18n这个很小众的模块，其实也有它的好处。它支持下面这样的写法：

在模板中：

```
<span>$t('真实姓名', 'Real Name')</span>
```

或者在JS中：

```
this.$t('真实姓名', 'Real Name')
```

即将语言写在一起，`$t`函数的每一个参数都是一种语言，一目了然，还是比较方便阅读的。对小项目来说，不失为一种选择。

其基本使用如下：

t.js文件：

```
import i18n from 'simplest-i18n';
import getLang from '../../getLang';

const t = i18n({
  locale: getLang.lang, // 当前语言
  locales: getLang.langs // 支持的语言列表
});
export default t;
```

然后在应用的入口文件中对Vue.js进行扩展：

```
import t from './t';
Vue.$t = Vue.prototype.$t = t;
```

这样就把`$t`这个方法挂载到了Vue.js的全局。Vue实例中也可以通过`this.$t`访问到，使用上还是非常简单的。

但是，对于大项目来说，把语言包都写在代码里面，对维护并不友好。而且，靠它也解决不了我所用到的Vux组件的多语言化的问题。

所以最终，我选择了vuex-i18n作为基础。

（2）组织和处理语言包的工具——语言包怎么组织，怎么打包处理？

对于这个问题，我首先需要解决Vux第三方组件的多语言化问题。

首先，在语言包的组织方面，比较常见的是写成JSON配置文件。不过，我最终采用了Yaml这种格式，它支持将多语言字段写在一起。比如：

config.yml

```
confirm: 
  zh-CN: 确认
  en: confirm
```

而不是像下面那样将一个字段的多语言拆成几处，比如：

```
confirm: 确认
```

```
confirm: confirm
```

这样带来的好处就是，可以方便地对照一个字段的不同语言版本，而且要修改或删除某一个字段时，也可以在一处完成，无需切换。况且，Yaml文件的语法也更加简单明了，省去了JSON文件那种必须写双引号、不可以出现注释等诸多麻烦。

其次，在语言包的打包方面，我找到了vux-loader。它可以和现有的webpack配置结合，不仅能完成Vux组件多语言配置的打包，还允许在自定义的Vue组件中使用`<i18n>`标签。比如，在自定义组件中我可以这么写：

```
<i18n>
confirm: 
  zh-CN: 确认
  en: confirm
<i18n>
```

打包时，vux-loader会将`<i18n>`标签中的多语言配置信息导出至我们所配置的一个Yaml文件中，而把`<i18n>`标签从我们的自定义组件中移除。

那么，对于Yaml文件如何处理呢？可以用json-loader和yaml-loader。它们可以将Yaml文件转换成我们所需要的json格式，方便在JS函数中使用，就像这样：

```
const componentsLocales = require('json-loader!yaml-loader!../../locales/components.yml'); // 这就得到了一个语言包的json格式
```

#### 3、如何通知后端接口返回何种语言的数据？

因为涉及到许多接口都要通知后端采用哪种语言，所以，我选择了使用header头的方式。在axios的interceptor中给请求统一添加了header头： Accept-Language， 并把这个值的内容设置成前端所获得应使用的语言（如，zh-CN 或 en 等）。这样，就集中在一处把这个问题处理掉了。

### 三、具体实践中的一些细节

#### 1、获取当前应该采用何种语言的getLang模块的实现

```
import { getQueryObj } from '../utils/url';
import { setItem, getItem } from '../utils/storage';

const langs = ['zh-CN', 'en']; // 支持哪些语言
const defaultLang = 'en'; // 默认语言，暂时并没有对外抛出

function getLang() {
  let queries = getQueryObj();
  let storeLang = getItem('lang');
  let rawLang;
  let flag = false;

  if (queries && queries['lang']) {
    rawLang = queries['lang'];
    setItem('lang', rawLang);
  } else {
    rawLang = storeLang || navigator.language;
  }

  langs.map(item => {
    if (item === rawLang) {
      flag = true;
    }
  });
  return flag ? rawLang : defaultLang;
}

const lang = getLang(langs, defaultLang); 

export default {
    lang, // 获取到当前语言
    langs // 所支持的语言列表
}
```

#### 2、Vux组件的多语言包的配置

可以从Vux的官方github中找到src/locales/all.yml拷贝过来（同一目录下的src/locales/zh-CN.yml、src/locales/en.yml分别是其中文部分和英文部分），根据你自己的需要略作修改即可。

然后在你的应用的应用的入口文件中引入：

```
const vuxLocales = require('json-loader!yaml-loader!../../locales/all.yml');
```

#### 3、vux-loader的配置

webpack.dev.conf.js中：

```
resolve(vuxLoader.merge(devWebpackConfig, {
    plugins: [
        'vux-ui',
        {
            name: 'i18n',
            vuxStaticReplace: false,
            staticReplace: false,
            extractToFiles: 'src/locales/components.yml',
            localeList: ['en','zh-CN']
        }
    ]
}))
```
   
webpack.prod.conf.js中：

```
resolve(vuxLoader.merge(buildWebpackConfig, {
    plugins: [
        'vux-ui',
        {
            name: 'i18n',
            vuxStaticReplace: false,
            staticReplace: false,
            extractToFiles: 'src/locales/components.yml',
            localeList: ['en','zh-CN']
        }
    ]
}))
```

其中的`localeList: ['en','zh-CN']`就是指定你的应用支持哪几种语言。

而`extractToFiles: 'src/locales/components.yml'`就是指定你的自定义组件中所用到的那些`<i18n>`标签中的语言包信息，应该导出到哪个Yaml文件中。也就是说，你在各个自定义组件中使用的`<i18n>`标签中的语言包信息都会被vux-loader集中抽取到这个文件中。

然后在应用的入口文件中引入这个语言包文件：

```
const componentsLocales = require('json-loader!yaml-loader!../../locales/components.yml');
```

#### 4、自定义组件内外文案的多语言化

（1）对于自定义组件内部的文案的多语言化信息，写在组件的`<i18n>`标签中即可。同时，为了避免不同的自定义组件中多语言字段的命名冲突，在每个字段的名字前面加上以`组件名-`式的前缀。

（2）对于页面的标题、一些错误提示等文案，它们是出现在组件之外的，因此不适合写在组件的`<i18n>`标签中，所以我们单独新建一个global.yml来存放这些全局性的多语言信息。这些内容直接写在global.yml中即可，并且，为了表面与其它的语言包字段相冲突，我们在每个字段的前面加上`global-`前缀。

然后在应用的入口文件中引入这个语言包文件：

```
const componentsLocales = require('json-loader!yaml-loader!../../locales/global.yml');
```

#### 5、vuex-i18n的实现

在src/store/index.js文件中：

```
import VuexI18n from 'vuex-i18n';
```

`export default new Vuex.Store`中增加：

```
    i18n: VuexI18n.store
```

在应用的入口文件中：

```
import VuexI18n from 'vuex-i18n';
import getLang from '../../getLang';

Vue.use(VuexI18n.plugin, store);

const vuxLocales = require('json-loader!yaml-loader!../../locales/all.yml');
const componentsLocales = require('json-loader!yaml-loader!../../locales/components.yml');

const finalLocales = {
  'en': Object.assign(vuxLocales['en'], componentsLocales['en']),
  'zh-CN': Object.assign(vuxLocales['zh-CN'], componentsLocales['zh-CN'])
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}

Vue.i18n.set(globalVars.lang);
```

#### 6、图片的多语言化

对于图片中的文案信息，多语言化主要有这么两种方式：一是根据不同的语言展示不同的图片；二是尽将文字从图片背景中分离出来，采用文字层加背景图片层的方式，这样文字层就可以作为普通文本来实现多语言化了。都比较简单，不再赘述。

#### 7、在当前页面通过按钮切换当前语言后，如何更新当前页面的内容？

如果你的应用并不需要在页面内部切换语言版本，那么直接通过URL中传入不同的lang参数就可以了，并不涉及到此问题。

第一种方式：刷新页面

```
<button @click="changeLang('zh-CN')">中文</button>
<button @click="changeLang('en')">英文</button>
```

```
changeLang(lang){
    location.href = this.$utils.url.replaceParam(this.$router.history.current.path, 'lang', lang);
},
```

第二种方式：watch当前页data中lang字段的变化，通过v-if局部刷新某些相关组件：

```
data(){
    return {
        lang: this.$i18n.locale()
    }
}

changeLang(lang){
    this.$i18n.set(lang);
    this.lang = this.$i18n.locale();
},

watch: {
    lang(newVal, oldVal) {
        if(newVal === oldVal) {
            return;
        }

        // 在这里通过改变某个标志位 结合 v-if 来触发某个局部组件的重新渲染
    }
}
```

第三种方式：结合vuex派发全局的语言状态，接收到状态变化时进行更新，或者自己简单地改写vuex-i18n的实现。这种方式相对复杂一些。

具体根据自己的业务需求选择。

