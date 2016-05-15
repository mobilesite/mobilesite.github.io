#拍岸的个人博客

[访问地址](http://mobilesite.github.io)


### 一. 环境的搭建

本博客采用了jekyll + github-pages

#### gem相关配置

如果用的是windows系统,需要先安装ruby,比如到![ruby官网](http://rubyinstaller.org/downloads/)下载ruby2.0.0p648版本,然后配置一下环境变量.

如果用的是mac系统,则无需自己安装ruby.

由于众所周知的原因,国内直接使用gem安装一些东西会下载不了,所以需要配置一下gem镜像:

请尽可能用比较新的 RubyGems 版本。

```
gem update --system # 这里请翻墙一下
gem -v

gem sources --add https://gems.ruby-china.org/ --remove https://rubygems.org/
gem sources -l

# 确保此时的输出只有 gems.ruby-china.org

```

#### 安装jekyll

注:如果在Mac系统下使用```gem install xxx```安装东西时提示类似这样的错误"You don't have write permissions for the /Library/Ruby/Gems/2.0.0 directory.",请在```gem install```之前加上sudo.

```
sudo gem install jekyll
```

因为这个博客用到了jekyll-paginate(注意不要拼写错误,是paginate而不是pagenate),所以我们还需要单独安装一下它.

```
sudo gem install jekyll-paginate
```

### 本地服务的启动

```jekyll serve```

启动好之后可以用127.0.0.1:4000访问

### 编译

```jekyll build```


进行到这里,基本上就可以自己开始玩这个博客了.


## 二. 模板的使用

这里采用了 git@github.com:Huxpro/huxblog-boilerplate.git 中的模版经过加工修改而成.


#### Get Started

你可以通用修改 `_config.yml`文件来轻松的开始搭建自己的博客:

```
# Site settings
title: Paian's Blog              # 你的博客网站标题
SEOTitle: Paian's Blog			 # 在后面会详细谈到
description: "指尖程序,笔下诗行"   # 随便说点，描述一下

# SNS settings      
github_username: mobilesite      # 你的github账号
weibo_username: xxxx             # 你的微博账号，底部链接会自动更新的。

# Build settings
# paginate: 10                   # 一页你准备放几篇文章
```

Jekyll官方网站还有很多的参数可以调，比如设置文章的链接形式...网址在这里：[Jekyll - Official Site](http://jekyllrb.com/) 中文版的在这里：[Jekyll中文](http://jekyllcn.com/).

#### 如何发表文章

要发表的文章一般以markdown的格式放在这里`_posts/`，你只要看看这篇模板里的文章你就立刻明白该如何设置。

yaml 头文件长这样:

```
---
layout:     post
title:      "Hey, this is Paian."
subtitle:   "A subtitle here"
date:       2013-01-04 05:20:00
author:     "Paian"
header-img: "img/xxx.jpg"
tags:
    - Introduction
---

```

#### 侧边栏

设置是在 `_config.yml`文件里面的`Sidebar settings`那块。
```
# Sidebar settings
sidebar: true  #添加侧边栏
sidebar-about-description: "简单的描述一下你自己"
sidebar-avatar: /img/avatar.jpg     #你的大头贴，请使用绝对地址.
```

侧边栏是响应式布局的，当屏幕尺寸小于992px的时候，侧边栏就会移动到底部。具体请见bootstrap栅格系统 <http://v3.bootcss.com/css/>


#### Mini About Me

Mini-About-Me 这个模块将在你的头像下面，展示你所有的社交账号。这个也是响应式布局，当屏幕变小时候，会将其移动到页面底部，只不过会稍微有点小变化，具体请看代码。

#### Featured Tags

```
# Featured Tags
featured-tags: true  
featured-condition-size: 1     # A tag will be featured if the size of it is more than this condition value
```

唯一需要注意的是`featured-condition-size`: 如果一个标签的 SIZE，也就是使用该标签的文章数大于上面设定的条件值，这个标签就会在首页上被推荐。
 
内部有一个条件模板 `{% if tag[1].size > {{site.featured-condition-size}} %}` 是用来做筛选过滤的.


#### WATCHLIST

这里可以添加一些你经常关注的链接。这会在全部页面显示。

设置是在 `_config.yml`文件里面的`WATCHLIST`那块，自己加吧。

```
# WATCHLIST
friends: [
    {
        title: "Foo Blog",
        href: "http://foo.github.io/"
    },
    {
        title: "Bar Blog",
        href: "http://bar.github.io"
    }
]
```


#### Keynote Layout

HTML5幻灯片的排版：


这部分是用于占用html格式的幻灯片的，一般用到的是 Reveal.js, Impress.js, Slides, Prezi 等等.我认为一个现代化的博客怎么能少了放html幻灯的功能呢~

其主要原理是添加一个 `iframe`，在里面加入外部链接。你可以直接写到头文件里面去，详情请见下面的yaml头文件的写法。

```
---
layout:     keynote
iframe:     "http://xxx/xxx...."
---
```

iframe在不同的设备中，将会自动的调整大小。保留内边距是为了让手机用户可以向下滑动，以及添加更多的内容。


#### Comment

博客不仅支持多说[Duoshuo](http://duoshuo.com)评论系统，也支持[Disqus](http://disqus.com)评论系统。

`Disqus`优点是：国际比较流行，界面也很大气、简介，如果有人评论，还能实时通知，直接回复通知的邮件就行了；缺点是：评论必须要去注册一个disqus账号，分享一般只有Facebook和Twitter，另外在墙内加载速度略慢了一点。想要知道长啥样，可以看以前的版本点[这里](http://brucezhaor.github.io/about.html) 最下面就可以看到。

`多说` 优点是：支持国内各主流社交软件(微博，微信，豆瓣，QQ空间 ...)一键分享按钮功能，另外登陆比较方便，管理界面也是纯中文的，相对于disqus全英文的要容易操作一些；缺点是：就是界面丑了一点。
当然你是可以自定义界面的css的，详情请看多说开发者文档 http://dev.duoshuo.com/docs/5003ecd94cab3e7250000008 。

**首先**，你需要去注册一个账号，不管是disqus还是多说的。**不要直接使用我的啊！**

**其次**，你只需要在下面的yaml头文件中设置一下就可以了。

```
duoshuo_username: _你的用户名_  (这里填的实际不是用户名,是多说分配给你的那个域名)
# 或者
disqus_username: _你的用户名_
```

**最后**多说是支持分享的，如果你不想分享，请这样设置：`duoshuo_share: false`。你可以同时使用两个评论系统，不过个人感觉怪怪的。

#### Analytics

网站分析，现在支持百度统计和Google Analytics。需要去官方网站注册一下，然后将返回的code贴在下面：

```
# Baidu Analytics
ba_track_id: xxxxxxxxxxxxxx

# Google Analytics
ga_track_id: 'UA-xxxxxx-xxxx'            # 你用Google账号去注册一个就会给你一个这样的id
ga_domain: xxxxxxxxx		             # 默认的是 auto, 这里我是自定义了的域名，你如果没有自己的域名，需要改成auto。
```

#### Customization

如果你喜欢折腾，你可以去自定义我的这个模板的 code，[Grunt](gruntjs.com)已经为你准备好了。（感谢 Clean Blog）

JavaScript 的压缩混淆、Less 的编译、Apache 2.0 许可通告的添加与 watch 代码改动，这些任务都揽括其中。简单的在命令行中输入 `grunt` 就可以执行默认任务来帮你构建文件了。如果你想搞一搞 JavaScript 或 Less 的话，`grunt watch` 会帮助到你的。

**如果你可以理解 `_include/` 和 `_layouts/`文件夹下的代码（这里是整个界面布局的地方），你就可以使用 Jekyll 使用的模版引擎 [Liquid](https://github.com/Shopify/liquid/wiki)的语法直接修改/添加代码，来进行更有创意的自定义界面啦！**

#### Header Image

标题底图是可以自己选的，看看几篇示例post你就知道如何设置了。

但是需要注意的是本模板的标题是**白色**的，所以背景色要设置为**灰色**或者**黑色**，总之深色系就对了。当然你还可以自定义修改字体颜色，总之，用github pages就是可以完全的个性定制自己的博客。

#### SEO Title

我的博客标题是 **“Paian's Blog”** 但是我想要在搜索的时候显示 **“拍岸的博客 | Paian's Blog”** ，这个就需要SEO Title来定义了。

其实这个SEO Title就是定义了<head><title>标题</title></head>这个里面的东西和多说分享的标题，你可以自行修改的。

## 致谢

1. 感谢[@IronSummitMedia](https://github.com/IronSummitMedia/startbootstrap-clean-blog-jekyll)和[@huxpro](https://github.com/huxpro)的模版和文档,大大加快了我的博客搭建速度,赞他们的开源精神!

2. 感谢Jekyll、Github Pages 和 Bootstrap提供的产品和服务!



