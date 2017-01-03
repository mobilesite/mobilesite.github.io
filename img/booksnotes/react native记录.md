
关于android真机调试：

I am using HTC One on Ubuntu and there is no menu option, anyway this is the summary of the answers that worked for me:

Create the project 
$ react-native init MyProject
$ cd MyProject/
In first console tab run and leave it running as you develop (react-native start alternative): $ npm start
In second console tab compile and install the project (connect the device to the USB if you want): $ react-native run-android
Fix ReferenceError: Can't find variable: __fbBatchedBridge:
Find you local ip address by executing ifconfig on Linux/Mac, for example: inet addr:192.168.0.3
Shake the device to see menu options while app is running (if you don't have "Menu" button)
Go to Dev Settings -> Debug server host & port for device in Debugging section and copy your local ip address with the specific port: 192.168.0.3:8081 (the port can be viewed when running npm start from the first tab) then go/press Back
Shake the device to see menu options again and press Enable Live Reload (to see changes live when editing)
Shake the device to see menu options again and press Reload JS


## 在构建中看到一个红色错误页面

如果是真机，需要设置server ip 为你电脑的ip

## 白屏，没有任何页面

如果点击menu键或者摇一摇也没任何反应，请在应用管理里面，找到当前应用的权限管理，允许使用悬浮窗。

## 修改文件夹的读写权限：

sudo chmod -R 755 xxx(文件夹)

## mongodb安装

brew install mongodb

sudo mkdir /data/db

sudo chown -R username /data/db

