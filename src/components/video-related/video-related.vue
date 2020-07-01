<template>
    <div id="video-related">
        <ul class="related-list" v-if="videos.length>=10">
            <li class="related-item flex img-scale-hover" v-for="(item,index) in videos" :key="index">
                <div class="img-box img-scale " :title="item.title">
                    <router-link :to="`/video/${item.vid}`">
                        <img :src="item.coverUrl || item.cover" alt="">
                    </router-link>

                </div>
                <div class="info">
                    <router-link :to="`/video/${item.vid}`" class="title ellipse" :title="item.title">{{item.title}}
                    </router-link>
                    <div class="name" v-if="item.artists&&item.artists.length">
                        <router-link :to="`/music/singer/${art.id}`" class="text-hv" v-for="(art,index) in item.artists"
                                     :key="index">
                            {{art.name}}
                            <span v-if="index+1<item.artists.length">/</span>
                        </router-link>
                    </div>
                    <div class="name" v-else>
                        <router-link :to="`/user/home?id=${user.userId}`" class="text-hv"
                                     v-for="(user,index) in item.creator" :key="index">
                            {{user.userName}}
                            <span v-if="index+1<item.creator.length">/</span>
                        </router-link>

                    </div>

                    <p class="play-count">播放次数:{{(item.playTime || item.playCount) |playCount}}</p>
                </div>
            </li>
        </ul>
        <ul class="related-list related-ske" v-else>
            <li v-for="index in 10" :key="index" class="flex related-item">
                <div class="img-box"></div>
                <div class="info">
                    <div class="title"></div>
                    <div class="name"></div>
                    <div class="play-count"></div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'video-related',
        props: {
            videos: Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #video-related
        width 340px
        text-align left
        @media screen and (max-width: 1200px)
            width 280px

        .related-list
            &.related-ske
                .img-box, .play-count, .title, .name
                    background rgba(0, 0, 0, .05)
                    animation ske .8s linear infinite alternate

                .play-count
                    margin-top 5px
                    width 50%
                    height 10px

                .title
                    cursor auto !important
                    width 100%

                .name
                    width 70%
                    height 12px

        .related-item
            font-size 14px
            margin-bottom 10px

        .img-box
            width 150px
            height 80px

        .info
            margin-left 5px
            width 180px

            .name, .play-count
                font-size 12px
                color #999999

            .title
                cursor pointer
                margin-bottom 5px
                height 36px
                line-height 18px
                font-weight 500
                white-space normal
                word-break break-all
                -webkit-line-clamp 2
                -webkit-box-orient vertical
                display -webkit-box

                &:hover
                    color #00a1d6
</style>
