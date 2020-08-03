<template>
    <div class="album-list container">
        <ul class="album-items flex flex-wrap" v-if="albums.length">
                <li class="item-contain" v-for="(album,index) in albums" :key="index">
                    <div class="item-box">
                        <div class="item-inner img-scale">
                            <div class="img-box">
                                <router-link :to="`/music/album/${album.id}`">
                                    <img :src="album.picUrl+'?param=250y250'">
                                </router-link>
                            </div>
                            <div class="playlist-all-btn-play absolute-center" title="播放专辑"
                                 @click.prevent="play(album)">
                                <img src="../../static/imgs/btn-play.png">
                            </div>
                            <i class="album-cover"></i>
                        </div>
                        <div class="item-info">
                            <p class="album-name name-block">
                                <router-link :to="`/music/album/${album.id}`" class="text-hv">{{album.name}}
                                </router-link>
                            </p>
                            <p class="time block-name-next" v-if="isSinger">
                                {{album.publishTime | dataFormat(0)}}
                            </p>
                            <p class="singer block-name-next" v-else>
                                <router-link v-for="(singer,index) in album.artists" :key="index"
                                             :to="`/music/artist/${singer.id}`" class="text-hv">
                                    {{singer.name}}
                                    <span v-if="index+1<album.artists.length">/</span>
                                </router-link>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        <album-ske :row="2" v-else/>
    </div>
</template>

<script>

    import {reqAlbumDetail} from "@/api";
    import AlbumSke from "@/components/album-list/album-ske";

    export default {
        components: {AlbumSke},
        props: {
            albums: Array,
            isSinger: Boolean
        },
        methods: {
            play(album) {
                reqAlbumDetail(album.id).then(res => {
                    let ids = res.songs.map(item => item.id)
                    this.publicMethods.playMusic(ids)
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $red = #E60026

    .album-list
        margin-top 10px
        @media screen and (max-width: 1550px)
            .img-box
                height 170px !important
        @media screen and (max-width: 1200px)
            .img-box
                height 133px !important


        .item-contain
            width 20%
            z-index 2

        .item-box
            position relative
            margin 0 21px 25px
            padding 0 12.5px

            .info
                margin-top 15px

        .item-inner
            overflow visible
            position relative

            &:hover .playlist-all-btn-play
                opacity 1

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
            height 210px
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
