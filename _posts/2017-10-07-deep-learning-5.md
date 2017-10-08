---
layout:     post
title:      "《深度学习基础》学习笔记5：支持向量机（SVM）算法"
subtitle:   ""
date:       2017-10-07 18:32:57
author:     "Paian"
catalog: true
tags:
    - 深度学习
    - 学习笔记
---
## 《深度学习基础》学习笔记5：支持向量机（SVM）算法

### 第一节 支持向量机（SVM）算法（上）

#### 1、背景：

SVM算法最早是由 Vladimir N. Vapnik 和 Alexey Ya. Chervonenkis 在1963年提出。

目前的版本(soft margin)是由Corinna Cortes 和 Vapnik在1993年提出，并在1995年发表。

深度学习（2012）出现之前，SVM被认为机器学习中近十几年来最成功，表现最好的算法。

#### 2、机器学习的一般框架：

训练集 => 提取特征向量 => 结合一定的算法（分类器：比如 决策树，KNN等）=>得到结果

#### 3、SVM算法介绍：

例子：

假设二维平面中有两类点，如何画出一条线，将两类点分开，让一类和另一类分别在线的两侧，怎样使得这条线画得最好？

拓展一下维度，如果是多维空间中，要画一个最好的面来分开两类点呢？SVM寻找区分两类的超平面（hyper plane)，使边际(margin)最大。因为margin越大，在进行预测的时候，出错的可能性就越小。

如何选取使边际(margin)最大的超平面 (Max Margin Hyperplane)？

超平面到一侧最近点的距离等于到另一侧最近点的距离，两侧的两个超平面平行。

线性可区分（linear separable）和 线性不可区分（linear inseparable）：

当无法找到一条线（或一个平面），将空间中的两类点分隔在这条线（或这个平面）的两侧时，我们称之为线性不可区分（linear inseparable），反之，则为线性可区分（linear separable）。

#### 4、定义与公式建立

超平面可以定义为：

$${W}\cdot{X} + b = 0$$

W是weight vectot，是一个权重向量，

$$W = {w_1, w_2, ... , w_n}$$

其中n是特征值的个数；

X是给入的训练实例；

b为bias，偏好。

假设二维特征向量：X = (x1, X2)，把 b 想象为额外的 weight : $w_0$，那么这时候超平面方程变为：

$$w_0 + w_1x_1 + w_2x_2 = 0$$

所有超平面右上方的点满足：

$$w_0 + w_1x_1 + w_2x_2 > 0$$

所有超平面左下方的点满足：

$$w_0 + w_1x_1 + w_2x_2 < 0$$

调整weight，使超平面定义边际的两边：

$$H1：w_0 + w_1x_1 + w_2x_2 \geq 1 \ for \ y_i = +1$$

$$H2：w_0 + w_1x_1 + w_2x_2 \leq -1 \ for \ y_i = -1$$

综合以上两式，得到：

$y_i(w_0 + w_1x_1 + w_2x_2) \geq 1, \forall_i$          公式（1）

$\forall_i$  是指任意i，这里指对于任意i，都满足$y_i(w_0 + w_1x_1 + w_2x_2)\geq1$

所有坐落在边际的两边的超平面上的点被称作”支持向量(support vectors)"

通过数学推导可以得到，分界的超平面到 H1 或 H2上任意一点的距离为：

$$\frac{1}{||W||}$$

其中

$$||W||$$

是向量的范数(norm))。

if  $W = {w_1, w_2, ... , w_n}$  then  $\sqrt{ w_1^2 + w_2^2 + ... + w_n^2}$

所以，最大边际距离（H1和H2之间的距离）为：

$$\frac{2}{||W||}$$

#### 5、求解

SVM算法如何找出拥有最大边际的超平面呢(MMH)？

利用一些数学推倒，以上公式 （1）可变为有限制的凸优化问题（convex quadratic optimization）。
利用 Karush-Kuhn-Tucker (KKT)条件和拉格朗日公式，可以推出MMH可以被表示为以下“决定边界 (decision boundary)” ：

$$d(X^t)=\sum_{i=1}^{l}y_i\alpha_iX_iX^T + b_0$$

其中，

${X_i}$是支持向量点（support vector），即MMH边际两边的平面上的点。

$y_i$是支持向量点（support vector）${X_i}$的类别标记（class label)，即+1还是-1

${X^T}$是要测试的实例

${\alpha _i}$ 和 ${b_0}$都是单一数值型参数，由以上提到的最有算法得出

