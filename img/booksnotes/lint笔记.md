## lint学习笔记


### 安装

	npm install eslint

### 配置

ESLint的配置有三种方式：

#### 1、.eslintrc.*文件的配置

首先你需要初始化配置文件。

	eslint init
	
这将会在你的当前目录下生成一个.eslintrc.*文件。.eslintrc的后缀可以是.js、.yalm、.yml和.json中的任意一个。以.json格式为例。

.eslintrc.json 文件的内容类似如下：

	{
		//extends用于引入某配置作为基础配置，然后再在后续的rules中对其进行扩展
		"extends": "eslint:recommended",
		//如果你想使用插件中的环境变量，请先把插件名写入"plugins"数组中，然后再在"env":{}中以"插件名/插件中的需引入的环境名"的方式进行指定。
		"plugins": ["example"],
		"env": {
			//An environment defines global variables that are predefined.
			//定义env会带进来一些全局变量
			"browser": true,
			"node": true,
			"es6":true,
			"mocha":"true",
			"qunit":true,
			"jquery":true,
			"mongo":true,
			//通过插件名命名空间引入插件中的环境
			"example/custom": true
		},
		"globals": {
			// globals are the additional global variables your script accesses during execution.
			// 即插件在执行过程中用到的其它全局变量
			"angular": true,
		},
		"rules": {
			//which rules are enabled and at what error level.
			//这里指定用哪些规则进行eslint检查以及每个规则的错误级别：0或者off表示规则关闭，出错也被忽略；1或者warn表示如果出错会给出警告；2或者error表示如果出错会报出错误
			"semi": ["error", "always"],
			"quotes": ["error", "double"]
		},
		//parser指定解析器，默认的为espree，可选的还有Esprima、Babel-ESLint。 
		//babel-eslint is a wrapper around the Babel parser that makes it compatible with ESLint.
  		//babel-eslint是一个Babel parser的包装器，这个包装器使得Babel parser可以和ESLint协调工作
		"parser": "babel-eslint",
		"parserOptions": {
			//ecmaVersion指定ECMAScript的版本，可选值有3\5\6\7，默认是5
	       "ecmaVersion": 6,
	       //sourceType指定被检查的文件是什么扩展名的，可选项"script"和"module"，默认是"script"。"module"是ES6的。
	       "sourceType": "module",
	       //ecmaFeatures指定你想使用哪些额外的语言特性
	       "ecmaFeatures": {
	           "jsx": true
	       }
	    },
	}

"rules"中的每一项即是一条规则。其中,“:”之前的事规则的名称（如上面的"semi" 和 "quotes"），“:”后面的数组中，第一个项用于指定规则的错误级别，它有 3 个可选的取值：


	"off" 或者 0 - 关闭规则
	
	"warn" or 1 - 不符合规则时作为一个警告（不会影响退出码）
	
	"error" or 2 - 不符合规则时视作一个错误 (退出码为1)


在你的.eslintrc文件中包含这行代码，可以使用推荐规则。

```"extends": "eslint:recommended"```

通过这行代码，会开启[规则页](http://eslint.org/docs/rules/)中标有对勾符号的规则。当然，你也可以到 [npmjs.com](https://www.npmjs.com/search?q=eslint-config) 搜索 “eslint-config” 查找别人创建好的配置列表，并拿来直接使用。

```.eslintrc.*```如果放在项目的根目录中，则会作用于整个项目。如果在项目的子目录中也包含着.eslintrc文件，则对于子目录中文件的检查会忽略掉根目录中的配置，而直接采用子目录中的配置，这就能够在不同的目录范围内应用不同的检查规则，显得比较灵活。ESLint采用逐级向上查找的方式查找```.eslintrc.*```文件，当找到带有```"root": true```配置项的```.eslintrc.*```文件时，将会停止向上查找。

"extends"除了可以引入推荐规则，还可以以文件形式引入其它的自定义规则，然后在这些自定义规则的基础上用rules去定义个别规则，从而覆盖掉"extends"中引入的规则。例如：

	{
	    "extends": [
	        "./node_modules/coding-standard/eslintDefaults.js",
	        // Override eslintDefaults.js
	        "./node_modules/coding-standard/.eslintrc-es6",
	        // Override .eslintrc-es6
	        "./node_modules/coding-standard/.eslintrc-jsx",
	    ],
	    "rules": {
	        // Override any settings from the "parent" configuration
	        "eqeqeq": "warn"
	    }
	}

#### 2、在 package.json 中加入 eslintConfig 配置块进行配置

例如：

	{
	  "name": "demo",
	  "version": "1.0.0",
	  "eslintConfig": {
	    "env": {
	      "browser": true,
	      "node": true
	    }，
	    "rules": {
	        "eqeqeq": "warn"
	    }
	  }
	}


#### 3、直接在代码文件中以注释的方式定义

需要注意的是，***代码文件内以注释配置的规则会覆盖配置文件里的规则，即优先级要更高。***

例如：

临时在一段代码中取消eslint检查，可以如下设置：

	/* eslint-disable */
	
	// Disables all rules between comments
	alert('foo');
	
	/* eslint-enable */

临时在一段代码中取消个别规则的检查（如no-alert, no-console）：

	/* eslint-disable no-alert, no-console */
	
	// Disables no-alert and no-console warnings between comments
	alert('foo');
	console.log('bar');
	
	/* eslint-enable no-alert, no-console */
	
在整个文件中取消eslint检查：

	/* eslint-disable */

	// Disables all rules for the rest of the file
	alert('foo');
	
在整个文件中禁用某一项eslint规则的检查：

	/* eslint-disable no-alert */
	
	// Disables no-alert for the rest of the file
	alert('foo');

针对某一行禁用eslint检查：

	alert('foo'); // eslint-disable-line

	// eslint-disable-next-line
	alert('foo');

针对某一行的某一具体规则禁用eslint检查：

	alert('foo'); // eslint-disable-line no-alert

	// eslint-disable-next-line no-alert
	alert('foo');
	
针对某一行禁用多项具体规则的检查：

	alert('foo'); // eslint-disable-line no-alert, quotes, semi
	
	// eslint-disable-next-line no-alert, quotes, semi
	alert('foo');

### 把ESLint集成到工作流之中

比如，与babel和gulp结合：

package.json：

	{
		"name": "my-module",
		"scripts": {
			"lint": "eslint my-files.js"
		},
		"devDependencies": {
			"babel-eslint": "...",
			"eslint": "..."
		}
	}
	
或者：

gulpfile.js

	var gulp = require('gulp');  
	var eslint = require('gulp-eslint');
	
	gulp.task('lint', function() {  
	  return gulp.src('app/**/*.js')
	    .pipe(eslint())
	    .pipe(eslint.format());
	});
	
eslintrc.*：

	{
		"plugins": [
			"react" //使用eslint-plugin-react插件
		],
		"ecmaFeatures": {
			"jsx": true //开启ESLint JSX 支持
		}
		"rules": {
			"react/display-name": 1, //注意一下，自定义规则都是以插件名称为命名空间的
			"react/jsx-boolean-value": 1
		}
	}

### 通过配置.eslintignore文件忽略掉不想被检查的文件

可以通过在项目目录下建立.eslintignore文件，并在其中配置忽略掉对哪些文件的检查。需要注意的是，不管你有没有在.eslintignore中进行配置，eslint都会默认忽略掉对```/node_modules/**``` 以及 ```/bower_components/**```文件的检查。下面是一个简单的.eslintignore文件的内容。

	# Ignore built files except build/index.js
	build/
	!build/index.js

### 执行检测

	eslint test.js test2.js