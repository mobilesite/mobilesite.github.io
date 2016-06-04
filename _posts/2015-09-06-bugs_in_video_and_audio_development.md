---
layout:     post
title:      "那些HTML5页面音频和视频播放开发中的坑"
subtitle:   ""
date:       2015-09-05 21:12:34
author:     "Paian"
catalog: true
tags:
    - LESS
---

## 那些HTML5页面音频和视频播放开发中的坑

之前的业务场景中比较少涉及到音视频播放的情景。最近一次开始有用到这方面的内容,本以为是个非常简单的事情,但真做起来,还是遇到了几个大坑。不过,坑并不可怕,只要找到解决办法,并总结记取,就可继续愉快滴绕坑前行。

### 一、HTML5音频播放开发中遇到的坑

### 1.1 源起

我需要打开页面时自动播放一小段背景音。因为声音持续时间非常短，所以设计时，没想要设置一个播放控制按钮。一开始我也以为确实没必要。开发中，用我的老古董机器小米2s测了也没发现啥问题。但是，用iOS机器测试时，问题就来了，有的平台中可以听到自动播放的心跳声（如iOS中的支付宝），有的则始终出不来（如iOS 中的Safari浏览器）。用JavaScript来load音频、自动触发音频的play()方法，依然不见动静。究竟是什么原因呢？

### 1.2 问题所在

如你所料，Google搜素一番，才发现原来是iOS 4.2.1之后，Safari浏览器中禁止了音频的自动播放，必须在得到用户手动允许（比如触摸屏幕，单击按钮等）的情况下，才能播放音频——也就是说，iOS Safari中, 如果没有得到用户的手动允许，即便对audio标签设置了autoplay="autoplay"属性，也是不会自动播放音频的, 参见[这里](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html)。

大致原因是Safari认为，不经过用户允许的情况下播放音频，可能会在用户不知情的情况下给用户带来较大流量的消耗。这与我“好像经常在微信中见到带自动播放背景音乐的页面”的日常生活印象是背道而驰的。经过进一步了解原因，原来是在微信平台里，页面可以自动播放音频，而在Safari中不可以，原因估计是内核不同。而在进一步的测试中，发现安卓5.0及以上的机器也存在iOS Safari中同样的问题。

### 1.3 解决办法

找到了问题，办法也就有了。在页面中加上一个按钮，点击按钮时，暂停心跳声的播放，然后紧接着又播放它。

    $('#myPlayBtn').on('click',function(){
        var audio = $('#myAudio')[0];
        audio.pause();
        audio.play();
    })

这样，在支持自动播放音频的平台中，心跳声会自动播放，且点击播放按钮的话，声音也不会停掉；在不支持音频自动播放的平台中，点击声音播放按钮，也能进行心跳声的播放。

当然，你可能需要这个声音播放按钮在声音播放的时候，显示为播放中状态，点击可以暂停；在声音不播放的时候，显示为暂停状态，点击可以开始播放。

我目前找到的最好的办法是：去掉audio的```autoplay="autoplay"```属性，让音频在所有平台下都不自动播放。在点击播放声音按钮的时候，才进行播放，并切换按钮的状态。这样就可以正确的切换按钮状态。

你可能会想，为什么不保留```autoplay="autoplay"```属性，让能自动播放的平台就自动播，不能播放的平台就点击后再播放？事实上我尝试过，但因为对自动播放音频的支持与否不同，各个平台中按钮的初始状态是不一致的，而我无法正确地获取到这种初始状态——我试过用```if( $('#myAudio')[0].paused)```来进行页面加载后音频播放状态的获取，试验结果是获取不到准确的状态。

顺便提一下，在iOS 6、7 中，Safari 处理 currentTime 会有异常：

    try {
        mp3.currentTime = 0;
    } catch(error) {
        //下面处理iOS 6、7 中Safari的currentTime＝0的异常
        if (error.code === 11) {
            function fn(evt) {
                evt.target.currentTime = 0;
                evt.target.removeEventListener("loadeddata", fn);
            }
            this.addEventListener("loadeddata", fn);
        }
    }

更多内容，可以阅读：

[http://www.ibm.com/developerworks/library/wa-ioshtml5/](http://www.ibm.com/developerworks/library/wa-ioshtml5/)

[http://www.tuicool.com/articles/ruyIVb](http://www.tuicool.com/articles/ruyIVb)

## 二、HTML5视频播放开发中遇到的坑

### 1.1 源起

（1）在遇到上述音频问题的同时，我还遇到一个视频的问题，要给视频加个封面。在PC上预览加好的封面,没问题。但到手机上一看,封面不见了。

（2）用原生的video标签，在页面中的某一个局部区域中嵌入视频，点击播放按钮时，有的浏览器中会在保持这一小块区域中播放，有的会弹出一个窗口播放，不统一。

### 1.2 解决办法

我采用了最简单粗暴的办法：

为了让这个封面显示出来，我把封面做成了一个带播放按钮的图片，点击的这张图的时候，用javascript进行视频的播放。这就解决了第一个问题。另外，在进行视频播放的时候，把视频放在一个带有```position:fixed;left:0;top:0;right:0;bottom:0; z-index:9999;```样式的video中，这就统一成全屏播放了（移动设备窗口本来就小，统一成全屏播放能看得清楚些）。

因为这次只是使用了一小段音频背景音乐和一个简单的视频播放，没有更多地进行播放控制。如果深入下去，我想肯定会遇到更多的问题。

末了，仔细想想，日常印象不一定准确，音频自动播放在微信h5页面中很常见，我以为这是audio自动支持全平台自动播放——相信不少朋友也有同样的印象，其实不全是，实践起来才真正知道。