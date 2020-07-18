---
layout:     post
title:      "前端机器学习入门笔记1：简介"
subtitle:   ""
date:       2020-06-06 21:23:11
author:     "Paian"
catalog: true
tags:
    - 前端AI
    - TensorFlow.js
---

## 一、为什么要学习机器学习？

人类曾经经历了三次技术革命。第一次工业革命：蒸汽技术革命；第二次工业革命是电力技术革命；第三次工业革命是计算机与信息技术革命。现在正处于第四次工业革命，则是众多新兴几技术普及的革命，包括物联网、大数据、云计算、人工智能、机器学习。第四次工业革命完全离不开人工智能。

其实，大家在生活中已经用到一些AI的技术了，比如，人脸识别、语音助手。人工智能的理论研究已经做得较为成熟了，但是，现在有一个困境，那就是还没有将研究成果大量地去落地。而落地的过程，就需要大量前端工程师来做，为什么呢？我们知道，**前端是离用户最近的一类工程师，比如网页、APP、小程序、TV，甚至物联网端上的种种应用程序，都需要前端来编写。很需要前端工程师利用它们熟悉的语言，来将人工智能技术变成各种各样的实际应用**，改变生活，改变世界。虽然现在已经有一些AI的应用，但仍然有一大部分行业等待着AI的介入与改变。也正是基于这个原因，前几年诞生了TensorFlow.js。它就是基于前端工程师最熟悉的语言——JavaScript来开发浏览器和Node.js程序的。比如说像你画我猜这样的智能小游戏、淘宝美妆、闲鱼检测用户上传的有东西有哪些物品等功能，都可以用Tensorfow.js来完成。

**在这样的背景下，程序员必须要学习人工智能和机器学习，才能赶上时代的步伐，因为在不久的将来，程序员都是基于机器学习模型来进行编程的。如果你掌握了这些技术，就意味着你手握通往未来的船票**，而且用人单位在看你的简历的时候，你也比较容易从众多的简历中脱颖而出，更容易拿到Offer，甚至拿到更好的Offer。在职场晋升中也是如此，如果你较早学习了这些新技术，而且结合工作业务中的场景应用到其中的话，你的老板也很可能对你刮目相看。

但是，前端工程师在学习人工智能的时候，也确实有很多困惑。比如，前端能不能学人工智能，这个门槛会不会很高啊，能学会吗？没有合适的资料，如何才能入门呢？我们知道，现在关于JavaScript人工智能的资料都是一些零碎的文章，而且没有适合初学者入门的资料，往往一下子抛出一堆的名词，大家一看就晕掉了。还有一个困惑就是，没有形成该怎么学习的知识体系，没有一个学习的路径指引。而且更重要的是，我们即便对人工智能了解了一些皮毛，也无法真实地做项目。最关键是没有一个领路人。我们就是要带你入门AI领域。

前端学习机器学习，应该学些什么呢？

- 理论知识：机器学习、神经网络、Tensorfow.js

- 基础案例：线性回归、逻辑回归、XOR（抑或）、IRIS

- 实战案例：手写数字识别、商标识别、语音识别（声控轮播图）

- 神经网络模型：从的单个神经元到深度神经网络

- 神经网络模型算法：MSE/log/Cross

- Entropy等损失函数、Sigmoid/Relu/Softmax等激活函数、SGD/Adam等优化器算法。

- 炼丹的最佳实践：归一化、欠（过）拟合、训练数据和训练过程的可视化、模型的各种度量单位（如损失、准确度，等等）

- 模型的迁移学习（把别人训练好的模型拿一部分过来）、保存、加载、转换。

所谓炼丹，是算法工程师自嘲的一种说法。由于训练模型跟古代的道士炼丹的过程非常像，所以就戏称它为炼丹。


## 二、机器学习简介

### 1、机器学习是什么？

**定义1：机器学习是对能通过经验改进的计算机算法的研究。**

