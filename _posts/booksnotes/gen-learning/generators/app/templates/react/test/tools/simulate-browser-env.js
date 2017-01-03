/**
 * @fileoverview 用于让node环境获得浏览器环境的变量对象的模拟效果
 * @author  <%= authorName %><<%= authorEmail %>>
 * @since   <%= date %>
 * @return  {Object} - 包含simulateBrowserEnv函数的对象
 */

(function (window, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    }
})(this, function () {
    return {
        simulateBrowserEnv: require('browser-env') // 用于在node中模拟浏览器中的环境变量
    };
});
