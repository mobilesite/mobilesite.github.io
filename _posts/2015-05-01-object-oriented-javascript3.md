---
layout:     post
title:      "理解对象——读《JavaScript面向对象精要》（三）"
subtitle:   ""
date:       2015-05-01 12:35:15
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 理解对象——读《JavaScript面向对象精要》（三）

### 三、理解对象

#### 1、定义属性

当一个属性被添加给对象时，JavaScript在对象上调用一个名为[[Put]]的内部方法。[[Put]]方法会在对象上创建一个新节点来保存属性。调用[[Put]]的结果是在该对象上创建了一个自有属性。一个自有属性表明仅仅该指定的实例上拥有该属性。当一个已有属性被赋予一个新值的时候，调用的是一个名为[[Set]]的内部方法。用对象字面量形式创建对象`var person1 = {name: 'paian'}`时，会隐式地调用[[Put]]内部方法。

#### 2、属性探测

为什么不建议采用对象名.属性名的形式呢？就像下面那样：

```
if(person1.age){
    // do something here
}
```

原因在于JavaScript的类型强制会影响这种判断方式的输出结果。当if判断语句中条件的值是一个对象、非空字符串、非零数字或者true时，判断为真；而当是一个null、undefined、0、false、NaN或空字符串时，被判断为假。例如，当`person1.age`为0的时候，虽然age属性存在，却仍然被判别为假。可见，对象名.属性名的判定形式，并不能准确判断出属性是否存在，不适合做属性探测。更好的办法是采用`in`操作符，即`'属性名' in 对象名`的方式。

```
if('age' in person1){
    // do something here
}
```

值得注意的是，`'属性名' in 对象名`的方式，不仅会检索自有属性，还会检索原型属性。如果你只想探测某个自有属性是否存在，可以使用`对象名.hasOwnProperty('属性名')`的方法。

#### 3、删除属性

设置一个属性的值为null并不能从对象中彻底删除那个属性。你需要使用`delete`操作符来彻底移除对象的一个属性。

`delete`操作符对单个对象属性调用名为[[Delete]]的内部方法。当delete成功的时候，返回true。注意某些属性无法被delete。

```
var person1 = {name: 'paian'};
console.log('name' in person1); //true
delete person1.name;
console.log('name' in person1); //false
console.log(person1.name);      //试图访问对象的一个不存在的属性，将返回undefined
```

#### 4、属性枚举

所有你添加的属性默认都是可枚举的，也就是说你可以用`for (xxx in yyy) {}`来循环遍历它们。可枚举属性的内部特征[[Enumerable]]都被设置为true。`for (xxx in yyy) {}`循环会枚举一个对象所有的可枚举属性并将属性名赋给一个变量。

ECMAScript 5中引入了`Object.keys()`方法，它可以获取可枚举属性的名字组成的数组。

实际上，对象的大部分原生属性的[[Enumerable]]特征都被设置为是false。你可以用`propertyIsEnumerable()`来检查一个属性是否可枚举。

```
var person1 = {
    name: 'paian'
};
console.log('name' in person1);                         //true
console.log(person1.propertyIsEnumerable('name'));      //true

var properties = Object.keys(person1);

console.log('length' in properties);                    //true
console.log(properties.propertyIsEnumerable('length')); //false
```

注意：

（1）`for (xxx in yyy) {}`会遍历所有可枚举属性，包括可枚举的自有属性以及可枚举的原型属性。但是`Object.keys()`只会返回可枚举的自有属性组成的数组。

（2）`for (xxx in yyy) {}`和`'属性名' in 对象名`不是一码事。`for (xxx in yyy) {}`是遍历所有可枚举的属性。而`'属性名' in 对象名`会查找所有的属性（包括不可枚举的），目的是判断对象是否包含某个属性，返回值是布尔类型。

#### 5、属性类型：数据属性和访问器属性

属性有两种类型：数据属性和访问器属性。数据属性包含一个值。[[Put]]方法的默认行为是创建数据属性。访问器属性不包含值，而是定义了一个当属性被读取时调用的函数（称为getter）和一个属性被写入时调用的函数（称为setter）。访问器属性仅需要getter或setter两者中的任意一个，当然也可以两者都有。在对象字面量中定义访问器属性有特殊的语法：

