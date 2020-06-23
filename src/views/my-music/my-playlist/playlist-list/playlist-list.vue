<template>
    <ul class="playlists-list">
        <li class="playlist flex"
            v-for="(playlist,index) in playlists"
            :key="index"
            @click="$router.replace(`${$route.path}?id=${playlist.id}`)"
            :class="{active: $route.query.id == playlist.id}"
        >
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
            padding 10px 0 10px 20px
            cursor pointer
            &.active,&:hover
                background rgba(0,0,0,.05)
            .info
                width 190px
                padding 5px 0
                margin-left 10px
                .by
                    max-width 100px
                    margin-left 10px

                .count
                    margin-top 20px
                    color #999
                    font-size 12px
            .img-box
                width 70px
                height 70px
</style>
