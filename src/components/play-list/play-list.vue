<template>
    <div id="playlist-list">
        <ul class="flex flex-wrap">
            <li v-for="(playlist,index) in playlists" :key="index">
                <div class="content img-scale-hover" :title="playlist.name">
                    <div class="cover relative">
                        <router-link :to="`/music/playlist/${playlist.id}`">
                            <div class="img-box img-scale ">
                                <img alt="背景图" :src="playlist.coverImgUrl+'?param=300y300'">
                            </div>
                        </router-link>
                        <div class="btn-play absolute-center">
                            <img src="../../static/imgs/btn-play.png" alt="">
                        </div>
                    </div>
                    <div class="info ellipse">
                        <a class="text-hv">{{playlist.name}}</a>
                    </div>
                    <div class="play-count" :title="playlist.playCount">
                        <Icon type="ios-headset" />
                        {{playlist.playCount | playCount}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'play-list',
        props: {
            playlists:Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #playlist-list
        margin-bottom 40px
        ul li
            width 20%
            margin-bottom 20px
            .content
                padding 0 14px
                &:hover .btn-play
                    opacity 1


                .img-box
                    border-radius 10px
                    width 100%
                    height 252px
                    @media screen and (max-width: 1200px)
                        width 172px !important
                        height 172px !important
                    @media screen and (max-width: 1500px)
                        width 212px
                        height 212px
                .btn-play
                    z-index 20
                    transition all .4s
                    opacity 0
                    width 60px
                    height 60px
                    line-height 60px
                    border-radius 50%
                    cursor pointer
                    &:hover
                        background #000

            .info
                text-align left
                margin-top 15px
                font-size 16px

            .play-count
                padding 3px 0
                font-size 14px
                color #999
                text-align left


</style>
