<template>
    <ul class="playlists-list">
        <li class="playlist"
            v-for="(playlist,index) in playlists"
            :key="index"
            :class="{active: $route.query.id == playlist.id}"
        >
            <router-link :to="`/my/m/playlist?id=${playlist.id}`" class="flex">
                <div class="img-box">
                    <img :src="playlist.coverImgUrl+'?param=100y100'" alt="">
                </div>
                <div class="info">
                    <div class="name ellipse" :title="playlist.name">{{playlist.name}}</div>
                    <p class="count">
                        {{playlist.trackCount}}首
                        <span class="by ellipse" v-if="!isCreator" :title="playlist.creator.nickname"> by {{playlist.creator.nickname}}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            playlists: Array,
            isCreator: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .playlists-list
        .playlist
            padding 5px 0 0 20px
            margin 3px 0
            cursor pointer

            &.active, &:hover
                background rgba(0, 0, 0, .05)

            .info
                width 190px
                margin-left 10px

                .name
                    width 160px

                .by
                    max-width 100px
                    margin-left 10px

                .count
                    margin-top 5px
                    color #999
                    font-size 12px

            .img-box
                width 50px
                height 50px
</style>
