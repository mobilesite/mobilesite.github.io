---
layout:     post
title:      "《深度学习基础》学习笔记3：决策树（decision tree）算法"
subtitle:   ""
date:       2017-10-07 12:34:17
author:     "Paian"
catalog: true
tags:
    - 深度学习
    - 学习笔记
---
## 《深度学习基础》学习笔记3：决策树（decision tree）算法

### 第一节 决策树（decision tree）算法

#### 1、学习具体算法之前，我们先了解一下机器学习中分类和预测算法的怎么评估：

- 准确率
- 速度：算法复杂度是不是很高
- 强壮性：数据中有一些噪音或有一些关键值缺失的时候，是否依然表现得好
- 可规模性：一个算法在大规模数据的情况下，会不会出现问题
- 可解释性：能否比较好地解释算法的结果与我们观察、分析的结果是相符的等

#### 2、什么是决策树/判定树（decision tree)?

判定树是一个类似于流程图的树结构：其中，每个内部结点表示在一个属性上的测试，每个分支代表一个属性输出，而每个树叶结点代表类或类分布。树的最顶层是根结点。

它是机器学习中分类方法中的一个重要算法。

### 3、构造决策树的基本算法

（1）熵（entropy）概念：

信息和抽象，如何度量？

1948年，香农提出了 “信息熵(entropy)”的概念，一条信息的信息量大小和它的不确定性有直接的关系，要搞清楚一件非常非常不确定的事情，或者是我们一无所知的事情，需要了解大量信息==>信息量的度量就等于不确定性的多少。

例子：猜世界杯冠军，假如一无所知，猜多少次？

每个队夺冠的几率不是相等的。

比特(bit)来衡量信息的多少。

变量的不确定性越大，熵也就越大。

```
-（p1*logp1 + p2*logp2 + ... + p32*logp32）
```

（2）决策树归纳算法 （ID3）

1970-1980， J.Ross. Quinlan提出的。

如何选择属性判断结点？

有一种标准是信息获取量(Information Gain)：Gain(A) = Info(D) - Infor_A(D)，即通过A来作为节点分类获取了多少信息。

下面是一个不同年龄段的人是否购买电脑的例子。

| RID  |     age     | income | student | credit_rating | class: buys_computer |
| :--: | :---------: | :----: | :-----: | :-----------: | :------------------: |
|  1   |    youth    |  high  |   no    |     fair      |          no          |
|  2   |    youth    |  high  |   no    |   excellent   |          no          |
|  3   | middle_aged |  high  |   no    |     fair      |         yes          |
|  4   |   senior    | medium |   no    |     fair      |         yes          |
|  5   |   senior    |  low   |   yes   |     fair      |         yes          |
|  6   |   senior    |  low   |   yes   |   excellent   |          no          |
|  7   | middle_aged |  low   |   yes   |   excellent   |         yes          |
|  8   |    youth    | medium |   no    |     fair      |          no          |
|  9   |    youth    |  low   |   yes   |     fair      |         yes          |
|  10  |   senior    | medium |   yes   |     fair      |         yes          |
|  11  |    youth    | medium |   yes   |   excellent   |         yes          |
|  12  | middle_aged | medium |   no    |   excellent   |         yes          |
|  13  | middle_aged |  high  |   yes   |     fair      |         yes          |
|  14  |   senior    | medium |   no    |   excellent   |          no          |

$$Info(D) = -\frac{9}{14}log_2(\frac{9}{14}) - \frac{5}{14}log_2(\frac{5}{14}) = 0.940 bits$$

$$Info_age(D) = \frac{5}{14}(-\frac{2}{5}log_2\frac{2}{5} - \frac{3}{5}log_2\frac{3}{5}) +  \frac{4}{14}(-\frac{4}{4}log_2\frac{4}{4} - \frac{0}{4}log_2\frac{0}{4}) +  \frac{5}{14}(-\frac{3}{5}log_2\frac{3}{5} - \frac{2}{5}log_2\frac{2}{5}) = 0.694 bits$$

这样就可以算出以age为节点进行分类的信息获取量：

$$Gain(age) = Info(D) - Info_age(D)  = 0.940 - 0.694 = 0.246 bits$$

类似地，可得：Gain(income) = 0.029；Gain(student) = 0.151；Gain(credit_rating)=0.048。

