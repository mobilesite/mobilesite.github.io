---
layout:     post
title:      "［译］CSS字符转义序列"
subtitle:   ""
date:       2016-10-26 23:11:43
author:     "Paian"
catalog:    true
tags:
    - CSS字符转义
---

当你在写为一些带有特殊class名或id属性值的标签写CSS的时候，你需要留意一些规则。例如，不能直接使用 `## { color: #f00; }`来为一个带有`id="#"`属性的元素写样式，相反，你需要对其中的特殊字符进行转义（在这个例子中，特殊字符就是第二个‘＃’）。这样做的目的是消除那些被标识符（identifiers）所包含的特殊字符的意义，并且允许你使用一些平时不太容易用键盘录入的字符作为CSS的选择器的组成部分。

还有一些其它的情况你可能也需要在CSS中用到字符转义。比如，你可能在写一个时髦的id、class、属性或者属性值，抑或你想在不改变CSS文件编码格式的情况下用content属性插入一些特殊字符。

### 一、CSS中的Identifiers和strings

W3C标准使用铁道图来表示标识符（identifiers）。它包含a-z的大小写英文字母，0-9的数字，下划线（_）和短连接线（-）。identifiers不能以数字开头，也不能以短连接线加一个数字开头，不允许是一个空字符串——即至少需要包含一个字符。

这种标识符（identifiers）的语法被用在很多的场景上，包括选择器中的属性名、class名和id。
标准中关于string的定义则是你可以用双引号或者单引号。默认情况下，双引号里面不能嵌套双引号，除非你对里面嵌套的双引号进行转义（`\”`或者`\22`）。同样，单引号里面如果需要嵌套单引号的话，你也需要对单引号进行转义（`\’`或者`\27`）。一个字符串也不能包含一个新的行，你可以使用`"\A"` or `"\00000a"`来实现。

如你所见，字符转义可以在identifiers和strings中使用。接下来我们看看他们是怎么工作的？

### 二、怎样在CSS中进行字符转换呢？

下面是一些在CSS中进行字符转义时需要注意的规则。如果你在为一个给定的class名或id名写选择器，那么你需要遵循的是identifiers的语法要求。如果你在CSS中写引号包含的内容（string），那么你只需要对引号和新行进行字符转换。

#### 1、前导数位（Leading digits）

如果identifier的首字符是数字，那么你需要基于它的Unicode编码点（unicode code point）进行转义。例如，字符1的Unicode编码点是U+0031，所以你需要将其转义成`\000031`或`\31 `（注意一下这里有个空格）。

大致说来，转换任何数字字符的时候，你只需要在这个数字的前面加上`\3`并且在转义的末尾缀上一个空格。是的，Unicode编码！

#### 2、CSS中的特殊字符

任何一个十六进制位、换行、回车、换页（即`\f`）之外的字符都可以通过用一个反斜杠进行转义来消除其自身的特殊含义。
下面这些字符是在CSS中有特殊含义的。

