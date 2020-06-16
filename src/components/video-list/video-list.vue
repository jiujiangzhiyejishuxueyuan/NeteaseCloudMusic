<template>
    <ul class="video-list flex flex-wrap">
        <li class="video-item img-scale-hover" v-for="(video,index) in videos" :key="index">
            <div class="img-box img-scale" @click="skip(video)">
                <img :src="video.coverUrl" alt="" :title="video.title">
            </div>
            <p class="title ellipse text-hv" @click="skip(video)">{{video.title}}</p>
            <p class="name ellipse flex">
                <span class="by" v-if="video.type">by</span>
                <i class="mv" v-else></i>
                <a class="text-hv" v-for="(art,index) in video.creator" :key="index">
                    {{art.userName}}
                    <span v-if="index+1<video.creator.length">/</span>
                </a>
            </p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            videos: Array
        },
        methods: {
            skip(video) {
                if(video.type) {
                    this.$router.push(`/video/${video.vid}`)
                } else {
                    this.$router.push(`/mv/${video.vid}`)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .video-list
        text-align left
        .video-item
            width 20%
            padding 0 20px
            margin-bottom 20px
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
    .disabled
        color: #000;
</style>
