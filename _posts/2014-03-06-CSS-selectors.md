---
layout:     post
title:      "CSS选择器，看这篇就够了"
subtitle:   ""
date:       2014-03-06 21:17:13
author:     "Paian"
catalog: true
tags:
    - CSS
---

## CSS选择器，看这篇就够了

### 一、CSS基本选择器

CSS基本选择器有如下5类，即通用选择器、元素类型选择器、类选择器、id选择器、属性选择器。

|选择器名称|选择器符号|匹配内容|最低支持的CSS版本|
|------|------|------|------|
|通用选择器|`*`|所有元素|2|
|元素类型选择器|使用元素类型（即元素标签名）进行选择|所有指定标签名的元素|1|
|类选择器|`.类名`|选中class属性中含有指定类名的所有元素|1|
|id选择器|`#id名`|所有id属性为指定id的元素|1|
|属性选择器|`[条件]`|具有匹配制定条件的属性的元素（此处支持的类型条件请见下表）|1|

属性选择器的条件类型，共7种，如下表：

|元素属性选择器的条件|说明|最低支持的CSS版本|
|------|------|------|
|`[attr]`|选择定义了attr属性的元素，不管该属性的值是什么，只要定义了该属性就会选中|2|
|`[attr="val"]`|选择定义了attr属性，且该属性的值为val字符串的元素|2|
|`[attr~="val"]`|选择定义了attr属性，且该属性具有一个或多个值，其中一个值即为val字符串的元素。例如对于`<a class="class1 class2">link</a>`以及`<a class="class2">link</a>`就都可以用选择器`[class~="class2"]`来进行选中|2|
|`[attr|="val"]`|选择定义了attr属性，且该属性的值为连字符(-)分割的一个或多个值，其中第一个字符串为val的元素。例如，用选择器`[lang|="en"]`可以选择`<a lang="en-us">en-us</a>`以及`<a lang="en">en</a>`|2|
|`[attr^="val"]`|选择定义了attr属性，且该属性的值以val字符串打头的元素|3|
|`[attr$="val"]`|选择定义了attr属性，且该属性的值以val字符串结尾的元素|3|
|`[attr*="val"]`|选择定义了attr属性，且该属性的值包含val字符串的元素|3|

### 二、复合选择器

|选择器名称|选择器符号|匹配内容|最低支持的CSS版本|
|------|------|------|------|
|并集选择器|<选择器>,<选择器>,<选择器>           即由英文逗号(,)分隔的多个选择器|选中的是其中的每一个单个选择器所选中元素的并集|1|
|后代选择器|<选择器> <选择器>|目标为匹配第一个选择器的元素的后代（注意不仅仅是直接子元素），且匹配第二个选择器|1|
|子代选择器|<选择器> > <选择器>|目标元素为匹配第一个选择器的元素的直接后代，且匹配第二个选择器|2|
|相邻兄弟选择器|<第一个选择器> + <第二个选择器>|目标元素为匹配第一个选择器的元素后所紧跟着的**那一个元素**，且匹配第二个选择器。例如，使用选择器`p + a {color: red;}`只会选中`<a>a1</a><p>p</p><a>a2</a><a>a3</a>`中的内容为a2的那一个元素。|2|
|普通兄弟选择器|<第一个选择器> ~ <第二个选择器>|目标元素位于匹配第一个选择器的元素之后，且匹配第二个选择器。它不要求紧邻，只要求之后就可以，因而允许选中若干个符合条件的元素。例如，使用选择器`p ~ a {color: red;}`就可以选中`<a>a1</a><p>p</p><a>a2</a><a>a3</a>`中的内容为a2、a3的两个元素。|3|
|伪元素选择器|`::first-line`、`::first-letter`、`::before`、`::after`、`::selection`、`::placeholder`、`::backdrop`|`::first-line`（选中文本内容的首行）、`::first-letter`（选中文本内容的首字母）、`::before`（在选中元素的内容之前插入内容）、`::after`（在选中元素的内容之后插入内容）、`::selection`（匹配被用户选择或处于高亮状态的部分，在火狐浏览器中需加-moz前缀，目前iOS、IE6-8不支持，安卓4.3及以下也不支持）、`::placeholder`（匹配占位符的文本，只有元素设置了placeholder属性时才能生效。该伪元素不是W3C标准，需要加上前缀它的实现可能在将来会有所改变，所以要决定使用时必须谨慎。在一些浏览器中（IE10和Firefox18及其以下版本）会使用单冒号的形式。）、`::backdrop`（处于试验阶段，用于改变全屏模式下的背景颜色，全屏模式的默认颜色为黑色。浏览器支持还非常差，可暂时不用理会）|`::first-line`（最低CSS 1支持）、`::first-letter`（最低CSS 1支持）、`::before`（最低CSS 2支持）、`::after`（最低CSS 2支持）、`::selection`（最低CSS 3支持）、`::placeholder`（非标准）、`::backdrop`（非标准）|
|伪类选择器|因为伪类选择器太多，下面单独用一张表列出|-|-|


