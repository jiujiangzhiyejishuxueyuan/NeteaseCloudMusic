<template>
    <div class="v-player" @click="isplay=!isplay">
        <div class="inner flex align-center" :class="{lucency: !ready}" ref="videobox">
            <video
                    :src="url"
                    ref="video"
                    @timeupdate="playing"
                    @ended="isplay=false"
                    autoplay
                    @play="readyPlay"
                    :class="{full: fullScreen}"
            />
            <div class="play" v-show="!isplay">
                <Icon type="md-play"/>
            </div>
            <div class="footer" @click.stop v-show="footShow">
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
                            <Icon type="md-volume-up" @click="video.muted=true" v-if="!video.muted" title="静音"/>
                            <Icon type="md-volume-mute" @click="video.muted=false" v-else title="取消静音"/>
                            <Icon type="md-qr-scanner" @click="fullScreen = !fullScreen"
                                  :title="fullScreen?'退出全屏':'全屏'"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom" :class="{full: !footShow}">
                <Slider
                        v-model="currentTime"
                        show-tip="never"
                        :max="parseInt(video.duration)"
                        :step="1"
                ></Slider>
            </div>
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
                currentTime: 0,
                ready: false,
                fullScreen: false,
                footShow: true,
                set: ''
            }
        },
        methods: {
            readyPlay() {
                this.isplay = true
                this.ready = true
                this.$emit('ready')
            },
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
                if (value) {
                    this.video.play()
                } else {
                    this.video.pause()
                }
            },
            fullScreen(value) {
                if (value) {
                    this.$refs.video.onmousemove = () => {
                        clearTimeout(this.set)
                        this.set = setTimeout(() => {
                            this.footShow = false
                        }, 3000)
                        this.footShow = true
                    }
                    this.$refs.videobox.webkitRequestFullScreen()
                } else {
                    this.$refs.video.onmousemove = null
                    this.footShow = true
                    clearTimeout(this.set)
                    document.webkitCancelFullScreen()
                }
            }
        },
        mounted() {
            this.video = this.$refs.video
            window.addEventListener("keydown", ev => {
                if (ev.keyCode === 32) {
                    this.isplay = !this.isplay
                    ev.preventDefault()
                }
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .player
        width 100%
        max-height 590px
        position relative

        &.player-ske
            animation ske .8s linear infinite alternate
            background rgba(0, 0, 0, .05)
            height 580px
            @media screen and (max-width: 1550px)
                height 480px
            @media screen and (max-width: 1200px)
                height 400px
    .v-player
        position relative
        height 100%
        width 100%
        cursor pointer

        .inner
            max-height 590px

            &.lucency
                opacity 0

        .v-player-ske
            animation ske .8s linear infinite alternate
            height 590px
            background rgba(0, 0, 0, .5)
            width 100%


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
            transition none
            opacity 0
        .bottom
            position absolute
            bottom 0
            left 0
            width 100%

            &.full
                display block

                .ivu-slider-wrap, .ivu-slider-bar
                    height 4px

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
            background rgba(0, 0, 0, .2)

            &.show
                opacity 1

            .control
                margin-right 20px

                i
                    cursor pointer
                    color #fff
                    font-size 30px
                    margin-right 10px

                    &:hover
                        color #00a1d6
            .time
                font-size 12px
                margin-left 20px
                line-height 40px
                color #fff
            .ivu-slider
                position absolute
                width 100%
                top 0

                &:hover
                    top -10px

                    .ivu-slider-wrap
                        height 20px

                    .ivu-slider-button
                        width 25px
                        height 25px
                        opacity 1

                        &:hover
                            transform scale(1.1)

                .ivu-slider-wrap
                    height 3px
                    margin 0
                    background hsla(0, 0%, 100%, .2)

                    .ivu-slider-bar
                        height 100%


        video
            display block
            margin 0 auto
            cursor pointer
            max-height 590px
            width 1050px
            @media screen and (max-width: 1550px)
                max-width 850px
                height 480px
            @media screen and (max-width: 1200px)
                max-width 710px
                height 400px

            &.full
                max-height inherit
                width 100vw
                height 100vh
</style>
