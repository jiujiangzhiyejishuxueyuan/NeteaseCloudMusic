<template>
    <div class="lyric" ref="lyricbox">
        <div class="lyric-inner" ref="lyric" :style="trans">
            <p
                    v-for="(lyric,index) in lyrics"
                    :key="index"
                    :class="{on:index===currentLyricNum}"
                    class="ellipse"

            >
                {{lyric.text}}
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "lyric",
        props: {
            lyrics: Array,
            currentTime: Number,
        },
        data() {
            return {
                totalHeight:0,
                eachHeight:0,
                styleObject: {
                    color: 'red',
                    fontSize: '13px'
                }
            }
        },
        computed: {
            //当前歌词下标
            currentLyricNum() {
                const {lyrics} = this
                let i = 0
                if(lyrics.length) {
                    for (; i < lyrics.length-1 ; i++) {
                        if(this.currentTime>=lyrics[i].time && this.currentTime <= lyrics[i+1].time) {
                            return i
                        }
                    }
                    return this.currentTime < lyrics[0].time ? 0 :lyrics.length
                } else {
                    return 0
                }
            },
            //位移距离
            trans() {
                // console.log(this.eachHeight * this.currentLyricNum,this.eachHeight,this.currentLyricNum)
                let l
                if((this.eachHeight * this.currentLyricNum - (this.$refs.lyricbox||window).clientHeight/2)>0) {
                    l = this.eachHeight * this.currentLyricNum - (this.$refs.lyricbox||window).clientHeight/2
                } else {
                    l = 0
                }
                return {
                    transform: `translateY(-${l}px)`
                }
            }
        },
        mounted() {
            if(this.lyrics.length) {
                this.$nextTick(()=> {
                    this.totalHeight = this.$refs.lyric.clientHeight
                    this.eachHeight = this.totalHeight / this.lyrics.length
                })
            }
        },
        watch: {
            lyrics(value) {
                this.$nextTick(()=> {
                    this.totalHeight = this.$refs.lyric.clientHeight
                    this.eachHeight = this.totalHeight / this.lyrics.length
                })

            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
    .lyric
        overflow hidden
        &.immerse
            p
                font-size 20px
                color #fff
                height 45px !important
                line-height 45px !important
                &.on
                    color #e91e63 !important
        .lyric-inner
            transition transform .2s
            p
                height 30px
                line-height 30px
                &.on
                    color #fff
</style>
