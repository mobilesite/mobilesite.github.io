---
layout:     post
title:      "函数——读《JavaScript面向对象精要》（二）"
subtitle:   ""
date:       2015-05-01 10:22:31
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 函数——读《JavaScript面向对象精要》（二）

在JavaScript中，函数其实就是一种对象。使函数不同于其他对象的决定性特点是函数有一个被成为[[call]]的内部属性。内部属性无法通过代码进行访问，而是定义了代码执行时的行为。ECMAScript为JavaScript的对象定义了多种内部属性，这些内部对象都用双重中括号来标注。[[call]]内部属性是函数所独有的，表明该对象可以被执行。ECMAScript定义`typeof`操作符对任何具有[[call]]内部属性的对象都返回"function"。

### 二、函数

#### 1、函数声明与函数表达式

函数有两种字面形式：函数声明和函数表达式。

```
//函数声明
function add(num1, num2) {
    return num1 + num2;
}
```

```
//函数表达式
var add = function(num1, num2) {
    return num1 + num2;
}
```

两者的区别在于：

函数声明会被提升至上下文（要么是该函数被声明时所在函数（若有）的范围，要么是全局范围）的顶部。这意味着你可以把使用函数的语句写在前面，而把函数声明语句写在后面。但是，对于函数表达式而言，其实它可以拆解成两部分，一部分是声明变量，另一部分是赋值（把一个函数赋值给一个变量）。对于函数表达式而言，变量声明是会提升的，但是变量的赋值并不会被提升。所以，必须保证函数表达式语句在使用该函数的语句的前面才行。

#### 2、函数也是一种值

在JavaScript中，函数其实就是一种对象。你可以像使用对象一样使用函数，你可以将函数赋值给变量，也可以在对象中添加它们，还可以将它们当作参数传给别的函数，或者从别的函数中`return`出来。基本上你可以使用引用值的地方，也都可以使用函数。这使得JavaScript的函数威力无穷。

#### 3、函数的参数个数与length属性、arguments

JavaScript函数的另一个独特之处在于，你可以给函数传递任意数量的参数而不造成错误。因为函数参数实际上被保存在一个被称为arguments的类数组对象中。arguments可以自由增长以包含任意个数的值。arguments对象自动存在于函数中。也就是说，函数的命名参数不过是为了方便，并不真的限制了该函数可接受参数的个数。

注意：arguments是个类数组，它有length属性，但它并不是真正的数组，所以`Array.isArray(arguments)`返回的是false。

另一方面，JavaScript也没有忽视那些命名参数。函数期望的参数个数保存在函数的length属性中。例如：

```
function abc(a, b, c, d){

}
abc.length; // 4
```

还记得吗？函数是一种对象，所以，它当然可以有属性。

总结一下就是函数的length属性反应的是函数定义时函数的命名参数的个数。而函数中`arguments.length`反应的则是函数被调用是实际传入的参数个数。

在某些你不知道参数会有多少个的情况下，arguments甚至会比命名参数更加有效。例如：

```
function sum(){
    var result = 0;
    var i = 0;
    var len = arguments.length;

    while(i < len){
        result += arguments[i];
        i++;
    }

    return result;
}
```

#### 4、重载

在JavaScript中，同一个作用域内，前后声明两个或多个同名的函数，最后一个会覆盖掉前面所有的。原因也很简单，JavaScript中的函数本质上是对象，试想，你对一个同名对象赋值多遍，最后该变量的取值以哪次的赋值为准？当然是最后一次，前面的都被覆盖掉了。

JavaScript中可以通过对`arguments.length`的判断来决定走函数体的哪个分支，也可以通过某个命名参数是否未定义或者某个命名参数的类型来决定走函数体的不同分支，从而模拟实现重载效果。

#### 5、对象的方法与this

对象的方法其实就是一个值为函数的属性。例如：

```
var person = {
    name: 'paian',
    sayName: function(){
        console.log(person.name)
    }
}
```

我们注意到，方法中又用了`person.name`，虽然功能可以实现，但这使得方法与对象名之间产生了紧耦合。首先，如果你改变变量名person的时候，这里也得跟着变。其次，这种紧耦合使得同一个方法很难被不同对象使用。所以，我们应该把`person.name`改成`this.name`，并在此基础上可以把`sayName`方法提取出来，让不同对象共用。

```
function sayName(){
    console.log(this.name);
}

var person1 = {
    name: 'paian',
    sayName: sayName
}

var person2 = {
    name: 'dennis',
    sayName: sayName
}

person1.sayName();
person2.sayName();
```

#### 6、改变函数this的三个函数方法

因为函数是一种对象，对象可以有方法，所以函数也可以有方法。下面介绍三种改变函数this的方法：

`call()`、`apply()`、`bind()`。

`call()`、`apply()`两者已经非常常见了，不再赘述。

`bind()`的第一个参数是要传递给新函数的this的值，其它所有参数代表需要被永久设置在新函数中的命名参数。你可以在之后调用时继续设置任何非永久参数。




