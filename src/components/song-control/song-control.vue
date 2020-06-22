<template>
    <div class="song-control flex align-center justify-end" :class="{active: showAdd}" >
        <span class="item" @click="click(item.event,id)" v-for="(item,index) in btns" :key="index">
            <Icon type="md-heart" v-if="item.event==='onlove'&&like"/>
            <Icon :type="item.icon"  v-else/>
        </span>
        <add-song-plsylist v-if="showAdd" @close="addClose" :id="id" />
    </div>
</template>

<script>
    import addSongPlsylist from '@/components/addSong-playlist/addSong-playlist'
    import {changeplaylistSong, likeSong, reqUserPlaylist} from "@/api";
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
                        event: 'onplay'
                    },
                    {
                        icon: 'md-heart-outline',
                        event: 'onlove'
                    },
                    {
                        icon: 'ios-add',
                        event: 'onadd'
                    }
                ]
            }
        },
        components: {
            addSongPlsylist
        },
        data() {
            return {
                showAdd: false
            }
        },
        methods: {
            click(type,id) {
                this.$emit(type,id)
                this[type] && this[type](id)
            },
            onadd(id) {
                this.showAdd = true
            },
            addClose() {
                this.showAdd = false
            },
            onlove(id) {
                this.like = !this.like
            },
            onplay(id) {
                console.log(id)
                let musics = JSON.parse(window.localStorage.getItem('musics')) || {}
                musics = musics.ids || []
                let index = musics.indexOf(id)
                if(index!==-1) {
                    musics.splice(index,1)
                }
                musics.unshift(id)
                musics = {
                    ids: musics,
                    type: 'add',
                    index
                }
                window.localStorage.setItem('musics',JSON.stringify(musics))
                setTimeout(()=> {
                    this.isplayer()
                },100)
            },
            isplayer() {
                let state = JSON.parse(window.localStorage.getItem('musics')).state
                if(state) {
                    this.$Message.success('添加到播放器成功')
                } else {
                    window.open('/music/player/audio')
                }
            }
        },
        computed: {
            ...mapState(['userInfo']),
            like: {
                get() {
                    return this.likeIds.includes(this.id)
                },
                set(value) {
                    if(value) {
                        likeSong(this.id,true).then(res => {
                            this.$Message.success('添加到我喜欢的音乐成功')
                            this.likeIds.push(this.id)
                        }).catch(error => this.$Message.error('添加失败'))
                    } else {
                        likeSong(this.id,false).then(res => {
                            this.$Message.success('取消喜欢成功')
                            this.likeIds.splice(this.likeIds.indexOf(this.id),1)
                        }).catch(error => this.$Message.error('取消失败'))
                    }
                }
            }
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
        .item
            display block
            width 35px
            height 35px
            border-radius 50%
            margin-right 5px
            transition all .2s
            cursor pointer
            &:hover
                background rgba(0,0,0,.1)
</style>
