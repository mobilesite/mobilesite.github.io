---
layout:     post
title:      "继承——读《JavaScript面向对象精要》（五）"
subtitle:   ""
date:       2015-05-01 16:45:32
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 继承——读《JavaScript面向对象精要》（五）

### 五、继承

继承：一个新创建的对象和另一个对象拥有同样的特性，而无需显式地复制其功能。

#### 1、原型对象链和Object.prototype

所有对象，都自动继承自`Object`（更确切地说，是继承自`Object.prototype`），除非你另有指定。任何以字面形式定义的对象，其[[Prototype]]都指向`Object.prototype`。

```
var book = {
    price: 100
}
var pro = Object.getPrototypeOf(book);
console.log(pro === Object.prototype); //true
```

继承自`Object.prototype`的方法：

|属性名|功能|
|:--:|:--:|
|`hasOwnProperty()`|检查是否存在一个给定名字的自有属性|
|`propertyIsEnumerable()`|检查一个自有属性是否可枚举|
|`isPrototypeOf()`|检查一个对象是否是另一个对象的原型对象|
|`valueOf()`|返回一个对象的值表达。当一个操作符被用于一个对象时，就会调用`valueOf()`方法。`valueOf()`默认返回对象实例本身。原始封装类型重写了`valueOf()`以使得它对String返回一个字符串，对Boolean返回一个布尔值，对Number返回一个数字。类似地，Date对象的`valueOf()`方法返回一个epoch时间，单位是毫秒（正如`Date.prototype.getTime()`所为）。这允许你写出下列代码来对Date做比较。`var now = new Date(); var earlier = new Date(2010, 1, 1); console.log(now > earlier); //true`。你甚至可以将两个Date相减来获得时间差。如果你的对象也想这样使用操作符，你也可以给对象定义自己的`valueOf()`方法。|
|`toString()`|返回一个对象的字符串表达。一旦`valueOf()`返回的是一个引用而不是一个原始值的时候，就会回退调用`toString()`方法。另外，当JavaScript期望一个字符串的时候，也会对原始值隐式地调用`toString()`。例如，当加号运算符的一边是一个字符串，另一边是个其它类型的原始值时，则这个原始值会调用`toString()`转成字符串。如果另一边是个引用值，则会先调用`valueOf()`，如果返回的是引用值，则继续调用`toString()`。|

#### 2、继承

##### （1）对象继承

对象继承是最简单的继承类型，你唯一需要做的就是指定哪个对象是新对象的[[Prototype]]。对象字面量形式会隐式地指定`Object.prototype`为其[[Prototype]]，你也可以用`Object.create()`方法显式指定。

```
var person1 = {
    name: 'paian',
    sayName: function(){
        console.log(this.name);
    }
};

var person2 = Object.create(person1, {
    name: {
        configuration: true,
        enumerable: true,
        value: 'dennis',
        writable: true
    }
});
```

也可以通过`Object.create(null)`创建一个[[prototype]]为null的对象。这样创建的对象，将不会有`valueOf`、`hasOwnProperty`等方法。这是一个没有任何预定义属性的白板，这使得它成为一个完美的哈希容器，除此之外，这种对象应该没有别的好用处了。

##### （2）构造函数继承

```
function Rectangle(length, width){
    this.length = length;
    this.width = width;
}
Rectangle.prototype = {
    constructor: Rectangle,
    getArea: function(){
        return this.length * this.width; 
    }
}

function Square(size){
    Rectangle.call(this, size, size); //用call、apply这样的方法在子类中窃取调用父类的构造函数，从而继承属性

    // 在这里可以添加新的属性或者覆盖父类中某些属性的值
}

//修改构造函数的原型对象为一个 `Object.create` 创建的显式地指定了原型对象为`Rectangle.prototype`的对象，并修正了constructor重新指回本构造函数。
Square.prototype = Object.create(Rectangle.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
//在构造函数的原型上扩展方法
Square.prototype.toString = function(){
    return '[Square: ' + this.length + 'x' + this.width + ']';
};

var square = new Square(6);
console.log(square.length, square.width, square.getArea());
```

由于这种做法模仿了基于类的语言的类继承，所以通常被称作伪类继承。

通过将构造函数的prototype属性设置为某一个对象，就建立自定义类型对象与该对象的继承关系，但是这只适合继承对象的方法，不适合继承对象的自有属性。为了继承对象的自有属性，需要使用call或apply方法在子类中窃取调用父类的构造函数来完成一些初始化的工作。



