---
layout:     post
title:      "用`npm link`实现引用本机中的模块"
subtitle:   ""
date:       2017-03-12 10:52:12
author:     "Paian"
catalog: true
tags:
    - npm link
    - 模块化
---

有的时候，我们有一个开发中的npm模块或者一个不能对外发布的npm模块，想要引入到某项目中去。有时候，在npm模块的开发中也希望把它引入到项目中去试试效果。

但是，由于该模块未发布到npmjs.com上，怎么在项目中才能引用到它呢？

用`npm link`实现引用本机中的模块，就像在本机的项目中使用`npm install module`名称安装了该模块一样。

第一步：

进入到某lib项目（如d:/env）下，执行`npm link`。

这样一个操作就会在`/Users/dennis/.nvm/versions/node/v5.12.0/lib/node_modules/`这一当前在用版本的node.js的全局模块目录下新建一个env目录，模块具体指向的文件名在该lib的package.json文件中指定。

第二步：

再切换到要使用该lib的项目目录（假设为project）下，使用`npm link env`让project/node_modules/env指向全局目录（/Users/dennis/.nvm/versions/node/v5.12.0/lib/node_modules/）下的env。

上述第二步是让project/node_modules/env指向全局的node_modules/env；第一步是生成全局的node_modules/env，并让全局的node_modules/env指向本地真实的lib项目目录（如d:/env）。

这样就实现了在project项目中引入本机env的库，只要env目录修改，project引用到的库的内容也就同时变了。


