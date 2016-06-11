---
layout:     post
title:      "React Native中的Flex布局"
subtitle:   "史上最详细的React Native系列教程（3）"
date:       2015-12-12 23:29:13
author:     "Paian"
catalog: true
tags:
    - React Native
---

## React Native中的Flex布局

Flex 是 Flexible Box 的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性。采用Flex 布局的元素，称为 Flex 容器（flex container），简称“容器”。它的所有子元素自动成为容器成员，称为 Flex项目（flex item），简称“项目”。容器默认存在两根轴：主轴（main axis）和交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。项目默认沿主轴排列，单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

与网页中的Flexible Box不同，React Native只支持部分属性。从React Native项目下的node_modules/react-native/Libraries/StyleSheet/LayoutPropTypes.js文件中我们可以看到。React Native中对于Flex的属性及其对应取值定义如下：

    flexDirection: ReactPropTypes.oneOf([
    'row',
    'column'
    ]),

    flexWrap: ReactPropTypes.oneOf([
    'wrap',
    'nowrap'
    ]),

    justifyContent: ReactPropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around'
    ]),

    alignItems: ReactPropTypes.oneOf([
    'flex-start',
    'flex-end',
    'center',
    'stretch'
    ]),

    alignSelf: ReactPropTypes.oneOf([
    'auto',
    'flex-start',
    'flex-end',
    'center',
    'stretch'
    ]),

    flex: ReactPropTypes.number

可见，React Native一共支持Flex的六个属性：flexDirection、flexWrap、justifyContent、alignItems、alignSelf和flex。

下面我们建立一个示例来详细了解这些React Native中这些示例的使用。开始动手之前，大家需要清楚一些React Native的基本原生组件，如<View></View>，<Text></Text>等等。注意React Native中要求组件的首字母是大写的。另外，React Native中样式属性的写法是驼峰命名，而不是-连接。比如，背景颜色应该写成backgroundColor而非background-color，属性值除了是数字类型的值意外，都要用单引号包起来。一个个的样式实际上就是写成一个个的对象，class名相当于对象名，属性名相当于对象中的属性名，属性值则相当于对象中的属性值。

我们把[上一篇文章](http://mobilesite.github.io/2015/12/05/react_native_develop_enviroment/)中初始化好的demo项目的index.android.js修改一下，成为学习Flex的例子。修改后的代码如下：

```
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class demo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.box1}>flex box 1</Text>
                <Text style={styles.box2}>flex box 2</Text>
                <Text style={styles.box3}>flex box 3</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        color: '#fff'
    },
    box1: {
        backgroundColor: 'red'
    },
    box2: {
        backgroundColor: '#333'
    },
    box3: {
        backgroundColor: 'blue'
    }
});

AppRegistry.registerComponent('demo', () => demo);

```

把手机连接上电脑，开启USB调试模式。用```react-native run-android```运行项目，得到如下图所示的效果。这时如果你遇到手机出现红屏报错的情况，可能是你的手机没有与电脑连接到同一Wi-Fi环境下。

![截图](./img/in-post/flex_default_direction.jpg)

可见，三个元素是在竖直方向上一字排开，即默认的flexDirection取值是column，这与Web页面中flex-direction的默认取值为row是不同的。

上面的这个示例中，```flex: 1,```表示的是在主轴方向上如果有剩余空间的话，那么其所放大的部分占剩余空间中的比例。它相当于Web中的flex-grow属性。只不过，因为React Native中默认的flexDirection取值是column，即默认主轴是垂直方向的。所以，在未设置flexDirection的情况下设置flex的话，表示的是在垂直方向上如果有空间富余，其扩张部分占富余空间的比例。

flexDirection: 用来指定主轴的方向，默认为column，可选值为 row、column

flexWrap: 用来表示如果超出是否换行，默认值为wrap，可选值为wrap、nowrap

justifyContent: 用来设定在容器中的项目在主轴上的对齐方式，默认值为flex-start，可选值为flex-start、flex-end、center、space-between、space-around

alignItems: 用来设定在容器中的项目在主轴上的对齐方式，默认值为flex-start，可选值为flex-start、flex-end、center、stretch

alignSelf: 用来设置单独的伸缩项目在交叉轴上的对齐方式，会覆盖默认的对齐方式。默认值为auto，可选值为auto、flex-start、flex-end、center、stretch。其中，stretch取值表示伸缩项目在交叉轴方向上占满伸缩容器，如果交叉轴为垂直方向的话，只有在不设置伸缩项目的高度的情况下才能起作用。

flex: 默认值为0，取值为1个整数。

目前还不支持与Web中的Flex Box类似的flex-shrink 、 flex-basis 、order等几个属性。另外像row-reverse、column-reverse、baseline对齐等属性也不支持。

学习布局的过程一定是个不断尝试和修正的过程，你不妨拿着我上面提供的示例把Flex的各个属性值以不同的组合方式试一试，看看各是什么效果。到用起来的时候，才会得心应手。