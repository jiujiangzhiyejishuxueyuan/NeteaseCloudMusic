<template>
  <div class="toplist flex container">
    <div class="toplist-list-box">
      <div class="toplist-list-scroll my-card" v-if="completeToplist">
        <div class="list-box">
          <div class="list-type">云音乐特色榜</div>
          <ul class="toplist-list">
            <li
                class="item"
                :class="{active: toplist.id===toplistId}"
                v-for="(toplist,index) in featureToplists"
                :key="index"
                @click="$router.replace(`/music/toplist?id=${toplist.id}`)"
            >
              <div class="img-box">
                <img :src="toplist.coverImgUrl+'?param=100y100'" alt="">
              </div>
              <div class="info">
                <p class="name">{{ toplist.name }}</p>
                <p class="updateTime">{{ toplist.updateFrequency }}</p>
              </div>
            </li>
          </ul>
          <div class="list-type">全球媒体榜</div>
          <ul class="toplist-list">
            <li class="item" v-for="(toplist,index) in toplists" :key="index"
                @click="$router.replace(`/music/toplist?id=${toplist.id}`)">
              <div class="img-box">
                <img :src="toplist.coverImgUrl+'?param=100y100'" alt="">
              </div>
              <div class="info">
                <p class="name ">{{ toplist.name }}</p>
                <p class="updateTime">{{ toplist.updateFrequency }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="toplist-inner my-card">
      <div class="toplist-inner-header flex" v-if="currentToplist">
        <div class="img-box cover">
          <img :src="currentToplist.coverImgUrl+'?param=400y400'" alt="">
        </div>
        <div class="info">
          <h2 class="name">{{ currentToplist.name }}</h2>
          <div class="updateTime">
            <Icon type="ios-time-outline"/>
            最近更新: {{ currentToplist.trackUpdateTime | dataFormat }}
          </div>
          <p class="desc ellipse text-wrap" :title="currentToplist.description">{{ currentToplist.description }}</p>
          <playlist-control/>
          <router-link :to="`/music/playlist/${toplistId}`" class="go-playlist h-text-blue">去歌单页查看</router-link>
        </div>
      </div>
      <header-info-ske s v-else/>
      <div class="songlist-box">
        <div class="toplist-songlist-header">
          <span class="title">歌曲列表</span>
          <span class="song-count">{{ currentToplist.trackCount || 0 }}首歌</span>
          <div class="play-count">
            播放: <span class="count">{{ currentToplist.playCount || 0 }} </span>次
          </div>
        </div>
        <song-list :songs="currentToplist.tracks||[]"/>
      </div>
    </div>
  </div>
</template>

<script>
import {reqTopList, reqTopListDetail} from "@/api"
import playlistControl from '@/components/playlist-control/playlist-control'
import SongList from "@/components/song-list/song-list"
import HeaderInfoSke from "@/components/header-info-ske/header-info-ske";

export default {
  components: {
    HeaderInfoSke,
    SongList,
    playlistControl
  },
  data() {
    return {
      featureToplists: [],
      toplists: [],
      currentToplist: '',
      toplistId: '',
      completeToplist: false
    }
  },
  created() {
    reqTopList().then(res => {
      res.list.forEach(item => {
        item.ToplistType ? this.featureToplists.push(item) : this.toplists.push(item)
      })
      this.completeToplist = true
    })
    this.render()
  },
  methods: {
    render() {
      let toplistId = this.$route.query.id || 19723756
      this.toplistId = parseInt(toplistId)
      this.currentToplist = ''
      reqTopListDetail(toplistId).then(res => {
        this.currentToplist = res.playlist
      })
    }
  },
  watch: {
    $route() {
      this.render()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$blue = #00a1d6
$blueh = #00b5e5
.toplist
  margin-top 70px

  .cover
    width 205px
    height 205px

  .playlist-control
    .sub, .to-comment
      display none


  .ivu-spin
    margin 40% auto 0

  .toplist-inner
    width 1000px
    padding-top 30px
    margin-top 30px
    margin-bottom 30px
    margin-left 280px

    .comment-box
      margin-top 30px

      .inner
        padding 0 15px

      .comment-box-header
        text-align left
        padding 5px 15px
        margin-bottom 10px

        .comment-count
          margin-left 20px
          font-size 12px
          color #999

        .title
          font-size 20px

    .songlist-box
      text-align left
      margin-top 30px

      .toplist-songlist-header
        position relative
        padding-bottom 5px
        border-bottom 3px solid $blue

        .play-count
          position absolute
          right 0
          top 0

          .count
            color $blueh

        .song-count
          margin-left 20px
          font-size 12px
          color #999

        .title
          font-size 18px

    .toplist-inner-header
      text-align left

      .info
        width 75%
        margin-left 20px
        position relative

        .go-playlist
          position absolute
          right 0
          top 0

        .desc
          width 100%
          margin-top 20px
          font-size 12px
          color #999

        .playlist-control
          margin-top 20px

        .updateTime
          margin-top 10px

  .toplist-list-box
    position fixed
    top 80px
    text-align left
    width 250px
    padding 20px 0 110px
    height 100vh

  .toplist-list-scroll
    height 100%
    overflow auto
    &.my-card
      padding 10px
    @media screen and (max-width: 1200px)
      width 220px
    /*滚动条整体样式*/

    &::-webkit-scrollbar
      width: 3px;
      height: 0;

    /*滚动条滑块*/

    &::-webkit-scrollbar-thumb
      border-radius: 10px;
      -webkit-box-shadow: none
      background: rgba(0, 0, 0, .05);

    /*滚动条轨道*/

    &::-webkit-scrollbar-track
      -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, .1);
      border-radius: 10px;
      background: transparent;

    .toplist-list

      .item
        display flex
        padding 10px 0 10px 20px
        cursor pointer

        &:hover
          background rgba(0, 0, 0, .05)

        &.active
          background rgba(0, 0, 0, .05)

        .info
          line-height 30px
          margin-left 20px
          .name
            line-height 20px
          .updateTime
            font-size 12px
            color #999

        .img-box
          flex-shrink 0
          width 60px
          height 60px

    .list-type
      padding 10px 0 10px 20px
      color #000
      font-size 18px
      font-weight 400
  @media screen and (max-width: 1550px)
    .toplist-inner
      width 920px
      margin-left 260px

    .cover
      width 173px
      height 173px
  @media screen and (max-width: 1200px)
    .toplist-inner-header .info
      width 70% !important

    .cover
      width 170px
      height 170px

    .toplist-inner
      width 745px
      margin-left 240px
</style>
