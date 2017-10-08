---
layout:     post
title:      "Python快速入门学习笔记"
subtitle:   ""
date:       2017-10-06 22:19:12
author:     "Paian"
catalog: true
tags:
    - Python
    - 学习笔记
---
## Python快速入门学习笔记

——深度学习语言基础

### 一、安装Python和配置环境

Python一词，美国发音为：/ˈpaɪθɑːn/，英国发音为：/ˈpaɪθən/。

首先下载Python 3.6.3，安装至C:\Python36目录，下载地址：

[https://www.Python.org/downloads/release/Python-363/](https://www.Python.org/downloads/release/Python-363/)

#### 1、Python Interpreter

安装好Python的时候，Python Interpreter（解释器）也就被安装在了我们所设定的安装目录C:\Python36下面了，即Python.exe这个文件。所有的Python代码都需要通过这个解释器来执行。

#### 2、配置在命令行中使用Python

安装完成后就可以在开始菜单中点击“Python 3.6”菜单项进入pyhon的命令行模式。

除了通过上面这种方式进入Python的命令行之外，我们是否还可以通过系统控制台直接进入Python的命令行模式呢？可以的。前提是需要配置环境变量：

只需要将C:\Python36添加到环境变量的系统变量Path中，重启控制台即可。值得注意的是，如果你之前安装过Python的其它版本（如Python2.7），那么你就需要将C:\Python36放在C:\Python27之前，否则系统还是会使用Python2.7的配置。

#### 3、自带的简单编辑器IDLE

在"Python 3.6"菜单项的上方，还有一个“IDLE”菜单项，这个是Python自带的一个IDE。

然后打开IDLE，新建一个文件（file==>new file），取名为helloworld.py，文件内容如下：

```
print('hello world')
```

然后运行它（run==>run module）。

即可看到输出hello wolrd。

#### 4、Eclipse和PyDev的安装配置

但是，IDLE过于简单了，下面我们在Eclipse之上添加插件PyDev来作为Python的编辑器。

先来安装Eclipse：

##### 1）下载并安装JRE：[http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html](http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html)

如果你没有自定义JRE的安装目录，那应该是安装到了C:\Program Files\Java\jre1.8.0_144\目录下。安装好后需要配置环境变量，才能在控制台中执行`java -version`命令，所以先需要把C:\Program Files\Java\jre1.8.0_144\bin添加到系统环境变量Path中。添加完成后重启控制台，再执行`java -version`命令，看到正确的java版本号，则表明配置成功。

##### 2）下载并安装Eclipse：

在使用[https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/)下载的eclipse-inst-win64.exe文件进行安装时，老是提示“Installation failed with an error”这样一个不明原因的错误，最后改用[https://www.eclipse.org/downloads/eclipse-packages/](https://www.eclipse.org/downloads/eclipse-packages/)下载了一个直接解压能用的包。我们把这个压缩包解压后的内容放到c:\eclipse下。

启动eclipse并且指定work space为D:\eclipseworkspace文件夹。如果启动失败，可能你需要显式地给Eclipse配置Java虚拟机：

只需要在c:\eclipseeclipse.ini文件中的

```
openFile
--launcher.defaultAction
```

这两行之间插入如下内容：

```
-vm
C:\Program Files\Java\jre1.8.0_144\bin\
```

现在Eclipse中已经可以创建Java项目了。我们来创建一个：

new==>project==>Java==>Java Project==>输入项目名字TestJava

然后在项目上右键单击==>new==>class==>输入类名TestHelloWorld，并勾选public static main来包裹一个main函数在里面。然后在函数体内输入如下代码：

```
System.out.println("hello world")
```

通过run菜单==>run运行，即可看到输出hello world。

Eclipse里面怎么将界面恢复到默认状态？

选择Eclipse的工具栏里面的window，找到“复位透视图（Reset Perspective）”选项；

单击“复位透视图（Reset Perspective）”，选择“是”；

但是呢，我们往往发现重置的窗口布局里有时候少了一些我们想要的窗口，比如说控制台等等。这时候不要着急，依然是“window”，这次我们选择“show view”，然后选择需要显示出来的面板。

##### 3）安装PyDev

但是，目前Eclipse只能创建Java项目，接下来我们安装PyDev，让Eclipse中能够创建Python项目。

help==>install new software==>add==>Name输入：PyDev，Location输入：[http://www.pydev.org/updates](http://www.pydev.org/updates) ==>勾选PyDev继续直至安装完成。安装完成后重启Eclipse。

#### 5、新建第一个Python项目

下面我们来建一个Python项目：

new==>project==>PyDev==>PyDev Project==>输入项目名TestPython，选择Grammer Version为3.6，并点击Please config an interpreter before proceeding==>manual config==>new==>Interpreter Name：输入Python36，Interpreter Executable：输入C:\Python36\python.exe==>ok==>apply==>finish==>open perspective。

右键单击刚刚建好的这个Python项目==>new==>PyDev Module==>输入Name：TestHelloWorld

这时候就生成了一个TestHelloWorld.py文件，文件内容如下：

```
'''
Created on 2017年10月6日

@author: paian
'''
```

在其中增加如下代码：

```
print('hello world')
```

点击菜单run==>run，这时候会出现对话框：select a way to run TestHelloWorld.py，有两个选项Python Run和Python unit-test，第一个是直接运行，第二个是进行单元测试。我们选择Python Run。

这时候发现报错了：

> SyntaxError: Non-UTF-8 code starting with '\xc4' in file D:\eclipseworkspace\TestPython\TestHelloWorld.py on line 3, but no encoding declared see http://python.org/dev/peps/pep-0263/ for details

主要原因可能是Eclipse保存文件的时候，如果字符串内有Unicode字符的时候，它无法自动选择UTF-8编码。我们做如下配置来解决这个问题：

右键单击TestPython项目==>properties==>Text file encodeing选择Other的UTF-8


### 二、Package

package分为：

#### 1、自带（built-in）package，只需要用`import`关键字引入就可以使用了，例如。

```
import os
print(os.getcwd()) #输出当前所在目录
```

#### 2、外部（external）package，使用easy_install, pip管理系统来进行管理。

首先我们需要在环境变量中配置easy_install 和 pip。

这两个东西在安装Python的时候，已经自动安装在了C:\Python36\Scripts文件夹下。

所以，我们在系统环境变量Path中添加C:\Python36\Scripts。然后重启系统控制台，执行：

```
easy_install --help
```

和

```
pip
```

如果两个命令都能输出帮助信息，说明easy_install 和 pip都已经配置成功。

首先我们安装一个外部包requests试试。

```
pip install requests
```

安装完了之后也是用`import`关键字引入就可以了。

下面我们新建一个名为LearnPython的PyDev项目，其中创建一个名为TestExternalPack的Module，该Module的代码为：

```
import requests

r = requests.get('http://www.baidu.com')
print(r.url)
print(r.encoding)
print(r.text)
```

run之后结果如下：

```
http://www.baidu.com/
ISO-8859-1
<!DOCTYPE html>

<!--STATUS OK--><html> <head><meta http-equiv=content-type content=text/htmlcharset=utf-8><meta http-equiv=X-UA-Compatible content=IE=Edge><meta content=always name=referrer><link rel=stylesheet type=text/css href=http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min.css><title>ç¾åº¦ä¸ä¸ï¼ä½ å°±ç¥é</title></head> <body link=#0000cc> <div id=wrapper> <div id=head> <div class=head_wrapper> <div class=s_form> <div class=s_form_wrapper> <div id=lg> <img hidefocus=true src=//www.baidu.com/img/bd_logo1.png width=270 height=129> </div> <form id=form name=f action=//www.baidu.com/s class=fm> <input type=hidden name=bdorz_come value=1> <input type=hidden name=ie value=utf-8> <input type=hidden name=f value=8> <input type=hidden name=rsv_bp value=1> <input type=hidden name=rsv_idx value=1> <input type=hidden name=tn value=baidu><span class="bg s_ipt_wr"><input id=kw name=wd class=s_ipt value maxlength=255 autocomplete=off autofocus></span><span class="bg s_btn_wr"><input type=submit id=su value=ç¾åº¦ä¸ä¸ class="bg s_btn"></span> </form> </div> </div> <div id=u1> <a href=http://news.baidu.com name=tj_trnews class=mnav>æ°é»</a> <a href=http://www.hao123.com name=tj_trhao123 class=mnav>hao123</a> <a href=http://map.baidu.com name=tj_trmap class=mnav>å°å¾</a> <a href=http://v.baidu.com name=tj_trvideo class=mnav>è§é¢</a> <a href=http://tieba.baidu.com name=tj_trtieba class=mnav>è´´å§</a> <noscript> <a href=http://www.baidu.com/bdorz/login.gif?login&amptpl=mn&ampu=http%3A%2F%2Fwww.baidu.com%2f%3fbdorz_come%3d1 name=tj_login class=lb>ç»å½</a> </noscript> <script>document.write('<a href="http://www.baidu.com/bdorz/login.gif?login&tpl=mn&u='+ encodeURIComponent(window.location.href+ (window.location.search === "" ? "?" : "&")+ "bdorz_come=1")+ '" name="tj_login" class="lb">ç»å½</a>')</script> <a href=//www.baidu.com/more/ name=tj_briicon class=bri style="display: block">æ´å¤äº§å</a> </div> </div> </div> <div id=ftCon> <div id=ftConw> <p id=lh> <a href=http://home.baidu.com>å³äºç¾åº¦</a> <a href=http://ir.baidu.com>About Baidu</a> </p> <p id=cp>&copy2017&nbspBaidu&nbsp<a href=http://www.baidu.com/duty/>ä½¿ç¨ç¾åº¦åå¿è¯»</a>&nbsp <a href=http://jianyi.baidu.com/ class=cp-feedback>æè§åé¦</a>&nbspäº¬ICPè¯030173å·&nbsp <img src=//www.baidu.com/img/gs.gif> </p> </div> </div> </div> </body> </html>
```

### 三、Python的基本语法规则

- 字面常量（literal constant）

可以直接以字面的意义使用他们：

如：6，2.24，3.45e-3，“This is a string!”

常量不会被改变。

- 变量

python是动态类型语言，声明变量的时候，不需要指明变量的类型，它自动能识别变量的类型。

存储信息

 变量名属于identifier

identifier命名规则：

- 第一个字符必须是字母或者下划线
- 其余字符可以是字母、数字或者下划线
- 区分大小写

例如：

合法的（i, name_3_4, big_bang）

不合法（2people, this is tom, my-name, >123b_c2）

- 注释

使用`#`号，多行注释则每行都需要加这个符号，没有简写的方法

```
#this is comment
```

Eclipse中注释代码的快捷键是 `ctrl + /`。

- 缩进

Python语句后没有分号，缩进与语法意义有关，默认情况下每一个语句都不能锁金，除非确实有语法意义的情况（后面我们会进一步讲到），所以不能随便添加缩进。

### 四、Python的数据类型

#### 1、字符串

python中，对于字符串既可以用单引号也可以用双引号包裹。多行字符则用三引号。

```
print('单引号')
print("双引号")
print('''这是第一行
这是第二行
这是第三行
等等''')
```

输出结果是：

> 单引号
> 双引号
> 这是第一行
> 这是第二行
> 这是第三行
> 等等

- 编码

```
#-*- coding utf-8 -*-
```

如果你的代码中需要输出中文信息，就需要在文件头部做这个编码的设置。

- Format字符串：

```
age = 18
name = "Paian"
print("{0} was {1} years old.".format(name, age))
```

输出结果为：

> Paian was 18 years old.

- 联合（使用+号，注意+号前后的类型必须一致）：

```
age = 18
name = "Paian"
print(name + ' was ' + str(age) + ' years old.')
```

输出结果同样为：

> Paian was 18 years old.

- 换行符

`\n`

```
print('Lilei: How are you?\nHanmeimei: Fine, thank you!')
```

输出结果：

> Lilei: How are you?
> Hanmeimei: Fine, thank you!

#### 2、Numeric Types：int（包括boolean）、float、complex（复数）

int类型长度不受限制。

float类型，可通过

```
import sys
print(sys.float_info)
```

来查看float类型的取值范围。

```
a = 3
b =4

c = 5.66
d = 8.0

e = complex(c, d)
f = complex(float(a), float(b))

print('a is type:', type(a))
print('c is type:', type(c))
print('e is type:', type(e))
print(a + b)
print(d / c)

print(b / a)
print(b // a)  #//运算表示想除后像下取整

print(e)
print(e + f)
```

运行结果：

> a is type: <class 'int'>
> c is type: <class 'float'>
> e is type: <class 'complex'>
> 7
> 1.4134275618374559
> 1.3333333333333333
> 1
> (5.66+8j)
> (8.66+12j)

### 五、数据结构

#### 1、列表（list）

- 1）列表的基本使用

列表中每一个项中的值的类型可以是不一致的。

可以通过index访问或修改该list中某个元素的值。

删除某个元素用`del`关键字。

```
number_list = [1,3,5,7,9]
string_list = ['a', 'b', 'c', 'd', 'e']
mix_list = [1, 'a', 'b', 2]

print('number_list: ' + str(number_list))
print('number_list: ' + str(number_list[0]))
print('number_list: ' + str(number_list[1]))

print('string_list: ' + str(string_list))
print('string_list: ' + str(string_list[0]))
print('string_list: ' + str(string_list[1]))

print('mix_list: ' + str(mix_list))
print('mix_list: ' + str(mix_list[0]))
print('mix_list: ' + str(mix_list[1]))

#设置元素
number_list[1] = 'new element'

#删除元素
del number_list[3]
print('number_list: ' + str(number_list))
```

执行结果：

> number_list: [1, 3, 5, 7, 9]
> number_list: 1
> number_list: 3
> string_list: ['a', 'b', 'c', 'd', 'e']
> string_list: a
> string_list: b
> mix_list: [1, 'a', 'b', 2]
> mix_list: 1
> mix_list: a
> number_list: [1, 'new element', 5, 9]

另外，可以用`len(xxx)`来获取list的长度；用`xxx(-n)`来获取倒数第n个元素；用`xxx(m:n)`来获取从第m个元素开始（含第m个元素）到第n个元素的所有元素；用`xxx*n`来重复内部的元素n遍；用`in`关键字来判断list中有没有某个值；

```
#获取list长度
print(len(string_list))

#拼合/组合两个list
print([1,2,3] + ['a','b','c'])

#重复填充元素若干遍
print(['Hello', 'world'] * 5)

#是否存在某元素
print('a' in string_list)

#获取倒数第二个元素
print(string_list[-2])

#获取index为2开始的所有元素（含index为2的元素）
print(string_list[2:])

#选取出index从1到3的所有元素，包含index为1的，但不含index为3的
print([1,2,3,4,5][1:3])
```

执行结果：

> 5
> [1, 2, 3, 'a', 'b', 'c']
> ['Hello', 'world', 'Hello', 'world', 'Hello', 'world', 'Hello', 'world', 'Hello', 'world']
> True
> d
> ['c', 'd', 'e']
> [2,3]

- 2）列表操作包含以下函数：

len(list)：列表元素个数

max(list)：返回列表元素最大值

min(list)：返回列表元素最小值

min和max函数找出List中的最大值和最小值，但它们不支持max(1, 2, 3, 4,'a','b','c')这样的元素中有不同类型的值的情况。

list(seq)：将元组转换为列表

注意：

Python 3.X 的版本中已经没有 cmp 函数，如果你需要实现比较功能，需要引入 operator 模块，适合任何对象，包含的方法有：

```
operator.lt(a, b)
operator.le(a, b)
operator.eq(a, b)
operator.ne(a, b)
operator.ge(a, b)
operator.gt(a, b)
operator.__lt__(a, b)
operator.__le__(a, b)
operator.__eq__(a, b)
operator.__ne__(a, b)
operator.__ge__(a, b)
operator.__gt__(a, b)
```

- 3）列表操作包含以下方法：

list.append(obj)：比较两个列表的元素

list.count(obj)：列表中值为obj的元素的个数

list.extend(anotherlist)：在列表末尾一次性追加另一个list中的多个值的（用新列表扩展原来的列表）

list.index(obj)：从列表中找出某个值第一个匹配项的索引位置

list.insert(index, obj)：将对象插入列表

list.pop(index)：移除列表中某index的元素（默认最后一个元素），并且返回该元素的值

list.remove(obj)：移除列表中某个值的第一个匹配项

list.reverse()：反向列表中元素

list.sort([func])：对原列表进行排序，不传入函数的时候，默认是从小到大排序。

```
#转换成List
print(list()) #转换成[]
print(list('abcde')) #转换成['a', 'b', 'c', 'd', 'e']

#min和max函数找出List中的最大值和最小值，不支持max(1, 2, 3, 4,'a','b','c')这样的元素中有不同类型的值的情况
print(min([1,2,3,4]))  #1
print(max('a','b','c'))  #'c'
print(['a', 'b', 'c', 'd', 'e'].index('b'))  #1

number_list.append(4)
print(number_list)

print([1,2,3,1].count(1))  #2

number_list.extend([5,6,7,8,9])
print(number_list)

print([1,2,3].index(2))

number_list.insert(1, 4)
print(number_list)

number_list.pop()
print(number_list)

number_list.pop(2)  #移除index为2的元素
print(number_list)

number_list.remove(5) #移除第一个值为5的元素
print(number_list)

number_list.reverse()
print(number_list)

number_list.sort()
print(number_list)
```

执行结果：

> []
> ['a', 'b', 'c', 'd', 'e']
> 1
> c
> 1
> [1, 'new element', 5, 9, 4]
> 2
> [1, 'new element', 5, 9, 4, 5, 6, 7, 8, 9]
> 1
> [1, 4, 'new element', 5, 9, 4, 5, 6, 7, 8, 9]
> [1, 4, 'new element', 5, 9, 4, 5, 6, 7, 8]
> [1, 4, 5, 9, 4, 5, 6, 7, 8]
> [1, 4, 9, 4, 5, 6, 7, 8]
> [8, 7, 6, 5, 4, 9, 4, 1]
> [1, 4, 4, 5, 6, 7, 8, 9]

#### 2、元组（tuple）发音： [ˈtjʊpəl; ˈtʌpəl]

- 1）创建只包含一个元素的tuple，必须在该元素后面加一个逗号来消除歧义。

```
a_tuple = (1,)
```

- 2）tuple与list的相同之处：

定义tuple和定义list的方式相同，除了整个元素集是用小括号包围的而不是中括号之外；

tuple的元素与list一样按定义的次序进行排序，索引都是从0开始；

负数索引与list一样从tuple的尾部开始计数；

与list一样分片（slice）也可以使用。注意，当分割一个list时，会得到一个新的list；当分割一个tuple时，会得到一个新的tuple；

与list一样都可以使用in来检查某个元素在其中是否存在。

- 3）tuple与list的区别：

不能向tuple增加元素，tuple没有insert、append和extend方法；

不能给tuple删除元素，tuple没有remove和pop方法，不过可以用`del`关键字把整个tuple整体删除；

`print([1,2,3,4,5](1:3))`这种提取部分元素的方法在list中是允许的，但是`print((1,2,3,4,5)(1:3))`在tuple中是不允许的；

tuple与List还有一个重要区别，就是tuple中元素不能被更新，所以不能用=号更新tuple的某个元素，也没有sort和reverse方法。不过，如果tuple中的某个元素是一个List，那么该List中的元素仍然是可以更新的。

```
mixed_tuple = (1, 2, ['a', 'b'])
print('mixed_tuple: ' + str(mixed_tuple))

mixed_tuple[2][0] = 'c'
mixed_tuple[2][0] = 'd'
print('new mixed_tuple: ' + str(mixed_tuple))
```

- 4）用tuple的好处：

tuple比list操作速度快。如果您定义了一个值的常量集，并且唯一要用它做的是不断地遍历它，那么应该使用tuple。

另外，由于tuple数据项不可更改，所以可以使得代码更加安全。

- 5）tuple与list的转换：

tuple可以转换成list，反之亦然。内置的tuple函数接收一个list，并返回一个有着相同元素的tuple。而list函数接收一个tuple返回一个有相同元素的list。从效果上看，tuple冻结一个list，而list解冻一个tuple。

- 6）tuple的其它应用

一次赋多个值

```
v = ('a', 'b', 'c')
(x, y, x) = v
```

上面代码中，v是一个有三个元素的tuple，(x, y, z)是一个有三个变量的tuple。将一个tuple赋值给另一个tuple，会按顺序将v的每个值赋给(x,y,z)中的每个变量。

- 7）tuple使用演示

```
number_tuple = (1,3,5,7,9)
string_tuple = ('a', 'b', 'c', 'd', 'e')
mix_tuple = (1, 'a', 'b', 2)

print('number_tuple: ' + str(number_tuple))
print('number_tuple: ' + str(number_tuple[0]))
print('number_tuple: ' + str(number_tuple[1]))

print('string_tuple: ' + str(string_tuple))
print('string_tuple: ' + str(string_tuple[0]))
print('string_tuple: ' + str(string_tuple[1]))

print('mix_tuple: ' + str(mix_tuple))
print('mix_tuple: ' + str(mix_tuple[0]))
print('mix_tuple: ' + str(mix_tuple[1]))


#获取tuple长度
print(len(string_tuple))

#拼合两个tuple
print((1,2,3) + ('a','b','c'))

#重复填充元素若干遍
print(('Hello', 'world') * 5)

#是否存在某元素
print('a' in string_tuple)

#获取倒数第二个元素
print(string_tuple[-2])

#获取index为2开始的所有元素（含index为2的元素）
print(string_tuple[2:])

#选取出index从1到3的所有元素，包含index为1的，但不含index为3的
print([1,2,3,4,5][1:3])

#转换成tuple
print(tuple()) #转换成()
print(tuple('abcde')) #转换成('a', 'b', 'c', 'd', 'e')

#min和max函数找出tuple中的最大值和最小值，不支持max(1, 2, 3, 4,'a','b','c')这样的元素中有不同类型的值的情况
print(min((1,2,3,4)))  #1
print(max('a','b','c'))  #'c'
print(('a', 'b', 'c', 'd', 'e').index('b'))  #1

print((1,2,3,1).count(1))  #2

print((1,2,3).index(2))

#删除整个tuple
del number_tuple
print('number_tuple: ' + str(number_tuple)) #因为number_tuple被整个删除了，所以会报错：name 'number_tuple' is not defined
```

输出结果：

> number_tuple: (1, 3, 5, 7, 9)
> number_tuple: 1
> number_tuple: 3
> string_tuple: ('a', 'b', 'c', 'd', 'e')
> string_tuple: a
> string_tuple: b
> mix_tuple: (1, 'a', 'b', 2)
> mix_tuple: 1
> mix_tuple: a
> 5
> (1, 2, 3, 'a', 'b', 'c')
> ('Hello', 'world', 'Hello', 'world', 'Hello', 'world', 'Hello', 'world', 'Hello', 'world')
> True
> d
> ('c', 'd', 'e')
> [2, 3]
> ()
> ('a', 'b', 'c', 'd', 'e')
> 1
> c
> 1
> 2
> 1
>
> Traceback (most recent call last):
>   File "D:\eclipseworkspace\LearnPython\TestTuple.py", line 54, in <module>
> NameError: name 'number_tuple' is not defined

#### 3、词典（dictionary）

- 1）基本使用

键（key）、对应值（value）

```
phone_book = {'Paian': 123, 'Tom': 456, 'King': 789}
mixed_dict = {'Tom': 'boy', 11: 23.5}

print('Paian\'s phone number: ' + str(phone_book['Paian']))
print('mixed_dict[11]: ' + str(mixed_dict[11]))

phone_book['Paian'] = '999'
print('Paian\'s phone number: ' + str(phone_book['Paian']))
```

其中，`\'`是对 ' 进行转义。

同一个词典中，每一个键值对的数据类型可以不一致。

执行结果：

> Paian's phone number: 123
> mixed_dict[11]: 23.5

词典中，如果出现两个及以上同名的key，那么后出现的那个会覆盖掉前面的同名key的值，因此，不要出现两个同名的key。

key必须是不可变的，所以可以用数字、字符串或元组来充当key，但是不能用list来作key。

```
list_dict = {['tom']: '30', ('Jim'): '28'} #这将会报错 TypeError: unhashable type: 'list'
```

- 2）字典可用的内置函数：

len(mydict)：计算字典元素个数

str(mydict)：输出字典可打印的字符串表示

type(mydict)：返回输入的变量类型，如果变量是字典就返回字典类型，即输出<class 'dict'>

- 3）字典可用的内置方法：

mydict.clear()：清空字典

mydict.copy()：返回一个字典的副本

mydict.fromkeys(seq, default)：创建一个新字典，以序列seq中元素做字典的键，value为default参数的值，没有传default的情况下，默认是None。注意，mydict.fromkeys(seq, default)虽然会创建一个新字典，但并不会改变老字典mydict，因此，执行mydict.fromkeys(seq, default)前后，mydict本身的值不会发生变化。

mydict.get(key, default)：返回指定键的值，如果值不在字典中，返回default参数的值

`mydict.__contains__(key)`：如果键在字典dict里，返回true，否则返回false

mydict.items()：以列表返回可遍历的（键、值）元素数组，形如`dict_items([('a', 1), ('b', 2), ('c', 3)])`

mydict.keys()：以列表返回一个字典所有的键，形如`dict_keys(['a', 'b', 'c'])`

mydict.setdefault(key, default)：和get(key, default)类似，但如果key在字典中还不存在，则将会添加该key到mydict中并将其值设置为default参数的值

mydict.update(dict2)：把字典dict2的键/值对更新到dict里

mydict.values()：以列表返回字典中的所有值，形如：`dict_values([4, 5, 6, '222', 7])`

- 4）词典使用演示

```
phone_book = {'Paian': 123, 'Tom': 456, 'King': 789}
mixed_dict = {'Tom': 'boy', 11: 23.5}

print('Paian\'s phone number: ' + str(phone_book['Paian']))
print('mixed_dict[11]: ' + str(mixed_dict[11]))

#修改值
phone_book['Paian'] = '999'
print('Paian\'s phone number after update: ' + str(phone_book['Paian']))

#增加项
phone_book['Dennis'] = '888'
print('after add element to phone_book: ' + str(phone_book))

#删除某元素
del phone_book['Dennis']
print('after delete phone_book element: ' + str(phone_book))

#清空词典，变成了空词典
phone_book.clear()
print('after clear phone_book: ' + str(phone_book))  #after clear phone_book: {}

list_dict = {('tom'): '30', ('Jim'): '28'}
print(list_dict[('tom')])

mydict = {'a': 1, 'b': 2, 'c': 3}
print(len(mydict))
print(str(mydict))
print(type(mydict)) #<class 'dict'>

print(mydict.copy()) #{'a': 1, 'b': 2, 'c': 3}

print(mydict.fromkeys('abc')) #{'a': None, 'b': None, 'c': None, 'd': None}
print(mydict.fromkeys('cde', 2)) #{'c': 2, 'd': 2, 'e': 2}
print(str(mydict))  #{'a': 1, 'b': 2, 'c': 3}
print(mydict.get('c')) #3
print(mydict.get('e')) #None
print(mydict.__contains__('c')) #True
print(mydict.items()) #dict_items([('a', 1), ('b', 2), ('c', 3)])
print(mydict.keys()) #dict_keys(['a', 'b', 'c'])

mydict.setdefault('a', '111')
mydict.setdefault('k', '222')
print(str(mydict)) #{'a': 1, 'b': 2, 'c': 3, 'k': '222'}

mydict.update({'a': 4, 'b': 5, 'c': 6, 'd': 7})
print(str(mydict)) #{'a': 4, 'b': 5, 'c': 6, 'k': '222', 'd': 7}

print(mydict.values()) #dict_values([4, 5, 6, '222', 7])

#将整个词典删除
del phone_book
print('after delete phone_book: ' + str(phone_book))  #报错：name 'phone_book' is not defined
```

执行结果：

> Paian's phone number: 123
> mixed_dict[11]: 23.5
> Paian's phone number after update: 999
> after add element to phone_book: {'Paian': '999', 'Tom': 456, 'King': 789, 'Dennis': '888'}
> after delete phone_book element: {'Paian': '999', 'Tom': 456, 'King': 789}
> after clear phone_book: {}
> 30
> 3
> {'a': 1, 'b': 2, 'c': 3}
> <class 'dict'>
> {'a': 1, 'b': 2, 'c': 3}
> {'a': None, 'b': None, 'c': None}
> {'c': 2, 'd': 2, 'e': 2}
> {'a': 1, 'b': 2, 'c': 3}
> 3
> None
> True
> dict_items([('a', 1), ('b', 2), ('c', 3)])
> dict_keys(['a', 'b', 'c'])
> {'a': 1, 'b': 2, 'c': 3, 'k': '222'}
> {'a': 4, 'b': 5, 'c': 6, 'k': '222', 'd': 7}
> dict_values([4, 5, 6, '222', 7])
>
> NameError: name 'phone_book' is not defined

#### 4、函数（function）

定义函数的用`def`关键字。

在函数内部定义全局变量用`global`关键字。

设置函数参数的默认值用 参数名 = 默认值 的形式。

不能在设定了默认值的参数后面再使用没有默认值的参数，即需要把需要设置默认值的参数放在后面，而把不需要设置默认值的参数放在前面，否则，会报错。

```
def printme(a, b):
    "求和"
    c = a + b;
    print(c);
    return;

# 调用函数
printme(1, 2);
printme(3, 4);

#默认值参数
def repeatstr(somestr, times = 1):
    "重复字符串"
    repeatedstrs = somestr * times
    return repeatedstrs;

print(repeatstr('Happy birthday!')) #默认参数times的值为1
print(repeatstr('Happy birthday!', 5))

def changex():
    x = 10
    print('local x: ' + str(x)) #local x: 10
    return

x = 20
changex();
print('global x: ' + str(x)) #global x: 20

def changey():
    global y
    y = 10
    print('global y in function: ' + str(y)) #global y in function: 10
    return

y = 20
changey();
print('global y outside: ' + str(y)) #global y outside: 10

def func(a, b = 4, c = 8):
    print('a: {0} b: {1} c: {2}'.format(a, b, c))
    return

func(13, 17) #a: 13 b: 17 c: 8
# 关键字参数
func(125, c = 24) #a: 125 b: 4 c: 24
func(c = 40, a = 80) #a: 80 b: 4 c: 40

# 一个星号是收集其它没有关键字的参数，收集成一个元组；两个星号是收集其它有关键字的参数，收集成一个字典
def print_paras(fpara, *nums, **words):
    print('fpara: ' + str(fpara)) #fpara: hello
    print('nums: ' + str(nums))   #nums: (1, 3, 5, 7)
    print('words: ' + str(words)) #words: {'word': 'python', 'another_word': 'java'}

print_paras('hello', 1, 3, 5, 7, word = 'python', another_word = 'java')
```

执行结果：

> 3
> 7
> Happy birthday!
> Happy birthday!Happy birthday!Happy birthday!Happy birthday!Happy birthday!
> local x: 10
> global x: 20
> global y in function: 10
> global y outside: 10
> a: 13 b: 17 c: 8
> a: 125 b: 4 c: 24
> a: 80 b: 4 c: 40
> fpara: hello
> nums: (1, 3, 5, 7)
> words: {'word': 'python', 'another_word': 'java'}

### 六、控制流

#### 1、if语句

if condition:

​	do something

elif other_condition:

​	do something

```
number = 59
guess = int(input('Enter an integer: ')) #接收一个控制台输入，因为接收到的是一个字符串，所以需要转换成整型
if guess == number:
    print('Bingo! you guessed it right.')
elif guess < number:
    print('No, the number is higher than that')
else:
    print('No, the number is lower than that')
print('Done')
```

#### 2、for语句

range(1,10)是包括1，但不包括10的区间。

```
for i in range(1,10):
    print(i)
else:
    print('the for loop is over')

for i in [1,3,5,7,9]:
    print('list i:', i)

for i in (1,3,5,7,9):
    print('tuple i:', i)

mydict = {'a': 1, 'b': 2, 'c': 3}
for i in mydict:
    print('dictionary i:', i)
    print('dictionary i:', mydict[i])

for key, element in mydict.items():
    print(key, element)

number = 59
number_chances = 3

for i in range(1, number_chances + 1):
    print('chance: ' + str(i))
    guess = int(input('Enter an integer: ')) #接收一个控制台输入，因为接收到的是一个字符串，所以需要转换成整型
    if guess == number:
        print('Bingo! you guessed it right.')
        break
    elif guess < number:
        print('No, the number is higher than that. You have', number_chances - i, 'chances left')
    else:
        print('No, the number is lower than that. You have', number_chances - i, 'chances left')
print('Done')

a_list = [0, 1, 2]
print('using continue:')

for i in a_list:
	if not i:
		continue
    print(i)

print('using pass:')
for(i in a_list):
	if not i:
		pass  #pass就是什么也不做
	print(i)
```

执行结果：

> 1
> 2
> 3
> 4
> 5
> 6
> 7
> 8
> 9
> the for loop is over
> list i: 1
> list i: 3
> list i: 5
> list i: 7
> list i: 9
> tuple i: 1
> tuple i: 3
> tuple i: 5
> tuple i: 7
> tuple i: 9
> dictionary i: a
> dictionary i: 1
> dictionary i: b
> dictionary i: 2
> dictionary i: c
> dictionary i: 3
> a 1
> b 2
> c 3

for也可以在一个list、tuple或dictionary中来遍历。

#### 3、while语句

```
number = 59
guess_flag = False

while guess_flag == False:
    guess = int(input('Enter an integer: ')) #接收一个控制台输入，因为接收到的是一个字符串，所以需要转换成整型
    if guess == number:
        guess_flag = True
        print('Bingo! you guessed it right.')
    elif guess < number:
        print('No, the number is higher than that')
    else:
        print('No, the number is lower than that')
print('Done')



number = 59

while True:
    guess = int(input('Enter an integer: ')) #接收一个控制台输入，因为接收到的是一个字符串，所以需要转换成整型
    if guess == number:
        break  #直接跳出循环
    elif guess < number:
        print('No, the number is higher than that')
        continue
    else:
        print('No, the number is lower than that')
        continue

print('Bingo! you guessed it right.')
print('Done')
```

### 七、输入输出格式

#### 1、接受用户的输入：

input

```
str_1 = input('enter a string:')
str_2 = input('enter another string:')

print('str_1 is: ' + str_1 + '. str_2 is: ' + str_2)
print('str_1 is {} + str_2 is {}'.format(str_1, str_2))
```

执行结果：

> enter a string:1
> enter another string:2
> str_1 is: 1. str_2 is: 2
> str_1 is 1 + str_2 is 2

#### 2、读入和写出文件

```
some_sentences = '''i love learning python
because it is intresting
and also easy to use
'''

#open a file for writing
f = open('sentences.txt', 'w') #第二个参数表示以writing模式打开的意思
f.write(some_sentences)
f.close()

#if not specifying mode , read mode is default
f = open('sentences.txt')
while True:
    line = f.readline()
    #zero length means end of file
    if len(line) == 0:
        break
    print(line)
f.close()
```

执行结果：

> i love learning python
>
> because it is intresting
>
> and also easy to use

### 八、错误与异常Errors

#### 1、语法错误：

例如：

```
while True
	print(1)
```

执行结果：

> File "D:\eclipseworkspace\LearnPython\TestErrors.py", line 1
>
>   while True print(1)
>
> ```
>              ^
> ```
>
> SyntaxError: invalid syntax

这就是一个语法错误，原因是少了:号。

#### 2、异常（Exception）：

例1：

```
print(8/0)
```

执行结果：

> Traceback (most recent call last):
>   File "D:\eclipseworkspace\LearnPython\TestErrors.py", line 1, in <module>
>
> ```
> print(8/0)
> ```
>
> ZeroDivisionError: division by zero

例2：

```
print(hello * 4)
```

执行结果：

> Traceback (most recent call last):
>   File "D:\eclipseworkspace\LearnPython\TestErrors.py", line 3, in <module>
>
> ```
> print(hello * 4)
> ```
>
> NameError: name 'hello' is not defined

例3：

```
num = 6
print('hello' + num)
```

执行结果：

> Traceback (most recent call last):
>   File "D:\eclipseworkspace\LearnPython\TestErrors.py", line 6, in <module>
>
> ```
> print('hello' + num)
> ```
>
> TypeError: must be str, not int

处理异常：

```
while True:
	try:
		x = int(input('please enter an number'))
		break
	except ValueError:
		print('Not valid input, try again...')

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())   #strip()是清除首尾空格的方法
except OSError as err:
    print('OS error: {0}'.format(err))
except ValueError:
    print('could not convert data to an integer.')
```

### 九、面向对象编程

Python是完全支持面向对象编程的。

面向对象编程涉及一些概念：

类（class）：现实世界中一些事物的封装（如：学生、老师）

类的属性：如名字、年龄

类的方法：对类的属性进行的一些操作

类对象

实例对象

引用：通过引用对类的属性和方法进行操作

实例化：创建一个类的具体实例对象（如：学生张三）

```
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
    def introduce(self):
        print('Hi! I\'m ' + self.name)
        print('My grade is ' + str(self.grade))
    def improve(self, ammount):
        self.grade = self.grade + ammount

jim = Student('jim', 86)
jim.introduce()

jim.improve(10)
jim.introduce()
```

执行结果：

> Hi! I'm jim
> My grade is 86
> Hi! I'm jim
> My grade is 96

### 十、装饰器（decorator）  ['dɛkəretɚ]

```
def make_cake():
	return 'cake'

def add_candles(make_cake)
	def insert_candles():
		return make_cake() + ' and candles'
	return insert_candles

gift_func = add_candles(make_cake)

print(make_cake())
print(gift_func())
```

下面我们将这份代码做一个简单的修改，改成：

```
def make_cake():
	return 'cake'

def add_candles(make_cake):
	def insert_candles():
		return make_cake() + ' and candles'
	return insert_candles

make_cake = add_candles(make_cake)

print(make_cake())
```

再接下来，我们换成一个语法糖，并调整下函数顺序：

```
def add_candles(make_cake):
	def insert_candles():
		return make_cake() + ' and candles'
	return insert_candles

@add_candles
def make_cake():
	return 'cake'

print(make_cake())
```

这个@add_candles就是装饰器，意思是通过add_candles函数来对其后跟的make_cake函数做装饰。

执行结果：

> cake and candles

### 十一、图形用户界面（GUI）

GUI：Graphic User Interface

tkinter: GUI library for Python

GUI Example

```
from tkinter import *

import tkinter.simpledialog as dl
import tkinter.messagebox as mb

root = Tk()
w = Label(root, text = 'Label title')
w.pack()  #自动调节Label的大小以适应字数

mb.showinfo('Welcome', 'welcome message')
guess = dl.askinteger('Number', 'enter an number')

output = 'this is output message'
mb.showinfo('output: ', output)

```

### 十二、猜数字游戏

```
from tkinter import *

import tkinter.simpledialog as dl
import tkinter.messagebox as mb

root = Tk()
w = Label(root, text = 'Guess Number Game')
w.pack()

mb.showinfo('Welcome', 'Welcome to guess number game!')

number = 59
while True:
    guess = dl.askinteger('Number', 'what is you guess?')
    if guess == number:
        output = 'Bingo! you guessed right.'
        mb.showinfo('Hint: ', output)
        break
    elif guess < number:
        output = 'No, the number is higher than that.'
        mb.showinfo('Hint: ', output)
    else:
        output = 'No, the number is lower than that.'
        mb.showinfo('Hint: ', output)
print('Done')
```

### 十三、使用Python进行网页开发

```
import web

urls = ('/', 'index')

app = web.application(urls, globals())

class index:
	def GET(self):
		greeting = 'hello world'
		return greeting
	if __name__ == '__main__':
		app.run()
```

lpthw这个东西只在 Python2.7版本才支持。

因为我本机已经安装过Python2.7版本，所以只需要进行剩余的配置：

首先安装easy_install：[http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20](http://pypi.python.org/packages/2.7/s/setuptools/setuptools-0.6c11.win32-py2.7.exe#md5=57e1e64f6b7c7f1d2eddfc9746bbaf20)

其次安装lpthw.web：

```
C:\Python27\Scripts\easy_install lpthw.web
```

然后，执行：

```
d:
cd eclipseworkspace\LearnPython\
C:\Python27\python TestWebPage.py
```

再通过localhost:8080去访问。

### 十四、Django简介

什么是Django?

Django是一个基于Python的高级web开发框架，它能够让开发人员进行高效且快速的开发。高度集成（不用自己造轮子），免费并且开源。

安装Django：

[https://www.djangoproject.com/download/](https://www.djangoproject.com/download/)

```
pip install Django==1.11.6
```

### 十五、Python的文档资源

学习Python过程中，经常需要查看一些文档。

- 官方（英文）：

Tht Python Language Reference：[https://docs.python.org/3.6/reference/index.html](https://docs.python.org/3.6/reference/index.html)

The Python Standard Library：[https://docs.python.org/3.6/library/index.html](https://docs.python.org/3.6/library/index.html)

- 中文翻译资源：[http://www.pythondoc.com/](http://www.pythondoc.com/)

