/**
 * @fileoverview 进行自动化测试
 * @author  <%= authorName %><<%= authorEmail %>>
 * @since   <%= date %>
 * @param
 * @return  {} -
 */

const test = require('ava');
const simulateBrowserEnv = require('./tools/simulate-browser-env.js').simulateBrowserEnv;
/* eslint-disable no-unused-vars */
let main = require('../build/main.js').default;
/* eslint-enable no-unused-vars */

simulateBrowserEnv();

/* eslint-disable no-unused-vars */
const stringify = (obj) => JSON.stringify(obj);
/* eslint-enable no-unused-vars */

test('log', t => {
    let result;

    t.is(result, 'xxx');
});