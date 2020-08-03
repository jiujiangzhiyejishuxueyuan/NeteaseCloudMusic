<template>
    <ul class="mv-list flex flex-wrap" v-if="mvs.length">
        <li class="mv-item" v-for="(mv,index) in mvs" :key="index">
            <a :href="`/mv/${mv.id}`" target="_blank">
                <div class="img-box video-shadow" :title="mv.name">
                    <img :src="(mv.cover||mv.imgurl16v9||imgurl)+'?param=260y150'" alt="">
                </div>
            </a>
            <div class="info" v-if="mv.artistName">
                <a :href="`/mv/${mv.id}`" target="_blank" class="title ellipse text-hv" :title="mv.name">{{mv.name}}</a>
                <p class="art ellipse" v-if="!hiddenArt">
                    <span class="arts" v-if="mv.artists">
                        <a class="name text-hv"
                           v-for="(art,index) in mv.artists"
                           :href="`/music/artist/${art.id}`"
                           :key="index"
                           target="_blank"
                           :title="art.name"
                        >
                        {{art.name }}
                        <i v-if="index<mv.artists.length-1">/</i>
                    </a>
                    </span>
                    <span v-else>
                        <a
                                target="_blank"
                                :href="`/music/artist/${mv.artist.id}`"
                                class="name text-hv"
                                :title="mv.artist.name"
                        >
                            {{mv.artist.name}}
                        </a>
                    </span>
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
            .img-box
                position relative
                height 150px
                @media screen and (max-width: 1550px)
                    height 107px
                @media screen and (max-width: 1200px)
                    height 84px

            .info
                text-align left
                .title
                    display block
                    margin 10px 0
</style>
