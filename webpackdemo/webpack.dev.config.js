'use strict';
var webpack = require('webpack');
var config = require('./webpack.base.config');
var OpenBrowserPlugin= require('open-browser-webpack-plugin');

config.devServer = {
    contentBase: './src/',
    host: config.options.buildDevServerHost,
    port: config.options.buildDevServerPort,
    inline: true,
    colors: true,
    hot: true,
    proxy: {
        'http://a.b.c/api/*': {
            target: 'http://localhost:5000/api/',
            secure: false
        }
    }
};

config.plugins.push(new OpenBrowserPlugin({url: 'http://'+ config.options.buildDevServerHost + ':' + config.options.buildDevServerPort + '/index.html'}));

console.log('http://'+ config.options.buildDevServerHost + ':' + config.options.buildDevServerPort + '/index.html' + ' is opened in your browser!')

module.exports = config;