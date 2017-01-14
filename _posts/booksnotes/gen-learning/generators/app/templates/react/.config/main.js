'user strict';

module.exports = {
    entry: './src/main.js',
    output: './build/main.js',
    outputMin: './build/main.min.js',
    browser: './test/index.js',
    outputCss: './build/index.css',
    outputCssMin: './build/index.min.css',
    autoprefixer: {
        browsers: ['last 2 versions']
    }
};
