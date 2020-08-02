---
layout:     post
title:      "前端机器学习入门笔记6：多分类"
subtitle:   ""
date:       2020-08-01 11:12:24
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

### 一、多分类问题简介

前面的笔记中，我们主要学习了二分类的逻辑回归问题，我们只需要输出一个概率，就可以对数据集进行二分类。但是在现实生活中，不仅包括二分类问题，也包括多分类问题。举个例子，你在纸上写了一个数字，你想预测一下，这个数字是0-9中的哪个数字，这个问题就是一个多分类问题，有0-9这10个分类。再比如，我们要对一张图片进行分类，判断里面是否有猫、狗、猪、鸡、鸭、鹅，等等，这就有成千上万种分类。面对这样的多分类任务，我们该构建怎样的神经网络才能解决它们呢？

首先我们来看一个经典的鸢尾花(iris)分类问题：

![](https://user-gold-cdn.xitu.io/2020/7/18/1736156b673c634f?w=1080&h=404&f=png&s=1064116)

根据花瓣的长度、宽度 以及 花萼的长度、宽度来将鸢尾花分为三个类别，分别是变色鸢尾(iris versicolor)、山鸢尾(iris setosa)、维吉尼亚鸢尾(iris virginica)。我们的输入不是图片，而是一堆由花瓣的长度、宽度 以及 花萼的长度、宽度组成的数字，即共计4个特征。

操作步骤：

1）加载iris数据集（训练集和验证集）；

所谓验证集，简单来说就是用来验证模型是否真的越训练越好了，在实际的工作中，验证集往往都是从训练集中分一部分出来的，它和训练集的格式是一摸一样的。

2）定义模型结构：带有激活函数softmax的多层神经网络；

激活函数softmax的作用：因为我们这里有三个分类，那么得到的是三个分类的概率，softmax的作用是将这三个概率合为一个概率。

3）训练模型并预测，这里除了之前用过的损失之外，还要增加一个新的度量单位，叫准确度，等等；

### 二、加载IRIS数据集（训练集和验证集）

#### 1、使用预先准备好的脚本生成IRIS数据集，包括训练集和验证集

src/iris/data.js
```js
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs';

export const IRIS_CLASSES = ['山鸢尾', '变色鸢尾', '维吉尼亚鸢尾'];
export const IRIS_NUM_CLASSES = IRIS_CLASSES.length;

// Iris flowers data. Source:
//   https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data
// 下面数据的每一项的前四个数字是特征，最后一个是类别：0-山鸢尾、1-变色鸢尾、2-维吉尼亚鸢尾
const IRIS_DATA = [
  [5.1, 3.5, 1.4, 0.2, 0],
  [4.9, 3.0, 1.4, 0.2, 0],
  [4.7, 3.2, 1.3, 0.2, 0],
  [4.6, 3.1, 1.5, 0.2, 0],
  [5.0, 3.6, 1.4, 0.2, 0],
  [5.4, 3.9, 1.7, 0.4, 0],
  [4.6, 3.4, 1.4, 0.3, 0],
  [5.0, 3.4, 1.5, 0.2, 0],
  [4.4, 2.9, 1.4, 0.2, 0],
  [4.9, 3.1, 1.5, 0.1, 0],
  [5.4, 3.7, 1.5, 0.2, 0],
  [4.8, 3.4, 1.6, 0.2, 0],
  [4.8, 3.0, 1.4, 0.1, 0],
  [4.3, 3.0, 1.1, 0.1, 0],
  [5.8, 4.0, 1.2, 0.2, 0],
  [5.7, 4.4, 1.5, 0.4, 0],
  [5.4, 3.9, 1.3, 0.4, 0],
  [5.1, 3.5, 1.4, 0.3, 0],
  [5.7, 3.8, 1.7, 0.3, 0],
  [5.1, 3.8, 1.5, 0.3, 0],
  [5.4, 3.4, 1.7, 0.2, 0],
  [5.1, 3.7, 1.5, 0.4, 0],
  [4.6, 3.6, 1.0, 0.2, 0],
  [5.1, 3.3, 1.7, 0.5, 0],
  [4.8, 3.4, 1.9, 0.2, 0],
  [5.0, 3.0, 1.6, 0.2, 0],
  [5.0, 3.4, 1.6, 0.4, 0],
  [5.2, 3.5, 1.5, 0.2, 0],
  [5.2, 3.4, 1.4, 0.2, 0],
  [4.7, 3.2, 1.6, 0.2, 0],
  [4.8, 3.1, 1.6, 0.2, 0],
  [5.4, 3.4, 1.5, 0.4, 0],
  [5.2, 4.1, 1.5, 0.1, 0],
  [5.5, 4.2, 1.4, 0.2, 0],
  [4.9, 3.1, 1.5, 0.1, 0],
  [5.0, 3.2, 1.2, 0.2, 0],
  [5.5, 3.5, 1.3, 0.2, 0],
  [4.9, 3.1, 1.5, 0.1, 0],
  [4.4, 3.0, 1.3, 0.2, 0],
  [5.1, 3.4, 1.5, 0.2, 0],
  [5.0, 3.5, 1.3, 0.3, 0],
  [4.5, 2.3, 1.3, 0.3, 0],
  [4.4, 3.2, 1.3, 0.2, 0],
  [5.0, 3.5, 1.6, 0.6, 0],
  [5.1, 3.8, 1.9, 0.4, 0],
  [4.8, 3.0, 1.4, 0.3, 0],
  [5.1, 3.8, 1.6, 0.2, 0],
  [4.6, 3.2, 1.4, 0.2, 0],
  [5.3, 3.7, 1.5, 0.2, 0],
  [5.0, 3.3, 1.4, 0.2, 0],
  [7.0, 3.2, 4.7, 1.4, 1],
  [6.4, 3.2, 4.5, 1.5, 1],
  [6.9, 3.1, 4.9, 1.5, 1],
  [5.5, 2.3, 4.0, 1.3, 1],
  [6.5, 2.8, 4.6, 1.5, 1],
  [5.7, 2.8, 4.5, 1.3, 1],
  [6.3, 3.3, 4.7, 1.6, 1],
  [4.9, 2.4, 3.3, 1.0, 1],
  [6.6, 2.9, 4.6, 1.3, 1],
  [5.2, 2.7, 3.9, 1.4, 1],
  [5.0, 2.0, 3.5, 1.0, 1],
  [5.9, 3.0, 4.2, 1.5, 1],
  [6.0, 2.2, 4.0, 1.0, 1],
  [6.1, 2.9, 4.7, 1.4, 1],
  [5.6, 2.9, 3.6, 1.3, 1],
  [6.7, 3.1, 4.4, 1.4, 1],
  [5.6, 3.0, 4.5, 1.5, 1],
  [5.8, 2.7, 4.1, 1.0, 1],
  [6.2, 2.2, 4.5, 1.5, 1],
  [5.6, 2.5, 3.9, 1.1, 1],
  [5.9, 3.2, 4.8, 1.8, 1],
  [6.1, 2.8, 4.0, 1.3, 1],
  [6.3, 2.5, 4.9, 1.5, 1],
  [6.1, 2.8, 4.7, 1.2, 1],
  [6.4, 2.9, 4.3, 1.3, 1],
  [6.6, 3.0, 4.4, 1.4, 1],
  [6.8, 2.8, 4.8, 1.4, 1],
  [6.7, 3.0, 5.0, 1.7, 1],
  [6.0, 2.9, 4.5, 1.5, 1],
  [5.7, 2.6, 3.5, 1.0, 1],
  [5.5, 2.4, 3.8, 1.1, 1],
  [5.5, 2.4, 3.7, 1.0, 1],
  [5.8, 2.7, 3.9, 1.2, 1],
  [6.0, 2.7, 5.1, 1.6, 1],
  [5.4, 3.0, 4.5, 1.5, 1],
  [6.0, 3.4, 4.5, 1.6, 1],
  [6.7, 3.1, 4.7, 1.5, 1],
  [6.3, 2.3, 4.4, 1.3, 1],
  [5.6, 3.0, 4.1, 1.3, 1],
  [5.5, 2.5, 4.0, 1.3, 1],
  [5.5, 2.6, 4.4, 1.2, 1],
  [6.1, 3.0, 4.6, 1.4, 1],
  [5.8, 2.6, 4.0, 1.2, 1],
  [5.0, 2.3, 3.3, 1.0, 1],
  [5.6, 2.7, 4.2, 1.3, 1],
  [5.7, 3.0, 4.2, 1.2, 1],
  [5.7, 2.9, 4.2, 1.3, 1],
  [6.2, 2.9, 4.3, 1.3, 1],
  [5.1, 2.5, 3.0, 1.1, 1],
  [5.7, 2.8, 4.1, 1.3, 1],
  [6.3, 3.3, 6.0, 2.5, 2],
  [5.8, 2.7, 5.1, 1.9, 2],
  [7.1, 3.0, 5.9, 2.1, 2],
  [6.3, 2.9, 5.6, 1.8, 2],
  [6.5, 3.0, 5.8, 2.2, 2],
  [7.6, 3.0, 6.6, 2.1, 2],
  [4.9, 2.5, 4.5, 1.7, 2],
  [7.3, 2.9, 6.3, 1.8, 2],
  [6.7, 2.5, 5.8, 1.8, 2],
  [7.2, 3.6, 6.1, 2.5, 2],
  [6.5, 3.2, 5.1, 2.0, 2],
  [6.4, 2.7, 5.3, 1.9, 2],
  [6.8, 3.0, 5.5, 2.1, 2],
  [5.7, 2.5, 5.0, 2.0, 2],
  [5.8, 2.8, 5.1, 2.4, 2],
  [6.4, 3.2, 5.3, 2.3, 2],
  [6.5, 3.0, 5.5, 1.8, 2],
  [7.7, 3.8, 6.7, 2.2, 2],
  [7.7, 2.6, 6.9, 2.3, 2],
  [6.0, 2.2, 5.0, 1.5, 2],
  [6.9, 3.2, 5.7, 2.3, 2],
  [5.6, 2.8, 4.9, 2.0, 2],
  [7.7, 2.8, 6.7, 2.0, 2],
  [6.3, 2.7, 4.9, 1.8, 2],
  [6.7, 3.3, 5.7, 2.1, 2],
  [7.2, 3.2, 6.0, 1.8, 2],
  [6.2, 2.8, 4.8, 1.8, 2],
  [6.1, 3.0, 4.9, 1.8, 2],
  [6.4, 2.8, 5.6, 2.1, 2],
  [7.2, 3.0, 5.8, 1.6, 2],
  [7.4, 2.8, 6.1, 1.9, 2],
  [7.9, 3.8, 6.4, 2.0, 2],
  [6.4, 2.8, 5.6, 2.2, 2],
  [6.3, 2.8, 5.1, 1.5, 2],
  [6.1, 2.6, 5.6, 1.4, 2],
  [7.7, 3.0, 6.1, 2.3, 2],
  [6.3, 3.4, 5.6, 2.4, 2],
  [6.4, 3.1, 5.5, 1.8, 2],
  [6.0, 3.0, 4.8, 1.8, 2],
  [6.9, 3.1, 5.4, 2.1, 2],
  [6.7, 3.1, 5.6, 2.4, 2],
  [6.9, 3.1, 5.1, 2.3, 2],
  [5.8, 2.7, 5.1, 1.9, 2],
  [6.8, 3.2, 5.9, 2.3, 2],
  [6.7, 3.3, 5.7, 2.5, 2],
  [6.7, 3.0, 5.2, 2.3, 2],
  [6.3, 2.5, 5.0, 1.9, 2],
  [6.5, 3.0, 5.2, 2.0, 2],
  [6.2, 3.4, 5.4, 2.3, 2],
  [5.9, 3.0, 5.1, 1.8, 2],
];

/**
 * Convert Iris data arrays to `tf.Tensor`s.
 *
 * @param data The Iris input feature data, an `Array` of `Array`s, each element
 *   of which is assumed to be a length-4 `Array` (for petal length, petal
 *   width, sepal length, sepal width).
 * @param targets An `Array` of numbers, with values from the set {0, 1, 2}:
 *   representing the true category of the Iris flower. Assumed to have the same
 *   array length as `data`.
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 * @return A length-4 `Array`, with
 *   - training data as `tf.Tensor` of shape [numTrainExapmles, 4].
 *   - training one-hot labels as a `tf.Tensor` of shape [numTrainExamples, 3]
 *   - test data as `tf.Tensor` of shape [numTestExamples, 4].
 *   - test one-hot labels as a `tf.Tensor` of shape [numTestExamples, 3]
 */
function convertToTensors(data, targets, testSplit) {
  const numExamples = data.length;
  if (numExamples !== targets.length) {
    throw new Error('data and split have different numbers of examples');
  }

  // Randomly shuffle `data` and `targets`.
  const indices = [];
  for (let i = 0; i < numExamples; ++i) {
    indices.push(i);
  }
  tf.util.shuffle(indices);

  const shuffledData = [];
  const shuffledTargets = [];
  for (let i = 0; i < numExamples; ++i) {
    shuffledData.push(data[indices[i]]);
    shuffledTargets.push(targets[indices[i]]);
  }

  // Split the data into a training set and a tet set, based on `testSplit`.
  const numTestExamples = Math.round(numExamples * testSplit);
  const numTrainExamples = numExamples - numTestExamples;

  const xDims = shuffledData[0].length;

  // Create a 2D `tf.Tensor` to hold the feature data.
  const xs = tf.tensor2d(shuffledData, [numExamples, xDims]);

  // Create a 1D `tf.Tensor` to hold the labels, and convert the number label
  // from the set {0, 1, 2} into one-hot encoding (.e.g., 0 --> [1, 0, 0]).
  const ys = tf.oneHot(tf.tensor1d(shuffledTargets).toInt(), IRIS_NUM_CLASSES);

  // Split the data into training and test sets, using `slice`.
  const xTrain = xs.slice([0, 0], [numTrainExamples, xDims]);
  const xTest = xs.slice([numTrainExamples, 0], [numTestExamples, xDims]);
  const yTrain = ys.slice([0, 0], [numTrainExamples, IRIS_NUM_CLASSES]);
  const yTest = ys.slice([0, 0], [numTestExamples, IRIS_NUM_CLASSES]);
  return [xTrain, yTrain, xTest, yTest];
}

/**
 * Obtains Iris data, split into training and test sets.
 *
 * @param testSplit Fraction of the data at the end to split as test data: a
 *   number between 0 and 1.
 *
 * @param return A length-4 `Array`, with
 *   - training data as an `Array` of length-4 `Array` of numbers.
 *   - training labels as an `Array` of numbers, with the same length as the
 *     return training data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 *   - test data as an `Array` of length-4 `Array` of numbers.
 *   - test labels as an `Array` of numbers, with the same length as the
 *     return test data above. Each element of the `Array` is from the set
 *     {0, 1, 2}.
 */
export function getIrisData(testSplit) {
  return tf.tidy(() => {
    const dataByClass = [];
    const targetsByClass = [];
    for (let i = 0; i < IRIS_CLASSES.length; ++i) {
      dataByClass.push([]);
      targetsByClass.push([]);
    }
    for (const example of IRIS_DATA) {
      const target = example[example.length - 1];
      const data = example.slice(0, example.length - 1);
      dataByClass[target].push(data);
      targetsByClass[target].push(target);
    }

    const xTrains = [];
    const yTrains = [];
    const xTests = [];
    const yTests = [];
    for (let i = 0; i < IRIS_CLASSES.length; ++i) {
      const [xTrain, yTrain, xTest, yTest] =
      convertToTensors(dataByClass[i], targetsByClass[i], testSplit);
      xTrains.push(xTrain);
      yTrains.push(yTrain);
      xTests.push(xTest);
      yTests.push(yTest);
    }

    const concatAxis = 0;
    return [
      tf.concat(xTrains, concatAxis), tf.concat(yTrains, concatAxis),
      tf.concat(xTests, concatAxis), tf.concat(yTests, concatAxis)
    ];
  });
}
```

#### 2、打印IRIS数据集

这次我们不再可视化这个数据集，因为输入特征有四个，再加上一个输出类别，一共是五维度的数据，是很难可视化的。

数据集来源：
[https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data](https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data)

我们先把数据引入进来，打印一下看看生成的数据格式是什么样子：

src/iris/index.js
```js
import {
  getIrisData,
  IRIS_CLASSES
} from './data';

window.onload = () => {
  const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15); // 其中参数0.15表示的意思是从数据集中分出来15%的数据作为验证集。xTrain为训练集的所有特征，yTrain为训练集的所有标签；xTest为训练集的所有特征，yTest为验证集的所有标签。
  xTrain.print();
  yTrain.print();
  xTest.print();
  yTest.print();
  console.log(IRIS_CLASSES);
}
```

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dfbbe79452c43b79aafce7aed9d91a9~tplv-k3u1fbpfcp-zoom-1.image)

