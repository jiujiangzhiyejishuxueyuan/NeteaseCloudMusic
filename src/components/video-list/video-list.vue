<template>
    <ul class="video-list flex flex-wrap">
        <li class="video-item img-scale-hover" v-for="(video,index) in videos" :key="index">
            <a :href="video.type!==0?`/video/${video.vid}`:`/mv/${video.vid}`" target="_blank">
                <div class="img-box img-scale">
                    <img :src="video.coverUrl+'?param=360y200'" alt="" :title="video.title">
                </div>
                <p class="title ellipse text-hv">{{video.title}}</p>
            </a>
            <p class="name flex" v-if="video.creator">
                <i class="mv" v-if="video.type===0"></i>
                <span class="by" v-else>by</span>

                <span class="users" v-if="video.creator.length">
                    <router-link
                            :to="video.type!==0?`/user/home?id=${art.userId}`:`/music/artist/${art.userId}`"
                            class="text-hv ellipse"
                            v-for="(art,index) in video.creator"
                            :key="index"
                    >
                        {{art.userName}}
                        <span v-if="index+1<video.creator.length">/</span>
                    </router-link>
                </span>
                <a class="text-hv ellipse" :href="`/user/home?id=${video.creator.userId}`" target="_blank" v-else>{{video.creator.nickname}}</a>
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            videos: Array
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .video-list
        text-align left
        .video-item
            width 20%
            padding 0 20px
            margin-bottom 20px

            .img-box
                height 130px
                @media screen and (max-width: 1550px)
                    height 107px
                @media screen and (max-width: 1200px)
                    height 84px

            .title
                margin 10px 0 5px

            .mv
                display block
                width 30px
                height 18px
                background url("../../static/imgs/icon.png") -270px -478px no-repeat

            .by
                color #999
                margin-right 7px

            .name
                a
                    display block
    .disabled
        color: #000;
</style>
