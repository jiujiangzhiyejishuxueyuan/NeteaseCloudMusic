<template>
    <div id="search">
        <div class="bg"></div>
        <div class="search-header">
            <div class="search-header-inner">
                <div class="search-input flex align-center">
                    <input type="text" placeholder="搜索歌曲、歌手、mv" v-model="keywords" @keydown.enter="skip">
                    <a class="button active" @click="skip">
                        <Icon type="ios-search"/>
                        搜索
                    </a>
                </div>
            </div>
        </div>
        <div class="search-result-content container">
            <ul class="nav flex">
                <li v-for="(item,index) in type" :key="index" :class="{active:$route.query.type==item.key}">
                    <a @click="$router.replace(`${$route.path}?keywords=${$route.query.keywords}&type=${item.key}`)">{{item.text}}</a>
                </li>
            </ul>
            <song-list :songs="result.songs||[]" v-if="$route.query.type==='1'&&result!==0"/>
            <singer-list :singers="result.artists||[]" v-else-if="$route.query.type==='100'&&result!==0"/>
            <album :albums="result.albums||[]" v-else-if="$route.query.type==='10'&&result!==0"/>
            <PlayList :playlists="result.playlists||[]" v-else-if="$route.query.type==='1000'&&result!==0"/>
            <userList :users="result.userprofiles||[]" v-else-if="$route.query.type==='1002'&&result.userprofiles"/>
            <mv-list :skeCount="15" :mvs="result.mvs||[]" v-else-if="$route.query.type==='1004'&&result!==0"/>
            <lyric-list :songs="result.songs" v-else-if="$route.query.type==='1006'&&result.songs"/>
            <dj-list :djs="result.djRadios" v-else-if="$route.query.type==='1009'&&result.djRadios"/>
            <video-list :skeCount="15" :videos="result.videos||[]" v-else-if="$route.query.type==='1014'&&result!==0"/>
            <div class="ske container " v-else-if="result!==0">
                <Spin></Spin>
            </div>
            <div class="not-found" v-else>
                未找到与"{{keywords}}"相关的资源
            </div>
            <page
                    :total="count"
                    :page-size="limit"
                    :current="parseInt($route.query.page)||1"
                    @on-change="(page)=>$router.replace(`${$route.path}?keywords=${$route.query.keywords}&type=${$route.query.type||1}&page=${page}`)"
                    v-if="count"
            />
        </div>
    </div>
</template>

<script>
    import songList from '@/components/song-list/song-list'
    import singerList from '@/components/singer-list/singer-list'
    import album from "@/components/album-list/album-list"
    import PlayList from "@/components/play-list/play-list"
    import userList from '@/views/search/user-list/user-list'
    import mvList from '@/components/mv-list/mv-list'
    import lyricList from '@/views/search/lyric-list/lyric-list'
    import djList from '@/views/search/dj-list/dj-list'
    import videoList from '@/components/video-list/video-list'
    import {search} from "@/api"

    export default {
        name: "search",
        components: {
            PlayList,
            songList,
            singerList,
            album,
            userList,
            mvList,
            lyricList,
            djList,
            videoList
        },
        inject: ['reload'],
        data() {
            return {
                keywords: '',
                type: [
                    {
                        key: 1,
                        text: '歌曲'
                    },
                    {
                        key: 100,
                        text: '歌手'
                    },
                    {
                        key: 10,
                        text: '专辑'
                    },
                    {
                        key: 1000,
                        text: '歌单'
                    },
                    {
                        key: 1002,
                        text: '用户'
                    },
                    {
                        key: 1004,
                        text: 'MV'
                    },
                    {
                        key: 1006,
                        text: '歌词'
                    },
                    {
                        key: 1009,
                        text: '电台'
                    },
                    {
                        key: 1014,
                        text: '视频'
                    },
                ],
                result: '',
                limit: 25,
                count: 0
            }
        },
        methods: {
            skip() {
                this.$router.replace(this.keywords ? `/music/search?keywords=${this.keywords}&type=${this.$route.query.type || 1}` : '/music')
            },
            search() {
                let {keywords, type, page} = this.$route.query
                page = page || 1
                this.keywords = keywords
                let c
                switch (type) {
                    case '1':
                        c = 'songCount'
                        this.limit = 15
                        break
                    case '10':
                        c = 'albumCount'
                        break
                    case '100':
                        c = 'artistCount'
                        break
                    case '1000':
                        c = 'playlistCount'
                        break
                    case '1002':
                        c = 'userprofileCount'
                        this.limit = 20
                        break
                    case '1004':
                        c = 'mvCount'
                        break
                    case '1006':
                        c = 'songCount'
                        this.limit = 10
                        break
                    case '1009':
                        c = 'djRadiosCount'
                        break
                    case '1014':
                        c = 'videoCount'

                }
                search(keywords, type, this.limit, (page - 1) * this.limit).then(res => {
                    this.result = JSON.stringify(res.result) !== '{}' ? res.result : 0
                    this.count = this.result[c]
                })
            }
        },
        created() {
            if (!this.$route.query.keywords) {
                this.$router.replace('/music')
            } else {
                this.search()
            }

        },
        watch: {
            $route() {
                this.result = ''
                if (!this.$route.query.keywords) {
                    this.$router.replace('/music')
                } else {
                    this.search()
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $red = #e91e63
    #search
        .item-contain
            z-index 2
        .not-found
            padding 150px 0

        .bg
            position absolute
            top 0
            left 0
            z-index -1
            height 400px
            width 100%
            background url("http://cdnmusic.migu.cn/v3/static/img/common/search/search_bg.jpg")

        .search-header
            width 660px
            padding 100px 0
            margin 0 auto

            .search-input
                height 50px
                border-radius 25px
                padding 0 5px 0 20px
                background #fff

                .button
                    padding 0
                    width 80px
                    line-height 37px
                    height 40px
                    display block

                input
                    border none
                    width 100%
                    height 100%
                    outline 0

                    &::-webkit-input-placeholder
                        color #999

        .search-result-content
            background #fff
            padding 40px 15px
            box-shadow 0 0 80px 0 rgba(50, 50, 50, .15)
            @media screen and (max-width: 1200px)
                padding 40px 20px

            .nav
                padding-left 20px
                margin-bottom 30px

                li
                    font-size 18px
                    margin-right 60px

                    &:hover
                        color $red

                    &.active
                        color $red
                        position relative

                        &:after
                            content ''
                            background $red
                            height 2px
                            bottom 0
                            left -5px
                            margin-left 50%
                            position absolute
                            width 10px

        .wae
            content ''
</style>
