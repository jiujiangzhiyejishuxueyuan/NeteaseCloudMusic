<template>
    <div class="home">
        <banner/>
        <recommend-hot :list="hotList" title="热门推荐" v-if="hotList.length"/>
        <div class="ske container" v-else>
            <Spin></Spin>
        </div>
        <recommend-today v-if="userInfo&&userInfo.userId"/>
        <new-album :albums="albums" title="新碟上架" v-if="albums.length"/>
        <rank/>
    </div>
</template>

<script>
    import banner from "@/views/home/banner/banner";
    import recommendHot from '@/views/home/recommend-hot/recommend-hot'
    import recommendToday from '@/views/home/recommend-today/recommend-today'
    import newAlbum from '@/views/home/album/album'
    import rank from "@/views/home/rank/rank/rank";
    import {reqHotSongList, reqNewAlbum} from "@/api";
    import {mapState} from 'vuex'
    export default {
        name: 'home',
        components: {
            banner,
            recommendHot,
            recommendToday,
            newAlbum,
            rank
        },
        data() {
            return {
                hotList: [],
                albums:[]
            }
        },
        async created() {
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
