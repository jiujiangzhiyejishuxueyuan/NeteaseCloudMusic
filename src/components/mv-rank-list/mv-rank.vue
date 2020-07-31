<template>
    <ul class="mv-rank-list flex flex-wrap" v-if="mvs.length">
        <li class="mv-rank-item flex" v-for="(mv,index) in mvs" :key="index">
            <div class="index flex direction-column justify-center">
                <div class="num">{{index+1}}</div>
                <div class="change">
                    <span v-if="mv.lastRank-index>1" class="up">{{'+'+(mv.lastRank-index-1)}}</span>
                    <span v-else-if="mv.lastRank-index<1" class="low">{{'-'+(mv.lastRank-index-1)}}</span>
                    <span v-else>-</span>
                </div>
            </div>
            <div class="cover img-box img-scale" :title="mv.name">
                <a :href="`/mv/${mv.id}`" target="_blank">
                    <img :src="mv.cover+'?param=400y200'" alt="">
                </a>
            </div>
            <div class="info" v-if="mv.artists">
                <a :href="`/mv/${mv.id}`" target="_blank" class="name text-hv ellipse" :title="mv.name">{{mv.name}}</a>
                <p class="arts ellipse text-wrap">
                    <a target="_blank" :href="`/music/artist/${art.id}`" class="art text-hv"
                       v-for="(art,index) in mv.artists" :key="index" :title="art.name">
                        {{art.name}}
                        <i v-if="index<mv.artists.length-1">/</i>
                    </a>
                </p>
            </div>
        </li>
    </ul>
    <ul class="mv-rank-ske mv-rank-list flex flex-wrap" v-else>
        <li class="mv-rank-item flex align-center" v-for="index in 10" :key="index">
            <div class="index"></div>
            <div class="inner cover"></div>
            <div class="info">
                <div class="name"></div>
                <div class="art"></div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "mv-rank-list",
        props: {
            mvs: Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mv-rank-list
        .mv-rank-item
            width 50%
            padding 0 20px
            margin-bottom 30px

            .cover
                box-sizing content-box
                margin  20px
                width 250px
                height 125px
                @media screen and (max-width: 1200px)
                    width 220px
                    height 110px

            .info
                text-align left
                padding 20px
                width 45%
                max-height 136px

                .arts
                    max-height 65px

                .name
                    display block
                    margin-bottom 10px

            .index
                width 10%

                .change
                    margin-top 5px

                    .up
                        color #E91E63

                    .low
                        color #00b5e5

                .num
                    font-style italic
                    font-size 30px

    .mv-rank-ske
        .mv-rank-item
            padding 0 !important

            .info
                margin-bottom 9%

            .index
                height 50px

            .cover
                margin 20px
                padding 0

            .name
                width 80%
                height 20px

            .art
                width 60%
                height 28px

            .inner, .name, .art, .index
                animation ske .8s linear infinite alternate
                background rgba(0, 0, 0, .06)
</style>