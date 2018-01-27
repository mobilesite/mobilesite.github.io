---
layout:     post
title:      "WEEX开发环境爬坑之旅"
subtitle:   ""
date:       2017-12-17 22:12:18
author:     "Paian"
catalog: true
tags:
    - weex
---

## WEEX开发环境爬坑之旅

WEEX开发环境的搭建过程简直可以说一路是坑。资源被墙是一个原因，文档不完善、版本不匹配等又是一个原因。记录一下，下次配置时可以省一些时间。图就懒得截了，过程中遇到哪个想看图的步骤，可以看文末的参考文献。本文所基于的系统是Windows 10.

### 1、安装Node.js（[https://nodejs.org/en/download/](https://nodejs.org/en/download/)）

### 2、安装Git Bash（[https://git-scm.com](https://git-scm.com)）

### 3、安装JDK和JRE

我选择的是64位的。不知道为什么，我的windows系统上想装JDK 8一直装不上，装完之后tools.jar文件一直找不到。最后没办法，只能换成版本9，后来我发现，换成9也不行，它会导致Android Studio在运行代码的时候报错：

    Error:Failed to complete Gradle execution.
    Cause:Could not determine java version from '9.0.4'.

无奈，只能退回到版本7：

从百度网盘搜索了一个jdk-7u80-windows-x64.exe下载下来

我将他们装到了C:\Program Files\Java文件夹。装完之后该目录下有jdk-9.0.4和jre-9.0.4两个文件夹，而我装版本8的时候，始终只有一个文件夹。

装好后发现在Android Studio中报错：

    FAILURE: Build failed with an exception.

    * Where:
    Build file '/Users/shitianci/work/Lab/panda.android/PandaAndroidDemo/build.gradle' line: 1

    * What went wrong:
    A problem occurred evaluating project ':PandaAndroidDemo'.
    > java.lang.UnsupportedClassVersionError: com/android/build/gradle/AppPlugin : Unsupported major.minor version 52.0

经查要求必须是版本8及其以上才行，所以，我又重新到[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)下载了版本8，这次安装居然奇迹般地成功了。


然后配置系统环境变量：

增加系统环境变量JAVA_HOME，值为C:\Program Files\Java\jdk1.8.0_161

增加系统环境变量JRE_HOME，值为C:\Program Files\Java\jre1.8.0_161

然后给Path系统环境变量增加三个值:
.
%JAVA_HOME%\bin
%JRE_HOME%\bin

再给CLASSPATH增加三个值：
.
%JAVA_HOME%\lib
%JRE_HOME%\lib


```bash
java -version  #注意这里是一个短中线
javac
```

两者都有正确的内容输出则配置成功。


### 4、安装weex的相关工具

``` bash
npm i weex-toolkit -g
npm install weexpack -g
```

### 5、创建weex项目

```
weex create weexwallet
cd weexwallet
npm i
npm i webpack -g
npm start
```

这样，就可以跑起来一个网页版的项目了。

上述这几步，都简单得很，相信一定是顺风顺水。下面就要开始爬坑之旅了。

### 6、安装Android Studio（[http://www.android-studio.org/](http://www.android-studio.org/)）

友情提示一下，网上很多教程还是Android Studio 2.x版本的，许多都还是SDK包括在安装包里的，所以安装起来不一样。如果你搜索教程，还是搜“Android Studio 3 安装教程”吧。

我下载的是Windows（64 位）、无 Android SDK的版本，安装过程中勾选上Android Vertual Device，出现Unable to access Android SDK add-on list对话框的时候，选择cancel（而不是去Setup Proxy），如果你之前安装过Android Studio而且在这个步骤是选择的Setup Proxy的话，很有可能你就设置过镜像代理了，这时你需要去取消一下才能在再次安装Android Studio的时候把这个对话框显示出来。

在SDK Components Setup界面中，你需要选定一个Android SDK Location，即你的安卓SDK（注意不是Android Studio，而是Android SDK）即将要安装目录。我选择了D:\Android\android-sdk-windows这个目录。（Download Components环节非常慢，需要耗费好长时间，这个过程就是在下载Android SDK）

然后，你需要到D:\Android\android-sdk-windows这个目录中去新建tools和platform-tools两个文件夹。

在这里，我们还得配置下系统环境变量：

（1）添加环境变量ANDROID_HOME，其值为你的android-sdk安装目录。比如，我的是D:\Android\android-sdk-windows

（2）修改环境变量Path，再其末尾追加两项：

%ANDROID_HOME%\platform-tools

%ANDROID_HOME%\tools

剩余的就按默认的设置安装即可。

然后启动Android Studio，在Android Studio的欢迎界面，你需要点击右下方的Configure进行老版本的SDK tool配置：

步骤：Configure->SDKManager->**SDK Tools**->勾选show Package Details ->勾选23.0.2

### 7、对项目添加Android平台的内容

```
weex platform add android
```

然后执行下`weex run android`或`npm run android`试试看。

如果出现错误

    Environment variable $ANDROID_HOME not found !
    You should set ANDROID_HOME in your environment first.

一种可能就是你的系统环境变量没配置对，你只需要按上面所述配置一下即可；

还有一种可能就是你虽然配置对了，但是配置后没有重启IDE（我在VS Code这个IDE上就遇到了这个问题），导致怎么试都不行，这时候你需要重启IDE。如果你用的是控制台执行`npm run android`那就重启控制台。然后再执行。

接下来你应该会遇到“No android devices found”这个错误。

### 8、在Android Studio里运行weex

