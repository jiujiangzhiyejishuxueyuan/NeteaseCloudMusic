<template>
    <div class="playlist-control flex">
        <div class="button play-all">
            <Icon type="ios-play-outline" />
            全部播放
        </div>
        <div class="button">
            <Icon type="md-heart-outline" />
            收藏
        </div>
        <div class="button">
            <Icon type="md-add" />
            添加到
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .playlist-control
        .button
            margin-right 20px
</style>
