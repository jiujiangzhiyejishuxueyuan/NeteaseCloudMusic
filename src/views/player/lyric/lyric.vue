<template>
    <div class="lyric">
        <div class="lyric-inner" ref="lyric" :style="trans">
            <p
                    v-for="(lyric,index) in lyrics"
                    :key="index"
                    :class="{on:index===currentLyricNum}"

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
            currentLyricNum() {
                const {lyrics} = this
                let i = 0
                for (; i < lyrics.length-1 ; i++) {
                    if(this.currentTime>=lyrics[i].time && this.currentTime <= lyrics[i+1].time) {
                        return i
                    }
                }
                //console.log('没有第'+i+'句  ','时间'+this.currentTime)
                return this.currentTime===0 ? 0 :lyrics.length
            },
            trans() {
                // console.log(this.eachHeight * this.currentLyricNum,this.eachHeight,this.currentLyricNum)
                return {
                    transform: `translateY(-${ this.eachHeight * this.currentLyricNum - 80}px)`
                }
            }
        },
        watch: {
            lyrics(value) {
                this.$nextTick(()=> {
                    this.totalHeight = this.$refs.lyric.clientHeight
                    this.eachHeight = this.totalHeight / this.lyrics.length
                })

            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .lyric
        height 170px
        overflow hidden
        .lyric-inner
            transition transform .2s
            p
                height 30px
                line-height 30px
                &.on
                    color #fff
</style>