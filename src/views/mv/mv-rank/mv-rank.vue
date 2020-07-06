<template>
    <div id="mv-rank" class="container">
        <mv-list-header
                title="MV排行榜"
                @changeArea="mvRankChangeArea"
                show-area
                hidden-more
                :updateTime="updateTime"
        />
        <mv-rank :mvs="mvs"/>
    </div>
</template>

<script>
    import MvListHeader from "@/views/mv/mv-list-header";
    import MvRank from '@/components/mv-rank/mv-rank'
    import {reqMvRank} from "@/api";

    export default {
        components: {MvListHeader, MvRank},
        data() {
            return {
                mvs: [],
                updateTime: 0
            }
        },
        methods: {
            mvRankChangeArea(area) {
                this.mvs = []
                reqMvRank(area, 100, 0).then(res => {
                    this.mvs = res.data
                    this.updateTime = res.updateTime
                })
            }
        },
        created() {
            this.mvRankChangeArea('')
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #mv-rank
        margin-top 20px
</style>