CSS伪类选择器：

|选择器名称|选择器符号|匹配内容|最低支持的CSS版本|
|------|------|------|------|
|其它选择器|`:root`|选中文档中的根元素，总是返回html|3|
|其它选择器|`: fullscreen `|处于试验性质，`:fullscreen`匹配处于全屏模式下的元素。全屏模式不是通过按F11来打开的全屏模式，而是通过Javascript的Fullscreen API来打开的，不同的浏览器有不同的Fullscreen API。目前，:fullscreen需要添加前缀才能使用。|3|
|`:lang(<目标语言>)`选择器|`:lang(<目标语言>)`|选中lang属性包含目标语言的元素，比如`:lang(en){}`会选中`<a lang="en"></a>`以及`<a lang="en-us"></a>`，跟`[lang|="en"]`|3|
|语言相关选择器|`: dir(rtl或ltr) `|:dir匹配指定阅读方向的元素，当HTML元素中设置了dir属性时该伪类才能生效。现时支持的阅读方向有两种：ltr（从左往右）和rtl（从右往左）。目前，只有火狐浏览器支持:dir伪类，并在火狐浏览器中使用时需要添加前缀( -moz-dir() )。|3|
|UI伪类选择器|`:enable`|选中启用状态的元素|3|
|UI伪类选择器|`:disable`|选中禁用状态的元素|3|
|`:indeterminate`选择器|`:indeterminate`|indeterminate的英文意思是“不确定的”。当某组中的单选框或复选框还没有选取状态时，`:indeterminate`匹配该组中所有的单选框或复选框。|3|
|UI伪类选择器|`:checked`|选中被选中的input元素（单选按钮、复选框）|3|
|UI伪类选择器|`:default`|选中默认元素，经常跟outline样式一起用。比如`:default{outline: medium solid red;}`作用于```
<form action="#">
    <button>重置</button>
    <button type="submit">提交</button>
</form>```，会给默认的提交按钮加上红色边框。|3|
|UI伪类选择器|`:valid`|选中根据输入验证有效的input元素|3|
|UI伪类选择器|`:invalid`|选中根据输入验证无效的input的元素|3|
|UI伪类选择器|`:in-range`|匹配在指定区域内元素。
如下例，当数字选择器的数字在5到10时，可以被`:in-range`匹配中。`<input type="number" min="5" max="10">`|3|
|UI伪类选择器|`:out-of-rage`|与上面的`:in-range`恰好相反|3|
|UI伪类选择器|`:required`|选中具有required属性的input元素|3|
|UI伪类选择器|`:optional`|`:optional`匹配具有optional属性的表单元素。当表单元素没有设置为required时，即为optional属性。|3|
|UI伪类选择器|`:read-only`|`:read-only`匹配具有readonly属性的元素。|3|
|UI伪类选择器|`:read-write`|`:read-write`匹配input、textarea以及设置了contenteditable属性的其它HTML元素，且要求这些元素当前处于编辑状态。|3|
|动态伪类选择器|`:link`|选中所有链接元素|1|
|动态伪类选择器|`:visited`|选中用户已访问的链接元素|1|
|动态伪类选择器|`:hover`|选中鼠标停在其上的元素|2|
|动态伪类选择器|`:active`|选中当前被用户激活的元素（通常意味着处于点中或按压状态的元素）|2|
|动态伪类选择器|`:focus`|选中当前获得焦点的元素|2|
|`:target`选择器|`: target `|选中当前浏览器地址栏中`#xxx`所指向页面中具有属性`id="xxx"`的元素，可以根据URL中hash的变换来选中页面中不同的元素|3|
|`:empty`选择器|`:empty`|选中没有子元素的元素（也会包含只有HTML注释语句的元素）|3|
|否定选择器|`:not(<选择器>)`|对括号内选择器的选择取反|3|
|子元素选择器一|`:first-child`|选中元素的第一个子元素|2|
|子元素选择器二|`:last-child`|选中元素的最后一个子元素|3|
|子元素选择器三|`:only-child`|选中元素的唯一一个子元素|3|
|子元素选择器四|`:only-of-type`|选中元素的指定类型的唯一子元素|3|
|`:nth-child(n)`选择器|`:nth-child(n)`|选中某元素的第n个子元素。它接受一个an+b形式的参数。|3|
|`:nth-last-child(n)`选择器|`:nth-last-child(n)`|选中某元素的倒数第n个子元素。它接受一个an+b形式的参数。|3|
|`:nth-of-type(n)`选择器|`:nth-of-type(n)`|选中某元素的第n个指定类型的子元素。它接受一个an+b形式的参数。|3|
|`:nth-last-of-type(n)`选择器|`:nth-last-of-type(n)`|选中某元素的倒数第n个指定类型的子元素。它接受一个an+b形式的参数。|3|

