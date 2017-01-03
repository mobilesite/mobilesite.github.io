
# <%= name %>

- 项目名称: <%= name %>
- 项目描述: <%= description %>
- 项目地址: <%= repo %>
- 贡献者:
- 创建者:   <%= authorName %><<%= authorEmail %>

## 一、采用的技术栈

webpack + rollup + ES6 + LESS + postcss + ESLint + ava + JSDoc

- 用webpack丰富的插件生态和强大的功能
- 用rollup的tree-shaking, 减少代码
- 用ES6的标准语法
- 用LESS的预处理器
- 用postcss进行浏览器私有前缀添加, 书写更智能、轻松
- 用ESLint进行代码扫描, 减少错误和保证统一代码规范
- 用ava进行测试和生成覆盖率报告, 可并发执行测试, 更高效
- 用JSDoc自动生成文档, 规范文档书写, 高效产出文档

## 二、安装

```
npm install -g webpack rollup
npm install

```

## 三、使用

### 1、开发调试

使用命令:

```
npm run dev
```

会启动一个能watch代码的更新, 自动刷新的浏览器的server, 访问地址:

[http://127.0.0.1:8080/test](http://127.0.0.1:8080/test)

注意: 当你开启了阿里郎的网络加速功能的时候, 由于冲突, 会无法访问这个地址, 所以开发调试时你需要关闭阿里郎的网络加速功能

### 2、构建

使用命令:

```
npm run build
```

构建的时候会生成5种不同打包模式(AMD规范, CommonJS规范, ES6模块规范, IIFE格式, UMD规范)的代码, 便于各种需求状态下使用

### 3、测试

使用命令:

```
npm run test
```

会执行测试和生成测试覆盖率报告。

可以在test/index.js中写手工测试代码, 也可以在test/*_test.js文件中写单元测试, 单元测试框架使用的是可以并发执行测试用例的ava, 详见 [https://github.com/avajs/ava](https://github.com/avajs/ava)

### 4、代码检查

使用ESLint进行代码扫描。对于规则的修改可到.eslintrc.js中进行变更, 重启npm即生效。

### 5、文档生成

文档生成采用了JSDoc, 按照其规范进行代码编写, 执行`npm run dev`的时候将自动生成文档至doc目录之下。

### 四、项目里程碑（时间表）

时间 | 版本 | 版本说明
--- | --- | ---
<%= date %>|<%= version %>|创建
