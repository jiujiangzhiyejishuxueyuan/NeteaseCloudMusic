<template>
    <div class="singer-inner">
        <div class="songs" v-if="songlist">
            <div class="section-header bb">
                    <span class="title">
                        热门歌曲
                    </span>
                <router-link :to="$route.path+'/song'" class="more" v-if="songlist&&songlist.songs.length>20">
                    查看全部
                </router-link>
            </div>
            <song-list :songlists="songlist&&songlist.songs.slice(0,20) || []"/>
            </div>
            <div class="ske container " v-else>
                <Spin></Spin>
            </div>
            <div class="album" v-if="album">
                <div class="section-header bb">
                    <span class="title">
                        热门专辑
                    </span>
                    <router-link :to="`${$route.path}/album`" class="more" v-if="album.more">查看全部</router-link>
                </div>
                <album :albums="album.hotAlbums"/>
            </div>
            <div class="mv" v-if="mv&&mv.mvs.length">
                <div class="section-header bb">
                    <span class="title">
                        热门MV
                    </span>
                    <router-link :to="`${$route.path}/mv`" class="more" v-if="mv.hasMore">查看全部</router-link>
                </div>
                <mv-list :mvs="mv.mvs"/>
            </div>
            <div class="simiSingers" v-if="simiSingers.length">
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
    import Album from "@/views/home/album/album";
    import MvList from "@/components/mv-list/mv-list";
    import SingerList from "@/components/singer-list/singer-list";
    export default {
        components: {SingerList, MvList, Album, SongList},
        data() {
            return {
                desc: '',
                songlist: '',
                album: '',
                mv: '',
                simiSingers: []
            }
        },
        created() {
            let id = this.$route.params.id
            reqSingerAlbum(id,10,0).then(res => {
                this.album = res
            })
            reqSingerHotSong(id).then(res => {
                this.songlist = res
            })
            reqSingerMv(id,5).then(res => {
                this.mv = res
            })
            reqSingerSimi(id).then(res => {
                this.simiSingers = res.artists && res.artists.slice(0,12) || []
            })
        },
        inject:['reload'],
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
