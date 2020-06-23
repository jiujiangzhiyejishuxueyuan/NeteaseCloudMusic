<template>
    <div id="my-mv">
        <div class="section-header bb">
            <span class="title">我的视频(<span class="count">{{videos.count}}</span>)</span>
        </div>
        <video-list :videos="videos.data" v-if="videos.data"/>

    </div>
</template>

<script>
    import {reqSubMv} from "@/api";
    import VideoList from "@/components/video-list/video-list";

    export default {
        components: {VideoList},
        data() {
            return {
                videos: ''
            }
        },
        created() {
            reqSubMv(999).then(res => {
                this.videos = res
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #my-mv
        .section-header
            margin-bottom 20px
        .wocao
            color #000
</style>
