---
layout:     post
title:      "那些让你编码效率飞起的VSCode工具和技巧"
subtitle:   ""
date:       2018-06-02 22:11:13
author:     "Paian"
catalog:    true
tags:
    - VSCode
---

老板总是干活又快又好的员工。对程序员来说，编码速度的快慢，代码质量的好坏，不仅对项目意义重大，而且也直接影响程序员的自身业绩和生活质量。本文将总结一系列VSCode编码增效工具和技巧，让你编码效率飞起来！

### 一、代码补全

- Auto Close Tag
适用于 JSX、Vue、HTML，能自动补全要闭合的标签

- Auto Rename Tag
适用于 JSX、Vue、HTML，在修改标签名时，能在你修改开始（结束）标签的时候修改对应的结束（开始）标签，帮你减少 50% 的击键

- Document This
自动生成 JSDoc 注释，快捷键ctrl+alt+d ctrl+alt+d。
或者在function上输入`/**`然后tab键也可以生成注释。

- Npm Intellisense
NPM 依赖补全，在你引入任何 node_modules 里面的依赖包时提供智能提示和自动完成，会提示已安装的模块名

- Path Intellisense
文件路径补全，在你用任何方式引入文件系统中的路径时提供智能提示和自动完成

- VueHelper
Vue2代码段(包括Vue2 api、vue-router2、vuex2)

- HTML Snippets：HTML5
各种 HTML 标签片段，可简写

- IntelliSense for CSS class names
CSS 类名补全，会自动扫描整个项目里面的 CSS 类名并在你输入类名时做智能提示

- Javascript (ES6) Code Snippets
常用的类声明、ES 模块声明、CMD 模块导入等的简写，支持的简写不下 20 种；

- Bracket Pair Colorizer
识别代码中的各种括号，并且标记上不同的颜色，方便你扫视到匹配的括号，在括号使用非常多的情况下能环节眼部压力，编辑器快捷键固然好用，但是在临近嵌套多的情况下却有些力不从心

- Color Info
这个便捷的插件，将为你提供你在 CSS 中使用颜色的相关信息。你只需在颜色上悬停光标，就可以预览色块中色彩模型的（HEX、 RGB、HSL 和 CMYK）相关信息了。

- jQuery Code Snippets
jQuery代码提示

- React.js Code Snippets
React代码提示

- React Redux ES6 Snippets
Redux代码提示

此外，值得一提的是：

VSCode 内置的智能建议已经非常强大，不过我对默认的配置做了如下修改，以达到类似于在 Vim 中那样在任何地方都启用智能提示（尤其是注释和字符串里面）：

```
{
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
}
```

值得注意的是，VSCode中内置了Emmet插件，所以可以用Emmet语法简写来快速编码。比如：

```
ul>li.item*3
```

让它生成目标代码的方法是按tab键。

### 二、代码格式化和质量保证

- EditorConfig for VS Code
结合.editorconfig配置文件来起作用

.editorconfig配置文件：

```
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = false # 这一项不能设置为true，因为它会导致vue文件的style和script块中的代码在格式化后末尾出现一个空行。
trim_trailing_whitespace = true

# editorconfig-tools is unable to ignore longs strings or urls
max_line_length = null
```

- ESLint
Javascript语法检测，高亮提示

- Code Spell Checker
单词拼写检查

- HTMLHint
HTML语法错误检查

- markdownlint
Markdown格式提示

- vetur
Vue 开发生态必备插件（官方推荐），处理的是.vue 文件，支持 Syntax Highlighting， Emmet 2.0，Snippet，Foramtting，IntelliSense，Linting 等

- Prettier
代码格式化

- Beautify
代码格式化

- vscode-icons
给不同类型的文件加上图标，方便文件查找

- Import Cost
自动计算 Import 包大小，便于控制代码体积

- filesize
在底部状态栏显示当前文件大小，点击后还可以看到详细创建、修改时间、gzip压缩后的大小等。

- Markdown All In One
Markdown 格式化

