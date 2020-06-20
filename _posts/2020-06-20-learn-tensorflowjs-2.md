---
layout:     post
title:      "图解UML"
subtitle:   ""
date:       2020-06-20 20:35:14
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

## 一、线性回归简介

你可能会说，我其实比较关注机器学习的比较实际的功能，为什么要学线性呢？其实线性回归以及后面要学习的逻辑回归等，都是深度学习的基础知识。如果先不学这些，而直接上手深度学习那些比较实用的功能，如图片分类、语音识别等等，会感觉非常吃力。所以我们就先学习一下线性回归这类更基础的内容，以提供一个坡度比较小的学习曲线，避免真的出现从“入门到放弃”的局面。

首先来看看什么是线性回归？

### 1、什么是线性回归？

**线性回归是利用数理统计中回归分析来确定两种或两种以上变量之间相互依赖的定量关系的一种统计分析方法。**

这个定义是不是有种不知所云的感觉！别慌，我们来拆解一下：

首先，它是一种统计方法；

其次，它的目的是为了确定两种或两种以上变量之间的关系；

再次，它是通过数理统计中的回归分析方法来达到这个目的的。

通过这样的拆解，你应该大概知道了它就是通过某种手段，确定变量之间关系的一种方法。

为了让大家更直观地理解线性回归？我们举个例子:

比如说身高、体重预测。如果我们已经有一个表格，里面统计好了许多人的身高和体重信息，然后再给你一个人的身高信息，让你猜猜这个人的体重可能是多少。这就是一个要确定体重与身高这两个的定量关系的问题。你可以根据已有的数据找出根据身高求体重的计算公式，然后再给你任意一个身高，都可以求得体重。这其实就是一个线性回归的例子。

### 2、实现一个线性回归的大致步骤

**首先，需要准备一些训练数据。**

类似身高体重的问题，我们可以简化成x和y的关系。比如说，输入x为1的时候，输出y是4；输入x为2的时候，输出y是8，……。我们需要给出很多的这种x和y。

**其次，将它可视化。**

就是将准备的数据呈现在图表上，这样就一目了然。上面的这些x和y的数据在坐标轴上呈现出来就是一些点。

再次，我们使用TensorFlow.js的API来构建一个非常简单的神经网络，简单到只有一个神经元。

最后，我们会把第一步准备的训练数据喂给这个神经网络，去训练这个模型。神经网络本质上就是一个模型。训练完模型之后，我们就会用这个训练好的模型来预测新的数据。比如说再给一个新的x，这个模型就能预测出y是什么了。

## 二、准备训练数据及其可视化

### 1、准备训练数据

这里其实是我们是随意编造一些数据。


### 2、可视化这些数据

我们使用tfvis这个库来可视化这些数据。我们创建一个页面文件和一个JS文件，内容如下：

src/linear-regression/index.html
```html
<script src="./index.js">
```

src/linear-regression/index.js
```js
import * as tfvis from "@tensorflow/tfjs-vis";

window.onload = () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 4, 7, 10];

  tfvis.render.scatterplot(
    { name: '线性回归训练集' },
    { values: xs.map((x, i) => ({x, y: ys[i]}))}, // 每个点的坐标
    { xAxisDomain: [0, 5], yAxisDomain: [0, 15]}, // x轴和y轴的显示区间
  );
}
```

其中，**scatterplot意思是散点图**，如下图所示就是一个散点图：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d0e06341a5b79?w=653&h=329&f=png&s=40255)

`render.scatterplot`方法就是用于绘制一个散点图。

关于@tensorflow/tfjs-vis的API的详细介绍，参见：

https://js.tensorflow.org/api_vis/latest/#render.scatterplot

下面我们来打包一下，看看效果。**因为parcel是支持通配符的，所以我们可以以这样的命令来启动`parcel src/linear*/*.html -p 8080`打包src/linear-regression/index.html页面**。如下图：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d1c975da7186d?w=656&h=503&f=png&s=24902)

## 三、定义模型结构

