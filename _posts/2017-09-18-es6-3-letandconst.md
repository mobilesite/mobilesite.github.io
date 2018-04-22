---
layout:     post
title:      "let 和 const——ES6学习笔记3"
subtitle:   ""
date:       2017-09-11 15:24:51
author:     "Paian"
catalog: true
tags:
    - ES6
    - 学习笔记
---

   ### 3.1 let的作用域范围：块级作用域

   在ES6之前，JavaScript有两种作用域，全局作用域和函数作用域。

   例2-1:

   ```
   function double(){
       var y = 2;
       return x * y;
   }

   var x = 1;

   double();

   console.log(x);//1
   console.log(y);//Uncaught ReferenceError: y is not defined
   ```

   这个例子中，x声明在全局作用域中，所以在全局作用域中通过`console.log(x)`可以输出为1。而y声明在函数作用域（double这一函数）中，所以在全局作用域中访问不到y，故在全局作用域中调用`console.log(y)`抛出异常。

   即，全局作用域中的变量可以在函数作用域中访问到，但函数作用域中的变量无法在全局作用域中访问。

   例2-2：

   ```
   function double(num){
       return num * 2;
   }

   function calculate(num){
       var breakPoint = 100;

       if(num <= breakPoint){
           console.log('increment:', increment);
           return double(num);
       }else{
           var increment = 10;

           return num + increment;
       }
   }

   calculate(1);//2
   ```

   这个时候，虽然第一个if分支内虽然没有声明increment，但是仍然能访问increment变量，会输出一个"increment: undefined"，而不是抛出异常。因为else分支并没有形成一个单独的作用域。为了解决类似这样的问题，就有了ES6中的let和块级作用域。

   我们把上例中`var increment = 10;`这行代码改成`let increment = 10;`，再执行一遍，会看到抛出异常："Uncaught ReferenceError: increment is not defined"。这正是我们所需要的。在ES6中，let所声明的变量的作用范围被限制在离它最近的一对花括号（{}）中，这个作用范围即是一个块级作用域。

   块级作用域是没有返回值的。

   let除了具有这一特点外，还有如下特点：

   ### 3.2 在同一块级作用域内，不允许对同名变量进行两次或两次以上的声明（包括let、const、var、参数中变量以及未经声明直接使用的变量）。

   例子3：

   ```
   function increment(num){
       var increment = 10;
       let increment;// Uncaught SyntaxError: Identifier 'increment' has already been declared

       return num + increment;
   }
   increment(1);
   ```

   例子4：

   ```
   function increment(num){
       let increment = 10;
       let num = num;// Uncaught SyntaxError: Identifier 'num' has already been declared

       return num + increment;
   }
   increment(1);
   ```

   ### 3.3 let声明变量的提升规则与var不同

   例子5：

   ```
   console.log(m);//undefined
   var m = 1;

   console.log(n);//Uncaught ReferenceError: n is not defined
   let n = 2;
   ```

   通俗意义上来说，就是var声明变量会提升至当前作用域的顶部，而let声明变量则不会提升。准确地来讲：

   let的只有"创建"环节被提升了。

   var的"创建"和"初始化"环节被提升了。

   一个变量从开始声明到赋值完成一共有三个环节——"创建"、"初始化"、"赋值"。一个变量只有在"初始化"环节完成后，访问才不会报错（抛出异常）。一般来说，"初始化"完成时，其值是undefined（个别情况下存在特例，略）；"赋值"完成时，其值是所赋予的值。

   特例：

   ```
   var z = 1;

   if(true){
       console.log(z);//Chrome: 1， Safari: undefined
       var z = 2;
   }
   ```

   ### 3.4 在当前作用域中，let声明某一变量的语句之前，该变量不可用——即社区所谓的"临时死区"

   例子6：

   ```
   let z = 1;

   if(true){
       console.log(z);//1
   }
   ```

   例子7：

   ```
   let z = 1;
   console.log(z);//1

   if(true){
       console.log(z);//Uncaught ReferenceError: z is not defined
       //do something here
       let z;
   }
   ```

   比较上述两段代码，可以看出let声明变量之前，该作用域内，这个变量均不可用。

   ### 3.5 在for循环中，在每一趟执行循环体的迭代变量之间保持独立（而非共用）。

   ```
   for(let i = 0; i < 5; i++) {
      setTimeout(function(){
           console.log(i);
       }, 100);
   }
   ```

   总之，这就是ECMAScript标准给let在for循环中的表现制定的一种规则，具体细节无需深究。感兴趣的可参考方应杭的知乎文章 https://zhuanlan.zhihu.com/p/28140450。

   大概的意思是，for后面的圆括号之间，有一个特殊的隐藏的作用域，这个作用域会作为循环体内容的父级作用域，因此循环体可以访问到这个隐藏作用域中的变量。而没执行一趟循环的时候，在循环体内会隐形地添加一个同名变量来接收当前这一趟循环时i的值。

   ### 3.6 const

   const与let非常类似，主要不同就是const在声明变量时必须赋值，而且赋值之后不可以修改值。

   社区的最佳实践一致推崇使用const代替大多数的let，除非该变量的值声明后需要被改变。



