<template>
    <div class="home">
        <banner :banners="banners" v-if="banners.length"/>
        <banner-ske v-else/>
        <recommend-hot :list="hotList" title="热门推荐" v-if="hotList.length"/>
        <playlistListSke :row="2" v-else/>
        <recommend-today v-if="userInfo&&userInfo.userId"/>
        <new-album-list />
        <rank/>
    </div>
</template>

<script>
    import playlistListSke from '@/components/playlist-list-ske/playlist-list-ske'
    import banner from "@/views/home/banner/banner";
    import bannerSke from '@/views/home/banner/banner-ske'
    import recommendHot from '@/views/home/recommend-hot/recommend-hot'
    import recommendToday from '@/views/home/recommend-today/recommend-today'
    import rank from "@/views/home/rank/rank/rank";
    import {reqBanner, reqHotSongList, reqLoginState, reqNewAlbum} from "@/api";
    import NewAlbumList from "@/views/home/new-album-list/new-album-list";
    export default {
        name: 'home',
        components: {
            NewAlbumList,
            banner,
            recommendHot,
            recommendToday,
            rank,
            playlistListSke,
            bannerSke
        },
        data() {
            return {
                hotList: [],
                banners: [],
                userInfo: ''
            }
        },
        async created() {
            let banners = await reqBanner()
            this.banners = banners.banners
            const result = await reqHotSongList(14,'hot')
            this.hotList = result.playlists
            reqLoginState().then(res => {
                this.userInfo = res.profile
            })
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
