---
layout:     post
title:      "形形色色的移动前端调试方法"
subtitle:   ""
date:       2016-09-02 23:50:12
author:     "Paian"
catalog:    true
tags:
    - 前端调试
---

### 一、使用模拟器进行调试

#### 1、模拟安卓设备：

（1）借助Genymotion／Parallels虚拟机，安装安卓设备的模拟器（不推荐此方法）

（2）用Chrome浏览器的模拟设备尺寸功能进行安卓设备的模拟调试

#### 2、借助iOS Simulator进行模拟iOS设备的调试

iOS Simulator是内置在Xcode开发工具中模拟器，只能在Mac系统下使用。具体使用方法如下：

打开Xcode，点击左上角的“Xcode”菜单，选择“Open Developer Tool”，选择“Simulator”，再点击打开的iOS Simulator底部的Safari浏览器，接下来在打开的界面顶部的地址栏区域中输入你需要调试的网页的地址，按回车按钮就能在其中打开待调试页面了。

接下来，打开Mac中的Safari浏览器，点击左上角的“Safari”菜单，选择“偏好设置...”，再选中“高级”选项卡，勾选中“在菜单栏中显示‘开发’菜单”选项。然后在Safari浏览器“开发”菜单下的“Simulator”菜单项下选中刚才在iOS Simulator中已打开的待调试页面，即可看到Safari浏览器的调试面板，这时就能开始调试了。

### 二、使用浏览器自带的真机直调功能

#### 1、安卓设备：

（1）将安卓手机通过数据线与电脑相连接，打开PC上的Chrome浏览器，并保证Chrome版本 >= 32 而且安卓手机安装的系统 > 4.0，在安卓手机的设置中将“开发者选项”和“USB调试”开启，在安卓手机中用浏览器打开待调试的页面。这时可以在PC端的Chrome浏览器地址栏中输入chrome://inspect/devices，即可看到手机中所打开的待调试页面，点击进去就能开始调试。当然，除了用浏览器打开待调试的页面之外，你还可以采用APP测试包的webview来打开待调试页面，前提是手机上装的Android系统 > 4.4 并且 APP测试包开启了调试开关。

（2）UC浏览器的调试：

