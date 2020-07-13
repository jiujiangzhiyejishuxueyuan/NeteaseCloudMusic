<template>
    <div class="album-ske container">
        <div class="album-ske-header" v-if="!hiddenHeader">
            <div class="title"></div>
        </div>
        <ul class="album-ske-list flex flex-wrap">
            <li class="album-ske-item" v-for="index in row*5" :key="index">
                <div class="inner"></div>
                <div class="info">
                    <div class="name"></div>
                    <div class="singer"></div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        props: {
            row: {
                type: Number,
                default: () => 2
            },
            hiddenHeader: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $h = rgba(0,0,0,.05)
    .album-ske
        .album-ske-list
            margin-top 10px

        .album-ske-item
            width 20%
            padding 0 25px 20px

            .singer, .inner, .name, .title
                background $h
                animation ske .8s linear infinite alternate

            .info
                margin-top 10px

                .singer
                    margin-top 10px
                    border-radius 10px
                    width 100px
                    height 20px

                .name
                    border-radius 10px
                    width 120px
                    height 25px
            .inner
                border-radius 15px
                height 210px
                width 100%
                @media screen and (max-width: 1550px)
                    height 170px !important
                @media screen and (max-width: 1200px)
                    height 133px !important
        .album-ske-header
            height 60px
            .title
                animation ske .8s  linear infinite alternate
                border-radius 10px
                margin-left 10px
                width 120px
                height 40px
                background $h

</style>
