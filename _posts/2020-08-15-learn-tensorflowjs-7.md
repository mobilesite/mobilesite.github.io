---
layout:     post
title:      "前端机器学习入门笔记7：欠拟合和过拟合"
subtitle:   ""
date:       2020-08-15 12:18:11
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

### 一、欠拟合和过拟合简介

#### 1、什么是欠拟合？

数据很复杂，但是模型很简单，这就是欠拟合。下面我们通过[http://playground.tensorflow.org/](http://playground.tensorflow.org/)来直观感受下欠拟合。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1de4a8d542e84255bba8360b4109f58e~tplv-k3u1fbpfcp-zoom-1.image)

如上图所示，我们选择了一个非线性分布的数据，然后只用一层输出层，并且选择激活函数为线性，可以看到，训练损失一直在0.5以上，损失非常高，这就是欠拟合。欠拟合的表现就是训练损失降不下去。

#### 2、什么是过拟合？

过拟合就是我们的模型太过强大了，拟合过头了，导致遇到新的数据的时候，反而表现得不是很好。比如下面这张图，红色的点和蓝色的点分别代表两类数据，这是一个二分类数据集，黑色的线代表一个比较正常的模型，而绿色的线就代表一个过拟合的模型。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18e44cffcab54c5880806b05be847125~tplv-k3u1fbpfcp-zoom-1.image)

如下图所示是过拟合的损失变化曲线。其中，红色的线代表验证集的损失，验证集的损失在越过某个点之后，变得越来越高了；蓝色的线代表训练集的损失，训练集的损失是越来越小的。导致这种情况的原因是，训练集数据太过简单，而模型却太过复杂。有可能是因为训练集的数据过少。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51540e60627344c69f8053b9aedf827c~tplv-k3u1fbpfcp-zoom-1.image)

下面我们一起去[http://playground.tensorflow.org/](http://playground.tensorflow.org/)中直观地感受下过拟合：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da12aad41af94670b4834ddf39ca9a13~tplv-k3u1fbpfcp-zoom-1.image)

如上图所示，我们选择了一个很简单的数据集，并且让训练集数据比较少，同时添加一些噪音，让训练集数据不能很好地代表绝大多数数据的情况。然后再搞一个非常复杂的模型去训练它。从图中右上角可以看到，训练集的损失越来越小，而验证集的损失在越过某个点之后反而越来越大。

操作步骤：

1）加载带有噪音的二分类数据集（训练集和验证集）；

2）使用不同的神经网络来演示欠拟合和过拟合；

3）过拟合应对法：早停法、权重衰减、丢弃法

### 二、加载带有噪音的二分类数据集

为什么要带点噪音呢？因为带点噪音的数据集更容易在训练时出现过拟合的情况，因为数据集里的数据不能很好地代表大多数。

首先我们使用预先准备好的脚本加载带有噪音的二分类数据集。其次，我们将数据集可视化。代码如下：

src\overfit\index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="index.js"></script>
</body>
</html>
```

src\overfit\index.js
```javascript
import * as tfvis from '@tensorflow/tfjs-vis';
import {getData} from './data';

window.onload = () => {
  const data = getData(200, 3);

  console.log(data);
  tfvis.render.scatterplot(
    { name: '训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0)
      ]
    }
  )
}
```

生成数据集的脚本：
src\overfit\data.js
```javascript
/**
 *
 * @param {*} numSamples 生成的样本的数量
 * @param {*} variance 方差，变异，不一样的地方。它是用来控制生成的数据的噪音的，variance调得越大，生成的数据的噪音就越大
 */
export function getData(numSamples, variance) {
  let points = [];

  function genGauss(cx, cy, label) {
    for (let i = 0; i < numSamples / 2; i++) {
      let x = normalRandom(cx, variance);
      let y = normalRandom(cy, variance);
      points.push({x, y, label});
    }
  }

  genGauss(2, 2, 1);
  genGauss(-2, -2, 0);
  return points;
}

/**
 * 生成一个正态分布，也叫高斯分布
 * @param {*} mean
 * @param {*} variance
 */
function normalRandom(mean = 0, variance = 1) {
  let v1, v2, s;
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while (s > 1);

  let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}
```

数据可视化之后的效果如下图所示：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b93371575ca4c03afd01de1a3a260ba~tplv-k3u1fbpfcp-zoom-1.image)

### 三、使用简单神经网络演示欠拟合

操作步骤：

第一步，加载非线性的XOR数据集。

第二步，使用一个神经元的简单的神经网络演示欠拟合。

为什么要加载非线性的XOR数据集呢？因为前面的学习笔记中，我们已经讲过，XOR数据集是一个复杂的问题，需要使用多层神经网络，配合激活函数才能拟合它。我们这里使用只有一个神经元的简单神经网络去拟合它，就会出现欠拟合的情况。

当然，并非只有使用简单模型去解决复杂问题的时候才会出现欠拟合。训练时间不够的时候（就是Epoch不够大），也会出现欠拟合。对于有些图片分类的问题，经常是下班的时候让它开始训练，第二天上班再来看结果。有的甚至需要训练好几天。

首先我们导入一个XOR数据集，因为之前已经在xor目录下写过这个数据集的生成脚本，所以这里我们直接导入就好了。即把src\overfit\index.js文件的第二行由 `import {getData} from './data';` 改成 `import {getData} from '../xor/data';`。并把src\overfit\index.js中getData的第二个参数去掉。

整个src\overfit\index.js的代码修改成如下：
```js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
// import {getData} from './data';
import {getData} from '../xor/data';

