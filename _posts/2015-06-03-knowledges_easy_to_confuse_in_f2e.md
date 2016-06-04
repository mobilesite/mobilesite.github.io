---
layout:     post
title:      "前端工程师易混知识点集合"
subtitle:   ""
date:       2015-06-03 19:55:54
author:     "Paian"
catalog: true
tags:
    - 前端易混淆知识点
---

## 前端工程师易混知识点集合

相信和许多行业一样,有着几年经验的前端工程师一定也会发现一些本领域容易混淆的知识点。每次用上它们的时候都要查上一遍,方能确认。这种感觉有多不爽,我也是深有体会的。知道"宝宝"们心里苦,懒得去总结,因此特给大家总结一份。

### 一、odd 和  even 到底谁是奇,谁是偶,是不是像到底谁娶了大乔、谁娶了小乔一样难记?

不管是在CSS伪类选择器中,还是在jQuery的选择器中,都会碰到这俩讨厌的词,开发哥哥们见到这俩姐妹总是傻傻分不清楚的一定不在少数。下面告诉大家我的助记绝招。

odd虽然英文发音有点像"偶的",但却不是偶的啊。所以,你只要记住"偶的"(odd)不是偶的,就可以区分这俩姐妹了。

或者还有一个助记方法: odd  —— 奇 , 骄傲的(odd)公鸡(奇)。

### 二、绕脑的apply和call,表示什么意思,用什么参数,方法拥有者和借用者到底谁在前谁在后?

下面告诉大家四句话来记住它们。

功能上：都是借鸡给你生蛋／借花给你献佛

顺序上：拥有者在前，借用者在后

第一个参数：都是借用者

第二个参数：apply第二个参数是个array(apply、array都是以a开头,利用这一点助记)

JavaScript中有两个方法很常用但给人的感觉很绕——apply和call。初学者在使用时往往要先“捋”一把思路，才敢把它们敲进程序里，用着实在不方便。下面咱们争取用四句话理解它们，扎扎实实融进记忆里。希望下次使用它们时，凭感觉就知道怎么用，不要再去“捋“思路了。

#### 1、功能上：都是借鸡给你生蛋／借花给你献佛。

首先，我们来看一个比较形象的例子。

    var aOwner;//一个主人
    var aGuest;//一个客人

    function Owner(){
        //主人构造器
    };
    function Guest(){
        //客人构造器
    };

    Owner.prototype = {
        makeToast: function(msg){
            console.log(msg);
        }
    };

    //new方法会将所创建对象（aOwner）的原型（__proto__隐藏属性）
    //指向函数构造器的prototype（Owner.prototype），
    //而上面的代码中又将Owner.prototype指向了一个含有makeToast的对象。
    //从而使得new出来的对象（aOwner）的原型链上能够找到makeToast。
    aOwner = new Owner();
    aGuest = new Guest();

    aOwner.makeToast('诸位光临寒舍，蓬荜生辉，欢迎大家的到来，让我们为今天的相聚共同举杯！');

    aOwner.makeToast.apply(aGuest, ['今天在场很多都是我景仰多年的专家、老师、前辈，作为新入行的小学生，能与大家相识，实在荣幸！在这里借主人的酒敬大家一杯，请！']);

    aOwner.makeToast.call(aGuest, '今天在场很多都是我景仰多年的专家、老师、前辈，作为新入行的小学生，能与大家相识，实在荣幸！在这里借主人的酒敬大家一杯，请！');

上面例子中，是主人（aOwner）把敬酒这一权利（即makeToast方法）借给了客人（aGuest），并允许客人使用自己的敬酒词（即参数）。

#### 2、顺序上：拥有者在前，借用者在后

使用时之所以会觉得绕。是因为你往往习惯上把借用者当作书写代码的“第一人称“，想直接用 借用者.方法名() 的方式调用该方法。但这种方式是错误的。为什么呢？

试想，如果把借用者写在前面的话，那么因为借用者根本没有这个方法，怎么能够直接调用呢？所以必须是方法的拥有者写在前面。你可以这样记：“没借给你之前只有我才能调动“。

#### 3、第一个参数：都是借用者，也是方法被借用时方法内部this的指向所在。

apply和array的第一个参数都是借用者。当方法被这个借用者借用时，因为主人已经把方法借给你了，那么借用时内部的this指向就是你这个借用者了（借给你的这段时间就归你管了）。

#### 4、第二个参数：apply第二个参数是个 array

apply和array的第一个字母都是a，可以利用这一点关联来进行记忆。这样就可以把apply和array的穿参方式区分开。

总结一下就是：借机给你生蛋；没借给你之前只有我才能调动；借给你这段时间就归你管了；’a’pply第二个参数是’a’rray。

### 三、字符串的substr()、substring()和slice()方法

