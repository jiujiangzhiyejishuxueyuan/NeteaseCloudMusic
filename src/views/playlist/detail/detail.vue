<template>
    <div class="playlist-detail">
        <div class="header-info">
            <div class="background-blur">
                <img :src="songlist.coverImgUrl">
            </div>
            <div class="info-inner flex container">
                <div class="img-box">
                    <img :src="songlist.coverImgUrl"
                         >
                </div>
                <div class="content" v-if="songlist.creator">
                    <div class="title">
                        <h1>{{songlist.name}}</h1>
                    </div>
                    <div class="user-name flex">
                        <div class="avatar">
                            <img :src="songlist.creator.avatarUrl"
                                 alt="">
                        </div>
                        <a href="">{{songlist.creator.nickname}}</a>
                    </div>
                    <div class="playcount">
                        <span>播放量:</span>
                        {{songlist.playCount | playCount}}
                    </div>
                    <div class="tags">
                        <span>标签:</span>
                        <i v-for="(tag,index) in songlist.tags" :key="index">{{tag}}</i>
                    </div>
                    <div class="brief ellipse">
                        <span>简介:</span>
                        {{songlist.description}}
                    </div>
                    <div class="control flex">
                        <div class="button play-all">
                            <Icon type="ios-play-outline" />
                            全部播放
                        </div>
                        <div class="button">
                            <Icon type="md-heart-outline" />
                            收藏
                        </div>
                        <div class="button">
                            <Icon type="md-add" />
                            添加到
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="playlist-box">
            <div class="container">
                <div class="playlist-inner">
                    <song-list :songlists="songs"/>
                </div>
            </div>
        </div>
        <Page
                :total="songlist.trackCount"
                :page-size="20"
                @on-change="changePage"
                :current="parseInt($route.query.page)||1"
        />

    </div>
</template>

<script>
    import songList from '@/components/song-list/song-list'
    import {reqSongDetail, reqSonglistDetail} from "@/api";
    export default {
        components: {
            songList,
        },
        data() {
            return {
                songlist: {},
                songs:[]
            }
        },
        methods: {
            changePage(page) {
                this.$router.push(`${this.$route.path}?page=${page}`)
            },
            render() {
                const page = this.$route.query.page || 1
                reqSonglistDetail(this.$route.params.id).then(res => {
                    this.songlist = res.playlist
                    let ids = []
                    let startCount = (page-1)*20
                    let residue = res.playlist.trackCount-startCount
                    residue = residue >=20 ? 20 : residue
                    for (let i=0; i<residue; i++) {
                        ids.push(res.playlist.trackIds[i+startCount].id)
                    }

                    reqSongDetail(ids.join(',')).then(res => {
                        this.songs = res.songs
                    })
                })
            }
        },
        created() {
            this.render()
        },
        watch:{
            $route() {
                this.render()
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #e91e63
    .playlist-detail
        .header-info
            position relative
            padding 80px 0
            .content
                text-align left
                margin-left 50px
                color #000
                width 75%
                .control
                    margin-top 15px
                    .button
                        margin-right 20px
                    .play-all
                        background #e91e63
                        color #fff
                        border-color $red
                        i
                            font-size 16px
                            font-weight 800
                .title
                    padding 20px 0
                .user-name
                    font-size 18px
                    color #666
                    .avatar
                        width 18px
                        height 18px
                        border-radius 50%
                        overflow hidden
                        img
                            display block
                            width 100%

                    a
                        font-size 14px
                        color #666
                        margin-left 5px
                .playcount
                    margin-top 20px
                    span
                        margin-right 5px
                .tags,.brief
                    margin-top 10px

                    span
                        margin-right 10px
                    i
                        margin-right 10px
            .img-box
                width 23%
            .background-blur
                position absolute;
                top 0
                right 0
                bottom 0
                left 0
                overflow hidden
                opacity .3
                z-index -1
                img
                    width 100%
                    filter blur(30px)
        .playlist-box
            background #fff
</style>
