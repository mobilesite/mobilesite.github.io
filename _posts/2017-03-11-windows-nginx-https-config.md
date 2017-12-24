---
layout:     post
title:      "Windows下用Nginx配置https服务器"
subtitle:   ""
date:       2017-03-11 20:12:32
author:     "Paian"
catalog: true
tags:
    - Nginx配置
    - 服务端开发
    - https
---

## Windows下用Nginx配置https服务器

以Windows 10系统为例。

### 一、安装OpenSSL

先到[http://slproweb.com/products/Win32OpenSSL.html](http://slproweb.com/products/Win32OpenSSL.html) 去下载OpenSSL（根据系统选择32位或者64位版本下载安装）。

然后安装在C:\OpenSSL-Win64下。

然后配置环境变量。在系统环境变量中添加环境变量：

变量名：OPENSSL_HOME

变量值：C:\OpenSSL-Win64\bin;

（变量值为OPENSSL安装位置下的bin目录）

并在Path变量结尾添加一条： %OPENSSL_HOME%

### 二、安装Nginx

到[Nginx官网](http://nginx.org/en/download.html)下载Nginx，我这里下载的是	nginx/Windows-1.12.0 这个版本。

把下载好的压缩包解压出来，拷贝其中的nginx-1.12.0目录到c:\下。并将文件夹名字修改为nginx。这样，Nginx就被安装到了c:\nginx目录下。

进入到C:\nginx目录下，双击nginx.exe文件即可启动服务器。在浏览器地址栏输入[http://localhost](http://localhost)，如果可以成功访问到Nginx的欢迎界面，则说明安装成功。

### 三、生成证书　　


#### 1、首先在Nginx安装目录中创建ssl文件夹用于存放证书。比如我的文件目录为 C:\nginx\ssl


在控制台中执行：

```
cd C:\nginx\ssl
```

#### 2、创建私钥


在命令行中执行命令：

```
openssl genrsa -des3 -out test.key 1024     # test文件名是自己随便起即可
```

输入密码后，再次重复输入确认密码。记住此密码，后面会用到。


#### 3、创建csr证书

在命令行中执行命令：

```
openssl req -new -key test.key -out test.csr
```

其中key文件为刚才生成的文件。

执行上述命令后，需要输入一系列的信息。输入的信息中最重要的为Common Name，这里输入的域名即为我们要使用https访问的域名  ，比如我输入的是localhost。其它的内容随便填即可。

以上步骤完成后，ssl文件夹内出现两个文件：test.csr 和 buduhuis.key

#### 4、去除密码。

在加载SSL支持的Nginx并使用上述私钥时除去必须的口令，否则会在启动nginx的时候需要输入密码。

复制test.key并重命名为test.copy.key。

在命令行中执行如下命令以去除口令：

```
openssl rsa -in test.copy.key -out test.key
```

然后输入密码，这个密码就是上文中在创建私钥的时候输入的密码。


#### 5、生成crt证书

在命令行中执行此命令：

```
openssl x509 -req -days 365 -in test.csr -signkey test.key -out test.crt
```

至此，证书生成完毕。我们发现，ssl文件夹中一共生成了4个文件。下面，配置https服务器的时候，我们需要用到的是其中的test.crt和test.key这两个文件。

### 四、修改Nginx的nginx.conf配置文件

我的这个文件在C:\nginx\conf目录下。用任意一个编辑器（如Sublime Text之类）打开这个nginx.conf文件。

找到HTTPS server配置的那一段（即包含有listen 443 ssl配置那一段）。我们发现这段代码被注释掉了。所以，首先我们把该段代码前面的#号去掉。然后分别修改其中的ssl_certificate和ssl_certificate_key配置项为刚才所生成的test.crt和test.key这两个文件的目录。并配置server_name为localhost。修改后的该段配置如下：

```
server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      C://nginx//ssl//test.crt;  # 这个是证书的crt文件所在目录
    ssl_certificate_key  C://nginx//ssl//test.key;  # 这个是证书key文件所在目录

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
      root   html;                  # 这个是指定一个项目所在目录
      index  index.html index.htm;  # 这个是指定首页的文件名
    }
}
```

注意一下那两个证书的文件路径的写法。

### 五、Nginx的常用操作

在继续后面的内容之前，先简单介绍下Windows命令行中操作Nginx的几个常用的语句：

```
start nginx               # 启动Nginx
nginx.exe -s stop         # 快速停止Nginx，可能并不保存相关信息
nginx.exe -s quit         # 完整有序的停止Nginx，并保存相关信息
nginx.exe -s reload       # 重新载入Nginx，当配置信息修改，需要重新载入这些配置时使用此命令。
nginx.exe -s reopen       # 重新打开日志文件
nginx -v                  # 查看Nginx版本
```

因为修改了配置文件，所以需要退出控制台，并重新打开一个控制台。执行如下命令：

```
cd c:\nginx
nginx.exe -s quit
start nginx
```

即退出Nginx，然后再重新启动它。这时候，在浏览器地址栏输入[https://localhost](https://localhost)并回车。

这时候，你可能看到“您的连接不是私密连接”的提示，单击页面中的“高级”，并接着单击“继续前往m.test.com（不安全）”，就可以看到Nginx的欢迎界面了。说明https服务器已经配置成功了。

如果你只想用https://localhost访问这个https服务器，那么下面的内容你就不用接着往下看了。

但是，也许你可能还想要用一个别的域名（例如：https://m.test.com）来访问这个服务器。那么怎么做呢？这就需要继续往下看了。

### 六、修改hosts配置，实现域名映射

要想用别的域名来访问上文配置好的https服务器，也很简单，修改hosts配置就可以了。你可以到[这里](http://www.xiazaiba.com/html/23970.html)下载一个hosts管理工具——SwitchHosts。安装号好之后，以管理员身份运行它。并添加上一个hosts项：

```
127.0.0.1  m.test.com
```

这样，你就可以通过[https://m.test.com](https://m.test.com)来访问配置好的https服务器了。

顺便提一下，关于Mac环境下如何映射一个http路径到一个https路径，可以通过Charles工具来实现。参见[这里](http://www.cnblogs.com/jiasm/archive/2016/11/14/6063317.html)。

### 七、可能遇到的问题及其解决办法

#### 1、端口被占用

完成上述工作之后，在启动nginx的时候，可能提示端口被占用或者虽然没有出错提示，但是访问https页面却访问不到的情况，这时候，你需要检查一下443端口是否已经被占用了。

可以用如下命令查看：

```
netstat -ano | findstr 443
```

一般来说，如果有程序在占用的话，输出的第一行的最后一列就是占用了443端口的PID。

找到这个PID之后，我们就用如下命令强制结束它：

```
taskkill /F /IM 这里输入上面找出来的PID
```

#### 2、出现错误提示：“您的连接不是私密连接”

点击页面最底部的“高级”，然后点“继续前往WALLET.WALLET.COM（不安全）”

#### 3、静态的页面资源在开发者工具的Network中显示的Status为failed

可以在开发者工具的Network中的该资源上右键单击它，然后选择“Open in new tab”，接着会提示“您的连接不是私密连接”，然后按照上面的问题2的处理方式进行处理就可以了。本质上与上一个问题是同样的问题，只不过因为你的静态资源域名和页面域名用的不是同一个罢了。

#### 4、忘记配置hosts，导致访问到的不是你本机上的服务的问题

只需要配置好host就可以了。注意，如果你的页面域名、静态资源域名两者是不一样的话，那么两者都需要配置hosts中，比如：

127.0.0.1 m.paian.com
127.0.0.1 static.pain.com

#### 5、出现权限不足的问题

这时候，你只需要以管理员身份打开命令行工具，再正常进行操作即可。