通过这几个信息获取量的比较，可以看出Gain(age) 最大。所以，选择age作为第一个根节点。

重复以上步骤，就可以构建出决策树。

![make-up-decision-tree](/img/in-post/make-up-decision-tree.png)

总结一下ID3算法：

- 树以代表训练样本的单个结点开始（步骤1）。
- 如果样本都在同一个类，则该结点成为树叶，并用该类标号（步骤2 和3）。
- 否则，算法使用称为信息增益的基于熵的度量作为启发信息，选择能够最好地将样本分类的属性（步骤6）。该属性成为该结点的“测试”或“判定”属性（步骤7）。在算法的该版本中，
- 所有的属性都是分类的，即离散值。连续属性必须离散化（即设定取值范围分成不同的段）。
- 对测试属性的每个已知的值，创建一个分枝，并据此划分样本（步骤8-10）。
- 算法使用同样的过程，递归地形成每个划分上的样本判定树。一旦一个属性出现在一个结点上，就不必该结点的任何后代上考虑它（步骤13）。
- 递归划分步骤仅当下列条件之一成立停止：

(a) 给定结点的所有样本属于同一类（步骤2 和3）。

(b) 没有剩余属性可以用来进一步划分样本（步骤4）。在此情况下，使用多数表决（步骤5）。
这涉及将给定的结点转换成树叶，并用样本中的多数所在的类标记它。替换地，可以存放结
点样本的类分布。

(c) 分枝

$test_attribute = a_i$ 没有样本（步骤11）。在这种情况下，以 samples 中的多数类
创建一个树叶（步骤12）

#### 4、其他算法：

C4.5:  Quinlan

Classification and Regression Trees (CART): (L. Breiman, J. Friedman, R. Olshen, C. Stone)
共同点：都是贪心算法，自上而下(Top-down approach)
区别：属性选择度量方法不同： C4.5 （gain ratio), CART(gini index), ID3 (Information Gain)

#### 5、如何处理连续性变量的属性？

#### 6、树剪枝叶 （避免overfitting)

- 先剪枝
- 后剪枝

#### 7、决策树的优缺点：

优点：直观，便于理解，小规模数据集有效

缺点：处理连续变量不好（分段的分法对结果影响较大）；类别较多时，错误增加的比较快；可规模性一般

### 第二节 决策树算法的应用

#### 1、Python机器学习的库：scikit-learn

（1）scikit-learn特性：

可进行简单高效的数据挖掘和机器学习分析；

对所有用户开放，根据不同需求高度可重用性；

基于Numpy、SciPy和matplotlib这几个Python中非常强大的用于科学计算的package；

是开源的，可达到商用级别的可靠性，获得BSD许可的。

（2）scikit-learn覆盖问题领域：

分类（classification)，回归（regression)，聚类（clustering)，降维(dimensionality reduction)，模型选择(model selection)，预处理(preprocessing)

（3）使用用scikit-learn

- 安装scikit-learn:

通过pip、easy_install或者直接下载其对应的windows installer安装包进行安装。

- 安装必要的依赖package：numpy、SciPy和matplotlib。

#### 2、Anaconda

相比于单独安装scikit-learn及其依赖，更推荐使用Anaconda（其中包含numpy、SciPy、scikit-learn等科学计算常用package，它也包含了Python的interpreter），到https://www.anaconda.com/download/下载安装。因为官网下载较慢，国内用户建议到https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/镜像中下载。把Anaconda安装到C:\Anaconda3目录下。

安装好Anaconda之后，在开始菜单中打开Anaconda Navigator （导航），在Environments（管理版本和包的）可以看到numpy, scipy, scikit-learn, matplotlib等库都已经安装好了。

安装完之后，将C:\Anaconda3和C:\Anaconda3\Scripts加入到系统环境变量中，以便于能够在控制台中使用conda命令。

关于Anaconda和conda的详细使用，参见：http://www.jianshu.com/p/2f3be7781451#

#### 3、GraphViz（Graph Visualization）

下载：http://www.graphviz.org/Download..php

把它安装到C:\Program Files (x86)\Graphviz2.38\，然后把C:\Program Files (x86)\Graphviz2.38\bin目录添加到系统环境变量Path中。这样就可以在控制台中通过命令来用GraphViz将dot文件转换成pdf文件了。

