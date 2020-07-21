<template>
    <div class="recommend-hot recommend-item section">
        <div class="container">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>{{title}}</h1>
                </div>
                <router-link class="more gray" to="/music/playlist">
                    更多
                    <Icon type="ios-arrow-dropright-circle" />
                </router-link>
            </div>
            <div class="list-box">
                <ul class="list-inner flex flex-wrap justify-between">
                    <li class="item" v-for="(item,index) in list" :key="index">
                        <router-link :to="`/music/playlist/${item.id}`" :title="item.name">
                            <div class="item-box img-scale-hover">
                                <div class="img-box img-scale playlist-min-imgbox">
                                    <img :src="item.coverImgUrl+'?param=200y200'">
                                </div>
                                <div class="playlist-all-btn-play absolute-center" title="播放歌单"
                                     @click.prevent="play(item)">
                                    <img src="../../../static/imgs/btn-play.png" alt="">
                                </div>
                                <p class="play-count" :title="'播放量:'+item.playCount">
                                    <Icon type="ios-headset"/>
                                    {{item.playCount | playCount}}
                                </p>
                            </div>
                            <div class="title text-hv">
                                {{item.name}}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    import {reqPlatlistDetail} from "@/api";

    export default {
        props: {
            list: Array,
            title: String
        },
        methods: {
            play(playlist) {
                reqPlatlistDetail(playlist.id).then(res => {
                    let ids = res.playlist.trackIds.map(item => item.id)
                    this.publicMethods.playMusic(ids)
                })
            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .gray
        display block
        color #999999

    .recommend-item
        min-width 1000px
        .list-inner
            margin-top 20px
            width 100%
            .item
                cursor pointer
                width 14%
                margin-bottom 20px
                padding 0 10px 10px
                &:hover .main-box img
                    transform scale(1.1)

                .play-count
                    position absolute
                    top 6px
                    right 5px
                    padding 0 8px
                    line-height 24px
                    color #fff
                    border-radius 12px
                    text-align center
                    background rgba(0,0,0,.4)
                    font-size 12px
                    z-index 1
                .title
                    margin-top 15px
                    line-height 18px
                    color #666
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                .item-box
                    position relative
                    &:hover .playlist-all-btn-play
                        opacity 1

                .img-box
                    overflow hidden
                    border-radius 8px



</style>
