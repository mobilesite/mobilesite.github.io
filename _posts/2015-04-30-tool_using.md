---
layout:     post
title:      "几种前端工具的使用"
subtitle:   ""
date:       2015-04-30 22:12:56
author:     "Paian"
catalog: true
tags:
    - 前端工具
---

  前端工具的使用

  ### 一、调试神器之Charles抓包工具的使用：

  在你进行调试的时候，可能需要把本地的某个javascript或css文件替换掉线上的某个页面中对应的javascript或css文件，进行在线调试。这时你就需要一个抓包替换工具。比如Windows系统下的fiddler。这里我讲一下Mac系统下的一个与fiddler类似的工具——Charles。

  首先打开Charles工具，切换到sequence，刷新你要抓包的页面，可以抓到所有的请求。然后你找到你需要的替换的某个javascript或css文件，选中它右键单击，选择map url，然后选择本地的文件。然后点Charles中的刷新按钮，即可把该请求指向本地的资源。这样可以方便地进行调试。

  ### 二、host绑定的处理

  控制台中输入sudo vim /etc/hosts，回车，然后输入机器密码。看到打开的hosts文件，按shift + i键进行输入，把要绑定的host粘贴到hosts文件的末尾。然后按esc退出编写模式。再按shift + : 。之后再输入:wq，进行保存和退出。如果只是退出而不保存，则应输入:x，然后回车进行退出。

  ### 三、Webstorm怎么设置让编码自动换行？

  view - active editor — use soft wraps

  ### 四、png8-data-uri的使用

  首先需要安装brew，安装命令请从其官网复制过来：http://brew.sh/ 。

  然后要安装libpng

  ### 五、sublime text的使用

  sublime可以打开图片，

  ctrl+p   gotoanything输入行号可以跳转至某一行，输入文件名可以打开文件，

  preference-defaultsetting获取默认设置到user中，

  ctrl+shift+p进入命令模式， 输js,进入js语法模式。