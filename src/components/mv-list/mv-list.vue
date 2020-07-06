<template>
    <ul class="mv-list flex flex-wrap" v-if="mvs.length">
        <li class="mv-item img-scale-hover" v-for="(mv,index) in mvs" :key="index">
            <a :href="`/mv/${mv.id}`" target="_blank">
                <div class="img-box img-scale">
                    <img :src="(mv.cover||mv.imgurl16v9||imgurl)+'?param=260y150'" alt="">
                    <div class="shadow">
                        <div class="btn-play absolute-center">
                            <img src="../../static/imgs/btn-play.png" alt="">
                        </div>
                    </div>
                </div>
            </a>
            <div class="info" v-if="mv.artistName">
                <p class="title ellipse text-hv">{{mv.name}}</p>
                <p class="art ellipse" v-if="!hiddenArt">
                    <a class="name text-hv"
                       v-for="(art,index) in mv.artists"
                       :href="`/music/artist/${art.id}`"
                       :key="index"
                       target="_blank"
                    >
                        {{art.name }}
                    </a>
                </p>
            </div>
        </li>
    </ul>
    <video-list-ske :count="skeCount" v-else/>
</template>

<script>
    import VideoListSke from "@/components/video-list-ske/video-list-ske";
    export default {
        components: {VideoListSke},
        props: {
            mvs: Array,
            skeCount: {
                type: Number,
                default: () => 10
            },
            hiddenArt: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mv-list
        .mv-item
            width 20%
            padding 0 10px
            margin-bottom 20px
            transition all .2s
            &:hover
                .shadow
                    opacity 1 !important
            .img-box
                position relative
                @media screen and (max-width: 1550px)
                    height 107px
                @media screen and (max-width: 1200px)
                    height 84px

                .shadow
                    opacity 0
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    z-index 2
                    background rgba(0, 0, 0, .4)

                    .btn-play
                        width 50px
                        height 50px
            .info
                text-align left
                .title
                    margin 10px 0
</style>