l 是支持向量点的个数。

对于任何测试（要归类的）实例，将其作为${X^T}$代入以上公式，得出的符号是正还是负决定它是在MMH的哪一侧。

### 6、例子

![svm-example](/img/in-post/svm-example.png)

由(1,1)和(2,3)两点，得到weight vector   $\overrightarrow{\omega}$= (a,2a)

又因为(1,1)和(2,3)分别在坐落在MMH边际两边的平面上，固有：

$$a+2a+w_0 = -1$$

$$2a+6a+w_0 = 1$$

解这个方程得到：

$$a = \frac{2}{5}$$

$$w_0 = -\frac{11}{5}$$

所以继续求得weight vector   $\overrightarrow{\omega}$= (a,2a)=($\frac{2}{5}$, $\frac{4}{5}$)

所以MMH的方程为：

g($\overrightarrow{x}$) = $\frac{2}{5}x_1+ \frac{4}{5}x_2 - \frac{11}{5}$

该方程可以进一步化简得到：

g($\overrightarrow{x}$) = $x_1+ 2x_2 - 5.5$



### 第二节 支持向量积（SVM）算法（上）应用

#### 1、利用sklearn中的svm

```
from sklearn import svm

X = [[2, 0], [1, 1], [2,3]]      #一组实例
y = [0, 0, 1]                    #这组实例对应的一组归类标记（class label）

clf = svm.SVC(kernel = 'linear') #利用svm模块中的SVC方程，kernel = 'linear'表示指定核函数为线性
clf.fit(X, y)                    #建模
print('clf:', '\n', clf, '\n')

# get support vectors 打印出来支持向量
print('clf.support_vectors_:', '\n', clf.support_vectors_, '\n')

# get indices（下标index的复数） of support vectors
print('clf.support_:', '\n', clf.support_, '\n')

# get number of support vectors for each class
# 打印出来每一个类中一共有几个支持向量
print('clf.n_support_:', '\n', clf.n_support_, '\n')
```

输出结果：

> clf:
>  SVC(C=1.0, cache_size=200, class_weight=None, coef0=0.0,
>   decision_function_shape='ovr', degree=3, gamma='auto', kernel='linear',
>   max_iter=-1, probability=False, random_state=None, shrinking=True,
>   tol=0.001, verbose=False)
>
> clf.support_vectors_:
>  [[ 1.  1.]
>  [ 2.  3.]]
>
> clf.support_:
>  [1 2]
>
> clf.n_support_:
>  [1 1]

#### 2、sklearn画出决定界限

```
print(__doc__)

import numpy as np
import pylab as pl         #一些画图的功能
from sklearn import svm

# we create 40 separable points
np.random.seed(0)          #传入seed是为了保证每次运行程序时，产生的随机数不变

X = np.r_[np.random.randn(20, 2) - [2, 2], np.random.randn(20, 2) + [2, 2]]

Y = [0] * 20 + [1] * 20

# fit the model  建模
clf = svm.SVC(kernel='linear')
clf.fit(X, Y)

# 建模之后，MMH就建立起来了，接下来我们只是需要从这个分类器中读取所需的值

# switching to the generic n-dimensional parameterization of the hyperplan to the 2D-specific equation
# of a line y=a.x + b: the generic w_0x + w_1y +w_3=0 can be rewritten y = -(w_0/w_1) x + (w_3/w_1)
# 转成“点斜式”

# get the separating hyperplane
w = clf.coef_[0]
a = -w[0]/w[1]
xx = np.linspace(-5, 5)   #在-5到5之间产生连续的数字作为xx
yy = a*xx - (clf.intercept_[0])/w[1] # 这就是MMH的方程

# plot the parallels to the separating hyperplane that pass through the support vectors
# 接下来算出两条边际线的方程，因为两条边际线必然是与MMH平行的，所以斜率也是a
b = clf.support_vectors_[0]
yy_down = a*xx + (b[1] - a*b[0])    #b[1]-ab[0]算的是这条边际线的截距，因为这条边际线的斜率是已知的（a），且已知(b[0],b[1])这个点在该条边际线上，所以很容易计算得到该边际线的截距是(b[1] - a*b[0])
b = clf.support_vectors_[-1]     #最后一个支持向量一定属于另一类，所以取最后一个
yy_up = a*xx + (b[1] - a*b[0])

print("w:", w)
print("a:", a)

# print "xx: ", xx
# print "yy: ", yy
print("support_vectors_: ", clf.support_vectors_)
print("clf.coef_: ", clf.coef_)

# plot the line, the points, and the nearest vectors to the plane
# 把三条线画出来
pl.plot(xx, yy, 'k-')          #k-表示画的是实线
pl.plot(xx, yy_down, 'k--')    #k--表示画的是虚线
pl.plot(xx, yy_up, 'k--')

# 把点画出来
pl.scatter(clf.support_vectors_[:, 0], clf.support_vectors_[:, 1],
          s=80, facecolors='none')
pl.scatter(X[:, 0], X[:, 1], c=Y, cmap=pl.cm.Paired)

#把坐标画出来
pl.axis('tight')
pl.show()
```

