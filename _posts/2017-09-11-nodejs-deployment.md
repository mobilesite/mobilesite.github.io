---
layout:     post
title:      "《Nodejs项目的线上服务器部署与发布》学习笔记"
subtitle:   ""
date:       2017-09-11 23:28:21
author:     "Paian"
catalog: true
tags:
    - node.js
    - 学习笔记
---
## 《Nodejs项目的线上服务器部署与发布》学习笔记

### 生产环境所需要素：

购买自己的域名

购买自己的服务器

域名备案

配置服务器应用环境

安装配置数据库

项目远程部署发布与更新


```
//app.js

const http = require('http');
const homePage = `
<!Doctype html>
<html>
​	<head>
​		<meta charset="utf-8">
​		<title>Nodejs 部署上线示例（随时失效）</title>
​	</head>
​	<body>
​		<h1>慕课网Node.js高级课程</h1>
​		<h2>项目部署上线示例</h2>
​		<nav>
​			<ul>
​				<li>
					<a target="_blank" href="/a">Node.js 电影网站</a>
				</li>
				<li>
					<a target="_blank" href="/b">狗狗说APP后台</a>
				</li>
				<li>
					<a target="_blank" href="/c">微信小程序APP后台</a>
				</li>
				<li>
					<a target="_blank" href="/d">微信公众号后台</a>
				</li>
​			</ul>
​		</nav>
​	</body>
</html>
`;

http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(homePage);
})
.listen(3000, () => {
	console.log('server running at 3000');
});
```

然后我们通过`node app.js`就可以启动服务器并通过http://localhost:3000访问到了。`node app.js`命令也可以简写成`node app`，即不带后缀。

node 6.9.5
mongodb 3.0.1
grunt 0.1.13

先下载movie项目的源码：http://www.imooc.com/video/3765

然后更新package.json中的几个包的版本：

bcrypt@0.8.7

jade@1.11.0

mongoose@4.8.2

也可以用命令单独更新：

```
npm --registry=https://registry.npm.taobao.org install bcrypt@0.8.7 --save

npm --registry=https://registry.npm.taobao.org install jade@1.11.0 --save

npm --registry=https://registry.npm.taobao.org install mongoose@4.8.2 --save
```

修改完package.json后，统一安装所有的依赖:

```
npm i
```

或者用cnpm。cnpm的使用参见：http://npm.taobao.org/

其实现在应该用pug来代替jade(更新的版本中，jade更名为了pug)，但是由于改动量过大，我们就先不去修改了。


执行node app启动项目，发现报错 Error: Could not locate the bindings file. Tried

我们把整个 node_modules目录全部删除，然后再用npm i重新安装全部，才发现可用。

不过，启动的时候我们发现需要先启动mongodb数据库服务才行，因为我们的代码中使用了它作为系统的数据库。

所以，我们先启动mongodb服务：

```
cd d:\mongodb\bin
.\mongod.exe --dbpath="d:\mongodb\data\db"
```

这样就会启动一个服务，并且服务的数据库地址指向d:\mongodb\data\db目录。

再执行`node app`即可用http://local host:3000访问到movie网站了。

我们可以在该网站上注册一个用户test，密码123试试，发现注册成功且能够用它登陆成功，说明流程是通的。

那么，这个数据是否插入到数据库中去了呢？

我们另开一个控制台窗口，在其中执行命令：

```
cd d:\mongodb\bin
.\mongo.exe
```

然后通过

```
show dbs
```
可以看到imooc-movie这个数据库创建成功了。

然后，我们用

```
use imooc-movie
show collections
```

可以查看到所有的“表”。再用

```
db.users.find().pretty()
```

即可查到该“表”中已经有一条记录如下：

```
{
        "_id" : ObjectId("59c619bcf2cb932d1cf1ed3a"),
        "name" : "test",
        "password" : "$2a$10$nBYecLIUa/D7B8zkLN1Vc.yFh69X9UoXwzxFBshaI65cxl.UoJWF6",
        "meta" : {
                "updateAt" : ISODate("2017-09-23T08:22:20.441Z"),
                "createAt" : ISODate("2017-09-23T08:22:20.441Z")
        },
        "role" : 0,
        "__v" : 0
}
```

这条记录正式我们刚刚创建的用户。

因为这个系统有规定，只有role>=10才能有超级管理员的权限。

所以，我们通过

```
db.users.update({name:'test'}, {$set: {role: 51}})
```

来操作mongodb改写数据，把刚才创建的那个test账户的role改成51。这样，test账户就有了超级管理员权限。

这时候，我们就可以去看后台页面了，通过http://localhost:3000/admin/user/list 进行访问。

电影列表：
http://localhost:3000/admin/movie/list

电影录入：
http://localhost:3000/admin/movie/new

我们找一个录入的id填在豆瓣同步这个输入框中：7054604

然后系统会自动地去豆瓣同步相应的信息。

语言填写英语，分类填写外太空，然后点击录入按钮。

录入之后会自动跳转到详情页面：http://localhost:3000/movie/59c62400f2cb932d1cf1ed3d

这时候我们再回到首页（http://localhost:3000/）看一下，刚录入的电影已经在首页出现了。

我们可以通过`grunt build`来打包文件，打包的文件放在public/build目录下。


