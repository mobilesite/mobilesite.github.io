'use strict';

const config = require('./main');
const pkg = require('../package.json');

const path = require('path');
const fs = require('fs');
const projectRoot = path.resolve(__dirname, '../');

const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const rollup = require('rollup');
const vue = require('rollup-plugin-vue');
const less = require('rollup-plugin-less');
const buble = require('rollup-plugin-buble');
const uglify = require('rollup-plugin-uglify');
// more rollup plugins: https://github.com/rollup/rollup/wiki/Plugins

const banner =
    `/*!
   * ${pkg.name} v${pkg.version}
   * ©copyright ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
   * Released under the ${pkg.license} License.
   */`;

const defaultType = 'umd'; // 输出的默认不带包规范后缀名的那种规范, 即指定那种规范输出成main.js和main.min.js
const types = ['amd', 'cjs', 'es', 'iife', 'umd'];
const outputFilePath = config.output;
const outputMinFilePath = config.outputMin;

let minTypes = outputMinFilePath ? types.slice() : []; // 需要压缩后存储的模块规范类型
let totalTypes = [];

const getSize = (code) => {
    let len = (code.length / 1024).toFixed(2);
    return `${len}kb`;
};

const blue = (str) => `\x1b[1m\x1b[34m${str}\x1b[39m\x1b[22m`;

const write = (dest, code) => new Promise((resolve, reject) => {
    fs.writeFile(dest, code, (err) => {
        if (err) {
            return reject(err);
        }

        let blueInfo = blue(dest);
        let size = getSize(code);
        /* eslint-disable no-console */
        console.log(`${blueInfo} ${size}`);
        /* eslint-enable no-console */
        resolve();
    });
});

/**
 * 要进行输出的未经过压缩的类型和输出路径及文件名
 */
types.map(item => {
    totalTypes.push({
        type: item,
        output: item === defaultType ? outputFilePath : outputFilePath.replace(/\.js$/, `.${item}.js`)
    });
});

/**
 * 要进行输出的未经过压缩的类型和输出路径及文件名
 */
minTypes.length && minTypes.map(item => {
    totalTypes.push({
        type: item,
        output: item === defaultType ? outputMinFilePath : outputMinFilePath.replace(/\.js$/, `.${item}.js`),
        minify: true
    });
});

totalTypes.filter(Boolean).forEach(options => {
    rollup.rollup({
        entry: config.entry,
        plugins: [
            vue({
                compileTemplate: false,
                css: config.outputCss,
                htmlMinifier: {
                    minifyCSS: true,
                    minifyJS: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    decodeEntities: true,

                    html5: true,
                    processConditionalComments: true,
                    processScripts: [
                        'text/html'
                    ],
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    removeTagWhitespace: true,
                    useShortDoctype: true
                }
            }),
            less({
                insert: false,
                output: config.outputCss
            }),
            postcss([autoprefixer({browsers: ['last 2 versions']})]),
            buble(),
            options.minify && uglify({
                /* eslint-disable camelcase */
                compress: {
                    warnings: false,
                    hoist_vars: true,
                    hoist_funs: true,
                    drop_debugger: true,
                    unused: true,
                    drop_console: true,
                    sequences: true,
                    conditionals: true,
                    booleans: true,
                    if_return: true,
                    join_vars: true,
                    screw_ie8: true,
                    comparisons: true,
                    evaluate: true,
                    loops: true,
                    cascade: true,
                    negate_iife: true
                },
                comments: false,
                output: { ascii_only: true }
                /* eslint-enable camelcase */
            })
        ].filter(Boolean)
    }).then((bundle) => {
        const result = bundle.generate({
            banner,
            useStrict: false,
            format: options.type,
            moduleName: pkg.name
        });
        write(path.resolve(projectRoot, options.output), result.code);
    }).then(() => {
        let css = '';
        try {
            css = fs.readFileSync(config.outputCss, 'utf8');
        } catch (e) {
            return;
        }
        postcss([autoprefixer(config.autoprefixer)])
            .process(css)
            .then((result) => {
                write(path.resolve(projectRoot, config.outputCss), result.css);
            });
    });
});