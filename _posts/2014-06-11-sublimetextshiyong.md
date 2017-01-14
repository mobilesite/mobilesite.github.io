---
layout:     post
title:      "Sublime Text 的使用"
subtitle:   ""
date:       2014-06-11 22:13:52
author:     "Paian"
catalog: true
tags:
    - Sublime Text
---

### Sublime Text 的使用

#### Sublime Text的几项重要配置

打开 Preferences > Settings 菜单，然后会看到两个配置文件。左边的是默认的配置，右边的是用户自定义的配置。我们把以下的配置代码粘贴进右边的配置文件中。这些代码主要是完成给编辑器中代码设置合适的字号（这里设置成13）、解决经常启动时提示你要更新sublime text软件的问题 以及 每次换行光标自动跑到行首去了的问题。

```
{
	"font_size": 13, //给编辑器中代码设置合适的字号
	"ignored_packages":
	[
		"Vintage"
	],
	"update_check": false, //解决经常启动时提示你要更新sublime text软件的问题
	"auto_indent": true //解决每次换行光标自动跑到行首去了的问题
}
```

#### Go to Anything的使用

Ctrl+p调出Go to Anything输入框，在其中输入路径或文件名，可以快速的找到文件。

再输入@符号，可以定位到文件中的具体位置，比如，CSS样式文件中的某一条样式，JS文件中的某个函数。

Ctrl+shift+p调出输入框，在其中输入JS、CSS、HTML等，可以快速地切换文件使用何种语法，比如，JS语法、CSS语法、HTML语法等等。

#### 多行游标功能

Ctrl+h查找替换

产生多行游标的方式：

1、多行游标功能可以对同一内容进行修改、替换，也可同时在多个位置插入同一内容。
选中第一个要替换的内容，然后ctrl+d选择下一个位置，如果这个位置不是你所需要的，按ctrl+k跳过该位置，再按ctrl+d继续寻找下一个需要的位置。以此类推，可以一次选中多个要替换的位置，或者要插入内容的位置，然后统一进行修改或插入。

2、选中第一个待选中的位置，然后按ALT+F3可以把所有相同的位置都选择上

3、ctrl+a然后再ctrl+shift+L也可以产生多行游标，可以在每行中进行同一内容的插入或修改

4、按住shift同时对鼠标进行拖拽，也可以产生多行游标

#### 插件的使用

ctrl + shift + p 输入 install package

待可安装列表下载完了之后，通过输入emmet查找到对应的emmet插件， 回车安装后就可以使用简写输入了。

比如输入html:5后按下ctrl + e键，就可以完成如下好几行代码的编写。

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

</body>
</html>
```

类似的输入：

(div#container.container>ul>(li.item{列表项}*5))+(p.description{描述文案})

全选中它，或者将光标置于该行的行尾，按ctrl+e会生成如下代码：

```
    <div id="container" class="container">
		<ul>
			<li class="item">列表项</li>
			<li class="item">列表项</li>
			<li class="item">列表项</li>
			<li class="item">列表项</li>
			<li class="item">列表项</li>
		</ul>
	</div>
	<p class="description">描述文案</p>
```

另外，安装一个sidebarenhancement插件会大大扩展邮件的功能，最典型的就是邮件单击文件，选择在所需的浏览器中打开。