执行结果：

> None
> w: [ 0.90230696  0.64821811]
> a: -1.39198047626
> support_vectors_:  [[-1.02126202  0.2408932 ]
>  [-0.46722079 -0.53064123]
>  [ 0.95144703  0.57998206]]
> clf.coef_:  [[ 0.90230696  0.64821811]]

并画出来了一张图：

![TestSVM2-result](/img/in-post/TestSVM2-result.png)

`support_vectors_[:, i]`中[:, i]这样的写法是numpy中的写法，表示的意思是，第一维全取，第二维只取下标为i的数据。

举个例子：

```
import numpy as np

X = np.array([[0,1],[2,3],[4,5]])
print(X[:,0])
```

输出结果是：

> [0 2 4]

同理，[j, :]这样的写法则表示，取第一维下标为j的数据，第二维全取。

```
import numpy as np

X = np.array([[0,1],[2,3],[4,5]])
print(X[1,:])
```

输出结果是：

> [2 3]



### 第三节 支持向量积（SVM）算法（下）

#### 1、SVM算法特性：

（1）训练完的模型的算法复杂度是由支持向量的个数决定的，而不是由数据的维度决定的。所以SVM不太容易产生overfitting（过分fit）
（2）SVM训练出来的模型完全依赖于支持向量（Support Vectors）, 即使训练集里面所有非支持向量的点都被去除，重复训练过程，结果仍然会得到完全一样的模型。
（3）一个SVM如果训练得出的支持向量个数比较小，SVM训练出的模型比较容易被泛化。

#### 2、线性不可分的情况 （linearly inseparable case)

即数据集在空间中对应的向量不可被一个超平面区分开。

两个步骤来解决：

（1）利用一个非线性的映射把原数据集中的向量点转化到一个更高维度的空间中；

​（2）在这个高维度的空间中找一个线性的超平面来根据线性可分的情况处理

视觉化演示 [https://www.youtube.com/watch?v=3liCbRZPrZA](https://www.youtube.com/watch?v=3liCbRZPrZA)

#### 3、如何利用非线性映射把原始数据转化到高维中？

例子：

有一个三维输入向量X：

$$X=(x_1, x_2, x_3)$$

转化到六维空间 Z 中去：

$$\phi_1=x_1,  \phi_2=x_2, \phi_3=x_3, \phi_4=(x_1)^2, \phi_5=x_1x_2,  \ and \ \phi_6=x_1x_3$$

新的决策超平面：

d(z) = WZ + b

其中W和Z是向量，这个超平面是线性的。
解出W和b之后，并且代入回原方程：

 d(z) = WZ + b = $w_1x_1+w_2x_2+w_3x_3+w_4(x_1)^2+w_5x_1x_2+w_6x_1x_3+b$

思考问题：
如何选择合理的非线性转化把数据转到高纬度中？
如何解决计算内积时算法复杂度非常高的问题？

### 4、使用核方法（kernel trick)

（1）动机

在线性SVM中转化为最优化问题时求解的公式计算都是以内积(dot product)的形式出现的，

$${\phi(X_i)}\cdot{\phi(X_j)}$$

其中

$$\phi(X)$$

是把训练集中的向量点转化到高维的非线性映射函数，因为内积的算法复杂度非常大，所以我们利用核函数来取代计算非线性映射函数的内积

（2）以下核函数和非线性映射函数的内积等同：

$$K(X_i,X_j)={\phi(X_i)}\cdot{\phi(X_j)}$$

两者虽然内积相同，但是核函数的复杂度远低于非线性映射函数内积运算。

（3）常用的核函数(kernel functions)

h度多项式核函数(polynomial kernel of degree h)：

$$K(X_i,X_j)=（{X_i}\cdot{X_j} + 1)^h$$

