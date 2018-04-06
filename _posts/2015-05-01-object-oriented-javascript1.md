---
layout:     post
title:      "原始类型与引用类型——读《JavaScript面向对象精要》（一）"
subtitle:   ""
date:       2015-05-01 07:18:34
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 原始类型与引用类型——读《JavaScript面向对象精要》（一）

这本书除了如标题所描述的那样讲JavaScript面向对象之外，还是一本深入地讲ECMAScript 5的书。

### 一、原始类型与引用类型

#### 1、原始类型和引用类型的赋值所代表的含义不同

当你将原始值付给一个变量时，该值将被复制到变量中。也就是说，如果你使一个变量等于另一个时，每个变量都有它自己的一份数据拷贝，这两份数据之间将是彼此独立，互不影响的。

但对于引用类型，当你将一个变量A赋给另一个变量B时，两个变量各获得一份指针的拷贝，指向内存中的同一个对象，所以A、B之间将互相有影响。

![](/img/in-post/object-orientied-javascript-2.png)

我们把JavaScript对象想象成hash表可以帮助我们更好地理解对象结构。如下图：

![](/img/in-post/object-orientied-javascript-1.png)

#### 2、鉴别不同的数据类型

- `typeof`可以判别出bool、string、number、undefined这四种类型。

- 判定null类型的最佳方法是看它是否严格等于null(===null)。

但是`typeof null`返回的却是"object"（其实，这已经被设计和维护JavaScript的委员会T39认定是一个错误）。判定null类型的最佳方法是看它是否严格等于null(===null)。之所以使用三个等于号而不是两个等于号，是因为使用三个等于号进行比较时，不会出现强制类型转换，而使用两个等于号的时候，是会出现强制类型转换的。例如：

```
console.log('5' == 5); //true
console.log('5' === 5); //false
```

- 判断函数可以用`typeof`

对于所有非函数的引用类型和null，typeof都会返回"object"

- `instanceof 构造函数名`可以鉴别一个引用类型是否是继承自某一类型。

对于所有对象a，除了`Object.create(null)`所创建的，都有`a instanceof Object === true`

- 判断数组还可以用`Array.isArray(xxx)`（如果你的浏览器支持ECMAScript 5的话，而在IE8及更早的版本中，不被支持`Array.isArray`）

用`instanceof Array`判断数组会有一个问题：

因为每一个页面都有它自己的全局上下文，包括Object、Array和其它内建类型。所以，当一个数组从一个iframe传递到另一个iframe的时候，`instanceof`将判定失败，因为这个数组是来自另一个iframe的Array对象的实例，这个Array对象与当前iframe的Array对象不是同一个。

#### 3、对象引用的解除

JavaScript有垃圾回收的功能，因此当你使用引用类型时，无需担心内存的分配。但最好在一个对象不再使用的时候将对它的引用解除，好让垃圾收集器对那块内存进行释放。解除对象引用的最佳手段是将对象变量置为null。下面是最常见的处理模式：

```
var obj = {};

// do something here

obj = null;
```

#### 4、原始封装类型

虽然bool、string、number三者都是原始类型，但它们也有方法（undefinded和null没有方法）。这是JavaScript语言为了让原始类型用起来和对象一样方便，提升使用的一致性体验而设计的。为了达到这个目的，JavaScript语言设计了原始封装类型`Boolean`、`String`、`Number`来对bool、string、number这三种原始类型进行内在处理。

当读取字符串、数字、布尔值的时候，原始封装类型将被自动创建。例如：

```
var name = 'paian';
var firstChar = name.charAt(0);
console.log(firstChar);
```

相当于:

```
var name = 'paian';
var temp = new String(name);
var firstChar = temp.charAt(0);
temp = null;
console.log(firstChar);
```

原始封装类型创建的对象在该语句之后随即被销毁。下一个语句如果又是要用到原始封装类型的情况，会重新实例化一个对象，让后在这句语句之后又销毁掉。

```
var name = 'dennis';
name.last = 'wu';

console.log(last); //undefined
```

相当于：

```
var name = 'dennis';
var temp = new String(name);
temp.last = 'wu';
temp = null;

var temp = new String(name);
console.log(temp.last);  //undefined
temp = null;
```

从中，你应该能够明白为什么不会报错，却又输出undefined的原因。

所以，虽然bool、string、number都有方法，但它们本身并不是对象，而只是在中间环节借助原始封装类型实现了那些方法而已。

另外，对于bool、string、number类型的值执行 `instanceof 原始封装类型`，也是返回false。因为临时对象只在值被读取时创建，而`instanceof`操作符并没有真正地读取任何值。

```
var name = 'paian';
var count = 10;
var flag = false;

console.log(name instanceof String);
console.log(count instanceof Number);
console.log(flag instanceof Boolean);
```

你也可以手动实例化原始封装类型，不过，用`typeof`判定它们的时候，将返回"object"。另外，`new Boolean(false)`因为是个对象，所以在进行条件判断的时候，总是会被判断成true。这些都是手动实例化原始封装类型所导致的负面影响，所以，你应该避免手动实例化原始封装类型。

#### 5、内建引用类型

`Object`

`Array`

`Function`

`Date`

`Error`

`RegExp`

可以通过`new`关键字来实例化每一种内建类型。

```
var a = new Object();
a.name = 'paian';
var b = new Array(1, 2, 3)
var sayHi = new Function("name", "alert('Hi, my name is ' + name)");
var d = new Date();
var e = new Error('a new error');
var f = new RegExp('\\d+', 'g');
```

一些内建引用类型还有字面量的形式，使用示例如下：

```
var a = {name: 'paian'};

var b = [1, 2, 3];

function sayHi(name){
    alert('Hi, my name is ' + name);
}

var f = /\d+/g;
```

用`new Function`创建的函数，没有什么好的调试方法，因为JavaScript调试器认不出这些函数，它们在程序里就好像黑盒一样。所以一般不建议这么做。不过，有时你不得不使用这种方法——例如，在函数的真实形式直到运行时才能确定的时候。

用`new RegExp`创建的正则表达式的时候，传入的pattern参数是一个字符串，所以你需要对任何反斜杠进行转义才行。除非你需要根据动态变量创建正则表达式，否则，其它情况建议一律采用字面量形式来声明正则表达式。

#### 6、访问属性

通过点号（.）或中括号（[]）。

区别在于用中括号的方式访问时，属性名中可以出现特殊字符。而点号方式通常更直观易读。




