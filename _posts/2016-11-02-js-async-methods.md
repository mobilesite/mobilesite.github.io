---
layout:     post
title:      "JavaScript异步编程方法及其演进"
subtitle:   ""
date:       2016-11-02 23:12:52
author:     "Paian"
catalog: true
tags:
    - JavaScript异步编程
---

## JavaSript异步编程方法及其演进

JavaSript异步编程走到今天，已经有好多种方法。但是，为什么会有这么多种方法呢？从原始的回调函数到简洁的async，一步步都是基于什么原因演进过来的呢？或者说，他们都带来了哪些进步？这个长文将逐一梳理。如果你只想知道结论，直接看文章最后的表格即可。

### 一、回调函数

假设有两个回调函数a、b，后者等待前者的执行结果。

按照同步的方法是这么写：

```
function a() {
  //codes for  function a goes here
};

function b() {
  //codes for  function b goes here
}

a();
b();
```

如果改成回调函数的异步写法，应该是：

```
function a(callback) {
  setTimeout (function() {
    //codes for  function a goes here
    callback();
  }, 3000)
}

function b(){
  //codes for  function b goes here
}

a(b);
```

这样，就把耗时的a任务的执行给放到回调里面了，而b任务的执行也同样会保证在a任务之后。只不过，a、b任务之后的其它任务就不必再等待a、b任务执行完之后才开始执行了。这样一来就成功把耗时的操作推迟执行了。

这种回调函数的优点是简单、容易理解和部署。缺点是不利于代码的阅读和维护，各个部分之间高度耦合（Coupling），流程会很混乱，而且每个任务只能指定一个回调函数。

### 二、事件监听、发布/订阅

除了回调函数之外，另一种方式采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。同样以上面的a、b函数为例。我们采用自定义事件进行演示。

```
/*
*
* @param {Object} eventTarget - 自定义事件控制对象
* @param {String} eventType - 事件类型
* @param {Function} eventHandler - 事件处理函数
**/
function a(eventTarget, eventType, eventHandler) {
  setTimeout (function() {
    //codes for function a goes here
    var data = {
      'msg' : 'done fired!'
    };
    console.log('a');

    //进行事件的绑定、触发和销毁
    eventTarget.addHandler(eventType, eventHandler);
    eventTarget.fire({type: eventType, data: data});
    eventTarget.removeHandler(eventType, eventHandler);
  }, 1000)
}

/*
*
* @param {Object} event - 事件对象
**/
function b(event) {
  //codes for function b goes here
  console.log('b', event.data.msg);
}

target = new EventTarget();
a(target, 'none', b);
```
这种方法的优点是比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且可以"去耦合"（Decoupling），有利于实现模块化。缺点是整个程序都要变成事件驱动型，运行流程会变得很不清晰。

这里的"事件"，完全可以理解成"信号"。我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。

### 三、Promise对象

Promise对象是CommonJS工作组提出的一种规范，目的是为异步编程提供统一接口。

简单说，它的思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。比如：

```
a().then(b);
```

a要进行如下改写（这里使用的是jQuery的实现）：

```
function a(){
  var dfd = $.Deferred();
  setTimeout(function () {
    // a的任务代码
    dfd.resolve();
  }, 500);
  return dfd.promise;
}
```

这样写的优点在于，回调函数变成了链式写法，程序的流程可以看得很清楚，而且有一整套的配套方法，可以实现许多强大的功能。比如，指定多个回调函数 以及 指定发生错误时的回调函数：

```
f1().then(f2).then(f3);
f1().then(f2).fail(f3);
```

而且，它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。

但是，Promise的写法只是回调函数的改进，使用then()之后，异步任务的两段执行看得更清楚，除此之外并无新意。撇开优点，Promise的最大问题就是代码冗余，原来的任务被Promise包装一下，不管什么操作，一眼看上去都是一堆then()，原本的语意变得很不清楚。

下面是一个Promise模块的实现例子：

```
var fs = require('fs');

var readFile = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
        })
    })
};

module.export = readFile;
```

### 四、Generator

#### 1、协程

在引入generator之前，先介绍一下什么叫 协程。

