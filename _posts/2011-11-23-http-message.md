---
layout:     post
title:      "HTTP请求的报文"
subtitle:   ""
date:       2011-11-23 23:08:22
author:     "Paian"
catalog: true
tags:
    - HTTP
---

## HTTP报文

### 一、报文格式

所有的 HTTP 报文都可以分为两类：请求报文 （requestmessage）和响应报文 （response message）。

这是请求报文的格式：

<method> <request-URL> <version>
<headers>
<entity-body>

这是响应报文的格式（注意，只有起始行的语法有所不同）：

<version> <status> <reason-phrase>
<headers>
<entity-body>

其中，status是请求状态码，而reason-phrase则是请求状态码所对应的原因短语。比如，状态码为 200（表示成功），原因短语为OK；状态码为404，对应的原因短语是 Not Found。

下面是请求报文和响应报文的示例：

![](/img/in-post/http-message-1.png)

### 二、常用的HTTP方法

方 法   描 述                                           是否包含主体

GET     从服务器获取一份文档                             否

HEAD    只从服务器获取文档的首部                          否

POST    向服务器发送需要处理的数据                        是

PUT     将请求的主体部分存储在服务器上                    是

TRACE   对可能经过代理服务器传送到服务器上去的报文进行追踪  否

OPTIONS 决定可以在服务器上执行哪些方法                    否

DELETE  从服务器上删除一份文档                            否

#### 2.1 GET

GET 是最常用的方法。通常用于请求服务器发送某个资源。

![](/img/in-post/http-message-get.png)


#### 2.2 HEAD

HEAD 方法与 GET方法的行为很类似，但服务器在响应中只返回首部。不会返回实体的主体部分。这就允许客户端在未获取实际资源的情况下，对资源的首部进行检查。使用 HEAD，可以：

在不获取资源的情况下了解资源的情况（比如，判断其类型）；

通过查看响应中的状态码，看看某个对象是否存在；

通过查看首部，测试资源是否被修改了。

服务器开发者必须确保返回的首部与GET请求所返回的首部完全相同。

![](/img/in-post/http-message-head.png)


#### 2.3 PUT

PUT 与 GET 从服务器读取文档相反，PUT 方法会向服务器创建或更新文档。有些发布系统允许用户创建 Web 页面，并用 PUT 直接将其 安装到 Web 服务器上去。因为 PUT 允许用户对内容进行修改，所以很多 Web 服务器都要求在执行 PUT 之前，用密码登录。 

![](/img/in-post/http-message-put.png)


#### 2.4 POST

POST 方法起初是用来向服务器输入数据的。实际上，通常会用它来支持 HTML 的表单。表单中填好的数据通常会被送给服 务器，然后由服务器将其发送到它要去的地方（比如，送到一个服务器网关程序中，然后由这个程序对其进行处理）。

![](/img/in-post/http-message-post.png)


#### 2.5 TRACE

客户端发起一个请求时，这个请求可能要穿过防火墙、代理、网关或其他一些应用程序。每个中间节点都可能会修改原始的 HTTP 请求。TRACE 方法允许客户端在最终将请求发送给服务器时，看看它变成了什么样子。 TRACE 请求会在目的服务器端发起一个“环回”诊断。行程最后一站的服务器会弹回一条 TRACE 响应，并在响应主体中携带它 收到的原始请求报文。这样客户端就可以查看在所有中间 HTTP 应用程序组成的请求 / 响应链上，原始报文是否，以及如何被毁坏或修改过。

![](/img/in-post/http-message-trace.png)


#### 2.6 OPTIONS

OPTIONS 方法请求 Web 服务器告知其支持的各种功能。可以询问服务器通常支持哪些方法，或者对某些特殊资源支持哪些方法。（有些服务器可能只支持对一些特殊类型的对象使用特定的操作）。

这为客户端应用程序提供了一种手段，使其不用实际访问那些资源就能判定访问各种资源的最优方式。

![](/img/in-post/http-message-options.png)


#### 2.7 DELETE

顾名思义，DELETE 方法所做的事情就是请服务器删除请求 URL 所指定的资源。但是，客户端应用程序无法保证删除操作一 定会被执行。因为 HTTP 规范允许服务器在不通知客户端的情况下撤销请求。

![](/img/in-post/http-message-delete.png)


注：本文内容整理自《HTTP权威指南》一书。
