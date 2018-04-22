---
layout:     post
title:      "Javascript中的类型检测"
subtitle:   ""
date:       2010-11-02 20:33:35
author:     "Paian"
catalog: true
tags:
    - JavaScript
    - 类型检测
---

先来看JavaScript类型检测中常用到的一些方法：

### 一、typeof

typeof运算符，用于判断一个或值是哪种类型的。

由于Javascript语言的灵活性与执行环境的复杂性，typeof运算符并不能正确判断出所有的类型。但对于Boolean、Number、String、Undefined这四个类型，typeof可以准确地做出检测。

### 二、instanceof

instanceof可以检测某个对象是不是另一个对象的实例。

```
new String('abc') instanceof String; //true
```

由于继承的原因，子类的实例在用instanceof检测时，不仅可以检出其是子类的实例，还可以检出其是父类的实例。　

```
function Parent() {};
function Child() {};

Child.prototype = new Parent();

console.log(new Child() instanceof Child); // true
console.log(new Child() instanceof Parent); // true
```

由此可以看出，instanceof并不适合用来准确检测出一个对象本身的类型，只能检测出它是谁的一个实例。

### 三、Constructor

所有对象（值为null和undefined的变量除外）都拥有一个constructor属性，它指向该对象的构造函数。

对于复合数据类型，能否用constructor进行类型检测呢？比如像这样：

```
isArray: function(arr) {
  return !!arr && arr.constructor == Array;
}
```

答案是否定的。因为除了Number、String、Boolean类型的变量的`.constructor`是只读的之外，其它对象的`.constructor`是可以人为修改的。而且在一些极其特殊的情况下，会产生意外的结果。比如，下面这段代码中，数组的检测则出错了：

```
<script type="text/javascript">
  var iframe = document.createElement('iframe');
  var xArray;
  var arr;

  document.body.appendChild(iframe);
  xArray = window.frames[window.frames.length-1].Array;
  arr = new xArray(1, 2, 3); // [1,2,3]

  alert(arr instanceof Array); //false
</script>>
```

可见，constructor是不能用来进行类型检测的。

下面是Johg Resig 《pro javacript Techniques》书中的一张列表：

![](./construtor-results.png)

### 四、Duck Typing

在犀牛书里，提到一句老话："如果走路像鸭子，叫声像鸭子，那他就是鸭子"。换而言之，对于Array来说，如果一个对象有splice和join属性，那它就是一个Array:

```
function isArray(o) {
    return o != null && typeof o === 'object'
           'splice' in o && 'join' in o;
}
alert(isArray({'splice': '', 'join': ''})); // true
```

显然，鸭子检测很容易误把自造的天鹅也当成鸭子：


注：buck typing并不关注于类型，它关注的是行为，它是实际作用是相互之间约定一种行为接口，好实现类似于多态的调用。

### 五、`Object.prototype.toString.call`

  ECMA-262中是这么解释`Object.prototype.toString()`的：

  when the toString method is called,the following steps are taken:

  1.get the [[Class]] property of this object  //得到内部属性[[Class]]

  2.conpute a string value by concatenating the three strings "[object",Result(1),and"]" //构造一个字符串类型似于[object xxx]

  3.return results(2) //返回第2条的执行结果

  注：[[Class]]为对象的内部属性，无法真接访问到

这样，就有了：

```
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
```

因为是字符串比较，也就解决了环境问题和语法灵活性所带来的变化，因此比较稳定。

### 六、一个比较完整的JavaScript类型判断的实现

好，讲到现在，想必大家对javascript类型判断应该有一个较为深入的理解，我想通过自已的能力，应该也可以写一个比较完善的类型判断函数，那下面就来看一下我是如何实现的。

