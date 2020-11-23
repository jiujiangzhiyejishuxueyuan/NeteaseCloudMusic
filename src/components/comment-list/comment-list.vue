<template>
    <div id="comment-list" v-if="!loading">
        <ul class="comment-list" v-if="comments.length">
            <li class="comment-item  flex" v-for="(comment,index) in comments" :key="index">
                <div class="user-face img-box">
                    <a :href="`/user/home?id=${comment.user.userId}`" target="_blank">
                        <img :src="comment.user.avatarUrl+'?param=50y50'" alt="comment.user.nickname"
                             :title="comment.user.nickname">
                    </a>
                </div>
                <div class="comment-inner bb">
                    <a :href="`/user/home?id=${comment.user.userId}`" target="_blank" class="user-name"
                       :title="comment.user.nickname">{{comment.user.nickname}}</a>
                    <p class="text">{{comment.content}}</p>
                    <div class="reply" v-if="comment.beReplied && comment.beReplied.length">
                        <a target="_blank" :href="`/user/home?id=${comment.beReplied[0].user.userId}`" class="user-name">
                            @{{comment.beReplied[0].user.nickname}}
                        </a>
                        :
                        <span class="text">{{comment.beReplied[0].content}}</span>
                    </div>
                    <span class="time">{{comment.time | dataFormat}}</span>
                    <span class="like" @click="jump('giveLike',[comment])">
                    <svg v-if="!comment.liked" t="1592146371481" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2299" width="16" height="16"><path
                            d="M168.627 422.807c-28.928 0.955-52.134 24.948-52.134 53.894v376.713c0 29.29 23.747 53.032 53.039 53.032H766.72c27.263 0 52.363-20.527 57.773-47.248L905.908 456.9c6.3-31.137-16.357-57.926-48.1-56.876l-275.241 9.099 26.232 34.252c8.585-28.073 16.763-58.899 22.972-89.459 8.961-44.093 12.531-81.283 8.718-109.722-2.934-21.886-5.33-36.121-8.617-49.317-4.319-17.332-9.974-31.313-18.095-42.993-19.49-28.027-50.548-39.002-94.002-34.329-29.689 3.193-50.674 15.138-63.743 36.986-9.667 16.159-13.782 33.454-18.456 67.732-0.519 3.806-2.591 19.512-3.141 23.543-1.304 9.618-2.483 17.677-3.793 25.73-3.324 20.451-7.289 39.408-12.532 58.782-7.533 27.835-30.428 49.325-67.415 65.081-31.081 13.242-69.531 21.318-110.987 25.091l-71.08 2.306z m202.853 21.389c50.602-21.558 85.435-54.251 97.819-100.018 5.752-21.258 10.086-41.97 13.687-64.123 1.394-8.571 2.637-17.065 3.999-27.108 0.565-4.165 2.636-19.85 3.135-23.512 6.728-49.34 11.036-56.544 35.326-59.157 14.083-1.513 24.471-0.714 31.794 1.874 5.601 1.978 9.555 5.051 13 10.006 7.799 11.215 12.417 29.751 17.691 69.082 2.84 21.175-0.251 53.362-8.126 92.112-5.829 28.674-13.593 57.942-21.72 84.518-5.317 17.392 8.053 34.853 26.232 34.252l275.241-9.1c-2.471 0.082-6.117-4.227-5.63-6.641l-81.414 402.298c-0.961 1.849-1.564 2.525-2.287 3.115a8.284 8.284 0 0 1-3.887 1.795c1.094-0.256-596.813-0.173-596.813-0.173-0.007 0-0.009-376.715-0.009-376.715 0-0.344 73.466-3.294 73.466-3.294 48.019-4.327 91.541-13.467 128.494-29.212z"
                            p-id="2300" fill="#515151"></path><path d="M297.674 429.142h53.03v450.746h-53.03z"
                                                                    p-id="2301" fill="#515151"></path></svg>
                    <svg v-else t="1592146371481" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2299" width="16" height="16"><path
                            d="M168.627 422.807c-28.928 0.955-52.134 24.948-52.134 53.894v376.713c0 29.29 23.747 53.032 53.039 53.032H766.72c27.263 0 52.363-20.527 57.773-47.248L905.908 456.9c6.3-31.137-16.357-57.926-48.1-56.876l-275.241 9.099 26.232 34.252c8.585-28.073 16.763-58.899 22.972-89.459 8.961-44.093 12.531-81.283 8.718-109.722-2.934-21.886-5.33-36.121-8.617-49.317-4.319-17.332-9.974-31.313-18.095-42.993-19.49-28.027-50.548-39.002-94.002-34.329-29.689 3.193-50.674 15.138-63.743 36.986-9.667 16.159-13.782 33.454-18.456 67.732-0.519 3.806-2.591 19.512-3.141 23.543-1.304 9.618-2.483 17.677-3.793 25.73-3.324 20.451-7.289 39.408-12.532 58.782-7.533 27.835-30.428 49.325-67.415 65.081-31.081 13.242-69.531 21.318-110.987 25.091l-71.08 2.306z m202.853 21.389c50.602-21.558 85.435-54.251 97.819-100.018 5.752-21.258 10.086-41.97 13.687-64.123 1.394-8.571 2.637-17.065 3.999-27.108 0.565-4.165 2.636-19.85 3.135-23.512 6.728-49.34 11.036-56.544 35.326-59.157 14.083-1.513 24.471-0.714 31.794 1.874 5.601 1.978 9.555 5.051 13 10.006 7.799 11.215 12.417 29.751 17.691 69.082 2.84 21.175-0.251 53.362-8.126 92.112-5.829 28.674-13.593 57.942-21.72 84.518-5.317 17.392 8.053 34.853 26.232 34.252l275.241-9.1c-2.471 0.082-6.117-4.227-5.63-6.641l-81.414 402.298c-0.961 1.849-1.564 2.525-2.287 3.115a8.284 8.284 0 0 1-3.887 1.795c1.094-0.256-596.813-0.173-596.813-0.173-0.007 0-0.009-376.715-0.009-376.715 0-0.344 73.466-3.294 73.466-3.294 48.019-4.327 91.541-13.467 128.494-29.212z"
                            p-id="2300" fill="#1296db"></path><path d="M297.674 429.142h53.03v450.746h-53.03z"
                                                                    p-id="2301" fill="#1296db"></path></svg>
                    <span class="count">{{comment.likedCount}}</span>
                </span>
                    <span class="send-btn"
                          @click="sendCommentId = sendCommentId===comment.commentId ? '' :comment.commentId">回复</span>
                    <span class="comment-delete" v-if="comment.user.userId===userInfo.userId"
                          @click="jump('commentDelete',[comment.commentId,index])">删除</span>
                    <comment-edit reply v-if="sendCommentId===comment.commentId" @submit="(value)=>jump('sendComment',[value])"/>
                </div>
            </li>
        </ul>
        <div class="no-comment text-center" v-else>
            暂无评论
        </div>
    </div>
    <ul class="comment-list comment-list-ske" v-else>
        <li class="comment-item flex" v-for="index in 8" :key="index">
            <div class="user-face ske-ani"></div>
            <div class="comment-inner">
                <div class="name ske-ani"></div>
                <div class="text ske-ani"></div>
                <div class="foot ske-ani"></div>
            </div>
        </li>
    </ul>
