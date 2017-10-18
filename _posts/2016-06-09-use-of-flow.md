---
layout:     post
title:      "静态类型检查工具flow的使用"
subtitle:   ""
date:       2016-06-09 23:56:12
author:     "Paian"
catalog: true
tags:
    - flow
    - 静态类型检查
---

## 静态类型检查工具flow的使用

### 初始化：

```
npm i -g flow-bin
cd testflow
flow init
```

`flow init`进行初始化，初始化之后会生成一个配置文件（.flowconfig）。


### 配置文件：

flow的配置文件放在.flowconfig中

自定义类型的数据，可以通过在某个文件中进行配置，如declares/types.js文件中声明。

```
declare type person = {
    name: string,
    age: number
}
```

然后像正常的基本数据类型那样用于flow检查就可以了（具体示例我们稍后演示）。

### 执行检查：

```flow check```

或者直接通过

```flow```

语句来进行检查。

### 基本数据类型的检查

flow支持五种基本数据类型:string、number、boolean、null、void。前四种与JS中的同名数据类型完全一致，最后一种相当于JS中的undefined。

```
//string
function getLength (str: string) {
    return str.length;
}
getLength('abc');
getLength([1,2,3]);


//number
function multiply100 (num) {
    return num * 100;
}
multiply100(20);
multiply100('20');


//boolean
function reverseFlag (flag: boolean) {
    return !flag;
}
reverseFlag(true);
reverseFlag('true');


//null
function setPropertyNull (obj, prop, nullValue: null) {
    obj[prop] = nullValue;
}
var obj1 = {};
setPropertyNull(obj1, 'name', null);
setPropertyNull(obj1, 'name', 'abc');


//void 即 JS中的undefined
function setPropertyVoid (obj, prop, undefinedValue: void) {
    obj[prop] = undefinedValue;
}
var obj2 = {};
setPropertyVoid(obj2, 'name', undefined);
setPropertyVoid(obj2, 'name', 'abc');
```

### 复杂数据类型的使用

除了5种基本数据类型外，剩余的类型都被flow视作复杂数据类型。而在flow中，复杂数据又分为两类，一类是Array，除Array之外的复杂数据类型都是Object（注意此处O是大写）。

首先看Array的检查：

```
//复杂数据类型
function getTotal (numbers: Array<number>) {
    var result = 0;

    for(var i = 0, len = numbers.length; i < len; i++) {
        result += i;
    }

    return result;
}

getTotal([1,2,3]);
getTotal(['a', 1]);
getTotal('a');
```

接着看一下Object的检查：

```
//Object
function expend (destination: Object, source: Object): Object {
    for(var i in source){
        destination[i] = source[i];
    }
    return destination;
}

expend({a: 1, b: 2}, {x: 'aaa', y: 'bbb'});
//expend('a', {x: 'aaa', y: 'bbb'});
```

当然，对于Object的检查还可以像下文的自定义数据类型检查一样定义明确的每个字段的类型来进行更细致的检查。

Object检查所命中的类型中，包含一种特殊类型，即Function，在flow中可以对函数单独进行检查。

```
//Function
function errorHandler (err: Object, callback: Function) {
    if(err) {
        callback(err);
    }
}
errorHandler({msg: '错误消息'}, function (err) {
    alert(err.msg);
});
errorHandler({msg: '错误消息'}, 'abc');
```

### 基于其它类型的类型

下面这个例子注释的是返回类型和传入参数的类型一样的情况。

```
function identity<T>(value: T): T {
  return value;
}
```

### 自定义数据类型的检查

关于自定义flow数据类型的方法，上文已经讲过了，下面看一个使用的例子（这里使用了上文自定义的person数据类型）。

可参考：https://flow.org/en/docs/libdefs/creation/

```
//自定义类型
function sayHi (somebody: person) {
    console.log('Hi, my name is', somebody.name, ', and I\'m ', somebody.age, ' years old!');
}

sayHi({name: 'milon', age: 18});
// sayHi('abc');
```

当引入的第三方工具的全局变量未能识别时，也可以用自定义类型来解决不认识其引入的全局变量的问题，例如：

```
function vegetarianPizzas () {
  return _.findWhere(pizzas, {vegetarian: true});
}
```
上述代码引用了underscore的全局变量。但是用flow检查的时候，它不认识这个全局变量，所以就会报错。


declare class Underscore {
  findWhere<T>(list: Array<T>, properties: {}): T;
}

declare var _: Underscore;

### 规定函数返回值的类型

```
//规定函数返回值的类型
function getTotal2 (numbers: Array<number>): number {
    var result = 0;

    for(var i = 0, len = numbers.length; i < len; i++) {
        result += i;
    }

    return result;
    //return 'abc';
}
getTotal2([1,2,3]);
```

### 两个或两个以上数据类型的检查

这种情形，用|来分隔多个可选的类型。

```
function getTotal3 (numbers: Array<number|string>): number|string {
    var result = 0;

    for(var i = 0, len = numbers.length; i < len; i++) {
        result += i;
    }

    return result;
}
getTotal3([1,2,3]);
getTotal3(['1',2,3]);
```

### 一个参数可有可无时

在其后面加上问号来表示。

比如，上文的自定义类型person，如果age字段可有可无，则可以在age后面加一个?来表示。

