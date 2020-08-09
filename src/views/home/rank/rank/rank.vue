<template>
    <div class="home-rank">
        <div class="container">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>排行榜</h1>
                </div>
                <router-link class="more gray" to="/music/toplist">
                    更多
                    <Icon type="ios-arrow-dropright-circle" />
                </router-link>
            </div>
        </div>
        <div class="rank-bg" >
            <div class="container" v-if="list.length===3">
                <div class="rank-items flex" v-if="list.length">
                    <div class="rank-item" v-for="(playlist,index) in list" :key="index" >
                        <div class="rank-item-header flex">
                            <div class="img-box">
                                <img :src="playlist.coverImgUrl + '?param=200y200'">
                            </div>
                            <div class="rank-item-info">
                                <h2 class="title">{{playlist.name}}</h2>
                                <div class="btn-play-songlist" @click="play(index)">
                                    <Icon type="ios-play"/>
                                    播放榜单
                                </div>
                            </div>
                        </div>
                        <div class="rank-inner">
                            <ul class="rank-inner-items">
                                <li class="rank-inner-item flex" v-for="(song,index) in playlist.tracks.slice(0,10)" :key="index">
                                    <span class="num block">{{index+1}}</span>
                                    <div class="content flex justify-between">
                                        <span class="song-name block">{{song.name}}</span>
                                        <p class="singer block">
                                            <span v-for="(singer,index) in song.ar" :key="index" @click="$router.push(`/music/artist/${singer.id}`)">
                                                {{singer.name}}
                                                <span v-if="index+1<song.ar.length">/</span>
                                            </span>
                                        </p>
                                    </div>
                                    <song-control :id="song.id" :like-ids="likeIds"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="home-rank-ske flex container" v-else>
                <li class="ske-item" v-for="index in  3" :key="index">
                    <div class="ske-item-header flex align-center">
                        <div class="ske-img"></div>
                        <div class="info expend">
                            <div class="title"></div>
                            <div class="btn"></div>
                        </div>
                    </div>
                    <ul class="inner">
                        <li class="item" v-for="index in 10" :key="index"></li>
                    </ul>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import {reqLikeSong, reqLoginState, reqTopListDetail} from "@/api";
    import songControl from '@/components/song-control/song-control'
    export default {
        components: {songControl},
        data() {
            return {
                list: [],
                likeIds: [],
                ids: []
            }
        },
        methods: {
            play(index) {
                this.publicMethods.playMusic(this.ids[index])
            }
        },
        created() {
            reqLoginState().then(res => {
                reqLikeSong(res.profile.userId).then(res => {
                    this.likeIds = res.ids
                })
            })

        },
        mounted() {
            let el = document.querySelector('.home-rank')
            this.publicMethods.onShow(el,() => {
                const list = [19723756, 3779629, 3778678]
                list.forEach((item, index) => {
                    reqTopListDetail(item).then(res => {
                        this.list.push(res.playlist)
                        this.ids[index] = res.playlist.trackIds.map(item => item.id)
                    })
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    .home-rank
        .home-rank-ske
            .ske-item
                width 33%
                .inner
                    padding-right 10%
                    .item
                        animation ske .8s  linear infinite alternate
                        margin 10px 0
                        border-radius 15px
                        height 40px
                        width 100%

                .ske-item-header
                    padding 15px 10px 15px 0
                    @media screen and (max-width: 1500px)
                        .ske-img
                            width 150px !important
                            height 150px !important
                    @media screen and (max-width: 1200px)
                        .ske-img
                            height 120px !important
                            width 120px !important
                        .title
                            width 130px !important
                            height 30px !important
                        .btn
                            height 30px !important
                            width 120px !important
                    .ske-img,.title,.btn
                        animation ske .8s  linear infinite alternate

                    .ske-img
                        height 180px
                        width 180px
                    .info
                        margin-left 50px
                        .title
                            margin-top 20px
                            width 150px
                            height 35px
                        .btn
                            margin-left 10px
                            margin-top 15px
                            width 130px
                            height 45px
                            border-radius 25px


        img
            display block
            width 100%
            height 100%
        .rank-bg
            background #fff
        .btn-play-songlist
            width 140px
            height 40px
            text-align center
            line-height 38px
            border 1px solid #333
            border-radius 20px
            margin 22px auto
            box-sizing border-box
            font-weight 700
            cursor pointer
            &:hover
                border-color  $red
                color $red
        .rank-items
            padding-top 20px
        .rank-item
            width 33%
            margin-bottom 20px
            .rank-item-info
                flex 1 0 auto
                .title
                    margin-top 20px
                    font-size 26px
                    @media screen and (max-width: 1200px)
                        font-size 20px
            .img-box
                width 40%
                border-radius 10px
                overflow hidden
        .rank-inner
            .rank-inner-items
                margin 20px 20px 0 5px
            .rank-inner-item
                box-sizing content-box
                height 40px
                line-height 40px
                padding 8px 10px
                border-radius 10px
                cursor pointer
                &:hover
                    background rgba(0,0,0,.05)
                    .song-control
                        opacity 1
                .content
                    flex 1 0 auto
                .content
                    margin-left 10px
                .singer
                    max-width 150px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                    color rgba(51,51,51,.6)
                .singer,.song-name
                    &:hover
                        color $red
</style>
