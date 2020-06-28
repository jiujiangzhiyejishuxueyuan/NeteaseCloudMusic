<template>
    <div class="home">
        <banner v-if="banners.length" :banners="banners"/>
        <banner-ske v-else/>
        <recommend-hot :list="hotList" title="热门推荐" v-if="hotList.length"/>
        <ske :row="2" v-else/>
        <recommend-today v-if="userInfo&&userInfo.userId"/>
        <new-album :albums="albums" title="新碟上架" v-if="albums.length"/>
        <album-ske :row="2" v-else/>
        <rank/>
    </div>
</template>

<script>
    import ske from '@/components/ske/ske'
    import banner from "@/views/home/banner/banner";
    import bannerSke from '@/views/home/banner/banner-ske'
    import recommendHot from '@/views/home/recommend-hot/recommend-hot'
    import recommendToday from '@/views/home/recommend-today/recommend-today'
    import newAlbum from '@/views/home/album/album'
    import albumSke from '@/views/home/album/album-ske'
    import rank from "@/views/home/rank/rank/rank";
    import {reqBanner, reqHotSongList, reqNewAlbum} from "@/api";
    import {mapState} from 'vuex'
    export default {
        name: 'home',
        components: {
            banner,
            recommendHot,
            recommendToday,
            newAlbum,
            rank,
            ske,
            albumSke,
            bannerSke
        },
        data() {
            return {
                hotList: [],
                albums:[],
                banners: []
            }
        },
        async created() {
            let banners = await reqBanner()
            this.banners = banners.banners
            const result = await reqHotSongList(14,'hot')
            this.hotList = result.playlists
            const albums = await reqNewAlbum(0,10)
            this.albums = albums.albums

        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .home
        .ske
            overflow hidden
        .section
            margin-bottom 30px
        .section-header
            line-height 42px
            margin-bottom 30px
        .swiper-slide
            img
                cursor pointer
                margin 0 auto
</style>
