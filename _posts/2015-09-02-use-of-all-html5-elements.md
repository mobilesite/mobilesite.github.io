---
layout:     post
title:      "HTML5标准中有多少个标签元素，都怎么用"
subtitle:   ""
date:       2015-09-02 23:13:25
author:     "Paian"
catalog: true
tags:
    - HTML5
---

虽然每天都在写HTML5页面，但是当被问起这个问题时，相信很多人都不知道。因此，有必要对它们进行一番盘点，做到心中有数。

HTML5共有103个元素。它们是：

'html',

'head', 'title', 'base', 'link', 'meta', 'style',

'body', 'article', 'section', 'nav', 'aside',
'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'address',

'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
'figure', 'figcaption', 'div', 'main'

'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data',
'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u',
'mark', 'ruby', 'rb', 'rt', 'rtc', 'rp', 'bdi', 'bdo', 'span', 'br', 'wbr',

'ins', 'del',

'img', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'source',
 'track', 'map', 'area',

'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th',

'form',  'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option', 'textarea',
'keygen', 'output', 'progress', 'meter', 'fieldset', 'legend',

'script', 'noscript', 'template', 'canvas'

![](https://mobilesite.github.io/img/in-post/html5-elements-table.png)

具体的使用及其语义，请看如下代码，里面都有详细的介绍。

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="format-detection" content="telephone=no, address=no, email=no">
    <title>HTML5到底有哪些元素，它们都怎么用？</title>
    <!-- base元素为文档中的所有链接指定基地址。如果URL中含有协议名或"//"则会忽略base指定的基地址。 -->
    <base href="https://mobilesite.github.io/img/in-post/">
    <style type="text/css">
    th,
    tr,
    td {
        border: 1px solid #f2f2f2;
    }

    figure {
        margin: 0;
    }
    </style>
    <!-- <link rel="stylesheet" type="text/css" href="https://mobilesite.github.io/css/hux-blog.min.css"> -->
</head>

<body>
	<header>
		<h1>HTML5到底有哪些元素，它们都怎么用？</h1>
		<p>
			HTML5共有103个元素。它们是：
			'html',

	    	'head', 'title', 'base', 'link', 'meta', 'style',

	    	'body', 'article', 'section', 'nav', 'aside',
	    	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'address',

	    	'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
	    	'figure', 'figcaption', 'div', 'main'

	    	'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data',
	    	'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u',
	    	'mark', 'ruby', 'rb', 'rt', 'rtc', 'rp', 'bdi', 'bdo', 'span', 'br', 'wbr',

	    	'ins', 'del',

	    	'img', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'source',
	    	 'track', 'map', 'area',

	    	'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th',

	    	'form',  'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option', 'textarea',
	    	'keygen', 'output', 'progress', 'meter', 'fieldset', 'legend',

	    	'script', 'noscript', 'template', 'canvas'
	    	<br>

	    	<img src="html5-elements-table.png" alt="">
		</p>
	</header>
    <!--main元素代表文档的主要内容。main元素中的内容对于文档来说应当是唯一的。它不应包含在文档中重复出现的内容，比如侧栏、导航栏、版权信息、站点标志或搜索表单。在一个文档中，不能出现一个以上的 main元素。main 元素不能是以下元素的后代：article、aside、footer、header 或 nav。-->
    <main>
        <article>
            <section>
                <h2>article的使用：
			它代表独立的、完整的一篇“文章”，如一个贴子、一篇文章、一条回复。可以包含 header 、 footer 、 section 等元素。</h2>
                <!-- 一篇文章 -->
                <article>
                    <header>
                        <h1>The Very First Rule of Life</h1>
                        <p>
                            <time datetime="2009-10-09">3 days ago</time>
                        </p>
                    </header>
                    <p>If there's a microphone anywhere near you, assume it's hot and sending whatever you're saying to the world. Seriously.</p>
                    <p>...</p>
                    <section>
                        <h1>Comments</h1>
                        <!-- 一条评论 -->
                        <article>
                            <footer>
                                <p>Posted by: <span>George Washington</span></p>
                                <p>
                                    <time datetime="2009-10-10">15 minutes ago</time>
                                </p>
                            </footer>
                            <p>Yeah! Especially when talking about your lobbyist friends!</p>
                        </article>
                        <!-- 一条评论 -->
                        <article>
                            <footer>
                                <p>Posted by: <span>George Hammond</span></p>
                                <p>
                                    <time datetime="2009-10-10">5 minutes ago</time>
                                </p>
                            </footer>
                            <p>Hey, you have the same first name as me.</p>
                        </article>
                    </section>
                </article>
            </section>
            <section>
                <h2>section的使用：它代表页面或某一部分的一节或一个部分，每个section一般都有一个主题思想，但未必一定要有 h元素。</h2>
                <article>
                    <header>
                        <h2>Apples</h2>
                        <p>Tasty, delicious fruit!</p>
                    </header>
                    <p>The apple is the pomaceous fruit of the apple tree.</p>
                    <!-- 此处表示文章的一个小主题 -->
                    <section>
                        <h3>Red Delicious</h3>
                        <p>These bright red apples are the most common found in many supermarkets.</p>
                    </section>
                    <section>
                        <h3>Granny Smith</h3>
                        <p>These juicy, green apples make a great filling for apple pies.</p>
                    </section>
                </article>
            </section>
            <section>
                <h2>任何具有导航性质的链接组都可以用 nav 元素，不管是主导航、还是侧边栏中的导航、还是面包屑导航、还是页面内的锚点导航。</h2>
                <header>
                    <nav>
                        <h1>Navigation</h1>
                        <ul>
                            <li><a href="articles.html">Index of all articles</a></li>
                            <li><a href="today.html">Things sheeple need to wake up for today</a></li>
                            <li><a href="successes.html">Sheeple we have managed to wake</a></li>
                        </ul>
                    </nav>
                </header>
            </section>
            <section>
                <h2>aside的使用：用于突出的引用、广告、侧边栏。</h2>
                <!-- 突出的引用 -->
                <article>
                    <p>He later joined a large company, continuing on the same work.
                        <q>I love my job. People ask me what I do for fun ...</q>
                    </p>
                    <aside>
                        <q> People ask me what I do for fun when I'm not at work. But I'm paid to do my hobby, so I never know what to answer. </q>
                    </aside>
                    <p>Of course his work — or should that be hobby? — isn't his only passion. He also enjoys other pleasures.</p>
                </article>
            </section>
            <section>
                <h2>header和footer的使用：header元素表示文档的头部，或 article的头部，或 section 的头部，或 aside的头部。footer
						与 header相对，用法亦相同。</h2>
            </section>
            <section>
                <h2>address代表联系信息，不仅仅是地址。</h2>
                <footer>
                    <address>
                        For more details, contact
                        <a href="mailto:js@example.com">John Smith</a>.
                    </address>
                    <p><small>© copyright 2038 Example Corp.</small></p>
                </footer>
            </section>
            <section>
                <h2>pre元素的使用：用于定义预格式化的文本，被包围在 pre元素中的文本通常会保留空格和换行符，常用来表示程序的源代码。</h2>
                <pre>
				            <h1>hello world</h1>
				            echo "hello world";
				            print("hello world")
				        </pre>
            </section>
            <section>
                <h2>blockquote元素用于定义引用块。</h2>
                <!-- 下面是引用内容 -->
                <blockquote>
                    <p>Hello World</p>
                </blockquote>
            </section>
            <section>
                <h2>dl、dt、dd元素的使用：用于表示自定义列表。</h2>
                <dl>
                    <dt>PHP</dt>
                    <dd>这是一个神奇的语言 ... ...</dd>
                    <dt>Java</dt>
                    <dd>以服务器语言来说，与PHP ... ...</dd>
                </dl>
            </section>
            <section>
                <h2>
							em元素把文本定义为强调的内容；
							strong 元素把文本定义为语气更强的强调的内容；
							small元素呈现小号字体效果；
							s元素定义加删除线的文本；
							cite元素通常表示它所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题。按照惯例，引用的文本将以斜体显示；
							q元素定义短的引用；
							dfn元素定义一个定义项目；
							abbr元素表示简称或缩写；
							sup、sub分别是显示成上标和小标；
							i元素定义斜体；
							b元素定义粗体文件；
							u元素为文本添加下划线；
							mark突出显示文本；
						</h2>
                <p>
                    <strong>This text is strong</strong>
                    <br>
                    <em>This text is emphasized</em>
                    <br>
                    <small>This text is small</small>
                    <br> mc
                    <sup>2</sup>
                    <br> x
                    <sub>1</sub>
                    <br>
                    <s>s</s>
                    <br>
                    <cite>《富春山居图》</cite>由黄公望始画于至正七年(1347)，于至正十年完成。
                    <i>斜体</i>
                    <b>粗体</b>
                    <u>下划线</u>
                </p>
                <p>Do not forget to buy
                    <mark>milk</mark> today.</p>
                <p>
                    The
                    <dfn>
                        <abbr title="Garage Door Opener">GDO</abbr>
                    </dfn> is a device that allows off-world teams to open the iris.
                </p>
                <p>The
                    <abbr title="Web Hypertext Application Technology Working Group">WHATWG</abbr> started working on HTML5 in 2004.
                </p>
            </section>
            <section>
                <h2>bdi、bdo的使用：bdi元素允许您设置一段文本，使其脱离其父元素的文本方向设置。bdo元素可覆盖默认的文本方向。</h2>
                <p>Username
                    <bdi dir="ltr">Steve</bdi>: 78 points</p>
                <p>Username
                    <bdi dir="rtl">Steve</bdi>: 78 points</p>
                <p>Username
                    <bdo dir="ltr">Steve</bdo>: 78 points</p>
                <p>Username
                    <bdo dir="rtl">Steve</bdo>: 78 points</p>
            </section>
            <section>
                <h2>
							time、code、var、samp、kbd。<br>
							time元素能够以机器可读的方式对日期和时间进行编码；<br>
							code元素用于表示计算机源代码或者其他机器可以阅读的文本内容；<br>
							var元素用于定义变量。可以将此标签与 pre 及 code标签配合使用；<br>
							samp元素用于定义样本文本。samp元素表示一段用户应该对其没有什么其他解释的文本字符。要从正常的上下文抽取这些字符时，通常要用到这个元素；<br>
							kbd元素定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。<br>
						</h2>
                <p>上班时间
                    <time>8:30</time> Let's Go</p>
                <p>又是<code>println("hello world")</code></p>
                <p>Then he turned to the blackboard and picked up the chalk. After a few moment's thought, he wrote
                    <var>E</var> =
                    <var>m</var>
                    <var>c</var><sup>2</sup>. The teacher looked pleased.</p>
                <p>The computer said
                    <samp>Too much cheese in tray two</samp> but I didn't know what that meant.</p>
                <p>To make George eat an apple, press
                    <kbd>
                        <kbd>Shift</kbd>+
                        <kbd>F3</kbd>
                    </kbd>
                </p>
            </section>
            <section>
                <h2>ruby、rb、rtc、rt、rp一组用得极少的元素，略过<h2>
					</section>

			    	<section>
			    		<h2>wbr的使用：Word Break Opportunity 规定在文本中的何处适合添加换行符。下面这段代码，给 p 的字体设置的足够大，然后缩小浏览器窗口，就会看到 wbr元素的效果。</h2>
                <p style="font-size: 100px;">www.simply
                    <wbr>orange
                    <wbr>juice.com</p>
            </section>
            <section>
                <h2>ins、del的使用</h2>
                <p>I love
                    <del>java</del>
                    <ins>javascript</ins>
                </p>
            </section>
            <section>
                <h2>figure、figcaption、map、area的使用</h2>
                <figure>
                    <!--<figure> 元素表示独立的流内容（图像、图表、照片、代码等等）， <figcaption> 元素给 <figure> 元素添加标题。-->
                    <figcaption>图片标题</figcaption>
                    <img src="favicon.png" width="350" height="234" usemap="#planetmap" alt="Planets">
                    <map name="planetmap" id="planetmap">
                        <!-- 一个圆形区域 -->
                        <area shape="circle" coords="200,50,50" href="test1.html" alt="Venus">
                        <!-- 一个扇形区域 -->
                        <area shape="circle" coords="350,234,50" href="test2.html" alt="Venus">
                        <!-- 一个矩形区域 -->
                        <area shape="rect" coords="0,0,110,234" href="test3.html" alt="Sun">
                    </map>
                </figure>
            </section>
            <section>
                <h2>audio、video、source的使用</h2>
                <video controls>
                    <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                    <source src="http://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg"> Your browser does not support the audio element.
                </video>
                <audio src="http://www.w3school.com.cn/i/horse.ogg" controls="controls">
                    Your browser does not support the audio element.
                </audio>
            </section>
            <section>
                <h2>object、param的使用</h2>
                <figure>
                    <object type="application/x-java-applet">
                        <param name="code" value="MyJavaClass">
                        <p>You do not have Java available, or it is disabled.</p>
                    </object>
                    <figcaption>My Java Clock</figcaption>
                </figure>
            </section>
            <section>
                <h2>track的使用：目前许多浏览器都还不支持。它为诸如 video、audio 元素之类的媒介规定外部文本轨道。用于规定字幕文件或其他包含文本的文件，当媒介播放时，这些文件是可见的。</h2>
                <video width="320" height="240" controls="controls">
                    <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">
                    <source src="http://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg">
                    <track kind="subtitles" src="subs_chi.srt" srclang="zh" label="Chinese">
                    <track kind="subtitles" src="subs_eng.srt" srclang="en" label="English">
                </video>
            </section>
            <section>
                <h2>caption、colgroup、col等表格元素的使用</h2>
                <table>
                    <caption>表格标题：花名册</caption>
                    <!-- IE6 IE7 IE8(Q) 对 COL 和 COLGROUP 元素的属性及部分 CSS 特性支持较好，而IE8(S) Firefox Chrome Safari 不再支持 COL 及 COLGROUP 元素的部分属性及为其设定的 CSS 特性。目前，被各个浏览器普遍支持的属性有width和span这两个，被各浏览器普遍支持的CSS属性有width和background这两个。 -->
                    <colgroup span="2" width="200">
                        <col>
                        <col>
                    </colgroup>
                    <colgroup>
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>拍岸</td>
                            <td>男</td>
                            <td>18</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>hello</td>
                            <td>hello</td>
                            <td>hello</td>
                        </tr>
                    </tfoot>
                </table>
            </section>
            <section>
                <h2>template的使用</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Color</th>
                            <th>Sex</th>
                            <th>Legs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template id="row">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <script>
                var data = [{
                    name: 'Pillar',
                    color: 'Ticked Tabby',
                    sex: 'Female (neutered)',
                    legs: 3
                }, {
                    name: 'Hedral',
                    color: 'Tuxedo',
                    sex: 'Male (neutered)',
                    legs: 4
                }, ];
                var template = document.querySelector('#row');
                for (var i = 0; i < data.length; i += 1) {
                    var cat = data[i];
                    var clone = template.content.cloneNode(true);
                    var cells = clone.querySelectorAll('td');
                    cells[0].textContent = cat.name;
                    cells[1].textContent = cat.color;
                    cells[2].textContent = cat.sex;
                    cells[3].textContent = cat.legs;
                    template.parentNode.appendChild(clone);
                }
                </script>
            </section>
            <section>
                <h2>
				            一些表单元素的使用: keygen、optgroup、datalist、output、progress（进度条）、meter（计量条）、fieldset、legend。<br>

							使用 meter 元素来度量给定范围（gauge）内的数据。meter标签定义已知范围或分数值内的标量测量。也被称为 gauge（尺度）。<br>

							legend 元素表示作为 legend 元素的父元素的 fieldset 元素的其余内容的标题（caption）。<br>

							output标签定义不同类型的输出，比如脚本的输出。<br>

							datalist 标签定义选项列表。请与 input元素配合使用该元素，来定义 input 可能的值。datalist 及其选项不会被显示出来，它仅仅是合法的输入值列表。请使用 input 元素的 list 属性来绑定 datalist的id以建立关联。<br>

							keygen标签规定用于表单的密钥对生成器字段。当提交表单时，私钥存储在本地，公钥发送到服务器。
			            </h2>
                <form oninput="x.value=parseInt(a.value)+parseInt(b.value)">
                    <keygen name="security">
                    <select>
                        <optgroup label="Swedish Cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                        </optgroup>
                        <optgroup label="German Cars">
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </optgroup>
                    </select>
                    <input id="myCar" list="cars" />
                    <datalist id="cars">
                        <option value="BMW">
                            <option value="Ford">
                                <option value="Volvo">
                    </datalist>
                    <input type="range" id="a" value="50">100 +
                    <input type="number" id="b" value="50"> =
                    <output name="x" for="a b"></output>
                    <progress value="22" max="100"></progress>
                    <meter value="3" min="0" max="10">十分之三</meter>
                    <meter value="0.6">60%</meter>
                    <fieldset>
                        <legend>health information</legend>
                        height:
                        <input type="text" /> weight:
                        <input type="text" />
                    </fieldset>
                </form>
            </section>
            <noscript>您的浏览器不支持JavaScript!</noscript>
            <script type="text/javascript">
	            // var html5Elements = [
	            // 	'html',

	            // 	'head', 'title', 'base', 'link', 'meta', 'style',

	            // 	'body', 'article', 'section', 'nav', 'aside',
	            // 	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'address',

	            // 	'p', 'hr', 'pre', 'blockquote', 'ol', 'ul', 'li', 'dl', 'dt', 'dd',
	            // 	'figure', 'figcaption', 'div', 'main'

	            // 	'a', 'em', 'strong', 'small', 's', 'cite', 'q', 'dfn', 'abbr', 'data',
	            // 	'time', 'code', 'var', 'samp', 'kbd', 'sub', 'sup', 'i', 'b', 'u',
	            // 	'mark', 'ruby', 'rb', 'rt', 'rtc', 'rp', 'bdi', 'bdo', 'span', 'br', 'wbr',

	            // 	'ins', 'del',

	            // 	'img', 'iframe', 'embed', 'object', 'param', 'video', 'audio', 'source',
	            // 	 'track', 'map', 'area',

	            // 	'table', 'caption', 'colgroup', 'col', 'tbody', 'thead', 'tfoot', 'tr', 'td', 'th',

	            // 	'form',  'label', 'input', 'button', 'select', 'datalist', 'optgroup', 'option', 'textarea',
	            // 	'keygen', 'output', 'progress', 'meter', 'fieldset', 'legend',

	            // 	'script', 'noscript', 'template', 'canvas'
	            // ]
            </script>
        </article>
    </main>

    <footer>
    	参考：
    	https://www.w3.org/TR/html5/index.html#elements-1<br>
    	http://demo.yanue.net/HTML5element/<br>
    	http://blog.csdn.net/wozaixiaoximen/article/details/45157439<br>
    </footer>
</body>

</html>
```
