<template>
    <div class="playlist-control flex">
        <div class="button active" @click="$emit('allPlay')">
            <Icon type="ios-play-outline"/>
            全部播放
        </div>
        <div class="button " @click="$emit('sub')" :class="{subed: subed}">
            <span v-if="subed">
                <Icon type="ios-heart"/>
                <span class="s"> 已收藏 </span>
                <span class="hv">取消收藏</span>
            </span>
            <span v-else>
                <Icon type="md-heart-outline"/>
                收藏
            </span>
        </div>
        <div class="button" @click="$emit('scrollToComment')">
            <Icon type="ios-chatboxes-outline"/>
            评论
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            subed: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .playlist-control
        .button
            margin-right 20px

            .hv
                display none

            &.active
                i
                    font-size 16px
                    font-weight 800

            &.subed
                border-color #E91E63
                color #E91E63

                &:hover
                    border-color rgba(0, 0, 0, .3)
                    background rgba(0, 0, 0, .3)

                    .hv
                        display inline

                    .s
                        display none


</style>