### 三、伪元素和伪类的区别

CSS引入伪类和伪元素概念是为了格式化文档树以外的信息(参见：[https://www.w3.org/TR/CSS2/selector.html#pseudo-elements](https://www.w3.org/TR/CSS2/selector.html#pseudo-elements))。

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过`:hover`来描述这个元素的状态。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。

伪元素则创建了一个文档树外的元素，伪类的操作对象是文档树中已有的元素。因此，伪元素与伪类的区别在于：有没有创建一个文档树之外的元素。

### 四、伪元素是应该写一个冒号还是写两个？

CSS3规范中的要求使用双冒号(::)表示伪元素，以此来区分伪元素和伪类，比如::before和::after等伪元素使用双冒号(::)，:hover和:active等伪类使用单冒号(:)。事实上，除了一些低于IE8版本的浏览器外，大部分浏览器都支持伪元素的双冒号(::)表示方法。

同时，除了少部分伪元素，如::backdrop必须使用双冒号，大部分伪元素都同时支持单冒号和双冒号的写法，比如::after，写成:after也可以正确运行。

对于伪元素是使用单冒号还是双冒号的问题，w3c标准中的描述如下：

	Please note that the new CSS3 way of writing pseudo-elements is to use a double colon, eg a::after { … }, to set them apart from pseudo-classes. You may see this sometimes in CSS. CSS3 however also still allows for single colon pseudo-elements, for the sake of backwards compatibility, and we would advise that you stick with this syntax for the time being.

大概的意思就是：虽然CSS3标准要求伪元素使用双冒号的写法，但也依然支持单冒号的写法。为了向后兼容，我们建议你在目前还是使用单冒号的写法。

不过，我认为，如果你不是在写需要兼容IE8及安卓2.3版本（安卓2.3版本不支持`:first-letter`，但是它对于`:before`和`:after`还是支持的）的网站的话，我建议你采用双冒号（请看兼容性表http://caniuse.com/#search=%3A%3Afirst-letter），这样更符合标准，也便于把伪元素与伪类区别开来。

### 五、CSS计数器特性

顺便提一下，`::before`和`::after`这两个伪元素选择器经常会与CSS计数器特性一起使用，结合两者生成数字序号。

首先需要在外部容器中创建计数器。使用`counter-reset: 计数器名称1 计数器1的初始值 计算器2 计数器2的初始值 ……;`，这样可以定义一个或多个计数器。

然后在需要加上序号的元素上设置样式。`content: counter(计数器名称<, 计数器样式参数>) ". ";`其中计数器样式参数可以指定为list-style-type属性所支持的任意值。

你还需要使用`counter-increment: 计数器名< 增量值>`来指定某个计数器的增量。如果不指定增量值，默认的增量是1。

下面是一个例子:

```
<style>
	body{
		counter-reset: paragraphcount;
	}
	p::before{
		content: counter(paragraphcount) ". ";
		counter-increment: paragraphcount;
	}
</style>
```

```
<body>
	<p>paragraph 1</p>
	<p>paragraph 2</p>
</body>
```

2016.7.19有更新。

参考资料：

[总结伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

《HTML5权威指南》 Adam Freeman 著