### 三、定义模型结构：带有softmax的多层神经网络

理论：

上面的IRIS数据集有四个特征，显然它是一个复杂的非线性问题。要解决这样的问题，需要使用多层神经网络，而且要配合激活函数带来一些非线性的变化。对于IRIS数据集，还要解决多分类问题。如何解决呢？在神经网络的最后一层设置一个softmax激活函数。之前解决二分类问题的时候，在神经网络的最后一层使用的是sigmoid激活函数，它会输出一个从0到1的概率。但解决多分类问题的时候，一个概率就不够了。这里我们需要输出每一个分类的概率，而softmax激活函数就能够做到这一点。设置完softmax激活函数之后，我们还要在神经网络最后一层把神经元个数设置为分类的个数，对于IRIS数据集，应该是3。

操作步骤：

初始化一个神经网络
为神经网络添加两个层
设计层的神经元个数（对于第一层的神经元个数，因为这个数据集较为复杂，我们可以大致设置一个，比如10，然后根据训练情况再看是否需要调整，这个数字是没法算出来的，只能像炼丹的方式调出来；对于第二层，上面提到过了，第二层也是最后一层，神经元个数应该是分类的个数，即3）、inputShape（对于第一层，因为这里特征个数是4，所以inputShape应该是长度为4的一维数组；而对于第二层是没有inputShape的）、激活函数（对于第一层的激活函数只要能带来非线性的变化就可以，对于第二层，激活函数应该是softmax）。

