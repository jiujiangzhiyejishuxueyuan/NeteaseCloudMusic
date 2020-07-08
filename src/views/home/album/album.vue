<template>
    <div class="new-album section">
        <div class="container">
            <div class="section-header flex justify-between" v-if="title">
                <div class="title">
                    <h1>新碟上架</h1>
                </div>
                <div class="more gray">
                    更多
                    <Icon type="ios-arrow-dropright-circle" />
                </div>
            </div>
            <div class="new-album-items flex flex-wrap">
                <div class="item-contain" v-for="(item,index) in albums" :key="index">
                    <div class="item-box">
                        <div class="item-inner">
                            <div class="img-box">
                                <img :src="item.picUrl+'?param=250y250'">
                            </div>
                            <div class="play-box">
                                <img src="../../../static/imgs/btn-play.png">
                            </div>
                            <i class="album-cover"></i>
                        </div>
                        <div class="item-info">
                            <p class="album-name name-block">
                                <span>{{item.name}}</span>
                            </p>
                            <p class="time block-name-next" v-if="isSinger">
                                {{item.publishTime | dataFormat(0)}}
                            </p>
                            <p class="singer block-name-next" v-else>
                                <span v-for="(singer,index) in item.artists" :key="index"
                                      @click="$router.push(`/music/artist/${singer.id}`)">
                                    {{singer.name}}
                                    <span v-if="index+1<item.artists.length">/</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        props: {
            albums: Array,
            title: String,
            isSinger: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026

    .new-album
        @media screen and (max-width: 1550px)
            .img-box
                height 170px !important
        @media screen and (max-width: 1200px)
            .img-box
                height 133px !important

        .section-header
            h1
                font-size 28px
        .item-contain
            width 20%

        .item-box
            cursor pointer
            position relative
            margin 0 21px 25px
            padding 0 12.5px
            &:hover .img-box img
                transform scale(1.1)
            &:hover .play-box
                display block
            .info
                margin-top 15px

        .item-inner
            position relative
            .play-box
                display none
                position absolute
                top 50%
                left 50%
                transform translate(-50%,-50%)
            .album-cover
                width 100%
                height 100%
                position absolute
                top 0
                left 25px
                background-position 0 0
                background-repeat no-repeat
                background-size contain
                background-image url(//cdnmusic.migu.cn/v3/static/img/index/album-cover.png)
                z-index -1
        .img-box
            width 100%
            height 190px
            overflow hidden
            position relative
            border-radius 15px
            img
                display block
                transition all .4s
                width 100%
                height 100%
        .item-info
            font-size 14px
            text-align left
            .album-name
                margin-top 16px
            .block-name-next
                margin-top 12px
                color #999
            p
                height 19px
                line-height 19px
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
                span
                    &:hover

                        color $red
</style>