window.onload = async () => {
  // const data = getData(200, 3);
  const data = getData(200);

  console.log(data);
  tfvis.render.scatterplot(
    { name: '训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0)
      ]
    }
  );

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid',
    inputShape: [2]
  }));
  model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
  });

  const inputs = tf.tensor(data.map(p => [p.x, p.y]));
  const labels = tf.tensor(data.map(p => p.label));

  await model.fit(inputs, labels, {
    validationSplit: 0.2, // 从数据集里面分出20%的数据作为验证集
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss', 'val_loss'], // 要看到训练集和验证集上的损失
      { callbacks: ['onEpochEnd']}
    )
  });
}
```

训练的效果如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b5eb822504047988300ca07a18f59dd~tplv-k3u1fbpfcp-zoom-1.image)

可见，不管是训练集的损失还是验证集的损失，都一直降不下去，这就是欠拟合的表现。

**遇到欠拟合该怎么办呢？**

增加模型的复杂度（添加更多的层、添加更多的神经元去尝试）。当然，在现实的工作中，遇到欠拟合通常不是因为模型有问题（虽然也有），更多的情况是训练时间不够长，因为可能数据是海量的（如几百万的图片）。

### 四、使用复杂神经网络演示过拟合

步骤如下：

首先，加载带有噪音的二分类数据集。

然后，使用多层神经网络演示过拟合。

代码如下：

src\overfit\index2.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script src="index2.js"></script>
</body>
</html>
```

src\overfit\index2.js
```js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import {getData} from './data';

window.onload = async () => {
  const data = getData(200, 1);

  console.log(data);
  tfvis.render.scatterplot(
    { name: '训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0)
      ]
    }
  );

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 10,
    activation: 'tanh',
    inputShape: [2]
  }));
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));
  model.compile({
    loss: tf.losses.logLoss,
    optimizer: tf.train.adam(0.1)
  });

  const inputs = tf.tensor(data.map(p => [p.x, p.y]));
  const labels = tf.tensor(data.map(p => p.label));

  await model.fit(inputs, labels, {
    validationSplit: 0.2, // 从数据集里面分出20%的数据作为验证集
    epochs: 200,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练效果' },
      ['loss', 'val_loss'], // 要看到训练集和验证集上的损失
      { callbacks: ['onEpochEnd']}
    )
  });
}
```

然后通过`parcel ./src/**/index2.html`进行打包，打包完成后在浏览器中通过http://localhost:1234/index2.html访问到如下效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc68c2288cd84dca8af51ce6fca830f3~tplv-k3u1fbpfcp-zoom-1.image)

可以看到，训练集的损失越来越小，但是验证集的损失在越过某个点之后越来越大，这就是过拟合了。

### 五、过拟合应对方法

**过拟合的应对方法有：早停法、权重衰减、丢弃法。**

所谓早停法，就是在模型的训练集损失开始上升之前，把模型的训练任务给停止掉，这样可以一定程度地防止过拟合。

当然，也可以通过增加训练集的数据的数量来应对过拟合。但是，在现实工作中，增加训练集的数据的数量工作成本是非常高的。需要大量的人力物力。

**权重衰减法**就是把权重的复杂度也作为模型损失的一部分，我们都知道，训练模型就是降低它的损失，既然复杂度也变成损失的一部分了，那么过于复杂的权重也就在训练的过程中被衰减掉了，防止模型过度复杂。

TensorFlow.js提供了使用权重衰减法的API，即设置L2正则化。即在最复杂的隐藏层上加一个kernelRegularizer属性，即把：

```js
model.add(tf.layers.dense({
    units: 10,
    activation: 'tanh',
    inputShape: [2]
}));
```

改成：

```js
model.add(tf.layers.dense({
    units: 10,
    activation: 'tanh',
    inputShape: [2],
    kernelRegularizer: tf.regularizers.l2({ l2: 0.2 }) // l2: 1是将L2正则化率设置为1，它是一个超参数
}));
```

效果如下：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c326cf11df847198ac1a069c322054c~tplv-k3u1fbpfcp-zoom-1.image)

**丢弃法**则是在神经网络的隐藏层设置丢弃率，然后就会随机地丢弃（因为是随机丢弃的，所以就不会有偏爱）某些个神经元的权重，相当于把隐藏层的神经元个数变少了。

在TensorFlow.js中，可以通过在最复杂的隐藏层后面加一个dropout层：

```js
// 用丢弃法避免过拟合
model.add(tf.layers.dropout({
  rate: 0.9 // 丢弃率设置为0.9，意思是会随机丢弃90%的神经元
}));
```

效果如下图所示：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801cc9ed916744899e1c66cefc446d87~tplv-k3u1fbpfcp-zoom-1.image)


