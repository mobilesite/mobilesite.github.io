---
layout:     post
title:      "对象模式——读《JavaScript面向对象精要》（六）"
subtitle:   ""
date:       2015-05-01 16:45:32
author:     "Paian"
catalog: true
tags:
    - 面向对象
    - 读书笔记
---

## 对象模式——读《JavaScript面向对象精要》（六）

### 六、对象模式（object patters）

#### 1、模块模式

模块模式的基本格式：

```
var yourObject = (function(){
    // private data variables

    return {
        // public methods and properties
    }
}())
```

该模式创建了一个匿名函数，然后立即执行。意味着这个函数只存在于被调用的瞬间，一旦执行后立即就被销毁了。IIFE是JavaScript中一种非常流行的模式，部分原因就在于它在模块模式中的应用。

模块模式允许你使用普通变量作为非公有对象属性。通过创建闭包函数作为所返回对象的方法来操作这些私有属性的。闭包函数就是一个可以访问其作用域外部数据的普通函数。

```
var person = (function(){
    var age = 25;

    return {
        name: 'paian',
        getAge: function(){
            return age;
        },
        growOlder: function(){
            age++;
        }
    }
})
```

大概的意思就是对外抛出一部分可以公开的资源和抛出一些可以操作内部资源的接口，而不是将所有资源都暴露出去。

模块模式还有一个变种叫做暴露模块模式，它将所有的变量和方法都组织在IIFE的顶部，然后将他们作为属性设置到被返回的对象上。有人更喜欢这种方式，因为它保证所有的变量和函数都声明在一起。

```
var person = (function(){
    var age = 25;

    function getAge(){
        return age;
    }

    function growOlder(){
        age++;
    }

    return {
        name: 'paian',
        getAge: getAge,
        growOlder: growOlder
    }
})
```

#### 2、构造函数的私有成员

上面的模块模式可以解决单个对象的私有属性问题，那么，如果我们要批量创建具有私有属性的对象，就需要涉及到构造函数的私有成员的问题了。

```
function Person(name){
    var age = 25;

    this.name = name;

    this.getAge = function(){
        return age;
    }

    this.growOlder = function(){
        age++;
    }
}

var person1 = new Person('paian');
var person2 = new Person('dennis');
person1.getAge(); //25
person2.getAge(); //25
person1.growOlder(); 
person1.getAge(); //26
person2.getAge(); //25
```

上面的例子中，Person构造函数有一个本地变量age，而且getAge、growOlder方法也是每个实例独有一份。在前面我们介绍过，实际上将方法直接放在实例上不如放在原型对象上让各个实力共享，但是这里之所以不能放在原型对象上，是为了读取到age。通过这样的处理，我们会发现，每个对象都有一份自己的age，互不影响，并且age是私有的。

那如果你需要所有实例都共享的私有数据应该怎么处理呢？

可以结合模块模式和构造函数。

```
var Person = (function(){
    var age = 25;

    function InnerPerson(name){
        this.name = name;
    }

    InnerPerson.prototype.getAge = function(){
        return age;
    }

    InnerPerson.prototype.growOlder = function(){
        age++;
    }

    return InnerPerson;
}())

var person1 = new Person('paian');
var person2 = new Person('dennis');
person1.getAge(); //25
person2.getAge(); //25
person1.growOlder(); 
person1.getAge(); //26
person2.getAge(); //26
```

很神奇，现在所有实例都共享了同一个age，当一个实例的age发生变化时，另一个实例的age也变化了。

这个例子与上一个例子的细微差别，值得仔细体会！

#### 3、混入

JavaScript大量使用伪类继承和原型继承，还有另一种伪继承的手段叫做混入。一个对象在不改变源性对象链的情况下得到另一个对象的属性，称为混入。第一个对象（接收者）通过直接复制第二个对象（提供者）的属性，从而获得了这个属性。下面是传统的利用函数的混入：

```
function mixin(receiver, supplier){
    for(var property in supplier){
        if(supplier.hasOwnProperty(property)){
            receiver[property] = supplier[property];
        }
    }
}
```

