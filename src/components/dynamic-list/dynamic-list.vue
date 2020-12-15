<template>
  <ul id="dynamic-list">
    <li class="dynamic-item" v-for="(item,index) in list" :key="index">
      <router-link :to="`/user/home?id=${item.user.userId}`" class="avatar img-box">
        <img :src="`${item.user.avatarUrl}?param=80y80`" alt="头像">
      </router-link>
      <div class="content">
        <div class="type">
          <router-link :to="`/user/home?id=${item.user.userId}`" class="author-name">{{ item.user.nickname }}
          </router-link>
          <span>{{ item.typeText }}</span>
        </div>
        <div class="time">{{ item.eventTime | dataFormat }}</div>
        <div class="inner">
          <p class="inner-text">
            {{ item.content.msg }}
          </p>
          <div class="inner-main">
            <template v-if="item.type === 18">
              <div class="inner-music">
                <div class="cover img-box" @click="publicMethods.playMusic(item.content.song.id)" title="播放歌曲">
                  <Icon type="md-arrow-dropright-circle"/>
                  <img :src="item.content.song.album.blurPicUrl+'?param=200y200'" :alt="item.content.song.name">
                </div>
                <div class="info">
                  <router-link class="song-name" :to="`/music/song/${item.content.song.id}`">
                    {{ item.content.song.name }}
                  </router-link>
                  <div class="singer ellipse">
                        <span
                            :key="index"
                            class="text-hv"
                            v-for="(art,index) in (item.content.song.artists)"
                        >
                            <router-link :to="`/music/artist/${art.id}`">{{ art.name }}</router-link>
                            <span v-if="index+1 < item.content.song.artists.length">/</span>
                        </span>
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="item.type === 38">
              <div class="inner-music">
                <a class="cover img-box" :href="item.content.show.url" target="_blank">
                  <img :src="item.content.show.cover" alt="cover">
                </a>
                <div class="info">
                  <a :href="item.content.show.url" target="_blank" class="text-hv">{{ item.content.show.title }}</a>
                </div>
              </div>
            </template>
            <template v-if="item.pics&&item.pics.length">
              <ul class="inner-pics flex flex-wrap">
                <li class="pic img-box" :class="{'pic-s': item.pics.length > 1}" v-for="(pic,index) in item.pics"
                    :key="index">
                  <img :src="pic.pcSquareUrl+'?param=800y800'" alt="pic">
                </li>
              </ul>
              <ul class="pics-list">

              </ul>
            </template>
          </div>
          <div class="dynamic-control">
            <div class="praised" :class="{active: item.info.liked}" @click="jump('like',item.info)">
              <Icon type="md-thumbs-up"/>
              {{ item.info.likedCount }}
            </div>
            <div class="comment" @click="switchCommentId(item.info)">
              <Icon type="ios-chatboxes"/>
              {{ item.info.commentCount }}
            </div>
            <div class="share" @click="$Message.success('分享成功')">
              <Icon type="ios-share-alt"/>
              {{ item.info.shareCount }}
            </div>
          </div>
          <template v-if="commentId === item.info.threadId">
            <div class="comment-box">
              <comment-edit :id="item.info.threadId" type="6"></comment-edit>
              <comment-list
                  :id="item.info.threadId"
                  type="6"
                  :comments="item.info.comments"
                  v-if="item.info.comments"
                  :loading="!item.info.commentsLoad"
              ></comment-list>
            </div>
          </template>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import commentList from '@/components/comment-list/comment-list'
import commentEdit from '@/components/comment-edit/comment-edit'
import {reqDynamicComment, reqLoginState, resourceLike} from "@/api";

export default {
  name: "dynamic-list",
  props: {
    list: Array
  },
  components: {
    commentEdit,
    commentList
  },
  data() {
    return {
      userInfo: '',
      commentId: ''
    }
  },
  methods: {
    jump(e, ...params) {
      if (this.userInfo) {
        this[e](...params)
      } else {
        this.$Message.info('请先登录')
      }
    },
    like(info) {
      if (!info.liked) {
        resourceLike({threadId: info.threadId, type: 6, t: 1})
        info.liked = true
        info.likedCount++
      } else {
        resourceLike({threadId: info.threadId, type: 6, t: 0})
        info.liked = false
        info.likedCount--
      }
    },
    switchCommentId(info) {
      this.commentId = info.threadId === this.commentId ? '' : info.threadId
      if (this.commentId !== '' && !info.comments.length) {
        reqDynamicComment({threadId: this.commentId, limit: 10}).then(res => {
          info.comments = res.hotComments?.length ? res.hotComments : res.comments
          info.commentsLoad = true
        })
      }
    }
  },
  watch: {
    list(value) {
      value.forEach(item => {
        item.info.comments = item.info.comments || []
        switch (item.type) {
          case 18:
            item.typeText = '分享单曲'
            break
          case 19:
            item.typeText = '分享专辑'
            break
          case 17:
            item.typeText = '分享电台节目'
            break
          case 28:
            item.typeText = '分享电台节目'
            break
          case 22:
            item.typeText = '转发'
            break
          case 39:
            item.typeText = '发布视频'
            break
          case 35:
            item.typeText = '分享歌单'
            break
          case 13:
            item.typeText = '分享歌单'
            break
          case 24:
            item.typeText = '分享专栏文章'
            break
          case 41:
            item.typeText = '分享视频'
            break
          case 21:
            item.typeText = '分享视频'
            break
        }
      })
    }
  },
  created() {
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || ''
    if (userInfo) {
      this.userInfo = userInfo
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
$red = #E91E63
$blue = #00a1d6
$blueh = #00b5e5
#dynamic-list
  #comment-list
    box-sizing border-box
    margin-top 20px
    padding 10px

  .dynamic-item
    display flex
    margin-top 30px
    padding 15px
    border-radius 10px
    box-shadow 0 0 8px rgba(0, 0, 0, .1)
    text-align left
    transition all .2s

    .inner-pics
      margin-top 10px

    .pic
      width 400px
      height 400px
      margin 0 3px
      border 1px solid rgba(0, 0, 0, .05)
      border-radius 10px
      overflow hidden
      cursor zoom-in

    .pic-s
      width 200px
      height 200px

    .comment-box
      margin-top 30px
      padding 10px
      border-radius 10px
      box-shadow 0 0 10px rgba(0, 0, 0, .05)

    .dynamic-control
      display flex
      color #888

      i
        font-size 20px

      & > div
        margin-right 20px
        transition all .2s
        cursor pointer

        &:hover, &.active
          color $blue

    .inner-main
      margin 20px 0

    .inner-music
      padding 10px
      display flex
      background-color rgba(0, 0, 0, .05)

      .singer
        font-size 12px
        color #777
        margin-top 10px

      .info
        margin-left 20px

        .song-name
          color #444
          font-size 16px

          &:hover
            color $red

      .cover
        position relative
        width 60px
        height 60px
        cursor: pointer;

        i
          display block
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          margin auto
          font-size 45px
          color rgba(255, 255, 255, .8)
          line-height 60px
          transition all .2s

          &:hover
            color #fff

    .inner
      margin-top 15px

    .type span
      margin-left 10px
      color #888

    .content
      width 100%
      margin-left 15px

    .author-name
      color $blue
      font-size 16px

      &:hover
        color $blueh

    .time
      color #999
      font-size 12px

  .avatar
    flex-shrink 1
    width 50px
    height 50px

</style>