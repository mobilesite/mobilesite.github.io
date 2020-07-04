---
layout:     post
title:      "前端机器学习入门笔记4：逻辑回归"
subtitle:   ""
date:       2020-07-04 20:18:17
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

### 一、什么是逻辑回归

与线性回归不同，逻辑回归解决的是分类问题。比如，下图中有很多的点：

![](https://user-gold-cdn.xitu.io/2020/7/4/17318eb194af6dad?w=675&h=552&f=png&s=373906)

我们事先给一些已知点打上标签，标记出哪个点是黄色的点，哪个点是蓝色的点。然后我们再给出另一个点的坐标，逻辑回归会给出该点有多大概率是黄色的。即，逻辑回归输出的是概率。而前面学习的线性回归输出的则是一个线性增长的值。

那怎么得到这个概率呢？这就要用到前面提到过的[激活函数](https://juejin.im/post/5edb9966e51d4578a51f8bdb)。激活函数主要是处理非线性的变化，比如，之前提到的相亲的[例子](https://juejin.im/post/5edb9966e51d4578a51f8bdb)，有的人对于相亲对象是否有钱这件事情上的看法是，当对方有钱到一定程度后，钱再增加，好感度也不会有什么增加了。另外，因为输出的是一个概率，所以应该把输出的值压缩到[0,1]区间内。

操作步骤：

1）加载一个二分类数据集

2）定义模型结构：带有激活函数的单个神经元

3）训练模型并进行预测

### 二、加载二分类数据集

1）使用预先准备好的脚本来生成二分类数据集。

在真实的工作中，搞机器学习和深度学习，80%的时间都是在处理数据的。

下面我们来生成一个二分类数据集。对于怎么生成二分类数据集，不是本文的重点，因此，我们只是给出脚本。

logistic-regression/data.js
```js
export function getData(numSamples) {
  let points = [];
  function getGauss(cx, cy, label) {
    for(let i = 0; i < numSamples / 2; i++) {
      let x = normalRandom(cx);
      let y = normalRandom(cy);
      points.push({ x, y, label });
    }
  }
  getGauss(2, 2, 1);
  getGauss(-2, -2, 0);
  return points;
}

function normalRandom(mean = 0, variance = 1) {
  let v1, v2, s;
  do {
    v1 = 2 * Math.random() - 1;
    v2 = 2 * Math.random() - 1;
    s = v1 * v1 + v2 * v2;
  } while ( s > 1);
  let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
  return mean + Math.sqrt(variance) * result;
}
```


logistic-regression/index.js
```js
import * as tfvis from '@tensorflow/tfjs-vis';
import { getData } from './data.js';

window.onload = () => {
  const data = getData(400); // 获取400个点
  console.log(data);
}
```

经过`parcel src/logistic*/*html`打包，我们得到如下log输出：
![](https://user-gold-cdn.xitu.io/2020/7/4/1731963db5eaf453?w=788&h=661&f=jpeg&s=126907)

其中，label表示的是该点是蓝色的概率。那么相反地，该点是黄色的概率就是1减去这个概率。

2）可视化二分类数据集

```js
tfvis.render.scatterplot(
    { name: '逻辑回归训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0),
      ] // 这里的数据跟之前的有些不同，这是一个二维数组
    }
);
```

效果如下：

![](https://user-gold-cdn.xitu.io/2020/7/4/173197a51ff80785?w=681&h=362&f=jpeg&s=28671)

### 三、定义模型结构

操作步骤：

1）初始化一个神经网络模型

2）为神经网络模型添加层

3）设计层的神经元个数、inputShape、激活函数

补充：

点积：

如果a向量为[a1, a2, ..., an]，b向量为[b1, b2, ..., bn]，那么二者的点积为 a1b1 + a2b2 + ... + anbn。

代码如下：

```
const model = tf.sequential();
model.add(tf.layers.dense({
    units: 1, // 一个神经元
    inputShape: [2], // 特征长度为2（有两个特征）的1维数组
    activation: 'sigmoid' // 激活函数。之所以选择它的原因是它能保证输出结果在[0,1]之间
}))
```

之所以选择sigmoid作为激活函数，是因为它能保证输出结果在[0,1]之间。见下图所示：

![](https://user-gold-cdn.xitu.io/2020/7/4/173199490d56674f?w=400&h=400&f=png&s=18777)

### 四、训练模型并可视化训练过程

操作步骤：

1）将二分类训练数据转化为Tensor（将特征数量为2的数据转换为Tensor）

2）训练模型

3）使用tfvis可视化训练过程

```js
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { getData } from './data.js';

window.onload = async () => {
  const data = getData(400); // 获取400个点
  console.log(data);

  tfvis.render.scatterplot(
    { name: '逻辑回归训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0),
      ] // 这里的数据跟之前的有些不同，这是一个二维数组
    }
  );

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 1, // 一个神经元
    inputShape: [2], // 特征长度为2（有两个特征）的1维数组
    activation: 'sigmoid' // 激活函数。之所以选择它的原因是它能保证输出结果在[0,1]之间
  }));

  model.compile(
    {
      loss: tf.losses.logLoss,
      optimizer: tf.train.adam(0.1)
    }
  );

  const inputs = tf.tensor(data.map((p) => [p.x, p.y]));
  const labels = tf.tensor(data.map((p) => p.label));

  await model.fit(inputs, labels, {
    batchSize: 40, // 因为整个训练数据是400个，这里设置了batchSize等于40，那就相当于10个batch就完成一轮训练，即10个batch构成一个epoch。
    epochs: 50,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss']
    )
  });
}
```

因为整个训练数据是400个，这里设置了batchSize等于40，那就相当于10个batch就完成一轮训练，即10个batch构成一个epoch。

效果如下：

![](https://user-gold-cdn.xitu.io/2020/7/4/17319a6ab38b498c?w=663&h=770&f=jpeg&s=43628)

### 五、进行预测

操作步骤：

1）编写前端界面输入待预测数据

之前都是在代码写死了预测数据。这样导致的问题是，每次想修改待预测数据就需要再训练一次。

```html
<form action="" onsubmit="predict(this); return false;">
    x: <input type="text" name="x">
    y: <input type="text" name="y">
    <button type="submit">预测</button>
</form>
```
之所以要return false是为了防止提交之后页面跳转。

2）使用训练好的模型进行预测

3）将输出的Tensor转为普通数据进行显示

代码如下：

src/logistic-regression/index.js
```js
import * as tfvis from '@tensorflow/tfjs-vis';
import * as tf from '@tensorflow/tfjs';
import { getData } from './data.js';

window.onload = async () => {
  const data = getData(400); // 获取400个点
  console.log(data);

  tfvis.render.scatterplot(
    { name: '逻辑回归训练数据' },
    {
      values: [
        data.filter(p => p.label === 1),
        data.filter(p => p.label === 0),
      ] // 这里的数据跟之前的有些不同，这是一个二维数组
    }
  );

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 1, // 一个神经元
    inputShape: [2], // 特征长度为2（有两个特征）的1维数组
    activation: 'sigmoid' // 激活函数。之所以选择它的原因是它能保证输出结果在[0,1]之间
  }));

  model.compile(
    {
      loss: tf.losses.logLoss,
      optimizer: tf.train.adam(0.1)
    }
  );

  const inputs = tf.tensor(data.map((p) => [p.x, p.y]));
  const labels = tf.tensor(data.map((p) => p.label));

  await model.fit(inputs, labels, {
    batchSize: 40, // 因为整个训练数据是400个，这里设置了batchSize等于40，那就相当于10个batch就完成一轮训练，即10个batch构成一个epoch。
    epochs: 50,
    callbacks: tfvis.show.fitCallbacks(
      { name: '训练过程' },
      ['loss']
    )
  });

  window.predict = (form) => {
    // 预测
    const pred = model.predict(tf.tensor([[+form.x.value, +form.y.value]]));
    alert(`预测结果：${pred.dataSync()[0]}`)
  }
}
```

输入x：2，y：2，得到预测结果：0.9999983310699463。

输入x：-2，y：-2，得到预测结果：0.000006647646841884125



