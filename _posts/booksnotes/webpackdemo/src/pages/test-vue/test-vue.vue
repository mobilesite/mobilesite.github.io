<style lang="less">
    @import "./test-vue";
</style>

<template>
    <div>
        <a class="test-vue" href="http://www.baidu.com">欢迎访问! http://www.baidu.com</a>
        <say-vue msg="我是Vue组件哦~ "></say-vue>
    </div>
</template>

<script type="text/babel">
    import SayVue from 'components/say-vue/say-vue';

    export default{
        data: function () {
          return {
              msg: ''
          }
        },
        components: {
            SayVue
        }
    }
</script>
