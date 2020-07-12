<template>
    <div class="search-tip" v-show="tip">
        <div class="song" v-if="tip.songs">
            <p class="title">
                <Icon type="ios-musical-notes-outline"/>
                歌曲
            </p>
            <ul class="list">
                <li class="item" v-for="(song,index) in tip.songs" :key="index">
                    <router-link :to="`/music/song/${song.id}`" class="ellipse">
                        {{song.name}}-
                        <span class="art" v-for="(art,index) in song.artists" :key="index">
                        {{art.name}}
                        <i v-if="index<song.artists.length-1">/</i>
                    </span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="album" v-if="tip.albums">
            <p class="title">
                <Icon type="ios-disc-outline"/>
                专辑
            </p>
            <ul class="list">
                <li class="item ellipse" v-for="(album,index) in tip.albums" :key="index">
                    <router-link :to="`/music/album/${album.id}`" class="ellipse" @click="ss">
                        {{album.name }} - {{album.artist.name}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="singer" v-if="tip.artists">
            <p class="title">
                <Icon type="md-person"/>
                歌手
            </p>
            <ul class="list">
                <li class="item ellipse" v-for="(singer,index) in tip.artists" :key="index">
                    <router-link :to="`/music/artist/${singer.id}`" class="ellipse">
                        {{singer.name}}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {searchHot, searchSuggest} from "@/api";

    export default {
        props: {
            keywords: String
        },
        data() {
            return {
                tip: '',
                hot: []
            }
        },
        methods: {
            ss() {
                console.log('woca')
            }
        },
        watch: {
            keywords(value) {
                if (value) {
                    this.hot = []
                    searchSuggest(value).then(res => {
                        this.tip = res.result
                    })
                } else {
                    this.tip = ''
                    // searchHot().then(res => {
                    //     console.log(res)
                    // })
                }
            }
        },
        created() {
            if (this.keywords) {
                this.hot = []
                searchSuggest(this.keywords).then(res => {
                    console.log(res)
                    this.tip = res.result
                })
            } else {
                this.tip = ''
                // searchHot().then(res => {
                //     console.log(res)
                // })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .search-tip
        width 100%
        position absolute
        left 0
        top 0
        padding 10px 0
        background #fff
        box-shadow 0 5px 5px rgba(0, 0, 0, .1)
        z-index 999
        text-align left

        .list
            line-height 24px

            .item
                padding 0 5px 0 35px

                a
                    padding 8px 0
                    display block

                &:hover
                    background rgba(0, 0, 0, .1)

        .title
            padding 5px 10px
            line-height 22px
            font-size 16px

            i
                margin-right 2px
                font-size 22px
</style>
