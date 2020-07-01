<template>
    <ul class="addSong-playlist" @mouseleave="$emit('close')">
        <li v-for="(playlist,index) in playlists" :key="index" class="ellipse" @click="add(playlist.id)">
            {{playlist.name}}
        </li>
    </ul>
</template>

<script>
    import {changeplaylistSong, reqUserPlaylist} from "@/api"
    import {mapState} from 'vuex'
    export default {
        props: {
            id: Number
        },
        data() {
            return {
                playlists: []
            }
        },
        methods: {
            add(pid) {
                changeplaylistSong(pid,'add',this.id).then(res => {
                    if(res.code===502) {
                        this.$Message.info('歌曲已存在')
                    } else {
                        this.$Message.success('添加成功')
                    }
                    this.$emit('close')
                })
            }
        },
        created() {
            reqUserPlaylist(this.userInfo.userId).then(res => {
                console.log(res,res.playlist.length)
                res.playlist.forEach(item => {
                    console.log(item.creator.nickname)
                })
                this.playlists = res.playlist.filter(item => {
                    return !item.subscribed
                })
            })
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .addSong-playlist
        position absolute
        top 0
        left 0
        z-index 2
        background #fff
        font-size 14px
        box-shadow 0 1px 8px rgba(0,0,0,.3)
        width 180px
        padding 10px 0
        li
            cursor pointer
            text-align center
            padding 5px 0
            color #999999
            &:hover
                color #fff
                background #E91E63

</style>
