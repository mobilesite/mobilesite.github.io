---
layout:     post
title:      "React Native开发环境搭建（Windows版）"
subtitle:   "史上最详细的React Native系列教程（2）"
date:       2015-12-05 22:19:21
author:     "Paian"
catalog: true
tags:
    - React Native
---

为了帮您节省时间，我强烈建议您在动手搭建React Native开发环境之前，把本文中所提及的下载链接中的内容先添加到下载链接中，然后再开始阅读本文。这样你在阅读的过程中，可能有些文件就已经下载好了。因为这些下载的资源包很大且有些资源网速很慢。

### 1、安装JDK

自行到[Oracle官网](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)上下载Windows版本的JDK安装。

### 2、安装Android SDK

到[http://www.androiddevtools.cn/](http://www.androiddevtools.cn/)下载 Android SDK Tools (注意不要下载错了) 并安装它。

然后启动 Android SDK Manager ，打开主界面，依次选择『Tools』、『Options...』，弹出『Android SDK Manager - Settings』窗口。在其中配置腾讯Bugly 镜像:
android-mirror.bugly.qq.com 端口：8080

在“Android SDK Manager - Settings”窗口中，在“HTTP Proxy Server”和“HTTP Proxy Port”输入框内填入上面镜像服务器地址(不包含http://，如下图)和端口，并且选中“Force https://... sources to be fetched using http://...”复选框。设置完成后单击“Close”按钮关闭“Android SDK Manager - Settings”窗口返回到主界面；

选择菜单项中的“Packages-Reload”。

选中需要安装的包，然后勾选“Accept License”。

更多腾讯镜像使用方法见[http://android-mirror.bugly.qq.com:8080/include/usage.html](http://android-mirror.bugly.qq.com:8080/include/usage.html)

### 3、安装Git

前往[Git的官网下载页](https://git-scm.com/download/win)下载Windows版本（国内可能需要翻墙下载）。

安装的时候，在第二步中选择“Use Git from the Windows Command Prompt”（如下图），，这样会把Git的可执行程序加入到PATH环境变量中，这样其他程序才能在命令行中正确调用Git。这样就可以同时在Windows的控制台和Git Bash中使用Git。

![Git安装选项](/img/in-post/git_install_windows.jpg)

关于Git的详细使用，可以查看我的另一篇教程：[史上最详细的git常用操作总结](http://mobilesite.github.io/2014/04/06/git_useful_operations/)。

### 4、安装Node.js环境

到[Node.js官网](https://nodejs.org/en/)下载所需的Windows版本的Node.js，然后按提示逐步安装即可，这里不再赘述。

安装完后再控制台执行`node -v`,若能输出node的版本，则说明安装成功。

安装好后用如下命令配置一下淘宝镜像，便于以后安装node模块时从国内镜像下载，速度更快。

```
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
```

### 5、配置Webstorm

（1）使得可以在Webstorm的Terminal面板中执行命令

编码的时候还要切换到控制台中去执行命令行的话实在是一件很不优雅的事情。Webstorm的Terminal面板中执行一个简单的命令行如 `cd d:`试试看，如果输出“‘xxx’不是内部或外部命令，也不是可运行的程序”之类的提示，则说明你的Webstorm的Terminal目前是不起作用的，需要配置。否则则跳过此步。

配置方法如下：点击 file ——》settings 菜单，在弹出的 tools ——》terminal选项卡中找到了把控制台配置进Terminal的配置项（如下图所示），其中的路径就是你的控制台程序所在的路径，配置好后重启一下Webstorm就可以了。

[Webstorm中关于Terminal的配置](/img/in-post/webstorm_terminal_configure.jpg)

（2）使得Webstorm支持JSX语法

在File——》Settings——》Languages and Frameworks——》JavaScript中把JavaScript language version设置为JSX harmony。这样，在使用Webstorm打开React Native文件时，就可以避免很多不正确的语法错误提示了。

### 6、安装React Native命令行工具

用如下命令行全局安装：

```
npm install react-native-cli -g
```

### 7、安装Genymotion模拟器（号称最快的安卓模拟器）

由于Genymotion模拟器的官网我所在的网络环境下无法连接成功，所以先从[http://www.newasp.net/soft/76187.html#downloaded](http://www.newasp.net/soft/76187.html#downloaded)下载Genymotion模拟器（顺便提一下，官网下载的话需要先注册后下载）。安装的过程中会自动安装Oracle VM VirtualBox虚拟机管理工具。

安装好后启动Genymotion，添加一个虚拟设备，然后会让你登录，如果没有Genymotion的账号，则需要先去注册一个再来登录。登录之后Genymotion程序会去拉取可添加的虚拟设备列表。这个拉取过程需要翻墙才能拉取成功。待虚拟设备列表拉取成功后，我们只需要根据自己的需求逐一添加一些模拟设备就可以了（添加的过程即是下载模拟设备的过程，每一个模拟设备有二三百KB，所以还是会耗费不少时间）。

### 8、初始化项目

在控制台中用如下命令行工具新建一个名为demo的项目：

```
cls                         #清除控制台
d:                          #切换到d:盘根目录
mkdir rn                    #创建rn文件夹
cd rn                       #切换到rn目录
react-native init demo      #创建一个名为demo的React Native项目
```

### 9、查看项目打包后的脚本

由于众所周知的网络原因，react-native命令行从npm官方源拖代码时会遇上麻烦。请确认前面已将npm仓库源替换为国内镜像。

待项目创建好之后，进入工程所在目录，比如d:/rn/demo，然后执行：

```
react-native start
```

即可在浏览器通过如下地址就可以看到项目打包后的脚本

[http://localhost:8081/index.android.bundle?platform=android](http://localhost:8081/index.android.bundle?platform=android)

访问的过程会有点慢，需要等待一两分钟。

### 10、在模拟器上运行项目

首先，我们要在Genymotion模拟器上安装一个想要用的虚拟设备。

不过，我在使用4.2版本的Oracle VM VirtualBox的时候，我曾执著地试着安装不同的虚拟设备尝试了无数次，均以出现“Unable to create Virtual Device: Failed to import OVA”错误提示而告终。经过各种搜索，我终于决定换个Oracle VM VirtualBox新版本（5.0.20）一试。安装完成后，重启下机器一试，居然终于在Genymotion模拟器上安装成功了一个虚拟设备（Custom Phone - 6.0.0）。

但当我准备把这个虚拟设备启动起来的时候，却怎么也无法启动，我到Oracle VM VirtualBox中去启动对应的虚拟机，提示说“This kernel requires an x86-64 CPU, but only detected an i686 CPU. Unable to boot - Please use a kernel appropriate for your CPU”。经过了解，原来VirtualBox安装64位的系统需要满足以下条件：

（1）64位的CPU

（2）安装的系统必须为64位

（3）CPU允许硬件虚拟化

可以下载一个securable.exe工具进行检测。检测结果为64 yes yes则可以安装，结果为64 no no（或者64 off off）则不能安装。其中，第（3）项可以通过如下方式开启：

关闭计算机（非重启）——》进入BIOS ——》开启BIOS的虚拟化（不打开，默认是工作在32位模式的，“virtualization technology”设置为“enable”）——》保存退出。

不过，可能是我的机器实在太老，BIOS中根本找不到这个配置项。无奈只好放弃。

但转念一想，是不是也有别的虚拟设备不需要支持64位CPU的呢？于是，我安装了个HTC One XL 4.2.2，结果终于可以在Oracle VM VirtualBox中把对应的虚拟机启动起来了（这个设备只需要32位CPU即可），但是我在Genymotion中启动这个虚拟设备的时候，仍然遇到了“VirtualBox DHCP has not assigned an IP address to virtual device.”的错误。

最后发现需要到Oracle VM VirtualBox中找到对应的虚拟机，点“设置”——》“网络”——》“网卡1”——》“混杂模式”选项中设置为“允许虚拟电脑”。然后再试着启动虚拟设备，这下终于启动成功了。

然后再启动一个虚拟设备（注意要先启动Oracle VM VirtualBox中虚拟机，再启动Genymotion中的虚拟设备），在控制台中切换到项目目录下，用命令行```react-native run-android```运行APP，即可在虚拟设备上预览到效果。

### 11、在Android真机中运行项目

首先，你需要开启USB调试才能在你的设备上安装你的APP，在真机上运行React Native APP实际上需要把这个APP先安装到你的设备上才行。因此，需要确定你已经打开设备的USB调试开关。确保你的设备已经成功连接。可以输入```adb devices```来查看。不过，我的Windows XP系统中并不像Mac那样自带adb工具，因此我还需要先安装adb工具（Android Debug Bridge）。

首先前往[http://download.csdn.net/download/azazil/5050141](http://download.csdn.net/download/azazil/5050141)下载。解压后把其中的adb.exe,AdbWinApi.dll,AdbWinUsbApi.dll三个文件复制到C:\Windows\System32中（需要管理员权限的），只要点击yes就可以了。

注意，你只应当连接仅仅一个设备。

注意：如果你连接了多个设备（包含模拟器在内），后续的一些操作可能会失败。拔掉不需要的设备，或者关掉模拟器，确保adb devices的输出只有一个是连接状态。

现在你可以运行```react-native run-android```来在设备上安装并启动应用了。

下面开始进入趟坑模式。

#### 坑1 国内gradle下载慢中途链接中断导致的问题

下面问题来了！当执行完这个命令，界面中出现了“DOWNLOADING https://services.gradle.org/distributions/gradle-2.4-all.zip ……”。我足足等了30分钟，TMD居然还在DOWNLOADING，然后再过了会儿，弹出来错误提示“Connection has been shut down”（如下图）！程序员宝宝们，这是要死的节奏对不对？

![react-native run-android 错误](/img/in-post/react_native_gradle_error.jpg)

无奈，只好想办法绕过它。

首先，我找了个[网址](https://services.gradle.org/distributions/gradle-2.4-all.zip)把gradle-2.4-all.zip这个文件下载到本地。

然后，我们找到项目根目录下的android>gradle>wrapper，将下载的这个压缩包放在此目录。

接下来，编辑同目录下的gradle-wrapper.properties 这个文件 ，注释掉distributionUrl这行，添加新的一行如下：

```
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
#distributionUrl=https\://services.gradle.org/distributions/gradle-2.4-all.zip
distributionUrl=gradle-2.4-all.zip
```

让程序运行时，直接调用本地目录下的gradle-2.4-all.zip 这个包

最后，拷贝一份gradle-2.4-all.zip解压到C盘任意位置（如C:\gradle-2.4），接着创建环境变量GRADLE_HOME，变量值 C:\gradle-2.4 （解压的路径）。再编辑path变量，在后面增加;%GRADLE_HOME%\bin; 增加环境变量的目的，是为了在编译过程中调用gradle指令。

#### 坑2 找不到Android SDK导致的报错

错误信息如下：

Error: SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.

那么，Windows系统下的Android SDK到底安装在了哪里呢？找了好久，最后终于想到用'sdk'这个搜索词把它搜出来了。默认的安装位置为：

C:\Documents and Settings\Administrator\Local Settings\Application Data\Android\android-sdk

因此，于是在环境变量中增加一个系统环境变量，变量名为ANDROID_HOME，值为C:\Documents and Settings\Administrator\Local Settings\Application Data\Android\android-sdk（即你的Android SDK安装路径）。

此外，编辑环境变量Path，在末尾追加  ;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools;  以便于我们直接在控制台利用C:\Documents and Settings\Administrator\Local Settings\Application Data\Android\android-sdk下面的tools和platform-tools文件夹下面的工具。

#### 坑3 Android SDK所安装的内容不齐或版本不对所导致的问题

错误信息如下：

failed to find target with hash string 'android-23' in: C:\Documents and Settings\Ad
ministrator\Local Settings\Application Data\Android\android-sdk\platform-tools

以及另一个错误：

Could not find com.android.support:recyclerview-v7:23.0.1.

这类错误主要是因为Android SDK所安装的内容不齐或版本不对所导致的。最终，经过调整，我所安装的内容如下图所示。

![Android SDK所安装的内容](/img/in-post/react_native_android_sdk_install.jpg)

这里其实有一个问题：到底我们需要在Android SDK Manager中下载哪些内容？

在[Android SDK Manager官方指导](http://developer.android.com/sdk/installing/adding-packages.html)中，在SDK Manager中需要安装以下内容：

Tools 目录下选择:

Android SDK Tools

Android SDK Platform-tools

Android SDK Build-tools (最高版本)

Android x.x 文件夹 (最新版) 选择:

SDK Platform
ARM EABI v7a System Image（非必须，模拟器需要）

Sources for Android SDK（非必须，本人添加，一个好的程序员得多看看源码）

Extras目录下：

Android Support Repository

Android Support Library

另外根据是否需要用到Google APIs，若需要则下载Google Play服务包：

Google Repository

Google Play services

除了参考上面这份文档之外，还需要参考一下[React Native官方关于安卓环境配置的文档](http://reactnative.cn/docs/0.27/android-setup.html#content)，看React Native对于Android SDK有哪些特别的设置。两相对照，再结合项目的实际情况作出最终的考量。

更多关于Android SDK哪些各用作什么介绍，参见[http://www.cnblogs.com/kangjianwei101/p/5267044.html](http://www.cnblogs.com/kangjianwei101/p/5267044.html)

#### 坑4 真机运行时的白屏问题

好不容易终于将APP安装到我的小米真机上了，却发现打开APP是个白屏，什么也没有。这时，需要在小米手机的“设置——》其他应用管理中找到该应用，点击它，在弹出的窗口中再点击“权限管理”，在“显示悬浮窗”设置项中设置为允许悬浮窗。其他手机如何设置，请自行研究一下。

#### 坑5 白屏解决后，执行Reload JS，然后就红屏了，显示出来一堆错误，提示说“Could not connect to development server.”

如果你的手机是Android 5.0以下，在确保手机和电脑在同一个Wi-Fi环境下，这时需要摇动手机，调出来开发者选项菜单，从中选择Dev Settings，然后点击Debug server & port for device，在弹出的对话框中输入Build APP所用电脑的ip地址:8081然后点“确定”。再摇出开发者菜单列表，选择Reload JS，这时若弹出界面提示“Fetching JS bundle”，然后过一会儿界面出现“Welcome to React Native!”内容，则大功告成。

如果你的手机是Android 5.0及以上，则使用adb reverse命令（这个选项只能在5.0以上版本(API 21+)的安卓设备上使用）。首先把你的设备通过USB数据线连接到电脑上，并开启USB调试（关于如何开启USB调试，参见上面的章节）。运行adb reverse tcp:8081 tcp:8081。不需要更多配置，你就可以使用Reload JS和其它的开发选项了。

最后，我们在手机上查看一下刚刚安卓的这个demo APP有多大，经过查看我们发现它装到手机上一共有21.74MB，这是在我们没有自行添加任何代码的情况下。可见，其包还是比较大的。















