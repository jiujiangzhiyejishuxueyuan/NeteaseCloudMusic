<template>
    <div class="video-control">
        <div class="praised" :class="{active:1}" @click="giveLike">
            <Icon type="md-thumbs-up"/>
            {{video.praisedCount | playCount}}
        </div>
        <div class="subscribe" @click="sub">
            <Icon type="md-star"/>
            {{video.subscribeCount | playCount}}
        </div>
        <div class="share">
            <Icon type="ios-share-alt"/>
            {{video.shareCount | playCount}}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            type: String
        },
        data() {
            return {
                v: ''
            }
        },
        methods: {
            giveLike() {

            },
            sub() {

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .video-control
        border-bottom 1px solid #e5e9f0

        div
            cursor pointer
            padding-right 30px

            &:hover, &.active
                color $blue

                i
                    color $blue

        i
            color #757575
            font-size 35px
</style>