记住，这是浅拷贝，如果属性所指向的是一个引用类型，那么提供者和接收者的该属性都将指向同一个对象。

混入相比于伪类继承的好处在于，混入后创建的对象实例，用instanceof操作符判断时，它并不会成为提供者的实例。也就是说，和继承不同，混入让你在创建实例后无法检查其来源。请比较下面两段代码：

```
function Person(name){
    this.name = name;
}

Person.prototype = Object.create(EventTarget.prototype);
Person.prototype.constructor = Person;

Person.prototype.sayName = function(){
    console.log(this.name);
    this.fire({type: 'namesaid', name: name})
}

var person = new Person('paian');
console.log(person instanceof Person);      //true
console.log(person instanceof EventTarget); //true
```

```
function Person(name){
    this.name = name;
}

mixin(Person.prototype, new EventTarget());
mixin(Person.prototype, {
    constructor: Person,
    sayName: function(){
        console.log(this.name);
        this.fire({type: 'namesaid', name: name})
    }
})
console.log(person instanceof Person);      //true
console.log(person instanceof EventTarget); //false，注意不同之处体现在这里
```

person的确应该不是EventTarget的实例更加合理一些。

不过，使用混入时需要注意一件事情，那就是提供者的访问器属性在混入后到接收者那里变成了数据属性，这是因为，接收者的属性是通过赋值语句而不是`Object.defineProperty`创建。

```
var person = mixin(new EventTarget(), {
    get name(){
        return 'paian'
    },
    sayName: function(){
        console.log(this.name);
        this.fire({type: "namesaid", name: name})
    }
})

console.log(person.name); //"paian"
person.name = 'dennis';
console.log(person.name); //"dennis"
```

可见，本来提供者所提供的name是访问器属性，这里只有get，是只读的属性，在接收之后因为变成的数据属性，所以从不可写变成可写的了。为了纠正这个问题，应该给mixin函数进行修改，改成如下：

```
function mixin(receiver, supplier){
    Object.keys(supplier).forEach(function(property){
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        Object.defineProperty(receiver, property, descriptor);
    })

    return receiver;
}
```

当然，这个版本的mixin只能在ECMAScript 5版本下工作，如果需要兼容更早的版本，可以像如下这样做兼容：

```
function mixin(receiver, supplier){
    if(Object.getOwnPropertyDescriptor){
        Object.keys(supplier).forEach(function(property){
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
            Object.defineProperty(receiver, property, descriptor);
        })
    } else {
        //注意，因为ECMAScript 5以下版本，根本就不支持访问器属性，所以就无需对访问器属性做特别处理了
        Object.keys(supplier).forEach(function(property){
            var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
            Object.defineProperty(receiver, property, descriptor);
        })
    }

    return receiver;
}
```

注意，`Object.keys`只会混入可枚举属性，如果你想把提供者的不可枚举属性也混入进来，可以使用`Object.getOwnPropertyNames()`来代替。

#### 4、作用域安全的构造函数

构造函数也是函数，所以不用`new`操作符来调用它们的时候，它们也会执行。在非严格模式下，this强制指向全局对象，所以不用`new`操作符调用构造函数，会导致全局对象下的属性被错误地修改。而在严格模式下，这样调用会产生错误。

**但是，很多内建构造函数，例如Object、Array、RegExp、Error等等，它们不用`new`操作符调用，也能正常工作，这是为什么呢？**

**因为它们都是作用域安全的构造函数。因为用`new`操作符调用一个函数时，this指向的对象已经属于构造函数所代表的自定义类型。也就是说，可以在构造函数内用`this instanceof 构造函数名`来判断当前调用构造函数时，有没有使用`new`操作符。**

```
function Person(name){
    if(this instanceof Person){
        //called with new
        this.name = name;
    } else {
        //called without new
        return new Person(name); //递归调用构造函数，用`new`操作符创建实例
    }
}

var person1 = new Person('paian');
var person2 = Person('dennis');
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
```

这样就完成了一个作于域安全的函数。