```
dot -Tpdf 待转换的文件.dot -O 转换后的输出文件.pdf
```

#### 4、例子：实现一下上一节中讲到的预测不同年龄段的人是否会购买电脑的例子。

首先我们新建一个项目LearnMachineLearning，为它新建一个interpreter，Interpreter Name: Anaconda3，Interpreter Executable: C:\Anaconda3\python.exe

在其中新建一个PyDev Module，名字为TestDecisionTree，代码如下：

```
#-*- coding utf-8 -*-
from sklearn.feature_extraction import DictVectorizer
import csv
from sklearn import tree
from sklearn import preprocessing
from sklearn.externals.six import StringIO

# Read in the csv file and put features into list of dict and list of
# class label
data = open(r'TestDecisionTreeBuyComputer.csv', 'r')
reader = csv.reader(data)
headers = next(reader)

print('\nheaders:', '\n', headers, '\n')

featureList = []
labelList = []

for row in reader:
 labelList.append(row[len(row) - 1])  # 把每一行最后的那个class label添加到labelList中
 rowDict = {}
 for i in range(1, len(row) - 1):
     rowDict[headers[i]] = row[i]  # 把列表中的每一行转成一个字典，添加到featureList中,之所以转换成这种形式，是因为转成这样可以利用scikit-learn给我们提供的DictVectorizer来将它直接转换成数字向量的形式
 featureList.append(rowDict)

print('labelList:', '\n', labelList, '\n')
print('featureList:', '\n', featureList, '\n')

# Vectorize class labels
lb = preprocessing.LabelBinarizer() #binarize是二值化的意思
dummyY = lb.fit_transform(labelList)
print('dummyY:', '\n', dummyY, '\n')

# Vectorize features
vec = DictVectorizer()
dummyX = vec.fit_transform(featureList).toarray()
print('dummyX:', '\n', dummyX, '\n')

# Using decision tree for classification
clf = tree.DecisionTreeClassifier(criterion='entropy') #classifier是指分类器，criterion标准，entropy熵
clf = clf.fit(dummyX, dummyY)
print('clf:', '\n', clf, '\n')

# Visualize model
print('vec.get_feature_names():', '\n', vec.get_feature_names(), '\n')
with open("TestDecisionTreeBuyComputerInformationGainOri.dot", 'w') as f:
 f = tree.export_graphviz(clf, feature_names=vec.get_feature_names(), out_file=f)

oneRowX = dummyX[0, :]
print("oneRowX:", '\n', oneRowX, '\n')

# 拿一行数据做一点改动造出来一行新数据，对这行新数据进行预测，预测他会不会买电脑
newRowX = oneRowX
newRowX[0] = 1
newRowX[2] = 0
print('newRowX:', '\n', newRowX, '\n')

print('newRowX.reshape(1, -1):', '\n', newRowX.reshape(1, -1), '\n')
predictedY = clf.predict(newRowX.reshape(1, -1))
print('预测结果predictedY:', '\n', predictedY, '\n')
```

执行结果：