安卓上UC浏览器的调试比较特殊，需要安装[UC浏览器的开发者版本](http://wap.uc.cn/index.php?action=PackageDown&do=ByPfid&product=UCBrowser&pfid=145&lang=zh-cn&bid=33533&direct=true&from=dev-slp-dir-pc)。使用方法是：让手机和PC处于同一网段，在安卓手机上安装好UC浏览器开发者版后，通过它的扫描功能扫取待调试页面的二维码打开调试页面，然后再在PC中打开Chrome/Safari浏览器，在地址栏中输入手机的ip地址:9998，回车，即可看到手机中已打开的待调试页面，点击进去就能进行调试。此方法的缺陷在于：部分安卓手机会出现调试一开启UC浏览器即强制退出的情况，导致最终无法调试。详细的文档可参见[http://plus.uc.cn/document/webapp/doc5.html](http://plus.uc.cn/document/webapp/doc5.html)。需要注意的是，Chrome版本需是15+，Safari版本需是5.1.3+。

#### 2、iOS设备：

首先需要在iOS设备上对Safari浏览器进行基本设置以开启其真机调试功能。具体步骤如下：进入“设置”，选择“Safari”，再选择“高级”，然后选择“Web检查器”，再通过数据线将iOS设备连接至PC。在iOS设备上用Safari浏览器打开待调试页面，之后在PC端的Safari的开发开发菜单下即可看到iOS设备中已打开的待调试页面，选中它将会进入调试模式。

### 三、通过集成调试软件进行真机调试

一款比较有代表性的产品是[ghostlab](https://www.vanamco.com/ghostlab)，其亮点在于：它能够在各个设备之间中同步你对于UI的手工操作，非常适合同一时间快速检查多款设备上的表现情况，不过他是一款收费软件，只有七天的试用期限可以临时性使用。有一个叫browserify的npm模块可以实现同样功能，只不过，因为我们经常需要使用webpack进行打包，而browserify的功能和webpack-dev-server有很多相似之处，放在一起必然导致冲突。

### 四、纯web页面型的调试实现：

比较常见的办法是在页面中通过纯纯web页面型（HTML+JS+CSS）的实现，在页面中加入调试面板，接管诸如console、onerror相关事件输出log和报错，进行帧频率监测，等等。

### 五、脚本注入型的真机调试

#### 1、[weinre](https://github.com/apache/cordova-weinre/) ['waɪnəri]

这是一款老牌的脚本注入型调试工具。

（1）具体使用方法如下：

首先安装 Weinre：

```npm install -g weinre ```

安装完成之后，要在本地开启一个监听服务器，需要获取本机的局域网地址：

这时候执行：

```weinre --boundHost 127.0.0.1```

这时候会启动一个服务器：
http://127.0.0.1:8080

在待调试的页面中嵌入`<script src="http://dev.test.com:8080/target/target-script-min.js"></script>`

给PC配置上host:

```127.0.0.1  dev.test.com```

再让手机通过PC的代理上网（用Charles软件来设置代理，或者用支持多个文件合并成一个文件的替换和支持目录替换的代理工具——[nproxy](http://www.tuicool.com/articles/zmuIjqj)）。

用手机打开你所要调试的页面，然后在pc浏览器访问http://dev.test.com:8080
在该页面中找到

debug client user interface:

http://dev.test.com:8080/client/#anonymous

点击进去。可以在

http://dev.test.com:8080/client/#anonymous

页面的左上角的Targets中看到你手机浏览器正在访问的调试页面，点击它，然后点击页面中的elements菜单栏，就可以开始调试了。

（2）weinre的缺点在于：

- 已经多年不更新了。
- 用户界面是一个过时版本的WebKit, 比较简陋。
- Elements部分，可以查看dom，修改样式。但无法直接编辑dom看到效果。
- Resource部分，localstorage可以查看，但cookie看不到。
- Network部分，只能看到异步加载的请求。
- Cosole部分，可以看console log， 运行JS。但无法像firebug那样报出js的错误，更不能加断点调试。
- 服务器连接会经常超时，偶尔会意外终止调试会话

#### 2、[vorlon.js](https://github.com/MicrosoftDX/Vorlonjs/)

（1）使用方法如下：

先安装`vorlon.js`模块：

```sudo npm i -g vorlon```

然后启动vorlon服务：

```vorlon```

在待调试页面中插入`<script src="http://dev.test.com:1337/vorlon.js"></script>`

同样是让手机通过PC的代理上网，再用手机打开待调试页面。

最后在PC浏览器中打开http://dev.test.com:1337，点击界面左侧已连接的设备，即可进入调试模式。

（2）`vorlon.js`相比于weinre来说，优点在于：

- 功能更为丰富
- 发布时间较近, 2015年上半年才开源发布，git一直有人更新维护

它的缔造者微软首席项目经理大卫·卡图荷（David Catuhe）说：

无论是游戏控制台，还是移动设备，甚或是一个接入物联网的冰箱，你都可以远程连接至多50台设备并在这些设备中执行JavaScript代码。开发团队可以一起调试——每个人都可以编写代码，结果对所有人可见。

### 总结

纵观上述提及的五大类移动设备前端调试方法，主要痛点在于：

- “攻一个山头换一种武器”：
不同平台、不同容器往往需要不断更换不同的方法来调试
- APP webview的调试严重依赖于APP是否支持调试功能
- 部分容器缺乏易用的真机调试方法，比如第三方的APP(我们无法拿到测试安装包，如微信、微博等)、iOS中的UC浏览器的调试等

而上述这两款脚本注入型的工具，恰好在解决这些痛点问题上非常有效，也无需通过数据线与PC连接，只需要保证移动设备与PC连接到同一个网段即可。