所谓 "协程"，就是多个线程相互协作，完成异步任务。协程有点像函数，又有点像线程。其运行流程大致如下：

第一步： 协程A开始执行

第二步：协程A执行到一半，暂停，执行权转移到协程B

第三步：一段时间后，协程B交还执行权

第四步：协程A恢复执行

```
function asyncJob() {
    // ... 其他代码
    var f = yield readFile(fileA);
    // ... 其他代码
}
```

上面的asyncJob()就是一个协程，它的奥妙就在于其中的yield命令。它表示执行到此处执行权交给其它协程，换而言之，yield就是异步两个阶段的分界线。

协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点就是代码的写法非常像同步操作，如果除去 yield命令，简直一模一样。

#### 2、Generator函数

Generator函数是协程在ES6中的实现，最大的特点就是可以交出函数的执行权（即暂停执行）。整个Generator函数就是一个封装的异步任务，或者说就是异步任务的容器。

**（1）使用`function*`定义一个Generator函数。**

```
function* gen(x) {
    console.log('before');
    var y = yield x + 2; // yield 关键字作为挂起的点
    return y;
}

var g = gen(1); //执行Generator函数，返回一个遍历器对象。而这时，这个Generator函数内的代码全部都并不会执行。包括其中的console.log('before');也不会被执行
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

上面的代码中，调用Generator函数，会返回一个内部指针（即遍历器）g，这是Generator函数不同于普通函数的另一个地方，即执行它不会返回结果，返回的是指针对象。调用指针g的next()方法，会移动内部指针（即执行异步任务的第一段），指向第一个遇到的yield语句。

换而言之，next()方法的作用是分阶段执行Generator函数。每次调用next()方法，会返回一个对象，表示当前阶段的信息（包括value属性和done属性）。value属性是yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示Generator函数是否执行完毕，即是否还有一个阶段。

**（2）`yield`不能用在普通函数内部。**

```
var flat = function* (a) {
  // forEach 方法是个普通函数，在里面使用了 yield 会报错。解决方法是改为 for 循环
  a.forEach(function (item) {
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};
```

**（3）`yield`语句如果用在一个表达式之中，必须放在圆括号里面。**

```
console.log('Hello' + yield); // SyntaxError
console.log('Hello' + yield 123); // SyntaxError

console.log('Hello' + (yield)); // OK
console.log('Hello' + (yield 123)); // OK
```

**（4）Generator函数的数据交换和错误处理**

**Generator函数可以暂停执行和恢复执行，这是它封装异步任务的根本原因。除此之外，它还有两个特性，使它可以作为异步编程的解决方案：函数体内外的数据交换和错误处理机制。next()方法返回值的value属性，是Generator函数向外输出的数据；next()方法还可以接受参数，向Generator函数体内输入数据。由于 next()传入的参数为上一个 yield 语句的值，所以第一次调用next()时传入参数没有意义。**

```
function* gen(x) {
    console.log('before');
    var y = yield x + 2;
    console.log('after');
    return y;
}

var g = gen(1);
g.next();      // 第一次调用遍历器对象的 next() 方法，执行函数内的代码，执行到下一个 yield 的位置，并暂停执行。这里会停在console.log('after')之前。执行结果是: { value: 3, done: false }
g.next(2);    // 再次调用next()方法，会继续往前执行，直到将下一个yield语句（第二个yield）执行掉，并停在那个语句之后。如果没有找到第二个yield语句，则会将这个Generator执行完为止。执行完后，返回的done属性将会变成true。{ value: 2, done: true }
```

上面的代码中，第一个next()方法的value属性，返回表达式x+2的值（3）。第二个next()方法带有参数2，这个参数可以传入Generator函数，作为上个阶段异步任务的返回结果，被函数体内的变量y接收，因此这一步的value属性返回的就是2（变量y的值）。


**注意:**

（1）`g.next(2)`中传入的参数2，是作为上一阶段g这一Generator函数的执行结果而传入的，不是作为`gen(x)`中的x参数而传入的。

（2）调用的时候要通过把`gen(1)`赋给一个变量（`var g = gen(1);`），再通过这个变量去调`next()`(即g.next())，否则，如果直接通过`gen(1).next()`去调的话，返回的对象中，done属性永远是false，即永远都执行不完。

（3）另外，需要注意，不管调用next()多少次，Generator函数从头至尾只会完整执行一遍，不会是循环执行多遍，这是惯性思维上容易出错的地方。

（4）当Generator的返回的done状态还是false的时候，对应的返回的value属性是 yield 后面跟的表达式的值。当Generator的返回的done状态是true的时候，对应的返回的value属性是Generator函数中return回来的值，如果没有return，则返回的value属性是undefined。

Generator函数内部还可以部署错误处理代码，捕获函数体外抛出的错误。

```
function* gen(x) {
    console.log(1)
    try {
        console.log(2)
        var y = yield x + 2
    } catch(e) {
        console.log(3)
        console.log(e)
    }
    console.log(4)
    return y;
}

var g = gen(1);
g.next();
g.throw('出错了');
```

**上面代码的最后一行，Generator函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的`try...catch`代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。**

异步任务的封装

下面看看如何使用Generator函数，执行一个真实的异步任务。

```
var fetch = require('node-fetch')

function* gen() {
    var url = 'https://api.github.com/usrs/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
```

上面代码中，Generator函数封装了一个异步操作，该操作先读取一个远程接口，然后从JSON格式的数据解析信息。就像前面说过的，这段代码非常像同步操作。除了加上了yield命令。
执行这段代码的方法如下：

```
var g = gen();
var result = g.next();

result.value.then(function(data) {
    return data.json()
}).then(function(data) {
    g.next(data)
});
```

上面代码中，首先执行Generator函数，获取遍历器对象。然后使用next()方法，执行异步任务的第一阶段。**由于Fetch模块返回的是一个Promise对象，因此需要用then()方法调用下一个next()方法。**

**（5）多指针交叉执行next**

那么，如果对于同一个Generator函数，如果我们建立多个指针，并让这多个指针交叉执行`next()`会怎么样呢？

```
function* g() {
    var o = 1;
    yield o++;
    yield o++;
    yield o++;

}
var gen = g();

console.log(gen.next()); // 1

var xxx = g();

console.log(gen.next()); // 2
console.log(xxx.next()); // 1
console.log(gen.next()); // 3
```

答：见上面注释。每个遍历器之间互不干扰，作用域独立。

可以看到，**虽然Generator函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段，何时执行第二阶段）。**

**（6）for...of循环**

**for...of循环可以自动遍历Generator函数时生成的Iterator对象，且此时不再需要调用next方法。**

```
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5  这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
```

**（7）`Generator.prototype.throw()`**

Generator函数返回的遍历器对象，都有一个throw方法，可以在函数体外抛出错误，然后在Generator函数体内捕获。

```
var g = function* () {
  // 使用 try...catch... 进行异常捕获
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');  // 这里使用 throw 方法抛出的错误，会由 generator 函数内的 catch 处理
  i.throw('b');  // generator 内的 catch 已经执行过了，就不会再被 generator 的 catch 捕获了，由外部的 catch 捕获
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a
// 外部捕获 b
```

如果Generator函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。

如果Generator函数内部和外部，都没有部署try...catch代码块，那么程序将报错，直接中断执行。

**throw方法被捕获以后，会附带执行下一条yield语句。也就是说，会附带执行一次next方法。**

```
var gen = function* gen(){
  try {
    yield console.log('a');
  } catch (e) {
    // ...
  }
  yield console.log('b');  // throw 方法会附带执行 next，从而执行到这个 yield 位置
  yield console.log('c');
}

var g = gen();
g.next() // a
g.throw() // b
g.next() // c
```

**（8）`Generator.prototype.return()`**

**Generator函数返回的遍历器对象，还有一个return方法，可以返回给定的值，并且终结遍历Generator函数。**

```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }  value 值变成了 return 的参数
g.next()        // { value: undefined, done: true }  return 方法 导致 generator 函数结束，所以 value 为 undefined
```

**（9）`yield*`语句**

带有 iterator 接口的，都可以被 `yield*` 遍历。

```
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  // foo();  如果只是单纯的执行 foo() 函数，只是得到一个遍历器对象，并不会产生什么效果。
  yield* foo();  // 使用了 yield* 语句，在遍历的时候才会遍历这个 generator 函数内部的 generator 函数。
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"

function* gen(){
  yield* ["a", "b", "c"];  // 数组、字符串等，带有 iterator 接口的，都可以被 yield* 遍历
}

gen().next() // { value:"a", done:false }
```

**（10）Generator与状态机**

```
var clock = function*() {
  while (true) {
    console.log('Tick!');  // 执行状态1代码
    yield;
    console.log('Tock!');  // 执行状态2代码
    yield;
  }
};
```

每次调用 `next()` 就可以在两种状态间切换执行，而不需要使用一个布尔变量来做判断。

### 五、async函数

**所谓async函数，其实是Generator函数的语法糖。**

继续我们异步读取文件的例子，使用Generator实现

```
var fs = require('fs');

var readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
              reject(err)
            };

            resolve(data)
        })
    })
}

