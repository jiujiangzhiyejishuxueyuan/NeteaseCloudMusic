<template>
    <ul class="record-list" v-if="!loading">
        <li class="flex justify-between" v-for="(item,index) in songs" :key="index">
            <div class="info flex">
                <div class="index">{{index+1}}</div>
                <span class="name">{{item.song.name}}</span>
                <span class="artist ellipse">-
                    <a v-for="(art,index) in item.song.ar" :key="index">
                        {{art.name}}
                        <span v-if="index+1<item.song.ar.length">/</span>
                    </a>
                </span>
                <song-control :id="item.song.id" :likeIds="likeIds"/>
            </div>
            <div class="score-box">
                <span class="count" v-if="item.playCount">{{item.playCount}}次</span>
                <div class="score" :style="{width: item.score+'%'}"></div>
            </div>
        </li>
    </ul>
    <ul class="record-list-ske" v-else>
        <li class="record-item-ske flex justify-between align-center" v-for="index in 10" :key="index">
            <div class="flex left">
                <div class="name ske-ani"></div>
                <div class="singer ske-ani"></div>
            </div>
            <div class="score ske-ani"></div>
        </li>
    </ul>
</template>

<script>
    import songControl from '@/components/song-control/song-control'
    import {reqLikeSong} from "@/api";
    import {mapState} from 'vuex'
    export default {
        props: {
            songs: Array,
            loading: Boolean
        },
        components: {
            songControl
        },
        data() {
            return {
                likeIds: []
            }
        },
        created() {
            reqLikeSong(this.userInfo.userId).then(res => {
                this.likeIds = res.ids
            })
        },
        computed: {
            ...mapState(['userInfo'])
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .record-list-ske
        .record-item-ske
            height 49px
            div
                height 25px

            .score
                height 45px
                width 40%
            .left
                width 20%

                .singer
                    margin-left 20px
                    width 120px
                .name
                    width 60%
    .record-list
        li
            .info
                width 60%
                padding 18px 0 18px 10px
                position relative
                .index
                    width 30px
                    margin-right 5px
                .name
                    margin-left 10px
                .artist
                    margin-left 30px
                    color #999
                    a:hover
                        color #E91E63
                .song-control
                    position absolute
                    top 0
                    right 0
                    height 100%
                    padding 0 10px

            .score-box
                width 40%
                position relative
                text-align left
                line-height 57px
                .count
                    margin-left 10px
                    font-size 12px
                .score
                    position absolute
                    top 0
                    left 0
                    height 100%
                    background #4eb4f5
                    opacity .1
            &:hover
                background #f2f2f2
                .song-control
                    background #f2f2f2
                    opacity 1
</style>
