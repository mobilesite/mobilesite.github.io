---
layout:     post
title:      "前端机器学习入门笔记9：利用卷积神经网络识别手写数字"
subtitle:   ""
date:       2020-09-26 17:34:12
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

首先，需要说明一下，本文的代码是基于[上篇文章（MNIST数据集的切割与可视化）](https://juejin.im/post/6866341231916990471)的代码的基础上进行的。

### 一、定义模型结构：卷积神经网络

#### 1、为什么要使用卷积神经网络呢？

在前面我们学习过逻辑回归，最初是使用两个特征，后来在学习鸢尾花分类的时候，特征数量就变成了4个。那既然特征数量可以增加，那么，我们将图片的像素全部都摊平作为多个特征，用逻辑回归时用的多层神经网络，不是也可以解决我们现在这个识别手写数字的问题吗，为什么要用卷积神经网络呢？

的确，这样做是可以的，而且也有人这么做过。但是，这样做有个缺点————

图片信息的数据量大，运算量大，比如一张200 x 200像素的小小的彩色图片，就有 200 x 200 x 3 = 120000 个特征，这样处理起来效率就非常低。而且特征这么多，容易导致神经网络结构过于复杂，从而出现过拟合。

所以，我们要采用一种新的神经网络来解决这一问题，即卷积神经网络。卷积神经网络能模拟人类的视觉处理流程，高效提取特征，可以大幅度地减少运算量。

那么人的视觉处理流程是怎么样的呢？首先是看到最细小的纹路这些小特征，然后把这些小特征再拼接成大特征，然后再把大特征拼接成更大的特征，以此类推，最终把它反馈给人脑的神经元，我们就知道这个物体是什么了。而且，这个过程是瞬间完成的。卷积神经网络也模拟了这样一个流程。

#### 2、卷积神经网络的层。包括三层：

**1）卷积层：卷积层是用来提取特征的**

跟着[Imager Kernerls](https://setosa.io/ev/image-kernels/)了解卷积运算。
Imager Kernerls是一个小的矩阵，用于施加一些效果，例如您可能在Photoshop或Gimp中发现的效果，例如模糊，锐化，勾勒轮廓或压花。它们还用于机器学习中的“特征提取”，这是一种确定图像最重要部分的技术。在这种情况下，该过程通常被称为“卷积”。

使用多个卷积核（filter/kernal）对图像进行卷积操作，逐个对图像扫描一遍。

卷积层有权重需要训练，卷积核算就是权重。

**2）池化层：最大池化层用于提取最强的特征。**

它不是必须的，属于锦上添花的优化。扩大感受的视野，减少计算量。减少计算量，加快收敛速度。

**3）全链接接层：作为输出层**

定义模型结构的代码如下：

其中，我们进行了两轮的特征提取。

```javascript
const model = tf.sequential();

/**
 * 先进行第一轮特征提取
 */
// 卷积层
model.add(tf.layers.conv2d({
  inputShape: [28, 28, 1],
  kernelSize: 5,
  filters: 8,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));
// 最大池化层
model.add(tf.layers.maxPool2d({
  poolSize: [2, 2],
  strides: [2, 2]
}));
/**
 * 再进行第二轮特征提取
 */
// 卷积层
model.add(tf.layers.conv2d({
  kernelSize: 5,
  filters: 16,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));
// 最大池化层
model.add(tf.layers.maxPool2d({
  poolSize: [2, 2],
  strides: [2, 2]
}));
// 把高维的特征图转化成一维的
model.add(tf.layers.flatten());
// 全链接层
model.add(tf.layers.dense({
  units: 10,
  activation: 'softmax',
  kernelInitializer: 'varianceScaling'
}));
```

### 二、训练模型

1、设置损失函数和优化器

相应的代码如下：

```jvascript
// 设置损失函数和优化器
model.compile({
  loss: 'categoricalCrossentropy', // 交叉熵
  optimizer: tf.train.adam(), // 使用adam优化器
  metrics: ['accuracy'] // 可以看到准确度
});
```

2、准备训练集和验证集

这里需要注意的一点就是留意shape的转换。在下面的代码中有详细的注释。不做赘述。

相应的代码如下：

```javascript
// 准备训练集
// 把Tensor操作放在tidy里面，这样中间的Tensor就会被清除掉，从而不会驻留在内存中影响性能
const [trainXs, trainYs] = tf.tidy(() => {
  const d = data.nextTrainBatch(1000);
  console.log(d); // 发现是shape [1000, 784]，而上面我们定义的模型需要的数据shape是[28,28,1]，所以需要reshape一下
  return [
    d.xs.reshape([1000, 28, 28, 1]), // 1000张图片，28 * 28像素的，灰度图片
    d.labels
  ];
});

// 准备验证集
const [testXs, testYs] = tf.tidy(() => {
  const d = data.nextTestBatch(200);
  return [
    d.xs.reshape([200, 28, 28, 1]), // 用200张图片
    d.labels
  ];
});

```

3、进行模型训练

```javascript
// 训练模型
await model.fit(trainXs, trainYs, {
  validationData: [testXs, testYs],
  batchSize: 500,
  epochs: 50,
  callbacks: tfvis.show.fitCallbacks({
      name: '训练效果'
    },
    ['loss', 'val_loss', 'acc', 'val_acc'], {
      callbacks: ['onEpochEnd']
    }
  )
});
```

至此，得到的训练效果如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59b1600fe69346359d5588005a900397~tplv-k3u1fbpfcp-zoom-1.image)


### 三、进行预测

#### 1、编写前端界面，输入待预测的数据

首先，在src\mnist\index.html上添加一个canvas画布和两个button。

```html
<canvas width="300" height="300" style="border: 2px solid #666;"></canvas>
<br>
<button onclick="window.clear();" style="margin: 4px;">清除</button>
<button onclick="window.predict();" style="margin: 4px;">预测</button>
```

接下来，我们实现画布的清除、初始化以及画布上输入手写数字的交互逻辑。

```javascript
const canvas = document.querySelector('canvas');
canvas.addEventListener('mousemove', (e) => {
  if (e.buttons === 1) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 255, 255)';
    ctx.fillRect(e.offsetX, e.offsetY, 25, 25);
  }
})
window.clear = () => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(0,0,0)';
  // 给整个画布铺上黑底
  ctx.fillRect(0, 0, 300, 300);
}

// 初始化的时候也给铺上黑底
clear();
```

#### 2、将输出的Tensor转为普通数据并显示

这里，我们需要进行一系列的数据处理动作。

**首先，需要将Canvas对象转成Tensor。**

Tensorflow给我们提供了把Canvas对象转成Tesnsor的方法：`tf.browser.fromPixels(canvas)`。

**其次，然后我们需要将图的大小进行转化。**

可以通过`tf.image.resizeBilinear`方法，其第一个参数是待转换的Tensor，第二个参数是要转成的目标大小（这里是28*28像素，第三个参数是AlignCorners，我们设置为true）。

**第三，我们还要将彩色图片变成黑白图片。**

我们用`.slice([0, 0, 0], [28, 28, 1])`。

**第四，还需要对数据进行归一化。**

用`.toFloat().div(255)`。

**最后，这个shape要reshape成模型所需要的shape。**

通过`reshape([1, 28, 28, 1])`完成。

具体代码如下：

```javascript

return tf.image.resizeBilinear(
  tf.browser.fromPixels(canvas),
  [28, 28],
  true
)
.slice([0, 0, 0], [28, 28, 1])
.toFloat().div(255)
.reshape([1, 28, 28, 1]);
```

#### 3、使用训练好的模型进行预测

预测实现代码如下：

```javascript
window.predict = () => {
    // 进行数据处理
    const input = tf.tidy(() => {
      return tf.image.resizeBilinear(
        tf.browser.fromPixels(canvas),
        [28, 28],
        true
      )
      .slice([0, 0, 0], [28, 28, 1])
      .toFloat().div(255)
      .reshape([1, 28, 28, 1]);
    });
    // 进行预测，.argMax(1)是拿到最大的那个值
    const pred = model.predict(input).argMax(1);
    alert(`预测结果为${pred.dataSync()[0]}`);
}
```

如下图所示，我们输入数字6，预测的结果如弹窗所示。这样，我们就实现了对手写数字的识别。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471a0e4e733140b1be750cfb45f57870~tplv-k3u1fbpfcp-zoom-1.image)