在Android Studio的启动界面，选择Open an exsting Android Studio Project。然后选择你刚才用`weex create weexwallet`命令创建的项目之下的**platforms/android**目录打开。这个时候会陆续地在Android Studio底部报出好几个诸如“Failed to find Build Tools revision 26.0”错误，你只需要按它的提示双击安装即可。

### 9、AVD（安卓虚拟设备，即模拟器）的安装

等待Adroid Studio的错误和loading条消失以后，就可以配置虚拟机了，选择菜单栏里的Tools->Android->AVD Manager 进行配置。

在Selecte a system image界面，点击download 下载，下载完后点击next。

你可能会遇到错误：

gradle打包时的自定义apk名称代码报错:

    Error:(30, 0) Could not set unknown property 'outputFileName' for object of type com.android.build.gradle.internal.api.ApplicationVariantImpl. <a href="openFile:D:\qscwork\weexwallet\platforms\android\app\build.gradle">Open File</a>

这个时候需要在Android Studio中把app目录下的build.gradle文件中的

```
variant.outputs.each { output ->
    def outputFile = output.outputFile
    if (outputFile != null && outputFile.name.equals('app-debug.apk')) {
        def fileName = outputFile.name.replace("app-debug.apk", "weex-app.apk")
        output.outputFile = new File(outputFile.parent, fileName)
    }
}
```

```
variant.outputs.all { output ->
    def outputFile = output.outputFile
    if (outputFile != null && outputFile.name.equals('app-debug.apk')) {
        def fileName = outputFile.name.replace("app-debug.apk", "weex-app.apk")
        outputFileName = fileName
    }
}
```

上面主要是改了两处，一处是把`each`改成`all`，一处是把`output.outputFile = new File(outputFile.parent, fileName)`改成`outputFileName = fileName`

在运行代码的过程中，可能会出现如下注解报错：

    Error:Execution failed for task ':app:javaPreCompileDebug'.Annotation processors must be explicitly declared now.  The following dependencies on the compile classpath are found to contain annotation processor.  Please add them to the annotationProcessor configuration.
    - weexplugin-processor-1.3.jar (com.taobao.android:weexplugin-processor:1.3)
    Alternatively, set android.defaultConfig.javaCompileOptions.annotationProcessorOptions.includeCompileClasspath = true to continue with previous behavior.  Note that this option is deprecated and will be removed in the future.
    See https://developer.android.com/r/tools/annotation-processor-error-message.html for more details.

这个时候，你需要在Android Studio的app目录下的build.gradle文件中，在defaultConfig下加入：
```js
javaCompileOptions { 
    annotationProcessorOptions { 
        includeCompileClasspath = true
    } 
}
```
然后再去运行（Run），这样，在Adroid Studio中这个应用就可以跑起来了。

似乎这两个问题都是与weex本身使用的是低版本的gradle，而在环境配置的过程中升级了gradle版本有相关性。

那么，如果我们还想在执行`npm run android`的时候，也能跑起来安卓平台的应用呢？

首先，我们看看现在执行`npm run android`的效果，可能会出现如下错误：

    Could not find tools.jar. Please check that C:\Program Files\Java\jre1.8.0_161 contains a valid JDK installation.

这时候，应该添加系统环境变量%JAVA_HOMNE%,值为C:\Program Files\Java\jre1.8.0_161\。并修改系统环境变量Path的值，追加一个%JAVA_HOMNE%\bin。

这时候，你再执行`npm run android`，还会出现错误提示 “Error: No android devices found”，

这时候，你需要先在Android Studio通过运行（Run）按钮先把安卓模拟器（AVD）打开，然后再执行`npm run android`。看到错误：

    adb: failed to stat app/build/outputs/apk/weex-app.apk: No such file or directory
    1:25:48 : Error: Error: Command failed: adb -s emulator-5554 install -r  app/build/outputs/apk/weex-app.apk
    adb: failed to stat app/build/outputs/apk/weex-app.apk: No such file or directory

然后再执行一下：

```bash
adb -s emulator-5554 install -r  app/build/outputs/apk/weex-app.apk
```

这样就把这个应用安装到了模拟器上。

### 10、真机调试

把安卓手机连接上，开启USB调试，选择“共享网络连接”方式。

```bash
adb devices
```

如果发现有设备，则证明连接成功。

执行`npm run android`会出现错误：

    adb: failed to stat app/build/outputs/apk/weex-app.apk: No such file or directory
    1:2:46 : Error: Error: Command failed: adb -s 839c462d install -r  app/build/outputs/apk/weex-app.apk
    adb: failed to stat app/build/outputs/apk/weex-app.apk: No such file or directory

经过查看，是因为在把weex-app.apk装到sdk卡上时，weex-app.apk文件的路径没找对。但是我没找到这个路径是在哪里设置的，所以通过手工执行命令的方式解决，即执行完`npm run android`之后，再执行一下`adb -s 839c462d install -r  platforms/android/app/build/outputs/apk/debug/weex-app.apk`命令，即可把weex-app.apk安装到真机上。

至此，终于可以继续进行开发了。总的看来，配置过程中一路各种坑，大半天的时间已经被耗费了。由此看来，weex离好用还有相当的距离。

参考：

[http://www.jb51.net/article/128057.htm?utm_source=debugrun&utm_medium=referral](http://www.jb51.net/article/128057.htm?utm_source=debugrun&utm_medium=referral)
[http://jspang.com/2017/07/12/weex/](http://jspang.com/2017/07/12/weex/)















