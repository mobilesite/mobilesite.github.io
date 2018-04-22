---
layout:     post
title:      "MySQL和Navicat for MySQL的安装及使用"
subtitle:   ""
date:       2017-03-18 23:12:32
author:     "Paian"
catalog: true
tags:
    - MySQL
    - Navicat for MySQL
    - 服务端开发
---

### 一、MySQL的安装

下载 mysql 5.7 进行安装，然后在控制台中进入到安装目录下（如C:\Program Files (x86)\MySQL\MySQL Server 5.7\bin）

```
cd C:\Program Files (x86)\MySQL\MySQL Server 5.7\bin
```

这个时候，你会发现“控制面板\系统和安全\管理工具\服务”中并没有mysql这个服务。所以接下来你需要先安装这个服务，即在控制台中输入：

```
mysqld.exe -install
```

以安装这个服务。看见“Service successfully installed.”表示安装成功。

接下来要干什么呢？启动服务。

```
net start mysql
```

但当你输入上述启动服务的命令时，你会发现控制台给出“MySQL 服务无法启动” 的提示。

怎么办？执行如下语句：

```
mysqld --initialize-insecure --user=mysql
```

这样，MySQL会自建一个data文件夹，并且建好默认数据库，登录的用户名为root，密码为空。

当你再次尝试启动服务：

```
net start mysql
```

看到“MySQL 服务已经启动成功 .”的提示则表示启动完成。

有时候执行net start mysql的时候，可能会遇到如下错误提示：

    net start mysql 服务名无效。  请键入 NET HELPMSG 2185 以获得更多的帮助

这个提示很可能是由于没有执行`mysqld.exe -install`造成的。

这时可以通过命令`mysql -uroot -p`进行数据库的连接。root是用户名，若有密码，可以跟在-p后面，若无密码，直接用`mysql -uroot -p`即可。

这时候，看到Welcome to the MySQL monitor的欢迎提示，就表示已经连接成功了。然后你就可以在控制台上写语句来创建数据库和数据表了。

比如：

```
CREATE DATABASE IF NOT EXISTS `xa`;
USE `xa`;

-- 管理员表
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`(
`id` tinyint unsigned auto_increment key,
`username` varchar(20) not null unique,
`password` char(32) not null,
`sex` enum('boy', 'girl', 'secret') not null default 'secret',
`avatar` varchar(50) not null,
`email` varchar(50) not null,
`mobile` char(11) not null,
`regTime` int unsigned not null
);

-- 分类表：cName-分类名称
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate`(
`id` smallint unsigned auto_increment key,
`cName` varchar(50) unique
);

-- 产品表：pName-产品名称，pSn-产品货号，oPrice-原价，price-当前价，PDesc-产品简介，pImg-产品图片，pubTime-上架时间，cId-分类id
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`(
`id` int  unsigned auto_increment key,
`pName` varchar(50) not null unique,
`pSn` varchar(50) not null unique,
`oPrice` decimal(12, 2) not null,
`price` decimal(12, 2) not null,
`pDesc` text,
`pImg` varchar(50) not null,
`pubTime` int unsigned not null,
`isShow` tinyint(1) default 1,
`isHot` tinyint(1) default 0,
`cId` smallint unsigned not null
);

-- 用户表
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
`id` int unsigned auto_increment key,
`username` varchar(20) not null unique,
`password` char(32) not null,
`sex` enum('boy', 'girl', 'secret') not null default 'secret',
`avatar` varchar(50) not null,
`email` varchar(50) not null,
`mobile` char(11) not null,
`regTime` int unsigned not null
);

-- 产品相册表：pId-产品id，imgPath-图片路径
DROP TABLE IF EXISTS `album`;
CREATE TABLE `album`(
`id` int unsigned auto_increment key,
`pId` int unsigned not null,
`imgPath` varchar(50) not null
);
```

写SQL语句的时候，注意CREATE TABLE语句在结束的)`;`之前的那一个语句不要有`,`否则会报错。

每一条语句最后的分号都不能省略。在控制台中执行语句时，如果一行语句的末尾没有分号，即使你敲了回车，也是不会执行的，而是换行。这一点尤其要注意。

另外，不建议用汉字存储到数据库，最好用数字或字母代替性别，数据取出时，再转换成对应性别。

执行完上述数据库和数据表的创建语句后，可以用命令`show tables;`来查看创建的数据表名。

### 二、安装Navicat for MySQL

下载一个Navicat for MySQL进行安装。

然后新建一个连接：

主机名和IP：localhost

端口：3306

用户名：root

密码：（为空）

再点击“连接测试”，看到“连接成功”提示，则表示已经连接到本地的MySQL数据库。

值得注意的是，在使用Navicat for MySQL进行连接前，须先安装MySQL，否则连接不到数据库。

### 三、连接到阿里云远程数据库

#### 1、从阿里云数据库备份数据库到本地的操作：

```
mysql -h[数据库网络地址] -u[用户名] -p[密码] --default-character-set=utf8 [数据库名字]  > D:\aliyunsite\htdocs\dbback\xa.sql;
```

#### 2、将数据从本地上传到远程数据库：

```
mysql -h[数据库网络地址] -u[用户名] -p[密码] --default-character-set=utf8 [数据库名字]  < D:\aliyunsite\htdocs\data\xa.sql;
```

