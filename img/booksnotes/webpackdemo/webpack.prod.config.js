'use strict'
var webpack = require('webpack');
var config = require('./webpack.base.config');

config.plugins.push(new webpack.NoErrorsPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
        except: ['$', 'exports', 'require', 'module'] // 排除不想要压缩的对象名称
    },
    compress: {
        warnings: false
    },
    output: {
        comments: false
    }
}));

module.exports = config;


