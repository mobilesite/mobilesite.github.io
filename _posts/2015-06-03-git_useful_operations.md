---
layout:     post
title:      "史上最详细的git常用操作总结"
subtitle:   ""
date:       2014-04-06 21:12:36
author:     "Paian"
catalog: true
tags:
    - git
---

## 史上最详细的git常用操作总结

### 一、Windows系统中Git的使用

在控制台中输入

    d:
    mkdir mobilesite
    git clone https://github.com/mobilesite/main.git

出现错误提示如下：

>'git' 不是内部或外部命令，也不是可运行的程序或批处理文件。

这时我们首先得检查是否安装了git，如果没有，则得先去 http://git-scm.com/download/win 中下载windows版的git并安装它。我这里选择安装在D:\Program Files目录下。

其次，需要查看一下系统中的环境变量是否对git的路径进行过添加。具体的添加做法是，在“我的电脑”图标上单击右键——选择“属性”——选中“高级”选项卡——单击其中的“环境变量”按钮——在下侧的系统变量中找到Path变量，双击它——把下列路径添加到该变量的最后。

;D:\Program Files\Git\bin;D:\Program Files\Git\libexec\git-core;

其中的D:\Program Files\改成你的Git安装路径即可。

然后重启控制台（注意，改完环境变量后要重启控制台才会生效），在控制台中输入

    d:
    cd mobilesite

切换回d:/mobilesite目录，重新试一下

    git clone https://github.com/mobilesite/main.git

这下就可以成功clone项目到本地了。

然后用 ```git checkout daily/1.0.0``` 切换到我在github上已经创建好的分支daily/1.0.0上。

接下来用webstorm打开d:/mobilesite目录，对其中的内容进行编辑。比如，我们可以打开README.md文件，用MarkDown语法编辑其中的内容。MarkDown语法怎么用，我在下一节的内容中会讲到。

在对README.md文件编辑完成后，用```git status```命令查看一下状态，会在控制台中出现哪些文件进行过更新的信息。

下面就需要用命令对更新过的文件进行提交了。

	git add README.md                                #添加对README.md的监控
	git commit -m '增加了git在windows中的使用'       #提交到本地
	这时会弹出如下信息：
	*** please tell me who you are
	这时候，你需要提供你的用户名和邮箱，以便其确认你的身份。命令如下：
	git config user.name 你的github用户名
	git config user.email 你的github邮箱

最后再push到远程上：

	git push origin daily/1.0.0                      #push到远程

输入完这上一行命令后，会提示你输入用户名和密码，按要求输入即可。密码在输入时什么提示也没有，你可能感觉没有输入成功。这时你不用担心，只要认真输入完成，回车即可。如果输入是正确的，就可以完成push到远程的操作了。

（

下面这段有问题，现在还未实现,暂且忽略。

但是，多提交几次你就会发现，每次都要你输入用户名和密码，是不是很麻烦啊？下面告诉你一个简单的方法，用SSH公钥来进行认证。
打开控制台，在默认的目录下（一般是C:\Documents and Settings\Administrator\）输入dir命令，查看该目录下有哪些文件夹和文件。在其中找一找有没有.ssh这个文件夹。如果没有，则切换到C:\Documents and Settings\Administrator\或者D:\Documents and Settings\Administrator\中找一找有没有该文件夹。找到该文件夹后，用cd .ssh切换到该文件夹下。
然后输入如下命令进行公钥和秘钥的生成。
ssh-keygen -C 你的email地址  -t rsa
然后会提示你输入保存秘钥的地址，你直接输入id_rsa即可将公钥保存到.ssh目录下的id_rsa.pub文件中，而秘钥则在相同目录下的id_rsa中。
然后用cat id_rsa.pub命令将该公钥文件的内容打印到控制台中，复制其中不包含email地址的部分。
在github网站上登录进去，单击右上角的小齿轮进入到settings菜单，选中左侧的SSH Keys菜单项，单击右上方Add SSH Key按钮，把刚才复制好的SSH公钥粘贴进去。
title可以随便取。
然后重启一下控制台。这样，下次进行push时就不用再输入用户名密码了。

