<template>
  <div class="playlist-detail">
    <div class="header-info" v-if="songlist">
      <div class="background-blur">
        <img :src="songlist.coverImgUrl+'?param=200y200'">
      </div>
      <div class="info-inner flex container my-card">
        <div class="img-box header-info-img">
          <img :src="songlist.coverImgUrl+'?param=500y500'" v-if="songlist.coverImgUrl">
        </div>
        <div class="content flex direction-column justify-between" v-if="songlist.creator">
          <div class="title ">
            <h1 class="ellipse" :title="songlist.name">{{ songlist.name }}</h1>
          </div>
          <div class="user-name flex">
            <div class="avatar">
              <img :src="songlist.creator.avatarUrl+'?param=50y50'">
            </div>
            <router-link :to="`/user/home?id=${songlist.creator.userId}`" title="查看主页">
              {{ songlist.creator.nickname }}
            </router-link>
            <div class="createTime">{{ songlist.createTime | dataFormat(0) }} 创建</div>
          </div>
          <div class="playcount">
            <span>播放量:</span>
            {{ songlist.playCount | playCount }}
          </div>
          <div class="tags">
            <span>标签:</span>
            <template v-if="songlist.tags.length">
              <router-link :to="`/music/playlist?cat=${tag}`" v-for="(tag,index) in songlist.tags"
                           :key="index">{{ tag }}
              </router-link>
            </template>
            <template v-else> 暂无</template>
          </div>
          <div class="brief ellipse" :title="songlist.description">
            <span>简介:</span>
            {{ songlist.description || '暂无' }}
          </div>
          <playlist-control
              @allPlay="allPlay"
              @sub="sub"
              @scrollToComment="scrollToComment"
              :subed="subed"
          />
        </div>
      </div>
    </div>
    <header-info-ske v-else/>
    <div class="playlist-box">
      <div class="container my-card">
        <div class="playlist-inner">
          <div class="inner-title bb">
            <span class="title">歌曲列表</span>
            <span class="song-count">{{ songlist.trackCount }}首歌</span>
            <div class="play-count">
              播放: <span class="count">{{ songlist.playCount }} </span>次
            </div>
          </div>
          <song-list :songs="songs"/>
        </div>
        <Page
            :total="songlist.trackCount"
            :page-size="20"
            @on-change="(page)=>$router.replace(`${$route.path}?id=${songlist.id}&page=${page}`)"
            :current="parseInt($route.query.page)||1"
            v-if="songlist.trackCount>20"
        />
      </div>
    </div>

    <div class="playlist-comments container my-card" v-if="songlist">
      <div class="comment-count">
        {{ comment && comment.total }} 评论
      </div>
      <div class="comment-header flex" ref="comment">
        <a class="sort" :class="{active:hotComments}" @click="hotComments = true"
           v-if="c.length">最热评论</a>
        <a class="sort" :class="{active:!hotComments}" @click="hotComments = false">最新评论</a>
      </div>
      <comment-edit :id="songlist.id.toString()" type="2" class="input"/>
      <comment-list
          :id="songlist.id.toString()"
          type="2"
          :comments="hotComments ? c : comment.comments"
          :loading="!comment.code"
      />
      <Page
          class="comment"
          :total="comment.total"
          :page-size="commentLimit"
          @on-change="nextComment"
          v-if="comment&&!hotComments&&comment.total>20"
      />
    </div>

  </div>
</template>

<script>
import songList from '@/components/song-list/song-list'
import playlistControl from '@/components/playlist-control/playlist-control'
import {reqPlaylistComments, reqSongDetail, reqPlatlistDetail, subPlaylist, reqLoginState} from "@/api";
import CommentList from "@/components/comment-list/comment-list";
import CommentEdit from "@/components/comment-edit/comment-edit";
import HeaderInfoSke from "@/components/header-info-ske/header-info-ske";

