---
layout:     post
title:      "一些好用的Mac电脑前端开发学习软件"
subtitle:   ""
date:       2017-01-15 22:15:37
author:     "Paian"
catalog: true
tags:
    - Mac学习软件
---

## 一些好用的Mac电脑前端开发学习软件

### 一、Sublime text

1、怎么显示sidebar

view->side bar->show side bar

2、有哪些常用的sublime text plugins

可参考：[http://www.jianshu.com/p/5905f927d01b](http://www.jianshu.com/p/5905f927d01b)

- SideBarEnhancements
- WordCount
- ConvertToUTF8
- Terminal
- Compare Side-By-Side
- Search Stack Overflow

### 二、Beyond Compare —— 文件比较工具

参见：[http://wm.makeding.com/iclk/?zoneid=7398&uid=1428](http://wm.makeding.com/iclk/?zoneid=7398&uid=1428)

### 三、nvm & node 的安装

#### 1、安装nvm

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

然后将如下加入~/.bash_profile：

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

#### 2、安装node

```
nvm install 5
```

### 四、安装一些常用的全局模块

```
npm install -g grunt gulp webpack anywhere
```

### 五、配置Mac可以支持copy file path

参见：[http://jingyan.baidu.com/article/380abd0a12007b1d91192c5e.html](http://jingyan.baidu.com/article/380abd0a12007b1d91192c5e.html)

### 六、Charles——代理和抓包神器

1、打开 charles-proxy-3.11.2.dmg，安装 charles；

2、在「应用程序」文件夹，右键 charles，选择显示包内容 进入 /Volumes/Charles Proxy v3.11.2/Applications/Charles.app/Contents/Java/，复制下载的 charles.jar 替换原有文件即可。

### 七、Photoshop

参见：[http://blog.sina.com.cn/s/blog_73dc36510101ahim.html](http://blog.sina.com.cn/s/blog_73dc36510101ahim.html)

### 八、sketch

参见：[http://www.cnblogs.com/aapps/p/6142946.html](http://www.cnblogs.com/aapps/p/6142946.html)

### 九、Brew

安装命令如下：

```
curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1
brew update
```

### 十、wget

当brew安装成功后，就可以随意安装自己想要的软件了，例如wget，命令如下：

```
brew install wget
```

卸载的话，命令如下：

```
brew uninstall wget
```

查看安装软件的话，命令如下：

```
brew search /apache*/
```

注意/apache*/是使用的正则表达式，用/分割。

### 十一、iHosts

参见：[http://www.pc6.com/mac/274176.html](http://www.pc6.com/mac/274176.html)

### 十二、Webstorm

参见：[http://www.jetbrains.com/webstorm/](http://www.jetbrains.com/webstorm/)

[http://www.cnblogs.com/ys-wuhan/p/5840305.html](http://www.cnblogs.com/ys-wuhan/p/5840305.html)

### 十三、Nginx

Mac安装nginx：

```
brew search nginx
brew install nginx
```

启动nginx：

```
sudo nginx
```

访问localhost:8080 发现已出现nginx的欢迎页面了。

备注：

`ln -s  /usr/local/sbin/nginx /usr/bin/nginx`可以做个软连接。

常用的指令有：

```
nginx -V 查看版本，以及配置文件地址

nginx -v 查看版本

nginx -c filename 指定配置文件

nginx -h 帮助

nginx -s reload|reopen|stop|quit   # 重新加载配置|重启|停止|退出 nginx

sudo nginx    # 打开 nginx

nginx -t         # 测试配置是否有语法错误

vim /usr/local/etc/nginx/nginx.conf  # 打开 nginx.config 文件

```

感谢这些优秀的软件带给我们学习上的便利，链接仅供学习试用。请支持正版。内容来自网络，若有侵权请联系删除。
