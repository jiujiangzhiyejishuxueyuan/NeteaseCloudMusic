<template>
    <div>
        <div class="songlist-main">
            <div class="container hidden">
                <div class="songlist-title flex justify-between">
                    <div class="type">
                        <h1>全部歌单</h1>
                    </div>
                </div>
                <div class="songlist-inner">
                    <ul class="flex flex-wrap">
                        <li v-for="(playlist,index) in songlists.playlists" :key="index">
                            <div class="content img-scale-hover">
                                <div class="cover relative">
                                    <div class="img-box img-scale ">
                                        <img :src="playlist.coverImgUrl">
                                    </div>
                                    <div class="btn-play absolute-center">
                                        <img src="../../static/imgs/btn-play.png" alt="">
                                    </div>
                                </div>
                                <div class="info ellipse ">
                                    <a class="text-hv">{{playlist.name}}</a>
                                </div>
                                <div class="play-count">
                                    <Icon type="ios-headset" />
                                    {{playlist.playCount | playCount}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Page :total="songlists.total" />
            </div>
        </div>
    </div>
</template>

<script>
    import {reqSonglist} from "@/api";

    export default {
        checkMore(index) {
            if(index==this.showMoreTag&&this.showMore) {
                this.showMore = false
            } else {
                this.showMore = true
                this.showMoreTag = index
                this.moreTags = this.tags[index].more
            }
        },
        recursionSonglist(lastTime) {
            let page = this.$route.query.page
            let multiple = Math.floor(page/4)
            reqSonglist(100,lastTime,this.cat).then(res => {
                lastTime = res.lasttime
                this.recursionCount++
                if(this.recursionCount==multiple) {
                    if(page%4) {
                        reqSonglist(page%4*25,lastTime,this.cat).then(res => {
                            res.playlists = res.playlists.slice((page%4-1)*25)
                            this.songlists = res
                        })
                    } else {
                        res.playlists = res.playlists.slice(-25)
                        this.songlists = res
                    }
                } else {
                    this.recursionSonglist(res.lasttime)
                }

            })
        },
        render(page) {
            page = page || this.$route.query.page || 1
            this.recursionCount = 0
            if(page<5) {
                reqSonglist(page*25,0,this.cat).then(res => {
                    res.playlists = res.playlists.slice((page-1)*25)
                    this.songlists = res
                })
            } else {
                this.recursionSonglist(0,this.cat)
            }

        },
        changePage(page) {
            this.$router.replace(`/music/playlist?page=${page}&cat=${this.cat}`)
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
