<template>
  <div class="singer-inner">
    <!--            热门歌曲-->
    <div class="songs my-card" v-if="!noSong">
      <div class="section-header bb">
                <span class="title">
                    热门歌曲
                </span>
        <router-link :to="$route.path+'/song'" class="more" v-if="songlist.length>20">
          查看全部
        </router-link>
      </div>
      <song-list :songs="songlist.length&&songlist.slice(0,20) || []"/>
    </div>
    <!--        热门专辑-->
    <div class="album my-card" v-if="album">
      <div class="section-header bb">
                <span class="title">
                    热门专辑
                </span>
        <router-link :to="`${$route.path}/album`" class="more" v-if="album.more">查看全部</router-link>
      </div>
      <album :albums="album.hotAlbums"/>
    </div>
    <!--        热门mv-->
    <div class="mv my-card" v-if="mv&&mv.mvs.length">
      <div class="section-header bb">
                <span class="title">
                    热门MV
                </span>
        <router-link :to="`${$route.path}/mv`" class="more" v-if="mv.hasMore">查看全部</router-link>
      </div>
      <mv-list :mvs="mv.mvs"/>
    </div>
    <!--        相似艺人-->
    <div class="simiSingers my-card" v-if="simiSingers.length">
      <div class="section-header bb">
                <span class="title">
                    相似艺人
                </span>
      </div>
      <singer-list :singers="simiSingers"/>
    </div>
  </div>
</template>

<script>
import {reqSingerAlbum, reqSingerHotSong, reqSingerMv, reqSingerSimi} from "@/api";
import SongList from "@/components/song-list/song-list";
import Album from "@/components/album-list/album-list";
import MvList from "@/components/mv-list/mv-list";
import SingerList from "@/components/singer-list/singer-list";

export default {
  components: {SingerList, MvList, Album, SongList},
  data() {
    return {
      desc: '',
      songlist: [],
      album: '',
      mv: '',
      simiSingers: [],
      noSong: false
    }
  },
  created() {
    let id = this.$route.params.id
    reqSingerAlbum(id, 10, 0).then(res => {
      this.album = res
    })
    reqSingerHotSong(id).then(res => {
      this.songlist = res.songs
      if (!res.songs.length) {
        this.noSong = true
      }
    })
    reqSingerMv(id, 5, 0).then(res => {
      this.mv = res
    })
    reqSingerSimi(id).then(res => {
      this.simiSingers = res.artists && res.artists.slice(0, 12) || []
    })
  },
  inject: ['reload'],
  watch: {
    $route() {
      this.reload()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$blue = #00a1d6
#singer
  .singer-inner
    margin-top 20px
    .my-card
      margin 20px auto

    .mv-list
      margin-top 20px

    .new-album-items
      margin-top 20px

    .section-header
      margin-top 20px
      text-align left
      padding 3px 0
      position relative

      .title
        font-size 18px
        font-weight 600

      .more
        position absolute
        bottom 3px
        right 0

        &:hover
          color $blue

</style>
