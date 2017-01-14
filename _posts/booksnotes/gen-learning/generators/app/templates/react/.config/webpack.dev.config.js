'use strict';

const excludeReg = /(node_modules|bower_components)/;

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const config = require('./webpack.base.config');
const merge = require('webpack-merge');

module.exports = merge(config, {
    devtool: 'eval-source-map',
    // babel: {
    //   presets: ['es2015'],
    //   plugins: ['typecheck', 'transform-runtime']
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: excludeReg,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/,
            options: {
                postcss: [autoprefixer(config.autoprefixer)]
            }
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.js$/,
            options: {
                babel: {
                    presets: ['es2015'],
                    plugins: ['typecheck', 'transform-runtime']
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    formatter: require('eslint-friendly-formatter')
                }
            }
        })
    ]
});
