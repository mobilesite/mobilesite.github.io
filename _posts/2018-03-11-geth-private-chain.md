---
layout:     post
title:      "通过Geth搭建多节点私有链"
subtitle:   ""
date:       2018-3-11 23:09:30
author:     "Paian"
catalog: true
tags:
    - 区块链
---

[上一篇](http://mobilesite.github.io/2018/03/03/blockchain-practice-1/)中，介绍了一些区块链前端开发必知必会的基本概念以及区块链前端开发与传统业务前端开发的区别。这篇开始，我们将进入实战环节。跟做任何开发一样，区块链前端开发，首先也要搭建区块链的开发环境。下面将以Windows系统为例进行讲解。

### 一、Go和Geth的安装

#### 1、安装Go

打开链接[https://golang.org/dl/](https://golang.org/dl/)下载go1.10.windows-amd64.msi，安装到C:\Go目录下，并将C:\Go\bin添加到系统环境变量Path中。

如果你之前装过go的话，现在再安装则可能会看到询问是否卸载旧版本的提示。只需要选择“Yes, Uninstall”继续安装即可。

打开系统控制台，在其中输入命令

```
go version
```

然后回车执行，如果返回如下信息，说明Go已经安装成功：

    go version go1.10 windows/amd64

#### 2、安装Geth

Geth是官方提供的以太坊协议的Go语言实现，是一个以太坊的客户端，一个命令行工具，通过它可以进行一系列以太坊的操作。

首先从[https://geth.ethereum.org/downloads/](https://geth.ethereum.org/downloads)下载Geth 1.8.2 for Windows版本。如果你下载过程中遇到反复终端连接，无法下载成功的情况，可以尝试把下载地址[https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.8.2-b8b9f7f4.exe](https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.8.2-b8b9f7f4.exe)复制到迅雷中下载。

然后，将Geth安装到C:\Program Files\Geth目录下，并将C:\Program Files\Geth 添加到系统环境变量path中。

然后到控制台中执行命令

```
geth version
```

看到如下提示，则表示geth安装成功：

    Geth
    Version: 1.8.2-stable
    Git Commit: b8b9f7f4476a30a0aaf6077daade6ae77f969960
    Architecture: amd64
    Protocol Versions: [63 62]
    Network Id: 1
    Go Version: go1.9.2
    Operating System: windows
    GOPATH=
    GOROOT=C:\Go\

### 二、同步以太坊主网络上的数据到本机

上面安装好了Geth，怎么使用呢？

#### 1、同步以太坊主网络上的全节点

一个常见的情况是，用户需要和以太坊网络进行简单的交互，比如，创建账号、转账、部署智能合约以及与智能合约进行交互等。这时候，用户并不关心以太坊网络上若干年的历史交易数据，所以只需要让本地节点的状态快速同步到以太坊网络的当前状态，而忽略掉历史数据的细节。针对这种情况，你只需要在控制台中执行如下命令：

```
geth console
```

这个命令将以快速同步模式（fast sync mode）启动Geth，并启动了Geth中内置的JavaScript控制台。在这个内置的控制台上，你可以执行[web3.js库中所有API](http://web3js.readthedocs.io/en/1.0/index.html) 以及 [Geth自身的管理API](https://github.com/ethereum/go-ethereum/wiki/Management-APIs)。

执行这个命令后，等待片刻，当你看到如下这样的提示：

    INFO [03-11|11:14:29] Block synchronisation started
    INFO [03-11|11:15:01] Imported new block headers               count=0 elapsed=3.976ms number=240  hash=37f92c…39e00c ignored=192
    INFO [03-11|11:15:01] Imported new block receipts              count=0 elapsed=0s      number=54   hash=8387c7…c0d90e size=0.00B ignored=6

则表明已经在进行同步了。

默认情况下，在笔者的Windows 10系统中，会同步到C:\Users\【我的用户名】\AppData\Roaming\Ethereum\geth\chaindata这个目录下。如果你看不到AppData这个文件夹，请确认下你有没有勾选中下图中所示的“隐藏的项目复选框”。

![](/img/in-post/private-chain-1.jpg)

怎么退出Geth JavaScript Console呢？在控制台中输入exit并按回车即可。

因为同步的以太坊的数据比较占空间，所以我们更改保存以太坊网络同步数据的位置，改成存在d:\ethereum目录下：

```
geth --datadir d:\ethereum console
```

其中，--datadir配置的地址指明了用来保存区块链数据库与keystore的地址，即d:\ethereum。

同步的过程中，会不断出现下图这样的区块同步提示：

![](/img/in-post/private-chain-2.jpg)

表示刚刚将以太坊网络上的哪个区块同步到了本地。其中，number是区块号，而hash就是该区块的hash值。我们拿着这个区块号到以太坊区块浏览器Etherscan上去浏览一下该区块的信息，比如，这里的区块号是30344，那么在[https://etherscan.io/block/30344](https://etherscan.io/block/30344)这个页面中就可以看到该区块的详细信息，如下图。

![](/img/in-post/private-chain-3.jpg)

当你同步到的区块与[https://etherscan.io/blocks](https://etherscan.io/blocks)中显示的最新区块的height一样时，就说明本地节点已经同步到最新状态了。

#### 2、同步以太坊测试网络上的数据到本机

因为在以太坊主网络进行部署智能合约、发送交易等操作是需要花费真实的以太币的，所以对于开发者来说，更多的调试和测试工作，不能在主网络上进行（谁的真金白银花得不心疼？），而应该在测试网络上。测试网络上用的是测试币（play-Ether），而不是主网络上真正需要真金白银换来的以太币。所以，作为开发者，你通常需要同步测试网络上的全节点。通过如下命令来完成：

```
geth --testnet console
```

其它操作与同步以太坊主网络上的全节点一样，不再赘述。

### 三、搭建私有链网络

#### 1、搭建单节点私有链网络

有时候，我们不想用以太坊主网和测试网，而希望自己启动一个私有链节点，怎么操作呢？

##### （1）初始化创世块

在d:\privatechain目录下新建一个文件genesis.json来放置创世块（第0号区块）的配置信息。

```
{
    "config": {
        "chainId": 0,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "alloc"      : {},
    "coinbase"   : "0x0000000000000000000000000000000000000000",
    "difficulty" : "0x20000",
    "extraData"  : "",
    "gasLimit"   : "0x2fefd8",
    "nonce"      : "0x0000000000000042",
    "mixhash"    : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "parentHash" : "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp"  : "0x00"
}
```

这些所配置的字段都代表什么含义呢？下面逐一为大家解释：

chainId             用于标记一条以太链的ID，它必须和你的代码中交易时的chainId一致。私链的用1337。更多可以参考这里：https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md

homesteadBlock      值为0表示，它使用ethereum homestead release。Homestead是第二个重要的以太坊版本。

eip155Block         值0表示，该块支持EIP（ethereum改进建议）155。EIP描述了以太坊平台的标准，包括核心协议规范，客户端API和合同标准。

eip158Block         值0表示，该块支持EIP（ethereum改进建议）158。

alloc               用来预置账号以及账上的币的数量，因为私有链开启挖矿后很简单地就能获得测试所需要的币，所以不需要预置有币的账号

coinbase            默认的矿工账号，挖矿成功时会默认把所得的挖矿奖励存入这个账号

difficulty          设置挖矿难度，私有链在测试时可将该值设置小点，使得区块容易被挖出来，测试效率更高

extraData           附加信息，随便填

gasLimit            GAS 的消耗量限制，用来限制区块能包含的交易信息总和

nonce               一个 64 位随机数，用于挖矿

mixhash             与 nonce 配合用于挖矿

parentHash          上一个区块的 hash 值，创世块的该值为 0

timestamp           设置创世块的时间戳

接下来，我们就用上面这个配置文件来初始化创世块。执行命令：

```
geth --datadir d:\privatechain init d:\privatechain\genesis.json
```

初始化私有链配置虽然简单，但是很容易遇到各种问题。

下面常遇到的几个错误：

Fatal: invalid genesis file: missing 0x prefix for hex data：这个错误信息意思很明白，就是你的json文件中，对于16进制数据，需要加上0x前缀

Fatal: invalid genesis file: hex string has odd length: 从Geth 1.6版本开始，设置的十六进制数值，不能是奇数位， 比如不能是0x0，而应该是0x00。

Fatal: failed to write genesis block: genesis has no chain configuration ：这个错误信息，就是说，你的配置文件中，缺少config部分。

Error: invalid sender: 这个错误虽然不会导致私有链初始化时出现失败的情况，但是会在以后的转账（web3.eth.sendTransaction），或者部署智能合约的时候产生。解决方法就是chainId 不能设置为0。 如果你完全按照Geth官方文档上给出的配置文件进行配置，就会产生这个错误。

此外，要注意genesis.json的路径需要写绝对路径（如，d:\privatechain\genesis.json）才能找到配置文件。

##### （2）启动私有链网络

如果想启动提供HTTP-RPC服务的私有链，则执行命令行：

```
geth  --datadir "d:\privatechain" --networkid 23 --rpc  --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "db,eth,net,web3" console
```

如果想启动提供WebSockets-RPC服务的私有链，则运行：

```
geth --datadir "d:\privatechain" --networkid 23 --ws --wsaddr "0.0.0.0" --wsport "8545" --wsorigins "*" --wsapi "db,eth,net,web3" console
```

geth命令行有很多选项可用，其含义分别如下：

--rpc              开启HTTP-RPC服务

--rpcaddr          指定HTTP-RPC服务的地址，默认是localhost 

--port             网络监听的端口，默认为8545 

--rpccorsdomain    逗号分隔的域列表，指定HTTP-RPC服务允许从哪些域过来的跨域请求，*接受表示所有的域

--rpcapi           设定开放给HTTP-RPC的接口，默认只开放eth、net、web3 

-ws                启用WebSockets-RPC服务

--wsaddr           指定WebSockets-RPC服务地址，默认值localhost 

--wsport           指定WebSockets-RPC服务端口，默认值8546 

--wsapi            通过WebSockets-RPC提供的API，默认eth, net, web3 

--wsorigins        指定WebSockets-RPC服务允许从哪些域过来的跨域请求，*表示接受表示所有的域

--datadir          设置当前区块链网络数据存放的位置

--identity         区块链的标识，用于标识目前网络的名字

--networkid        设置当前区块链的网络 ID，用于区分不同的网络，默认是1

--nodiscover       禁止网络中的对等节点发现你的节点。如果打算在本地网络中与其他人一起使用该私有区块链，就请不要使用此参数。
--dev 
console            开启一个可交互的JavaScript Console

--ipcdisable       禁用IPC-RPC服务

--ipcapi           通过IPC-RPC接口提供的API，默认值admin, debug, eth, miner, net, personal, shh, txpool, web3

--ipcpath          指定IPC路径

启动完之后，就可以通过admin.nodeInfo.protocols.eth来获取到刚启动的节点的一些信息（如下），比较上文初始化的配置，相关内容是一致的。 

```
{
    config: {
        chainId: 1337,
        eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        eip155Block: 0,
        eip158Block: 0,
        homesteadBlock: 0
    },
    difficulty: 131072,
    genesis: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
    head: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
    network: 23
}
```

#### 2、简化单节点私有链网络启动命令

每次都敲这么长的一段启动命令是很麻烦的事情，怎么能够更简便一点呢？

我们可以将这串命令写入一个bash文件中。在d:\下面新建一个starthttp.sh，内容为：

```
#!/bin/bash
geth  --datadir "d:\privatechain" --networkid 23 --rpc  --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "db,eth,net,web3" console
```

在同一目录下再建一个startws.sh文件，内容为：

```
#!/bin/bash
geth --datadir "d:\privatechain" --networkid 23 --ws --wsaddr "0.0.0.0" --wsport "8545" --wsorigins "*" --wsapi "db,eth,net,web3" console
```

接下来需要安装Git Bash（前往[https://gitforwindows.org/](https://gitforwindows.org/) 下载后安装即可），因为windows自带的控制台是不支持bash文件的执行的。装好Git Bash，我们就可以通过`bash starthttp.sh`和`bash startws.sh`命令来分别启动提供HTTP-RPC服务的私有链和提供WebSockets-RPC服务的私有链，达成简化启动命令的目的。

#### 3、添加节点，组成多节点网络

至此，一个单节点的私有链网络已经启动起来。可以通过admin.nodeInfo查看当前网络节点信息如下：

```
{
  enode: "enode://4eaf1ef8fd69bb3669741df19a0bfe58b827da56446b7513901631b95b395797277909be4dbbadc25c343fc4c1ca538319311bcae6d17bd7006bbe8c655fdcdf@[::]:30303",
  id: "4eaf1ef8fd69bb3669741df19a0bfe58b827da56446b7513901631b95b395797277909be4dbbadc25c343fc4c1ca538319311bcae6d17bd7006bbe8c655fdcdf",
  ip: "::",
  listenAddr: "[::]:30303",
  name: "Geth/v1.8.2-stable-b8b9f7f4/windows-amd64/go1.9.2",
  ports: {
    discovery: 30303,
    listener: 30303
  },
  protocols: {
    eth: {
      config: {
        chainId: 1337,
        eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        eip155Block: 0,
        eip158Block: 0,
        homesteadBlock: 0
      },
      difficulty: 131072,
      genesis: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
      head: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
      network: 23
    }
  }
}
```

但是，目前只是单节点的网络，如何添加节点，让它不再是单节点网络呢？

通过如下命令，用上文中创建的同一份创世块配置文件初始化另一个目录（d:/privatechain2）下的创世块。

```
geth --datadir d:/privatechain2 init d:/privatechain/genesis.json
```

我们将d:/starthttp.sh文件拷贝一份，命名为starthttp2.sh，同样放在d:/下。将starthttp2.sh的内容修改为：

```
#!/bin/bash
geth  --datadir "d:\privatechain2" --port 30304 --ipcdisable --networkid 23 --rpc  --rpcaddr "localhost" --rpcport "8546" --rpccorsdomain "*" --rpcapi "db,eth,net,web3" console
```

即修改了`--datadir`和`--rpcport`两个选项的值，添加了`--port 30304 --ipcdisable`，以免与现有节点相冲突。然后另开一个Git Bash控制台窗口，我们通过`bash starthttp2.sh`命令启动了另一个节点。 再用`admin.nodeInfo`命令查看下新节点的信息，发现与原有节点`enode`是不一样的，证明两个节点确实不同（不过，需要确保两个节点的`protocols`信息是一致的，因为它们必须是基于同一份创世区块配置产生出来的，才能连接成功，具体需要满足哪些条件才能连接成功，可以参考[https://github.com/ethereum/go-ethereum/wiki/Setting-up-private-network-or-local-cluster](https://github.com/ethereum/go-ethereum/wiki/Setting-up-private-network-or-local-cluster)）。

```
{
  enode: "enode://d5e8b09b13ddff0b88e13259e8d764e8ec982e76592f48fc1db11c4829f5d9cabdaaeecf13b5812e216506536b1f8a53068470975650beb86ab46c27718c7cdd@[::]:30304",
  id: "d5e8b09b13ddff0b88e13259e8d764e8ec982e76592f48fc1db11c4829f5d9cabdaaeecf13b5812e216506536b1f8a53068470975650beb86ab46c27718c7cdd",
  ip: "::",
  listenAddr: "[::]:30304",
  name: "Geth/v1.8.2-stable-b8b9f7f4/windows-amd64/go1.9.2",
  ports: {
    discovery: 30304,
    listener: 30304
  },
  protocols: {
    eth: {
      config: {
        chainId: 1337,
        eip150Hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
        eip155Block: 0,
        eip158Block: 0,
        homesteadBlock: 0
      },
      difficulty: 131072,
      genesis: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
      head: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
      network: 23
    }
  }
}
```

接下来我们让两个节点连接起来。

在第二个控制台中用`admin.peers`查看一下，发现返回是空数组。 然后执行：

```
admin.addPeer("enode://4eaf1ef8fd69bb3669741df19a0bfe58b827da56446b7513901631b95b395797277909be4dbbadc25c343fc4c1ca538319311bcae6d17bd7006bbe8c655fdcdf@[::]:30303")
```

其中括号内的是第一个节点的节点信息中的`enode`的值。

然后再通过`amin.peers`查看，可以看到如下内容，表示添加成功：

    [{
        caps: ["eth/63"],
        id: "4eaf1ef8fd69bb3669741df19a0bfe58b827da56446b7513901631b95b395797277909be4dbbadc25c343fc4c1ca538319311bcae6d17bd7006bbe8c655fdcdf",
        name: "Geth/v1.8.2-stable-b8b9f7f4/windows-amd64/go1.9.2",
        network: {
        inbound: false,
        localAddress: "127.0.0.1:53792",
        remoteAddress: "127.0.0.1:30303",
        static: true,
        trusted: false
        },
        protocols: {
        eth: {
            difficulty: 131072,
            head: "0x5e1fc79cb4ffa4739177b5408045cd5d51c6cf766133f23f7cd72ee1f8d790e0",
            version: 63
        }
        }
    }]


### 四、Geth中那些常用操作命令

下面进行geth的一些常用操作，包括创建账户、查看账户余额、解锁账户、挖矿、发送转账交易等。

`bash d:/starthttp.sh`           启动私有链，并进入geth命令行模式

`eth.accounts`                   查看现有账户，会返回一个数组，数组的每一项是现有的账号地址。在未创建账户的情况下，初始状态默认应该是返回空数组。

`personal.newAccount("123")`     创建一个账户，括号里面的参数是所创建的账户的密码

`personal.newAccount("123")`     再创建一个账户，括号里面的参数是所创建的账户的密码

`eth.accounts`                   再次查看账户，将会看到返回的数组中有两个账户

`eth.accounts[0]`                获取第0个账户的地址

`personal.unlockAccount(eth.accounts[0])`    解锁第0个账户，会提示输入密码以进行解锁，一个账户只有解锁后，才能转出其中的币

`eth.getBalance(eth.accounts[0])`            查看第0个账户的余额，初始应该是0

`miner.start()`                              开始挖矿

等挖矿一段时间后，挖出来新区块后，再接着继续下面的步骤。

`miner.stop()`                               结束挖矿

`eth.getBalance(eth.accounts[0])`            再次查看第0个账户的余额，发现已经有币了，不再是0了

`eth.getBalance(eth.accounts[1])`            再次查看第1个账户的余额，应该是0

`amount = web3.toWei(1,'ether')`             把0.0000001以太币转成以wei为单位，转换结果赋给变量amount

`eth.sendTransaction({from:eth.accounts[0],to:eth.accounts[1],value:amount})`    
                                             从第0个账户往第1个账户里转1以太币

`miner.start()`                              再挖矿，使得上面发起的转账被确认到区块链上

`miner.stop()`                               停止挖矿

`eth.getBalance(eth.accounts[1])`            再次查看第1个账户的余额，变成1000000000000000000了（单位是wei），恰好就等于1以太币，说明转账已经成功了。

最后，你还可以再走一遍转账的流程，只是将挖矿确认的环节应换成另外那个节点来挖矿，看转账是否能够成功确认，以验证多节点网络配置是否成功。值得注意的是，在另外那个节点挖矿之前，应该给那个节点创建一个账户，才能开始挖矿，否则会报错

    Cannot start mining without etherbase

