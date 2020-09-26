---
layout:     post
title:      "前端机器学习入门笔记8：MNIST数据集的切割与可视化"
subtitle:   ""
date:       2020-08-29 13:11:32
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

从这一篇开始，我们来学习使用卷积神经网络识别手写数字。首先我们来看怎么将MNIST数据集的手写数字图片的像素信息可视化成图片。

### 一、加载MNIST数据集

首先我们在src目录下新建一个data/mnist文件夹，放入MNIST数据集的内容——mnist_images.png（实际上就是一个巨大的雪碧图，上面有非常多的手写数字）以及mnist_labels_uint8（一个存放标签的二进制文件）。

然后，新建src\mnist\data.js文件，内容如下，用于将雪碧图中的内容切成一个个的手写数字小图以及将二进制的标签转换成JS。

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

const IMAGE_SIZE = 784;
const NUM_CLASSES = 10;
const NUM_DATASET_ELEMENTS = 65000;

const TRAIN_TEST_RATIO = 5 / 6;

const NUM_TRAIN_ELEMENTS = Math.floor(TRAIN_TEST_RATIO * NUM_DATASET_ELEMENTS);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

const MNIST_IMAGES_SPRITE_PATH =
    'http://127.0.0.1:8080/mnist/mnist_images.png';
const MNIST_LABELS_PATH =
    'http://127.0.0.1:8080/mnist/mnist_labels_uint8';

/**
 * A class that fetches the sprited MNIST dataset and returns shuffled batches.
 *
 * NOTE: This will get much easier. For now, we do data fetching and
 * manipulation manually.
 */
export class MnistData {
  constructor() {
    this.shuffledTrainIndex = 0;
    this.shuffledTestIndex = 0;
  }

  async load() {
    // Make a request for the MNIST sprited image.
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgRequest = new Promise((resolve, reject) => {
      img.crossOrigin = '';
      img.onload = () => {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;

        const datasetBytesBuffer =
            new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);

        const chunkSize = 5000;
        canvas.width = img.width;
        canvas.height = chunkSize;

        for (let i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
          const datasetBytesView = new Float32Array(
              datasetBytesBuffer, i * IMAGE_SIZE * chunkSize * 4,
              IMAGE_SIZE * chunkSize);
          ctx.drawImage(
              img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width,
              chunkSize);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          for (let j = 0; j < imageData.data.length / 4; j++) {
            // All channels hold an equal value since the image is grayscale, so
            // just read the red channel.
            datasetBytesView[j] = imageData.data[j * 4] / 255;
          }
        }
        this.datasetImages = new Float32Array(datasetBytesBuffer);

        resolve();
      };
      img.src = MNIST_IMAGES_SPRITE_PATH;
    });

    const labelsRequest = fetch(MNIST_LABELS_PATH);
    const [imgResponse, labelsResponse] =
        await Promise.all([imgRequest, labelsRequest]);

    this.datasetLabels = new Uint8Array(await labelsResponse.arrayBuffer());

    // Create shuffled indices into the train/test set for when we select a
    // random dataset element for training / validation.
    this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
    this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS);

    // Slice the the images and labels into train and test sets.
    this.trainImages =
        this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
    this.trainLabels =
        this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
    this.testLabels =
        this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);
  }

  nextTrainBatch(batchSize) {
    return this.nextBatch(
        batchSize, [this.trainImages, this.trainLabels], () => {
          this.shuffledTrainIndex =
              (this.shuffledTrainIndex + 1) % this.trainIndices.length;
          return this.trainIndices[this.shuffledTrainIndex];
        });
  }

  nextTestBatch(batchSize) {
    return this.nextBatch(batchSize, [this.testImages, this.testLabels], () => {
      this.shuffledTestIndex =
          (this.shuffledTestIndex + 1) % this.testIndices.length;
      return this.testIndices[this.shuffledTestIndex];
    });
  }

  nextBatch(batchSize, data, index) {
    const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
    const batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

    for (let i = 0; i < batchSize; i++) {
      const idx = index();

      const image =
          data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
      batchImagesArray.set(image, i * IMAGE_SIZE);

      const label =
          data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
      batchLabelsArray.set(label, i * NUM_CLASSES);
    }

    const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
    const labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);

    return {xs, labels};
  }
}
```

其中，下面两行本来是对应着国外的链接，但是因为众所周知的原因，国内访问不了，所以我们需要本地启动一个静态服务器：

```javascript
const MNIST_IMAGES_SPRITE_PATH =
    'http://127.0.0.1:8080/mnist/mnist_images.png';
const MNIST_LABELS_PATH =
    'http://127.0.0.1:8080/mnist/mnist_labels_uint8';
```

先安装一下http-server：

```sh
npm i http-server -g
```

然后执行：

```sh
hs src/data --cors
```

这样就通过http-server将src/data目录启动成一个可通过[http://127.0.0.1:8080](http://127.0.0.1:8080)访问的静态服务器，而且这个服务器允许跨域访问。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63ef7b1e325744d9a0dc2f8a8e7e128b~tplv-k3u1fbpfcp-zoom-1.image)

我们通过如下代码将MNIST数据集的数据加载进来。

```javascript
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { MnistData } from './data';