）


### 二、Mac系统中Git的使用

学习Mac系统的Git使用之前，首先得学一下终端（相当于Windows的控制台）的打开和使用。一些用习惯了Windows的同学刚开始使用Mac的时候，难免在这个地方遇到问题。所以，先扫盲一下。

mac怎样打开终端？
打开Finder(相当于Windows的“我的电脑”) -> 实用工具（快捷键 shift+command+U）-> 终端

终端命令行：

	ls 目录名    #查看该目录名下的文件列表
	clear        #清除终端内的信息


顺便提一下：
mac 怎样打开浏览器的控制台？
command +option +i   打开开发者工具条，相当于右键——审查元素
command +option +j   打开console

常用命令及其意义如下：

	mkdir mobilesite                   #创建一个目录mobilesite

	git init                         #初始化一个项目

	git config user.name mobilesite    #设置访问该目录的账户名

	git config user.email xxx@xx.xx  #设置访问该目录的账户邮箱

	pwd                              #显示当前目录的完整路径

	rm -rf xxx                       #删除某某文件或文件夹

	mkdir mobilesite                 #创建目录 mobilesite

	ls                               #查看当前目录下文件

	cd mobilesite                    #切换到目录mobilesite

	cd ..                            #返回到当前目录的上一级目录

	clear                            #清屏

	git status                       #查看有变化的文件(一般有变化的文件会以红色显示出来)

	git clone https://github.com/mobilesite/main.git   #拷贝一个项目到本地

	git checkout -b daily/1.x.x      #在现在分支上创建一个新分支

	git checkout daily/1.x.x         #切换到这个分支

	git add -A                       #stages all

	git commit -m '提交的备注信息'     #先add 再提交修改

	git push origin daily/1.x.x      #把内容推送到日常环境

	git tag publish/1.x.x            #打个tag

	git push origin publish/1.x.x    #把这个tag的版本发布到正式线上

	git pull origin daily/1.x.x      #拉取最新代码

	git rm --cached -r right.css.map  #移除文件right.css.map的缓存

	git diff                          #查看修改的详细内容

	git diff  cached                  #查看已缓存的改动

	git reset --hard ac906d1e664f3ea831c0938f4  #回滚到过去的某个提交点

	git reset --hard HEAD~3           #会将最新的3次提交全部重置，就像没有提交过一样。

    git push origin HEAD —force      #这样就可以强制修改远程服务器上已经提交的commit

### 三、多人合作开发

发布之后如果再有修改，需要新拉出来一个分支，并把版本号往上升1，修改完之后再commit,push,tag,push：

    git checkout -b daily/1.x.x      #在现在分支上创建一个新分支
    git checkout daily/1.x.x         #切换到这个分支
    git add -A
    git commit -m '提交的备注信息'     #先add 在提交修改
    git push origin daily/1.x.x      #把内容推送到日常环境
    git tag publish/1.x.x            #打个tag
    git push origin publish/1.x.x    #把这个tag的版本发布到正式线上
    git pull origin daily/1.x.x      #拉取最新代码

    git branch                       #查看当前有哪些分支
    git branch -d 'daily/x.x.x'      #删除某本地分支，不过操作的前提是要保证当前分支不是要删除的分支

    git git branch -r -d origin/branch-name  #删除对远程分支的track
    git push origin :branch-name             #删除远程分支

    git tag                                  #查看有哪些tag
    git tag -d publish/x.x.x                 #删除本地tag
    git push origin :refs/tags/publish/x.x.x #删除远程tag

如果过去发布的某个版本上的代码出现了bug，但是在其之上，又已开发了很多新的代码，如何修复它？这就需要创建出来一个新分支，在该分支上修复完bug后再merge回当前正在开发的分支上。因为如果直接在当前开发中的版本上修复bug的话，将无法直接发布，因为其中已包含许多正在开发中还不能对外发布的代码，所以需要从已发部的那个版本上创建出来一个新分支，然后在这个分支上修复bug，并合并到当前开发中的分支上。