高斯径向基核函数(Gaussian radial basis function kernel):

$$K(X_i,X_j)= e^{-||X_i-X_j||^2/2\sigma^2}$$

S型核函数(Sigmoid function kernel):

$$K(X_i,X_j)=tanh(k{X_i}\cdot{X_j} - \delta)$$

那么，如何选择使用哪个kernel？

- 根据先验知识，比如图像分类，通常使用高斯径向基核函数（RBF），文字不使用RBF
- 尝试不同的kernel，根据结果准确度而定

#### 5、核函数举例：

假设定义两个向量： x = (x1, x2, x3); y = (y1, y2, y3)

定义方程：f(x) = (x1x1, x1x2, x1x3, x2x1, x2x2, x2x3, x3x1, x3x2, x3x3)

假设x = (1, 2, 3);  y = (4, 5, 6).

f(x) = (1, 2, 3, 2, 4, 6, 3, 6, 9)

f(y) = (16, 20, 24, 20, 25, 36, 24, 30, 36)

<f(x), f(y)> = 16 + 40 + 72 + 40 + 100+ 180 + 72 + 180 + 324 = 1024

假设我们定义了一个核函数 K(x, y ) = (<x, y>)^2

K(x, y) = (4  + 10 + 18 ) ^2 = 32^2 = 1024

可见，同样的结果，使用kernel方法计算容易很多。

#### 6、SVM扩展可解决多个类别分类问题

从上面的一系列描述看，SVM算法看起来是解决两个类的划分问题的，那么怎么解决多个类的分类问题呢？

我们可以对于每个类，有一个当前类和其他类的二类分类器（one-vs-rest)，同样把其他类的内部又分为两类，以此类推，直到不能再分为止。这样就把多类问题转换成了两类问题，从而可以用SVM算法解决。

### 第四节 支持向量积（SVM）算法（下）应用

利用SVM进行人脸识别实例：

```
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.decomposition import RandomizedPCA
from sklearn.svm import SVC

print(__doc__)

# Display progress logs on stdout
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s')

# Download the data, if not already on disk and load it as numpy arrays
# 下载名人库数据集
lfw_people = fetch_lfw_people(min_faces_per_person=70, resize=0.4)

# introspect the images arrays to find the shapes (for plotting)

# 把lfw_people.images.shape中的n_samples、h、w分别赋给n_samples、h、w这三个变量
n_samples, h, w = lfw_people.images.shape

# for machine learning we use the 2 data directly (as relative pixel positions info is ignored by this model)

X = lfw_people.data  #特征向量的矩阵

n_features = X.shape[1]  #矩阵对应的列数就是特征向量的维数

# the label to predict is the id of the person

y = lfw_people.target    #一组实例对应的class label

target_names = lfw_people.target_names #一组实例对应的人名

n_classes = target_names.shape[0]   #有多少人

print("Total dataset size:")

print("n_samples: %d" % n_samples)

print("n_features: %d" % n_features)

print("n_classes: %d" % n_classes)

# Split into a training set and a test set using a stratified k fold

# split into a training and testing set
# 把数据集拆分成两个矩阵（训练集和测试集）和两个向量（训练集和测试集对应的class label分别组成的向量）
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25)

# Compute a PCA (eigenfaces) on the face dataset (treated as unlabeled dataset): unsupervised feature extraction / dimensionality reduction

# 由于特征值的维度仍然较高，通过降维把特征值减少以提高预测的准确性
n_components = 150   #组成元素的个数

print("Extracting the top %d eigenfaces from %d faces" % (n_components, X_train.shape[0]))

t0 = time()         #起始时间

pca = RandomizedPCA(n_components=n_components,whiten=True).fit(X_train)              #采用随机PCA降维方法进行降维，然后进行建模

print("done in %0.3fs" % (time() - t0))

eigenfaces = pca.components_.reshape((n_components, h, w)) #提取人脸上的一些特征值

print("Projecting the input data on the eigenfaces orthonormal basis")

t0 = time()

X_train_pca = pca.transform(X_train)  #对训练集进行降维

X_test_pca = pca.transform(X_test)    #对测试集进行降维

print("done in %0.3fs" % (time() - t0))

# Train a SVM classification model

print("Fitting the classifier to the training set")

t0 = time()

# 对c和gamma给出两组值，让SVC去从中各取一个值进行两两组合尝试，看那种组合效果最好（通过后面的GridSearchCV函数来实现）
param_grid = {'C': [1e3, 5e3, 1e4, 5e4, 1e5],'gamma': [0.0001, 0.0005, 0.001, 0.005, 0.01, 0.1], }

clf = GridSearchCV(SVC(kernel='rbf', class_weight=None), param_grid)

clf = clf.fit(X_train_pca, y_train)

print("done in %0.3fs" % (time() - t0))

print("Best estimator found by grid search:")

print(clf.best_estimator_)

# Quantitative evaluation of the model quality on the test set

print("Predicting people's names on the test set")

t0 = time()

y_pred = clf.predict(X_test_pca)

print("done in %0.3fs" % (time() - t0))

print(classification_report(y_test, y_pred, target_names=target_names)) #看预测中了多少，是对是错

print(confusion_matrix(y_test, y_pred, labels=range(n_classes)))   #建立一个矩阵，对角线上的数字是预测的与实际相符的，所以对角线上越多，说明预测对的越多

# Qualitative evaluation of the predictions using matplotlib
# 把预测结果打印出来
def plot_gallery(images, titles, h, w, n_row=3, n_col=4):
    """Helper function to plot a gallery of portraits"""
    plt.figure(figsize=(1.8 * n_col, 2.4 * n_row))  #画个背景图
    plt.subplots_adjust(bottom=0, left=.01, right=.99, top=.90, hspace=.35)
    for i in range(n_row * n_col):
        plt.subplot(n_row, n_col, i + 1)
        plt.imshow(images[i].reshape((h, w)), cmap=plt.cm.gray)
        plt.title(titles[i], size=12)
        plt.xticks(())
        plt.yticks(())

# plot the result of the prediction on a portion of the test set

def title(y_pred, y_test, target_names, i):
    pred_name = target_names[y_pred[i]].rsplit(' ', 1)[-1]
    true_name = target_names[y_test[i]].rsplit(' ', 1)[-1]
    return 'predicted: %s\ntrue:      %s' % (pred_name, true_name)

prediction_titles = [title(y_pred, y_test, target_names, i) for i in range(y_pred.shape[0])]

plot_gallery(X_test, prediction_titles, h, w)

# plot the gallery of the most significative eigenfaces

eigenface_titles = ["eigenface %d" % i for i in range(eigenfaces.shape[0])]
plot_gallery(eigenfaces, eigenface_titles, h, w)

plt.show()
```