window.onload = async () => {
  const data = new MnistData();
  await data.load();
  const examples = data.nextTestBatch(20); // nextTestBatch方法用于加载一些验证集，其参数是加载验证集的个数
  console.log(examples);
}
```

可以看到，labels的shape是[20, 10]，即20个数据，10是0-9共10个数字。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91eef29e021c4381b0eb7ce4d32525c3~tplv-k3u1fbpfcp-zoom-1.image)

如图所示，我们在打印出来的对象的labels上点击右键，然后选择store as global varaiable，把该内容存成一个变量temp1，然后就可以从console中通过`temp1.print()`来打印出labels的数据结构。如下所示：

```
[[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0]]
```

每一个数组代表一条数据，每条数据中有10个值，这10个值中只有一个为1，为1的那个值所对应的下标就是该条数据所代表的值。

xs代表的是输入数据。xs的shape是[20,784]，表示也是20条数据，每条数据有784个特征值。为什么是784呢？因为这里的输入数据是图片的信息，这里MNIST数据集的图片是用28 * 28 像素表示的，而且因为像素是黑白的，所以是 28 * 28 * 1 = 784。如果是RGB的话，就还得乘以3，但是因为这里是黑白的图片，所以只需要乘以1。


### 二、从数据中切割出每一个手写数字的像素值的数据

那么，怎么从xs中切割出来每一个手写数字的像素值的数据呢？

我们需要先介绍下TensorFlow.js的slice方法的使用。

```javascript
const x = tf.tensor1d([1, 2, 3, 4]);
x.slice([1], [2]).print(); // [2, 3]
```

slice的第一个参数是begin，上面传的是[1]，表示从第一维的第2项开始。slice的第二个参数是size，表示截取多长，上面传的是[2]，表示截取长度是2，所以得到的结果就是[2, 3]。

```javascript
const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
x.print(); // [[1,2], [3,4]]
x.silce([1, 0], [1, 2]);
```

上面对于[[1,2], [3,4]]这样一个Tensor，从[1,0]开始，就是从第一维的第2项第二维的第一项（实际上就是一种数组下标作为坐标索引），也就是[[1,2],[3,4]]里面的3开始。尺寸为[1, 2]，即第一维取1项，第二维取两项，所以得到的就是[3,4]。

了解了slice的用法，我们就可以用它来切割得到每一个手写数字的像素信息了。

```javascript
for(let i = 0; i < 20; i++) {
    const imageTensor = example.xs.slice([i, 0], [1, 784]);
}
```
但是，因为这里操作的数据量比较大。在操作Tensor的时候，是调用GPU加速的，会留下一些内存，TensorFlow.js中有一个`tidy`方法可以清除掉一些内存，避免出现内存泄漏。我们加上它：

```javascript
const imageTensor = tf.tidy(() => {
      return example.xs.slice([i, 0], [1, 784]);
});
```

### 三、把切割得到的每个手写数字的像素数据转成图片显示到页面上

首先，我们将上面得到的图片信息的Tensor进行reshape一下，转成28 * 28像素的黑白图片（灰度图）。

```javascript
const imageTensor = tf.tidy(() => {
      return examples.xs.slice([i, 0], [1, 784])
        .reshape([28, 28, 1]);
});
```

接下来我们就通过TensorFlow.js的`.browser.toPixels`方法，将其转成一张图片显示到页面上。这个方法接收两个参数，第一个参数是一个图片信息的Tensor，第二个参数是一个HTML Canvas元素。

```javascript
const canvas = document.createElement('canvas');
canvas.width = 28;
canvas.height = 28;
canvas.style.margin = '4px';
await tf.browser.toPixels(imageTensor, canvas);
document.body.appendChild(canvas);
```

渲染得到的结果如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eae8da22fcb45eda4580e7e0c1882a8~tplv-k3u1fbpfcp-zoom-1.image)

### 四、将图片的渲染融入tf-vis的可视化面板中

代码如下：

```javascript
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { MnistData } from './data';
window.onload = async () => {
  const data = new MnistData();
  await data.load();
  const examples = data.nextTestBatch(20); // nextTestBatch方法用于加载一些验证集，其参数是加载验证集的个数
  console.log(examples);
  const surface = tfvis.visor().surface({ name: '输入示例' });
  for(let i = 0; i < 20; i++) {
    const imageTensor = tf.tidy(() => {
      return examples.xs.slice([i, 0], [1, 784])
        .reshape([28, 28, 1]);
    });
    const canvas = document.createElement('canvas');
    canvas.width = 28;
    canvas.height = 28;
    canvas.style.margin = '4px';
    await tf.browser.toPixels(imageTensor, canvas);
    surface.drawArea.appendChild(canvas);
  }
}
```

主要增加了第9行（`const surface = tfvis.visor().surface({ name: '输入示例' });`）和修改了第20行，将第20行从`document.body.appendChild(canvas);`改成了`surface.drawArea.appendChild(canvas);`。最终得到的效果如下：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/01db99709d9a45fd9cabcb23eea0fa75~tplv-k3u1fbpfcp-zoom-1.image)

