<template>
    <div class="playlist-control flex">
        <div class="button active play-all" @click="$emit('allPlay')">
            <Icon type="ios-play-outline"/>
            全部播放
        </div>
        <div class="button sub" @click="$emit('sub')" :class="{subed: subed}">
            <span v-if="subed" title="取消收藏">
                <Icon type="ios-heart"/>
                <span class="s"> 已收藏 </span>
            </span>
            <span v-else>
                <Icon type="md-heart-outline"/>
                收藏
            </span>
        </div>
        <div class="button to-comment" @click="$emit('scrollToComment')">
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


</style>