这里我们定义一个单层单个神经元组成的神经网络。

操作步骤如下：

**首先，用TensorFlow.js的API来初始化一个神经网络模型。**

**然后，为这个神经网络添加层。**

当然，我们这个神经网络比较简单，只有一个层一个神经元。为什么一个神经元就能够解决问题呢？在前面的文章中讲过，神经元上有一个权重和偏置。事实上，我们上文中模拟的那个训练数据呈上一个权重，再加上一个偏置，就可以把x跟y关联起来。所以说一个神经元就够了。

当然，你在以后的这种训练过程中，这个神经元个数以及层的个数是需要你去动态调整的，因为生活中的一些复杂问题，你根本就想象不到它需要多少个神经元多少层，都是摸索出来的。正因为如此，算法工程师又常戏称自己在“炼丹”。

**第三，设置神经元个数和形状（inputShape）。**

下面来编码实现。我们对上文中的src/linear-regression/index.js修改成如下：

```js
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";

window.onload = () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 4, 7, 10];

  tfvis.render.scatterplot(
    { name: '线性回归训练集' },
    { values: xs.map((x, i) => ({x, y: ys[i]}))}, // 每个点的坐标
    { xAxisDomain: [0, 5], yAxisDomain: [0, 15]}, // x轴和y轴的显示区间
  );

  // 添加模型
  const model = tf.sequential(); // sequential方法会创建一个连续的模型，什么是连续的模型呢？就是这一层的输入一定是上一层的输出。

  // 添加层
  model.add(tf.layers.dense({
    units: 1, // 神经元的个数
    inputShape: [1], // inputShape是不允许写空数组的，[1]表示是一维的数据并且长度是1（即特征数量是1）
  }));
}
```

其中`tf.layers.dense()`会生成一个全链接层。该层实现了如下操作：outputs = activation(dot(input, kernel) + bias)，其中activation是作为activation参数传递的激活函数，input是输入，kernel是由层创建的权重矩阵，bias是由层创建的偏差向量（偏置）。

这样，模型结构就建好了。但是现在还不能训练这个神经网络，因为如果想训练，我们还需要给这个神经网络设置损失函数和优化器。

## 四、损失函数：均方误差（MSE）

### 1、理解均方误差和损失函数

我们前面提过，神经网络初始化的时候，会瞎蒙一个选中值，但是这个瞎蒙的值大概率是错的。损失函数的作用就是告诉它，瞎蒙的选中值错得究竟有多离谱。神经网络一旦知道自己错得有多离谱，它就会通过优化器来稍微优化一下选中值，再次进行尝试。然后每次尝试也都需要通过损失函数来评价一下，看看错得有多离谱。为了解决线性回归问题，我们要用到一个损失函数：均方误差（MSE）。

