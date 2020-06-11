<template>
    <div>
        <banner/>
        <recommend-hot :list="hotList" title="热门推荐"/>
        <recommend-today/>
        <new-album/>
        <rank/>
    </div>
</template>

<script>
    import banner from "@/views/home/banner/banner";
    import recommendHot from '@/views/home/recommend-hot/recommend-hot'
    import recommendToday from '@/views/home/recommend-today/recommend-today'
    import newAlbum from '@/views/home/new-album/new-album'
    import rank from "@/views/home/rank/rank/rank";
    import {reqHotSongList} from "@/api";
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
                hotList: []
            }
        },
        async created() {
            const result = await reqHotSongList(14,'hot')
            this.hotList = result.playlists
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .section
        margin-bottom 30px
    .section-header
        line-height 42px
        margin-bottom 30px
</style>