代码如下：

src/iris/index.js
```
import * as tfjs from '@tensorflow/tfjs';
import {
  getIrisData,
  IRIS_CLASSES
} from './data';

window.onload = () => {
  const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15); // 其中参数0.15表示的意思是从数据集中分出来15%的数据作为验证集。xTrain为训练集的所有特征，yTrain为训练集的所有标签；xTest为训练集的所有特征，yTest为验证集的所有标签。
  console.log(xTrain.shape); // 输出[126,4]，表示训练集有126条数据
  console.log(xTest.shape); // 输出[24,4]，表示验证集有24条数据
  xTrain.print();
  yTrain.print();
  xTest.print();
  yTest.print();
  console.log(IRIS_CLASSES);

  // 初始化模型
  const model = tf.sequential();
  // 添加第一层
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [xTrain.shape[1]],
    activation: 'sigmoid', // 这第一层的激活函数只要能带来非线性的变化就可以
  }));
  // 添加第二层
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));
}
```

### 四、训练模型：交叉熵损失函数与准确度度量

交叉熵损失函数是我们之前学过的对数损失函数的多分类版本。

操作步骤：

1）设置交叉熵损失函数

2）添加准确度度量

3）训练模型并使用tfvis可视化训练过程

什么是交叉熵损失？

[https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html](https://ml-cheatsheet.readthedocs.io/en/latest/loss_functions.html)

交叉熵损失或对数损失衡量分类模型的性能，该模型的输出为0到1之间的概率值。随着预测概率与实际标签的偏离，交叉熵损失会增加。

在二进制分类中，其中的类别数量 M 等于2，交叉熵损失就是对数损失，交叉熵可以计算为：

−(ylog(p)+(1−y)log(1−p))

如果 M>2 （即多分类），我们为每个观察值为每个类别标签计算一个单独的损失，并将结果相累加。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2df468c2f10b48358c262d55fe231793~tplv-k3u1fbpfcp-zoom-1.image)

