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
    @keyframes myfirst
        0%   {background: rgba(0,0,0,.06);}
        25%  {background: rgba(0,0,0,.08);}
        100% {background: rgba(0,0,0,.12);}
    #ske.container
        .title,.info,.inner
            animation myfirst .8s  linear infinite alternate
        .ske-header
            height 60px
            .title
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