在gougou-server项目中，运行`node app`把APP后台服务系统给跑起来。
再到gougou-app项目（这个项目的源码暂时未找到）下让react-native开发的项目跑在ios虚拟器上：

```
react-native run-ios
```

### 如何部署一个小程序

小程序名称：工业风装修

可以在微信中搜索到。

### 如何部署一个微信公众号的开发项目

### 域名选择

选择知名厂商。在国内尽可能选择阿里云的域名，备案方便，背靠阿里云团队。

阿里云（中国万网）
爱名网（www.22.cn）
DNSPOD
GoDaddy(国外的，有一个风险就是不知道将来政府会不会不允许在国内部署GoDaddy这种国外平台申请的域名)

纯英文好于纯数字，千万不要既有数字又有字母那种。

后缀不要选择太个性化的，学生的话可以选择.cn，比较便宜。

无论选择哪个域名，都要到DNSPOD上配置解析指向，将域名指向到某一台服务器。

购买域名的时候，不需要购买SSL证书，可以自己生成，省点钱。

### 主机选择

国外：

亚马逊AWS
Linode
DigitOceam/Heroku

国内：
阿里云ECS
青云/UCloud/百度云

建议：

尽量选择大厂商。
尽量选择国内的主机商，不会被墙，速度快，审核备案易通过。

阿里云明显拉开了与青云和UCloud的差距。

这里我们选择
阿里云ECS服务器入门型（CPU 1核  内存1G 系统盘40G）进行讲解。

选择Ubuntu 64位14.04版本
带宽选1M
网络选经典网络
计算方式里是选择包年包月还是按量计费，得根据你自己的情况，如果你的服务器不对外提供服务，那么按量付费可能更便宜。

1核1G的服务器大概可以应付2-3万个请求，折合在线人数的话应该在几百或上千，如果你的在线用户上万，则可以选择两核4G的。

让别人使用自己的推荐码，可以让推荐人获得代金券。推荐码在支付前的那个界面填入（勾选使用推荐码选项）。

购买了阿里云的服务器的话，就可以在阿里云进行域名备案，备案时需要域名，域名可以在阿里云买，也可以在其它平台购买。

### 远程登陆服务器

windows平台的命令行
http://www.putty.org/

填入ip，端口填22。

阿里云的Ubuntu默认的用户名是root

默认端口是22。

MAC下用命令行操作是用ssh命令来登陆：

ssh root@120.26.235.4(这里的ip替换成你自己的服务器的)

默认阿里云服务器是一个系统盘，用`fdisk -l`查看，可以看到一个Disk /dev/xvda: 42.9GB。

查看硬盘使用情况的命令是

df -h

建议你新分出一个数据盘来放你的网站的内容，否则，如果你将网站的数据放在系统盘上的话，一旦重装系统，系统盘上的数据就都没有了。

按control + d 会退出ssh的登陆。

每次都去输入那个ssh命令很麻烦，有什么办法简化呢？

如果你的电脑安装了zsh，那么会有一个.zshrc配置文件。我们用sublime text打开这个配置文件。在其中可以添加一些软链接。

alias ssh_mooc="ssh root@120.26.235.4"

保存。

再用
source .zshrc
重新载入一下刚刚修改的配置。就可以用把ssh_mooc当作ssh root@120.26.235.4这句命令来用。从而简化控制台的输入。

上面是用root这个最高权限的用户在操作，这其实是比较危险的。我们最好分配一些其它的用户来完成不同的操作。

所以，我们得新建一个用户：

adduser imooc_manager

然后会让你输入该用户的密码和一些无关紧要的信息。

按command + r可以清空当前屏幕。

接下来对这个用户进行授权：

gpasswd -a imooc_manager sudo

sudo visudo

找到root ALL=(ALL:ALL) ALL

在该行下面增加一行：

imooc_manager ALL=(ALL:ALL) ALL

通过这几句设置，让imooc_manager可以通过sudo且输入密码的情况下，执行root账户所能执行的一切操作。

然后control + x退出该配置文件，然后按shift + y 进行保存。

用ssh imooc_manger@120.26.235.4登陆ssh。

用service ssh restart 重启ssh服务。

这就可以通过imooc_manager账户通过输入密码来执行原本只有root才能执行的那些命令了。

还有一个问题，每次执行ssh登陆命令时候，都输入密码确实很麻烦，所以，下面就来实现SSH无密码登陆。

先切换到mac的~根目录（），或者windows控制台的默认当前目录，用ls -a命令查看一下当前目录下的文件，看有没有.ssh文件夹，如果有，再通过
```
cd .ssh
ls
```
命令显示下该文件夹中的内容，如果有id_rsa文件即是私钥，id_rsa.pub文件即是公钥，known_hosts是把id加入新域列表。

如果没有.ssh文件夹或者为空，说明没有生成过。否则是生成过的。

如果没生成过，则：

cd ..
mkdir .ssh
ssh-keygen -t rsa -b 4096 -C "scott@imooc.com"

然后会让你输入存储在什么地方以及是密码。

生成完成之后，可以通过

```
ssh cat id_rsa
ssh cat id_rsa.pub
```
来显示这两个文件的内容。

然后我们把ssh代理跑起来。

```
eval "$(ssh-agent -s)"
```

将私钥加入ssh代理中：
```
ssh-add ~/.ssh/id_rsa
```

