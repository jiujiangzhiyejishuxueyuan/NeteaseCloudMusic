<template>
    <ul class="mvs-ske flex flex-wrap">
        <li class="mvs-ske-item" v-for="index in count" :key="index">
            <div class="inner"></div>
            <div class="name"></div>
            <div class="art"></div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            count: {
                type: Number,
                default: () => 10
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mvs-ske
        .mvs-ske-item
            width 20%
            padding 0 10px
            margin-bottom 20px
            @media screen and (max-width: 1200px)
                div.inner
                    width 160px !important
                    height 84px !important
            @media screen and (max-width: 1550px)
                div.inner
                    width 200px
                    height 107px

            .name, .art, .inner
                border-radius 5px
                animation ske .8s linear infinite alternate
                background rgba(0, 0, 0, .06)
            wh(w,h,mt)
                height h
                width w
                margin-top mt
            .name
                wh(60%,21px,11px)

            .art
                wh(40%,21px,11px)

            .inner
                wh(260px,150px,0)
</style>
