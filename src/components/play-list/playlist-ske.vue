<template>
    <ul class="playlist-ske flex flex-wrap">
        <li class="playlist-ske-item" v-for="index in row*5" :key="index">
            <div class="inner"></div>
            <div class="name"></div>
            <div class="count"></div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            row: {
                type: Number,
                default: 1
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $h = rgba(0, 0, 0, .05)
    .playlist-ske
        .playlist-ske-item
            margin-bottom 20px
            width 20%
            padding 0 10px
            @media screen and (max-width: 1200px)
                div.inner
                    width 172px !important
                    height 172px !important
            @media screen and (max-width: 1500px)
                div.inner
                    width 212px
                    height 212px

            .inner, .name, .count
                animation ske .8s linear infinite alternate
                background $h

            .count
                border-radius 5px
                margin-top 10px
                height 20px
                width 40%

            .name
                border-radius 5px
                margin-top 10px
                width 80%
                height 22px

            .inner
                border-radius 15px
                width 250px
                height 250px
</style>
