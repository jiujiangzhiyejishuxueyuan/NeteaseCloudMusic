<template>
    <div id="singer-album" class="my-card">
        <div class="singer-title" ref="top">
            全部专辑({{count}}张)
        </div>
        <album-list :albums="albums" is-singer/>
        <Page :page-size="limit" :total="count" @on-change="changePage"/>
    </div>
</template>

<script>
    import {reqSingerAlbum} from "@/api";
    import albumList from "@/components/album-list/album-list";

    export default {
        name: "singer-album",
        components: { albumList},
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