```
var person1 = {
    _name: 'paian',

    get name(){
        console.log('reading name');
        return this._name;
    },

    set name(value){
        console.log('setting name');
        this._name = value;
    }
};

console.log(person1.name);
person1.name = 'dennis';
```
如果你只是需要保存数据，通常没有什么理由需要使用访问器属性——直接使用属性本身即可。但当你希望赋值操作会触发一些行为或者读取的值需要通过计算所需的返回值得到时，访问器属性会非常有用。

getter和setter可以选择定义其中之一，也可以二者皆有。如果你只定义getter，该属性就变成只读，这在非严格模式下试图写入将失败，在严格模式下试图写入将报错。如果你只定义setter，该属性就变成只写，无论在严格模式下还是非严格模式下，试图读取都将失败。

#### 6、属性特征

在ECMAScript 5之前，没有办法指定一个属性是否可枚举。实际上根本没办法访问属性的任何内部特征。为了改变这一点，ECMAScript 5引入了多种方法来和属性特征直接互动，同时也引入了新的特征来支持额外的功能。现在你可以创建出和JavaScript内建属性一样的自定义属性。

##### （1）通过用特征

有两个属性特征是数据和访问器属性都具有的。一个是[[Enumerable]]，决定了你是否可以遍历该属性。另一个是[[Configurable]]，决定了该属性是否可配置。你可以用delete删除一个可配置的属性，或随时改变它。（这也意味着可配置属性的类型可以从数据类型变成访问器属性或相反）你声明的所有属性默认都是可枚举、可配置的。

如果你想改变属性特征，可以使用`Object.definePorperty()`方法。该方法接受三个参数：拥有该属性的对象、属性名和包含需要设置的特征的属性描述对象。属性描述对象具有和内部特征同名的属性，但名字中不包含中括号。所以你可以用enumerable属性来设置[[Enumerable]]特征，用configurable属性来设置[[Configurable]]特征。

```
var person1 = {
    name: 'paian'
};
Object.defineProperty(person1, 'name', {
    enumerable: false
});
console.log('name' in person1); //true
console.log(person1.propertyIsEnumerable('name')); //false

var properties = Object.keys(person1);
console.log(properties.length); //0

Object.defineProperty(person1, 'name', {
    configurable: false
});

delete person1.name;
console.log('name' in person1);    //true
console.log(person1.name);         //paian
Object.defineProperty(person1, 'name', {
    configurable: true
})                                 //Uncaught TypeError: Cannot redefine property: name
```
configurable为false的属性不可删除（delete），也不可将其configurable更改为true。
当JavaScript运行在严格模式，试图删除一个不可配置的属性将导致错误。而非严格模式下则将会失败。

##### （2）数据属性特征

数据属性拥有两个访问器属性不具备的特征。第一个是[[Value]]，包含属性的值。当你在对象上创建属性时，该特征被自动赋值。所有属性的值都保存在[[Value]]上，哪怕该值是一个函数。第二个特征是[[Writeable]]，该特征是一个布尔值，指示该属性是否可写入。所有的属性默认都是可写的，除非你指定为不可写。
当`Object.defineProperty`被调用时，它首先检查属性是否存在。如果不存在，将根据属性描述对象指定的特征创建。

当你用`Object.defineProperty`定义新的属性时，一定记得为所有的特征指定一个值，否则布尔型的特征会被默认为false。

例如，下面这样创建的name属性将是不可枚举、不可配置、不可写的。

```
var person1 = {};
Object.defineProperty(person1, 'name', {
    value: 'paian'
});
```

当你用`Object.defineProperty`改变一个已有的属性时，只有你指定的特征会被改变。

在严格模式下，试图改变不可写的属性会抛出错误，而在非严格模式下则会失败。

（3）访问器属性特征

访问器属性也有两个额外特征。访问器属性不需要存储值，因此也就没有[[Value]]和[[Writable]]。取而代之的是[[Get]]和[[Set]]，内含getter和setter函数。和对象字面形式的getter和setter一样，仅需要定义其中一个特征就可以创建一个访问器属性。

```
var person1 = {
    _name: 'paian'
};
Object.defineProperty(person1, name, {
    get: function(){
        console.log('reading me');
        return this._name;
    },
    set: function(value){
        console.log('setting name to %s', value);
        this._name = value;
    },
    enumerable: true,
    configurable: true
});
```

当然，你也可以像下面一样创建一个不可配置、不可枚举、不可写的属性。

```
var person1 = {
    _name: 'paian'
};
Object.defineProperty(person1, name, {
    get: function(){
        console.log('reading me');
        return this._name;
    }
});
```