我们来拆解一下这句话，机器学习是什么呢，他是一种研究，这种研究的研究对象是什么呢？是计算机算法。这种算法有什么特点呢？它是能通过经验自动改进的。

**定义2：机器学习是用数据或以往的经验，以此优化计算机程序的性能标准。**

它也强调了数据或以往的经验。

这些定义都有些抽象。为了帮助大家理解，我们来看一些更形象的例子吧。

**机器学子例子1：中世纪男子平均脚长**

早在中世纪，数学家就已经利用经验和数据来解决实际问题了，使用16名男子的平均脚长来估算男子的平均脚长。

**机器学习例子2：线性回归**

你给我一个连续的输入，比如x轴方向上的数值，我会给你一个连续的输出（y轴上对应的值）

![](https://user-gold-cdn.xitu.io/2020/6/6/17289f904b563ce4?w=600&h=397&f=png&s=107876)

比如，根据上图中蓝色的点，我们可以划出来一条线。根据这条线所代表的函数关系，对于x轴上的任何值，我们都可以给出y轴上的结果。

这可以用来解决各种实际问题了，比如根据身高预测体重，预测房价走势等等。

**机器学习例子3：逻辑回归**

逻辑回归的输入也是一个连续的值，但是它的输出是一个概率。

比如，你给我一堆邮件的数据，经过训练后，我得到模型，然后你再给我一封邮件，我能告诉你这封邮件是垃圾邮件的概率有多大。逻辑回归问题同样可以用机器学习来解决的。

![](https://user-gold-cdn.xitu.io/2020/6/6/17289fb217691996?w=500&h=372&f=png&s=96522)

比如说，上图你给出了一堆黄色的点和一堆蓝色的点，经过训练，我们可以画一条线，线的一边是黄色点、另一边是蓝色的点。逻辑回归还有一个特点就是，相比于线性回归是一个输入（x坐标）来说，这里是两个输入（点的x坐标和y坐标）。那么既然我们可以对两个输入进行处理，就可以对多个输入进行处理。比如，解决图片的分类问题。为什么呢？因为图片在计算机中就是大量的像素点，像素点就是数值而已。前面的线性回归和逻辑回归，我们可以对一个输入数值进行预测、也可以对两个输入数值进行预测，那么对于一堆输入数值，我们也是可以进行预测的。

**机器学习例子4：图片分类**

这样，我们就可以获得一张图片是某某物体的概率有多大。

![](https://user-gold-cdn.xitu.io/2020/6/6/1728a054884a73b9?w=500&h=384&f=png&s=468940)

**机器学习例子5：语音助手**

OK，既然图片都可以分类，那么语音是不是也一样呢？因为语音在计算机里不过也是一堆数字罢了。只要我们给计算机足够多的声音数据和足够多的标签，就能训练出识别语音的模型。

看完这些例子，对于机器学习是不是有一些更具体地认识了呢？其实机器学习的关键字就是数据和以往的经验。

### 2、**为何要用机器学习，能不能不用机器学习？**

**第一个理由是，有些棘手问题只能用机器学习来解决**，比如，给你一张图片，让你判断里面有没有一只猫。对于这样一个问题，即便是世界上最聪明的程序员，也没有办法通过编写规则的方式来完成。因为猫的品种多种多样、猫的姿态多种多样，实在没有办法编写那么海量的规则。

**第二个理由是，获取数据比编写规则更加容易。**

**第三是GPU等计算能力的显著提升，使得模型训练可以较快地看到结果，从而大大提高了机器学习的可用性。**

### 3、机器学习如何运作？

- 神经网络（重点）

- 决策树、支持向量机、贝叶斯分类器、强化xuexi

## 三、神经网络简介

什么是神经网络？这里指的是人工神经网络。

人工神经网络是一种运算模型（就是输入输出的映射），由大量的节点（或称神经元）之间相互连接构成。别看名字显得复杂，实际上它只是一种输入到输出的映射而已。

神经网络例子：

![](https://user-gold-cdn.xitu.io/2020/6/6/17289fc0e540c4ea?w=757&h=514&f=png&s=243043)

如上图所示：

形象对于“学历/家境/五官/身材”有相应的权重值；

学历 X 相应的权重值 + 家境 X 相应的权重值 + 五官 X 相应的权重值  + 身材 X 相应的权重值 = 形象值

学历 X 相应的权重值 + 家境 X 相应的权重值 + 五官 X 相应的权重值  + 身材 X 相应的权重值 = 品质值

学历 X 相应的权重值 + 家境 X 相应的权重值 + 五官 X 相应的权重值  + 身材 X 相应的权重值 = 有趣值

学历 X 相应的权重值 + 家境 X 相应的权重值 + 五官 X 相应的权重值  + 身材 X 相应的权重值 = 财富值

形象 X 相应的权重值 + 有趣 X 相应的权重值 + 品质 X 相应的权重值  + 财富 X 相应的权重值 = 满意度

当然，神经网络不可能这么简单的。它还要处理很多问题，比如：

**每个人的眼光高低不同，一般人眼中的窈窕淑女，对于某君来说可能“只道是寻常”，这就需要在一般值的基础上，再加、减去一个插值，我们管它叫偏置；**

**有些人认为，学历只要在本科及以上，再往上增加，就没什么差别了，这就是一种非线性变化了；有些人认为，形象得分越高越好；有些人认为形象太好了，可能把时间都花在了形象上，学习的时间就少了，内涵就会差一点或者是安全感变低了，因此形象太高反而减分，这里就有一个激活函数，用来做一些非线性变化；**

大致流程如下：

**神经元会让上一层的输入乘上各自的权重，然后相加，再加上偏置，得出来的值经过激活函数算一遍，然后得到输出。**

总结：

- **每个神经元里存储着若干权重（weight）、偏置（bias）和一个激活函数（activation）；**

- **输入乘上权重加上偏置，经过激活函数得到输出；**

- **激活函数用于添加一些非线性变化；**

- **神经网络通常包括一个输入层，若干隐藏层，一个输出层；**

- **输入层通常不计入神经网络的层数中。**


## 四、神经网络的训练

### 1、什么是神经网络的训练？

给大量的输入和输出，算出神经网络里所有神经元的权重和偏置，然后给定新的输入，即可以算出新的输出。

**在机器学习里，输入输出被称为特征和标签，大量输入输出被称为训练集。**

给1000个相亲对象的数据（特征）和对应的满意程度（标签），训练完后，给一份新的相亲对象的数据，就可以判断满意度了。

### 2、如何训练神经网络？

**第一步，初始化：随机生成一些权重和偏置（先猜一个）；**

**第二步，计算损失：给定特征，计算出标签，得到它与真实标签差得多远（这个差距就是损失）；**

**第三步，优化：微调权重和偏置，使损失变小**

不断重复第二步和第三步，使损失变小，直到得到满意结果。

所谓微调，实际上用的是微积分的链式法则。

**前向传播：将训练数据的特征送入神经网络，得到标签，是从前面的层到后面的层。**

**反向传播：是用于优化，先从后面的层的权重开始调整，然后依次往前面的层进行调整。**

**简单地理解：为什么优化的时候要反向传播呢？因为如果你要调整倒数第三层的参数，你就需要知道倒数第二层的参数往哪个方向才是正确的。**

几个训练中相关的问题：

### 3、如何计算损失？

可以使用现成的损失函数，有许多算法专家已经帮我们提供好了。

本课程涉及的损失函数：均方误差、对数损失、交叉熵……别被名字吓到了，终归不过是用于计算损失的函数而已。

了解原理即可，工作中可以直接从第三方库中调用。我们这们课就是从TensorFlow.js中调。

### 4、如何优化？

使用优化器。

本课程的优化器涉及随机梯度下降（SGD）、Adam。

了解原理即可，工作中可以直接从第三方库中调用。我们这们课就是从TensorFlow.js中调。

如果有的伙伴有志于不成为“调包侠”，那么也可以自行去深入了解下它的原理。但也千万不要轻视应用的价值。调包，是把优秀的技术落地到实际的应用场景中不可缺少的一部分。


## 五、TensorFlow.js简介

TensorFlow.js是一个用JavaScript实现的机器学习库。

有了这个库，可以直接在浏览器和Node.js中使用机器学习技术了。

这不仅便于前端工程师学习机器学习技术，而且可以使用浏览器里面更多的交互能力（手机摄像头的能力、录音的能力，比如，这样开发一些人工智能的游戏就非常方便了），也能将算力分散到客户端中，这是后端和算法不具备的优势。

另外，由于不用调用服务端，所以我们的实时性也更好了，不需要考虑网络速度带来的延迟。

TensorFlow.js的具体功能：

- 运行现有模型（比如，在浏览器中调用算法工程师训练好的现有模型）
- 重新训练现有模型
- 使用JavaScript从零开发机器学习模型

TensorFlow.js例子演示：

寻找Emoji：https://youtube.com/watch?v=jr3q_9pJBr8

声音命令：http://storage.googleapis.com/tfjs-speech-model-test/2019-01-03a/dist/index.html

使用预训练模型进行图片分类（使用训练好的模型）：http://storage.googleapis.com/tfjs-examples/mobilenet/dist/index.html
可以识别上传的图片，如钢琴、咖啡杯等1000种分类的内容。

使用摄像头控制吃豆人（重新训练现有模型）：摄像头前，人举着一个纸片。制片被举到上面，吃豆人就往上走，被举到下面就往下走，举到左面就往左走，举到右面就往右走。
http://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html

训练了眼皮子怎么动来让自己帮它自动翻页

## 六、安装TensorFlow.js

1、使用script标签引入，缺点是开发中使用其API时，没有智能提示

src/setup/index.html

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js">
</script>
<script>
    var a = tf.tensor([1, 2]);
    console.log(a);
</script>
```
文档可参考这里：https://tensorflow.google.cn/js/tutorials/setup

其log出来的tensor的数据结构如下：

![](https://user-gold-cdn.xitu.io/2020/6/20/172d0825a65b65f2?w=865&h=363&f=png&s=24357)

2、使用NPM安装，这样开发中使用其API时，就会有智能提示

```bash
npm i @tensorflow/tfjs
```

然后安装parcel打包工具，这是一个急速零配置的webpack打包工具：

```bash
npm i -g parcel-bundler
```

安装后，只需要执行`parcel setup/index2.html`就能启动一个开发服务器了，在浏览器中访问 http://localhost:8080 即可看到效果。

3、在Node.js中使用：

安装带有原生C++绑定的TensorFlow.js

```npm i @tensorflow/tfjs-node```

因为它底层用的是C++，所以运行速度是不错的。

（仅限Linux）如果您的系统具有支持CUDA的NVIDIA®GPU，请使用GPU包以获得更高的性能。这个速度更快。

```
npm i @tensorflow/tfjs-node-gpu
```

4、安装纯JavaScript版本

```
npm install @tensorflow/tfjs
```

这个是性能最慢的选项。

然后我们再新建一个页面，再在页面中建一个引入它的JS文件，如下：

src/setup/index2.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <script type="module" src="index2.js">
  </script>
</body>
</html>
```

src/setup/index2.js

```javascript
import * as tf from "@tensorflow/tfjs";
const tens = tf.tensor([1, 2]);
console.log(tens);
window.onload = () => {
  document.body.innerHTML = JSON.stringify(tens);
}
```

因为需要打包，所以我们先安装一个零配置打包工具pacel，安装命令如下:

```sh
npm install -g parcel-bundler
```

安装完成后，通过parcel打包命令`parcel src/setup/index2.html -p 8080`打包，即可在看到结果页面。

