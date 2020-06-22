<template>
    <span class="play-btn">
        <Icon type="md-play" />
    </span>
</template>

<script>
    export default {
        props: {
            id: Number
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .play-btn

        .ivu-icon
            cursor pointer
            opacity 0
            font-size 20px
            &:hover
                color #E91E63
</style>
