通过

import {
  Platform
} from 'react-native';

然后

Platform.OS === 'android'

可以判断平台。

动画View

<Animated.View>


import { Set } from 'immutable';

JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。如 `foo={a: 1}; bar=foo; bar.a=2` 你会发现此时 `foo.a` 也被改成了 `2`。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，Mutable 带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用 shallowCopy（浅拷贝）或 deepCopy（深拷贝）来避免被修改，但这样做造成了 CPU 和内存的浪费。
Immutable 可以很好地解决这些问题。
详见：https://zhuanlan.zhihu.com/p/20295971


ES6的字符串模版

	_getSceneKey(item, index): string {
		return `scene-${(item.key !== null) ? item.key : index}`;
	}


_updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
	let newSceneKeys = Set().asMutable();
	React.Children.forEach(children, (item, index) => {
	  let key = this._getSceneKey(item, index);
	  //.has(key) True if a key exists within this Iterable
	  if (oldSceneKeys.has(key) || item.props.selected) {
	    newSceneKeys.add(key);
	  }
	});
	return newSceneKeys.asImmutable();
}

//上面的代码中，: Set就是指定该函数的返回结果的类型是Set,
//最后一行的return newSceneKeys.asImmutable();印证了这一点


	var {
	    className,
	    ...others,  // contains all properties of this.props except for className
	} = this.props;

下面这种写法，则是传递所有属性的同时，用覆盖新的className值：
 
	<div {...this.props} className="override">
	    …
	</div>
	
这个例子则相反，如果属性中没有包含className，则提供默认的值，而如果属性中已经包含了，则使用属性中的值
 
	<div className="base" {...this.props}>
	    …
	</div>
 



propTypes :  { 
    // required
 
    requiredFunc :  React . PropTypes . func . isRequired , 
    requiredAny :  React . PropTypes . any . isRequired , 

    // primitives, optional by default
 
    bool :  React . PropTypes . bool , 
    func :  React . PropTypes . func , 
    number :  React . PropTypes . number , 
    string :  React . PropTypes . string , 
  }, 
  
  
建议使用cnpm来作为你的node模块管理命令，npm墙的厉害。。。内网就用tnpm，外网就用cnpm

	npm install -g cnpm --registry=https://registry.npm.taobao.org



rn中的触摸事件及其处理

一：触摸事件各事件响应与坐标获取
1. 在import React 中添加要使用的触摸组件：

importReact, {
  ...
  PanResponder,//触摸必要的组件
  ...
} from 'react-native';
2. 声明：

constructor(props) {
 super(props);
 this.state = {
              eventName:'',
      pos: '',
 };
    this.myPanResponder={}
}
这里先声明了两个变量posX,posY用于显示坐标用，另外声明了一个 myPanResponder 用于后面的触摸事件。

3. 创建、设置与响应

componentWillMount() {
      this.myPanResponder = PanResponder.create({
      //要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,  
 
      //响应对应事件后的处理:
      onPanResponderGrant: (evt, gestureState) => {
        this.state.eventName='触摸开始';
        this.forceUpdate();
      },
      onPanResponderMove: (evt, gestureState) => {
        var _pos = 'x:' + gestureState.moveX + ',y:' + gestureState.moveY;
        this.setState( {eventName:'移动',pos : _pos} );
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState( {eventName:'抬手'} );
      },
      onPanResponderTerminate: (evt, gestureState) => {
        this.setState( {eventName:'另一个组件已经成为了新的响应者'} )
      },
    });
  }
以上代码分为3部分，先创建，然后对需要追踪的事件进行设置响应，最后重写响应的事件进行处理即可。

需要注意的：绑定到componentDidMount的话可能会失效，需要在componentWillMount处预先创建手势响应器

4. 为要响应的View进行设置

{...this.myPanResponder.panHandlers}
5. 完善Render函数：

render() {
    return (
    <Viewstyle={styles.himiViewStyle}
        {...this.myPanResponder.panHandlers}
    >
        <Text style={styles.himiTextStyle}>HimiReactNative 教程</Text>
        <Viewstyle={styles.container}>
          <Text style={styles.text}>{this.state.eventName}</Text>
          <Text style={styles.text}>{this.state.pos}</Text>
        </View> 
    </View>
 
  )}
6.用到的布局和样式：

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    color:'#f00',
    fontSize:30,
  },
  himiViewStyle:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  himiTextStyle:{
    color:'#f00',
    fontSize:30,
    marginTop:70,
  },
});
效果如下：（点击查看动态效果）



如上是第一种形式，下面我们简单说下如何使用第二种形式：

componentWillMount() {
    
      this.myPanResponder = PanResponder.create({
 
      //*********************第二种触摸的形式***************************
      //类似 shouldComponentUpdate，监听手势开始按下的事件，返回一个boolean决定是否启用当前手势响应器
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
 
      //监听手势移动的事件，返回一个boolean决定是否启用当前手势响应器
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
 
      //手势开始处理
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
 
      //手势移动时的处理
      onPanResponderMove: this._handlePanResponderMove.bind(this),
 
      //用户放开所有触点时的处理
      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
 
      //另一个组件成了手势响应器时（当前组件手势结束）的处理
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this)
      
    });
  }
 
  _handleStartShouldSetPanResponder(e, gestureState) {
    //返回一个boolean决定是否启用当前手势响应器
    return true;
  } 
  _handleMoveShouldSetPanResponder(e, gestureState) {
    return true;
  }
  _handlePanResponderGrant(e, gestureState) {
    this.setState({
      eventName : 'Start'
    })  
  }
  _handlePanResponderRelease(e, gestureState) {
    this.setState({
      eventName : 'End'
    })
  }
  _handlePanResponderMove(e, gestureState) {
    var _pos = 'x:' + gestureState.moveX + ',y:' + gestureState.moveY;
    this.setState({
      eventName : 'Move:',
      pos : _pos
    })
  }
  _handlePanResponderEnd(e, gestureState) {
    this.setState({
      eventName : '另一个组件成了手势响应器时（当前组件触摸结束）的处理'
    })
  }
第二种形式就是将触摸响应绑定到我们自定义的函数，其他没有基本没区别。改动只有两点：

1. 绑定时修改成将触摸事件的回调绑定到我们自定义函数。

2. 添加每个响应的自定义函数。

效果如下：（点击查看动态效果）