</template>

<script>
    import {giveCommentLike, reqLoginState, submitComment} from "@/api";
    import {mapState} from 'vuex'
    import commentEdit from '@/components/comment-edit/comment-edit'
    export default {
        props: {
            comments: Array,
            id: String,
            type: String,
            loading: Boolean
        },
        components: {
            commentEdit
        },
        data() {
            return {
                sendCommentId: '',
                userInfo: ''
            }
        },
        methods: {
            jump(e, params=[]) {
                if (this.userInfo) {
                    this[e](...params)
                } else {
                    this.$Message.info('请先登录')
                }
            },
            giveLike(comment) {
                if (!comment.liked) {
                    giveCommentLike(this.id, comment.commentId, this.type, 1).then(res => {
                        if (res.code === 200) {
                            comment.liked = true
                            comment.likedCount++
                        }
                    })
                } else {
                    giveCommentLike(this.id, comment.commentId, this.type, 0).then(res => {
                        if (res.code === 200) {
                            comment.liked = false
                            comment.likedCount--
                        }
                    })
                }
            },
            sendComment(value) {
                submitComment(this.id, this.type, value, 2, this.sendCommentId).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('发送评论成功')
                    }
                    this.sendCommentId = ''
                }).catch(() => {
                    this.$Message.error('发送评论失败')
                })
            },
            commentDelete(id,index) {
                submitComment(this.id,this.type,'',0,id).then(res => {
                    this.comments.splice(index,1)
                })
            }
        },
        created() {
            reqLoginState().then(res => {
                this.userInfo = res.profile
            }).catch(err => {
              err.toString()
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $blue = #00a1d6
    $blueh = #00b5e5
    .no-comment
        margin 20px 0
    .comment-list
        text-align left

        &.comment-list-ske
            ske(height,width)
                height height
                width width
                margin-bottom  10px
            .name
                ske(18px,120px)
            .text
                ske(25px,100%)
            .foot
                ske(15px,50%)
        .comment-edit
            margin-top 20px
        .bb
            border-bottom 1px solid #e5e9f0
        .comment-item
            width 100%

            .user-face
                flex-shrink 0
                width 50px
                height 50px
                border-radius 50%
                overflow hidden

            .comment-inner
                width 90%
                margin 5px 0 20px 25px
                padding-bottom 20px
                .reply
                    font-size 12px
                    padding 8px 10px
                    width 100%
                    background #F1F1F4
                    .user-name
                        color $blue

                        &:hover
                            color $blueh
                p
                    margin-bottom 0

                .user-name
                    font-size 12px
                    color #6d757a
                    font-weight 600

                    &:hover
                        color $blue

                .text
                    color rgba(0, 0, 0, .65)
                    margin 10px 0

                .time
                    font-size 12px
                    color #99a2aa
                .like
                    margin-left 10px
                    cursor pointer
                    &:hover
                        color $blue
                .send-btn,.comment-delete
                    font-size 12px
                    color #99a2aa
                    margin-left 30px
                    padding 4px 5px
                    cursor pointer
                    &:hover
                        border-radius 5px
                        background #e5e9ef
                        color $blue

</style>