```
!
"
#
$
%
&
'
(
)
*
+
,
-
.
/
:
;
<
=
>
?
@
[
\
]
^
`
{
|
}
~
```

如果你想使用它们，有两个方法可选。

第一种方法是：你可以使用它们的Unicode编码点（unicode code point）。例如，加号(+)的是U+002B，所以当你想在CSS中使用这个符号的时候，你可以将其转义成`\2b `或者`\00002b`（用6个十六进制位）。

第二种方法就简洁多了，直接在待转义的字符前面加上反斜杠。比如，+将被转成`\+`。不过有一点需要注意——理论上，:应该被转义成`\:`。但是，在版本小于8的IE浏览器中不能识别`\:`，一种变通方案就是使用`\3A `。

#### 3、空白字符（Whitespace characters）

空白字符（Whitespace） — 尽管严格来说有些字符在HTML属性中是不合法的——也是可以照常转义的。
[\t\n\v\f\r]当中的任何一个字符都需要基于其Unicode编码点进行转义， 而空格字符( ) 则只需要在其前面加一个反斜杠来进行转义，即`\ `。除了[\t\n\v\f\r]当中的字符以及空格字符，其它的空白字符（Whitespace characters）均不需要转义。 

#### 4、下划线（Underscores）

CSS并不要求对下划线进行转义，除非它作为identifier的首字符的时候。但是，我强烈推荐对下划线都进行转义，以防止IE6忽略这一整条CSS规则。

#### 5、其它的Unicode字符（Other Unicode characters）

除此之外，CSS中其它那些不可能传达任何特殊含义的字符（例如♥）可以而且应该不做转义。

理论上（按照标准），任何字符都可以像上文提到的那样在其Unicode编码点的基础上进行转义（例如，对于𝌆，Unicode编码点是U+1D306，可以转义成`\1d306 `或者 `\01d306`），但是[老的Webkit浏览器在BMP之外不支持这种字符语法](https://bugs.webkit.org/show_bug.cgi?id=76152)（2012年4月修复）。

因为浏览器的bug，有一种方式（非标准的）可以转义这些字符，即分解成UTF-16编码单元（UTF-16 code units），比如`\d834\df06  `，但这种语法不被Gecko和Opera 12所支持。

既然目前没有办法全浏览器兼容的转义non-BMP symbols 的方法，最好的方式就是不对这些字符进行转义。

#### 6、十六进制转义符后面的尾部空格（Trailing whitespace after hexadecimal escape sequences）

任何十六进制转义符后面紧接着的U+0020空白字符会自动转义符“吞并”。例如，foo © bar 转义之后是` foo \A9  bar `,`\A9`后面会紧跟着两个空格，但是第一个空格会被吞掉，只留下第二个空格。

十六进制转义符后面的尾部空格只有在其下一个字符不是空格字符或十六进制位的情况下才能省略。例如，foo©bar必须转义成`foo\A9 bar`, 空格不能省略。而foo©qux 可以转义成`foo\A9qux`，空格省略掉是可以的。因为b是一个十六进制位而q不可能是十六进制位。

#### 7、一些例子

下面随便举些例子进行说明:

```
.\3A \`\( { } /* matches elements with class=":`(" */
.\31 a2b3c { } /* matches elements with class="1a2b3c" */
#\#fake-id {} /* matches the element with id="#fake-id" */
#-a-b-c- {} /* matches the element with id="-a-b-c-" */
#© { } /* matches the element with id="©" */
```

### 三、…那么JavaScript中是怎样的呢?

在JavaScript中，要视情况而定。

一方面，`document.getElementById()` 以及类似的方法如`document.getElementsByClassName()` 只需要用未转义的属性值。当然，你需要转义所有的引号以保证它是一个合法的JavaScript字符串。

另一方面，如果将要在[Selectors Api]( https://www.w3.org/TR/selectors-api/)（例如`document.querySelector()` 和 `document.querySelectorAll()`）中或者那些依赖于同样语法的库（如jQuery/Sizzle）使用这些选择器，那么你就需要使用转义过的CSS选择器并且对它进行转义——其实你需要做的仅仅是把转义过的CSS选择器中所有的反斜杠处再多加一个反斜杠（当然，涉及引号的地方你也是需要进行转义的）。

```
<!-- HTML -->
<p class=":`("></p>
/* CSS */
.\3A \`\( { }
/* JavaScript */
document.getElementsByClassName(':`(');
document.querySelectorAll('.\\3A \\`\\(');
```

### 四、CSS转义工具

记住这些规则听起来好像很有趣。但是，为了更为简单一点，我创建了一个[CSS转义器]( https://mothereff.in/css-escapes)，它将帮助你完成那些转义的苦差事。

只需要输入字符，它将基于上文所述的规则，告诉你在CSS和JavaScript中应该怎样进行转义。里面用了一个id属性作为例子，不过你也可以用它来给classs属性和content property进行转移。慢慢享用吧！

你想转义字符以用在CSS strings 或 identifiers吗？我已经将此工具打包成开源的JavaScript库并命名为[cssesc]( https://github.com/mathiasbynens/cssesc)。马上去看看吧！


更新:  CSS Object Model 标准现在已经定义了[CSS.escape()](https://drafts.csswg.org/cssom/#the-css.escape%28%29-method), 一个帮你完成转义的实用方法。我给它写了个[pollyfill]( https://github.com/mathiasbynens/CSS.escape)。

注意：如果你想了解跟多关于CSS转义的内容，不妨阅读 [JavaScript character escape sequences]( https://mathiasbynens.be/notes/javascript-escapes)或者 [character references in HTML]( https://mathiasbynens.be/notes/ambiguous-ampersands)。


原文：[CSS character escape sequences](https://mathiasbynens.be/notes/css-escapes)  

原作者：Mathias Bynens（比利时人）



