---
layout:     post
title:      "构造函数和原型对象——读《JavaScript面向对象精要》（四）"
subtitle:   ""
date:       2015-05-01 16:45:32
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 构造函数和原型对象——读《JavaScript面向对象精要》（四）

### 四、构造函数和原型对象

#### 1、构造函数

如果你想创建多个相同的对象，你可以创建自己的构造函数以及引用类型。构造函数应该首字母大写，以此来区分其它函数。

实际上，如果无需给构造函数传递参数，你甚至可以不写构造函数后面的括号，只是我们通常不这么做而已。

```
var person1 = new Person();
var person2 = new Person;  //功能与上一行是一样的
```

**即使构造函数并没有显式地返回任何东西，但是person1、person2的值都是一个新的Person类型的实例。这是为什么呢？**

**因为`new`操作符会自动创建给定类型的对象并返回它们。所以，构造函数本身并不需要一个返回值，`new`操作符会帮你返回。**

**你也可以在构造函数中显式地返回一个对象，它会代替新创建的对象实例返回。如果返回的值是一个原始类型，它会被忽略，新创建的对象实例会被返回。**

每个对象在创建时都会自动拥有一个构造函数属性，其中包含了一个指向其构造函数的引用。那些通过对象字面量形式或Object构造函数创建出来的泛用对象，它们的构造函数属性都指向Object。那些通过自定义构造函数创建出来的对象，其构造函数属性指向创建它们的构造函数。

```
console.log(person1.constructor === Person); //true
console.log(person2.constructor === Person); //true
```

虽然对象的实例与构造函数之间存在这样的关系，但是仍然建议你用`instanceof`来检查对象的类型，因为一个对象的`constructor`属性是可以被改写的，所以并不能保证类型判断完全准确。

你也可以在构造函数中用`Object.defineProperty`方法来帮助进行初始化：

```
function Person(){
    Object.defineProperty(this, 'name', {
        get: function(){
            return name;
        },
        set: function(value){
            name = value;
        },
        enumerable: true,
        configurable: true
    });

    this.sayName = function(){
        console.log(this.name);
    }
}
```

始终确保用`new`操作符来调用构造函数，否则你就在冒改变全局对象的风险，而不是创建一个新的对象。考虑如下代码发生了什么?

```
var person1 = Person('paian');
console.log(person1 instanceof Person); //false
console.log(typeof person1); //"undefined"
console.log(name); //"paian"
```

可见，因为没有用`new`调用构造函数，实际上并没有完成实例化，而是修改了window这个全局对象上的name属性！而`Person('paian')`也只是一个没有返回值的普通函数，所以person1是undefined。

在严格模式下，当你不通过`new`调用构造函数时，会出现错误“Uncaught TypeError: Cannot set property 'name' of undefined”。这是因为严格模式并没有为全局对象设置this。this保持为undefined，而当年为undefined添加属性时，就出现了这个错误。

构造函数允许你给对象配置同样的属性，但是构造函数并没有消除代码冗余。

```
function Person(){
    Object.defineProperty(this, 'name', {
        get: function(){
            return name;
        },
        set: function(value){
            name = value;
        },
        enumerable: true,
        configurable: true
    });

    this.sayName = function(){
        console.log(this.name);
    }
}
```

在上面这个例子中，每一个Person实例都将有一个自己的sayName方法，你有100个实例，就有100个这样的方法。如果所有的的对象能够共享一个方法，将会更有效率，该方法可以使用`this.name`访问到自己的数据。这就要用到原型对象。

#### 2、原型对象

几乎所有的函数（除了一些内建函数）都有一个名为prototype的属性，该属性是一个原型对象，用来创建新的对象实例。所有创建的对象实例共享该原型对象，且这些对象实例可以访问原型对象的属性。例如，`hasOwnProperty()`定义在Object的原型对象中，但却可以被任何对象当作自己的属性访问。

`'属性名' in 对象名`对于对象的自有属性和原型属性都会返回true。

你可以用这样一个函数来鉴别一个对象是否是原型对象：

```
function hasPrototypeProperty(obj, name){
    return name in obj && !Object.hasOwnProperty(name);
}
```

每一个函数都具有prototype属性，它定义了该构造函数创建的所有对象将会共享的属性。原型对象被保存在实例内部的[[Prototype]]属性中，这个属性是一个引用而不是一个副本。

#### 3、[[Prototype]]属性

##### 这里有个问题经常让人傻傻分不清楚，那就是——prototype、[[Prototype]]、__proto__三者到底是什么关系？！

