<template>
    <div id="singer-mv">
        <div class="singer-title" ref="top">
            全部mv({{count}}个)
        </div>
        <mv-list :mvs="mvs" :skeCount="this.limit"/>
        <Page :page-size="limit" :total="count" @on-change="changePage"/>
    </div>
</template>

<script>
    import {reqSingerMv, reqSingerSong} from "@/api";
    import MvList from "@/components/mv-list/mv-list";

    export default {
        name: "singer-mv",
        components: {MvList},
        data() {
            return {
                count: 0,
                limit: 25,
                mvs: []
            }
        },
        methods: {
            changePage(page) {
                let offset = (page - 1) * this.limit
                this.mvs = []
                window.scrollTo(0, (this.$refs.top.getBoundingClientRect().top + window.scrollY))
                reqSingerMv(this.$route.params.id, this.limit, offset).then(res => {
                    this.mvs = res.mvs
                })
            }
        },
        created() {
            reqSingerMv(this.$route.params.id, this.limit, 0).then(res => {
                this.mvs = res.mvs
            })
        },
        beforeRouteEnter(to, from, next) {
            let id = to.params.id
            reqSingerSong(id).then(res => {
                next(vm => {
                    vm.count = res.artist.mvSize
                })
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>