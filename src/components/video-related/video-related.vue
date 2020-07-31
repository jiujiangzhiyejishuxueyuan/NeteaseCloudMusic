<template>
    <div id="video-related">
        <ul class="related-list" v-if="videos.length>=10">
            <li class="related-item flex" v-for="(video,index) in videos" :key="index">
                <div class="img-box img-scale" :title="video.title">
                    <router-link :to="video.type!==0?`/video/${video.vid}`:`/mv/${video.vid}`">
                        <img :src="(video.coverUrl || video.cover)+'?param=300y170'" alt="">
                    </router-link>
                </div>
                <div class="info">
                    <router-link :to="`/video/${video.vid}`" class="title ellipse" :title="video.title">
                        {{video.title}}
                    </router-link>
                    <div class="name" v-if="video.artists&&video.artists.length">
                        <a :href="`/music/singer/${art.id}`" class="text-hv" v-for="(art,index) in video.artists"
                           :key="index">
                            {{art.name}}
                            <span v-if="index+1<video.artists.length">/</span>
                        </a>
                    </div>
                    <div class="name" v-else>
                        <a
                                target="_blank"
                                :href="video.type!==0?`/user/home?id=${user.userId}`:`/music/artist/${user.userId}`"
                                class="text-hv"
                                v-for="(user,index) in video.creator" :key="index"
                        >
                            {{user.userName}}
                            <span v-if="index+1<video.creator.length">/</span>
                        </a>

                    </div>

                    <p class="play-count">播放次数:{{(video.playTime || video.playCount) |playCount}}</p>
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
        },
        inject: ['reload'],
        watch: {
            $route() {
                this.reload()
            }
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
            height 85px

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