- TSLint
TypeScript 目前不是我的主要编程语言，但也早早的准备好了；

- MarkdownLint
Markdown 如果不合法，可能在某些场合导致解析器异常，因为 Markdown 有好几套标准，在不同标准间部分语法支持可能是不兼容的

- TODO Highlight
这个插件能够在你的代码中标记出所有的 TODO 注释，以便更容易追踪任何未完成的业务。在默认的情况下，它会查找 TODO 和 FIXME 关键字。当然，你也可以添加自定义表达式。

- Regex Previewer
这是一个用于实时测试正则表达式的实用工具。它可以将正则表达式模式应用在任何打开的文件上，并高亮所有的匹配项。

### 三、代码预览与测试

- Code Runner
运行选中代码段(支持大量语言，包括Node)

- Open in Browser
在浏览器中打开

- SVG Viewer
SVG 查看器

- Markdown PDF
Markdown 转 PDF

### 四、版本控制

- Git Blame
在状态栏显示当前行的Git信息

- Git History(git log)
查看git log

- GitLens
显示文件最近的commit和作者，显示当前行commit信息

### 五、其它插件

#### 切换项目

- Project Manager
项目管理，让我们方便的在命令面板中切换项目文件夹，当然，你也可以直接打开包含多个项目的父级文件夹，但这样可能会让 VSCode 变慢

#### 代码跟踪

- vue peek
用于跟踪vue.js代码的工具

#### 代码片段比对

- Partial Diff
对比两段代码或文件

#### 代码转换

- ECMAScript Quoets Transformer
ECMAScript Quotes Transformer 方便在字符串和变量混搭模式（String Concat）的代码和字符串模板（Template Literals）模式间来回转换，省去手动的移动光标、修改引号等操作。

#### 同步VSCode的设置信息

- Settings Sync
VSCode设置同步到Gist

讲了这么多插件，那这些插件怎么配置呢？下面附上我的VSCode配置文件供大家参考：

```
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.fontSize": 18,
  "editor.wordWrap": "on",
  "editor.detectIndentation": false,
  "editor.cursorBlinking": "smooth",
  "editor.formatOnPaste": true,
  // 是否允许自定义的snippet片段提示,比如自定义的vue片段开启后就可以智能提示
  "editor.snippetSuggestions": "top",
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 500,
  "files.trimTrailingWhitespace": true,
  // 配置文件关联，以便启用对应的智能提示，比如wxss使用css
  "files.associations": {
    "*.vue": "vue",
    "*.wxss": "css"
  },
  // 配置emmet是否启用tab展开缩写
  "emmet.triggerExpansionOnTab": true,
  // 配置emmet对文件类型的支持，比如vue后缀文件按照html文件来进行emmet扩写
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "javascriptreact",
    // xml类型文件默认都是单引号，开启对非单引号的emmet识别
    "xml": {
      "attr_quotes": "single"
    }
  },
  // 在react的jsx中添加对emmet的支持
  "emmet.includeLanguages": {
    "jsx-sublime-babel-tags": "javascriptreact"
  },
  // 是否开启eslint检测
  "eslint.enable": false,
  // 文件保存时，是否自动根据eslint进行格式化
  "eslint.autoFixOnSave": false,
  // eslint配置文件
  "eslint.options": {
    "plugins": [
      "html",
      "javascript",
      {
        "language": "vue",
        "autoFix": true
      },
      "vue"
    ]
  },
  // eslint能够识别的文件后缀类型
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    "vue",
    "typescript",
    "typescriptreact"
  ],
  // 格式化快捷键 shirt+alt+F
  // prettier进行格式化时是否安装eslint配置去执行，建议false
  "prettier.eslintIntegration": true,
  // 如果为true，将使用单引号而不是双引号
  "prettier.singleQuote": true,
  "prettier.tabWidth": 2,
  // vetur插件格式化使用beautify内置规则
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  // 下面这一段不能少，否则回导致VSCode格式化代码时无法正确格式化vue的style和script块（缩进为4个空格）。
  "beautify.language": {
    "js": {
      "type": [
        "javascript",
        "json"
      ],
      "filename": [
        ".jshintrc",
        ".jsbeautify"
      ]
    },
    "css": [
      "css",
      "scss",
      "less"
    ],
    "html": [
      "htm",
      "html",
      "vue"
    ]
  },
  "gitlens.keymap": "chorded",
  "gitlens.historyExplorer.enabled": true,
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "sync.gist": "mobilesite"
}
```

