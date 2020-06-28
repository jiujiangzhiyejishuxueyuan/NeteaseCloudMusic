<template>
    <div class="my-song-list">
        <div class="songlist-header" v-if="showHeader">
            <div class="row flex align-center disable">
                <div class="song-check" @click="allChecked=!allChecked">
                    <Icon type="ios-checkmark" v-show="allChecked" />
                </div>
                <div class="song-index">全选</div>
                <div class="song-name">歌曲</div>
                <div class="singer">歌手</div>
                <div class="album">专辑</div>
            </div>
        </div>
        <div class="songlist-inner">
            <div class="scroll">
                <div class="row flex align-center"
                     :class="{active:song.id===pid}"
                     v-for="(song,index) in songlists"
                     :key="index"
                >
                    <div class="song-check" @click="check(song)">
                        <Icon type="ios-checkmark" v-show="value.indexOf(song.id)!==-1"/>
                    </div>
                    <div class="song-on" v-if="isplay&&song.id===pid">
                    </div>
                    <div class="song-index" v-else>
                        {{index+1}}
                    </div>
                    <div class="play" v-if="!isplay||song.id!==pid">
                        <Icon type="ios-play-outline" @click="playmusic(song.id)" />
                    </div>

                    <div class="song-name">
                        <a class="text-hv">{{song.name}}</a>
                    </div>
                    <div class="singer ellipse">
                        <a :href="`/music/artist/${art.id}`" target="_blank"
                           v-for="(art,index) in (song.ar || song.artists)" :key="index" class="text-hv">
                            {{art.name}}
                            <span v-if="index+1<(song.ar || song.artists).length">/</span>
                        </a>
                    </div>

                    <div class="album text-hv ellipse">
                        <a class="text-hv">《{{(song.al || song.album).name}}》</a>
                    </div>
                    <song-control
                            @ondelete="$emit('ondelete',index)"
                            :btns="btns"
                            :id="song.id"
                            :like-ids="likeIds"
                    />
                </div>
            </div>
        </div>

        <div class="songlist-foot" v-if="showFooter">
            <div class="row flex align-center disable">
                <div class="song-check" @click="allChecked=!allChecked">
                    <Icon type="ios-checkmark" v-show="allChecked"/>
                </div>
                <div class="song-index">全选</div>
                <div class="button"><Icon type="ios-play-outline" />播放选中歌曲</div>
                <div class="button"><Icon type="md-add" />添加到</div>
            </div>
        </div>
    </div>
</template>

<script>
    import songControl from '@/components/song-control/song-control'
    import {reqLikeSong} from "@/api";
    export default {
        props: {
            songlists: Array,
            showHeader: {
                type: Boolean,
                default: true
            },
            showFooter: {
                type: Boolean,
                default: true
            },
            player:Boolean,
            pid: Number,
            isplay:Boolean,
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
        data() {
            return {
                value: [],
                likeIds: [],
                hv: ''
            }
        },
        components: {
            songControl
        },
        created() {
            reqLikeSong(this.$store.state.userInfo.userId).then(res => {
                this.likeIds = res.ids
            })
        },
        methods: {
            check(song) {
                let index = this.value.indexOf(song.id)
                index!==-1 ? this.value.splice(index,1) : this.value.push(song.id)
            },
            playmusic(ids) {
                if(!this.player) {
                    let musics = JSON.parse(window.localStorage.getItem('musics')) || {}
                    musics = musics.ids || []
                    if(typeof ids === 'object') {
                        musics = this.playmul(ids,musics)
                    } else {
                        musics = this.playone(ids,musics)
                    }
                    window.localStorage.setItem('musics',JSON.stringify(musics))
                    setTimeout(()=> {
                        this.isplayer()
                    },100)
                } else {
                    this.$emit('play',ids)
                }
            },
            playmul(ids,musics) {
                musics = ids.concat(musics)
                musics = musics.filter(item => {
                    return musics.indexOf(item) === musics.lastIndexOf(item)
                })
                return {
                    ids: musics,
                    type: 'adds',
                    count: ids.length
                }
            },
            playone(ids,musics) {
                let index = musics.indexOf(ids)
                if(index!==-1) {
                    musics.splice(index,1)
                }
                musics.unshift(ids)
                return  {
                    ids: musics,
                    type: 'add',
                    index
                }
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
            allChecked: {
                set(value) {
                    if(value) {
                        this.songlists.forEach(item => {
                            if(this.value.indexOf(item.id)===-1) {
                                this.value.push(item.id)
                            }
                        })
                    } else {
                        this.value = []
                    }

                },
                get() {
                    if(this.value.length) {
                        return this.value.length === this.songlists.length
                    }
                    return false
                }
            },
        },
        watch: {
            value(value) {
                this.$emit('checked',value)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #e91e63
    .my-song-list
        padding-top 65px
        position relative
        height 100%

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
            background: rgba(255,255,255,0.2);
        /*滚动条轨道*/
        .songlist-inner::-webkit-scrollbar-track
            -webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0);
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
        .songlist-foot .row,.songlist-header .row
            &:hover
                .song-index
                    display block
                .play
                    display none
        .row
            box-sizing content-box
            height 33px
            text-align left
            line-height 35px
            padding 16px 20px
            &.disable
                .hv
                    background #fff
                &:hover
                    background #fff
            &.active
                color #E91E63 !important
                a
                    color #E91E63 !important
            a
                color #333
                &:hover i
                    color $red
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
                    color  $red
            .song-name
                width 40%
            .singer
                width 20%
            .album
                width 15%
            .song-control
                width 18%

</style>
