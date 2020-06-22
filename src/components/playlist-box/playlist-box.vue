<template>
    <li class="my-playlist-item">
        <div class="item-box img-scale-hover" @click="$router.push(`/music/playlist/${playlist.id}`)">
            <div class="img-box img-scale">
                <img :src="playlist.picUrl+'?param=200y200'" >
            </div>
            <div class="play-box">
                <img src="../../static/imgs/btn-play.png" alt="">
            </div>
            <p class="play-count">
                <Icon type="ios-headset" />
                {{playlist.playCount | playCount}}
            </p>
        </div>
        <div class="title">
            {{playlist.name}}
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            playlist: Object
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .my-playlist-item
        .play-count
            position absolute
            top 6px
            right 5px
            padding 0 8px
            line-height 24px
            color #fff
            border-radius 12px
            text-align center
            background rgba(0,0,0,.4)
            font-size 12px
            z-index 1
        .title
            margin-top 15px
            line-height 18px
            color #666
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
        .item-box
            position relative
        .img-box
            overflow hidden
            border-radius 8px
</style>
