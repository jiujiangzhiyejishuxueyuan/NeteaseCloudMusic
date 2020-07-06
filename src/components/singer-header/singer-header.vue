<template>
    <div class="singer-header">
        <div class="background-blur">
            <img :src="singer.picUrl+'?param=200y200'">
        </div>
        <div class="container">
            <div class="avatar">
                <img :src="singer.picUrl+'?param=300y300'" alt="">
            </div>
            <h2 class="name">{{singer.name}}</h2>
            <p class="desc ellipse" :title="desc.briefDesc">
                {{desc.briefDesc}}
                <a class="more" v-if="desc.introduction&&desc.introduction.length">查看更多</a>
            </p>
        </div>
    </div>
</template>

<script>
    import {reqSingerAlbum, reqSingerDesc} from "@/api";

    export default {
        data() {
            return {
                singer: '',
                desc: ''
            }
        },
        created() {
            let id = this.$route.params.id
            reqSingerAlbum(id,1,0).then(res => {
                this.singer = res.artist
            })
            reqSingerDesc(id).then(res => {
                this.desc = res
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .singer-header
        position relative
        padding 50px 0
        .name
            margin-top 15px
            font-size 24px
            color #000
            font-weight 800
        .desc
            position relative
            line-height 21px
            padding-right 50px
            margin 10px auto 0
            max-width 80%
            .more
                position absolute
                right 0
                bottom 0
        .avatar
            width 220px
            height 220px
            border-radius 50%
            margin 0 auto
            overflow hidden
            img

                width 100%
                height 100%

</style>
