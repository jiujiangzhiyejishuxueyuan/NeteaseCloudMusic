<template>
    <div id="singer-album">
        <div class="singer-title" ref="top">
            全部专辑({{count}}张)
        </div>
        <album :albums="albums" is-singer v-if="albums.length"/>
        <album-ske hidden-header :row="5" v-else/>
        <Page :page-size="limit" :total="count" @on-change="changePage"/>
    </div>
</template>

<script>
    import {reqSingerAlbum} from "@/api";
    import Album from "@/views/home/album/album";
    import AlbumSke from "@/views/home/album/album-ske";

    export default {
        name: "singer-album",
        components: {AlbumSke, Album},
        data() {
            return {
                count: 0,
                albums: [],
                limit: 25
            }
        },
        methods: {
            changePage(page) {
                let offset = (page - 1) * this.limit
                this.albums = []
                window.scrollTo(0, (this.$refs.top.getBoundingClientRect().top + window.scrollY))
                reqSingerAlbum(this.$route.params.id, this.limit, offset).then(res => {
                    this.albums = res.hotAlbums

                })
            }
        },
        created() {
            reqSingerAlbum(this.$route.params.id, this.limit, 0).then(res => {
                this.albums = res.hotAlbums
                this.count = res.artist.albumSize
            })
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>