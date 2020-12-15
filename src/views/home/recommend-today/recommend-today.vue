<template>
    <div class="recommend-today recommend-item section">
        <div class="container my-card" v-if="playlists.length">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>个性化推荐</h1>
                </div>
            </div>
            <div class="list-box">
                <ul class="list-inner flex flex-wrap">
                    <li class="item">
                        <router-link to="/music/recommend">
                            <div class="item-box">
                                <div class="img-box">
                                    <div class="title">
                                        {{today.ch}}
                                    </div>
                                    <div class="content">
                                        {{today.td}}
                                    </div>
                                </div>
                            </div>
                            <div class="title">
                                每日歌曲推荐
                            </div>
                        </router-link>
                    </li>
                    <li class="item " v-for="(playlist,index) in playlists" :key="index">
                        <router-link :to="`/music/playlist/${playlist.id}`">
                            <div class="item-box img-scale" :title="playlist.copywriter">
                                <div class="img-box playlist-min-imgbox">
                                    <img :src="playlist.picUrl+'?param=200y200'" alt="">
                                </div>
                                <p class="play-count">
                                    <Icon type="ios-headset"/>
                                    {{playlist.playcount | playCount}}
                                </p>
                                <div class="tip">
                                    {{playlist.copywriter}}
                                </div>
                            </div>
                            <div class="title text-hv" :title="playlist.name">
                                {{playlist.name}}
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <playlistListSke :row="playlists.length > 6 ? 2 : 1" v-else/>
    </div>
</template>

<script>
    import {reqPlatlistDetail, reqRecommendPlaylist} from "@/api";
    import playlistListSke from "@/components/playlist-list-ske/playlist-list-ske";

    export default {
        components: {playlistListSke},
        data() {
            return {
                playlists: []
            }
        },
        computed: {
            today() {
                let date = new Date()
                let day
                switch (date.getDay()) {
                    case 0:
                        day = "星期天";
                        break;
                    case 1:
                        day = "星期一";
                        break;
                    case 2:
                        day = "星期二";
                        break;
                    case 3:
                        day = "星期三";
                        break;
                    case 4:
                        day = "星期四";
                        break;
                    case 5:
                        day = "星期五";
                        break;
                    case 6:
                        day = "星期六";

                }
                return {
                    td: date.getDate(),
                    ch: day
                }
            }
        },
        created() {
            reqRecommendPlaylist().then(res => {
                this.playlists = res.recommend.length > 13 ? res.recommend.slice(0, 13) : res.recommend.slice(0, 6)
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .recommend-today
        .item-box
            border-radius 5px
            overflow hidden
            &:hover
                .tip
                    transform none
                .play-count
                    opacity 0
        .tip
            position absolute
            top 0
            left 0
            max-height 50px
            width 100%
            padding 5px
            color #fff
            text-align left
            background rgba(0, 0, 0, .3)
            overflow hidden
            transition all .3s
            transform translateY(-100%)
            @media screen and (max-width: 1200px)
                font-size 10px
        .img-box
            background #FAFAFA
            .content
                font-size 100px
                color #C62F2F
                @media screen and (max-width: 1550px)
                    font-size 83px
                @media screen and (max-width: 1200px)
                    font-size 65px
</style>
