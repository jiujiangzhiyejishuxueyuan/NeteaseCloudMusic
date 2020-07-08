<template>
    <div class="my-singer">
        <div class="section-header bb">
            <span class="title">我的歌手(<span class="count">{{singers.count}}</span>)</span>
        </div>
        <ul class="my-singer-list flex flex-wrap">
            <li class="singer flex" v-for="(singer,index) in singers.data" :key="index">
                <div class="avatar img-box">
                    <router-link :to="`/music/artist/${singer.id}`"><img :src="singer.picUrl+'?param=100y100'" alt="">
                    </router-link>
                </div>
                <div class="info">
                    <p class="name">
                        <router-link :to="`/music/artist/${singer.id}`">{{singer.name}}</router-link>
                    </p>
                    <p class="count">
                        <span class="album">{{singer.albumSize}}个专辑</span>
                        <span class="mv">{{singer.mvSize}}个mv</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {reqSubSinger} from "@/api";

    export default {
        data() {
            return {
                singers: ''
            }
        },
        created() {
            reqSubSinger().then(res => {
                this.singers = res
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #00a1d6
    .my-singer
        .my-singer-list
            .info
                padding 10px 0
                text-align left
                margin-left 10px
                .album
                    margin-right 20px
                .name
                    margin-bottom 10px
                    font-weight 600
                    font-size 15px
                    &:hover
                        color $blue
            .singer
                padding 10px 0 10px 10px
                width 50%
                &:hover
                    background rgba(0,0,0,.02)
        .avatar
            width 80px
            height 80px

</style>
