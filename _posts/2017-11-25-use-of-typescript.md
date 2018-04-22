---
layout:     post
title:      "Typescript的使用"
subtitle:   ""
date:       2017-11-25 22:32:14
author:     "Paian"
catalog:    true
tags:
    - Typescript
---

### class

#### 类的访问控制符：

带有private访问控制符的属性或方法，只有在类的内部才能被访问到；

带有protected访问控制符的属性或方法，只有在类的内部以及子类中能够被访问到；

带有public访问控制符的属性或方法，都可以访问到。

类的一个属性或方法在没有明确指定访问控制符的时候，默认的就是public。

#### 类的构造函数：

constructor(){

}

子类的构造函数内必须要调用父类的构造函数。

```
class Person{
    constructor(public name: string){

    }

    eat(){
        console.log('i'm eating');
    }
}

class Employee extends Person{
    constructor(name: string, code: string){
        super(name); //调用父类的构造函数
        this.code = code;
    }

    code: string

    work(){
        super.eat();
        this.doWork();
    }

    private doWork(){
        console.log('i'm working')
    }
}
```

extends

super

super除了可以用来调用父类的构造函数，还可以通过super.函数名的形式来调用父类的其它函数（非构造函数）。

### 泛型（generic）

参数化的类型，一般用来限制集合的内容

var wroker: Array<Person> = [];

### 接口

```
interface Animal{
    eat();
}

class sheep inplements Animal{
    eat(){

    }
} 
```

inplemtents关键字表示一个接口实现另一个接口。

### 模块（略）

### 注意区分TypeScript语法和ES6语法

举个例子：

```
export enum SecureWalletName {
  WEB3 = 'web3',
  LEDGER_NANO_S = 'ledgerNanoS',
  TREZOR = 'trezor'
}
```

这第一段，其实是导出了一个对象，是typescript语法：

 SecureWalletName {
  WEB3: 'web3',
  LEDGER_NANO_S: 'ledgerNanoS',
  TREZOR:  'trezor'
}

```
dPathFormats: {
    [SecureWalletName.TREZOR]: ETH_TREZOR,
    [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
    [InsecureWalletName.MNEMONIC_PHRASE]: ETH_DEFAULT
}
```

 `[SecureWalletName.TREZOR]: ETH_TREZOR`,其实是把 `[SecureWalletName.TREZOR]`的内容解出来作为key，把`ETH_DEFAULT`的内容解出来作为value。这第二段是彻底的ES6语法而非Typescript语法。