> headers:
>  ['RID', 'age', 'income', 'student', 'credit_rating', 'class_buys_computer']
>
> labelList:
>  ['no', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'no']
>
> featureList:
>  [{'age': 'youth', 'income': 'high', 'student': 'no', 'credit_rating': 'fair'}, {'age': 'youth', 'income': 'high', 'student': 'no', 'credit_rating': 'excellent'}, {'age': 'middle_aged', 'income': 'high', 'student': 'no', 'credit_rating': 'fair'}, {'age': 'senior', 'income': 'medium', 'student': 'no', 'credit_rating': 'fair'}, {'age': 'senior', 'income': 'low', 'student': 'yes', 'credit_rating': 'fair'}, {'age': 'senior', 'income': 'low', 'student': 'yes', 'credit_rating': 'excellent'}, {'age': 'middle_aged', 'income': 'low', 'student': 'yes', 'credit_rating': 'excellent'}, {'age': 'youth', 'income': 'medium', 'student': 'no', 'credit_rating': 'fair'}, {'age': 'youth', 'income': 'low', 'student': 'yes', 'credit_rating': 'fair'}, {'age': 'senior', 'income': 'medium', 'student': 'yes', 'credit_rating': 'fair'}, {'age': 'youth', 'income': 'medium', 'student': 'yes', 'credit_rating': 'excellent'}, {'age': 'middle_aged', 'income': 'medium', 'student': 'no', 'credit_rating': 'excellent'}, {'age': 'middle_aged', 'income': 'high', 'student': 'yes', 'credit_rating': 'fair'}, {'age': 'senior', 'income': 'medium', 'student': 'no', 'credit_rating': 'excellent'}]
>
> dummyY:
>  [[0]
>  [0]
>  [1]
>  [1]
>  [1]
>  [0]
>  [1]
>  [0]
>  [1]
>  [1]
>  [1]
>  [1]
>  [1]
>  [0]]
>
> dummyX:
>  [[ 0.  0.  1.  0.  1.  1.  0.  0.  1.  0.]
>  [ 0.  0.  1.  1.  0.  1.  0.  0.  1.  0.]
>  [ 1.  0.  0.  0.  1.  1.  0.  0.  1.  0.]
>  [ 0.  1.  0.  0.  1.  0.  0.  1.  1.  0.]
>  [ 0.  1.  0.  0.  1.  0.  1.  0.  0.  1.]
>  [ 0.  1.  0.  1.  0.  0.  1.  0.  0.  1.]
>  [ 1.  0.  0.  1.  0.  0.  1.  0.  0.  1.]
>  [ 0.  0.  1.  0.  1.  0.  0.  1.  1.  0.]
>  [ 0.  0.  1.  0.  1.  0.  1.  0.  0.  1.]
>  [ 0.  1.  0.  0.  1.  0.  0.  1.  0.  1.]
>  [ 0.  0.  1.  1.  0.  0.  0.  1.  0.  1.]
>  [ 1.  0.  0.  1.  0.  0.  0.  1.  1.  0.]
>  [ 1.  0.  0.  0.  1.  1.  0.  0.  0.  1.]
>  [ 0.  1.  0.  1.  0.  0.  0.  1.  1.  0.]]
>
> clf:
>  DecisionTreeClassifier(class_weight=None, criterion='entropy', max_depth=None, max_features=None, max_leaf_nodes=None,
> min_impurity_decrease=0.0, min_impurity_split=None,
> min_samples_leaf=1, min_samples_split=2,
> min_weight_fraction_leaf=0.0, presort=False, random_state=None,
> splitter='best')
>
> vec.get_feature_names():
>  ['age=middle_aged', 'age=senior', 'age=youth', 'credit_rating=excellent', 'credit_rating=fair', 'income=high', 'income=low', 'income=medium', 'student=no', 'student=yes']
>
> oneRowX:
>  [ 0.  0.  1.  0.  1.  1.  0.  0.  1.  0.]
>
> newRowX:
>  [ 1.  0.  0.  0.  1.  1.  0.  0.  1.  0.]
>
> newRowX.reshape(1, -1):
>  [[ 1.  0.  0.  0.  1.  1.  0.  0.  1.  0.]]
>
> 预测结果predictedY:
>  [1]

由于scikit-learn对于输入的数据有要求，要求必须是数字类型的值，所以我们必须对内容进行转换，转成如下的形式。

| youth | middle_age | senior | high | medium | low  | yes(student) | not(student) | fair | excellent | buy  |
| :---: | :--------: | :----: | :--: | :----: | :--: | :----------: | ------------ | :--: | :-------: | :--: |
|   1   |     0      |   0    |  1   |   0    |  0   |      0       | 1            |  1   |     0     |  0   |

文档： http://scikit-learn.org/stable/modules/tree.html

转化dot文件至pdf形式的可视化决策树：

```
d:
cd eclipseworkspace\LearnMachineLearning
dot -Tpdf TestDecisionTreeBuyComputerInformationGainOri.dot dot -O TestDecisionTreeBuyComputerInformationGainOri.pdf
```

关于`open`，这里补充一下，`open(file, mode, ...)`有很多个参数，常用的是前两个，第一个是文件名，第二个是打开模式（默认是'r' 和'rt'，'r'与'rt'的意义是一样的），r表示open for reading，t表示text mode，w表示open for writing，并截断以前的内容，b表示bianary mode，其它的更多模式，请参考[https://docs.python.org/3/library/functions.html#open](https://docs.python.org/3/library/functions.html#open)