新开一个控制台，通过ssh imooc_manager@120.26.253.4登陆ssh，然后：

```
ssh-keygen -t rsa -b 4096 -C "scott@imooc.com"
 eval "$(ssh-agent -s)"
 ssh-add ~/.ssh/id_rsa
```

这样就在服务器上也生成了公钥私钥且加入到了SSH代理中。

然后确保在~/.ssh目录下，输入如下命令：

vi authorized_keys

按下shift + :

然后输入wq

就在.ssh下生成了一个authorized_keys文件。

然后切换到刚才那个控制台（生成客户端本机公钥私钥的那个）中，通过cat id_rsa.pub将该公钥的内容打印出来，然后把打印出来的内容复制上。

再回到生成服务端公钥密钥那个控制台，通过vi authorized_keys打开该文件，将刚才拷贝的内容贴入并保存。

这样，就把本地电脑上的公钥粘贴到了服务器的authorized_key中。

然后通过

```
chmod 600 authorized_keys
```

把authorized_keys文件的权限进行一下修改，并通过

```
sudo ssh restart
```

重启ssh服务。


这样，我们就可以在本机上通过

```ssh imooc_manager@120.26.235.4```

命令来直接登陆服务器，无需再输入密码了。


### 增强服务器安全等级

因为服务器默认端口为22，这就等于所有人都知道你的服务器登陆端口就是22，这不太安全，所以我们需要修改一下。

首先通过

```ssh imooc_manager@120.26.235.4```

进行登陆。

然后通过

```
vi /etc/ssh/sshd_config
```

输入密码后就可以修改这个配置文件的内容了。

不过，我们在修改之前，新开一个窗口，仍然用

```ssh imooc_manager@120.26.235.4```

来登陆上服务器。

之所以准备好这样一个登陆好的窗口，是因为修改sshd_config容易出错，一旦你修改后忘记了改成了什么，如果没有打开已经处于登陆状态的控制台，可能你会因为记不得自己把sshd_config改成什么了而导致永远也登陆不进去了。

Port的设置，可以在0-65536之间，但是，因为0-1024之间的这些端口通常被系统程序所占用，而且需要root权限才能启动。所以，应设置在1024以上至65536之间。

这里把Port的值从22改成39999，接着把UseDNS设置成no，并在最末尾增加一行：

AllowUsers: imooc_manager

然后执行

```
sudo service ssh restart
```

然后我们再新开一个控制台窗口，执行：

```
ssh -p 39999 imooc_manager@120.26.235.4
```

即可改成用39999这个新端口登陆了。而老的默认22端口是无法再登陆成功了。

另外，还有一个明显的安全问题，因为默认的用户名大家都知道是root，所以，应该把root账户的登陆关闭掉。

然后，我们通过

```
vi /etc/ssh/sshd_config
```

继续修改改配置文件，配置：

PermitRootLogin no

是否允许密码登陆也可以设置为no，因为我们已经配置好了无密码登陆了：

PasswordAuthentication no

此外，再把空密码登陆关闭掉：

PermitEmptyPasswords no

保存并刷新服务即可。

在命令行环境下，想让光标回到行首，可以用control + a，让光标回到行尾则是control + e。

然后我们可以用
```
ssh -p 39999 root@120.26.235.4
```
发现root用户已经不让登陆了。

除了这些之外，其实还可以添加IP tables配置或者加入第三方的安全防护软件。


首先把Ubantu更新一下：

```
sudo apt-get update && sudo apt-get upgrade
```

然后清空掉现有的iptables规则：

```
sudo iptables -F
```

接着来新加规则：

```
sudo vi /etc/iptables.up.rules
```

配置成如下：

```
*filter
#allow all connections 允许所有建立起来的连接
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#allow out traffic允许所有出去的流量
-A OUTPUT -j ACCEPT

#allow http https允许443、80端口请求的连接
-A INPUT -p tcp --dport 443 -j ACCEPT
-A INPUT -p tcp --dport 80 -j ACCEPT

#allow ssh port login允许从39999端口登陆服务器
-A INPUT -p tcp -m state NEW --dport 39999 -j ACCEPT

#allow ping允许从外网来ping，以进行测试
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

#log denied calls被拒绝的请求
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied:" --log-level 7

# drop incomming sensitive connections阻止可疑的或密集的请求，如果某个ip1分钟内超过150次请求，则拦截掉它
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --set
-A INPUT -p tcp --dport 80 -i eth0 -m state --state NEW -m recent --update --seconds 60 --hitcount 150 -j DROP

#reject all other inbound拒绝所有其它的进到服务器的流量
-A INPUT -j REJECT
-A FORWRAD -j REJECT

COMMIT
```

这样就把这份防火墙的规则保存好了。

我们接下来要告诉iptables这个防火墙规则在哪里：

```
sudo iptables-restore < /etc/iptables.up.rules
```

然后我们用命令查看一下防火墙的状态：

```
sudo ufw status
```

发现是inactive。所以我们需要激活它：

```
sudo ufw enable
```
用命令查看一下防火墙的状态：

```
sudo ufw status
```
再用命令查看一下防火墙的状态：

```
sudo ufw status
```

发现变成了active。

接下来配置让防火墙可以自动启动，因为有的时候系统会重启：

```
sudo vi /etc/network/if-up.d/iptables
```

