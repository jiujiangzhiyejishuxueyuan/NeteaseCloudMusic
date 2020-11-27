<template>
    <div id="album">
        <div class="album-header" v-if="album">
            <div class="background-blur">
                <img :src="(album.blurPicUrl||album.picUrl)+'?param=140y140'">
            </div>
            <div class="album-header-inner container flex my-card" v-if="album">
              <div class="img-inner">
                <div class="cover header-info-img">
                  <img :src="(album.blurPicUrl||album.picUrl)+'?param=280y280'" alt="">
                </div>
                <div class="album-cover"><img src="../../static/imgs/album-details-cover.png" alt=""></div>
              </div>
              <div class="info flex direction-column justify-between">
                <div class="inner">
                  <h2 class="name">{{ album.name }}{{ album.alias.length ? ` (${album.alias[0]})` : '' }}</h2>
                  <p class="singer">歌手:
                            <router-link :to="`/music/artist/${singer.id}`" v-for="(singer,index) in album.artists"
                                         :key="index">{{singer.name}}
                            </router-link>
                        </p>
                        <p class="pub-time" v-if="album.publishTime">发行时间: {{album.publishTime | dataFormat(0)}}</p>
                        <p class="pub-company" v-if="album.company">发行公司: {{album.company}}</p>
                        <div class="desc-box" v-if="album.description">
                            <p class="desc ellipse" :title="album.description">
                                简介: {{album.description}}
                                <span
                                        class="more"
                                        title="查看更多"
                                        v-if="album.description.length>100"
                                        @click="switchMore"
                                >查看更多
                            </span>
                            </p>
                            <div ref="desc" class="all-desc" v-if="showMore"
                                 v-html="album.description.replace(/\n/g,'<br>')">
                            </div>
                        </div>
                    </div>
                <div class="album-control flex">
                  <div class="button-card active" @click="allPlay">
                    <Icon type="ios-play-outline"/>
                    全部播放
                  </div>
                </div>
              </div>
            </div>
        </div>
      <header-info-ske v-else/>
      <song-list :songs="songs" class="container my-card"/>
      <div class="other-album container my-card">
        <h2 class="title bb">歌手其他专辑</h2>
        <album-list :albums="otherAlbums" is-singer v-if="otherAlbums.length"/>
        <album-ske :row="1" hidden-header v-else/>
      </div>
    </div>
</template>

<script>
    import {reqAlbumDetail, reqSingerAlbum} from "@/api";
    import SongList from "@/components/song-list/song-list";
    import albumList from '@/components/album-list/album-list'
    import HeaderInfoSke from "@/components/header-info-ske/header-info-ske";
    import AlbumSke from "@/components/album-list/album-ske";

    export default {
        name: "album",
        components: {AlbumSke, HeaderInfoSke, SongList, albumList},
        data() {
            return {
                songs: [],
                album: '',
                showMore: false,
                otherAlbums: []
            }
        },
        created() {
            let id = this.$route.params.id
            reqAlbumDetail(id).then(res => {
                this.songs = res.songs
                this.album = res.album
                document.title = res.album.alias.length ? `${res.album.name} (${res.album.alias[0]})-专辑-网易云音乐` : `${res.album.name}-专辑-网易云音乐`
                reqSingerAlbum(res.album.artists[0].id, 5, 0).then(res => {
                    this.otherAlbums = res.hotAlbums
                })
            })

        },
        methods: {
            switchMore() {
                if (!this.showMore) {
                    this.showMore = true
                    setTimeout(() => {
                        window.onclick = (e) => {
                            if (e.target !== this.$refs.desc) {
                                this.showMore = false
                                window.onclick = null
                            }
                        }
                    })
                } else {
                    this.showMore = false
                }
            },
            sub() {

            },
            allPlay() {
                let ids = this.songs.map(item => {
                    return item.id
                })
                this.publicMethods.playMusic(ids)
            },
        },
        inject: ['reload'],
        watch: {
            $route() {
                this.reload()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #album
        text-align left


        .other-album
            margin-top 20px

            & > .title
                font-size 24px

        .album-header
            position relative
            padding 50px 0

            .go-comment
                display none

            .info
                max-width 75%
                margin-left 40px

                .desc-box
                    position relative

                    .desc
                        position relative
                        padding-right 50px

                        .more
                            position absolute
                            color #E91E63
                            cursor pointer
                            right 0

                    .all-desc
                        z-index 22
                        position absolute
                        top 25px
                        width 100%
                        overflow auto
                        padding 5px 20px
                        background #fff
                        box-shadow 0 2px 5px rgba(0, 0, 0, .2)
                        height 200px

                .pub-company, .pub-time, .desc
                    margin-top 10px

                a
                    color #000

                a:hover
                    color #E91E63

                .singer
                    color #666
                    margin-top 20px

                .name
                    font-size 26px

            .img-inner
                position relative
                width 20%

                .album-cover
                    z-index -1
                    width 100%
                    height 100%
                    position absolute
                    top 0
                    left 25px

                    img
                        width 100%
                        height 100%


</style>