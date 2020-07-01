<template>
    <div class="playlist-control flex">
        <div class="button play-all">
            <Icon type="ios-play-outline"/>
            全部播放
        </div>
        <div class="button">
            <Icon type="md-heart-outline"/>
            收藏
        </div>
        <div class="button" @click="scrollToComment">
            <Icon type="ios-chatboxes-outline"/>
            评论
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            commentObj: HTMLDivElement,
            id: Number
        },
        methods: {
            scrollToComment() {
                window.scrollTo(0, (this.commentObj.getBoundingClientRect().top + window.scrollY))
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .playlist-control
        .button
            margin-right 20px
</style>
