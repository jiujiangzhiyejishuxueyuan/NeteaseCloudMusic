<template>
  <div class="my-song-list" :class="{isplayer: player}">
    <!--        播放器头-->
    <div class="menu-toolbar flex" v-if="player">
      <div class="button" :class="{active:value.length}" @click="switchPlaylistsShow('top')">
        <Icon type="ios-add-circle-outline"/>
        添加到歌单
        <ul class="playlist-list top" v-if="playlistsShow==='top'">
          <li v-for="(playlist,index) in playlists" :key="index" class="ellipse"
              @click.stop="addToPlaylist(playlist.id)">
            {{ playlist.name }}
          </li>
        </ul>
      </div>
      <div class="button" @click="batchDelete" :class="{active:value.length}">
        <Icon type="ios-trash"/>
        删除
      </div>
    </div>
    <!--        头部-->
    <div class="songlist-header" v-if="showHeader">
      <div class="row flex align-center disable">
        <div @click="allChecked=!allChecked" class="song-check">
          <Icon type="ios-checkmark" v-show="allChecked"/>
        </div>
        <div class="song-index">全选</div>
        <div class="song-name">歌曲</div>
        <div class="singer">歌手</div>
        <div class="album">专辑</div>
      </div>
    </div>
    <!--        内容-->
    <ul class="songlist-ske" v-if="!songs.length&&!player">
      <li class="song flex justify-between align-center" v-for="index in 10" :key="index">
        <div class="song-name"></div>
        <div class="song-singer"></div>
        <div class="song-album"></div>
      </li>
    </ul>
    <div class="songlist-inner" v-else>
      <div class="scroll">
        <div :class="{active:song.id===pid}"
             :key="index"
             class="row flex align-center"
             v-for="(song,index) in songs"
        >
          <div @click="check(song)" class="song-check">
            <Icon type="ios-checkmark" v-show="value.indexOf(song.id)!==-1"/>
          </div>
          <div class="song-on" v-if="isplay&&song.id===pid">
          </div>
          <div class="song-index" v-else>
            {{ index + 1 }}
          </div>
          <div class="play" v-if="!isplay||song.id!==pid">
            <Icon @click="playmusic(song.id)" type="ios-play-outline"/>
          </div>
          <!--歌名-->
          <div class="song-name">
            <router-link :to="`/music/song/${song.id}`" v-if="!player">{{ song.name }}</router-link>
            <a :href="`/music/song/${song.id}`" target="_blank" v-else>{{ song.name }}</a>
          </div>
          <!--歌手-->
          <div class="singer ellipse">
                        <span

                            :key="index"
                            class="text-hv"
                            v-for="(art,index) in (song.ar || song.artists)"
                        >
                            <router-link :to="`/music/artist/${art.id}`" v-if="!player">{{ art.name }}</router-link>
                            <a :href="`/music/artist/${art.id}`" target="_blank" v-else>{{ art.name }}</a>
                            <span v-if="index+1<(song.ar || song.artists).length">/</span>
                        </span>
          </div>
          <!--专辑-->
          <div class="album text-hv ellipse">
            <router-link
                class="text-hv"
                :to="`/music/album/${song.al?song.al.id:song.album.id}`"
                v-if="!player"
            >
              《{{ (song.al || song.album).name }}》
            </router-link>
            <a target="_blank" :href="`/music/album/${song.al?song.al.id:song.album.id}`" v-else>《{{
                (song.al
                    || song.album).name
              }}》</a>
          </div>
          <div class="song-control-box">
            <song-control
                :btns="btns"
                :id="song.id"
                :like-ids="likeIds"
                @ondelete="deleteOne"
            />
          </div>

        </div>
      </div>
    </div>
    <!--        底部-->
    <div class="songlist-foot" v-if="showFooter">
      <div class="row flex align-center disable">
        <div @click="allChecked=!allChecked" class="song-check">
          <Icon type="ios-checkmark" v-show="allChecked"/>
        </div>
        <div class="song-index">全选</div>
        <div class="button-card" :class="{active:value.length}" @click="playmusic(value)">
          <Icon type="ios-play-outline"/>
          播放选中歌曲
        </div>
        <div class="button-card relative" :class="{active:value.length}" @click="switchPlaylistsShow('bottom')">
          <Icon type="md-add"/>
          添加到
          <ul class="playlist-list playlist-list-bottom" v-if="playlistsShow==='bottom'">
            <li v-for="(playlist,index) in playlists" :key="index" class="ellipse"
                @click.stop="addToPlaylist(playlist.id)">
              {{ playlist.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songControl from '@/components/song-control/song-control'
import {changeplaylistSong, reqLikeSong, reqLoginState, reqUserPlaylist} from "@/api";

export default {
  props: {
    songs: Array,
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    player: Boolean,
    pid: Number,
    isplay: Boolean,
    btns: {
      type: Array,
      default: () => [
        {
          icon: 'ios-play',
          event: 'onplay',
          title: '播放'
        },
        {
          icon: 'md-heart-outline',
          event: 'onlove',
          title: '喜欢'
        },
        {
          icon: 'ios-add',
          event: 'onadd',
          title: '添加到'
        }
      ],
    }
  },
  data() {
    return {
      value: [],
      likeIds: [],
      hv: '',
      playlists: [],
      playlistsShow: false,
    }
  },
  components: {
    songControl
  },
  created() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || ''
    if (userInfo) {
      reqLikeSong(userInfo.userId).then(res => {
        this.likeIds = res.ids
      })
      reqUserPlaylist(userInfo.userId).then(res => {
        this.playlists = res.playlist.filter(item => {
          return !item.subscribed
        })
      })
    }
  },
  methods: {
    // 歌曲删除键
    deleteOne(id) {
      this.$emit('ondelete', id)
      let index = this.value.indexOf(id)
      if (index !== -1) {
        this.value.splice(index, 1)
      }
    },
    // 批量删除键
    batchDelete() {
      if (this.value.length) {
        this.$emit('batchDelete')
        this.value = []
      }

    },
    check(song) {
      let index = this.value.indexOf(song.id)
      index !== -1 ? this.value.splice(index, 1) : this.value.push(song.id)
    },
    playmusic(ids) {
      if (ids.length === 0) {
        this.$Message.error('请选中歌曲')
      } else if (!this.player) {
        this.publicMethods.playMusic(ids, this.$Message)
      } else {
        this.$emit('play', ids)
      }
    },
    addToPlaylist(pid) {
      changeplaylistSong(pid, 'add', this.value.join(',')).then(res => {
        if (res.code === 200) {
          this.$Message.success('添加到歌单成功')
          this.value = []
        } else if (res.code === 502) {
          this.$Message.info('歌单歌曲重复')
        } else {
          this.$Message.error('操作失败')
        }
      })
    },
    switchPlaylistsShow(type) {
      if (this.playlistsShow) {
        this.playlistsShow = false
      } else if (this.value.length) {
        this.playlistsShow = type
        setTimeout(() => {
          window.onclick = () => {
            this.playlistsShow = false
            window.onclick = null
          }
        })
      }
    }
  },
  computed: {
    allChecked: {
      set(value) {
        if (value) {
          this.songs.forEach(item => {
            if (this.value.indexOf(item.id) === -1) {
              this.value.push(item.id)
            }
          })
        } else {
          this.value = []
        }

      },
      get() {
        if (this.value.length) {
          return this.value.length === this.songs.length
        }
        return false
      }
    },
  },
  watch: {
    value(value) {
      this.$emit('checked', value)
      if (!value.length) {
        this.playlistsShow = false
      }
    },
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$red = #e91e63
.my-song-list
  padding-top 65px
  position relative
  height 100%

  &.isplayer
    padding-top 110px

    .songlist-header
      top 45px

    .song-check
      color #fff !important
      border-color rgba(255, 255, 255, .8) !important

  .button-card
    margin-right 10px

  .songlist-ske
    .song
      border-radius 15px
      overflow hidden
      height 50px
      margin 15px 0
      padding 0 20px

      .song-name, .song-singer, .song-album
        animation ske .8s linear infinite alternate
        background rgba(0, 0, 0, .05)
        height 50%

      .song-singer
        width 20%

      .song-album
        width 15%

      .song-name
        width 40%

  .playlist-list
    z-index 11
    position absolute
    transform translateX(-100%)
    left 0
    text-align left
    box-shadow 0 5px 8px rgba(0, 0, 0, .5)

    &.playlist-list-bottom
      width 150px
      transform none
      margin-left 100px
      right 0
      bottom 0
      background #ffffff
      color #333333

    li
      padding 5px 10px

      &:hover
        color #fff
        background #E91E63

  .menu-toolbar
    color #fff
    position absolute
    top 0
    left 0
    line-height 35px
    height 35px


    .button
      border-color #fff
      margin-right 20px

  .songlist-inner
    height 100%
    overflow auto

  /*滚动条整体样式*/

  .songlist-inner::-webkit-scrollbar
    width: 8px;
    height: 0;

  /*滚动条滑块*/

  .songlist-inner::-webkit-scrollbar-thumb
    border-radius: 10px;
    -webkit-box-shadow: none
    background: rgba(255, 255, 255, 0.2);

  /*滚动条轨道*/

  .songlist-inner::-webkit-scrollbar-track
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background: transparent;

  .songlist-header
    position absolute
    top 0
    left 0
    width 100%

  .button
    padding 0 18px
    margin-right 20px

  .songlist-foot .song-index,
  .songlist-header .row
    font-size 12px
    color #999

  .songlist-foot .row, .songlist-header .row
    &:hover
      .song-index
        display block

      .play
        display none

  .row
    position relative
    box-sizing content-box
    height 33px
    text-align left
    line-height 35px
    padding 16px 20px

    &.disable
      .hv
        background #fff !important

      &:hover
        background transparent !important

    &.active
      color #E91E63 !important

      a
        color #E91E63 !important

    a
      color #333

      &:hover
        color $red !important

    &:hover
      background #F2F2F2

      .song-control
        opacity 1

      .song-index
        display none

      .play
        display block

    .song-check
      cursor pointer
      position relative
      width 16px
      height 16px
      border 1px solid #666

      i
        font-size: 20px
        font-weight 800
        position absolute
        left -2px
        top -2px

    .play,
    .song-on,
    .song-index
      text-align center
      width 6%
      min-width 35px

    .song-on
      height 100%
      background url("../../static/imgs/isplay.gif") no-repeat center

    .play
      font-size 20px
      display none

      i:hover
        cursor pointer
        color $red

    .song-name
      width 40%

    .singer
      width 20%

    .album
      width 15%

    .song-control-box
      height 100%
      width 18%

      .song-control
        position absolute
        right 20px

</style>
