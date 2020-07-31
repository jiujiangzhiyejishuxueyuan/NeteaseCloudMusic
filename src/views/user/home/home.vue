<template>
    <div class="user-home">
        <div class="record container" v-if="record.length">
            <div class="record-header section-header">
                <span class="section-header-title">
                    听歌排行
                    <span class="total">累计听歌{{user.listenSongs}}首</span>
                </span>
                <div class="control">
                    <span class="item" @click="recordType='week'" :class="{disabled: recordType!=='week'}">最近一周 </span>|
                    <span class="item " @click="recordType='all'" :class="{disabled: recordType!=='all'}"> 所有时间</span>
                </div>
            </div>
            <record-list :songs="record.slice(0,10)" :loading="recordLoading"/>
            <div class="record-footer">
                <a class="text-hv">查看更多</a>
            </div>
        </div>
        <div class="my-playlist container">
            <div class="section-header">
                <span class="section-header-title">
                    {{user.profile&&($store.state.userInfo.userId!==user.profile.userId) ? user.profile.nickname : '我'}}创建的歌单
                    ({{createdPlaylist.length}})
                </span>
            </div>
            <play-list :playlists="createdPlaylist"/>
        </div>
        <div class="sub-playlist container" v-if="subPlaylist.length">
            <div class="section-header">
                <span class="section-header-title">
                    {{user.profile&&($store.state.userInfo.userId!==user.profile.userId) ? user.profile.nickname : '我'}}收藏的歌单
                    ({{subPlaylist.length}})
                </span>
            </div>
            <play-list :playlists="subPlaylist" />
        </div>
    </div>
</template>

<script>
    import recordList from '@/views/user/record-list/record-list'
    import playList from '@/components/play-list/play-list'
    import {reqUserInfo, reqUserPlaylist, reqUserRecord} from "@/api";
    export default {
        components: {
            playList,
            recordList
        },
        data() {
            return {
                record: [],
                recordType: 'week',
                createdPlaylist: [],
                subPlaylist: [],
                id:'',
                user: '',
                recordLoading: false
            }
        },
        created() {
            this.render()
        },
        methods: {
            render() {
                this.id = parseInt(this.$route.query.id)
                this.subPlaylis = []
                this.createdPlaylist = []
                reqUserInfo(this.id).then(res => {
                    this.user = res
                })
                reqUserRecord(this.id).then(res => {
                    this.record = res.weekData
                })

                reqUserPlaylist(this.id).then(res => {
                    res.playlist.forEach(item => {
                        item.creator.userId === this.id ? this.createdPlaylist.push(item) : this.subPlaylist.push(item)
                    })
                })
            }
        },
        watch: {
            $route() {
                this.render()
            },
            recordType(value) {
                this.recordLoading = true
                if(value==='week') {
                    reqUserRecord(this.id).then(res => {
                        this.recordLoading = false
                        this.record = res.weekData
                    })
                } else if(value==='all') {
                    reqUserRecord(this.id,0).then(res => {
                        this.recordLoading = false
                        this.record = res.allData
                    })
                }
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