var gen = function* () {
    var f1 = yield readFile(fileA);
    var f2 = yield readFile(fileB);
    console.log(f1.toString());
    console.log(f2.toString());
}
```

写成async函数，就是下面这样：

```
var asyncReadFile = async function() {
    var f1 = await readFile(fileA);
    var f2 = await readFile(fileB);
    console.log(f1.toString())
    console.log(f2.toString())
}
```

发现了吧，**async函数就是将Generator函数的星号替换成了async，将yield替换成await，除此之外，还对 Generator做了以下四点改进：**

（1）内置执行器。Generator函数的执行比如靠执行器，所以才有了co模块等异步执行器，而async函数是自带执行器的。也就是说：async函数的执行，与普通函数一模一样，只要一行：

```
var result = asyncReadFile();
```

（2）上面的代码调用了asyncReadFile()，就会自动执行，输出最后结果。这完全不像Generator函数，需要调用next()方法，或者使用co模块，才能得到真正执行，从而得到最终结果。

（3）更好的语义。async和await比起星号和yield，语义更清楚。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。

（4）更广的适用性。async函数的await命令后面可以是Promise对象和原始类型的值（数值、字符串和布尔值，而这是等同于同步操作）。

（5）返回值是Promise，这比Generator函数返回的是Iterator对象方便多了。你可以用then()指定下一步操作。

进一步说，async函数完全可以看作由多个异步操作包装成的一个Promise对象，而await命令就是内部then()命令的语法糖。

实现原理

**async函数的实现就是将Generator函数和自动执行器包装在一个函数中。**如下代码：

```
async function fn(args) {
    // ...
}

