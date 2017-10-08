---
layout:     post
title:      "《深度学习基础》学习笔记4：最临近规则分类（K-Nearest Neighbor）KNN算法"
subtitle:   ""
date:       2017-10-07 15:39:43
author:     "Paian"
catalog: true
tags:
    - 深度学习
    - 学习笔记
---
## 《深度学习基础》学习笔记4：最临近规则分类（K-Nearest Neighbor）KNN算法

### 第一节 KNN算法

#### 1、综述

Cover和Hart在1968年提出了最初的邻近算法；

主要是为了解决分类(classification)问题；

它是输入基于实例的学习(instance-based learning)，是懒惰学习(lazy learning)。

#### 2、一个例子

判定某部电影属于什么类型？

|             电影             | 打斗次数 | 接吻次数 |  电影类型   |
| :------------------------: | :--: | :--: | :-----: |
|       California Man       |  3   | 104  | Romance |
| He's Not Really into Dudes |  2   | 100  | Romance |
|      Beautiful Woman       |  1   |  81  | Romance |
|      Kevin Longblade       | 101  |  10  | Action  |
|      Robo Slayer 3000      |  99  |  5   | Action  |
|          Amped II          |  98  |  2   | Action  |
|             未知             |  18  |  90  | Unknown |

这个问题可以模拟成空间中的点的类型确定问题。

|  点   | x坐标  | y坐标  |   点类型   |
| :--: | :--: | :--: | :-----: |
|  A点  |  3   | 104  | Romance |
|  B点  |  2   | 100  | Romance |
|  C点  |  1   |  81  | Romance |
|  D点  | 101  |  10  | Action  |
|  E点  |  99  |  5   | Action  |
|  F点  |  98  |  2   | Action  |
|  G点  |  18  |  90  | Unknown |

#### 3、算法详述

（1）步骤：

为了判断未知实例的类别，以所有已知类别的实例作为参照；
选择参数K；
计算未知实例与所有已知实例的距离；
选择最近K个已知实例；
根据少数服从多数的投票法则(majority-voting)，让未知实例归类为K个最邻近样本中最多数的类别。

（2）细节:

关于K，一般选择基数，便于少数服从多数时不会出现相等的情况；

关于距离的衡量方法：

Euclidean Distance（欧几里得距离）定义：

$$E(x, y) = \sqrt{\sum_{i=1}^{n}(x_{i}-y_{i})^2}$$

