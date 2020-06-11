<template>
    <div class="playlist">
        <div class="songlist-tag">
            <div class="container">
                <ul class="hotTags flex justify-center">
                    <li class="hottag_til">热门歌单</li>
                    <li class="hottag" v-for="(tag,index) in hotTags" :key="index">
                        <a :href="`/music/playlist?cat=${filterCat(tag.name)}`">{{tag.name}}</a>
                    </li>
                </ul>
                <div class="category-tags-box flex" >
                    <div class="category-tags" :class="{'right-line': index<5}"
                         v-for="(tag,index) in tags"
                         :key="index"
                    >
                        <div class="tag-name">
                            {{tag.title}}
                        </div>
                        <ul class="tag-list flex flex-wrap">
                            <li v-for="(item,index) in tag.list" :key="index">
                                <a class="text-hv"
                                   :class="{'active':$route.query.cat==item.name}"
                                   :href="`/music/playlist?cat=${filterCat(item.name)}`"
                                >
                                    {{item.name}}
                                </a>
                            </li>
                            <li class="showMoreTag" v-if="tag.more.length">
                                <a class="text-hv" :class="{active:index==showMoreTag&&showMore}"  @click="checkMore(index)">
                                    <span>更多</span>
                                    <Icon type="ios-arrow-up" v-if="index==showMoreTag&&showMore"/>
                                    <Icon type="ios-arrow-down" v-else />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container more-container" v-show="showMore">
                <ul class="more-tags flex">
                    <li v-for="(tag,index) in moreTags" :key="index">
                        <a class="text-hv"
                           :class="{'active':$route.query.cat==tag.name}"
                           :href="`/music/playlist?cat=${filterCat(tag.name)}`"
                        >
                            {{tag.name.replace(/\s+/g,"")}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="songlist-main">
            <div class="container hidden">
                <div class="songlist-title flex justify-between">
                    <div class="type">
                        <h1>{{this.cat}}</h1>
                        <a v-if="$route.query.cat" href="/music/playlist" class="text-hv"><Icon type="ios-close" /></a>
                    </div>
                </div>
                <div class="songlist-inner">
                    <ul class="flex flex-wrap">
                        <li v-for="(playlist,index) in songlists.playlists" :key="index">
                            <div class="content img-scale-hover">
                                <div class="cover relative">
                                    <a :href="`/music/playlist/${playlist.id}`">
                                        <div class="img-box img-scale ">
                                            <img :src="playlist.coverImgUrl">
                                        </div>
                                    </a>
                                    <div class="btn-play absolute-center">
                                        <img src="../../static/imgs/btn-play.png" alt="">
                                    </div>
                                </div>
                                <div class="info ellipse ">
                                    <a class="text-hv">{{playlist.name}}</a>
                                </div>
                                <div class="play-count">
                                    <Icon type="ios-headset" />
                                    {{playlist.playCount | playCount}}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <Page
                        :total="songlists.total"
                        :page-size="25"
                        @on-change="changePage"
                        :current="parseInt($route.query.page)||1"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {reqHotTags, reqplaylist, reqTags} from "@/api";

    export default {
        data() {
            return {
                hotTags:[],
                tags:[],
                showMore:false,
                showMoreTag:'',
                moreTags:[],
                songlists:{},
                recursionCount:0,
                cat:''
            }
        },
        async created() {
            let hotTags = await reqHotTags()
            reqTags().then(res => {
                const categories = res.categories
                let tags = res.sub
                for (const categoriesKey in categories) {
                    this.tags.push({title:categories[categoriesKey],list:[],more:[]})
                }
                tags.forEach(tag=> {
                    for (const categoriesKey in categories) {
                        if(categoriesKey==tag.category) {
                            if(this.tags[categoriesKey].list.length<8) {
                                this.tags[categoriesKey].list.push(tag)
                            } else {
                                this.tags[categoriesKey].more.push(tag)
                            }

                            return
                        }
                    }
                })
            })
            this.hotTags = hotTags.tags
            this.cat = this.$route.query.cat || '全部'
            this.render()
        },
        watch:{
            $route() {
                this.render()
            }
        },
        methods: {
            checkMore(index) {
                if(index==this.showMoreTag&&this.showMore) {
                    this.showMore = false
                } else {
                    this.showMore = true
                    this.showMoreTag = index
                    this.moreTags = this.tags[index].more
                }
            },
            render(page) {
                page = page || this.$route.query.page || 1
                this.recursionCount = 0
                reqplaylist(25,(page-1)*25,this.filterCat(this.cat)).then(res => {
                    this.songlists = res
                })

            },
            changePage(page) {
                this.$router.replace(`/music/playlist?page=${page}&cat=${this.filterCat(this.cat)}`)
            },
            filterCat(cat) {
                cat = cat.replace(/%/g,"%25")
                cat = cat.replace(/#/g,"%23")
                cat = cat.replace(/&/g,"%26")
                cat = cat.replace(/\//g,"%2F")
                return cat
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    .playlist
        margin-bottom 20px
        .recommend-hot .list-inner
            .item
                width 20%
        a
            color #333
        .text-active
            color $red
        .songlist-tag
            padding 30px 0
            background #F2F2F2
            a.active
                transition none
                background $red
                border-radius 13px
                color #fff !important
            .showMoreTag
                padding-right 10px

            .more-container
                z-index 22
                position absolute
                left 50%
                transform translateX(-50%)
                .more-tags
                    box-shadow 0 2px 10px rgba(0,0,0,.1)
                    background #fff
                    padding 20px 40px
                    li
                        margin 0 20px
                        word-break keep-all
                        a
                            padding: 3px 6px 4px;
            .hottag_til
                color #999
                margin-right 30px
            .hottag
                margin-right 30px
                a
                    padding 3px 8px
                    &:hover
                        color $red
            .category-tags-box
                margin-top 40px
            .category-tags
                width 20%
                .tag-name
                    color #999
                .tag-list
                    padding-left 20px
                    text-align left
                    li
                        width 33%
                        margin 18px 0 0 0
                        a
                            padding 3px 6px 4px
        .songlist-title
            padding 0 14px
            margin 50px 0 28px
            color #191919
            .type
                position relative
                i
                    font-size 24px
                    font-weight 800
                    position absolute
                    right -25px
                    top 0




        .songlist-inner
            margin-bottom 40px
            ul li
                width 20%
                margin-bottom 20px
                .content
                    padding 0 14px
                    &:hover .btn-play
                        opacity 1
                    .img-box
                        width 100%
                    .btn-play
                        z-index 20
                        transition all .4s
                        opacity 0
                        width 60px
                        height 60px
                        line-height 60px
                        border-radius 50%
                        cursor pointer
                        &:hover
                            background #000

                .info
                    text-align left
                    margin-top 15px
                    font-size 16px

                .play-count
                    padding 3px 0
                    font-size 14px
                    color #999
                    text-align left


</style>
