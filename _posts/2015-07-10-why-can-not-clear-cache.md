---
layout:     post
title:      "为什么浏览器的DNS缓存老是清除不掉呢？"
subtitle:   ""
date:       2015-07-10 22:19:34
author:     "Paian"
catalog: true
tags:
    - 浏览器DNS缓存
    - IP寻址
    - 日常拾遗
---

当你对同一个域名绑定了多个不同的IP，并且在切换hosts配置的时候，时不时地会发现DNS缓存清除不掉。即便你把浏览器访问的历史缓存信息全部删除了，访问的资源的指向常常还是错的。这是为什么呢？是啊，为什么清除浏览器的DNS缓存老是不起作用呢？看起来我们明明已经把那“该死的缓存干掉了啊”！要弄清楚这个问题，首先需要了解浏览器是如何通过域名查找IP地址的。

## 一、浏览器如何通过域名查找IP地址

浏览器会按如下顺序依次进行查找：

### 1、浏览器缓存：

浏览器会缓存DNS记录一段时间。有趣的是，每个浏览器对于DNS记录需要保持多久的时间有效是不一致的，所以对于不同浏览器，这些DNS缓存记录的有效期是不一样的，大约从2-30分钟不等。

### 2、操作系统缓存：

如果在浏览器缓存的DNS记录中没有找到匹配的结果，浏览器会发出一个system call (gethostbyname in Windows)，从操作系统的缓存中去查找。操作系统有它自己的DNS缓存。

### 3、路由器缓存：

如果操作系统中也未找到匹配的缓存，会继续到路由器的缓存中去找。即路由器也有自己的DNS缓存。

### 4、网络供应商缓存：

如果路由器缓存中也没匹配到，则会去网络供应商的DNS服务器（ISP’s DNS server）的缓存中找。

5、递归查找（Recursive search）：

接下来你的网络供应商的DNS服务器开始进行递归查找，从root nameserver, 到.com top-level nameserver, 再到Facebook’s nameserver. 通常来说，the DNS server will have names of the .com nameservers in cache, 所以通常不需要查到root nameserver这一级。

了解了浏览器是如何通过域名查找IP地址的之后，我们再来看看hosts文件修改后，发生了什么。

### 二、hosts文件修改的原理

hosts文件的修改是开发中经常发生的事情，不过，在修改hosts文件之后，究竟发生了什么事情呢？

这里不妨先提一下Chrome的一个工具：[chrome://net-internals/#dns](chrome://net-internals/#dns)，这里列出了操作系统的所有DNS缓存。通过这个工具，可以看到：在修改hosts文件后，所有操作系统中DNS缓存会被清空。

网上盛传[chrome://net-internals/#dns](chrome://net-internals/#dns)下的"Clear Host Cache"可以清空DNS缓存，而实际上这里清空的仅仅是操作系统的DNS缓存，而并非是你以为的浏览器DNS缓存。实际上，只有当某条DNS记录显示"Expired"的时候，才表示浏览器DNS缓存已经被清除。

那么回到最初的问题上来，为什么修改hosts文件之后，有时会立刻生效，有时却一直不生效呢？其实原因很简单，这是因为浏览器缓存的过期时间，是从某个域名上次查询DNS记录开始计算的。

例如：

我00秒的时候使用chrome访问过www.google.com.hk，此时浏览器DNS缓存产生，然后我修改了hosts文件，将www.google.com.hk指向本地127.0.0.1，然后在05秒的时候尝试再次访问这个地址，因为浏览器DNS缓存未过期，所以hosts修改无法体现出来。这表现出来就是修改hosts后没有立即生效。

另一种情况下，我很久都没有访问www.baidu.com了，然后我修改了hosts文件，将其指向127.0.0.1，这时因为浏览器没有DNS缓存，所以会查询操作系统中的DNS缓存，结果此时hosts文件生效。这表现出来就是修改hosts后立即生效的情况。

Chrome的DNS缓存时间是1分钟，Safari下DNS缓存时间大约为10秒。

那么怎么主动清除浏览器DNS缓存呢？

打开[chrome://net-internals/#dns](chrome://net-internals/#dns)，界面右上角有个三角箭头，下拉，**需要点击Clear cache 和 Flush sockets这两项才能完成清除**。

参考：

[http://blog.csdn.net/realmeh/article/details/22663807](http://blog.csdn.net/realmeh/article/details/22663807)

[http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url)