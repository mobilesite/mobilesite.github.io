---
layout:     post
title:      "MongoDB的使用详解"
subtitle:   ""
date:       2017-05-06 12:15:19
author:     "Paian"
catalog: true
tags:
    - MongoDB
    - 服务端开发
    - node.js
---

## MongoDB的使用详解

本文以windows 10中v3.3.4版MongoDB的安装与使用为例。

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

String: 这是最常用的数据类型。在MongoDB中的String类型必须是有效的UTF-8。

Integer: 这种类型是用来存储一个数值。整数可以是32位或64位，这取决于您的服务器。

Boolean: 此类型用于存储一个布尔值 (true/ false) 。

Double: 这种类型是用来存储浮点值。

Min/Max keys: 这种类型被用来对BSON（二进制的JSON）元素的最低和最高值比较。

Arrays: 使用此类型的数组或列表或多个值存储到一个键。

Timestamp: 时间戳。这可以方便记录文件修改或添加的具体时间。

Object: 用于内嵌文档。

Null: 这种类型是用来存储一个Null值。

Symbol: 此数据类型用与String大体相同，但它通常是保留给特定符号类型的语言使用。

Date: 此数据类型用于存储当前日期或时间的UNIX时间格式。可以指定自己的日期和时间，日期和年，月，日到创建对象。

Object ID: 此数据类型用于存储文档的ID。

Binary data: 此数据类型用于存储二进制数据。

Code: 此数据类型用于存储到文档中的JavaScript代码。

Regular expression: 此数据类型用于存储正则表达式

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


