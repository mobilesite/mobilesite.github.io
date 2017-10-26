---
layout:     post
title:      "Windows系统中Node.js虚拟机运行环境的配置"
subtitle:   ""
date:       2017-10-26 23:55:14
author:     "Paian"
catalog:    true
tags:
    - Node.js
    - 虚拟机
---

## Windows系统中Node.js虚拟机运行环境的配置

### 一、新建虚拟电脑

新建虚拟电脑——输出名称如“node.js”，类型选择linux，版本因为没有CentOS我们选择other linux（64 bit），因为我的电脑是64位系统，注意这里一定要选64位，否则会在安装 CentOS的时候出现长期黑屏不安装的情况——设置内存大小为1024M——选择“动态分配”硬盘空间，以节省物理机硬盘大小。

### 二、在虚拟机中安装和配置Linux CentOS版本

从[https://www.centos.org/download/](https://www.centos.org/download/)下载CentOS，选择“DVD ISO”。

在VirtualBox中刚才新建的虚拟机上点击右键——选择“设置”——选择“存储”——选择“没有盘片”——点击右边的小光盘图标——点击“选择一个虚拟光盘文件”——选中我们刚下载好的CentOS文件，

然后紧接着选择“网络”——默认情况下选中的是“网络地址转换(NAT)”，这种方式虚拟机是通过物理机的网络来进行连接的，这就使得物理机无法通过SSH来连接虚拟机。如果你使用的是路由器来上网，那么你可以选择“桥接网卡”，这样，虚拟机和物理机会作为两个对等的网络节点，这样就可以在物理机上通过SSH来操作虚拟机了。

然后在VirtualBox上建好的虚拟机上点击启动，这样CentOS就开始安装了。在虚拟机的屏幕中，点击鼠标左键，会弹出提示说你可以使用键盘右侧的CTRL键来实现在虚拟机和物理机之间的切换。

然后通过鼠标向上箭头选中“Install CentOS”，然后点击回车。

在用VM虚拟机安装centos7.0的时候，选择Install Centos 7或者是Test this media & install Centos 7以后，虚拟机屏幕立马就进入黑屏状态，并且等待很久以后，还是黑屏。网上有说法说是没有启用电脑的虚拟机化技术，即Virtrualization Technology。重新启动电脑，按开机键后快速连续地按F10，进入BIOS进行该选项的设置。

安装语言选择英文（尽量不要选择中文）。然后对安装进行配置，首先选择需要安装的软件，点击“SOFTWARE SELECTION”，然后左侧选择“Basic Web Server”，右侧的扩展包里面选择选择“Develop Tools”。再点击“INSTALLATION DESTINATION”，取消选中的硬盘，再勾选中。点击ROOT PASSWORD设置管理员密码。

然后我们再回到物理机去安装一下Xshell和xftp。

待安装好CentOS之后，点击reboot重启。输入用户名root，密码就是刚才设置的密码。就进入装好的CentOS版本的linux系统了。

首先使用`vi /etc/sysconfig/network-scripts/ifcfg-enp0s3`来编辑虚拟机中网卡的配置文件。因为CentOS默认启动的时候网卡是关闭的，我们要把它改成开启，即修改ONBOOT=no为ONBOOT=yes。

然后我们重启虚拟机的网络：

```
systemctl restart network
```

看到输出中有形如“inet 192.168.1.104”这样的内容，即表明IP地址分配成功。

然后通过ifconfig命令来查看网卡是否被成功分配了IP地址。

我们可用通过`ping www.baidu.com`来测试一下网络是否可以正常连接。

在日常使用的时候虚拟机的IP地址可能会经常变化，这就导致我们经常要去修改一些配置，为了防止这种情况出现，我们可以在物理机上为虚拟机映射一个域名。

以管理员身份启动git bash，在其中运行：

```
cd C:

cd Windows/System32/drivers/etc

vi hosts
```

过在其末尾添加一行

```
192.168.1.104 linuxvm
```

即ip 后面 跟 域名的形式。

在xshell上新建一个连接：

名称为nodejs连接，主机为testnodejs。

然后点击连接。

弹出的对话框中输入用户名root 和密码并勾选保存。

看到

> Host 'linuxvm' resolved to 192.168.1.104.
> Connecting to 192.168.1.104:22...
> Connection established.

即表示连接虚拟机成功。

在xshell上运行：

```
yum install epel-release
yum install nodejs
node --version
yum install mongodb-server
yum install mongodb
mongo --version
yum install redis
```

然后再到物理机上去安装sublime  text，webstorm等编辑器。

接着在xssh中新建一个node文件来测试一下：

```
vim test.js
# 在test.js中输入内容console.log('hello world')
node test
```


