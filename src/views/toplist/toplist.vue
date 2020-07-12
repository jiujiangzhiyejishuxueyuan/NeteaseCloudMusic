<template>
    <div class="toplist flex container">
        <div class="toplist-list-scroll" v-if="currentToplist">
            <div class="list-box">
                <div class="list-type">云音乐特色榜</div>
                <ul class="toplist-list">
                    <li
                            class="item flex"
                            :class="{active: toplist.id===toplistId}"
                            v-for="(toplist,index) in featureToplists"
                            :key="index"
                            @click="$router.replace(`/music/toplist?id=${toplist.id}`)"
                    >
                        <div class="img-box">
                            <img :src="toplist.coverImgUrl+'?param=100y100'" alt="">
                        </div>
                        <div class="info">
                            <p class="name">{{toplist.name}}</p>
                            <p class="updateTime">{{toplist.updateFrequency}}</p>
                        </div>
                    </li>
                </ul>
                <div class="list-type">全球媒体榜</div>
                <ul class="toplist-list">
                    <li class="item flex" v-for="(toplist,index) in toplists" :key="index" @click="$router.replace(`/music/toplist?id=${toplist.id}`)">
                        <div class="img-box">
                            <img :src="toplist.coverImgUrl+'?param=100y100'" alt="">
                        </div>
                        <div class="info">
                            <p class="name">{{toplist.name}}</p>
                            <p class="updateTime">{{toplist.updateFrequency}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="toplist-inner" v-if="currentToplist">
            <div class="toplist-inner-header flex">
                <div class="img-box cover">
                    <img :src="currentToplist.coverImgUrl+'?param=400y400'" alt="">
                </div>
                <div class="info">
                    <h2 class="name">{{currentToplist.name}}</h2>
                    <div class="updateTime">
                        <Icon type="ios-time-outline" /> 最近更新: {{currentToplist.trackNumberUpdateTime | dataFormat}}
                    </div>
                    <p class="desc ellipse text-wrap" :title="currentToplist.description">{{currentToplist.description}}</p>
                    <playlist-control />
                </div>
            </div>
            <div class="songlist-box">
                <div class="toplist-songlist-header">
                    <span class="title">歌曲列表</span>
                    <span class="song-count">{{currentToplist.trackCount}}首歌</span>
                    <div class="play-count">
                        播放: <span class="count">{{currentToplist.playCount}} </span>次
                    </div>
                </div>
                <song-list :songs="currentToplist.tracks"/>
            </div>
            <div class="comment-box">
                <div class="comment-box-header bb">
                    <span class="title">评论</span>
                    <span class="comment-count">共<span class="count">2</span>条评论</span>
                </div>
                <div class="inner">
                    <comment-edit />
                    <comment-list />
                </div>
            </div>
        </div>
        <Spin v-else></Spin>
    </div>
</template>

<script>
    import {reqTopList, reqTopListDetail} from "@/api"
    import playlistControl from '@/components/playlist-control/playlist-control'
    import SongList from "@/components/song-list/song-list"
    import CommentEdit from "@/components/comment-edit/comment-edit"
    import CommentList from "@/components/comment-list/comment-list";
    export default {
        components: {
            CommentList,
            CommentEdit,
            SongList,
            playlistControl
        },
        data() {
            return {
                featureToplists: [],
                toplists: [],
                currentToplist: '',
                toplistId: ''
            }
        },
        inject:['reload'],
        created() {
            let toplistId = this.$route.query.id || 19723756
            this.toplistId = parseInt(toplistId)
            reqTopList().then(res => {
                res.list.forEach(item => {
                    item.ToplistType ? this.featureToplists.push(item) : this.toplists.push(item)
                })
            })
            reqTopListDetail(toplistId).then(res => {
                this.currentToplist = res.playlist
            })
        },
        watch: {
            $route() {
                this.reload()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #00a1d6
    $blueh = #00b5e5
    .toplist
        margin-top 70px
        .ivu-spin
            margin 40% auto 0

        .toplist-inner

            padding-top 50px
            margin-left 300px
            @media screen and (max-width: 1200px)
                margin-left 240px
            .comment-box
                margin-top 30px
                .inner
                    padding 0 15px
                .comment-box-header
                    text-align left
                    padding 5px 15px
                    margin-bottom 10px

                    .comment-count
                        margin-left 20px
                        font-size 12px
                        color #999
                    .title
                        font-size 20px
            .songlist-box
                text-align left
                margin-top 30px
                .toplist-songlist-header
                    position relative
                    padding-bottom 5px
                    border-bottom 3px solid $blue
                    .play-count
                        position absolute
                        right 0
                        top 0
                        .count
                            color $blueh
                    .song-count
                        margin-left 20px
                        font-size 12px
                        color #999
                    .title
                        font-size 18px
            .toplist-inner-header
                text-align left
                .info
                    width 80%
                    margin-left 20px
                    .name
                        margin-top 10px
                    .desc
                        width 850px
                        margin-top 20px
                        font-size 12px
                        color #999
                    .playlist-control
                        margin-top 50px
                        .play-all
                            color #fff
                            border-color $blue
                            background $blue
                            &:hover
                                background $blueh
                    .updateTime
                        margin-top 10px
                .cover
                    width 215px

        .toplist-list-scroll
            position fixed
            top 70px
            text-align left
            padding-top 40px
            padding-right 5px
            width 260px
            height 100vh
            overflow auto
            @media screen and (max-width: 1200px)
                width 220px
            /*滚动条整体样式*/
            &::-webkit-scrollbar
                width: 8px;
                height: 0;
            /*滚动条滑块*/
            &::-webkit-scrollbar-thumb
                border-radius: 10px;
                -webkit-box-shadow: none
                background: rgba(0,0,0,.05);
            /*滚动条轨道*/
            &::-webkit-scrollbar-track
                -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
                border-radius: 10px;
                background: transparent;
            .list-box
                padding-bottom 80px
            .toplist-list

                .item
                    padding 10px 0 10px 20px
                    cursor pointer
                    &:hover
                        background rgba(0,0,0,.05)
                    &.active
                        background rgba(0,0,0,.05)
                    .info
                        line-height 30px
                        margin-left 20px
                        .updateTime
                            font-size 12px
                            color #999
                    .img-box
                        width 60px
                        height 60px
            .list-type
                padding 10px 0 10px 20px
                color #000
                font-size 18px
                font-weight 400
        .toplist-inner
            width 80%
</style>
