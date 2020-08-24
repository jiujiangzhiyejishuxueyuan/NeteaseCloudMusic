<template>
    <div id="my-music" class="flex container">
        <div class="nav-list">
            <ul class="nav-list-inner">
                <li class="singers" @click="$router.replace(`/my/m/artist`)"
                    :class="{active: $route.name==='my-singer'}">
                    我的歌手(<span class="count">{{subCount.artistCount}}</span>)
                </li>
                <li class="mvs" @click="$router.replace(`/my/m/mv`)" :class="{active: $route.name==='my-mv'}">
                    我的视频(<span class="count">{{vLength}}</span>)
                </li>
                <li class="djs" @click="$router.replace(`/my/m/dj`)" :class="{active: $route.name==='my-dj'}">
                    我的电台(<span class="count">{{subCount.djRadioCount}}</span>)
                </li>
                <li class="playlists create" @click="createdPlaylistShow = !createdPlaylistShow">
                    <svg  v-if="createdPlaylistShow" t="1592901845916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1742" width="12" height="12"><path d="M515.218 872.541l478.947-718.424-957.906 0.01 478.959 718.414z" fill="#040000" fill-opacity=".7" p-id="1743"></path></svg>
                    <svg v-else t="1592901962436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2711" width="12" height="12"><path d="M874.424 513.323L156 34.376l0.01 957.906 718.414-478.959z" fill="#040000" fill-opacity=".7" p-id="2712"></path></svg>
                    创建的歌单(<span class="count">{{subCount.createdPlaylistCount}}</span>)
                </li>
               <playlist-list :playlists="createdPlaylist" is-creator v-if="createdPlaylistShow"/>
                <li class="playlists sub" @click="subPlaylistShow = !subPlaylistShow">
                    <svg  v-if="subPlaylistShow" t="1592901845916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1742" width="12" height="12"><path d="M515.218 872.541l478.947-718.424-957.906 0.01 478.959 718.414z" fill="#040000" fill-opacity=".7" p-id="1743"></path></svg>
                    <svg v-else t="1592901962436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2711" width="12" height="12"><path d="M874.424 513.323L156 34.376l0.01 957.906 718.414-478.959z" fill="#040000" fill-opacity=".7" p-id="2712"></path></svg>
                    收藏的歌单(<span class="count">{{subCount.subPlaylistCount}}</span>)
                </li>
                <playlist-list :playlists="subPlaylist" v-if="subPlaylistShow"/>
            </ul>
        </div>
        <div class="my-music-content">
            <transition name="view">
                <router-view :userId="id"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import {reqLoginState, reqSubMv, reqUserPlaylist, reqUserSubCount} from "@/api";
    import playlistList from '@/views/my-music/my-playlist/playlist-list/playlist-list'
    export default {
        components: {
            playlistList
        },
        data() {
            return {
                subCount: '',
                vLength: 0,
                id: 0,
                createdPlaylist: [],
                subPlaylist: [],
                createdPlaylistShow: true,
                subPlaylistShow: false
            }
        },
        created() {
            reqUserPlaylist(this.id).then(res => {
                res.playlist.forEach(item => {
                    item.creator.userId === this.id ? this.createdPlaylist.push(item) : this.subPlaylist.push(item)
                })
            })
            reqUserSubCount().then(res => {
                this.subCount = res
            })
            reqSubMv(999).then(res => {
                this.vLength = res.count
            })
        },
        beforeRouteEnter(to, from, next) {
            reqLoginState().then(res => {
                if (res.code === 200) {
                    next(vm => vm.id = res.profile.userId)
                }
            }).catch((err) => {
                err.toString()
                next('/music')
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #my-music
        margin-top 70px

        .playlist-detail
            .container
                width inherit
                margin 0

            .header-info, #header-info-ske
                padding 0 0 10px
                .content
                    width 73%
                    margin-left 20px

                .info-inner
                    padding-left 20px
                    .title
                        padding 0
                        h1
                            font-weight normal
                            font-size 22px


                    .img-box, .cover
                        width 210px
                        height 210px
                    @media screen and (max-width: 1550px)
                        .img-box, .cover
                            width 183px
                            height 183px

                        .control
                            opacity 0
                    @media screen and (max-width: 1200px)
                        .img-box, .cover
                            width 175px
                            height 175px

                        .control
                            opacity 0

                .background-blur
                    display none
        .section-header
            text-align left
            padding 3px 0
            position relative
            .title
                font-size 24px
        .my-music-content
            padding-top 30px
            margin-left 255px
            width 1100px

            #my-mv .video-list .img-box
                height 95px
                @media screen and (max-width: 1550px)
                    height 85px
                @media screen and (max-width: 1200px)
                    height 68px
        .nav-list
            position fixed
            top 70px
            height 100vh
            width 250px
            overflow auto
            text-align left
            padding-top 30px
            padding-bottom 80px

            .nav-list-inner
                padding-right 2px
                .playlists:hover
                    background #fff
                &>li
                    font-size 18px
                    font-weight 600
                    cursor pointer
                    color #000
                    padding 7px 0 7px 20px
                    &:hover,&.active
                        background rgba(0,0,0,.05)
            &::-webkit-scrollbar
                width: 8px;
                height: 0;
            &::-webkit-scrollbar-thumb
                border-radius: 10px;
                -webkit-box-shadow: none
                background: rgba(0,0,0,.05);
            &::-webkit-scrollbar-track
                -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
                border-radius: 10px;
                background: transparent;

</style>
