---
layout:     post
title:      "变量的解构赋值——ES6学习笔记4"
subtitle:   ""
date:       2017-09-11 18:25:13
author:     "Paian"
catalog: true
tags:
    - ES6
    - 学习笔记
---
## 变量的解构赋值
——ES6学习笔记4

### 4.1 数组解构

```
let [a, b, c] = [1, 2, 3];
// a: 1
// b: 2
// c: 3

let [d, e, f] = [1, [2, 3, 4], 5];
// d: 1
// e: [2, 3, 4]
// f: 5

let [ , , g] = [1, 2, 3];
// g: 3

let [h, , i] = [7, 8, 9];
// h: 7
// i: 9

let [j, ...k] = [1, 2, 3, 4, 5, 6];
// j: 1
// k: [2, 3, 4, 5, 6]

let [l, m] = [1];
// l: 1
// m: undefined

let [o, ...p] = [1];
// o: 1
// p: []

let [q = 1] = [undefined];
// q: 1  默认值的判断条件是是否严格等于undefined
let [r = 1] = [null];
// r: null

function fn(){
   return 1;
}
let [s = fn()] = [undefined];
// s: 1

let [t = 1, u = t] = [2];
// u: 2
// t: 2

let [v = w, w = 1] = [];
//Uncaught ReferenceError: w is not defined
//给v设置默认值w时，w还未声明，所以报错
```

### 4.2 对象解构

```
let { b, c } = { a: 1, b: 2 };
// b: 2
// c: undefined
// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

let {d: f, e: g} = {d: 1, e: 2};
// f: 1
// g: 2

let { h, h: { i }, h: { i : { j } }  } = { h:
   {
       i: {
           j: 1,
           k: 2
       }
   }
};

let {l: n = 1, m: o} = {l: undefined, m: 2}; // 设默认值
// n: 1
// o: 2

let {max, min} = Math;
// max: Math.max
// min: Math.min

//由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let {0: first, [arr.length - 1]: last} = arr;
// first: 1
// last: 10
```

### 4.3 string、boolean、number的解构

```
let [s1, s2, s3] = 'hi!';
// s1: h
// s2: i
// s3: !
let {length: len} = 'hi!'
// len: 3

let {toString: toStr1} = 111;
toStr1 === Number.prototype.toString; // true

let {toString: toStr2} = true;
toStr2 === Boolean.prototype.toString; // true
```

### 4.4 函数参数的解构

```
function add([a, b]){
 return a + b;
}

add([100, 200]);//300

[[1, 2], [3, 4]].map(function([a, b]){
   return a + b;
});//[3, 7]
```

ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

### 4.5 解构的主要用途

（1）交换变量的值

```
let x = 1;
let y = 2;

[x, y] = [y, x];
```

上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。

（2）从函数返回多个值

因为函数只能返回一个值，若要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便。

```
// 返回一个数组

function example() {
 return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象
function example() {
 return {
   foo: 1,
   bar: 2
 };
}
let { foo, bar } = example();
```

（3）函数参数的定义

解构赋值可以方便地将一组参数与变量名对应起来。

```
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

（4）提取JSON数据

解构赋值对提取JSON对象中的数据，尤其有用。

let jsonData = {
 id: 42,
 status: "OK",
 data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
上面代码可以快速提取 JSON 数据的值。

（5）指定函数参数的默认值

```
function double(a = 10){
   return a * 2;
}
double();//20
```

指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

（6）遍历Map结构

任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
 console.log(key + ": " + value);
}
// first: hello
// second: world
如果只想获取键名，或者只想获取键值，可以写成下面这样。

// 获取键名
for (let [key] of map) {
 // ...
}

// 获取键值
for (let [,value] of map) {
 // ...
}

（7）批量引入模块的指定方法

加载模块时，往往需要指定引入哪些方法。解构赋值使得引入语句非常简洁清晰。

const { SourceMapConsumer, SourceNode } = require('source-map');