*注：关于公式的LaTex公式的MarkDown写法参见：[http://blog.csdn.net/fansongy/article/details/45368915](http://blog.csdn.net/fansongy/article/details/45368915)*

其他距离衡量：余弦值（cos）, 相关度 （correlation）, 曼哈顿距离 （Manhattan distance，多少个街区）

我们写代码来实现一下怎么求欧几里得距离，以上面的那张表为例：

```
import math

# 计算欧几里得距离
def ComputeEuclideanDistance(x1, y1, x2, y2):
    d = math.sqrt( math.pow((x1 - x2), 2) + math.pow((y1 - y2), 2) )
    return d

d_ag = ComputeEuclideanDistance(3, 104, 18, 90)
print('d_ag:', d_ag)

d_bg = ComputeEuclideanDistance(2, 100, 18, 90)
print('d_bg:', d_bg)

d_cg = ComputeEuclideanDistance(1, 81, 18, 90)
print('d_cg:', d_cg)

d_dg = ComputeEuclideanDistance(101, 10, 18, 90)
print('d_dg:', d_dg)

d_eg = ComputeEuclideanDistance(99, 5, 18, 90)
print('d_eg:', d_eg)

d_fg = ComputeEuclideanDistance(98, 2, 18, 90)
print('d_fg:', d_fg)
```

执行结果：

> d_ag: 20.518284528683193
> d_bg: 18.867962264113206
> d_cg: 19.235384061671343
> d_dg: 115.27792503337315
> d_eg: 117.41379816699569
> d_fg: 118.92854997854805

#### 4、算法优缺点：

优点：

- 简单
- 易于理解
- 容易实现
- 通过对K的选择可具备丢噪音数据的健壮性

缺点：

- 需要大量空间储存所有已知实例
- 算法复杂度高（需要比较所有已知实例与要分类的实例）
- 当其样本分布不平衡时，比如其中一类样本过大（实例数量过多）占主导的时候，新的未知实例容易被归类为这个主导样本，因为这类样本实例的数量过大，但这个新的未知实例实际并木接近目标样本

#### 5、改进版本

考虑距离，根据距离加上权重。

比如: 用1/d作为权重，其中d为距离

### 第二节 KNN算法的应用

#### 1、数据集介绍：

虹膜（Iris Data）

共有150个实例

每一个实例有四个维度的特征值：萼片长度，萼片宽度，花瓣长度，花瓣宽度
(sepal length, sepal width, petal length and petal width）

这些实例可以归入的类别有3种：
Iris setosa, Iris versicolor, Iris virginica.

#### 2、利用Python的机器学习库sklearn

Python语句`from a import b`表示的意思是：从a这个package中导入模块b。

```
from sklearn import neighbors
from sklearn import datasets

knn = neighbors.KNeighborsClassifier()    #KNN分类器
iris = datasets.load_iris()

print('iris:', '\n',  iris, '\n')

knn.fit(iris.data, iris.target)

predictedLabel = knn.predict([[0.1, 0.2, 0.3, 0.4]])

print('predictedLabel:', '\n', predictedLabel, '\n')
```

运行结果：

```
iris:
 {'data': array([[ 5.1,  3.5,  1.4,  0.2],
       [ 4.9,  3. ,  1.4,  0.2],
       [ 4.7,  3.2,  1.3,  0.2],
       [ 4.6,  3.1,  1.5,  0.2],
       [ 5. ,  3.6,  1.4,  0.2],
       [ 5.4,  3.9,  1.7,  0.4],
       [ 4.6,  3.4,  1.4,  0.3],
       [ 5. ,  3.4,  1.5,  0.2],
       [ 4.4,  2.9,  1.4,  0.2],
       [ 4.9,  3.1,  1.5,  0.1],
       [ 5.4,  3.7,  1.5,  0.2],
       [ 4.8,  3.4,  1.6,  0.2],
       [ 4.8,  3. ,  1.4,  0.1],
       [ 4.3,  3. ,  1.1,  0.1],
       [ 5.8,  4. ,  1.2,  0.2],
       [ 5.7,  4.4,  1.5,  0.4],
       [ 5.4,  3.9,  1.3,  0.4],
       [ 5.1,  3.5,  1.4,  0.3],
       [ 5.7,  3.8,  1.7,  0.3],
       [ 5.1,  3.8,  1.5,  0.3],
       [ 5.4,  3.4,  1.7,  0.2],
       [ 5.1,  3.7,  1.5,  0.4],
       [ 4.6,  3.6,  1. ,  0.2],
       [ 5.1,  3.3,  1.7,  0.5],
       [ 4.8,  3.4,  1.9,  0.2],
       [ 5. ,  3. ,  1.6,  0.2],
       [ 5. ,  3.4,  1.6,  0.4],
       [ 5.2,  3.5,  1.5,  0.2],
       [ 5.2,  3.4,  1.4,  0.2],
       [ 4.7,  3.2,  1.6,  0.2],
       [ 4.8,  3.1,  1.6,  0.2],
       [ 5.4,  3.4,  1.5,  0.4],
       [ 5.2,  4.1,  1.5,  0.1],
       [ 5.5,  4.2,  1.4,  0.2],
       [ 4.9,  3.1,  1.5,  0.1],
       [ 5. ,  3.2,  1.2,  0.2],
       [ 5.5,  3.5,  1.3,  0.2],
       [ 4.9,  3.1,  1.5,  0.1],
       [ 4.4,  3. ,  1.3,  0.2],
       [ 5.1,  3.4,  1.5,  0.2],
       [ 5. ,  3.5,  1.3,  0.3],
       [ 4.5,  2.3,  1.3,  0.3],
       [ 4.4,  3.2,  1.3,  0.2],
       [ 5. ,  3.5,  1.6,  0.6],
       [ 5.1,  3.8,  1.9,  0.4],
       [ 4.8,  3. ,  1.4,  0.3],
       [ 5.1,  3.8,  1.6,  0.2],
       [ 4.6,  3.2,  1.4,  0.2],
       [ 5.3,  3.7,  1.5,  0.2],
       [ 5. ,  3.3,  1.4,  0.2],
       [ 7. ,  3.2,  4.7,  1.4],
       [ 6.4,  3.2,  4.5,  1.5],
       [ 6.9,  3.1,  4.9,  1.5],
       [ 5.5,  2.3,  4. ,  1.3],
       [ 6.5,  2.8,  4.6,  1.5],
       [ 5.7,  2.8,  4.5,  1.3],
       [ 6.3,  3.3,  4.7,  1.6],
       [ 4.9,  2.4,  3.3,  1. ],
       [ 6.6,  2.9,  4.6,  1.3],
       [ 5.2,  2.7,  3.9,  1.4],
       [ 5. ,  2. ,  3.5,  1. ],
       [ 5.9,  3. ,  4.2,  1.5],
       [ 6. ,  2.2,  4. ,  1. ],
       [ 6.1,  2.9,  4.7,  1.4],
       [ 5.6,  2.9,  3.6,  1.3],
       [ 6.7,  3.1,  4.4,  1.4],
       [ 5.6,  3. ,  4.5,  1.5],
       [ 5.8,  2.7,  4.1,  1. ],
       [ 6.2,  2.2,  4.5,  1.5],
       [ 5.6,  2.5,  3.9,  1.1],
       [ 5.9,  3.2,  4.8,  1.8],
       [ 6.1,  2.8,  4. ,  1.3],
       [ 6.3,  2.5,  4.9,  1.5],
       [ 6.1,  2.8,  4.7,  1.2],
       [ 6.4,  2.9,  4.3,  1.3],
       [ 6.6,  3. ,  4.4,  1.4],
       [ 6.8,  2.8,  4.8,  1.4],
       [ 6.7,  3. ,  5. ,  1.7],
       [ 6. ,  2.9,  4.5,  1.5],
       [ 5.7,  2.6,  3.5,  1. ],
       [ 5.5,  2.4,  3.8,  1.1],
       [ 5.5,  2.4,  3.7,  1. ],
       [ 5.8,  2.7,  3.9,  1.2],
       [ 6. ,  2.7,  5.1,  1.6],
       [ 5.4,  3. ,  4.5,  1.5],
       [ 6. ,  3.4,  4.5,  1.6],
       [ 6.7,  3.1,  4.7,  1.5],
       [ 6.3,  2.3,  4.4,  1.3],
       [ 5.6,  3. ,  4.1,  1.3],
       [ 5.5,  2.5,  4. ,  1.3],
       [ 5.5,  2.6,  4.4,  1.2],
       [ 6.1,  3. ,  4.6,  1.4],
       [ 5.8,  2.6,  4. ,  1.2],
       [ 5. ,  2.3,  3.3,  1. ],
       [ 5.6,  2.7,  4.2,  1.3],
       [ 5.7,  3. ,  4.2,  1.2],
       [ 5.7,  2.9,  4.2,  1.3],
       [ 6.2,  2.9,  4.3,  1.3],
       [ 5.1,  2.5,  3. ,  1.1],
       [ 5.7,  2.8,  4.1,  1.3],
       [ 6.3,  3.3,  6. ,  2.5],
       [ 5.8,  2.7,  5.1,  1.9],
       [ 7.1,  3. ,  5.9,  2.1],
       [ 6.3,  2.9,  5.6,  1.8],
       [ 6.5,  3. ,  5.8,  2.2],
       [ 7.6,  3. ,  6.6,  2.1],
       [ 4.9,  2.5,  4.5,  1.7],
       [ 7.3,  2.9,  6.3,  1.8],
       [ 6.7,  2.5,  5.8,  1.8],
       [ 7.2,  3.6,  6.1,  2.5],
       [ 6.5,  3.2,  5.1,  2. ],
       [ 6.4,  2.7,  5.3,  1.9],
       [ 6.8,  3. ,  5.5,  2.1],
       [ 5.7,  2.5,  5. ,  2. ],
       [ 5.8,  2.8,  5.1,  2.4],
       [ 6.4,  3.2,  5.3,  2.3],
       [ 6.5,  3. ,  5.5,  1.8],
       [ 7.7,  3.8,  6.7,  2.2],
       [ 7.7,  2.6,  6.9,  2.3],
       [ 6. ,  2.2,  5. ,  1.5],
       [ 6.9,  3.2,  5.7,  2.3],
       [ 5.6,  2.8,  4.9,  2. ],
       [ 7.7,  2.8,  6.7,  2. ],
       [ 6.3,  2.7,  4.9,  1.8],
       [ 6.7,  3.3,  5.7,  2.1],
       [ 7.2,  3.2,  6. ,  1.8],
       [ 6.2,  2.8,  4.8,  1.8],
       [ 6.1,  3. ,  4.9,  1.8],
       [ 6.4,  2.8,  5.6,  2.1],
       [ 7.2,  3. ,  5.8,  1.6],
       [ 7.4,  2.8,  6.1,  1.9],
       [ 7.9,  3.8,  6.4,  2. ],
       [ 6.4,  2.8,  5.6,  2.2],
       [ 6.3,  2.8,  5.1,  1.5],
       [ 6.1,  2.6,  5.6,  1.4],
       [ 7.7,  3. ,  6.1,  2.3],
       [ 6.3,  3.4,  5.6,  2.4],
       [ 6.4,  3.1,  5.5,  1.8],
       [ 6. ,  3. ,  4.8,  1.8],
       [ 6.9,  3.1,  5.4,  2.1],
       [ 6.7,  3.1,  5.6,  2.4],
       [ 6.9,  3.1,  5.1,  2.3],
       [ 5.8,  2.7,  5.1,  1.9],
       [ 6.8,  3.2,  5.9,  2.3],
       [ 6.7,  3.3,  5.7,  2.5],
       [ 6.7,  3. ,  5.2,  2.3],
       [ 6.3,  2.5,  5. ,  1.9],
       [ 6.5,  3. ,  5.2,  2. ],
       [ 6.2,  3.4,  5.4,  2.3],
       [ 5.9,  3. ,  5.1,  1.8]]), 'target': array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
       0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
       1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
       2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]), 'target_names': array(['setosa', 'versicolor', 'virginica'],
      dtype='<U10'), 'DESCR': 'Iris Plants Database\n====================\n\nNotes\n-----\nData Set Characteristics:\n    :Number of Instances: 150 (50 in each of three classes)\n    :Number of Attributes: 4 numeric, predictive attributes and the class\n    :Attribute Information:\n        - sepal length in cm\n        - sepal width in cm\n        - petal length in cm\n        - petal width in cm\n        - class:\n                - Iris-Setosa\n                - Iris-Versicolour\n                - Iris-Virginica\n    :Summary Statistics:\n\n    ============== ==== ==== ======= ===== ====================\n                    Min  Max   Mean    SD   Class Correlation\n    ============== ==== ==== ======= ===== ====================\n    sepal length:   4.3  7.9   5.84   0.83    0.7826\n    sepal width:    2.0  4.4   3.05   0.43   -0.4194\n    petal length:   1.0  6.9   3.76   1.76    0.9490  (high!)\n    petal width:    0.1  2.5   1.20  0.76     0.9565  (high!)\n    ============== ==== ==== ======= ===== ====================\n\n    :Missing Attribute Values: None\n    :Class Distribution: 33.3% for each of 3 classes.\n    :Creator: R.A. Fisher\n    :Donor: Michael Marshall (MARSHALL%PLU@io.arc.nasa.gov)\n    :Date: July, 1988\n\nThis is a copy of UCI ML iris datasets.\nhttp://archive.ics.uci.edu/ml/datasets/Iris\n\nThe famous Iris database, first used by Sir R.A Fisher\n\nThis is perhaps the best known database to be found in the\npattern recognition literature.  Fisher\'s paper is a classic in the field and\nis referenced frequently to this day.  (See Duda & Hart, for example.)  The\ndata set contains 3 classes of 50 instances each, where each class refers to a\ntype of iris plant.  One class is linearly separable from the other 2; the\nlatter are NOT linearly separable from each other.\n\nReferences\n----------\n   - Fisher,R.A. "The use of multiple measurements in taxonomic problems"\n     Annual Eugenics, 7, Part II, 179-188 (1936); also in "Contributions to\n     Mathematical Statistics" (John Wiley, NY, 1950).\n   - Duda,R.O., & Hart,P.E. (1973) Pattern Classification and Scene Analysis.\n     (Q327.D83) John Wiley & Sons.  ISBN 0-471-22361-1.  See page 218.\n   - Dasarathy, B.V. (1980) "Nosing Around the Neighborhood: A New System\n     Structure and Classification Rule for Recognition in Partially Exposed\n     Environments".  IEEE Transactions on Pattern Analysis and Machine\n     Intelligence, Vol. PAMI-2, No. 1, 67-71.\n   - Gates, G.W. (1972) "The Reduced Nearest Neighbor Rule".  IEEE Transactions\n     on Information Theory, May 1972, 431-433.\n   - See also: 1988 MLC Proceedings, 54-64.  Cheeseman et al"s AUTOCLASS II\n     conceptual clustering system finds 3 classes in the data.\n   - Many, many more ...\n', 'feature_names': ['sepal length (cm)', 'sepal width (cm)', 'petal length (cm)', 'petal width (cm)']}

predictedLabel:
 [0]
```

可以看到，预测结果是[0]，也就是'target_names': array(['setosa', 'versicolor', 'virginica']中的第0个花的名字，即setosa。

#### 3、KNN算法的实现——不调用其它库，自己实现KNN算法

```
# Example of kNN implemented from Scratch in Python

import csv      #处理csv数据用到
import random   #随机数用到
import math     #数学运算时用到
import operator

#装载数据集
def loadDataset(filename, split, trainingSet=[] , testSet=[]):
    #split是传入某一个值，以这个值为分界点，将整个数据集合分成trainingset（训练集）和testset（测试集）
    with open(filename, 'r') as csvfile:
        lines = csv.reader(csvfile) #读取所有的行
        dataset = list(lines)       #转换成List数据结构
        for x in range(len(dataset)-1):
            for y in range(4):
                dataset[x][y] = float(dataset[x][y])
            if random.random() < split:
                #当随机数小于传入的split参数时，加入训练集
                trainingSet.append(dataset[x])
            else:
                testSet.append(dataset[x])

#计算欧几里得距离，length是纬度
def euclideanDistance(instance1, instance2, length):
    distance = 0
    for x in range(length):
        distance += pow((instance1[x] - instance2[x]), 2)
    return math.sqrt(distance)

#算出来K之后，获取最近的K个邻居
def getNeighbors(trainingSet, testInstance, k):
    distances = []
    length = len(testInstance)-1 #实例特征的维度等于实例的长度减去1，这个1就是class label所占据的那一个长度，因为每个实例中都有一个class label

    #计算出训练集中所有点的距离testInstance的欧几里得距离，以(该点, 该点至testInstance的欧几里得距离)这样的tuple形式存入distances这个list中。然后对distances以key=operator.itemgetter(1)为key进行排序，即以每个tuple所存的欧几里得距离的大小为key进行排序（默认是升序），然后取得距离最小的那k个实例存入neighbors这一list中，并返回neighbors。
    for x in range(len(trainingSet)):
        dist = euclideanDistance(testInstance, trainingSet[x], length)
        distances.append((trainingSet[x], dist))
    distances.sort(key=operator.itemgetter(1))
    neighbors = []
    for x in range(k):
        neighbors.append(distances[x][0])
    return neighbors

#确定要预测的实例应该归入哪一类
def getResponse(neighbors):
    classVotes = {}
    for x in range(len(neighbors)):
        response = neighbors[x][-1] #取得该实例的class label
        #针对每一种不同的class label进行计数
        if response in classVotes:
            classVotes[response] += 1
        else:
            classVotes[response] = 1
    #用built-in的函数sorted以key=operator.itemgetter(1)为key（即以计数为关键字）进行降序排序
    sortedVotes = sorted(classVotes.items(), key=operator.itemgetter(1), reverse=True)
    return sortedVotes[0][0]

#测算预测值与实际值之间的准确率（百分比）
def getAccuracy(testSet, predictions):
    correct = 0
    for x in range(len(testSet)):
        if testSet[x][-1] == predictions[x]:
            correct += 1
    return (correct/float(len(testSet))) * 100.0

def main():
    # prepare data
    trainingSet=[]
    testSet=[]
    split = 0.67  #即随机数小于0.67，则归入训练集，否则归入测试集。即2/3数据归入训练集，1/3数据归入测试集
    #这个r是表示raw的意思，在字符串之前加上r表示后面的字符串保持原样，不识别转义。例如`print('\t')`会打出来一个制表符，而`print(r'\t')`则会将字符原样输出。
    loadDataset(r'TestKNNImplement-irisdata.txt', split, trainingSet, testSet)
    print('Train set:', '\n', repr(len(trainingSet)), '\n')
    print('Test set:', '\n', repr(len(testSet)), '\n')
    # generate predictions
    # 存储预测结果的
    predictions=[]
    k = 3
    for x in range(len(testSet)):
        neighbors = getNeighbors(trainingSet, testSet[x], k)
        response = getResponse(neighbors)
        predictions.append(response)
        print(' predicted:', '\n', repr(response), '\n', 'actual:', '\n', repr(testSet[x][-1]), '\n')
    accuracy = getAccuracy(testSet, predictions)
    print('Accuracy:', '\n', repr(accuracy) + '%', '\n')

main()
```

执行结果：

> Train set:
>  98
>
> Test set:
>  52
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-setosa'
>  actual:
>  'Iris-setosa'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-versicolor'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-versicolor'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> predicted:
>  'Iris-virginica'
>  actual:
>  'Iris-virginica'
>
> Accuracy:
>  94.23076923076923%

这里补充一下`range`

- 当range传入一个参数n时，会生成一个长度为n的链表，链表的每一项值填入的是该项对应的索引值。

例如：

```
range1 = range(3)
```

表示将会生成一个长度为3的链表，range1[0] == 0，range1[1] == 1，range1[2] == 2。

- 当range传入两个参数 m, n时候，会生成一个长度为n-m，从第0项到第n-m项的值依次分别为m（包含m）到n-1的链表。

- 当range传入三个参数m, n, s时，m和n依然是起始（含）和结束（不含），s是步长。比如：

  ```
  range(0, 9, 3)
  ```

  表示一个每一项取值依次分别为0, 3, 6的链表。

关于字典的`.items()`方法：

```
print({"a": 1, "b": 2}.items())
```

返回的将是：

> dict_items([('a', 1), ('b', 2)])