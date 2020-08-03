<template>
    <div id="song">
        <div class="song-header" v-if="song">
            <div class="background-blur">
                <img :src="song.al.picUrl+'?param=140y140'">
            </div>
            <div class="song-header-inner container flex">
                <div class="header-info-img">
                    <img :src="song.al.picUrl+'?param=280y280'" alt="">
                </div>
                <div class="info">
                    <div class="inner">
                        <h2 class="name">{{song.name}}{{song.alia.length?` (${song.alia[0]})`:''}}</h2>
                        <p class="singer">歌手:
                            <router-link :to="`/music/artist/${singer.id}`" v-for="(singer,index) in song.ar"
                                         :key="index">{{singer.name}}
                            </router-link>
                        </p>
                        <p class="album" v-if="song.al">所属专辑:
                            <router-link :to="`/music/album/${song.al.id}`">{{song.al.name}}</router-link>
                        </p>
                    </div>
                    <song-control :id="parseInt(id)" :like-ids="likeIds"/>
                </div>
            </div>
        </div>
        <header-info-ske v-else/>
        <div class="lyric container" v-if="lyrics.length">
            <p class="title">歌词</p>
            <div class="lyric-inner " :class="{all: lyricMore}">
                <p class="lyric-item" v-for="(lyric,index) in lyrics" :key="index">{{lyric.text}}</p>
            </div>
            <div class="btn-more" @click="lyricMore=!lyricMore">{{lyricMore?'收起':'展开'}}</div>
        </div>
        <div class="nolyric text-left container" v-else>纯音乐,请欣赏</div>
        <div class="comment container" ref="comment">
            <p class="comment-count">
                共 {{ comment.total }} 条评论
            </p>
            <div class="comment-header flex" ref="comment">
                <a class="sort" :class="{active:hotComments}" @click="hotComments = true"
                   v-if="c">最热评论</a>
                <a class="sort" :class="{active:!hotComments}" @click="hotComments = false">最新评论</a>
            </div>
            <comment-edit :id="id.toString()" type="0" class="input"/>
            <comment-list :id="id.toString()" type="0"
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
    import {reqLikeSong, reqLoginState, reqPlaylistComments, reqSongComments, reqSongDetail, reqSonglyric} from "@/api";
    import SongControl from "@/components/song-control/song-control";
    import CommentEdit from "@/components/comment-edit/comment-edit";
    import CommentList from "@/components/comment-list/comment-list";
    import HeaderInfoSke from "@/components/header-info-ske/header-info-ske";

    export default {
        name: "song",
        components: {HeaderInfoSke, CommentList, CommentEdit, SongControl},
        data() {
            return {
                song: '',
                likeIds: [],
                lyrics: [],
                lyricMore: false,
                hotComments: true,
                comment: '',
                c: '',
                id: 0,
                commentLimit: 20
            }
        },
        inject: ['reload'],
        methods: {
            nextComment(page) {
                let id = this.id
                let offset = this.commentLimit * (page - 1)
                reqSongComments(id, this.commentLimit, offset).then(res => {
                    this.comment = res
                    window.scrollTo(0, (this.$refs.comment.getBoundingClientRect().top + window.scrollY))
                })
            },
        },
        watch: {
            $route() {
                this.reload()
            }
        },
        created() {
            this.id = this.$route.params.id
            reqSongComments(this.id, this.commentLimit, 0).then(res => {
                this.comment = res
                if (res.hotComments && res.hotComments.length) {
                    this.c = res.hotComments
                } else {
                    this.hotComments = false
                }
            })
            reqSongDetail(this.id).then(res => {
                this.song = res.songs[0]
                document.title = (this.song.alia && this.song.alia.length ? this.song.name + ` (${this.song.alia[0]})` : this.song.name) + '-网易云音乐'
            })
            reqLoginState().then(res => {
                if (res.code === 200) {
                    reqLikeSong(res.profile.userId).then(res => {
                        this.likeIds = res.ids
                    })
                }
            })
            reqSonglyric(this.id).then(res => {
                if (res.lrc) {
                    let lrc = res.lrc.lyric.split('\n')
                    lrc.forEach((item) => {
                        let time = (item.substring(item.indexOf("[") + 1, item.indexOf("]"))).split(':')
                        if (item.substring(item.indexOf(']') + 1)) {
                            this.lyrics.push({
                                time: time[0] * 60 + parseInt(time[1]),
                                text: item.substring(item.indexOf(']') + 1)
                            })
                        }
                    })
                }
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #song
        .nolyric
            margin 50px auto
        .background-blur
            background #ffffff

            img
                opacity .6

        .comment
            .comment-count
                padding 5px 0
                text-align left
                color #999

        .lyric
            text-align left
            color #333
            padding-bottom 25px
            margin-bottom 30px

            .btn-more
                cursor pointer
                color #E91E63

            .lyric-inner
                overflow hidden
                max-height 380px
                transition height .2s

                &.all
                    max-height inherit

                .lyric-item
                    padding 5px 0

            .title
                margin-bottom 30px
                text-align left
                font-size 26px
                color #000

        .song-header
            padding 50px 0
            position relative

            .song-control
                opacity 1
                position absolute
                bottom 0
                left 0

                .item
                    background rgba(0, 0, 0, .1)

            .info
                text-align left
                margin-left 40px
                font-size 16px
                position relative

                a
                    color #000

                a:hover
                    color #E91E63

                .singer
                    color #666
                    margin-top 20px

                .album
                    color #666
                    margin-top 10px

                .name
                    font-size 26px


</style>