<template>
    <div class="playlist">
        <div class="songlist-tag">
            <div class="container my-card">
                <ul class="hotTags flex justify-center">
                    <li class="hottag_til">热门歌单</li>
                    <li class="hottag" v-for="(tag,index) in hotTags" :key="index">
                        <router-link :to="`/music/playlist?cat=${filterCat(tag.name)}`">{{tag.name}}</router-link>
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
                                <router-link
                                        class="text-hv"
                                        :class="{'active':$route.query.cat==item.name}"
                                        :to="`/music/playlist?cat=${filterCat(item.name)}`"
                                >
                                    {{item.name}}
                                </router-link>
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
                        <router-link
                                class="text-hv"
                                :class="{active:$route.query.cat==tag.name}"
                                :to="`/music/playlist?cat=${filterCat(tag.name)}`"
                        >
                            {{tag.name.replace(/\s+/g,"")}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="songlist-main">
            <div class="container hidden my-card">
                <div class="songlist-title flex justify-between">
                    <div class="type">
                        <h1>{{this.cat}}</h1>
                        <a v-if="$route.query.cat" @click="$router.replace('/music/playlist')" class="text-hv">
                            <Icon type="ios-close"/>
                        </a>
                    </div>
                </div>
                <play-list :playlists="songlists.playlists||[]"/>
                <Page
                        :total="songlists.total"
                        :page-size="25"
                        @on-change="(page)=>$router.replace(`/music/playlist?page=${page}&cat=${filterCat(cat)}`)"
                        :current="parseInt($route.query.page)||1"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import {reqHotTags, reqplaylist, reqTags} from "@/api";
    import playList from '@/components/play-list/play-list'
    export default {
        components: {
            playList,
        },
        beforeRouteEnter(to,from,next) {
            let hotTags
            let tags
            let ctags = []
            let i = 0
            let page = to.query.page || 1
            let cat = to.query.cat || '全部'
            let songlists = []
            reqHotTags().then(res => {
                hotTags = res.tags
                i++
                if(i===3) {
                    next(vm => {
                        vm.hotTags = hotTags
                        vm.tags = ctags
                        vm.songlists = songlists
                        vm.cat = cat
                    })
                }
            })
            reqTags().then(res => {
                const categories = res.categories
                tags = res.sub
                for (const categoriesKey in categories) {
                    ctags.push({title:categories[categoriesKey],list:[],more:[]})
                }
                tags.forEach(tag=> {
                    for (const categoriesKey in categories) {
                        if(categoriesKey==tag.category) {
                            if(ctags[categoriesKey].list.length<8) {
                                ctags[categoriesKey].list.push(tag)
                            } else {
                                ctags[categoriesKey].more.push(tag)
                            }
                            return
                        }
                    }
                })
                i++
                if(i===3) {
                    next(vm => {
                        vm.hotTags = hotTags
                        vm.tags = ctags
                        vm.songlists = songlists
                        vm.cat = cat
                    })
                }
            })
            reqplaylist(25,(page-1)*25,cat).then(res => {
                songlists = res
                i++
                if(i===3) {
                    next(vm => {
                        vm.hotTags = hotTags
                        vm.tags = ctags
                        vm.songlists = songlists
                        vm.cat = cat
                    })
                }
            })
        },
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
        watch:{
            $route() {
                this.render()
            }
        },
        methods: {
            checkMore(index) {
                if(index===this.showMoreTag&&this.showMore) {
                    this.showMore = false
                } else {
                    this.showMore = true
                    this.showMoreTag = index
                    this.moreTags = this.tags[index].more
                }
            },

            render(page) {
                this.songlists.playlists = []
                this.cat = this.$route.query.cat || '全部'
                page = page || this.$route.query.page || 1
                this.recursionCount = 0
                reqplaylist(25,(page-1)*25,this.filterCat(this.cat)).then(res => {
                    this.songlists = res
                })
            },
            filterCat(cat) {
                if(cat) {
                    cat = cat.replace(/%/g,"%25")
                    cat = cat.replace(/#/g,"%23")
                    cat = cat.replace(/&/g,"%26")
                    cat = cat.replace(/\//g,"%2F")
                }
                return cat || '全部'
            },

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    .playlist
        margin-bottom 20px
        .songlist-main
          margin-top 20px

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
            margin 0 0 28px
            color #191919
            .type
                position relative
                i
                    font-size 24px
                    font-weight 800
                    position absolute
                    right -25px
                    top 0





</style>
