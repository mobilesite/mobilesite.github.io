'use strict';

const config = require('./main.js');

const excludeReg = /(node_modules|bower_components)/;

const webpack = require('webpack');
const path = require('path');
const resolve = path.resolve;
const cwd = __dirname;
const rootDir = resolve(cwd, '../');
const modulesDir = resolve(cwd, '../node_modules');

// const autoprefixer = require('autoprefixer');
const JsdocPlugin = require('jsdoc-webpack-plugin');
const RollupPluginBuble = require('rollup-plugin-buble');

module.exports = {
    entry: config.browser,
    output: {
        filename: config.browser
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            path.join(__dirname, 'src'),
            'node_modules'
        ],
        alias: {
            vue: resolve(modulesDir, 'vue/dist/vue.js'),
            vuex: resolve(modulesDir, 'vuex/dist/vuex.js')
        }
    },
    module: {
        // preLoaders: [
        //   {
        //     test: /\.vue|\.js$/,
        //     loader: 'eslint',
        //     include: rootDir,
        //     exclude: excludeReg
        //   }
        // ],
        rules: [
            {
                enforce: 'pre',
                test: /\.js|\.vue$/,
                loader: 'eslint-loader',
                include: rootDir,
                exclude: excludeReg,
                query: {
                    configFile: './.eslintrc.js'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                loader: 'rollup-loader',
                exclude: excludeReg
            }, {
                test: /\.less$/,
                loader: 'style!css?sourceMap!postcss!less?strictMath&noIeCompat&sourceMap'
            }
        ]
    },
    // rollup: [
    //   require('rollup-plugin-buble')({
    //     exclude: 'node_modules/**',
    //   })
    // ],
    // eslint: {
    //   formatter: require('eslint-friendly-formatter')
    // },
    // postcss: [autoprefixer(config.autoprefixer)],
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                rollup: [
                    new RollupPluginBuble({
                        exclude: ['node_modules/**', 'bower_components/**']
                    })
                ]
            }
        }),
        new JsdocPlugin({
            conf: './jsdoc.conf.json'
        })
    ]
};