然后写入内容：

```
#!/bin/sh
iptables-restore /etc/iptables.up.rules
```

然后修改下权限：

```
sudo chmod +x /etc/network/if-up.d/iptables
```

Fail2Ban是一种防御性落库，根据监测系统的日志文件，根据检测到的可疑行为触发不同的动作。


安装：
```
sudo apt-get install fail2ban

```

编辑其配置文件：

```
sudo vi /etc/fail2ban/jail.conf
```

改下面几项：

bantime = 3600

destemail = 345852472@qq.com (改成自己邮箱)

action = %(action_mw)s

保存后用

```
sudo service fail2ban status
```
查看一下fail2ban有没有运行，发现正在运行中。

如果要把它停掉或开启，用下面的命令：

```
sudo service fail2ban stop
sudo service fail2ban start
```
另外，还有比较多用的方法是把允许登陆服务器的ip限制在内网ip范围，然后架设一个跳转机，你登陆服务器时，需要先登陆到内网的跳转机，再由跳转机登陆服务器。这里不再展开。


关于iptables配置的详细内容，慕课网上有专门的教程。

### 配置服务器的node环境

先更新

```
sudo apt-get update
```

下面安装一堆东西：

```
sudo apt-get install vim openssl build-essential libssl-dev wget curl git
```

apt-get是一款适应于Unix和Linux系统的应用程序管理器。其更多用法参见：

https://baike.baidu.com/item/apt-get/2360755?fr=aladdin

### 配置Nginx实现反向代理

让web服务可以通过80端口被外网访问到

目前我们是放在8081端口，80端口是无法启动的，原因是imooc_manager这个目录下，node.js是不具备root权限的，所以不能监听0-1024之间的任何一个端口，当然也包括80端口。强制通过sudo来启动node服务以实现对80端口的监听不是不可以，一个是我们需要额外的配置，一个是我们需要放大node的权限，这多少会带来些额外的风险和成本。所以，我们引入Nginx用root级别的权限来启动对80端口的监听，同时通过Nginx把来自80端口的流量分配给node服务的另外一个端口，实现node服务的这样一种代理。如果服务器只给一个网站提供服务的话，那解析网站到服务器的一个网址，网站的服务端程序（如node.js）监听80端口就可以了。如果服务器要给很多个应用提供服务，那么借助Nginx不仅可以实现端口的代理，而且可以实现负载均衡，让它来判断是来自哪个域名或者是IP的访问，从而根据所配置的规则，将这个请求原封不动地转发给特定的端口或者是特定的某几台机器。在我们这个例子中，就是把来自80端口的请求，全部转发到node.js启动的8081端口进行处理。

我们购买的服务器，可能会预装apache，因为我们用不上它，所以可以把它给删了。

首先登陆服务器：

```
ssh -p 39999 imooc_manager@120.26.235.4
```

然后

```
sudo service apache2 stop
```

来关闭它。

如果执行该命令后返回：

	apache2: unrecognized service

表示没有apache2服务。

然后再试一下：

```
sudo service apache stop
```

如果执行该命令后返回：

	apache: unrecognized service

表示没有apache服务。

然后我们就可以通过如下命令来删除了：

```
update-rc.d -f apache2 remove
sudo apt-get remove apache2
```

然后我们再更新一下包列表：

```
sudo apt-get update
```

接着安装Nginx：

```
sudo apt-get install nginx
```

安装之后，检查下Nginx的版本：

```
nginx -v
```

这里我们用的示例版本是nginx 1.4.6（Ubuntu），你可能用的是更新的版本，这没关系。


然后

```
cd /etc/nginx/
ls
cd conf.d
sudo vi imooc-com-8081.conf
```

然后配置imooc-com-8081.conf文件的内容为：

```
upstream imooc {
	server 127.0.0.1:8081
}

server {
	listen 80;
	server_name 120.26.253.4;

	location / {
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Nginx-Proxy true;

		proxy_pass http://imooc;
		proxy_redirect off;

	}
}

```

保存，然后

```
cd ..
sudo vi nginx.conf
```