其中：

M-类别数量

log-自然对数

y-某类别的真实值

p-预测出来的该类别的概率


代码如下：

src/iris/index.js
```js
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import {
  getIrisData,
  IRIS_CLASSES
} from './data';
import { callbacks } from '@tensorflow/tfjs';

window.onload = async () => {
  const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15); // 其中参数0.15表示的意思是从数据集中分出来15%的数据作为验证集。xTrain为训练集的所有特征，yTrain为训练集的所有标签；xTest为训练集的所有特征，yTest为验证集的所有标签。
  console.log(xTrain.shape); // 输出[126,4]，表示训练集有126条数据
  console.log(xTest.shape); // 输出[24,4]，表示验证集有24条数据
  xTrain.print();
  yTrain.print();
  xTest.print();
  yTest.print();
  console.log(IRIS_CLASSES);

  // 初始化模型
  const model = tf.sequential();
  // 添加第一层
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [xTrain.shape[1]],
    activation: 'sigmoid', // 这第一层的激活函数只要能带来非线性的变化就可以
  }));
  // 添加第二层
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));

  model.compile({
    loss: 'categoricalCrossentropy', // 交叉熵损失函数
    optimizer: tf.train.adam(0.1), // adam优化器
    metrics: ['accuracy'] // 这是准确度度量
  });

  // 训练模型
  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest], // 验证集
    callbacks: tfvis.show.fitCallbacks( // 可视化训练过程
      { name: '训练效果' },
      [
        'loss', // 训练集的损失
        'val_loss', // 验证集的损失
        'acc', // 训练集的准确度
        'val_acc' // 验证集的准确度
      ],
      { callbacks: ['onEpochEnd'] } // 设置只显示onEpochEnd，而不显示onBatchEnd
    )
  })
}
```

