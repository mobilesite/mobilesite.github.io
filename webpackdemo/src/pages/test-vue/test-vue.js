import Vue from 'vue';
import TestVue from './test-vue.vue';

new Vue({
    template: '<test-vue></test-vue>',
    replace: false,
    el: '#container',
    components: {
        TestVue
    },
    ready: function () {

    }
});