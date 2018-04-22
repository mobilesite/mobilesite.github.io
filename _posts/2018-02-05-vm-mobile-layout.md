---
layout:     post
title:      "[转]移动端适配方案：基于flexible库的成熟方案和基于vw的新方案"
subtitle:   ""
date:       2018-02-05 23:50:42
author:     "Paian"
catalog: true
tags:
    - 布局
    - vw
---

本文的内容主要整理自[大漠老师的几篇相关文章](https://www.w3cplus.com)。

### 一、成熟方案：flexible

之前，比较成熟的方案是用[flexible库](https://github.com/amfe/lib-flexible)来进行移动端的布局适配。

#### 1、基本概念的理解

- 物理像素(physical pixel)

物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。正是这些设备像素的微小距离欺骗了我们肉眼看到的图像效果。

- 设备独立像素(density-independent pixel)

设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

- CSS像素

CSS像素是一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。一般情况之下，CSS像素称为与设备无关的像素(device-independent pixel)，简称DIPs。

- 设备像素比(device pixel ratio)

设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

设备像素比 ＝ 物理像素 / 设备独立像素

在JavaScript中，可以通过window.devicePixelRatio获取到当前设备的dpr。而在CSS中，可以通过-webkit-device-pixel-ratio，-webkit-min-device-pixel-ratio和 -webkit-max-device-pixel-ratio进行媒体查询，对不同dpr的设备，做一些样式适配(这里只针对webkit内核的浏览器和webview)。

- CSS单位rem

在W3C规范中是这样描述rem的:

font size of the root element.

简单的理解，rem就是相对于根元素`<html>`的`font-size`来做计算。而我们的方案中使用rem单位，是能轻易的根据`<html>`的`font-size`计算出元素的盒模型大小。而这个特色对我们来说是特别的有益处。

#### 2、使用方法

lib-flexible库的使用方法非常的简单，只需要在Web页面的`<head></head>`中添加对应的flexible_css.js,flexible.js文件：

第一种方法是将文件下载到你的项目中，然后通过相对路径添加:

```
<script src="build/flexible_css.debug.js"></script>
<script src="build/flexible.debug.js"></script>
```

或者直接加载阿里CDN的文件：

```
<script src="http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js"></script>
```

另外强烈建议对JS做内联处理，在所有资源加载之前执行这个JS。执行这个JS后，会在`<html>`元素上增加一个`data-dpr`属性，以及一个`font-size`样式。JS会根据不同的设备添加不同的`data-dpr`值，比如说2或者3，同时会给html加上对应的`font-size`的值，比如说75px。

如此一来，页面中的元素，都可以通过`rem`单位来设置。他们会根据html元素的`font-size`值做相应的计算，从而实现屏幕的适配效果。

除此之外，在引入lib-flexible需要执行的JS之前，可以手动设置`meta`来控制dpr值，如：

```
<meta name="flexible" content="initial-dpr=2" />
```

其中initial-dpr会把dpr强制设置为给定的值。如果手动设置了dpr之后，不管设备是多少的dpr，都会强制认为其dpr是你设置的值。在此不建议手动强制设置dpr，因为在Flexible中，只对iOS设备进行dpr的判断，对于Android系列，始终认为其dpr为1。

```
if (!dpr && !scale) {
    var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    scale = 1 / dpr;
}
```

#### 3、flexible的实质

flexible实际上就是能过JS来动态改写meta标签，代码类似这样：

```
var metaEl = doc.createElement('meta');
var scale = isRetina ? 0.5:1;
metaEl.setAttribute('name', 'viewport');
metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
if (docEl.firstElementChild) {
    document.documentElement.firstElementChild.appendChild(metaEl);
} else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    documen.write(wrap.innerHTML);
}
```

事实上它做了这几样事情：

动态改写`<meta>`标签；

给`<html>`元素添加`data-dpr`属性，并且动态改写`data-dpr`的值；

给`<html>`元素添加`font-size`属性，并且动态改写`font-size`的值。

#### 4、如何将设计稿的px转成代码中的rem单位

目前Flexible会将视觉稿分成100份（主要为了以后能更好的兼容vh和vw），而每一份被称为一个单位a。同时1rem单位被认定为10a。针对我们这份视觉稿可以计算出：

对于750 x 1134 px的设计稿：

1a   = 7.5px

1rem = 75px 

那么我们这个示例的稿子就分成了10a，也就是整个宽度为10rem，`<html>`对应的`font-size`为75px：

这样一来，对于视觉稿上的元素尺寸换算，只需要原始的px值除以rem基准值即可。例如此例视觉稿中的图片，其尺寸是176px x 176px,转换成为2.346667rem x 2.346667rem。

怎么快速转换呢？

使用PostCSS插件postcss-px2rem：

```
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

gulp.task('default', function() {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```

#### 5、字号不使用rem

我们在iPhone3G和iPhone4的Retina屏下面，希望看到的文本字号是相同的。也就是说，我们不希望文本在Retina屏幕下变小，另外，我们希望在大屏手机上看到更多文本，以及，现在绝大多数的字体文件都自带一些点阵尺寸，通常是16px和24px，所以我们不希望出现13px和15px这样的奇葩尺寸。

如此一来，就决定了在制作H5的页面中，rem并不适合用到段落文本上。所以在Flexible整个适配方案中，考虑文本还是使用px作为单位。只不过使用`[data-dpr]`属性来区分不同dpr下的文本字号大小。

```
div {
    width: 1rem; 
    height: 0.4rem;
    font-size: 12px; // 默认写上dpr为1的fontSize
}
[data-dpr="2"] div {
    font-size: 24px;
}
[data-dpr="3"] div {
    font-size: 36px;
}
```

为了能更好的利于开发，在实际开发中，我们可以定制一个font-dpr()这样的LESS mixin：

```
@mixin font-dpr(@font-size){
    font-size: @font-size;

    [data-dpr="2"] & {
        font-size: @font-size * 2;
    }

    [data-dpr="3"] & {
        font-size: @font-size * 3;
    }
}
```

当然这只是针对于描述性的文本，比如说段落文本。但有的时候文本的字号也需要分场景的，比如在项目中有一个slogan,业务方希望这个slogan能根据不同的终端适配。针对这样的场景，完全可以使用rem给slogan做计量单位。

手淘这边的flexible方案临时升级如下：

针对OS 9_3的UA，做临时处理，强制dpr为1，即scale也为1，虽然牺牲了这些版本上的高清方案，但是也只能这么处理了。

这个版本不打算发布到CDN（也不发不到tnpm），所以大家更新的方式，最好手动复制代码内联到html中，具体代码可以点击[这里下载](http://www.w3cplus.com/sites/default/files/blogs/2016/1601/flexible.js)。

### 二、基于vw的新方案

#### 1、基本概念

在CSS Values and Units Module Level 3中和Viewport相关的单位有四个，分别为vw、vh、vmin和vmax。

vw：是Viewport's width的简写,1vw等于window.innerWidth的1%

vh：和vw类似，是Viewport's height的简写，1vh等于window.innerHeihgt的1%

vmin：vmin的值是当前vw和vh中较小的值

vmax：vmax的值是当前vw和vh中较大的值

vmin和vmax是根据Viewport中长度偏大的那个维度值计算出来的，如果window.innerHeight > window.innerWidth则vmin取百分之一的window.innerWidth，vmax取百分之一的window.innerHeight计算。

![](/img/in-post/vue-vm-layout1.jpg)

目前vw单位的支持情况：

![](/img/in-post/vue-vm-layout2.png)

目前出视觉设计稿，我们都是使用750px宽度的，从上面的原理来看，那么100vw = 750px，即1vw = 7.5px。那么我们可以根据设计图上的px值直接转换成对应的vw值。看到这里，很多同学开始感到崩溃，又要计算，能不能简便一点，能不能再简单一点，其实是可以的，我们可以使用PostCSS的插件postcss-px-to-viewport，让我们可以直接在代码中写px，打包时可用这个工具来将px转成vw。

在实际使用的时候，你可以对该插件进行相关的参数配置：

```
"postcss-px-to-viewport": {
    viewportWidth: 750,
    viewportHeight: 1334,
    unitPrecision: 5,
    viewportUnit: 'vw',
    selectorBlackList: [],
    minPixelValue: 1,
    mediaQuery: false
}
```

详细的参见官方文档：https://github.com/evrone/postcss-px-to-viewport

那么在哪些地方可以使用vw来适配我们的页面。根据相关的测试：

容器适配，可以使用vw

文本的适配，可以使用vw

大于1px的边框、圆角、阴影都可以使用vw

内距和外距，可以使用vw

#### 2、坑1：高度不一致

另外有一个细节需要特别的提出，比如我们有一个这样的设计：

![](/img/in-post/vue-vm-layout3.png)

如果我们直接使用：

```
[w-188-246] {
    width: 188px;
}
[w-187-246]{
    width: 187px
}
```

最终的效果会造成[w-187-246]容器的高度小于[w-188-246]容器的高度。这个时候我们就需要考虑到容器的长宽比缩放。

这方面的方案很多，但我还是推荐工具化来处理，这里推荐@一丝 姐姐写的一个PostCSS插件postcss-aspect-ratio-mini。这个插件使用很简单，不需要做任何的配置，你只需要本地安装一下就OK。

对于

```
[aspectratio][aspect-ratio="188/246"]{
    aspect-ratio: '188:246';
}
```

编译出来就是：

```
[aspectratio][aspect-ratio="188/246"]:before {
    padding-top: 130.85106382978725%;
}
```

这样就可以完美的实现长宽比的效果。目前采用PostCSS插件只是一个过渡阶段，在将来我们可以直接在CSS中使用aspect-ratio属性来实现长宽比。

#### 3、解决1px方案

使用postcss-write-svg你可以通过border-image或者background-image两种方式来处理。比如：

```
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}
```

这样PostCSS会自动帮你把CSS编译出来：

```
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
}
```

使用PostCSS的插件是不是比我们修改图片要来得简单与方便。

上面演示的是使用border-image方式，除此之外还可以使用background-image来实现。比如：

```
@svg square {
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 100%;
    }
}

#example {
    background: white svg(square param(--color #00b1ff));
}
```

编译出来就是：

```
#example {
    background: white url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300b1ff' width='100%25' height='100%25'/%3E%3C/svg%3E");
}
```

这个方案简单易用，是我所需要的。目前测试下来，基本能达到我所需要的需求。但有一点千万别忘了，记得在`<head>`中添加：

```
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
```

上面阐述的是这个适配方案中所用到的技术点，简单的总结一下：

使用vw来实现页面的适配，并且通过PostCSS的插件postcss-px-to-viewport把px转换成vw。这样的好处是，我们在撸码的时候，不需要进行任何的计算，你只需要根据设计图写px单位；

为了更好的实现长宽比，特别是针对于img、vedio和iframe元素，通过PostCSS插件postcss-aspect-ratio-mini来实现，在实际使用中，只需要把对应的宽和高写进去即可；

为了解决1px的问题，使用PostCSS插件postcss-write-svg,自动生成border-image或者background-image的图片，考虑到低版本的兼容问题，建议采用background-image。

#### 4、降级处理

有两种方式可以进行降级处理：

CSS Houdini：通过CSS Houdini针对vw做处理，调用CSS Typed OM Level1 提供的CSSUnitValue API。

CSS Polyfill：通过相应的Polyfill做相应的处理，目前针对于vw单位的Polyfill主要有：vminpoly、Viewport Units Buggyfill、vunits.js和Modernizr。个人推荐采用Viewport Units Buggyfill

#### 5、Viewport不足之处

采用vw来做适配处理并不是只有好处没有任何缺点。有一些细节之处还是存在一定的缺陷的。

比如当容器使用vw单位，margin采用px单位时，很容易造成整体宽度超过100vw，从而影响布局效果。对于类似这样的现象，我们可以采用相关的技术进行规避。比如将margin换成padding，并且配合box-sizing。只不过这不是最佳方案，随着将来浏览器或者应用自身的Webview对`calc()`函数的支持之后，碰到vw和px混合使用的时候，可以结合`calc()`函数一起使用，这样就可以完美的解决。

另外一点，px转换成vw单位，多少还会存在一定的像素差，毕竟很多时候无法完全整除。

#### 6、安装依赖

安装一批PostCSS插件：

```
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano cssnano-preset-advanced -D
```

接下来在.postcssrc.js文件对新安装的PostCSS插件进行配置：

```
module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-aspect-ratio-mini": {}, 
        "postcss-write-svg": {
            utf8: false
        },
        "postcss-cssnext": {},
        "postcss-px-to-viewport": {
            viewportWidth: 750,     // (Number) The width of the viewport.
            viewportHeight: 1334,    // (Number) The height of the viewport.
            unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: 'vw',     // (String) Expected units.
            selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
            mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
        }, 
        "postcss-viewport-units":{},
        "cssnano": {
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }
    }
}
```

**特别声明：由于cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false。**

- postcss-cssnext

postcss-cssnext其实就是cssnext。该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。其包含的特性主要有：

![](/img/in-post/vue-vm-layout4.png)

- cssnano

cssnano主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。不过你也可以使用postcss-loader显式的使用cssnano。

**cssnano集成了一些其他的PostCSS插件，如果你想禁用cssnano中的某个插件的时候，可以像下面这样操作：**

```
"cssnano": {
    autoprefixer: false,
    "postcss-zindex": false
}
```

**上面的代码把autoprefixer和postcss-zindex禁掉了。前者是有重复调用，后者是一个讨厌的东东。只要启用了这个插件，z-index的值就会重置为1。这是一个天坑，千万记得将postcss-zindex设置为false。**

- postcss-px-to-viewport

postcss-px-to-viewport插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。

在配置中需要配置相关的几个关键参数：

```
"postcss-px-to-viewport": {
    viewportWidth: 750,      // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
    viewportHeight: 1334,    // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
    unitPrecision: 3,        // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
    viewportUnit: 'vw',      // 指定需要转换成的视窗单位，建议使用vw
    selectorBlackList: ['.ignore', '.hairlines'],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
    minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
    mediaQuery: false       // 允许在媒体查询中转换`px`
}
```

在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)：

```
<div class="box ignore"></div>
```

- postcss-aspect-ratio-mini

postcss-aspect-ratio-mini主要用来处理元素容器宽高比。

```
<div aspectratio>
    <div aspectratio-content></div>
</div>
```

在实际使用的时候，你可以把自定义属性aspectratio和aspectratio-content换成相应的类名，比如：

```
<div class="aspectratio">
    <div class="aspectratio-content"></div>
</div>
```

我个人比较喜欢用自定义属性，它和类名所起的作用是同等的。结构定义之后，需要在你的样式文件中添加一个统一的宽度比默认属性：

```
[aspectratio] {
    position: relative;
}
[aspectratio]::before {
    content: '';
    display: block;
    width: 1px;
    margin-left: -1px;
    height: 0;
}

[aspectratio-content] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}
```

如果我们想要做一个188:246（188是容器宽度，246是容器高度）这样的比例容器，只需要这样使用：

```
[w-188-246] {
    aspect-ratio: '188:246';
}
```

**有一点需要特别注意：aspect-ratio属性不能和其他属性写在一起，否则编译出来的属性只会留下aspect-ratio的值**，比如：

```
<div aspectratio w-188-246 class="color"></div>
```

编译前的CSS如下：

```
[w-188-246] {
    width: 188px;
    background-color: red;
    aspect-ratio: '188:246';
}
```

编译之后：

```
[w-188-246]:before {
    padding-top: 130.85106382978725%;
}
```

主要是因为在插件中做了相应的处理，不在每次调用aspect-ratio时，生成前面指定的默认样式代码，这样代码没那么冗余。所以在使用的时候，需要把`width`和`background-color`分开来写：

```
[w-188-246] {
    width: 188px;
    background-color: red;
}
[w-188-246] {
    aspect-ratio: '188:246';
}
```

这个时候，编译出来的CSS就正常了：

```
[w-188-246] {
    width: 25.067vw;
    background-color: red;
}
[w-188-246]:before {
    padding-top: 130.85106382978725%;
}
```

- postcss-write-svg

postcss-write-svg插件主要用来处理移动端1px的解决方案。该插件主要使用的是`border-image`和`background`来做1px的相关处理。比如：

```
@svg 1px-border {
    height: 2px;
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 50%;
    }
}
.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
}
```

编译出来的CSS:

```
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
}
```

上面演示的是使用border-image方式，除此之外还可以使用background-image来实现。比如：

```
@svg square {
    @rect {
        fill: var(--color, black);
        width: 100%;
        height: 100%;
    }
}

#example {
    background: white svg(square param(--color #00b1ff));
}
```

编译出来就是：

```
#example {
    background: white url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300b1ff' width='100%25' height='100%25'/%3E%3C/svg%3E");
}
```

**特别声明：由于有一些低端机对border-image支持度不够友好，个人建议你使用background-image的这个方案。**

- postcss-viewport-units

postcss-viewport-units插件主要是给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作。

这是实现vw布局必不可少的一个插件，因为少了这个插件，这将是一件痛苦的事情。后面你就清楚。

到此为止，有关于所需要的PostCSS已配置完。并且简单的介绍了各个插件的作用。

对于不支持vm单位的机型的降级处理：

使用viewport的polyfill：Viewport Units Buggyfill。使用viewport-units-buggyfill主要分以下几步走:

引入JavaScript文件

viewport-units-buggyfill主要有两个JavaScript文件：viewport-units-buggyfill.js和viewport-units-buggyfill.hacks.js。你只需要在你的HTML文件中引入这两个文件。比如在Vue项目中的index.html引入它们：

```
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>
```

你也可以使用其他的在线CDN地址，也可将这两个文件合并压缩成一个.js文件。这主要看你自己的兴趣了。
第二步，在HTML文件中调用viewport-units-buggyfill，比如：

```
<script>
    window.onload = function () {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
    }
</script>
```

具体的使用。在你的CSS中，只要使用到了viewport的单位（vw、vh、vmin或vmax ）地方，需要在样式中添加content：

```
.my-viewport-units-using-thingie {
    width: 50vmin;
    height: 50vmax;
    top: calc(50vh - 100px);
    left: calc(50vw - 100px);

    /* hack to engage viewport-units-buggyfill */
    content: 'viewport-units-buggyfill; width: 50vmin; height: 50vmax; top: calc(50vh - 100px); left: calc(50vw - 100px);';
}
```

这可能会令你感到恶心，而且我们不可能每次写vw都去人肉的计算。特别是在我们的这个场景中，咱们使用了postcss-px-to-viewport这个插件来转换vw，更无法让我们人肉的去添加content内容。
这个时候就需要前面提到的postcss-viewport-units插件。这个插件将让你无需关注content的内容，插件会自动帮你处理。比如插件处理后的代码：

![](/img/in-post/vue-vm-layout5.png)

Viewport Units Buggyfill还提供了其他的功能。详细的这里不阐述了。**但是content也会引起一定的副作用。比如img和伪元素`::before(:before)`或`::after（:after）`。在img中content会引起部分浏览器下，图片不会显示。这个时候需要全局添加：**

```
img {
    content: normal !important;
}

// 编译前
.after {
    content: 'after content';
    display: block;
    width: 100px;
    height: 20px;
    background: green;
}

// 编译后
.after[data-v-469af010] {
    content: "after content";
    display: block;
    width: 13.333vw;
    height: 2.667vw;
    background: green;
}
```

**这个时候我们需要通过添加额外的标签来替代伪元素（这个情景我没有测试到，后面自己亲测一下）。**
到了这个时候，你就不需要再担心兼容问题了。


参考的相关技术文章：

使用Flexible实现手淘H5页面的终端适配
https://www.w3cplus.com/mobile/lib-flexible-for-html5-layout.html

再谈Retina下1px的解决方案
https://www.w3cplus.com/css/fix-1px-for-retina.html

再聊移动端页面的适配
https://www.w3cplus.com/css/vw-for-layout.html

如何在Vue项目中使用vw实现移动端适配
https://www.w3cplus.com/mobile/vw-layout-in-vue.html