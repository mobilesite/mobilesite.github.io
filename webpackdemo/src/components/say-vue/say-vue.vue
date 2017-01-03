<style lang="less">
    .say-vue{
        color: deeppink;
    }
</style>

<template>
    <p class="say-vue">hi,<span v-text="msg"></span></p>
</template>

<script type="text/babel">
    export default{
        props: ['msg']
    }
</script>