将其中的include /etc/nginx/conf.d/*.conf这一句的注释放开，让它能把/etc/nginx/conf.d文件夹下的所有以.conf结尾的配置文件都加载进来。

保存后，我们通过

```
sudo nginx -t
```
来检测一下配置文件有无错误。

如果没有错误，则重启一下Nginx服务器。

```
sudo nginx -s reload
```

然后我们通过IP地址（120.26.253.4）就能直接访问到node.js服务器上跑在8081端口的服务了。

这个时候我们查看一下请求的返回头，可以发现header中有Server为nginx 1.4.6 ubuntu。 那么怎么将这个nginx的版本信息隐藏掉呢？

可以设置在/etc/nginx/nginx.conf 中把 server_tokens off 这一句的注释放开，然后重新保存，然后执行`sudo service nginx reload`刷新nginx服务。这样返回的Server就只有nginx，而没有版本号了。

### 利用DNSPod将域名解析到DNS服务器。

上面，我们实现了用ip地址访问，但是，怎么让用户能通过域名来访问我们的网站呢？这就需要将域名解析后指向到我们的服务器。通常，我们需要一个域名解析服务器（DNS），通常，这是由你所购买的域名的那个平台的服务商提供的。一个域名只能对应一个IP地址，但是一个IP地址可以绑定多个域名。

阿里云虽然也提供域名解析服务，但是个人建议转到DNSPod去解析，有两个原因，一个原因是DNSPod算是一个老厂商了，非常成熟。另一个方面，我们可能有好些个域名，而且这些域名不一定都是由阿里云上购买的，这样，我们就可以集中到DNSPod上管理。

在dnspod.cn上注册一个账号，然后在域名解析菜单中，添加域名，输入我们自己的域名。并到https://support.dnspod.cn/Kb/showarticle/tsid/177/#ChangeDomainNS中点击“万网注册的域名如何使用DNSPod解析？”进入该页面中，拷贝出来两个DNS短地址（对应6台服务器）

f1g1ns1.dnspod.net
f1g1ns2.dnspod.net

在阿里云的域名的基本信息里，点击“修改DNS”，将DNSPOD中拷贝出来的两个DNS短地址依次填入，注意不要带上多余的空格或特殊字符。

这里先备份一下修改前的阿里云自带的那两个短地址：
dns29.hichina.com
dns30.hichina.com

虽然提示48小时才生效，但一般过4-5小时就生效了。

在DNSPod上点击这个域名，看有没有从阿里云上导入DNS记录成功。

DNS记录的类型：

A记录：这里A是Address的意思，地址记录，用来制定域名的IPv4地址（如：8.8.8.8），如果需要将域名指向一个IP地址，就需要添加A记录。这个最最常用。

CNAME：如果需要将域名指向另一个域名，再由另一个域名提供IP地址，就需要添加CNAME记录。比如，你使用了七牛的视频和图片服务，但是七牛的ip可能有几百个而且可能变化，这个时候，我们可以设定一个CNAME记录，把这个域名交给七牛来提供IP。

TXT： 在这里可以填写任何东西，长度限制255.绝大多数的TXT记录是用来做SPF记录（反垃圾邮件）。

NS： 域名服务器记录，如果需要把子域名交给其他DNS服务商解析，就需要添加NS记录。

MX： 如果需要设置邮箱，让邮箱能收到邮件，就需要添加MX记录。

显性URL： 从一个地址301重定向到另一个地址的时候，就需要添加显性URL记录。

隐性URL： 类似于显性URL，区别在于隐性URL不会改变地址栏的域名。
SRV： 记录了哪台计算机提供了哪个服务。格式为：服务的名字、点、协议的类型，例如：xmpp-server

主机记录：

我们使用A记录类型的时候，如果主机记录填@，这直接解析到主域名，test.cn上去；如果主机记录填*，泛解析，匹配其它所有域名*.test.cn；如果主机记录填入www，则解析后的域名为www.test.cn；如果主机记录填入1，则解析后的域名为1.test.cn。等等，以此类推。

记录值：

记录类型为A的时候，应该填IP地址；
记录类型为CNAME的时候，应该填域名；
记录类型为MX的时候，应该填邮件服务器的IP地址或者是邮件服务器的域名；
如果选择的是TXT的时候，应该填写企业邮箱的反垃圾的设置。

权重和MX优先级：

是用来调整解析的优先级的，如果规则有重叠，由他们来决定优先使用哪个。

TTL：

600 单位是秒。 这个一般不用修改，保持即可。
其作用是设置DNS缓存记录作用的时间。

下面我们配置一个例子：

主机记录： WWW
记录类型： A
线路类型： 默认
记录值： 120.26.235.4
权重： -
MX优先级： -
TTL： 600

保存。


接下来我们配置另外几个子域名的DNS记录：

主机记录： gougou
记录类型： A
线路类型： 默认
记录值： 120.26.235.4
权重： -
MX优先级： -
TTL： 600

主机记录： indust
记录类型： A
线路类型： 默认
记录值： 120.26.235.4
权重： -
MX优先级： -
TTL： 600

主机记录： movie
记录类型： A
线路类型： 默认
记录值： 120.26.235.4
权重： -
MX优先级： -
TTL： 600

主机记录： wechat
记录类型： A
线路类型： 默认
记录值： 120.26.235.4
权重： -
MX优先级： -
TTL： 600

登陆七牛，对象存储，在存储空间列表中找到对应的存储空间（如induscreation），在融合CDN加速域名中添加一个自定义域名：

选择普通域名，indust.creation.test.cn，使用场景：图片小文件，点击创建。

在新增好的自定义域名中点击域名进入，看到如何配置CNAME按钮，点击该按钮进入，在页面中可找到：

记录值：域名信息中CNAME后面的值iduyexl.qiniudns.com

把iduyexl.qiniudns.com这个记录值复制出来。

在DNSPod中添加一条DNS记录：

主机记录： indust.creation
记录类型： CNAME
线路类型： 默认
记录值： iduyexl.qiniudns.com
权重： -
MX优先级： -
TTL： 600

配置好之后，到七牛中找到对应的存储空间（如induscreation）中的内容管理中，找一张之前上传的图片，右边点那个眼睛，就会看到一个外链地址，我们把外链地址中七牛的域名部分改成indust.creation.test.cn就可以访问了。不过，由于七牛的添加自定义域名的配置有一定的审批时间，最长12小时之后，其实一般10分钟左右，我们才可以用自定义的域名访问到七牛中的图片。暂时性的测试方法是用ping indust.creation.test.cn，如果能够ping成功，说明配置的DNS已经生效了。

### 服务器MongoDB的安装配置

阿里云也有付费的MongoDB。不过，我们个人的话，还是自己在服务器上配。

严格来说，数据库不应该和应用放在同一台服务器上，不过，我们为了节省成本，暂且把Mongodb也放在应用的同一台服务器上。


首先登陆上服务器：

```
ssh -p 39999 imooc_manager@120.26.235.4
```
然后，我们查看MongoDB在Ubuntu上的安装文档：

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

导入public key:

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```

```
echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list

sudo apt-get update

sudo apt-get install -y mongodb-org
```

注意，上面的第一行语句，会因你的系统版本不同而不同。

如果安装过程中出现错误：unable to locate package mongodb-org

则

```
sudo vi /etc/apt/apt.conf
```

把Accquire::http::Proxy "http://mirrors.aliyun.com/"这个阿里云的源给注释掉。


然后再去重新运行上面的命令。如果你在安装mongodb的时候特别慢(可能会好几个小时)，可以

```
sudo vi /etc/apt/sources.list.d/mongodb-org-3.4.list
```

把其中的http://repo.mongodb.org/apt/改成http://mirrors.aliyun.com/mongodb/apt/

这样把镜像改成阿里云的，获取速度会更快

然后

```
sudo apt-get update
sudo apt-get install -y mongodb-org
```

下面我们把mongdb服务开起来:

```
sudo service mongod start
```

然后怎么检查有没有开启成功呢？

```
cat /var/log/mongodb/mongod.log
```

来查看一下配置文件。

然后我们执行`mongo`去进行连接，发现连接不成功，原因是服务器的防火墙没有允许27017端口。

```
sudo vi /etc/iptables.up.rules
```

# log denied calls
上方增加一句：

```
# mongodb connnect
-A INPUT -s 127.0.0.1 -p tcp --destination-port 27017 -m state --state NEW,ESTABLISHED -j ACCEPT
-A OUTPUT -d 127.0.0.1 -p tcp --source-port 27017 -m state --state ESTABLISHED -j ACCEPT
```

然后重新载入规则。

```
sudo iptables-restore < /etc/iptables.up.rules
```

再通过`mongo`来连接一下这个mongodb的实例，发现可以连接成功了。

我们选择的MongoDB数据库是Community Edition on Ubuntu，因为企业版是收费的，所以我们选择了这个免费的社区版。经济条件允许的可以去选择企业版。

若要终止mongodb服务，可以：

```
sudo service mongodb stop
```

启动mongodb服务则是：

```
sudo service mongodb start
```

重启则是：

```
sudo service mongodb restart
```

但是，现在因为mongodb默认的服务是启动在27017端口下的，这是众所周知的，这也就会存在安全问题，下面我们通过配置来修改这个端口，让它不那么透明。

```
sudo vi /etc/mongod.conf
```
把其中的port：27017改成port：19999

相应地，我们需要在防火墙中把端口号配置也给改成19999。

然后我们才能通过`mongo --port 19999`连接成功。

关于配置、优化mongodb数据库的性能，特别是mongodb的读写权限、日志存放地址等一系列的问题，我们就不展开了。

那么，如何往线上的服务器中去导入初始的数据呢？

以我们的微信小程序为例子。

先看一下这个小程序：

```
cd indust-server
node
sudo mongod
```

```
cd indust-app
wept
```

然后，我们首先需要把本地的mongodb的是数据备份出来，使用：

```
mongodump -h 127.0.0.1：27017 -d indust-app -o indust-app-backup
```
也许你本地需要加上sudo。

导出后的文件是一堆后缀名为.bson的文件。

然后我们把这些备份文件打包一下：

```
tar zcvf indust-app.tar.gz indust-app-backup
```

执行`ls`可以发现当前文件夹下多了个indust-app.tar.gz

然后在服务器上执行`mkdir dbbackup`创建一个文件。

下面我们把这个文件上传至服务器：

```
scp -P 39999 ~/Desktop/deploy-projects/indust-app.tar.gz imooc_manager@120.26.235.4:/home/imooc_manager/dbbackup/
```

这样，我们就将文件上传至了服务器上刚才创建的dbback文件夹下。

然后在服务器的终端中，进入到dbbackup目录下

执行

```
tar xvf
```

对上传过来的数据库备份文件进行解压缩。

```
cd ~
mongorestore --host 127.0.0.1:19999 -d indust-app ./dbbackup/indust-app-backup/indust-app
```

这样就导入成功了。

下面我们到数据库中验证一下看确实导入进去了没有？

```
mongod --port 19999
use indust-app
show tables
db.creations.find({})
```

看到数据都已经被导进来了，执行`exit`退出。

上面是完整导入的情况，那么如果我们只需要导入部分数据呢？

```
mongoexport -d imooc-movie -c users -q '{"name": {$ne: null}}' -o ./movie-users.json
```

这将会从imooc-movie这个数据库里的users表里查询到name不为null的数据导出到当前目录的movie-users.json文件中。

```
scp -P 39999 ./movie-users.json imooc_manager@120.26.235.4:/home/imooc_manager/dbbackup/
```

然后切换到服务器的终端上，

```
cd dbbackup/
ls
```

即可看到movie-users.json

下面我们执行导入

```
mongoimport --host 127.0.0.1:19999 -d imooc-movie -c users ./movie-users.json
```

这样就导入到了服务器的数据库中。

```
mongod --port 19999
use imooc-movie
show tables
db.users.find({})
```

这样就可以看到数据了。

那如果数据库导入之后我又后悔了，想删掉怎么办呢？

```
mongo --host 127.0.0.1:19999 imooc-movie --eval "db.dropDatabase()"
```

这样就删掉了。

可以如下去验证一下：

```
mongo --port 19999
show dbs
```

可以发现imooc-movie数据库不见了。

当然，我们也可以切换到本地的终端上再次执行导入。

```
mongoimport --host 127.0.0.1:19999 -d imooc-movie -c users ./movie-users.json
```

下面来看如何给mongodb设置权限？

在此之前，需要对mongodb的权限系统有了解：

没有默认的管理员账号的，所以需要先添加管理员账号，再开启权限认证；

只有在切换到admin数据库之后添加的账号，才算是管理员账号；

用户只能在所在的数据库登陆，包括管理员账号；

管理员可以管理所有的数据库，但是不能直接管理其它数据库，首先要到admin中认证之后才可以。

首先对Mongodb设置一个超级管理员。

```
use admin

db.createUser({user: 'imooc_cases_owner', pwd: 'Safe1*24$', roles: [{role: 'userAdminAnyDatabase', db: 'admin'}]})

```
这就创建好了，然后进行授权：

```
db.auth('imooc_cases_owner','Safe1*24&$)
```
看到返回1，则授权成功了。

然后

```
use imooc-movie
db.createUser({user: 'imooc_movie_runer', pwd: 'F**K9001', roles: [{role: 'readWrite', db: 'imooc-movie'}]})
```
这里配置imooc_movie_runner这个用户对imooc-movie这个数据库具有读写权限。


下面再配置一个备份角色，只能读，不能写。

```
use imooc-movie
db.createUser({user: 'imooc_movie_wheel', pwd: 'B**Kup2017', roles: [{role: 'read', db: 'imooc-movie'}]})
```

接下来设置另一个数据库imooc-app的：

```
use admin
db.auth('imooc_cases_owner', 'Safe1*24$')

use imooc-app
db.createUser({user: 'imooc_app_runer', pwd: 'Ack!24$', roles: [{role: 'readWrite', db: 'imooc-app'}]})
db.createUser({user: 'imooc_app_wheel', pwd: 'Do053#', roles: [{role: 'read', db: 'imooc-app'}]})
```

同样照猫画虎，给indust-app、imooc-wechat这两个数据库也逐一设置。

最后`exit`

值得把所有的用户密码存起来，否则忘了就不好了。

用户虽然创建了，但还没有把验证模式开启。

现在我们就来开起来。

```
sudo vi /etc/mongod.conf
```

找到#security

在下面添加：

security:
  authorization: 'enabled'

然后执行

```
sudo service mongod restart
```

 来重启服务让配置生效。

 这时候，执行

 ```
 mongo --port 19999
 show dbs
 ```

 就会报错了，提示说你没有权限执行这个脚本。

 那么我们就用我们刚才配置好的用户来去做这些事情。

 ```
 use admin
 db.auth('imooc_cases_owner', 'Safe1*24$')
 show dbs
 ```

 这样就可以查看到数据库了。

 那么，如果我想直接登陆到某一个数据库里面应该怎么做呢？

```
 mongo 127.0.0.1:19999/imooc-movie -u imooc_movie_runer -p F**k9001$
 show tables
 db.users.find({})
```

那么，怎么把线上一个服务器的数据库迁移到另一个服务器上呢？

首先在服务器上创建一个目录，把数据备份出来：

```
mkdir db
cd db
mongodump -h 127.0.0.1:19999 -d indust-app -u indust_app_wheel -p T*k233$ -o indust-app-old
ls
tar zcvf indust-app-old.tar.gz indust-app-old/
```

除了迁移一整个数据库之外，我们还要会迁移一张单表：

```
mongoexport -h 127.0.0.1:19999 -d imooc-movie -u imooc_movie_wheel -p B**kup2017$ -c user -q '{"name": {$ne: null}}' -o ./movie-users-old.json

cat movie-users-old.json
```

因为我们没有两台服务器，为演示从一个地方迁移到另一个地方，所以我们将刚才备份好的这两个数据文件下载到本地，然后再上传到服务器中。

我们切换到本地终端上

```
scp -P 39999 imooc_manager@120.26.235.4:/home/imooc_manager/db/indust-app-old.tar.gz ./
scp -P 39999 imooc_manager@120.26.235.4:/home/imooc_manager/db/movie-users-old.json ./
```

这就下载好了。

在目标服务器上，

```
mkdir newdb

```

然后切换到本地服务器上，进行上传：

```
scp -P 39999 ./indust-app-old.tar.gz imooc_manager@120.26.235.4:/home/imooc_manager/newdb/
scp -P 39999 ./movie-users-old.json imooc_manager@120.26.235.4:/home/imooc_manager/newdb/
```

切换到目标服务器的终端上，查看文件，进行解压缩：

```
cd newdb
ls
tar xvf indust-app-old.tar.gz
```

```
mongo --port 19999
use admin
db.auth('imooc_cases_owner', 'Safe1*24$')
use imooc-movie-target
db.createUser({user: 'imooc_movie_target', pwd: 'movie_target', roles: [{role: 'readWrite', db: 'imooc-movie-target'}]})

use admin
db.auth('imooc_cases_owner', 'Safe1*24$')
use indust-app-target
db.createUser({user: 'indust_app_target', pwd: 'indust_target', roles: [{role: 'readWrite', db: 'indust-app-target'}]})

mongorestore -h 127.0.0.1:19999 -d indust-app-target -u indust_app_target -p indust_target /newdb/indust-app-old/indust-app/

 mongoimport -h 127.0.0.1:19999 -d imooc-movie-target -u imooc_amovie_target -p movie_target -c users /newdb/movie-users-old.json/
```

下面检查一下有没有导入成功：

```
mongo 127.0.0.1:19999/imooc-movie-target -u imooc_movie_target -p movie_target
show tables
db.users.find({})

mongo 127.0.0.1:19999/indust-app-target -u indust_app_target -p indust_target
show tables
db.categories.find({})
```

如果真遇到这样线上数据库从一台服务器迁移到另一台服务器的场景，建议先把所有的命令敲好，找测试的数据先测试一遍，再去线上操作。但不管怎么小心，还是有可能出错的。备份是一种很好的止损的办法。

下面我们来看如何定时备份？

切换到服务器终端上

```
mkdir tasks
cd tasks
vi movie.backup.sh

```

把movie.backup.sh中的内容设置成如下：

#!/bin/sh

backUpFolder=/home/imooc_manager/backup/movie
data_now=`date + %Y_%m_%d_%H%M`
backFileName=movie_$data_now

cd $backUpFolder
mkdir -p $backFileName

mongodump -h 127.0.0.1:19999 -d imooc-movie -u imooc_movie_wheel -p B**kup2017$ -o $backFileName
tar zcvf $backFileName.tar.gz $backFileName
rm -rf $backFileName


	补充一下`mkdir -p`的含义：

	参数P代表parents，表示递归创建目录。
	列如：
	如果要创建目录A并创建目录A的子目录B，没有用-p的情况下是mkdir 2次
	如果用-p 可以直接创建2个目录 mkdir -p 目录A/子目录B就可以。

然后我们退出来，创建好目录：

mkdir backup
cd backup/
mkdir movie
cd ~

然后执行刚才写好的.sh文件：

```
sudo sh ./tasks/movie.backup.sh
cd backup/
cd movie/
ls
```

下面把定时任务跑起来：

crontab -e

在其中末为输入：

13 00 * * * sh /home/imooc_manager/tasks/movie.backup.sh

按control+x 再按下shift+y

等到凌晨13分的时候，看能不能打包出来文件。

我们可以去检查下：

```
cd backup
cd movie
ls
```

下面我们进一步完善这个定时任务，把备份出来的文件定时传到七牛云端中去，以实现更安全的备份。因为如果备份在服务器中的话，服务器挂了还是会丢失数据的。

```
vi upload.js
```
参考：
https://developer.qiniu.com/kodo/sdk/3828/node-js-v6

在upload.js中输入如下内容：

var parts = process.env.NODE_ENV.split('@');
var file = parts[1] + 'tar.gz';
var filePath = parts[0] + '/' + file;


var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'Access_Key';//改成你自己的
qiniu.conf.SECRET_KEY = 'Secret_Key';//改成你自己的
//要上传的空间
bucket = 'imoocdeploydb';//改成你自己的上传空间
//上传到七牛后保存的文件名
key = file;
//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}
//生成上传 Token
token = uptoken(bucket, key);
//要上传文件的本地路径
//filePath = './ruby-logo.png'
//构造上传函数
function uploadFile(uptoken, key, localFile) {
  var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
  });
}
//调用uploadFile上传
uploadFile(token, key, filePath)


接着，再去修改一下原来的tasks/movie.backup.sh文件，在其末尾添加一行命令来传递参数并调用upload.js

```
NODE_ENV=$backUpFolder@$backFileName node /home/imooc_manager/tasks/upload.js
```

然后到七牛中，对象存储的资源创建中，新建一个存储空间，名字叫imoocdeploydb，选择私有空间，确认创建。

在tasks目录下，安装qiniu模块：

```
npm i qiniu
```

然后用如下命令执行一边脚本文件：

```
./movie.backup.sh
```

再到七牛上去看文件上传成功了没有。若有，则定时任务一切OK了。

我们可以通过
```
crontab -e
```
来配置自动执行定时任务的时间点：
00 6 * * * sh /home/imooc_manager/tasks/movie.backup.sh
00 18 * * * sh /home/imooc_manager/tasks/movie.backup.sh

比如，像上面这样设置6点执行一次，18点执行一次。

如果我们除了安装Mongodb之外，还想安装mysql应该怎么处理呢？

```
sudo apt-get install mysql-server mysql-client
```

安装的过程中会让你输入密码。装完后我们可以通过`mysql -u root -p`来登陆，登陆时候会要求输入密码。

关于mysql的导入、导出、备份，大家自行去搜索一些文档，这里不再展开。

未完待续。

讲师：
http://www.imooc.com/t/108492
https://www.zhihu.com/people/zjh-53-8/activities
http://www.imooc.com/article/17554

请大家积极支持该讲师的精彩课程。













