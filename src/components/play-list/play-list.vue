<template>
    <div class="songlist-inner">
        <ul class="flex flex-wrap">
            <li v-for="(playlist,index) in playlists" :key="index">
                <div class="content img-scale-hover">
                    <div class="cover relative">
                        <a @click="$router.push(`/music/playlist/${playlist.id}`)">
                            <div class="img-box img-scale ">
                                <img alt="背景图" :src="playlist.coverImgUrl">
                            </div>
                        </a>
                        <div class="btn-play absolute-center">
                            <img src="../../static/imgs/btn-play.png" alt="">
                        </div>
                    </div>
                    <div class="info ellipse ">
                        <a class="text-hv">{{playlist.name}}</a>
                    </div>
                    <div class="play-count">
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
    .songlist-inner
        margin-bottom 40px
        ul li
            width 20%
            margin-bottom 20px
            .content
                padding 0 14px
                &:hover .btn-play
                    opacity 1
                .img-box
                    width 100%
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