export default {
  components: {
    HeaderInfoSke,
    CommentEdit,
    CommentList,
    songList,
    playlistControl
  },
  data() {
    return {
      songlist: '',
      songs: [],
      hotComments: true,
      comment: {comments: []},
      commentLimit: 20,
      c: [],
      subed: false,
      userInfo: ''
    }
  },
  methods: {
    allPlay() {
      const ids = this.songlist.trackIds.map(item => {
        return item.id
      })
      this.publicMethods.playMusic(ids)
    },
    sub() {
      if (this.userInfo) {
        subPlaylist(this.songlist.id, this.subed ? 2 : 1).then(res => {
          if (res.code === 200) {
            this.subed = !this.subed
            this.$Message.success('收藏成功')
          } else {
            this.$Message.error('操作失败')
          }
        })
      } else {
        this.$Message.info('请先登录')
      }
    },
    scrollToComment() {
      window.scrollTo(0, (this.$refs.comment.getBoundingClientRect().top + window.scrollY))
    },
    nextComment(page) {
      let id = this.$route.params.id || this.$route.query.id
      let offset = this.commentLimit * (page - 1)
      this.comment.comments = []
      this.comment.code = 0
      this.scrollToComment()
      reqPlaylistComments(id, this.commentLimit, offset).then(res => {
        this.comment = res
        if (!res.hotComments) {
          this.hotComments = false
        }

      })
    },
    render() {
      const page = this.$route.query.page || 1
      let id = this.$route.params.id || this.$route.query.id
      reqPlaylistComments(id, this.commentLimit, 0).then(res => {
        this.comment = res
        if (res.hotComments && res.hotComments.length) {
          this.c = res.hotComments
        } else {
          this.hotComments = false
        }

      })
      reqPlatlistDetail(id).then(res => {
        this.songlist = res.playlist
        this.subed = res.playlist.subscribed
        document.title = res.playlist.name + '-歌单-阿立音乐'
        let ids = []
        let startCount = (page - 1) * 20
        let residue = res.playlist.trackCount - startCount
        residue = residue >= 20 ? 20 : residue
        for (let i = 0; i < residue; i++) {
          ids.push(res.playlist.trackIds[i + startCount].id)
        }

        if (ids.length) {
          reqSongDetail(ids.join(',')).then(res => {
            this.songs = res.songs
          }).catch(() => this.$Message.error('获取歌曲列表失败'))
        } else {
          this.$Message.error('获取歌曲列表失败')
          this.$router.replace({name: '404'})
        }
      }).catch(() => {
        this.$router.replace({name: '404'})
      })

    }
  },
  created() {
    reqLoginState().then(res => {
      this.userInfo = res.profile
    }).catch(err => {
      err.toString()
    })
    this.render()
  },
  watch: {
    $route() {
      this.songlist = ''
      this.songs = []
      this.render()
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$blue = #00a1d6
$red = #e91e63
.playlist-detail
  .playlist-comments
    text-align left
    margin-top 50px

    .no-comments
      padding 20px 0 40px
      text-align center
      font-size 16px

    .comment-edit
      margin-bottom 20px

    .comment-count
      font-size 18px
      margin-bottom 20px


  .header-info
    position relative
    padding 50px 0

    .img-box > img
      cursor auto

    .content
      text-align left
      margin-left 50px
      color #000
      width 75%

      .playlist-control
        margin-top 15px


      .title
        padding 0 0 20px

      .user-name
        font-size 18px
        color #666
        line-height 25px

        .avatar
          width 25px
          height 25px
          border-radius 50%
          overflow hidden

          img
            display block
            width 100%

        .createTime
          margin-left 20px
          font-size 13px

        a

          font-size 14px
          color #666
          margin-left 5px

          &:hover
            color $red

      .playcount
        margin-top 20px

        span
          margin-right 5px

      .tags, .brief
        margin-top 10px

        span
          margin-right 10px

        a
          margin-right 10px

          &:hover
            color $red

  .playlist-box
    background #fff

    .inner-title
      padding 5px 20px
      text-align left
      position relative

      .title
        font-size 16px

      .play-count
        position absolute
        right 0
        bottom 5px
        font-size 14px

        .count
          color $blue

      .song-count
        color #999
        margin-left 20px
        font-size 12px
</style>
