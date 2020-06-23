<template>
    <div class="playlist-detail">
        <div class="header-info">
            <div class="background-blur">
                <img :src="songlist.coverImgUrl+'?param=800y800'">
            </div>
            <div class="info-inner flex container">
                <div class="img-box">
                    <img :src="songlist.coverImgUrl+'?param=500y500'">
                </div>
                <div class="content" v-if="songlist.creator">
                    <div class="title">
                        <h1>{{songlist.name}}</h1>
                    </div>
                    <div class="user-name flex">
                        <div class="avatar">
                            <img :src="songlist.creator.avatarUrl" >
                        </div>
                        <a @click="$router.push(`/user/home?id=${songlist.creator.userId}`)" title="查看主页">{{songlist.creator.nickname}}</a>
                        <div class="createTime">{{songlist.createTime | dataFormat}} 创建</div>
                    </div>
                    <div class="playcount">
                        <span>播放量:</span>
                        {{songlist.playCount | playCount}}
                    </div>
                    <div class="tags" v-if="songlist.tags.length">
                        <span>标签:</span>
                        <a v-for="(tag,index) in songlist.tags" :key="index" @click="$router.push(`/music/playlist?cat=${tag}`)">{{tag}}</a>
                    </div>
                    <div class="brief ellipse" v-if="songlist.description">
                        <span>简介:</span>
                        {{songlist.description}}
                    </div>
                    <playlist-control />
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
                @on-change="(page)=>$router.replace(`${$route.path}?page=${page}`)"
                :current="parseInt($route.query.page)||1"
                v-if="songlist.trackCount>20"
        />

    </div>
</template>

<script>
    import songList from '@/components/song-list/song-list'
    import playlistControl from '@/components/playlist-control/playlist-control'
    import {reqSongDetail, reqSonglistDetail} from "@/api";
    export default {
        components: {
            songList,
            playlistControl
        },
        data() {
            return {
                songlist: {},
                songs:[]
            }
        },
        methods: {
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

                    if(ids.length) {
                        reqSongDetail(ids.join(',')).then(res => {
                            this.songs = res.songs
                        }).catch(()=> this.$Message.error('获取歌曲列表失败'))
                    } else {
                        this.$Message.error('获取歌曲列表失败')
                        this.$router.replace({name:'404'})
                    }
                }).catch(() => {
                    this.$router.replace({name:'404'})
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
                .playlist-control
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
                    line-height 25px
                    .avatar
                        width 25px
                        height 25px
                        border-radius 50%
                        overflow hidden
                        img
                            display block
                            width 100%
                    .createTime
                        margin-left 20px
                        font-size 13px

                    a

                        font-size 14px
                        color #666
                        margin-left 5px
                        &:hover
                            color $red
                .playcount
                    margin-top 20px
                    span
                        margin-right 5px
                .tags,.brief
                    margin-top 10px

                    span
                        margin-right 10px
                    a
                        margin-right 10px
                        &:hover
                            color $red
            .img-box
                width 23%

        .playlist-box
            background #fff
</style>
