---
layout:     post
title:      "一个简单的纯客户端倒计时"
subtitle:   ""
date:       2013-04-08 22:10:16
author:     "Paian"
catalog: true
tags:
    - 倒计时
---

注意：这是一个简单的纯客户端倒计时的实现，并不很严谨，仅限用于非重要场景。因为没有依赖于服务端的时间。真正的倒计时是需要以服务端时间为准的，避免用户修改系统时间。

```
/**
 * 简单倒计时
 *
 * @param destination {number} 是倒计时结束点的时间戳
 * @author paian
 */

function F(destination) {
    this.destination = destination;
}

F.prototype.init = function() {
    this.render();
}

F.prototype.updateDom = function(days, hours, minutes){
    if (days == '00'  && hours == '00'  && minutes == '00') {
        return;
    }

    $('.J-days').html(days);
    $('.J-hours').html(hours);
    $('.J-minutes').html(minutes);
}

F.prototype.refreshTime = function () {
    var now = new Date().getTime();
    var offset = this.destination - now;
    var days;
    var hours;
    var minutes;

    if(offset < 0) {
        days = '00';
        hours = '00';
        minutes = '00';
    } else {
        days = Math.floor(offset / (24 * 60 * 60 * 1000)) + '';
        offset = offset % (24 * 60 * 60 * 1000);

        hours = Math.floor(offset / (60 * 60 * 1000)) + '';
        offset = offset % (60 * 60 * 1000);

        minutes = Math.floor(offset / (60 * 1000)) + '';

        if(days.length == 1) {
            days = '0' + days;
        };
        if(hours.length == 1) {
            hours = '0' + hours;
        };
        if(minutes.length == 1) {
            minutes = '0' + minutes;
        };
    }

    this.updateDom(days, hours, minutes);
}

F.prototype.startTimer = function () {
    var that = this;
    that.refreshTime();
    setInterval(function(){
        that.refreshTime();
    }, 1000);
}

F.prototype.render = function() {
    this.startTimer();
}

module.exports = F;
```