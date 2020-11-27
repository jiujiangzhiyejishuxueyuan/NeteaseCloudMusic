<template>
  <div id="mv" class="container">
    <div class="new-mv my-card">
      <video-list-header title="最新MV" @changeArea="newMvChangeArea" show-area
                         morelink="/mv/all?order=最新&type=全部&area=全部"/>
      <mv-list :mvs="newMvs"/>
    </div>
    <div class="hot-mv my-card">
      <video-list-header title="热播MV" morelink="/mv/all?order=最热&type=全部&area=全部"/>
      <mv-list :mvs="hotMvs"/>
    </div>
    <div class="exclutsive-mv my-card">
      <video-list-header title="网易出品" morelink="/mv/all?type=网易出品&order=最新&area=全部"/>
      <mv-list :mvs="exclutsiveMvs" hidden-art/>
    </div>
    <div class="mv-rank my-card">
      <video-list-header title="MV排行榜" @changeArea="mvRankChangeArea" morelink="/mv/rank" show-area/>
      <mv-rank :mvs="rankMvs"/>
    </div>
  </div>
</template>

<script>
import videoListHeader from '@/views/mv/mv-list-header'
import MvList from "@/components/mv-list/mv-list";
import {reqexclusiveMv, reqMv, reqMvRank, reqNewMv} from "@/api";
import MvRank from "@/components/mv-rank-list/mv-rank";

export default {
  components: {
    MvRank,
    MvList,
    videoListHeader
  },
  data() {
    return {
      newMvs: [],
      hotMvs: [],
      exclutsiveMvs: [],
      rankMvs: []
    }
  },
  methods: {
    newMvChangeArea(area) {
      this.newMvs = []
      reqNewMv(10, area).then(res => {
        this.newMvs = res.data
      })
    },
    mvRankChangeArea(area) {
      this.rankMvs = []
      reqMvRank(area, 20, 0).then(res => {
        this.rankMvs = res.data
      })
    }
  },
  created() {
    this.newMvChangeArea('')
    this.mvRankChangeArea('')
    reqMv('', '', '最热', 10, 0).then(res => {
      this.hotMvs = res.data
    })
    reqexclusiveMv(10, 0).then(res => {
      this.exclutsiveMvs = res.data
    })

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#mv
  margin-top 20px

  & > .my-card
    margin 0 auto 20px

</style>
