---
layout:     post
title:      "怎样开发一个区块链浏览器"
subtitle:   ""
date:       2018-05-05 23:21:12
author:     "Paian"
catalog:    true
tags:
    - 区块链
---

### 一、什么是区块链浏览器

区块链浏览器，顾名思义，就是一个可以浏览区块链上的信息的系统。比如，[https://etherscan.io](https://etherscan.io)就是一个典型的代表。在其中，可以查询到区块信息、交易信息、账户信息，等等。它与我们常用的Chrome、Safari等网页浏览器的浏览器并不是一个意思。简单来讲，你可以把区块链浏览器理解为一系列可以运行在网页浏览器或者Native APP里的webview中的一系列网页。

### 二、怎么开发一个区块链浏览器

其实，开发这样的区块链浏览器并不难，但可能不少做去区块链的团队都有这样的需求，所以单独写一篇讲一下。为什么大家说可能不少团队都会有这样的需求呢？因为区块链有一个特点就是公开透明，那如果你链上的东西用户查看不了，如何体现公开透明呢？所以，其实区块链浏览器主要完成了让链上信息公开的目的，所有人都可以去查询。

下面讲的主要是基于以太坊的区块链浏览器。实现上思路上主要有这么几点：

（1）借助web3.js API访问链上的信息

（2）对web3.js API获取到信息进行加工处理，衍生出一些web3.js API无法直接查询到的字段

（3）利用中心化接口提供一些非链上的信息

（4）利用轮询等方式反复地调用web3.js API，达成不断刷新最新区块和交易等数据的目的

### 三、用vue-cli 3.x来初始化项目

[上一篇](http://mobilesite.github.io/2018/03/18/start-react-blockchain-project/)中笔者介绍了怎么初始化一个react Dapp项目。这里，再改用最新的vue-cli 3.x版本来初始化一个vue.js Dapp项目，以满足不同技术喜好的人的需求。

```
npm i -g @vue-cli
vue create blockchainbrowser
npm i web3 -S
npm i less less-loader
```

这样，项目基本架子就已经初始化好了。

### 四、具体实现

接着，在项目根目录下新建一个starthttp.sh文件，用来放置启动本地以太坊节点服务的命令：

```
geth  --datadir "d:\privatechain" --networkid 23 --rpc  --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "db,eth,net,web3" console
```

这样，后面我们就可以通过`bash starthttp.sh`命令来启动节点服务了。

然后，我们修改HelloWorld组件为Home组件，并把其内容改为：

```
<template>
  <div>
    <h1 v-text="title"></h1>
    <h2 class="subtitle">Blocks:</h2>
    <div class="table blocks">
      <div class="table-header">
        <div class="table-row">
          <div class="table-column">Height</div>
          <div class="table-column">Age</div>
          <div class="table-column">Txn</div>
          <div class="table-column">Miner</div>
          <div class="table-column">GasUsed</div>
          <div class="table-column">GasLimit</div>
          <div class="table-column">hash</div>
          <div class="table-column">mixHash</div>
          <div class="table-column">nonce</div>
          <div class="table-column">parentHash</div>
          <div class="table-column">receiptsRoot</div>
          <div class="table-column">size</div>
          <!-- <div class="table-column">Uncles</div>
          <div class="table-column">difficulty</div>
          <div class="table-column">extraData</div>
          <div class="table-column">logsBloom</div> 
          <div class="table-column">stateRoot</div>
          <div class="table-column">totalDifficulty</div>
          <div class="table-column">transactionsRoot</div> -->
        </div>
      </div>
      <div v-if="loading || blocks.length" class="table-body" :class="`${loading ? 'table-body-loading' : ''}`">
        <div class="table-row" v-for="(block,i) in blocks" :key="`block-${i}`">
          <div class="table-column" v-text="block.number"></div>
          <div class="table-column" v-text="block.timestamp"></div>
          <div class="table-column" v-text="block.txn"></div>
          <div class="table-column" v-text="block.miner"></div>
          <div class="table-column" v-text="block.gasUsed"></div>
          <div class="table-column" v-text="block.gasLimit"></div>
          <div class="table-column" v-text="block.hash"></div>
          <div class="table-column" v-text="block.mixHash"></div>
          <div class="table-column" v-text="block.nonce"></div>
          <div class="table-column" v-text="block.parentHash"></div>
          <div class="table-column" v-text="block.receiptsRoot"></div>
          <div class="table-column" v-text="block.size"></div>
          <!-- <div class="table-column" v-text="block.sha3Uncles"></div>
          <div class="table-column" v-text="block.difficulty"></div>
          <div class="table-column" v-text="block.extraData"></div>
          <div class="table-column" v-text="block.logsBloom"></div>
          <div class="table-column" v-text="block.stateRoot"></div>
          <div class="table-column" v-text="block.totalDifficulty"></div>
          <div class="table-column" v-text="block.transactionsRoot"></div> -->
        </div>
      </div>
      <div v-else class="table-body-nodata">No data</div>
    </div>

    <br>
    <h2 class="subtitle">Transactions:</h2>
    <div class="table transactions">
      <div class="table-header">
        <div class="table-row">
            <div class="table-column">TxHash</div>
            <div class="table-column">Block Hash</div>
            <div class="table-column">Block Height</div>
            <div class="table-column">TimeStamp</div>
            <div class="table-column">From</div>
            <div class="table-column">To</div>
            <div class="table-column">Value</div>
            <div class="table-column">Gas</div>
            <div class="table-column">GasPrice</div>
            <div class="table-column">Nonce</div>
            <div class="table-column">transactionIndex</div>
            <!-- <div class="table-column">input</div>
            <div class="table-column">r</div>
            <div class="table-column">s</div>
            <div class="table-column">v</div> -->
        </div>
      </div>
      <div v-if="loading || txs.length" class="table-body" :class="`${loading ? 'table-body-loading' : ''}`" >
        <div class="table-row" v-for="(tx,i) in txs" :key="`tx-${i}`">
          <div class="table-column" v-text="tx.hash"></div>
          <div class="table-column" v-text="tx.blockHash"></div>
          <div class="table-column" v-text="tx.blockNumber"></div>
          <div class="table-column" v-text="tx.timestamp"></div>
          <div class="table-column" v-text="tx.from"></div>
          <div class="table-column" v-text="tx.to"></div>
          <div class="table-column" v-text="tx.value"></div>
          <div class="table-column" v-text="tx.gas"></div>
          <div class="table-column" v-text="tx.gasPrice"></div>
          <div class="table-column" v-text="tx.nonce"></div>
          <div class="table-column" v-text="tx.transactionIndex"></div>
          <!-- <div class="table-column" v-text="tx.input"></div>
          <div class="table-column" v-text="tx.r"></div>
          <div class="table-column" v-text="tx.s"></div>
          <div class="table-column" v-text="tx.v"></div> -->
        </div>
      </div>
      <div v-else class="table-body-nodata">No data</div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3';

export default {
  data() {
    return {
      title: 'A Simple Blockchain Browser',
      blocks: [],
      txs: [],
      timmer: null,
      loading: true
    };
  },
  created() {
    if (typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      const ethNodeUrl = new Web3.providers.HttpProvider('http://localhost:8545'); // TODO: remote URL
      window.web3 = new Web3(ethNodeUrl);
      console.log(window.web3);
    }

    this.refreshData();
    this.timmer = setInterval(() => {
      this.refreshData();
    }, 60000);
  },
  methods: {
    refreshData(){
      try {
        this.printBlocksAndTxs();
      } catch (err) {
        console.log(err);
      }
    },

    async getBlocksAndTxs() {
      const { eth } = window.web3;
      const blockNumber = await eth.getBlockNumber();
      const blocks = [];
      let txs = [];

      for (let i = 1; i <= 10; i++) {
        const block = await eth.getBlock(blockNumber-i);

        block.timestamp = this.$filters.difference(block.timestamp);
        block.txn = block.transactions.length;

        blocks.push(block);
        txs = txs.concat(block.transactions);
      }

      return {
        blocks,
        txs
      };
    },

    async printBlocksAndTxs() {
      const { eth } = window.web3;
      const result = await this.getBlocksAndTxs();

      const txs = result.txs;
      const handledTxs = [];
      
      let len = result.txs.length;
      if (len) {
        for (let i = 1; i < 10; i++) {
          const handledTx = await eth.getTransaction(txs[len-i]);
          
          Object.keys(result.blocks).map(key => {
            if(result.blocks[key].number === handledTx.blockNumber){
              handledTx.timestamp = result.blocks[key].timestamp;
            }
          })
          handledTxs.push(handledTx);
        }
      }

      this.loading = false;
      this.blocks = result.blocks;
      this.txs = handledTxs;
    }
  },
  beforeDestroy(){
    this.timmer && (this.timmer = null);
  }
};
</script>

<style lang="less" scoped>
.subtitle {
  text-align: left;
}

@table-border: 1px solid #ddd;

.table {
  border-top: @table-border;
}
.table-header {
  .table-row {
    background-color: #f9f9f9;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
.table-body-loading{
  background: url("../assets/loading.gif") center center no-repeat;
  background-size: 20px 20px;
  height: 60px;
  overflow: hidden;
}
.table-body-nodata{
  text-align: center;
  padding: 30px;
}
.table-row {
  display: flex;
  border-bottom: @table-border;
  padding: 12px;
  &:hover {
    background-color: #f2f2f2;
  }
}
.table-column {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
```

其中，我们设定了一个定时器，每隔一分钟去取一遍数据，并更新到页面上，为了演示方便，我们只取了最新的10条区块数据和最新的10条交易数据。实际写浏览器的时候，你应该分页显示，将区块和交易数据逐页显示出来。具体的实现细节请大家看上面的代码，都比较简单。

值得注意的时，如果你安装了MetaMask插件的话，如果其中的以太坊网络环境设置不对的话，访问的节点可能并不是你本地通过`bash starthttp.sh`启动的那个节点服务。这一点容易被忽视。

最后看一下效果：

![](/img/in-post/blockchain-browser-01.png)

图1 用的本地节点: http://localhost:8545

![](/img/in-post/blockchain-browser-02.png)

图2 用的MetaMask中的Ropsten Test Network节点

完整代码见：[https://github.com/mobilesite/blockchainbrowser](https://github.com/mobilesite/blockchainbrowser)

恭喜你离前端大牛又近了一步，加油！



