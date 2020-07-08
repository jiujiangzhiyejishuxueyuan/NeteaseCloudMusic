<template>
    <div id="singer-song">
        <div class="singer-title">
            热门歌曲({{songs.length}}首)
        </div>
        <song-list :songlists="songs"/>
    </div>
</template>

<script>
    import {reqSingerHotSong} from "@/api";
    import SongList from "@/components/song-list/song-list";

    export default {
        name: "singer-song",
        components: {SongList},
        data() {
            return {
                songs: []
            }
        },
        created() {
            reqSingerHotSong(this.$route.params.id).then(res => {
                this.songs = res.songs

            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>