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
            <user-card :id="video.creator.userId" v-if="video.creator"/>
        </div>
        <div class="video-player-inner container flex">
            <div class="left">
                <div class="player" :class="{'player-ske':!vReady}">
                    <div class="background-blur">
                        <img :src="video.coverUrl" alt="">
                    </div>
                    <v-player :url="url" v-if="url" @ready="vReady = true"/>
                </div>
                <div class="control flex">
                    <div class="praised" :class="{active:liked}" @click="giveLike">
                        <Icon type="md-thumbs-up"/>
                        {{video.praisedCount | playCount}}
                    </div>
                    <div class="subscribe" @click="subVideo">
                        <Icon type="md-star"/>
                        {{video.subscribeCount | playCount}}
                    </div>
                    <div class="share">
                        <Icon type="ios-share-alt"/>
                        {{video.shareCount | playCount}}
                    </div>
                </div>
                <div class="description">
                    {{video.description || '暂无简介'}}
                </div>
                <div class="tags flex bb">
                    <a :href="`/video?id=${tag.id}`" target="_blank" class="tag" v-for="(tag,index) in video.videoGroup"
                       :title="tag.name" :key="index">
                        {{tag.name}}
                    </a>
                </div>
                <div class="comment">
                    <div class="comment-count">
                        {{comments.total}} 评论
                    </div>
                    <div class="comment-header bb flex" ref="comment">
                        <a class="sort" :class="{active:hotComments}" @click="hotComments = true">最热评论</a>
                        <a class="sort" :class="{active:!hotComments}" @click="hotComments = false">最新评论</a>
                    </div>
                    <comment-edit :id="video.vid" type="5" class="input"/>
                    <comment-list
                            :comments="commentsList"
                            :id="video.vid"
                            type="5"
                            v-if="commentsList.length"
                    />
                    <div class="no-comment" v-else>
                        暂无更多评论
                    </div>
                    <Page
                            :total="comments.total"
                            :page-size="20"
                            v-if="comments.total>20"
                            @on-change="pageTurning"
                    />
                </div>
            </div>
            <video-related :videos="relatedVideos"/>
        </div>
    </div>
</template>

<script>
    import {
        reqHotComments,
        reqRelatedVideo,
        reqVideoComments,
        reqVideoDetail,
        reqVideoInfo,
        reqVideoUrl,
        resourceLike,
        subVideo
    } from "@/api";
    import VPlayer from "@/components/v-player/v-player";
    import {mapState} from 'vuex'
    import CommentList from "@/components/comment-list/comment-list";
    import CommentEdit from "@/components/comment-edit/comment-edit";
    import UserCard from "@/components/user-card/user-card";
    import VideoRelated from "@/components/video-related/video-related";
    export default {
        components: {VideoRelated, UserCard, CommentEdit, CommentList, VPlayer},
        data() {
            return {
                video: {},
                url: '',
                relatedVideos: [],
                liked: false,
                comments: {},
                commentsList: [],
                id: '',
                hotComments: true,
                vReady: false
            }
        },
        inject: ['reload'],
        methods: {
            //评论翻页
            pageTurning(page) {
                let limit = 20
                let offset = (page - 1) * limit
                if (!this.hotComments) {
                    reqVideoComments(this.id, limit, offset).then(res => {
                        this.comments = res
                        this.commentsList = res.comments
                    })
                } else {
                    reqHotComments(this.id, 5, limit, offset).then(res => {
                        this.comments = res
                        this.commentsList = res.hotComments
                    })
                }
                window.scrollTo(0, (this.$refs.comment.getBoundingClientRect().top + window.scrollY))
            },
            //点赞视频
            giveLike() {
                if (!this.liked) {
                    resourceLike(this.id, 5, 1).then(res => {
                        if (res.code === 200) {
                            this.liked = true
                            this.video.praisedCount++
                        } else {
                            this.$Message.info('操作失败')
                        }
                    }).catch(() => {
                        this.$Message.info('操作失败')
                    })
                } else {
                    resourceLike(this.id, 5, 0).then(res => {
                        if (res.code === 200) {
                            this.liked = false
                            this.video.praisedCount--
                        } else {
                            this.$Message.info('操作失败')
                        }
                    }).catch(() => {
                        this.$Message.info('操作失败')
                    })
                }
            },
            //收藏视频
            subVideo() {
                subVideo(this.id,1).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('收藏成功')
                    }
                }).catch(()=> {
                    subVideo(this.id,0).then(res => {
                        if (res.code === 200) {
                            this.$Message.success('取消收藏成功')
                        }
                    })
                })
            },

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
                    reqRelatedVideo(res.data[0].vid).then(res => {
                        this.relatedVideos = [...this.relatedVideos, ...res.data]
                    })
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
        #video-related
            margin-left 10px

        .background-blur
            opacity 1
            img
                filter blur(10px)
        .bb
            border-bottom 1px solid #e5e9f0
        .left
            color #222
            width 1050px
            a:hover
                color $blue
            @media screen and (max-width: 1500px)
                max-width 850px
            @media screen and (max-width: 1200px)
                max-width 740px
            .control
                padding 10px 0
                border-bottom 1px solid #e5e9f0
                div
                    cursor pointer
                    padding-right 30px

                    &:hover, &.active
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
                    margin-bottom 20
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
                .no-comment
                    text-align center
                    padding 50px 0
        .video-player-header
            .user-card
                margin-right 14%
            .time, .count
                margin-top 10px
                color #999
            .count
                margin-bottom 15px
            .play-count
                margin-right 20px
            .title
                font-size 18px
        .player
            width 100%
            max-height 590px
            position relative

            &.player-ske
                animation ske .8s linear infinite alternate
                background rgba(0, 0, 0, .05)
                height 580px

</style>
