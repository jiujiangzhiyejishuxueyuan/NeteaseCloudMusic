<template>
    <div class="song-control flex align-center justify-end" :class="{active: playlistsShow}">
        <span class="item" @click="click(item.event,id)" v-for="(item,index) in btns" :key="index">
            <Icon type="md-heart" v-if="item.event==='onlove'&&like" title="取消喜欢"/>
            <Icon :type="item.icon" v-else :title="item.title"/>
        </span>
        <!--        <add-song-plsylist v-if="showAdd" @close="addClose" :id="id" />-->
        <ul class="playlist-list" v-if="playlistsShow">
            <li v-for="(playlist,index) in playlists" :key="index" class="ellipse"
                @click.stop="addToPlaylist(playlist.id)">
                {{playlist.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import addSongPlsylist from '@/components/addSong-playlist/addSong-playlist'
    import {changeplaylistSong, likeSong, reqLoginState, reqUserPlaylist} from "@/api";
    import {mapState} from 'vuex'
    export default {
        props: {
            id: Number,
            likeIds: Array,
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
                ]
            }
        },
        components: {

        },
        data() {
            return {
                playlistsShow: false,
                playlists: [],
                userInfo: ''
            }
        },
        methods: {
            addToPlaylist(pid) {
                changeplaylistSong(pid, 'add', this.id).then(res => {
                    if (res.code === 200) {
                        this.$Message.success('添加到歌单成功')
                        this.playlistsShow = false
                    } else if (res.code === 502) {
                        this.$Message.info('歌单歌曲重复')
                    } else {
                        this.$Message.error('操作失败')
                    }
                })
            },
            click(type, id) {
                this.$emit(type, id)
                this[type] && this[type](id)
            },
            onadd() {
                if (this.userInfo) {
                    this.playlistsShow = true
                    reqUserPlaylist(this.userInfo.userId).then(res => {
                        this.playlists = res.playlist.filter(item => {
                            return !item.subscribed
                        })
                    })
                    setTimeout(() => {
                        window.onclick = () => {
                            this.playlistsShow = false
                            window.onclick = null
                        }
                    })
                } else {
                    this.$Message.info('请先登录')
                }
            },
            onlove(id) {
                if (this.userInfo) {
                    this.like = !this.like
                } else {
                    this.$Message.info('请先登录')
                }
            },
            onplay(id) {
                this.publicMethods.playMusic(id)
            }
        },
        computed: {
            like: {
                get() {
                    return this.likeIds.includes(this.id)
                },
                set(value) {
                    if(value) {
                        likeSong(this.id, true).then(res => {
                            this.$Message.success('添加到我喜欢的音乐成功')
                            this.likeIds.push(this.id)
                        }).catch(error => this.$Message.error('喜欢失败'))
                    } else {
                        likeSong(this.id, false).then(res => {
                            this.$Message.success('取消喜欢成功')
                            this.likeIds.splice(this.likeIds.indexOf(this.id), 1)
                        }).catch(error => this.$Message.error('取消喜欢失败'))
                    }
                }
            }
        },
        created() {
            reqLoginState().then(res => {
                this.userInfo = res.profile
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .song-control
        text-align center
        line-height 35px
        opacity 0
        font-size 20px
        position relative

        &.active
            opacity 1

        .ivu-icon-md-heart
            color #E91E63

        .playlist-list
            z-index 11
            position absolute
            transform translateX(-100%)
            left 0
            text-align left
            background #ffffff
            color #333
            font-size 14px
            box-shadow 0 3px 5px rgba(0,0,0,.3)

            li
                cursor pointer
                padding 5px 10px

                &:hover
                    color #fff
                    background #E91E63

        .item
            display block
            width 35px
            height 35px
            border-radius 50%
            margin-right 5px
            transition all .2s
            cursor pointer

            &:hover
                background rgba(0, 0, 0, .1)
</style>
