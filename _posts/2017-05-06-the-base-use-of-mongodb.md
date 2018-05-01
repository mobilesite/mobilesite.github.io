---
layout:     post
title:      "MongoDB的基本使用"
subtitle:   ""
date:       2017-05-06 12:15:19
author:     "Paian"
catalog: true
tags:
    - MongoDB
    - 服务端开发
    - node.js
---

本文的前四小节以windows 10中v3.3.4版MongoDB的安装与使用为例。第五小节以Mac系统为例。

### 一、安装

在[https://www.mongodb.com/download-center?jmp=nav#community](https://www.mongodb.com/download-center?jmp=nav#community)下载所需的MongoDB版本。

安装到d:\mongodb（默认的安装路径是在C盘下面）目录下。之所以不按默认的路径安装，是为了在操作系统崩溃的时候，避免数据库中的数据丢失。同时，选择一个较短的路径名也便于维护。

然后，我们在控制台中进行命令行操作。

```
cd d:\mongodb\bin
.\mongod.exe --dbpath="d:\mongodb\data\db"
```

这样就会启动一个服务，并且服务的数据库地址指向d:\mongodb\data\db目录。

在此基础上，另开一个控制台窗口，在其中执行命令：

```
cd d:\mongodb\bin
.\mongo.exe
```

就可以进入MongoDB的命令操作状态 （javascript shell，断开这种操作连接用`exit`命令）。

注意：

要想成功连接到MongoDB，一定要在已经启动MongoDB的情况下，也就是要先开一个窗口执行：

```
cd d:\mongodb\bin
.\mongod.exe --dbpath="d:\mongodb\data\db"
```

然后，才能去连接。

为了使得每次不用cd到对应目录下才能操作，可以给系统环境变量Path中增加MongoDB的目录，即：D:\mongodb\bin。

**经过这样的配置，我们就可以在一个控制台窗口中通过`mongod --dbpath="d:/mongodb/data/db"`启动MongoDB，而在另一个窗口中通过`mongo`命令来连接数据库。**

另外，如果你使用MongoVue这样的客户端工具，也是需要在通过`mongod --dbpath="d:/mongodb/data/db"`启动了MongoDB的情况下才能连接成功的！！

备注：

MongoVUE是一款比较好用的MongoDB客户端工具，可以为大家提供一个高度、简洁可用的MongoDB管理界面。

此时可以执行如下一系列的命令了。

执行这些命令之前，先介绍MongoDB中的几个概念。

database（数据库）—— 对应关系数据库上的数据库（database）；

collection（集合） —— 对应关系数据库上的数据库表（table）；

document（文档） —— 对应关系数据库上的数据行（row）；

filed（域） —— 对应关系数据库上的数据列（column）；

index（索引） —— 对应关系数据库上的索引（index）；

primary key（主键） —— 对应关系数据库上的主键（primary key）。

为了便于理解起见，下面的表实际上说的就是collection，而行则对应document。

### 二、MongoDB的数据类型

MongoDB支持的数据类型有：

- String: 这是最常用的数据类型。在MongoDB中的String类型必须是有效的UTF-8。

- Integer: 这种类型是用来存储一个数值。整数可以是32位或64位，这取决于您的服务器。

- Boolean: 此类型用于存储一个布尔值 (true/ false) 。

- Double: 这种类型是用来存储浮点值。

- Min/Max keys: 这种类型被用来对BSON（二进制的JSON）元素的最低和最高值比较。

- Arrays: 使用此类型的数组或列表或多个值存储到一个键。

- Timestamp: 时间戳。这可以方便记录文件修改或添加的具体时间。

- Object: 用于内嵌文档。

- Null: 这种类型是用来存储一个Null值。

- Symbol: 此数据类型用与String大体相同，但它通常是保留给特定符号类型的语言使用。

- Date: 此数据类型用于存储当前日期或时间的UNIX时间格式。可以指定自己的日期和时间，日期和年，月，日到创建对象。

- Object ID: 此数据类型用于存储文档的ID。

- Binary data: 此数据类型用于存储二进制数据。

- Code: 此数据类型用于存储到文档中的JavaScript代码。

- Regular expression: 此数据类型用于存储正则表达式

### 三、MongoDB常用命令

#### 1、数据库的基本操作

```
help                                        # 显示帮助信息
show dbs                                    # 这将显示出数据库目录（d:\mongodb\data\db）下所有数据库
use buduhuisi                               # 切换成使用某个数据库，比如这里是buduhuisi，如果该数据库不存在，则会新建它，
                                            # 不过，所创建的数据库不会存在于show dbs查询出来的列表中。
                                            # 要想在该列表中显示出来该数据库，
                                            # 需要至少插入一个文档到该新建的数据库中才行。
show collections                            # 显示当前数据库中的所有表
db.createCollection('test', {capped:true, size: 6142800, max: 10000})
                                            # 创建数据表test，它有三个可选的选项：
                                            # 1、capped：如果为true，表示启用上限集合。上限集合是一个固定大小的集合，
                                            # 当它达到其最大尺寸会自动覆盖最老的条目。 如果指定true，则还需要指定参数的大小。
                                            # 2、size：指定的上限集合字节的最大尺寸。如果capped 是true，那么还需指定这个字段。
                                            # 3、max：指定上限集合允许的最大文件（document）数。
                                            # 在MongoDB中一般并不需要创建集合。当插入一些文档时，MongoDB会自动创建集合。
                                            # 注意：老版本的MongoDB中还有一个参数autoIndexId，在新版本中已经不使用了。

db.user.drop()                              # 删除user表
db                                          # 显示当前正在使用的数据库
```

#### 2、数据插入

```
db.user.insert({realName:'拍岸', username:'admin', password: '123', avatar: '', age: 18, createTime: '123411'})
                                            # 往当前在用的数据库的user表中插入了两条数据
db.user.insert([{realName:'测试1', username:'test1', password: '456', avatar: '', age: 30, createTime: '123412'},{realName:'测试2', username:'test2', password: '789', avatar: '', age: 38, createTime: '123413'}, {realName: 'test3', username:'test3', password: '000', avatar: '', age: 30, createTime: '123414'}])
                                            # 一次插入多条数据
```

#### 3、数据查询

```
db.user.find()                              # 显示出当前数据库user表中的所有数据行
db.user.find().pretty()                     # 显示出当前数据库user表中的所有数据行，与上一个命令不同的是，它会将输出的信息格式化
db.user.findOne()                           # 显示出当前数据库user表中的一个数据行，而且自动是格式化好了的。
                                            # 注意：没有db.user.findOne().pretty()
db.user.find({realName:'拍岸'}).pretty()    # 查询出realName字段为拍岸的数据行（当然，这个语句也可以查询等于）。
db.user.find({age: {$lt:30} }).pretty()     # 查询出age字段小于30的数据行。
db.user.find({age: {$lte:30} }).pretty()    # 查询出age字段小于等于30的数据行。
db.user.find({age: {$gt:30} }).pretty()     # 查询出age字段大于30的数据行。
db.user.find({age: {$gte:30} }).pretty()    # 查询出age字段大于等于30的数据行。
db.user.find({age: {$ne:30} }).pretty()     # 查询出age字段不等于的数据行。

db.user.find({realName:'拍岸', age: 18}).pretty()
                                            # 进行与（相当于关系型数据库中的and）查询
                                            # 这里表示只有realName为拍岸而且age为18时，才会被查询出来。

db.user.find({$or: [{realName:'拍岸'}, {age: 38}]}).pretty()
                                            # 进行或（相当于关系型数据库中的or）查询

db.user.find({age: {$lte: 30}, $or: [{realName: '拍岸'}, {realName: '测试1'}] })
                                            # 与和或查询同时存在也是可以的

db.user.find({age: {$in: [30, 20]}})        # 找出年龄在[30、20]这一数组中的，即age是30或者20的
db.user.find({age: {$nin: [30, 20]}})       # 找出年龄不在[30、20]这一数组中的，即age不是30也不是20的

db.user.find({realName:/测试/})             # 查询realName中包含测试两个字的数据
db.user.find({realName:/^测试/})            # 查询realName中以测试两个字开头的数据

db.user.find({'$where': function(){return this.age>20 }})
                                            # 查询年龄大于20的所有记录，不是非常必要时，应避免使用$where，因为效率低

db.user.find().limit(2)                     # 查询符合条件的前两条数据，超过两条的只显示前两条
db.user.find().skip(2)                      # 查询符合条件的跳过前两条之后的数据

db.user.find().sort({age:1})                # 对查询结果按age升序排列
db.user.find().sort({age:-1})               # 对查询结果按age降序排列

db.user.find().count()                      # 获取查询某个结果集的数据条数db.user.find({realName:/test/})

db.user.distinct('age')                     # 获取user表中所有数据行中age的无重复的取值，返回的是一个去重后的age的取值数组

```

#### 4、数据修改

```
db.user.update({age: 30}, {$set: {age: 38}})  # 只会更新一行，将找到的第一行age为30的数据更新成age为38
db.user.update({age: 38}, {$set: {age: 30}})  # 再做一次更新，将上一行修改的数据恢复成原样
db.user.update({age: 30}, {$set: {age: 32}}, {multi: true})
                                              # 会更新多行，将找到的age为30的行的数据全部更新成age为32

db.user.save({"_id" : ObjectId("590d545bd36b94f780598afb"), realName:'测试3',username:'test3', password: '789', avatar: '', age: 38, createTime: '123413'})          # 这也是一个更新替换的操作，注意"_id"项一定要有，因为替换就是根据这个项去进行的，
                                              # 如果没有"_id"项，则会当作是插入数据行的操作
                                              # 另外还的注意，字段要写全，如果你只写了两个字段，
                                              # 则原来那条记录中的其它字段都会被删除掉，而不会保留
                                              # 即这种方式是整条记录替换，而非个别字段替换

db.user.update({realName:'拍岸'},{$inc:{age:1}})
                                              # 将realName是拍岸的数据行的age在原来的基础上加1，这是$inc的意义
```

#### 5、数据删除

```
db.user.remove({age:38}, 1)                   # 删除一行数据，这里删除的是符合条件（age为38）的第一行数据
                                              # 这里第二个参数可以是1，也可以是true，

db.user.remove({age:38})                      # 删除一行数据，这里删除的是符合条件（age为38）的第一行数据删除多行数据，
                                              # 这里删除的是符合条件（age为38）的所有行的数据
                                              # 注意：老的版本的MongoDB中可以不给remove()传递参数来删除所有行的数据，
                                              # 但是新版本已经不行了。可能是因为这样很容易误操作的原因。
```

#### 6、投影

投影的意义是选择所需要的列的数据。而默认的查询会将符合条件的所有列的数据全部列出来。

```
db.user.find({},{realName:1})                 # 将所有行的realName和_id显示出来（_id是默认显示出来的）
db.user.find({},{realName:1, _id:0})          # 会将所有行的realName（手动设定了_id不要显示，1表示要显示，0表示不显示）

```

#### 7、数据分组

```
db.user.insert([
    {
        realName: '拍岸',
        age: 18
    },
    {
        realName: '惊涛',
        age: 18
    },
    {
        realName: '惊奇',
        age: 18
    },
    {
        realName: '公孙子',
        age: 30
    },
    {
        realName: '刘二备',
        age: 39
    },
    {
        realName: '孙小权',
        age: 39
    },
    {
        realName: '吃瓜群众',
        age: 9
    }
])
db.user.group({
    key: {age: true},
    initial: {person: []},
    $reduce: (cur, prev) => {
        prev.person.push(cur.realName)
    },
    finalize: (out) => {
        out.count = out.person.length;
    },
    condition: {
        age: {$gte: 18}
    }
})
```

这样，就能将数据按年龄分组，并且统计出每个分组的成员个数（count），而且只取年龄大于等于18岁的。结果是：

```
[
        {
                "age" : 18,
                "person" : [
                        "拍岸",
                        "惊涛",
                        "惊奇"
                ],
                "count" : 3
        },
        {
                "age" : 30,
                "person" : [
                        "公孙子"
                ],
                "count" : 1
        },
        {
                "age" : 39,
                "person" : [
                        "刘二备",
                        "孙小权"
                ],
                "count" : 2
        }
]

```

### 四、注意事项

连接mongodb的网站没有关，直接关闭了mongodb的cmd窗口。再次打开mongodb时，会出现失败。

解决办法：网上说是删除 *.lock文件，再进行 --repair，最后再打开mongodb就可以了（我没有删除 *.lock，也可以）

参考： http://dochub.mongodb.org/core/repair for recovery instructions.

错误信息如下:

```
$ ./mongod.exe --dbpath="d:\mongodb\data\db"
2017-07-16T15:11:51.852+0800 I CONTROL  [initandlisten] MongoDB starting : pid=3                       2064 port=27017 dbpath=d:\mongodb\data\db 64-bit host=LAPTOP-AH696RIM
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] targetMinOS: Windows 7/W                       indows Server 2008 R2
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] db version v3.4.4
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] git version: 88839051587                       4a9debd1b6c5d36559ca86b44babd
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] OpenSSL version: OpenSSL                        1.0.1u-fips  22 Sep 2016
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] allocator: tcmalloc
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] modules: none
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] build environment:
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten]     distmod: 2008plus-ss                       l
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten]     distarch: x86_64
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten]     target_arch: x86_64
2017-07-16T15:11:51.853+0800 I CONTROL  [initandlisten] options: { storage: { db                       Path: "d:\mongodb\data\db" } }
2017-07-16T15:11:51.855+0800 W -        [initandlisten] Detected unclean shutdow                       n - d:\mongodb\data\db\mongod.lock is not empty.
2017-07-16T15:11:51.857+0800 I -        [initandlisten] Detected data files in d                       :\mongodb\data\db created by the 'mmapv1' storage engine, so setting the active                        storage engine to 'mmapv1'.
2017-07-16T15:11:51.866+0800 I STORAGE  [initandlisten] **************
old lock file: d:\mongodb\data\db\mongod.lock.  probably means unclean shutdown,
but there are no journal files to recover.
this is likely human error or filesystem corruption.
please make sure that your journal directory is mounted.
found 5 dbs.
see: http://dochub.mongodb.org/core/repair for more information
*************
2017-07-16T15:11:51.869+0800 I STORAGE  [initandlisten] exception in initAndList                       en: 12596 old lock file, terminating
2017-07-16T15:11:51.869+0800 I NETWORK  [initandlisten] shutdown: going to close                        listening sockets...
2017-07-16T15:11:51.869+0800 I NETWORK  [initandlisten] shutdown: going to flush                        diaglog...
2017-07-16T15:11:51.869+0800 I CONTROL  [initandlisten] now exiting
2017-07-16T15:11:51.869+0800 I CONTROL  [initandlisten] shutting down with code:                       100
```

解决办法：

```
cd d:/mongodb/bin
./mongod.exe --dbpath "d:\mongodb\data\db" --repair
```

### 五、在Linux远程服务器上安装配置ＭongoDB

#### 1、在Mac终端上登陆到远程服务器

Mac终端上登陆到远程服务器：

```
ssh root@123.45.2.123
# 其中@之前是用户名，@之后是服务器的IP地址，然后会要求你输入密码
cd / # 进入根目录
ls -la # 查看所有的内容及相关信息
```

Mac上可以通过command + t 新开终端窗口。

#### 2、把Mac系统本机的文件上传到远程服务器

Mac上怎么把文件传到远程服务器呢？一种是通过FTP，如FileZilla.app这样的工具。另一种是通过`scp`命令。

在本机的终端上：

```
scp 待上传的文件的路径 服务器登陆用户名@服务器IP地址:所要传至的服务器上的目录
# 例如 scp /soft/mongodb-x86_64-ubuntu1404-3.4.4.tgz root@123.45.2.123:/
# 然后会要求输入密码
```

#### 3、解压和安装上传的文件，编写mongodb配置文件

在已经登陆远程服务器的终端上：

```
cd /   # 切换到刚刚上传了文件的目录
ls -la  # 查看是否能找到刚上传的文件
tar -zxvf mongodb-x86_64-ubuntu1404-3.4.4.tgz # 解压
mkdir mongodb
cd mongodb-x86_64-ubuntu1404-3.4.4
ls -la
cd ..
mv mongodb-x86_64-ubuntu1404-3.4.4 mongodb # 把解压所得的文件夹整个移入mongodb中
cd mongodb
ls -la
mkdir data
mkdit logs
cd logs
touch mongo.log
cd ..
mkdir etc
cd etc
vi mongo.conf
```

然后编辑mongo.conf内容为:

```
dbpath=/mongodb/data # 数据库位置
logpath=/mongodb/logs/mongo.log  # 日志文件
logappend=true  # 日志追加级别：自动追加，而不是覆盖
journal=true # 默认就是true
quiet=true # 调试的时候需要设置为false, 会过滤一些日志，正常情况设置为true
port=27017 # 端口
```

保存后继续：

```
cd ..
cd mongodb-x86_64-ubuntu1404-3.4.4/bin
mongod -f /mongodb/etc/mongo.conf  # mongod -f 表示指定配置文件 
```

然后，我们通过MongoHub.app（一个Mac平台上的MongoDB终端软件，类似windows上的MongoVue）。连接到服务器上的MongoDB试试，看能不能连接成功。连接成功则说明配置是没有问题的。

#### 4、建立软链接

因为现在我们在控制台上执行`mongo`实际上是找不到命令的，所以我们需要建立一个软链接。

```
cd /
ln -s /mongodb/-linux-x86_64-ubuntu1404-3.4.4/bin/mongo /usr/local/bin/mongo
```

另外，给`mongod`也建一个软链接：

```
ln -s /mongodb/-linux-x86_64-ubuntu1404-3.4.4/bin/mongod /usr/local/bin/mongod
```

#### 5、体验使用效果

然后，我们再新开一个终端窗口：

```
ssh root@123.45.2.123
mongod -f /mongodb/etc/mongo.conf
```

这就登陆到了服务器，启动了mongodb服务。`mongd -f -f`是用来指定配置文件的。（在windows平台上，对应的是`mongod --config`）

接下来切回另一个终端窗口，执行：

```
mongo
show dbs
use demo
db.goods.insert({id: 1000, "name": "paian"})
```




