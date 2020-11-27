<template>
    <div class="artist container">
        <div class="artist-header my-card">
          <ul class="type flex">
            <li
                v-for="(type,index) in types"
                :class="{active: type.value===currentType}"
                :key="index"
                @click="$router.replace(`/music/artist?type=${type.value}${currentStyle!==-1?`&style=${currentStyle}`:''}${str?`&str=${str}`:''}`)"
            >
              <a>{{ type.text }}</a>
            </li>
          </ul>
            <ul class="style flex">
                <li v-for="(style,index) in styles" :class="{active: style.value===currentStyle}" :key="index"
                    @click="$router.replace(`/music/artist?style=${style.value}${currentType!==-1?`&type=${currentType}`:''}${str?`&str=${str}`:''}`)">
                    <a>{{style.text}}</a>
                </li>
            </ul>
            <ul class="letter flex flex-wrap">
                <li :class="{active: str===''}"
                    @click="$router.replace(`/music/artist?${currentType!==-1?`&type=${currentType}`:''}${currentStyle!==-1?`&style=${currentStyle}`:''}`)"><a>全部</a></li>
                <li v-for="(item,index) in 26" :key="index" :class="{active: String.fromCharCode(item+64)===str}"
                    @click="$router.replace(`/music/artist?str=${String.fromCharCode(item+64)}${currentType!==-1?`&type=${currentType}`:''}${currentStyle!==-1?`&style=${currentStyle}`:''}`)">
                    <a>{{String.fromCharCode(item+64)}}</a>
                </li>
            </ul>
        </div>
      <singer-list :singers="singers" class="my-card"/>
        <div class="page-skip flex justify-center">
            <div class="previous" :class="{disable: page===1 }" @click="page!=1&&changePage(-1)">上一页</div>
            <div class="next" :class="{disable: !more}" @click="more&&changePage(1)">下一页</div>
        </div>
    </div>
</template>

<script>
    import SingerList from "@/components/singer-list/singer-list";
    import {reqSingerList} from "@/api";
    export default {
        components: {SingerList},
        data() {
            return {
                types: [
                    {
                        value: -1,
                        text: '全部'
                    },
                    {
                        value: 1,
                        text: '男歌手'
                    },
                    {
                        value: 2,
                        text: '女歌手'
                    },
                    {
                        value: 3,
                        text: '乐队'
                    },
                ],
                styles: [
                    {
                        value: -1,
                        text: '全部'
                    },
                    {
                        value: 7,
                        text: '华语'
                    },
                    {
                        value: 96,
                        text: '欧美'
                    },
                    {
                        value: 8,
                        text: '日本'
                    },
                    {
                        value: 16,
                        text: '韩国'
                    },
                    {
                        value: 0,
                        text: '其他'
                    },
                ],
                currentType: -1,
                currentStyle: -1,
                str: '',
                singers: [],
                page: 1,
                more: false
            }
        },
        methods: {
            render() {
                let page = this.$route.query.page || 1
                let type = this.$route.query.type || -1
                let style = this.$route.query.style || -1
                let str = this.$route.query.str || ''
                let limit = 30
                let offset = (page-1) * limit
                this.page = parseInt(page)
                this.currentType = parseInt(type)
                this.currentStyle = parseInt(style)
                this.str = str
                reqSingerList(type,style,str,limit,offset).then(res => {
                    this.singers = res.artists
                    this.more = res.more
                })
            },
            changePage(type) {
                this.$router.push(`/music/artist?page=${this.page+type}${this.currentType!==-1?`&type=${this.currentType}`:''}${this.currentStyle!==-1?`&style=${this.currentStyle}`:''}${this.str?`&str=${this.str}`:''}`)
            }
        },
        created() {
            this.render()
        },
        watch: {
            $route() {
                this.singers = []
                this.render()
            }
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E91E63
    $blue = #00a1d6
    $blueh = #00b5e5
    .artist
        .page-skip
            margin 30px 0
            div
                cursor pointer
                margin  0 20px
                color #fff
                padding 5px 10px
                background $blue
                border-radius 15px
                &.disable
                    background #999
                    cursor not-allowed
                    &:hover
                        background #999
                &:hover
                    background $blueh
        .ske
            padding 200px 0
        .artist-header
            margin 30px 0

            ul
                font-size 14px
                margin 10px 0
                li
                    cursor pointer
                    padding 3px 10px
                    margin-right 20px
                    border-radius 15px
                    &:hover
                        color $red
                    &.active
                        color #fff
                        background $red
</style>
