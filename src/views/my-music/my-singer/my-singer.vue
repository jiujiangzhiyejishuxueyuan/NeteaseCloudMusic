<template>
  <div class="my-singer">
    <div class="section-header bb">
      <span class="title">我的歌手(<span class="count">{{ singers.count }}</span>)</span>
    </div>
    <ul class="my-singer-list flex flex-wrap">
      <li class="singer" v-for="(singer,index) in singers.data" :key="index">
        <div class="inner flex">
          <div class="avatar img-box">
            <router-link :to="`/music/artist/${singer.id}`">
              <img :src="singer.picUrl+'?param=100y100'" alt="" :title="singer.name">
            </router-link>
          </div>
          <div class="info">
            <p class="name">
              <router-link :to="`/music/artist/${singer.id}`">{{ singer.name }}</router-link>
              <span class="alialse">{{ singer.alias[0] }}</span>
            </p>
            <p class="count">
              <router-link class="album" :to="`/music/artist/${singer.id}/album`">{{ singer.albumSize }}个专辑
              </router-link>
              <router-link :to="`/music/artist/${singer.id}/mv`" class="mv">{{ singer.mvSize }}个mv</router-link>
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {reqSubSinger} from "@/api";

export default {
  data() {
    return {
      singers: ''
    }
  },
  created() {
    reqSubSinger().then(res => {
      this.singers = res
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
$blue = #00a1d6
.my-singer
  .my-singer-list
    .info
      padding 10px 0
      text-align left
      margin-left 10px

      .album
        margin-right 20px

      .name
        margin-bottom 10px
        font-weight 600
        font-size 15px

        .alialse
          color #999
          font-size 12px
          margin-left 8px

        a:hover
          color $blue

    .singer
      padding 5px
      width 50%

      .inner
        padding 15px
        border-radius 10px
        box-shadow 0 0 10px rgba(0,0,0,.1)
        &:hover
          background rgba(0, 0, 0, .02)
      .count
        a:hover
          color #00b5e5



  .avatar
    width 80px
    height 80px

</style>