在JavaScript中,这几个家伙就像周瑜和诸葛亮那样,让开发哥哥们生出"既生瑜何生亮"的感慨和无奈!

1、```stringObject.substr(start[,length])```

substr的第一、第二个参数分别为start和length。

start是必需的参数。即要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length属性可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。

2、```stringObject.substring(start[,stop])```

start属性必需。一个非负的整数，规定要提取的子串的第一个字符在 stringObject 中的位置。
stop可选。一个非负的整数，比要提取的子串的最后一个字符在 stringObject 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。

注意:

**
substring() 方法返回的子串包括 start 处的字符，但不包括 stop 处的字符。

如果参数 start 与 stop 相等，那么该方法返回的就是一个空串（即长度为 0 的字符串）。如果 start 比 stop 大，那么该方法在提取子串之前会先交换这两个参数。

与 slice() 和 substr() 方法不同的是，substring() 不接受负的参数。

**

相比于substr的短小精悍,这个substring就像一只高傲的孔雀,拖着长长的尾巴(方法命中多了个'ing'),还不接受负的参数,stop居然还比通常意义上理解的截止位置多1,这种难记难用右易混淆的方法,真心应该遭到吐槽和废弃!

3、```stringObject.slice(start,end)```

start要抽取的片断的起始下标。如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。

end紧接着要抽取的片段的结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。

返回值: 一个新的字符串。包括字符串 stringObject 从 start 开始（包括 start）到 end 结束（不包括 end）为止的所有字符。

slice的两个参数所表达的意义与substring是相同的,只是slice的参数允许使用负数和substring则不允许。


### 四、数组的slice()、splice()方法

1、```arrayObject.slice([begin[,end]])```

把数组中一部分的浅复制（shallow copy）存入一个新的数组对象中，并返回这个新的数组。

参数:

begin

从该索引处开始提取原数组中的元素（从0开始）。如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2)表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。如果省略 begin，则 slice 从索引 0 开始。

end

在该索引处结束提取原数组元素（从0开始）。slice会提取原数组中索引从 begin 到 end 的所有元素（包含begin，但不包含end）。

slice(1,4) 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。

如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1)表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

如果 end 被省略，则slice 会一直提取到原数组末尾。

描述:

slice 不修改原数组，只会返回一个包含了原数组中提取的部分元素的一个新数组。原数组的元素会按照下述规则拷贝("一级深拷贝"[one level deep]规则)：

如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则改变将反应到新的和原来的数组中。

对于字符串和数字来说（不是 String 和 Number 对象），slice 会拷贝字符串和数字到新的数组里。在一个数组里修改这些字符串或数字，不会影响另一个数组。

如果向两个数组任一中添加了新元素，则另一个不会受到影响。


2、```arrayObject.splice(start, deleteCount[, item1[, item2[, ...]]])```

splice() 方法用新元素替换旧元素，以此修改数组的内容。

参数:

start​

从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位。

deleteCount

整数，表示要移除的数组元素的个数。如果 deleteCount 是 0，则不移除元素。这种情况下，至少应添加一个新元素。如果 deleteCount 大于start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。

itemN

是要添加进数组中用于替换被删除的元素的新元素。如果不指定，则 splice() 只删除数组元素,不进行添加。

返回值:

由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

描述:

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。


注意:

splice() 方法与 slice() 方法的作用是不同的，splice() 方法会直接对数组进行修改。

下面举个例子:

    <script type="text/javascript">

    var arr = new Array(6)
    arr[0] = "George"
    arr[1] = "John"
    arr[2] = "Thomas"
    arr[3] = "James"
    arr[4] = "Adrew"
    arr[5] = "Martin"

    document.write(arr + "<br />")
    arr.splice(2,3,"William")
    document.write(arr)

    </script>

输出：

George,John,Thomas,James,Adrew,Martin
George,John,William,Martin


### 五、数组的shift和unshift(element1, ..., elementN)方法

1、arrayObject.shift()

shift() 方法删除数组的 第一个 元素，并返回这个元素。该方法会改变数组的长度。

例如:

    var myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

    var result = myFish.shift();  // 'angel'

    console.log(myFish); // ["clown", "mandarin", "surgeon"]

2、arrayObject.unshift(element1, ..., elementN)

unshift(element1, ..., elementN)) 方法在数组的开头添加一个或者多个元素，并返回数组新的 length 值。

参数列表:

element1, ..., elementN

要添加到数组开头的元素。

**可见, shift是从数组头部删除掉一个元素,返回值就是这个被删除的元素,而unshift是在数组头部添加进一个或多个元素,返回值是添加元素之后数组的总长度。**

参考文档:

[MDN JavaScript参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference)

[W3CSchool JavaScript教程](http://www.w3school.com.cn/js/index.asp)







