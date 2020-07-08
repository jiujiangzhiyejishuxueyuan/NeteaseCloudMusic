<template>
    <div class="playlist-detail">
        <div class="header-info">
            <div class="background-blur">
                <img :src="songlist.coverImgUrl+'?param=200y200'">
            </div>
            <div class="info-inner flex container align-center">
                <div class="img-box">
                    <img :src="songlist.coverImgUrl+'?param=500y500'" v-if="songlist.coverImgUrl">
                </div>
                <div class="content" v-if="songlist.creator">
                    <div class="title ">
                        <h1 class="ellipse" :title="songlist.name">{{songlist.name}}</h1>
                    </div>
                    <div class="user-name flex">
                        <div class="avatar">
                            <img :src="songlist.creator.avatarUrl+'?param=50y50'">
                        </div>
                        <router-link :to="`/user/home?id=${songlist.creator.userId}`" title="查看主页">
                            {{songlist.creator.nickname}}
                        </router-link>
                        <div class="createTime">{{songlist.createTime | dataFormat}} 创建</div>
                    </div>
                    <div class="playcount">
                        <span>播放量:</span>
                        {{songlist.playCount | playCount}}
                    </div>
                    <div class="tags" v-if="songlist.tags.length">
                        <span>标签:</span>
                        <router-link :to="`/music/playlist?cat=${tag}`" v-for="(tag,index) in songlist.tags" :key="index">{{tag}}</router-link>
                    </div>
                    <div class="brief ellipse" v-if="songlist.description" :title="songlist.description">
                        <span>简介:</span>
                        {{songlist.description}}
                    </div>
                    <playlist-control :commentObj="$refs.comment" :id="songlist.id"/>
                </div>
            </div>
        </div>
        <div class="playlist-box">
            <div class="container">
                <div class="playlist-inner">
                    <div class="inner-title bb">
                        <span class="title">歌曲列表</span>
                        <span class="song-count">{{songlist.trackCount}}首歌</span>
                        <div class="play-count">
                            播放: <span class="count">{{songlist.playCount}} </span>次
                        </div>
                    </div>
                    <song-list :songlists="songs" v-if="songs"/>
                    <ul class="songlist-ske" v-else>
                        <li class="song" v-for="index in 10" :key="index"></li>
                    </ul>
                </div>
            </div>
        </div>
        <Page
                :total="songlist.trackCount"
                :page-size="20"
                @on-change="(page)=>$router.replace(`${$route.path}?id=${songlist.id}&page=${page}`)"
                :current="parseInt($route.query.page)||1"
                v-if="songlist.trackCount>20"
        />
        <div class="playlist-comments container" v-if="songlist">
            <div class="comment-count">
                {{comment&&comment.total}} 评论
            </div>
            <div class="comment-header flex" ref="comment">
                <a class="sort" :class="{active:hotComments}" @click="hotComments = true"
                   v-if="c">最热评论</a>
                <a class="sort" :class="{active:!hotComments}" @click="hotComments = false">最新评论</a>
            </div>
            <comment-edit :id="songlist.id.toString()" type="2" class="input"/>
            <comment-list :id="songlist.id.toString()" type="2"
                          :comments="hotComments ? c : comment.comments" v-if="comment.total>0"/>
            <div class="no-comments" v-else>
                暂无评论
            </div>
            <Page
                    class="comment"
                    :total="comment.total"
                    :page-size="commentLimit"
                    @on-change="nextComment"
                    v-if="comment&&!hotComments&&comment.total>20"
            />
        </div>

    </div>
</template>

<script>
    import songList from '@/components/song-list/song-list'
    import playlistControl from '@/components/playlist-control/playlist-control'
    import {reqPlaylistComments, reqSongDetail, reqSonglistDetail} from "@/api";
    import CommentList from "@/components/comment-list/comment-list";
    import CommentEdit from "@/components/comment-edit/comment-edit";

    export default {
        components: {
            CommentEdit,
            CommentList,
            songList,
            playlistControl
        },
        data() {
            return {
                songlist: '',
                songs: [],
                hotComments: true,
                comment: '',
                commentLimit: 20,
                c: ''
            }
        },
        methods: {
            scrollToComment() {
                window.scrollTo(0, (this.$refs.comment.getBoundingClientRect().top + window.scrollY))
            },
            nextComment(page) {
                let id = this.$route.params.id || this.$route.query.id
                let offset = this.commentLimit * (page - 1)
                reqPlaylistComments(id, this.commentLimit, offset).then(res => {
                    this.comment = res
                    if (!res.hotComments) {
                        this.hotComments = false
                    }
                    this.scrollToComment()
                })
            },
            render() {
                const page = this.$route.query.page || 1
                let id = this.$route.params.id || this.$route.query.id
                reqPlaylistComments(id, this.commentLimit, 0).then(res => {
                    this.comment = res

                    if (res.hotComments && res.hotComments.length) {
                        this.c = res.hotComments
                    } else {
                        this.hotComments = false
                    }

                })
                reqSonglistDetail(id).then(res => {
                    this.songlist = res.playlist
                    document.title = res.playlist.name + '-歌单-网易云音乐'
                    let ids = []
                    let startCount = (page - 1) * 20
                    let residue = res.playlist.trackCount - startCount
                    residue = residue >= 20 ? 20 : residue
                    for (let i = 0; i < residue; i++) {
                        ids.push(res.playlist.trackIds[i + startCount].id)
                    }

                    if(ids.length) {
                        reqSongDetail(ids.join(',')).then(res => {
                            this.songs = res.songs
                        }).catch(()=> this.$Message.error('获取歌曲列表失败'))
                    } else {
                        this.$Message.error('获取歌曲列表失败')
                        this.$router.replace({name: '404'})
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
    $blue = #00a1d6
    $red = #e91e63
    .playlist-detail
        .playlist-comments
            text-align left
            margin-top 50px
            .no-comments
                padding 20px 0 40px
                text-align center
                font-size 16px

            .comment-edit
                margin-bottom 50px

            .comment-count
                font-size 18px
                margin-bottom 20px

        .songlist-ske
            .song
                animation ske .8s linear infinite alternate
                background rgba(0, 0, 0, .05)
                border-radius 15px
                height 50px
                margin 15px 0

        .header-info
            position relative
            padding 80px 0

            .img-box > img
                cursor auto

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
                    padding 0 0 20px
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

                .tags, .brief
                    margin-top 10px

                    span
                        margin-right 10px

                    a
                        margin-right 10px

                        &:hover
                            color $red

            .img-box
                width 316px
                height 316px
                @media screen and (max-width: 1550px)
                    width 270px
                    height 270px
                @media screen and (max-width: 1200px)
                    width 222px
                    height 222px

        .playlist-box
            background #fff
            .inner-title
                padding 5px 20px
                text-align left
                position relative
                .title
                    font-size 16px
                .play-count
                    position absolute
                    right 0
                    bottom 5px
                    font-size 14px

                    .count
                        color $blue
                .song-count
                    color #999
                    margin-left 20px
                    font-size 12px
</style>