### 六、命令行

```
code .  # 用VSCode打开当前目录
code xxx # 用VSCode打开某个目录
```

### 七、快捷键

#### 1、关于 行 的操作

- 新开一行：
光标在行尾的话，回车即可；
光标不在行尾，ctrl + enter 向下重开一行；ctrl + shift + enter 则是在上一行重开一行

- 删除一行：
光标没有选择内容时，ctrl + x 剪切一行；ctrl + shift + k 直接删除一行

- 移动一行：
alt + ↑ 向上移动一行；alt + ↓ 向下移动一行

- 复制一行：
alt + shift + ↓ 向下复制一行；alt + shift + ↑ 向上复制一行

#### 2、关于 词 的操作

- 选中一个词：
ctrl + d

- 搜索/替换：
ctrl + f ：搜索
ctrl + alt + f： 替换
ctrl + shift + f：在项目内搜索

### 八、用户代码片段

所谓用户代码片段，你可以理解为是一小段可以被复用的模板程序。怎么复用这个模板程序呢，就是在需要插入这段程序的地方输入一个代号，然后按回车，就完成了这段程序的插入。目的是减少重复的输入。下面我们就来新建一个用户代码片段：

点击编辑器左下脚的齿轮图标==》选择“用户代码片段”==》“新建用户全局代码片段文件”==》随便起个名字（如vuetemp），然后在文件写入如下内容：

```
{
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<template>",
        "<div :class=\"`px-page ${$hasNavbarClass} px-page--$1`\">",
          "$5",
        "</div>",
      "</template>",
      "<script>",
        "$3",
        "import {",
          "mapState,",
          "mapGetters,",
          "mapActions,",
          "mapMutations",
        "} from 'vuex';",
        "export default {",
          "name: '$2',",
          "components: {",
            "$4",
          "},",
        "}",
      "</script>",
      "<style lang=\"less\">",
        "@import \"../../styles/pxui/index.less\";",
        "$6",
      "</style>"
    ],
    "description": "a new vue file template"
  }
}
```

然后在新建一个文件之后，就可以直接键入`vue`(与上面prefix中指定的字符相同即可)，再回车就可以自动插入上述body中定义的代码片段了。其中的$1、$2...之类是用来标记代码片段插入后，光标的切换位置。

怎么样，这些黑科技不是很有效呢？马上用起来吧！

参考文章：

[vscode 插件推荐 - 献给所有前端工程师](https://segmentfault.com/a/1190000006697219)

[能让你开发效率翻倍的 VSCode 插件配置（上） ](https://mp.weixin.qq.com/s?src=11&timestamp=1527932714&ver=914&signature=RKiKiJdgwdjxQdJ7oUC550qnHzSmuqZ4M7DdpJ4fQ8HVf*a2vPGUV2Daa2b1ZBf-kzOFdtdfGl-gVMfdzkkhhm5b3DJPIJqhfJAfVFsGYfto-f6K5TExgFuL9k9TxPmO&new=1)

[能让你开发效率翻倍的 VSCode 插件配置（中）](https://mp.weixin.qq.com/s?src=11&timestamp=1527932714&ver=914&signature=RKiKiJdgwdjxQdJ7oUC550qnHzSmuqZ4M7DdpJ4fQ8GFv33rrDu7xCrzFinXOrpzVAX2kiCQx9qYmwL6TV-ASS07POw5IfPyCiEe4Y0Ci3x8kHz3SPgLNSVizqhzkhpK&new=1)