下面，我们首先跟着[谷歌机器学习的速成教程](https://developers.google.cn/machine-learning/crash-course/descending-into-ml/training-and-loss)(这是一个非常好的学习资料，里面有很多交互动画)来理解损失函数和均方误差。

如下图所示，红色箭头表示损失。蓝线表示预测。

![](https://user-gold-cdn.xitu.io/2020/6/20/172d13fbf7de392b?w=1308&h=436&f=png&s=32070)

一个好的模型应该是损失较小的。上图中，左边的模型损失较大，而右边的模型损失较小。

均方误差 (MSE) 指的是每个样本的平均平方损失。如何计算MSE？就是通过求出各个样本的所有平方损失（即预测值减样本实际值，所得到的值的平方）之和，然后再除以样本数量：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d1489c508cc4e?w=1101&h=503&f=png&s=66201)

别害怕这个公式，其实是非常非常简单的。

为了加深理解，我们来算一算下图两个模型的均方误差，看看哪个的均方误差较大？

![](https://user-gold-cdn.xitu.io/2020/6/20/172d14efafffd09a?w=903&h=253&f=png&s=24275)

左图的MSE为：
($1^2$ + $1^2$ + $1^2$ + $1^2$) / 10 = 0.4

右图的MSE为：

($2^2$ + $2^2$) / 10 = 0.8

可见，右边这个模型的均方误差较大。

### 2、在TensorFlow.js中设置损失函数

src/linear-regression/index.js

```js
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from "@tensorflow/tfjs";

window.onload = () => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 4, 7, 10];

  tfvis.render.scatterplot(
    { name: '线性回归训练集' },
    { values: xs.map((x, i) => ({x, y: ys[i]}))}, // 每个点的坐标
    { xAxisDomain: [0, 5], yAxisDomain: [0, 15]}, // x轴和y轴的显示区间
  );

  // 添加模型
  const model = tf.sequential(); // sequential方法会创建一个连续的模型，什么是连续的模型呢？就是这一层的输入一定是上一层的输出。

  // 添加层
  model.add(tf.layers.dense({
    units: 1, // 神经元的个数
    inputShape: [1], // inputShape是不允许写空数组的，[1]表示是一维的数据并且长度是1（即特征数量是1）
  }));

  // 设置损失函数
  model.compile({ loss: tf.losses.meanSquaredError });
}
```

我们实际上只在该文件中添加了一行`model.compile({ loss: tf.losses.meanSquaredError });`这是损失函数为均方误差。

TensorFlow.js中的`.losses.meanSquaredError`已经帮我们实现好了均方误差的计算过程。我们只需要使用即可。可见还是非常简单的。

## 五、优化器：随机梯度下降（SGD）

上一小节我们已经了解了用损失函数来衡量预测值与样本真实值的偏差。知道这个偏差之后，就由优化器来进行优化，可以通过优化器来找到改进的方向和幅度。

### 1、理解优化器和随机梯度下降

在理解随机梯度下降之前，我们先来看看梯度下降法：

对于回归问题，所产生的损失和权重之间的关系是如下图所示这样一条曲线关系。

![](https://user-gold-cdn.xitu.io/2020/6/20/172d173a8be194e8?w=582&h=376&f=png&s=18376)

在模型训练的时候，首先会蒙一个值，假设是在上图所标起点处。这个时候，怎样让损失减小呢？应该求曲线在该点处的斜率（即求导数），如果斜率是正的，就应该往相反的方向走，如果斜率为负的，就说明方向是正确的。梯度就是优化方向和优化幅度的大小。

![](https://user-gold-cdn.xitu.io/2020/6/20/172d179edd3c5316?w=582&h=376&f=png&s=26487)

梯度下降法算法用梯度乘以一个称为学习速率（有时也称为步长）的标量，以确定下一个点的位置。有了这个学习速率后，就比较便于调参数了。

算法工程师有时又自嘲“调参狗”。所调的就是超参数。超参数是编程人员在机器学习算法中用于调整的旋钮。大多数机器学习编程人员会花费相当多的时间来调整学习速率。如果您选择的学习速率过小，就会花费太长的学习时间：

学习速率过小，则相同的 U 形曲线。很多点都相互非常接近，它们的轨迹朝着 U 形底部缓慢前进。如下图所示：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d17e873abbd35?w=584&h=310&f=png&s=23557)

相反，如果您指定的学习速率过大，下一个点将永远在 U形曲线的底部随意弹跳，相同的 U 形曲线。这条曲线包含的点非常少。点的轨迹会跳过 U 形底部，然后再次跳回，如下图所示：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d17ef08b6ded1?w=718&h=299&f=png&s=22548)

每个回归问题都存在一个金发姑娘学习速率。“金发姑娘”值与损失函数的平坦程度相关。如果您知道损失函数的梯度较小，则可以放心地试着采用更大的学习速率，以补偿较小的梯度并获得更大的步长。下图是较合适的学习速率的情况。

![](https://user-gold-cdn.xitu.io/2020/6/20/172d180780e9902a?w=582&h=299&f=png&s=24397)

可以通过[这个demo](https://developers.google.cn/machine-learning/crash-course/fitter/graph)来试验一下不同学习速率的影响，如下图所示：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d188498a2d7e8?w=776&h=835&f=png&s=56299)

那么有没有办法能够算出来这个学习速率应该多大比较合适呢？答案是没有。大概率都是不断在尝试中试出来的，而不是拿公式算出来的。不过，有部分新的优化器有自己调整学习速率的功能，还是非常好用的，如`.train.adam`优化器等。

因为实战用的数据集样本量会在数十亿或者数千亿。如果一次算这么大量级的样本的损失，无疑是非常耗时间的，因此，我们发明了一种方法，叫随机梯度下降。即把数据集打乱，每次从中随机选择一个样本进行计算。还有一种更折中的方法是，每次不是选一个样本来算，也不是十亿个样本都算，而是从十亿个中随机选出10-1000个左右的样本来计算，这个方法叫小批量梯度随机下降法（SGD）。

### 2、在TensorFlow.js中设置优化器

将上文中的`model.compile({ loss: tf.losses.meanSquaredError });`这一行进一步修改为：

```js
model.compile({ loss: tf.losses.meanSquaredError, optimizer: tf.train.sgd(0.1) }); // 设置损失函数和优化器
```

其中，TensorFlow.js的`.train.sgd(0.1)`用于获得一个SGD优化器，括号内的参数为学习速率。

## 六、训练模型并可视化训练过程

### 1、将训练数据转为Tensor

这个比较简单，直接上代码：

```js
const inputs = tf.tensor(xs); // 特征
const labels = tf.tensor(ys); // 标签
```

### 2、调用TensorFlow.js的API来训练模型

```js
await model.fit(inputs, labels, {
    batchSize: 4, // 小批量随机梯度下降中的小批量的批量样本数
    epochs: 100, // 迭代整个训练数据的次数，这个也是个超参数，需要不断调整得到一个合适值
  }); // 训练模型
```

不过要注意，训练模型的方法是异步的，所以要用await，其外包函数需要加上async。

这里有一点要注意，因为我们用的parcel在打包，为了支持async await语法的打包，需要在package.json中添加一行：

```js
"browserslist": ["last 1 Chrome version"],
```

### 3、使用tfvis来可视化训练过程

主要是添加callbacks：

```js
await model.fit(inputs, labels, {
    batchSize: 4, // 小批量随机梯度下降中的小批量的批量样本数
    epochs: 100, // 迭代整个训练数据的次数，这个也是个超参数，需要不断调整得到一个合适值
    callbacks: tfvis.show.fitCallbacks(
      {name: '训练过程'},
      ['loss'], // 度量单位，用于指定可视化想看什么，这是主要是想看损失情况
    )
  }); // 训练模型
```
batchSize为4 且 epochs为100 的情况效果如下所示：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d1b2b91b48190?w=650&h=912&f=png&s=49283)

我们如果把batchSize调整成1，会看到损失会有振荡，这是因为小批量的时候一次只计算一个数据，效果不好，没有batchSize为4时候平滑：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d1b64fd10535b?w=651&h=930&f=png&s=50853)

再把学习率改成1，则发现损失非常高，而调整0.01，则训练时长非常的长。

训练过程中学习率、小批量的大小（batchSize）、迭代整个训练数据的次数（epochs），这几个都是训练过程中需要调整的超参数。

## 七、进行预测

训练好了模型，损失也降得非常低了。下面我们来进行预测。

第一步，将待预测的数据转变为Tensor

第二步，使用训练好的模型来进行预测

第三步，把输出的Tensor转换为普通数据结构并显示

因为模型的输入、输出的数据都是Tensor，为了便于显示，我们还得将它转成普通数据。

具体代码如下：

```js
// 预测
const output = model.predict(tf.tensor([5]));
// 输出预测结果
alert(`如果x为5，那么y为${output.dataSync()[0]}`);
```

最终得到预测结果如图所示：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d1d00d8090d5d?w=558&h=160&f=png&s=6814)

为什么不是13呢？因为我们训练的模型还是有一定损失的，损失并没有降到0。但我们得到的结果已经非常接近于13了。

