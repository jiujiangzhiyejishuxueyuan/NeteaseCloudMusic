<template>
    <div id="video">
        <div class="video-header">
            <ul class="category flex flex-wrap justify-center container">
                <li class="tag title">热门分类 :</li>
                <li class="tag" v-for="(cat,index) in category" :key="index" :title="cat.name">
                    <router-link :to="`/video?id=${cat.id}`">{{cat.name}}</router-link>
                </li>
            </ul>
            <ul class="tags flex flex-wrap container" :class="{all: moreTag}">
                <div class="more" @click="moreTag = !moreTag">
                    <Icon type="ios-arrow-up" v-if="moreTag" title="收起标签"/>
                    <Icon type="ios-arrow-down" v-else title="查看更多"/>
                </div>
                <li class="tag title">标签 :</li>
                <li class="tag">
                    <router-link to="/video" :class="{active: !currentTag}">全部视频</router-link>
                </li>
                <li class="tag" v-for="(tag,index) in tags" :key="index" :title="tag.name">
                    <router-link :to="`/video?id=${tag.id}`" :class="{active: parseInt(currentTag)===tag.id}">
                        {{tag.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <video-list :videos="videoList" class="container"/>
        <div class="ske container" v-if="more">
            <spin/>
        </div>
        <div class="container" v-else>
            暂无更多视频
        </div>
    </div>
</template>

<script>
    import {
        reqVideoCategoryList,
        reqVideoTagList,
        reqVideoList,
        reqAllVideo
    } from '@/api'
    import VideoList from "@/components/video-list/video-list";

    export default {
        components: {VideoList},
        data() {
            return {
                videoList: [],
                tags: [],
                currentTag: '',
                category: [],
                moreTag: false,
                offset: 0,
                oldLength: 0,
                more: true,
                ids: [],
                reqNum: 0
            }
        },
        methods: {
            reqdata() {
                console.log('掉我干啥')
                reqVideoList(this.currentTag, this.offset).then(res => {
                    this.more = res.hasmore
                    res.datas.forEach(item => {
                        if (!this.ids.includes(item.data.vid)) {
                            this.ids.push(item.data.vid)
                            this.videoList.push(item.data)
                        }
                    })
                    if(this.reqNum>4) {
                        this.reqNum = 0
                    } else {
                        this.reqNum++
                        this.reqdata()
                    }
                })
                this.offset += 8
            },
            reqAlldata() {
                reqAllVideo(this.offset).then(res => {
                    this.more = res.hasmore
                    res.datas.forEach(item => {
                        if (!this.ids.includes(item.data.vid)) {
                            this.ids.push(item.data.vid)
                            this.videoList.push(item.data)
                        }
                    })
                    if(this.reqNum>4) {
                        this.reqNum = 0
                    } else {
                        this.reqNum++
                        this.reqAlldata()
                    }
                })
                this.offset += 8
            },
            render() {
                this.currentTag = this.$route.query.id
                this.offset = 0
                this.videoList = []
                this.more = true
                this.oldLength = 0
                if (this.currentTag) {
                    console.log('???')
                    if (this.currentTag !== '1000') {
                        this.reqdata(5)
                    } else {
                        this.$router.replace('/mv')
                    }
                } else {
                    this.reqAlldata(5)
                }
            },
        },
        watch: {
            $route() {
                this.render()
            }
        },
        created() {
            this.render()
            reqVideoCategoryList().then(res => {
                if (res.code === 200) {
                    this.category = res.data
                }
            }).catch(() => this.$Message.error('获取分类列表失败'))
            reqVideoTagList().then(res => {
                if (res.code === 200) {
                    this.tags = res.data
                }
            }).catch(() => this.$Message.error('获取标签列表失败'))
            window.addEventListener('scroll', () => {
                if (document.body.scrollHeight  - window.innerHeight - window.scrollY < 1000 && (this.oldLength !== this.videoList.length)) {
                    this.oldLength = this.videoList.length
                    if (this.currentTag) {
                        this.reqdata()
                    } else {
                        this.reqAlldata()
                    }
                }
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E60026
    #video
        .video-list
            margin-top 20px

        .video-header
            padding-top 20px
            background #f2f2f2
            height 170px
            @media screen and (max-width: 1200px)
                height 210px !important

            .tags
                margin-top 20px
                position absolute
                left 50%
                transform translateX(-50%)
                max-height 80px
                overflow hidden
                background #f2f2f2
                @media screen and (min-width: 1550px)
                    width 1400px

                &.all
                    box-shadow 0 2px 3px rgba(0, 0, 0, 0.1)
                    max-height none

                .more
                    cursor pointer
                    position absolute
                    right -10px
                    padding 0 15px
                    font-size 30px

                    &:hover
                        color $red

            .tag
                width 90px

                &.title
                    line-height 41px
                    color #999

                a
                    width 100%
                    padding 10px 0
                    display block
                    height 100%

                    &.active, &:hover
                        background rgba(0, 0, 0, .05)
                        color $red

            .category
                margin 0 auto
</style>
