## 2.1 本地开发环境搭建

第一点：准备一台苹果电脑，预算紧张可以考虑mac mini

第二点：我们需要把苹果系统升级到最新系统，并且升级好后保持一段时间的稳定

第三点：安装最新版的xcode

```
xcode-select --install
```

第四点：安装homebrew
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
第五点：安装一些项目中用到的东西

watchman是facebool的一个开源项目，它开源来监视文件并且记录文件的改动情况

flow是一个javascript的静态类型检查器，用于找出javascript代码中的类型错误。

```
brew install watchman flow git gcc pkg-config cairo libpng jpeg gitlib mongodb
```

```
brew doctor   #brew自检
brew update   #brew更新
brew install xxx                 #安装xxx
brew remove  xxx                 #卸载xxx
brew upgrade xxx                 #升级xxx
```

第六点：安装node.js，建议使用nvm来安装

先安装nvm:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
```

然后再安装node，并将该版本设置为默认:

```
nvm insatall v4.2.3
nvm alias default v4.2.3
```

再安装淘宝源的cnpm:
```
sudo npm install -g cnpm
```
先检查本地有没有开启服务占用掉8081端口。另外留意一下浏览器扩展程序的websocket可能会导致后续的rn调试受到影响。如果你发现调试启动不起来，届时可以把浏览器扩展插件程序关掉一下试试。

这里使用rn的0.22版本进行的开发。

```
brew install oh-my-zsh
```

```
cnpm install -g react-native@0.1.10 -g
react-native -v
react-native init imoocApp 
```
注意不能写成react-native init imooc-app，rn中不允许。

cd imoocApp
react-native run-ios

模拟器启动好后，可以按command ＋ 1/2/3/4来调整模拟器的尺寸大小。
按command+r可以进行刷新
按command+d然后选择enable live reload










