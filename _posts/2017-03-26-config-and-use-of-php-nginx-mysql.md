---
layout:     post
title:      "Windows下nginx + php + mySQL环境的配置"
subtitle:   ""
date:       2017-03-26 21:22:34
author:     "Paian"
catalog: true
tags:
    - nginx
    - php
    - mySQL
    - 服务端开发
---

nginx相较于我们熟悉的apache、IIS的优势，在于“反向代理”和“负载均衡”。因此考虑到能够为Web服务器节省资源，它可以代替apache来提供Web服务。那在windows下如何来配置nginx+php+mySQL环境呢？

### 一、准备所需的程序包

首先需要准备的应用程序包。

- 1）nginx：nginx/Windows-1.12.0

关于nginx的安装及基本配置详见[这里](https://mobilesite.github.io/2017/03/11/windows-nginx-https-config/)。

- 2）php：  php-5.5.0-Win32-VC11-x64.zip

因为我用的是64位的windows 10，所以我下载的是带有x64的，因为php官网已经不提供php5.5的下载了，所以这里提供一个下载地址：[http://download.csdn.net/detail/bravemanzhou/6710031](http://download.csdn.net/detail/bravemanzhou/6710031)
nginx下php是以FastCGI的方式运行，所以我们下载非线程安全也就是nts的php包。

- 3）mySQL: MySQL Server 5.7

- 4）RunHiddenConsole：RunHiddenConsole.zip

RunHiddenConsole.exe的作用是在执行完命令行脚本后可以自动关闭脚本，而从脚本中开启的进程不被关闭。

下载地址：[http://redmine.lighttpd.net/attachments/660/RunHiddenConsole.zip](http://redmine.lighttpd.net/attachments/660/RunHiddenConsole.zip)

### 二、安装与配置

#### 1、php的安装与配置。

直接解压下载好的php包，到C盘（C:\），这里把解压出来的文件夹重命名成php。进入该文件夹将php.ini-development文件重命名为php.ini，并用Sublime Text打开它。找到

```
;extension_dir = "./ext"
```

更改为

```
extension_dir = "C:/php/ext"
```

注意把它前面的分号去掉了。

往下看，再找到:

```
;extension = php_mysql.dll
;extension = php_mysqli.dll
```

前面指定了php的ext路径后，只要把需要的扩展包前面所对应的“;”去掉，就可以了。这是让PHP支持mySQL。到这里，php已经可以支持mysql了。

接下来我们来配置php，让php能够与nginx配合工作。

找到：

```
;cgi.fix_pathinfo=1
```

我们去掉前面的分号，改成：

```
cgi.fix_pathinfo=1
```

这一步非常重要，这里是PHP的CGI的设置。

除此之外，还要进行下面一系列修改：

搜索“date.timezone”，找到：`;date.timezone = `先去前面的分号再改为 `date.timezone = Asia/Shanghai`

搜索“enable_dl”，找到：`enable_dl = Off` 改为 `enable_dl = On`

搜索“cgi.force_redirect” `;cgi.force_redirect = 1` 先去前面的分号再改为 `cgi.force_redirect = 0`

搜索“fastcgi.impersonate”，找到： `;fastcgi.impersonate = 1` 去掉前面的分号

搜索“cgi.rfc2616_headers”，找到：`;cgi.rfc2616_headers = 0` 先去前面的分号再改为 `cgi.rfc2616_headers = 1`

2、nginx的安装与配置。

把下载好的nginx/Windows-1.12.0的包同样解压到C盘下，并重命名为nginx。接下来，我们来配置nginx，让它能够和php协同工作。进入nginx的conf目录，打开nginx的配置文件nginx.conf，找到：

```
location / {
    root   html;　　　　　　#这里是站点的根目录
    index  index.html index.htm;
}
```

修改成：

```
location / {
    root   D:/aliyunsite/htdocs;
    index  index.html index.htm index.php;
}
```

其中D:/aliyunsite/htdocs是代码项目所在的根路径。

再往下，找到：

```
# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
#
#location ~ \.php$ {
#    root           html;
#    fastcgi_pass   127.0.0.1:9000;
#    fastcgi_index  index.php;
#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
#    include        fastcgi_params;
#}
```

先将前面的“#”去掉，同样将

```
root  html;
```

改为

```
root   D:/aliyunsite/htdocs;
```

再把其中的/scripts改为$document_root，这里的$document_root就是指前面“root”所指的站点路径，即D:/aliyunsite/htdocs。

修改后这段代码变成了这样子：

```
location ~ \.php$ {
    root           D:/aliyunsite/htdocs;
    fastcgi_pass   127.0.0.1:9000;
    fastcgi_index  index.php;
    fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
    include        fastcgi_params;
}
```

再接下来，我们把https的配置也同时修改一下。配置好后的https配置如下：

```
# HTTPS server
server {
    listen       443 ssl;
    server_name  localhost;

    ssl_certificate      C://nginx//ssl//buduhuisi.crt;
    ssl_certificate_key  C://nginx//ssl//buduhuisi.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root   D:/aliyunsite/htdocs;
        index  index.html index.htm;
    }
}
```

至此，nginx+php的环境就初步配置好了。整个的nginx配置文件如下：

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   D:/aliyunsite/htdocs;
            index  index.html index.htm index.php;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   D:/aliyunsite/htdocs;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        location ~ \.php$ {
            root           D:/aliyunsite/htdocs;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    server {
        listen       443 ssl;
        server_name  localhost;

        ssl_certificate      C://nginx//ssl//buduhuisi.crt;
        ssl_certificate_key  C://nginx//ssl//buduhuisi.key;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            root   D:/aliyunsite/htdocs;
            index  index.html index.htm;
        }
    }

}

```

来跑跑看。我们可以输入命令来启动服务：

```
cd c:\php
php-cgi.exe -b 127.0.0.1:9000 -c C:/php/php.ini
cd c:\nginx
start nginx
```

#### 3、包装成.bat文件，避免每次重复敲击命令

当然，这种启动服务的操作也可以利用脚本来实现，以避免每次输入脚本的繁琐。

首先把下载好的RunHiddenConsole.zip包解压到nginx目录内，然后来创建脚本，命名为“start_nginx.bat”，并将其内容编辑为：

```
@echo off
REM Windows 下无效
REM set PHP_FCGI_CHILDREN=5

REM 每个进程处理的最大请求数，或设置为 Windows 环境变量
set PHP_FCGI_MAX_REQUESTS=1000

echo Starting PHP FastCGI...
RunHiddenConsole C:/php/php-cgi.exe -b 127.0.0.1:9000 -c C:/php/php.ini

echo Starting nginx...
RunHiddenConsole C:/nginx/nginx.exe -p C:/nginx
```

再另外创建一个名为stop_nginx.bat的脚本用来关闭nginx：

```
@echo off
echo Stopping nginx...
taskkill /F /IM nginx.exe > nul
echo Stopping PHP FastCGI...
taskkill /F /IM php-cgi.exe > nul
exit
```

做好后，是这样的。这样，我们的服务脚本也都创建完毕了。双击start_nginx.bat，这样nginx服务就启动了，而且php也以fastCGI的方式运行了。

到站点目录下，新建一个index.php的文件，在里面编辑：

```
<?php
    phpinfo();
?>
```

保存后，打开浏览器输入然后在浏览器地址栏分别访问:[http://localhost](http://localhost)，[http://localhost/index.php](http://localhost/index.php)，[https://localhost](https://localhost)。

若要停止服务，双击stop_nginx.bat即可。




