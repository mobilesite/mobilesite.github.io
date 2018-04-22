---
layout:     post
title:      "[译]那些你不知道的JavaScript"
subtitle:   ""
date:       2014-07-02 20:21:56
author:     "Paian"
catalog: true
tags:
    - JavaScript
---

### ```var a = 1+"2"+3+"4"``` 和 ```var b = 1+2+3+"4"```, a和b值分别是多少

答案:

'1234' 和 '64'

### 看看下面这段代码,alert的内容是什么?

    var foo = 1;
    function bar() {
        foo = 10;
        return;
        function foo() {}
    }
    bar();
    alert(foo);

答案:

1


为什么是1呢? ```bar()```执行时候,函数提升到了bar内部的最顶端,相当于在bar函数内部定义了一个局部变量foo,然后再用foo=10去改写foo的值,因为foo是bar函数内部的局部变量,在外部是无法引用的。所以,alert出来的是外部的变量foo的值,即1。

### 看下面这段代码的alert值是什么?

```
function bar() {
    return foo;
    foo = 10;
    function foo() {}
    var foo = 11;
}
alert(typeof bar());
```

答案:

因为变量提升会比函数提升提升得更前,所以应该alert的是function

### 看看下面的执行结果是什么?

    var x = 3;

    var foo = {
        x: 2,
        baz: {
            x: 1,
            bar: function() {
                return this.x;
            }
        }
    }

    var go = foo.baz.bar;

    alert(go());
    alert(foo.baz.bar());

答案:

3

1

```go()```相当于```window.go()```,所以```this```就是```window```,所以是3。另外那个调用的时候```this```是```foo.baz```,所以```this.x```就是```foo.baz.x```,即为1。

### 再看看下面alert的是什么内容?

    var x   = 4,
        obj = {
            x: 3,
            bar: function() {
                var x = 2;
                setTimeout(function() {
                    var x = 1;
                    alert(this.x);
                }, 1000);
            }
        };
    obj.bar();

答案:

4

这里你需要知道,```setTimeout```内部```this```是window就可以了。

### 下面alert值是多少?

    function foo(a) {
        alert(arguments.length);
    }
    foo(1, 2, 3);

答案:

3

### 下面alert结果是什么?

    var foo = function bar() {};
    alert(typeof bar);

答案:

undefined

### 再看下面结果是多少?


    var arr = [];
    arr[0]  = 'a';
    arr[1]  = 'b';
    arr.foo = 'c';
    alert(arr.length);

答案:

2

### 再来一个看看结果是多少?

    function foo(a) {
        arguments[0] = 2;
        alert(a);
    }
    foo(1);

答案:

2

### 最后一个

    function foo(){}
    delete foo.length;
    alert(typeof foo.length);

首先,你需要知道function的length属性为0。

其次,来看看```delete```的用法:

#### 对象属性删除

    function fun(){

    this.name = 'mm';

    }

    var obj = new fun();

    console.log(obj.name);//mm

    delete obj.name;

    console.log(obj.name); //undefined

#### 变量删除

    var name = 'lily';
    delete name;
    console.log(name); //lily

    直接用delelte删除不了变量

#### 删除不了原型链中的变量

    fun.prototype.age = 18;
    delete obj.age;
    console.log(obj.age) //18

所以,```foo.length```也是删除不掉的,仍然是0。

翻译自[http://davidshariff.com/quiz/](http://davidshariff.com/quiz/),加上了自己的理解分析,并进行了整理删减。