如果你试图创建一个同时具有数据特征和访问器特征的属性，将会出错。

使用访问器属性特征比使用对象字面形式定义访问其属性的优势在于，你可以为已有的对象定义这些属性。如果你想要用对象字面形式，你只能在创建对象时定义访问器属性。

在严格模式下试图写入没有setter的访问器属性会抛出错误，在非严格模式下会失败。试图读取一个没有getter的访问器属性则总是返回undefined。

总结来说，就是数据属性和访问器属性都各有4个特征。数据属性和访问器属性都有的特征是：[[Enumerable]]和[[Configurable]]特征。此外，数据属性还有[[value]]和[Writable]]两个特征，而访问器属性则还有[[Get]]和[[Set]]两个特征。

（4）定义多重属性

如果你使用`Object.defineProperties()`而不是`Object.defineProperty()`，可以为一个对象同时定义多个属性。这个方法接受两个参数：需要改变的对象和一个包含所有属性信息的对象。后者可以被看作一个hash表，键是属性名，值是为该属性定义特征的属性描述对象。

```
var person1 = {};

Object.defineProperties(person1, {
    _name: {
        value: 'paian',
        enumerable: true,
        configurable: true,
        writable: true
    },
    name: {
        get: function(){
            console.log('reading name')
            return this._name;
        },
        set: function(value){
            console.log('setting name to %s', value);
            this._name = value;
        },
        enumerable: true,
        configurable: true
    }
})
```

（5）获取属性特征

用`Object.getOwnPropertyDescriptor()`方法。正如其名，这个方法可用于自身属性。它接受两个参数：对象和属性名。如果该属性存在，将会返回一个属性描述对象，内含4个属性：configurable和enumerable，另外两个属性根据属性类型是数据属性还是访问器属性来决定。

#### 7、禁止修改对象

对象和属性一样具有指导其行为的内部特征。其中，[[Extensible]]是一个布尔值，它指明该对象本身是否可以被修改。你创建的所有对象默认都是可扩展的，意味着新的属性可以随时被添加。设置[[Extensible]]为false时，你就能禁止新属性的添加。有下列三种方法可以帮助你锁定对象的属性：

##### (1) 禁止扩展

用`Object.preventExtensions(对象名)`来让你个对象不可扩展。一旦你在一个对象上使用该方法，就永远不能给这个对象添加新的属性了。可以用`Object.isExtensible(对象名)`来检查一个对象的[[Extensible]]的值。

```
var person1 = {
    name: 'paian'
};

console.log(Object.isExtensible(person1));  //true
Object.preventExtensions(person1);
console.log(Object.isExtensible(person1));  //false

person1.sayName = function(){
    console.log(this.name);
}
console.log('sayName' in person1);          //false
```

在严格模式下试图给一个不可扩展对象添加属性会抛出错误，而在非严格模式下则会失败。应该对不可扩展对象使用严格模式，这样，当一个不可扩展对象被错误使用的时候就会抛出错误进行提示。

##### （2）对象封印

可以用`Object.seal(对象名)`来封印一个对象。该方法被调用时，该对象的[[Extensible]]特征值被置为false，该对象所有属性的[[Configurable]]特征也被置为false。用`Object.isExtensible(对象名)`来判断一个被封印的对象时，返回的是false。可以用`Object.isSealed(对象名)`来检查一个对象是否被封印。

一个被封印的对象是不可扩展的，且其所有属性都不可配置。这意味着不仅不能给它添加新属性，而且不能删除属性，也不能改变属性的类型（从数据属性变成访问器属性或相反）。如果一个对象被封印，你只能读或者写入该属性的值。

确保被封印对象使用严格模式，这样当有人误用该对象时，会得到错误提示。

##### （3）对象冻结

用`Object.freeze(对象名)`来冻结一个对象。用`Object.isFrozen(对象名)`来判断一个对象是否被冻结。

如果一个对象被冻结，则不能在其上添加或删除属性，不能改变其属性的类型，也不能写入任何数据属性的值。简而言之，被冻结对象是一个数据属性都为只读的被封印对象。被冻结的对象无法解冻。

被冻结对象是不可扩展的，也是被封印的。所以用`Object.isExtensible(对象名)`来判断一个被封印的对象时，返回的是false，用`Object.isSealed(对象名)`来检查它时，返回的是true。

被冻结对象仅仅只是对象在某个时间点上的快照。其用途有限且极少被使用。和所有不可扩展对象一样，应该对被冻结对象使用严格模式。

