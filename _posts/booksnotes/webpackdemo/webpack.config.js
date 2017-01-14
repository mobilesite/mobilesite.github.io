// 获取当前运行的模式
var currentTarget = process.env.npm_lifecycle_event;
var config;

if (currentTarget == "dev") {
    // 开发调试模式
    config = require('./webpack.dev.config.js');

} else if (currentTarget == "build") {
    // 发布上线模式
    config = require('./webpack.prod.config.js');
} else{
    console.log('error');
}

module.exports = config;
