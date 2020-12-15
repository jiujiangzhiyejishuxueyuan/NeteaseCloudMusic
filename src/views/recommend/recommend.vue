<template>
  <div id="recommend">
    <div class="recommend-header">
      <div class="background-blur">
        <img src="https://s2.music.126.net/style/web2/img/recmd_daily.jpg?206411d0e6e5dd74a0dc707fa2abe17f">
      </div>
      <div class="recommend-inner flex container">
        <div class="left flex">
          <div class="today">
            <div class="title">
              {{ today.ch }}
            </div>
            <div class="text">
              {{ today.td }}
            </div>
          </div>
          <div class="flag flex direction-column justify-center">
            <div class="title">每日歌曲推荐</div>
            <div class="brief">根据你的音乐口味生成,每天6点更新</div>
          </div>
        </div>
        <div class="presentation flex direction-column justify-between">
          <div class="text">
            它聪明、熟悉每个用户的喜好，从海量音乐中挑选出你可能喜欢的音乐。<br>
            它通过你每一次操作来记录你的口味,<br>
            你提供给云音乐的信息越多，它就越了解你的音乐喜好。
          </div>
          <div class="count-box">
            <p class="count-inner">你播放了<span class="count">{{ playCount }}</span>首音乐</p>
            <p class="count-inner">你喜欢了<span class="count">{{ likeCount }}</span>首音乐</p>
            <p class="count-inner">你收藏了<span class="count">{{ artistCount }}</span>个歌手</p>
          </div>
        </div>
      </div>
    </div>
    <song-list class="container" :songs="songs"/>

  </div>
</template>

<script>
import {reqLikeSong, reqLoginState, reqRecommendSongs, reqUserInfo, reqUserSubCount} from "@/api";
import SongList from "@/components/song-list/song-list"

export default {
  components: {SongList},
  computed: {
    today() {
      let date = new Date()
      let day
      switch (date.getDay()) {
        case 0:
          day = "星期天";
          break;
        case 1:
          day = "星期一";
          break;
        case 2:
          day = "星期二";
          break;
        case 3:
          day = "星期三";
          break;
        case 4:
          day = "星期四";
          break;
        case 5:
          day = "星期五";
          break;
        case 6:
          day = "星期六";

      }
      return {
        td: date.getDate(),
        ch: day
      }
    },
  },
  data() {
    return {
      songs: [],
      subCount: '',
      user: '',
      playCount: 0,
      likeCount: 0,
      artistCount: 0
    }
  },
  mounted() {
    reqRecommendSongs().then(res => {
      this.songs = res.recommend || res.data.dailySongs
    })
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || ''
    if (userInfo) {
      let id = userInfo.userId
      reqUserInfo(id).then(res => {
        this.playCount = res.listenSongs
      })
      reqLikeSong(id).then(res => {
        this.likeCount = res.ids.length
      })
    }
    reqUserSubCount().then(res => {
      this.artistCount = res.artistCount
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$red = #E91E63
#recommend
  .recommend-header
    padding 40px 0
    position relative

    .left
      width 50%
      border-right 1px solid rgba(0, 0, 0, .1)

    .presentation
      padding-top 10px
      width 50%
      text-align left
      margin-left 50px

      .count-box

        padding 10px
        border 1px solid rgba(0, 0, 0, .1)
        border-radius 10px

        .count-inner
          font-size 16px
          margin 5px 0

          .count
            color #D03737

    .flag
      margin-left 20px
      text-align left

      .brief
        margin-top 40px
        font-size 18px

      .title
        font-size 24px

    .today
      overflow hidden
      border-radius 8px
      width 200px
      height 220px
      background #FAFAFA

      .text
        line-height 180px
        font-size 120px
        font-weight 700

      .title
        color #fed9d9
        background #D03737
        padding 5px 0
        font-size 16px

  .asddas
    color #999999
</style>
