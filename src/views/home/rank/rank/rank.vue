<template>
    <div class="home-rank">
        <div class="container">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>排行榜</h1>
                </div>
                <div class="more gray">
                    更多
                    <Icon type="ios-arrow-dropright-circle" />
                </div>
            </div>
        </div>
        <div class="rank-bg" v-if="list.length===3">
            <div class="container">
                <div class="rank-items flex" v-if="list.length">
                    <div class="rank-item" v-for="(playlist,index) in list" :key="index" >
                        <div class="rank-item-header flex">
                            <div class="img-box">
                                <img :src="playlist.coverImgUrl">
                            </div>
                            <div class="rank-item-info">
                                <h2 class="title">{{playlist.name}}</h2>
                                <div class="btn-play-songlist">
                                    <Icon type="ios-play" />
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
        </div>
        <div class="ske container" v-else>
            <Spin></Spin>
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
                list:[],
                likeIds: []
            }
        },
        created() {
            const list = [19723756,3779629,3778678]
            list.forEach(async item => {
                const result = await reqTopListDetail(item)
                this.list.push(result.playlist)
            })
            reqLoginState().then(res => {
                reqLikeSong(res.profile.userId).then(res => {
                    this.likeIds = res.ids
                })
            })

        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    .home-rank

        img
            display block
            width 100%
            height 100%
        .rank-bg
            background #f2f2f2
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

            .img-box
                width 200px
                height 200px
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