```
var is = function (obj,type) {
    var toString = Object.prototype.toString;

    var _fourBaseTypes = {
      'undefined':'undefined',
      'number':'number',
      'boolean':'boolean',
      'string':'string'
    };

    return (_fourBaseTypes[typeof obj] === type) ||
             (type === 'null' && obj === null)   ||
             (type ==='function' && 'object' === typeof document.getElementById ?
             /^\s*\bfunction\b/.test('' + obj) : toString.call(obj).slice(8,-1) === type) ||
             obj instanceof type;
};
```

注意下，如果`obj = function (){}`的话，则`'' + obj`输出的将会是`"function (){}"`，把函数转成了一个字符串。

`\b`匹配一个词的边界。一个词的边界就是一个词不被另外一个词跟随的位置或者不是另一个词汇字符前边的位置。注意，一个匹配的词的边界并不包含在匹配的内容中。换句话说，一个匹配的词的边界的内容的长度是0。

因为考虑到实用性，这里是通过传入对象obj和期望类型type，返回boolean值——obj为type类型，返回true；obj不为type类型返回false。

为什么要用`type === 'null' && obj === null`来判断null呢？因为null实际上属于Object类型，因此typeof null 和Object.prototype.toString(null)返回的结果都为object和[Object object]。

`(type==='function'&&'object'===typeof document.getElementById ? /^\s*\bfunction\b/.test(``+obj) : toString.call(obj).slice(8,-1)===type)`

这里实际上是在判断obj是否是一个函数，而IE6存在bug，无法正确识别getElementById这类函数，因此做了上些特殊的处理。

```
<!DOCTYPE HTML>
<html>
  <head>
    <title>typecheck.html</title>

    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

    <!--<link rel="stylesheet" type="text/css" href="./styles.css">-->
    <script type="text/javascript">
        var is = function (obj,type) {
          var toString = Object.prototype.toString;
          var _baseTypes = {'undefined':'undefined','number':'number','boolean':'boolean','string':'string'};
          return (_baseTypes[typeof obj]===type)||
                   (type === "Null" && obj === null) ||
                   (type==='Function'&&"object" === typeof document.getElementById ?
                      /^\s*\bfunction\b/.test("" + obj):toString.call(obj).slice(8,-1) === type)||
                 obj instanceof type;
        };

        window.onload = function(){
            var msg = document.getElementById("msg");
            function addMsg(m){
                msg.innerHTML+=m+"<br />";
            }

            //判断基本数据类型
            addMsg("1,number"+":"+is(1,'number'));
            addMsg("abc,string"+":"+is("abc","string"));
            addMsg("true,boolean"+":"+is(true,"boolean"));
            addMsg("undefined,undefined"+":"+is(undefined,'undefined'));
            //判断引用数据类型
            addMsg("null,Null"+":"+is(null,"Null"));
            addMsg("new String(''),String"+":"+is(new String(""),"String"));
            addMsg("{},Object"+":"+is({},"Object"));
            addMsg("[],Array"+":"+is([],"Array"));
            addMsg("/foo/,RegExp"+":"+is(/foo/,"RegExp"));
            try {0()} catch (e) {
                addMsg("try/catch(e),Error"+":"+is(e,"Error"));
            }
            addMsg("new Date(),Date"+":"+is(new Date(),"Date"));
            addMsg("new Number(123),Number"+":"+is(new Number(123),"Number"));
            addMsg("new Boolean(true),Boolean"+":"+is(new Boolean(true),"Boolean"));
            addMsg("function(){},Function"+":"+is(function(){},"Function"));

            function SubArray() {}
            SubArray.prototype = [];
            addMsg("SubArray,Array"+":"+is(new SubArray(),Array));
        }

    </script>
  </head>

  <body>
      <div id="msg"></div>
  </body>
</html>
```

兼容判断类型列表：

基本数据类型 undefined,string,number,boolean

复合数据类型 Date,String,Boolean,Number,Object,Function,Array,RegExp,Error

其它 instanceof 的范畴

转自：

http://www.cnblogs.com/fool/archive/2010/10/07/javascrpt.html（有改动）
