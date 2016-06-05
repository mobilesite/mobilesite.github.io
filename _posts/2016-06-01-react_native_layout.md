---
layout:     post
title:      "React Native布局初体验"
subtitle:   ""
date:       2016-06-01 23:42:27
author:     "Paian"
catalog: true
tags:
    - React Native
---

## React Native布局初体验

本文是偏实践性质的,要求对JSX语法以及React Native的原生组件的使用有基本的了解。如果你还未了解过相关内容,我强烈建议你先阅读[官方文档](http://reactnative.cn/docs/0.26/getting-started.html#content),然后再继续阅读本文的内容。

React Native 不像CSS那样支持用 ```width: 33.33%``` 那样就可以把元素的宽度设置成1/3。实现三个元素共占一行（如下图所示，状态条和顶部标题栏自行实现），宽度各为1/3这样的布局需要做一些处理才能达成。

![截图](../../../../img/in-post/react-native-layout.png)

### 准备工作

动手之前，首先弄清楚React Native中布局的单位（是pt）和设备像素比的获取。通过引入如下test组件可以检测：

test.js

```
'use strict';

import React, { Component, StyleSheet, View, Text, PixelRatio } from 'react-native';

import Dimensions from 'Dimensions';

class Test extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text style={styles.font}>
          window.width: { Dimensions.get('window').width + '\n' }
          window.height: { Dimensions.get('window').height + '\n' }
          pxielRatio: { PixelRatio.get() }
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  font: {
    fontSize: 14,
    color: 'red',
    marginTop: 21
  }
})

export default Test;

```

其中，通过引入Dimensions模块通过Dimensions.get('window').width即能获得窗口的宽度，通过PixelRatio.get()获得设备的像素比。

### 一、构建基础工具组件

我们通过这样一个工具组件提供window的width、height、设备分辨率、相对单位和百分比转换的函数（假设设计稿是以640规范设计的）

utils/main.js
```
import React, {
  Component,
  PixelRatio
} from 'react-native';
import Dimensions from 'Dimensions';

let Util = {
    pixel: PixelRatio.get(),
    win: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    unit: 1/640,
    percent: function(num){
      return num/640 * Dimensions.get('window').width;
    }
}

module.exports = Util;
```

这样，在其它的模块中就可以通过

```
import Util from '../utils/main';
const percent = Util.percent;
```

然后在

```StyleSheet.create```内部通过```width: percent(20)```这样的方式来使用百分比的宽度了。

### 二、实现带有1像素细边的顶部标题头

基于上面这个公共组件，1像素细线的实现就非常简单了：```borderBottomWidth: 1/Util.pixel```

下面是顶部标题头组件的整个实现：

header.js

```
import React, {
  Component,
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';
import Util from '../utils/main';

class Header extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    return (
        <View style={styles.header}>
          <Text style={styles.font}>{this.props.mytitle}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
        borderBottomWidth: 1/Util.pixel,
        borderBottomColor: 'rgba(0,0,0,0.20)'
    },
    font: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center'
    }
})

export default Header;
```
### 三、实现一个简单的九宫格图片布局

希望实现的把每三个图片放在一行，每个图片的宽是一行的宽度减去间距之外宽度的1/3。

详细的实现如下：

item.js

```
import React, {
  Component,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Util from '../utils/main';
const percent = Util.percent;

class Item extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mytitle} numberOfLines={1}>{this.props.mytitle}</Text>
        <Text style={styles.desc}>
          {this.props.desc}
        </Text>
        <View style={styles.imageWrap}>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
          <Image style={styles.image} resizeMode={Image.resizeMode.cover} source={{ uri : this.props.image }}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    borderBottomWidth: 1/Util.pixel,
    borderBottomColor: 'rgba(0,0,0,0.1)'
  },
  mytitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 27,
    height: 27,
    color: 'rgba(0,0,0,0.80)'
  },
  distance: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(0,0,0,0.40) '
  },
  imageWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: '#d8d8d8',
    borderRadius: 2,
    width: percent(196),  //主要的百分比运用在这里
    height: percent(196),
    marginRight: percent(3),
    marginBottom: percent(3)
  }
})
export default Item;
```

最后在引用item.js这个组件的页面这样使用组件就可以了：

```
 <Item mytitle="标题名称" desc="描述信息描述信息描述信息" image="http://a.hiphotos.baidu.com/zhidao/pic/item/3801213fb80e7bec848c9fba292eb9389b506b13.jpg"></Item>
```

当然，因为百分比计算过程中有像素四舍五入的问题，所以，使用时在取整问题上需要做进一步的处理，保证每行的几个元素之和等于这一行的总宽度。

### 四、控制文字超出规定的行数后显示'...'

前端工程师都知道,CSS3中有个很好用的样式,叫```-webkit-line-clamp```,用它配合几个其它的CSS属性能轻易地实现文本超出一定的行数就显示'...'的效果。那么,在React Native中怎样实现这种效果呢?

答案是React Native实现起来更简单,直接在<Text>上添加```numberOfLines={数字}```属性就可以了。你需要控制显示最多几行就设置几行,非常方便。

最终实现的效果如下所示:

![截图](../../../../img/in-post/react-native-layout-demo.jpg)

至此,我们已经可以用React Native实现一些常见的页面布局了。值得注意的是,学习React Native一定要动手去试。相信你根据上面的只是,找一个设计稿对照着实现一遍,基本的React Native应该就可以搞定了。






