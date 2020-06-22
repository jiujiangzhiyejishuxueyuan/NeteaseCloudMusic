<template>
    <div class="video-player">
        <div class="video-player-header container flex justify-between">
            <div class="info">
                <h2 class="title">{{video.title}}</h2>
                <p class="time" v-if="video.publishTime">发布时间:{{video.publishTime | dataFormat}}</p>
                <p class="count">
                    <span class="play-count">播放次数:{{video.playTime | playCount}}</span>
                    <span class="comment-count">评论数:{{comments.total}}</span>
                </p>
            </div>
            <div class="user flex" v-if="video.creator">
                <div class="img-box" @click="$router.push(`/user/home?id=${video.creator.userId}`)">
                    <img :src="video.creator.avatarUrl" title="查看主页">
                </div>
                <div class="info">
                    <a class="name" @click="$router.push(`/user/home?id=${video.creator.userId}`)">{{video.creator.nickname}}</a>
                    <div @click="follow(video.creator.userId,1)" class="btn-follow" v-if="!video.creator.followed"><Icon type="md-add" />关注</div>
                    <div @click="follow(video.creator.userId,0)" class="btn-follow disabled" v-else>
                        <span class="h">已关注</span><span class="hf">取消关注</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="video-player-inner container flex">
            <div class="left">
                <div class="player">
                    <v-player :url="url" v-if="url"/>
                </div>
                <div class="control flex">
                    <div class="praised" :class="{active:liked}" @click="giveLike">
                        <Icon type="md-thumbs-up" />
                        {{video.praisedCount | playCount}}
                    </div>
                    <div class="subscribe" @click="subVideo">
                        <Icon type="md-star" />
                        {{video.subscribeCount | playCount}}
                    </div>
                    <div class="share">
                        <Icon type="ios-share-alt" />
                        {{video.shareCount | playCount}}
                    </div>
                </div>
                <div class="description">
                    {{video.description || '暂无简介'}}
                </div>
                <div class="tags flex bb">
                    <a class="tag" v-for="(tag,index) in video.videoGroup" :title="tag.name" :key="index">
                        {{tag.name}}
                    </a>
                </div>
                <div class="comment">
                    <div class="comment-count">
                        {{comments.total}}  评论
                    </div>
                    <div class="comment-header bb flex" ref="comment">
                        <a class="sort" :class="{active:hotComments}" @click="hotComments = true">最热评论</a>
                        <a class="sort" :class="{active:!hotComments}" @click="hotComments = false">最新评论</a>
                    </div>
                    <div class="input">
                        <comment-edit @submit="editSubmit"/>
                    </div>
                    <comment-list
                            :comments="commentsList"
                            :id="video.vid"
                            type="5"
                            v-if="commentsList.length"
                    />
                    <Page
                            :total="comments.total"
                            :page-size="commentsList.length"
                            v-if="comments.total>20"
                            @on-change="pageTurning"
                    />
                </div>
            </div>
            <div class="related-box">
                <p class="tip">相关推荐</p>
                <ul class="related-list">
                    <li class="related-item flex img-scale-hover" v-for="(item,index) in relatedVideos" :key="index">
                        <div class="img-box img-scale " :title="item.title" @click="$router.push(`/video/${item.vid}`)">
                            <img :src="item.coverUrl" alt="">
                        </div>
                        <div class="info">
                            <p class="title ellipse" :title="item.title"  @click="$router.push(`/video/${item.vid}`)">{{item.title}}</p>
                            <div class="name">
                                <a class="text-hv" v-for="(art,index) in item.creator" :key="index"> {{art.userName}}</a>
                                <span v-if="index+1<item.creator.length">/</span>
                            </div>
                            <p class="play-count">播放次数:{{item.playTime |playCount}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        follow,
        reqHotComments,
        reqRelatedVideo,
        reqVideoComments,
        reqVideoDetail,
        reqVideoInfo,
        reqVideoUrl,
        ResourceLike, submitComment,
        subVideo
    } from "@/api";
    import VPlayer from "@/components/v-player/v-player";
    import {mapState} from 'vuex'
    import CommentList from "@/components/comment-list/comment-list";
    import CommentEdit from "@/components/comment-edit/comment-edit";
    export default {
        components: {CommentEdit, CommentList, VPlayer},
        data() {
            return {
                video: {},
                url: '',
                relatedVideos:[],
                liked: false,
                comments: {},
                commentsList: [],
                id: '',
                hotComments: true,
            }
        },
        inject: ['reload'],
        methods: {
            editSubmit(value) {
                submitComment(this.id,5,value,1).then(res => {
                    this.commentsList.unshift(res.comment)
                    this.$Message.success('发送评论成功')
                })
            },
            pageTurning(page) {
                let limit = 20
                let offset = (page-1) * limit
                if(!this.hotComments) {
                    reqVideoComments(this.id,limit,offset).then(res => {
                        this.comments = res
                        this.commentsList = res.comments
                    })
                } else {
                    reqHotComments(this.id,5,limit,offset).then(res => {
                        this.comments = res
                        this.commentsList = res.hotComments
                    })
                }
                window.scrollTo(0,(this.$refs.comment.getBoundingClientRect().top + window.scrollY))
            },
            giveLike() {
                if(!this.liked) {
                    ResourceLike(this.id,5,1).then(res => {
                        if(res.code==200) {
                            this.liked = true
                            this.video.praisedCount++
                        }
                    })
                } else {
                    ResourceLike(this.id,5,0).then(res=> {
                        if(res.code==200) {
                            this.liked = false
                            this.video.praisedCount--
                        }
                    })
                }
            },
            subVideo() {
                subVideo(this.id,1).then(res => {
                    if(res.code==200) {
                        this.$Message.success('收藏成功')
                    }
                }).catch(()=> {
                    subVideo(this.id,0).then(res => {
                        if(res.code==200) {
                            this.$Message.success('取消收藏成功')
                        }
                    })
                })
            },
            follow(id,t) {
                if(t) {
                    this.$Message.success('关注成功')
                    this.video.creator.followed = true
                } else {
                    this.$Message.success('取消关注成功')
                    this.video.creator.followed = false
                }
                follow(id,t)
            }
        },
        created() {
            this.id = this.$route.params.id
            let id = this.id
            reqVideoDetail(id).then(res => {
                this.video = res.data
            })
            reqVideoUrl(id).then(res => {
                this.url = res.urls[0].url
            })
            reqRelatedVideo(id).then(res => {
                this.relatedVideos = res.data
                reqRelatedVideo(res.data[0].vid).then(res => {
                    this.relatedVideos = this.relatedVideos.concat(res.data)
                })
            })
            reqVideoInfo(id).then(res => {
                this.liked = res.liked
            })
            reqHotComments(id,5).then(res => {
                this.comments = res
                this.commentsList = res.hotComments
            })
        },
        watch: {
            $route() {
                this.reload()
            },
            hotComments(value) {
                if(value) {
                    reqHotComments(this.id,5).then(res => {
                        this.comments = res
                        this.commentsList = res.hotComments
                    })

                } else {
                    reqVideoComments(this.id).then(res => {
                        this.comments = res
                        this.commentsList = res.comments
                    })
                }
            }
        },
        computed: {
            ...mapState(['userInfo']),
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $blue = #00a1d6
    $blueh = #00b5e5
    .video-player
        margin-top 20px
        text-align left
        .bb
            border-bottom 1px solid #e5e9f0
        .left
            color #222
            a:hover
                color $blue
            .control
                padding 10px 0
                border-bottom 1px solid #e5e9f0
                div
                    cursor pointer
                    padding-right 30px
                    &:hover,&.active
                        color $blue
                        i
                            color $blue
                i
                    color #757575
                    font-size 35px
            .description
                padding 10px 0
            .tags
                padding 10px 0
                margin-bottom 20px
                .tag
                    font-size 12px
                    padding 0 12px
                    display block
                    height 22px
                    margin 0 10px 8px 0
                    transition all .3s
                    line-height 22px
                    background #f4f4f4
                    border-radius 100px
                    border 1px solid #f4f4f4
                    &:hover
                        color $blue
                        border-color $blue
            .comment
                .comment-count
                    margin-bottom 20px
                    font-size 18px
                .comment-header
                    margin-bottom 20px
                    .sort
                        display block
                        padding 10px 0
                        margin-right 20px
                        &.active
                            color $blue
                            border-bottom 1px solid $blue
                .input

                    padding-bottom 30px
                    margin-bottom 20px
                    border-bottom 1px solid #e5e9f0
        .video-player-header
            .time,.count
                margin-top 10px
                color #999
            .count
                margin-bottom 15px
            .play-count
                margin-right 20px
            .title
                font-size 18px
            .user
                margin-right 190px
                .img-box
                    width 50px
                    height 50px
                    border-radius 50%
                    overflow hidden
                    margin-right 10px
                .btn-follow
                    cursor pointer
                    color #fff
                    text-align center
                    padding 3px 10px
                    width 80px
                    background #00a1d6
                    .hf
                        display none
                    &:hover
                        background $blueh
                    &.disabled
                        background #999999
                        &:hover
                            .h
                                display none
                            .hf
                                display inline
        .video-player-inner
            min-width 1200px

        .player
            width 1050px
            max-height 590px

        .related-box
            margin-left 20px
            width 350px
            .tip
                margin 15px 0
                font-size 18px
            .related-list
                .related-item
                    font-size 14px
                    margin-bottom 10px
                .img-box
                    width 150px
                    height 80px
                .info
                    margin-left 5px
                    width 180px
                    .name,.play-count
                        font-size 12px
                        color #999999
                    .title
                        cursor pointer
                        margin-bottom 5px
                        height 36px
                        line-height 18px
                        font-weight 500
                        white-space normal
                        word-break break-all
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        display -webkit-box

        .wo
            color #ffffff
</style>
