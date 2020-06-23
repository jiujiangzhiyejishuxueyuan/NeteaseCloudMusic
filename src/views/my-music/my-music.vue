<template>
    <div id="my-music" class="flex container">
        <div class="nav-list">
            <ul class="nav-list-inner">
                <li class="singers" @click="$router.replace(`/my/artist`)" :class="{active: $route.name==='my-singer'}">
                    我的歌手(<span class="count">{{subCount.artistCount}}</span>)
                </li>
                <li class="mvs" @click="$router.replace(`/my/mv`)" :class="{active: $route.name==='my-mv'}">
                    我的视频(<span class="count">{{vLength}}</span>)
                </li>
                <li class="djs" @click="$router.replace(`/my/dj`)" :class="{active: $route.name==='my-dj'}">
                    我的电台(<span class="count">{{subCount.djRadioCount}}</span>)
                </li>
                <li class="playlists create">
                    <svg t="1592901845916" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1742" width="12" height="12"><path d="M515.218 872.541l478.947-718.424-957.906 0.01 478.959 718.414z" fill="#040000" fill-opacity=".7" p-id="1743"></path></svg>
                    创建的歌单(<span class="count">{{subCount.createdPlaylistCount}}</span>)
                </li>
               <playlist-list :playlists="createdPlaylist" is-creator/>
                <li class="playlists sub">
                    <svg t="1592901962436" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2711" width="12" height="12"><path d="M874.424 513.323L156 34.376l0.01 957.906 718.414-478.959z" fill="#040000" fill-opacity=".7" p-id="2712"></path></svg>
                    收藏的歌单(<span class="count">{{subCount.subPlaylistCount}}</span>)
                </li>
            </ul>
        </div>
        <div class="my-music-content">
            <router-view :userId="id"></router-view>
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
                subPlaylist: []
            }
        },
        created() {
            reqLoginState().then(res => {
                this.id = res.profile.userId
                reqUserPlaylist(this.id).then(res => {
                    res.playlist.forEach(item => {
                        item.creator.userId === this.id ? this.createdPlaylist.push(item) : this.subPlaylist.push(item)
                    })
                })
            })
            reqUserSubCount().then(res => {
                this.subCount = res
            })
            reqSubMv(999).then(res => {
                this.vLength = res.count
            })

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #my-music
        margin-top 70px
        .section-header
            text-align left
            padding 3px 0
            position relative
            .title
                font-size 24px
        .my-music-content
            padding-top 30px
            margin-left 310px
            width 1000px
        .nav-list
            position fixed
            top 70px
            height 100vh
            width 300px
            overflow auto
            text-align left

            .nav-list-inner
                margin-top 30px
                .playlists:hover
                    background #fff
                &>li
                    font-size 16px
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
        .wocao
            color #000

</style>