```
declare type person = {
    name: string,
    age?: number
}
```

这样的话，即使没有该字段也能检查通过。例如，下列语句在检查时就不会报错了。

```
sayHi({name: 'milon'});
```

### 一个参数的类型可以是指定的类型，但也可以是null或undefined时

在指定类型的后面加?来表示。

同样拿上文中的自定义类型person举例，如果age字段的类型可以任意，则可以表示如下。

```
declare type person = {
    name: string,
    age: ?number
}
```

此时，用flow检查如下三个语句时，均不会报错。

```
sayHi({name: 'milon', age: 18});
sayHi({name: 'milon', age: null});
sayHi({name: 'milon', age: undefined});
```

### 一个参数可以是任意类型时

flow中有两个表示任意的类型，一个是any，一个是mixed。

首先看一下any，这种类型的参数，传入什么值都是可以的:

```
//any
function log(msg: any) {
    console.log(msg);
}
log('abc');
log(123);
log(true);
log(null);
log(undefined);
log([]);
log({});
log(function(){});
```

再来看fixed，它也表示可以传入任何类型的参数，不过，当你使用mixed类型的时候，你需要在代码中对可能的运算情况进行分支判断，否则flow检查中会报错。

```
//mixed
function toStr1 (value: mixed) {
    return '' + value; // Works!
}
toStr1(123);

function toStr2 (value: mixed) {
    if (typeof value === 'string') {
        return '' + value; // Works!
    } else {
       return '';
    }
}
toStr2(123);
```

上面这段代码在用flow检查时，toStr1会报错："This type cannot be used in an addition because it is unknown whether it behaves like a string or a number."

意思是因为传入的参数既有可能是number类型，也有可能是string类型，但是二者在进行`'' + value`这一+运算的时候可能表现是不一样的。所以应该向toStr2函数那样进行分支判断，以避免二义性。

### 配置babel插件来移除flow相关的注释

安装依赖：

```
npm i babel-plugin-transform-flow-strip-types -D
npm i babel -D
npm i babel-cli -D
npm i babel-plugin-transform-runtime -D
npm i babel-preset-es2015 -D
npm i babel-preset-stage-2 -D

```

在.bablerc中配置：

```
{
    "presets": ["es2015", "stage-2"],
    "plugins": ["transform-runtime", "transform-flow-strip-types"],
    "comments": false
}
```

在package.json中配置：

"build": "./node_modules/.bin/babel src -d transit"


然后通过如下命令即可移除flow的注释：

```
npm run build
```

### .flowconfig文件的配置

#### 额外包含的待检测文件的配置

.flowconfig 所在目录下的所有文件都自动纳入待检测的范围。如果还想包含其它的目录，可以在.flowconfig中这样配置：

```
[include]
../externalFile.js
../externalDir/
../otherProject/*.js
../otherProject/**/coolStuff/
```

#### 需要忽略的待检测文件的配置

.flowconfig 文件的 [ignore] 一栏，用来告诉 flow 哪些文件不需要检测， 路径匹配使用正则表达式。当然，默认为空。

```
[ignore]
.*/__tests__/.*
.*/src/\(foo\|bar\)/.*
.*\.ignore\.js
```

该 [ignore] 配置表示忽略：

所有名为 __tests__ 目录下的目录和文件
所有 … .*/src/foo 或 .*/src/bar 下 …
所有以 .ignore.js 结尾命名的文件

从 Flow v0.23.0 开始，你可以在正则中用 <PROJECT_ROOT> 占位符表示根目录的绝对路径。 对于相对路径的场景就很有用了，例如：

[ignore]
<PROJECT_ROOT>/__tests__/.*
这就忽略了项目根目录下 __tests__ 的目录和文件。

#### 自定义类型等的引入

[libs]
配置了 .flowconfig 文件的 [libs] 后，当检测代码的时候， flow 就会包含指定的 声明 (接口文件)。上文中已经用到过。

### 配置Eslint也检查flow的语法

首先安装相应的Eslint及其插件：

```
npm i eslint -D
npm i eslint-config-standard -D
npm i eslint-plugin-import -D
npm i eslint-plugin-node -D
npm i eslint-plugin-promise -D
npm i eslint-plugin-standard -D
npm i eslint-plugin-flowtype -D
```

然后配置.eslintrc.js：

```
module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'standard',
        'plugin:flowtype/recommended'
    ],
    plugins: [
        'flowtype'
    ],
    rules: {
        indent: [2, 4],
        semi: [2, "always"],//语句强制分号结尾
        "no-multiple-empty-lines": 0
    }
};
```

其中，因为 eslint-plugin-flowtype 插件中默认提供了一份基于优秀实践总结出的 flow type 书写规范配置，所以只需要在上述配置的 extend 中加入 plugin:flowtype/recommended 即可直接使用。该分规范中明确参数flow类型之前需要加上空格。如 `function toStr(str: string)` 的 str:和string之间就有一个空格，否则eslint检查时会报错。

最后在package.json中配置：

```
"eslint": "./node_modules/.bin/eslint ./src"
```

这样我们就可以执行`npm run eslint`来正常进行含有flow 标注的代码了。


附：

[flow的中文文档](https://zhenyong.github.io/flowtype/docs/getting-started.html#_)
