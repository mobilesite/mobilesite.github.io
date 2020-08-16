---
layout:     post
title:      "在使用git submodule时遇到的一个坑"
subtitle:   ""
date:       2019-08-17 23:30:52
author:     "Paian"
catalog:    true
tags:
    - git submodule
---

这个问题发生在两台Windows 10的电脑上，下文中所提电脑A和电脑B均为Windows 10的系统。

首先，我在github上创建两个项目，主项目main，子项目sub，并分别为其添加README.md文件。

然后，我在A电脑上`git clone https://xxx.xxx.xxx/main.git`。

在A电脑上打开克隆好的项目A，`git checkout -b dev`，检出dev分支。在其中执行`git add submodule https://xxx.xxx.xxx/sub.git src/sub`。这样会在项目根目录下添加一个.gitmodules文件，用于描述submodules的信息，内容如下：

  [submodule "src\\sub"]
    path = src\\sub
    url = https://xxx.xxx.xxx/sub.git

同时，在执行完这个命令后，还会将https://xxx.xxx.xxx/sub.git项目的内容拉取到src/sub下。然后，我们执行：

```
cd src/sub
git chekout -b dev
git push --set-upstream origin dev
```
将sub项目的dev分支推送到远端。

接着，我们执行：

```
git commit -am 'feat: update submodule'
git push --set-upstream origin dev
```

将该分支推送到远端。

这是，我们再到B电脑上去执行：

```
git clone https://xxx.xxx.xxx/main.git
git checkout dev
git submodule init
git submodule update
```

发现总是报错：“fatal: no url found for submodule path……”，而且，src/main目录下也总是没有拉下来https://xxx.xxx.xxx/sub.git项目的数据。经过一番查找，发现是.gitmodules文件的path存在问题。我们将其改为：

  [submodule "sub"]
    path = src/sub
    url = https://xxx.xxx.xxx/sub.git

然后再在B电脑上去执行：

```
git submodule init
git submodule update
```

在Mac电脑上进行测试，也是OK的。至此，问题就终于解决了。