执行结果：

```
C:\Anaconda3\lib\site-packages\sklearn\cross_validation.py:41: DeprecationWarning: This module was deprecated in version 0.18 in favor of the model_selection module into which all the refactored classes and functions are moved. Also note that the interface of the new CV iterators are different from that of this module. This module will be removed in 0.20.
  "This module will be removed in 0.20.", DeprecationWarning)
C:\Anaconda3\lib\site-packages\sklearn\grid_search.py:42: DeprecationWarning: This module was deprecated in version 0.18 in favor of the model_selection module into which all the refactored classes and functions are moved. This module will be removed in 0.20.
  DeprecationWarning)
None
Total dataset size:
n_samples: 283
n_features: 1850
n_classes: 2
Extracting the top 150 eigenfaces from 212 faces
C:\Anaconda3\lib\site-packages\sklearn\utils\deprecation.py:57: DeprecationWarning: Class RandomizedPCA is deprecated; RandomizedPCA was deprecated in 0.18 and will be removed in 0.20. Use PCA(svd_solver='randomized') instead. The new implementation DOES NOT store whiten ``components_``. Apply transform to get them.
  warnings.warn(msg, category=DeprecationWarning)
done in 0.032s
Projecting the input data on the eigenfaces orthonormal basis
done in 0.003s
Fitting the classifier to the training set
done in 0.734s
Best estimator found by grid search:
SVC(C=1000.0, cache_size=200, class_weight=None, coef0=0.0,
  decision_function_shape='ovr', degree=3, gamma=0.0005, kernel='rbf',
  max_iter=-1, probability=False, random_state=None, shrinking=True,
  tol=0.001, verbose=False)
Predicting people's names on the test set
done in 0.004s
                   precision    recall  f1-score   support

    George W Bush       0.91      0.93      0.92        45
Gerhard Schroeder       0.88      0.85      0.86        26

      avg / total       0.90      0.90      0.90        71

[[42  3]
 [ 4 22]]

```

同时生成了两幅图像：

![TestSVM3-result1](/img/in-post/TestSVM3-result1.png)

![TestSVM3-result2](/img/in-post/TestSVM3-result2.png)