效果如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3797a444a3134ba69970ddb75a8d0c77~tplv-k3u1fbpfcp-zoom-1.image)

图中上部分显示了训练集的损失（蓝线）和验证集的损失（黄色）；图中的下部分显示了训练集的准确度（蓝线）和验证集的准确度（黄色）。

### 五、进行预测

操作步骤：

1）编写前端界面输入待预测的数据

2）使用训练好的模型进行预测

3）将输出的Tensor转为普通数据并显示

代码如下：
src/iris/data.js
```
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import {
  getIrisData,
  IRIS_CLASSES
} from './data';
import { callbacks } from '@tensorflow/tfjs';

window.onload = async () => {
  const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15); // 其中参数0.15表示的意思是从数据集中分出来15%的数据作为验证集。xTrain为训练集的所有特征，yTrain为训练集的所有标签；xTest为训练集的所有特征，yTest为验证集的所有标签。
  console.log(xTrain.shape); // 输出[126,4]，表示训练集有126条数据
  console.log(xTest.shape); // 输出[24,4]，表示验证集有24条数据
  xTrain.print();
  yTrain.print();
  xTest.print();
  yTest.print();
  console.log(IRIS_CLASSES);

  // 初始化模型
  const model = tf.sequential();
  // 添加第一层
  model.add(tf.layers.dense({
    units: 10,
    inputShape: [xTrain.shape[1]],
    activation: 'sigmoid', // 这第一层的激活函数只要能带来非线性的变化就可以
  }));
  // 添加第二层
  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));

  model.compile({
    loss: 'categoricalCrossentropy', // 交叉熵损失函数
    optimizer: tf.train.adam(0.1), // adam优化器
    metrics: ['accuracy'] // 这是准确度度量
  });

  // 训练模型
  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest], // 验证集
    callbacks: tfvis.show.fitCallbacks( // 可视化训练过程
      { name: '训练效果' },
      [
        'loss', // 训练集的损失
        'val_loss', // 验证集的损失
        'acc', // 训练集的准确度
        'val_acc' // 验证集的准确度
      ],
      { callbacks: ['onEpochEnd'] } // 设置只显示onEpochEnd，而不显示onBatchEnd
    )
  })

  window.predict = (form) => {
    const input = tf.tensor([[
      +form.a.value,
      +form.b.value,
      +form.c.value,
      +form.d.value,
    ]]); // 输入数据和训练数据的格式要保一致
    const pred = model.predict(input);
    alert(`预测结果：${IRIS_CLASSES[pred.argMax(1).dataSync(0)]}`); // pred.argMax(1)输出的是pred的第二维（0是第一维，1是第二维）的最大值的坐标，不过它输出的是一个Tensor，需要通过dataSync(0)转成普通数据进行显示
  }
}
```

src/iris/index.html
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script src="index.js"></script>

  <form action="" onsubmit="predict(this); return false;">
    x: <input type="text" name="x">
    y: <input type="text" name="y">
    <button type="submit">提交</button>
  </form>
</body>

</html>
```

然后我们从训练数据里随便找一条数据进行测试。输入和输出如图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6abd4559a1294e4498b93d07533f4122~tplv-k3u1fbpfcp-zoom-1.image)
