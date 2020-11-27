<template>
  <ul class="lyric-list my-song-list">
    <li class="lyric-item" :class="{bg:!(index%2)}" v-for="(song,index) in songs" :key="index">
      <div class="row flex align-center">
        <div class="song-index">
          {{ index + 1 }}
        </div>
        <div class="play">
          <Icon type="ios-play-outline" @click="play(song.id)"/>
        </div>

        <div class="song-name">
          <a :href="`/music/song/${song.id}`" class="text-hv" target="_blank">{{ song.name }}</a>
        </div>
        <div class="singer ellipse">
          <a target="_blank" :href="`/music/artist/${art.id}`" v-for="(art,index) in (song.ar || song.artists)"
             :key="index" class="text-hv">
            {{ art.name }}
            <span v-if="index+1<(song.ar || song.artists).length">/</span>
          </a>
        </div>

        <div class="album text-hv ellipse">
          <a :href="`/music/album/${song.al && song.al.id || song.album && song.album.id}`" class="text-hv"
             target="_blank">《{{ (song.al || song.album).name }}》</a>
        </div>
        <song-control
            :id="song.id"
        />
      </div>
      <div class="lyric-box">
        <div class="lyric" :class="{on:song.lyrics.show}">
          <p v-for="(txt,index) in song.lyrics.txt" :key="index" v-html="txt"></p>
        </div>
        <a class="more text-hv" @click="song.lyrics.show = !song.lyrics.show">展开</a>
      </div>
    </li>
  </ul>
</template>

<script>
import songControl from '@/components/song-control/song-control'

export default {
  props: {
    songs: Array
  },
  components: {
    songControl
  },
  data() {
    return {
      lyrics: []
    }
  },
  methods: {
    render() {
      this.songs.forEach((item, index) => {
        item.lyrics.range.forEach(num => {
          item.lyrics.txt = item.lyrics.txt.replace('周杰伦', `<font color=#e91e63>周杰伦</font>`)
        })
        let lyric = {
          txt: item.lyrics.txt.split("\n"),
          show: false
        }
        this.songs[index].lyrics = lyric
      })
    },
    play(id) {
      this.publicMethods.playMusic(id)
    }
  },
  created() {
    this.render()
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.lyric-list
  padding-top 0

  .lyric-item
    &.bg
      background rgba(0, 0, 0, .1)

  .lyric-box
    padding 20px 50px
    position relative

    .more
      position absolute
      top 200px
      left 50%

  .lyric
    max-height 210px
    overflow hidden
    text-align left

    &.on
      max-height none
</style>