**一个对象实例通过内部属性[[Prototype]]跟踪其原型对象。该对象是一个指向该实例使用的原型对象的指针。当你用`new`创建一个新的实例对象时，构造函数的原型对象（即构造函数的prototype属性）会被赋给该实例对象的[[Prototype]]内部属性。**

**大部分JavaScript引擎在所有对象上都支持一个名为`__proto__`的属性，该属性使得你可以直接读写[[]Prototype]]这一内部属性**。Firefox、Safari、Chrome和Node.js都支持该属性。

**这句话清晰地描述了实例对象的[[Prototype]]内部属性 与 构造函数的prototype属性之间的关系。而`__proto__`则只不过是浏览器对于[[Prototype]]这一内部属性提供的外部读写接口。**

你可以用`isPrototypeOf`来检查一个对象是否是另一个对象的原型对象。

```
function Person(name){
    this.name = name;
}
var obj = {};
var person1 = new Person('paian');

console.log(Person.prototype.isPrototypeOf(person1)); //true
console.log(Person.prototype.isPrototypeOf(obj));     //false
console.log(Object.prototype.isPrototypeOf(obj));     //true
```

**自有属性在表现上会覆盖同名的原型属性（实际上原型上的同名属性还是存在的，只是在实例对象中访问该属性时，优先显示的是自有属性而不会去查找同名原型属性而已），但当自有属性被删除时，同名的原型属性的效果又会显现出来。这说明一个道理，你无法在实例上给其原型属性赋值。`delete`操作符仅对自有属性起作用，你无法删除一个对象的原型属性。**

#### 4、在构造函数中使用原型对象

原型对象的共享机制使得它成为一次性为所有对象定义方法的理想手段。因为一个方法对所有的对象实例做相同的事情，没理由每个实例都要自己有一份自己的方法。

```
function Person(name){
    this.name = name;
}

Person.prototype.sayName = function(){
    console.log(this.name);
}

var person1 = new Person('paian');
var person2 = new Person('dennis');

person1.sayName();
person2.sayName();
```

在这个版本中，sayName被定义在原型对象上，而不是构造函数中。

**也可以在原型对象上存储其它类型的数据，但是，在存储引用值的时候，要注意，因为这些引用值会被多个实例所共享，所以一个实例中改变了这个值时，另一个实例中访问到的该值也会发生变化，而这，有时候可能并不是你所想要的。不过，在实例对象中试图设置一个原始类型的原型属性的值的时候，实际上并没有改变原型属性，而是定义了一个同名的自有属性，所以并不会影响到其它实例。**

```
function Person(name){
    this.name = name;
}

Person.prototype.country = 'China';
Person.prototype.favorites = [];

var person1 = new Person('paian');
var person2 = new Person('dennis');

person1.country = 'Korea';
person1.favorites.push('pizza');

console.log(person1.country); //"Korea"
console.log(person2.country); //"China"
delete person1.country; // true
console.log(person1.country); //"China"
console.log(person2.country); //"China"
console.log(person1.favorites); //["pizza"]
console.log(person2.favorites); //["pizza"]
```

虽然你可以在原型对象上一一添加属性，但是很多开发者会使用一种更简洁的方式：直接用一个对象字面形式替换原型对象，这种方式有一个好处就是不用多次键入`Person.prototype`，但是也有一个副作用：

当一个函数被创建时，它的prototype属性也会被创建，且该属性的constructor属性指向该函数。但是当使用对象字面形式改写Person.prototype时，其constructor属性被置为泛用对象Object。为了纠正这个问题，我们需要在使用字面形式改写原型对象时手动添加上constructor属性，并将其重置为Person。如下：

```
function Person(name){
    this.name = name;
}

Person.prototype = {
    constructor: Person,
    sayName: function(){
        console.log(this.name);
    },
    sayHi: function(){
        console.log('Hi!');
    }
}
```

为了避免重置constructor，我们通常将其放在第一个属性。

#### 5、改变原型对象

**当你在一个对象上使用`Object.seal(对象名)`和`Object.freeze(对象名)`的时候，受影响的只有自有属性。你仍然可以通过在原型对象上添加属性来扩展这些对象实例。**

**本质上说，[[prototype]]属性是对象的自有属性，是会被密封或冻结的，但是，[[prototype]]属性所指向的对象（原型对象），却并不会被密封或冻结。**

#### 6、内建对象的原型对象

修改内建对象来试验各种功能是好玩的事情，但是在生产环境中并不建议这么做。开发者们都期望一个内建对象具有一定的方法并表现出一定的行为。故意改变内建对象会破坏这种期望，导致其它开发者无法确定这些对象会如何工作。