在github上的操作如下：点击mater分支——出现下拉列表——点击manage，就会进入分支管理面板，点击+号——输入分支名，然后发现新建的这个分支即变成了current branch，然后在该分支进行修改和commit及发布。

最后，同样进入分支管理面板，把master分支拖到左下角右侧的格子中，把bug修复分支拖到左下角左侧的格子中。然后点击merge按钮。

另一个merge的方法是，当commit之后，在github客户端的当前项目名称上单击右键，选择view on github，然后提示说有一次commit未合并，看要不要合并，并看到一个compare and pull request按钮，点击它。按提示合并它。这方法比较适合开源项目，因为可随时看到别人的commit并决定是否合并。

多人合作开发时，publish之前，需要先add，再commit，再pull，然后才可以publish。

### 四、git如何回到过去的某个提交，并带着过去的代码回到未来

      git reset --hard commitid      #回到过去

      git reflog                     #打印出之前已有的版本号

      git reset --hard commitid      #带着过去的代码回到未来

### 五、如何创建里程碑，即创建一个release

      github中：release菜单项——new a draft release按钮——填入release tag极其说明，然后发布即可。

### 六、git使用了错误的邮箱push过，如何恢复它？

在使用git时push一直不成功，git log 中发现 xxx@xxx.xxx 邮箱非法，请务必使用公司邮箱.
请先使用如下命令行设置正确git提交信息:

	git config --global user.name 'xxxx'&&git config --global user.email 'xxx@xxx.com'
	git-m

后面一个指令使用了git-m命令修改log信息,获得git-m方法：

Linux(Redhat): sudo yum install git-m -b test -y

Windows: 在msysgit的命令行中运行curl xxx/git-m -o git-m

Mac/Ubuntu: wget xxx/git-m  && sudo chmod 775 git-m && sudo mv git-m /usr/bin/

再输入

	git-m

### 七、取消git全局设置

很多同学照着网上的教程，都会对git进行全局设置，例如：

	git config --global user.name "your_name"
	git config --global user.email  "your_email"

如果所参与的项目都允许你用同一个用户名和邮箱，这样设置当然没问题，但是，这并不总是一定的。有时候我们需要为某个项目单独设置用户名和邮箱。因此我们首先需要取消git的全局设置

	git config --global --unset user.name
	git config --global --unset user.email

针对单个项目单独设置用户名和邮箱，设置方法如下：

	mkdir ～/test // git检出目录
	cd ~/test
	git init
	git config user.name "your_name"
	git config user.email "your_email"

说白了，也就是进入到你的git项目相对根目录下，然后执行git config设置记录


# 八、.gitignore设置过滤文件

.gitignore文件放置在项目根目录下，用于过滤掉一些不该被上传github的文件：

.DS_Store
node_modules
npm-debug.log
.idea/*

# 九、如果没有设置.gitignore过滤，就已经提交到远程上去了，怎么删除？

	rm -rf .idea  #这样会删掉你本地的.idea文件夹，不过你重新打开一次项目就有会自动给你生成了，不过你可以在重新打开项目之前把.gitignore给配置好

	git add -A .
	git commit -m 'remove .idea'
	git push origin daily/1.0.0

然后再看看同步后，远程的这个文件删掉没有。如果没有，再重复上述操作一遍。待远程的.idea文件也被删除干净后，运行

	git rm -r --cached .idea    #取消对.idea文件的跟踪

然后再push一遍，就彻底把该不该被提交却提交了的文件移除掉了。

# 十、版本管理的一些经验：

（1）提交之前diff和测试好自己的代码。

（2）下班之前清理好自己的工作区，完成好提交。一来有助于把代码备份到远程，防止灾难事故等引起代码丢失，二来可以避免第二天上班时忘记哪些代码有用，哪些没用了。

（3）发现冲突不要随意删除他人的代码。

（4）完成一个阶段的开发和调试后及时建立里程碑。以便于后续从其中拉取分支来修改bug。