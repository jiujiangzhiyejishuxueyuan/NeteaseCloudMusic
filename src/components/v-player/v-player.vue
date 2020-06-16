<template>
    <div class="v-player" @click="isplay=!isplay">
        <video
                :src="url"
                ref="video"
                @timeupdate="playing"
                @ended="isplay=false"
                autoplay
                @play="isplay=true"
        />
        <div class="play" v-show="!isplay"><Icon type="md-play" /></div>
        <div class="footer" @click.stop>
            <Slider
                    v-model="currentTime"
                    show-tip="never"
                    :max="parseInt(video.duration)"
                    :step="1"
                    @on-change="change"
            ></Slider>
            <div class="control flex justify-between align-center">
                <div class="time">
                    {{parseInt(this.currentTime||0) | sminute}} / {{parseInt(this.video.duration||0) | sminute}}
                </div>
                <div class="right">
                    <div class="control flex">
                        <Icon type="md-volume-up" @click="video.muted=true" v-if="!video.muted"/>
                        <Icon type="md-volume-mute" @click="video.muted=false" v-else/>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <Slider
                    v-model="currentTime"
                    show-tip="never"
                    :max="parseInt(video.duration)"
                    :step="1"
            ></Slider>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            url: String,
        },
        data() {
            return {
                video: '',
                isplay: false,
                currentTime: 0
            }
        },
        methods: {
            playing() {
                this.currentTime = this.video.currentTime
            },
            change(value) {
                this.video.currentTime = value
                this.isplay = true
            },
        },
        watch: {
            isplay(value) {
                if(value) {
                    this.video.play()
                } else {
                    this.video.pause()
                }
            }
        },
        mounted() {
           this.video = this.$refs.video

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .v-player
        position relative
        height 100%
        width 100%
        background #000
        cursor pointer
        &:hover
            .bottom
                display none
            .footer
                opacity 1
        .play
            cursor pointer
            position absolute
            right 20px
            bottom 50px
            background rgba(255,255,255,.7)
            border-radius 10px
            text-align center
            line-height 50px
            width 60px
            height 40px
            i
                font-size 30px
        .ivu-slider-button
            opacity 0
        .bottom
            position absolute
            bottom 0
            left 0
            width 100%
            .ivu-slider-wrap
                background none
                margin 0
                height 2px
                .ivu-slider-bar
                    height 2px

        .footer
            position absolute
            bottom 0
            left 0
            height 40px
            width 100%
            opacity 0
            cursor default
            transition opacity .4s
            background rgba(0,0,0,.2)
            .control
                margin-right 20px
                i
                    cursor pointer
                    color #fff
                    font-size 30px
            .time
                font-size 12px
                margin-left 20px
                line-height 40px
                color #fff
            .ivu-slider
                position absolute
                width 100%
                top 0
                .ivu-slider-wrap
                    height 3px
                    margin 0
                    background hsla(0,0%,100%,.2)
                    .ivu-slider-bar
                        height 100%
                    &:hover
                        height 5px
                        .ivu-slider-button
                            opacity 1
        video
            display block
            margin 0 auto
            cursor pointer
            max-height 100%
            max-width 100%
</style>
