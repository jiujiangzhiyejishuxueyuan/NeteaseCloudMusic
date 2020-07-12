<template>
    <div id="ske" class="container">
        <div class="ske-header">
            <div class="title"></div>
        </div>
        <ul class="ske-list flex-wrap flex">
            <li class="ske-item" v-for="index in (row*7)" :key="index">
                <div class="inner"></div>
                <div class="info">
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
                default: 1
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $h = rgba(0,0,0,.05)

    #ske.container
        margin-top 20px
        @media screen and (max-width: 1550px)
            .inner
                height 140px !important
            .title
                height 30px !important
                width 100px !important
        @media screen and (max-width: 1200px)
            .inner
                height 120px !important
        .title,.info,.inner
            animation ske .8s  linear infinite alternate
        .ske-header
            .title
                margin 10px 0
                border-radius 10px
                margin-left 10px
                width 120px
                height 40px
                background $h
        .ske-item
            width 14%
            margin-bottom 20px
            padding 0 10px 20px
            .info
                border-radius 10px
                margin-top 10px
                background $h
                height 20px
            .inner
                border-radius 10px
                height 170px
                background  $h
</style>
