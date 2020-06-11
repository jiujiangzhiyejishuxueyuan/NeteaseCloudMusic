<template>
    <div id="search">
        <div class="bg"></div>
        <div class="search-header">
            <div class="search-header-inner">
                <div class="search-input flex align-center">
                    <input type="text" placeholder="搜索歌曲、歌手、mv" v-model="keywords" @keydown.enter="skip">
                    <a class="button active" @click="skip">
                        <Icon type="ios-search" />搜索
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
            <song-list :songlists="result.songs" v-if="$route.query.type==1"/>
            <div class="singer" v-if="$route.query.type==100">
                singer
            </div>
            <page
                    :total="result.songCount"
                    :page-size="limit"
                    :current="parseInt($route.query.page)||1"
                    @on-change="(page)=>$router.replace(`${$route.path}?keywords=${$route.query.keywords}&type=${$route.query.type||1}&page=${page}`)"/>
        </div>
    </div>
</template>

<script>
    import songList from '@/components/song-list/song-list'
    import {search} from "../../api";
    export default {
        name: "search",
        components: {
            songList
        },
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
                result:'',
                limit: 15
            }
        },
        methods: {
            skip() {
                this.$router.replace(this.keywords ? `/music/search?keywords=${this.keywords}&type=1` : '/music')
            },
            search() {
                let {keywords,type,page} = this.$route.query
                page = page || 1
                this.keywords = keywords
                console.log(keywords,type,page)
                search(keywords,type,this.limit,(page-1)*this.limit).then(res => {
                    this.result = res.result
                    console.log(res)
                })
            }
        },
        created() {
            this.search()
        },
        watch: {
            $route() {
                this.search()
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $red = #e91e63
    #search
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
            padding 40px 50px
            box-shadow 0 0 80px 0 rgba(50,50,50,.15)
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