// 等同于
function fn(args) {
  return spawn(function*() {
    // ...
  })
}

// 自动执行器
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF()
      } catch(e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v) })
      },function(e) {
        step(function() { return gen.throw(e) })
      })
    }
    step(function() { return gen.next(undefined) })
  })
}
```

async函数用法:

（1）async函数返回一个Promise对象，可以是then()方法添加回调函数。

（2）当函数执行时，一旦遇到await()

就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

下面是一个延迟输出结果的例子：

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

// 延时500ms后输出'Hello World!'
asyncPrint('Hello World!', 500);
```

**注意事项**

（1）await命令后面的Promise对象，运行结果可能是reject，所以最好把await命令放在try...catch代码块中。

（2）await命令只能用在async函数中，用在普通函数中会报错。

（3）ES6将await增加为保留字。如果使用这个词作为标识符，在ES5中是合法的，但是ES6会抛出 SyntaxError（语法错误）。


### 六、分别用async函数和Promise、Generator实现同一功能

"倚天不出谁与争锋"，上面介绍了一大堆，最后还是让我们通过一个例子来看看 async 函数和Promise、Generator到底谁才是真正的老大吧！

需求：假定某个DOM元素上部署了一系列的动画，前一个动画结束才能开始后一个。如果当中有一个动画出错就不再往下执行，返回上一个成功执行动画的返回值。

#### 1、用Promise实现:

```
function chainAnimationsPromise(ele, animations) {

  // 变量ret用来保存上一个动画的返回值
  var ret = null;

  // 新建一个空的Promise
  var p = Promise.resolve();

  // 使用then方法添加所有动画
  for (var anim in animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(ele);
    })
  }

  // 返回一个部署了错误捕获机制的Promise
  return p.catch(function(e) {
    /* 忽略错误，继续执行 */
  }).then(function() {
    return ret;
  })
}
```

虽然Promise的写法比起回调函数的写法有很大的改进，但是操作本身的语义却变得不太明朗。

#### 2、用Generator实现

```
function chainAnimationsGenerator(ele, animations) {
  return spawn(function*() {
    var ret = null;
    try {
      for(var anim of animations) {
        ret = yield anim(ele);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  })
}
```

使用Generator虽然语义比Promise写法清晰不少，但是用户定义的操作全部出现在spawn函数的内部。这个写法的问题在于，必须有一个任务运行器自动执行Generator函数，它返回一个Promise对象，而且保证yield语句后的表达式返回的是一个Promise。上面的spawn就扮演了这一角色。它的实现如下：

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v) })
      },function(e) {
        step(function() { return gen.throw(e) })
      })
    }
    step(function() { return gen.next(undefined) })
  })
}
```

#### 3、使用async实现

```
async function chainAnimationAsync(ele, animations) {
  var ret = null;
  try {
    for(var anim of animations) {
      ret = await anim(ele)
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}
```

好了，光从代码量上就看出优势了吧！简洁又符合语义，几乎没有不相关代码。完胜！

注意一点：async属于ES7的提案，使用时请通过babel或者regenerator进行转码。

### 七、小结

|方式|相比上一种方式的改进点|存在的问题|
|---|---|---|
|同步方式|/|排在前面的任务会阻塞后面的所有任务，尤其时当某一个任务比较耗时的时候影响非常明显，表现在浏览器上就是假死（看起来无响应）|
|回调函数|把耗时的任务（如a）及其依赖于耗时任务的任务（如b）都放进回调里面，而让其后续的任务无需等待任务a、b执行完成即可陆续执行。这种方式简单易懂，也容易部署|各部分之间高度耦合，流程会很混乱，不利于代码的维护；每个任务只能指定一个回调函数。|
|事件监听、发布/订阅|也比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数；而且可以"去耦合"（Decoupling），有利于实现模块化；通过查看"消息中心"，了解存在多少信号、每个信号有多少订阅者，从而监控程序的运行。|整个程序都要变成事件驱动型，运行流程会变得很不清晰。|
|Promise对象|回调函数变成了链式写法，程序的流程可以看得很清楚；而且有一整套的配套方法，可以实现许多强大的功能。比如，指定多个回调函数 以及 指定发生错误时的回调函数。它还有一个前面三种方法都没有的好处：如果一个任务已经完成，再添加回调函数，该回调函数会立即执行。所以，你不用担心是否错过了某个事件或信号。|原来的任务被Promise包装一下，不管什么操作，一眼看上去都是一堆then()，原本的语意变得很不清楚。|
|Generator函数|代码的写法非常像同步操作，如果除去 yield命令，简直一模一样；函数体内外的数据交换和错误处理机制。next()方法返回值的value属性，是Generator函数向外输出的数据；next()方法还可以接受参数，向Generator函数体内输入数据；Generator函数体外，使用指针对象的throw方法抛出的错误，可以被函数体内的`try...catch`代码块捕获。这意味着，出错的代码与处理错误的代码，实现了时间和空间上的分离，这对于异步编程无疑是很重要的。|虽然Generator函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段，何时执行第二阶段）。|
|async函数|async函数是自带执行器的。也就是说：async函数的执行，与普通函数一模一样，只要一行；async和await比起星号和yield，语义更清楚。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果；更广的适用性。async函数的await命令后面可以是Promise对象和原始类型的值（数值、字符串和布尔值，而这是等同于同步操作）；返回值是Promise，这比Generator函数返回的是Iterator对象方便多了。你可以用then()指定下一步操作；实现上更加简洁|/|

本文合并自以下三篇文章，进行了重新整理，加上了自己的理解。

http://www.cnblogs.com/3body/p/6020428.html
http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html
https://segmentfault.com/a/1190000006510526
