---
layout:     post
title:      "前端机器学习入门笔记3：归一化"
subtitle:   ""
date:       2020-07-04 15:55:30
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

## 一、什么是归一化

归一化就是把大数量级特征转化到较小的数量级下，通常是[0,1]或[-1,1]。例如，对于身高体重预测、房价预测问题，需要把身高体重数据和房价及影响因素的数据压到[0,1]、[-1,1]之间，然后再去训练它。

**1、为何要归一化？**

1）绝大多数Tensorflow.js的模型都不是给特别大的数设计的。

2）将不同数量级的特征转换到同一数量级，防止某个特征影响过大。


**2、操作步骤：**

1）准备训练数据，并将它们归一化。

2）训练模型并预测，将结果反归一化为正常数据。（以便于结果的正常展示）


**3、学习的前置条件：**

1）要有最新版本的Chrome和有代码编辑器

2）要有基础的前端和神经网络预备知识

3）理解前面学习过的线性回归

## 二、归一化训练数据

**1、步骤**

1）准备身高体重训练数据

2）使用tfvis可视化训练数据

3）使用Tensorflow.js的API进行归一化

代码实现如下：

index.js

```js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = () => {
  const heights = [150, 160, 170];
  const weights = [40, 50, 60];

  tfvis.render.scatterplot(
    { name: '身高体重训练数据' },
    { values: heights.map((x, i) => ({ x, y: weights[i] }))}, // 每个点的坐标
    {
      xAxisDomain: [140, 180],
      yAxisDomain: [30, 70]
    } // x轴和y轴的显示区间
  );
}
```

执行`parcel src/hei*/*html`进行打包后，效果如下：

![](https://user-gold-cdn.xitu.io/2020/7/4/17318820f44e6dcd?w=682&h=365&f=jpeg&s=18651)

那么，我们从图上来看一看，如何把图中三个点的数据压缩到[0,1]区间之内呢？这是个很简单的数学问题：

1）对于三个点的x坐标来说，将x值最大的那个点的坐标减去x值最小的那个点的坐标，得到最大x差值。

2）(每个点的x坐标 - x值最小的点的坐标) / 最大x差值 就能把每个点的x坐标都压缩到[0,1]区间内。

3）类似地，也可以将y坐标的值压缩到[0,1]区间内。

TensorFlow.js提供了相应的API来比较简单地完成上述操作，即`const inputs = tf.tensor(heights).sub(150).div(20);`。其中，sub是做减法，div是做除法。于是，通过如下代码，我们可以完成身高和体重数据的归一化：

```js
const inputs = tf.tensor(heights).sub(150).div(20);
inputs.print(); // 会log出来[0, 0.5, 1]
const labels = tf.tensor(weights).sub(40).div(20);
labels.print(); // 会log出来[0, 0.5, 1]
```

## 三、训练、预测和反归一化

操作步骤：

1）定义一个神经网络模型

2）将归一化的数据喂给神经网络模型去学习

3）预测后把结果反归一化为正常数据之后来显示

代码如下：

index.js
```js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

window.onload = async () => {
  const heights = [150, 160, 170];
  const weights = [40, 50, 60];

  tfvis.render.scatterplot(
    { name: '身高体重训练数据' },
    { values: heights.map((x, i) => ({ x, y: weights[i] }))},
    {
      xAxisDomain: [140, 180],
      yAxisDomain: [30, 70]
    }
  );

  const inputs = tf.tensor(heights).sub(150).div(20);
  inputs.print(); // 会log出来[0, 0.5, 1]
  const labels = tf.tensor(weights).sub(40).div(20);
  labels.print(); // 会log出来[0, 0.5, 1]

  // 添加模型
  const model = tf.sequential(); // sequential方法会创建一个连续的模型，什么是连续的模型呢？就是这一层的输入一定是上一层的输出。
  // 其中tf.layers.dense()会生成一个全链接层。该层实现了如下操作：outputs = activation(dot(input, kernel) + bias)，其中activation是作为activation参数传递的激活函数，input是输入，kernel是由层创建的权重矩阵，bias是由层创建的偏差向量（偏置）。
  model.add(tf.layers.dense({
    units: 1, // 神经元的个数
    inputShape: [1] // inputShape是不允许写空数组的，[1]表示是一维的数据并且长度是1（即特征数量是1）
  }));
  model.compile({
    loss: tf.losses.meanSquaredError, // 损失函数：均方误差
    optimizer: tf.train.sgd(0.1) // 优化器：随机梯度下降，括号内的参数为学习速率
  })

  await model.fit(inputs, labels, {
    batchSize: 3, // 小批量随机梯度下降中的小批量的批量样本数
    epochs: 200, // 迭代整个训练数据的次数，这个也是个超参数，需要不断调整得到一个合适值
    callbacks: tfvis.show.fitCallbacks({
        name: '训练过程'
      },
      ['loss'], // 度量单位，用于指定可视化想看什么，这是主要是想看损失情况
    )
  }); // 训练模型

  // 预测
  const output = model.predict(tf.tensor([180]).sub(150).div(20)); // 注意这里传入的参数需要归一化
  // 输出预测结果
  alert(`如果身高为180cm，那么预测体重为${output.mul(20).add(40).dataSync()[0]}kg`); // 注意这里需要做反归一化
}
```

注意一下代码的最后两句，分别做了预测数据输入前的归一化和预测结果输出前的反归一化。

最终预测结果为：

“如果身高为180cm，那么预测体重为69.82542419433594kg”。

至此，归一化就学习完了，还是蛮简单的。主要是理解一下概念就好。由于高考临近，今天看到高中老师发出的学弟学妹们高考出征仪式的照片，有人举着一句宣传标语：

“我易人也易，切莫大意；我男人也难，我不畏难”。

我觉得这句话也适合技术学习。在技术学习的路上，有时是一马平川、风和雨润，有时是荆棘夹道、泥泞满路，但若你心态好，不管如何道路如何，沿途总有别样的风景！

末了，在这个下午茶的时光，录美国诗人罗伯特·弗罗斯特的诗歌一首——The Road Not Taken，作为结尾，愿你悦纳和享受每一个不同的选择和独特的当下，因为不管情况如何，每一刻都是此生独一无二的时光，enjoy :)


![](https://user-gold-cdn.xitu.io/2020/7/4/17318d3cce4d45c8?w=695&h=805&f=png&s=291293)


**未选择的路**

黄色的树林里分出两条路，

可惜我不能同时去涉足，

我在那路口久久伫立，

我向着一条路极目望去，

直到它消失在丛林深处。


但我却选了另外一条路，

它荒草萋萋，十分幽寂，

显得更诱人、更美丽，

虽然在这两条小路上，

都很少留下旅人的足迹，


虽然那天清晨落叶满地，

两条路都未经脚印污染。

呵，留下一条路等改日再见！

但我知道路径延绵无尽头，

恐怕我难以再回返。


也许多少年后在某个地方，

我将轻声叹息把往事回顾，

一片树林里分出两条路，

而我选了人迹更少的一条，

从此决定了我一生的道路。



