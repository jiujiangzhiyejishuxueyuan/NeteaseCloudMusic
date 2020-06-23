<template>
    <ul class="playlists-list">
        <li class="playlist flex" v-for="(playlist,index) in playlists" :key="index">
            <div class="img-box">
                <img :src="playlist.coverImgUrl+'?param=100y100'" alt="">
            </div>
            <div class="info">
                <div class="name">{{playlist.name}}</div>
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
        padding 0 0 7px 20px
        .playlist
            padding 10px 0
            .img-box
                width 70px
                height 70px
</style>
