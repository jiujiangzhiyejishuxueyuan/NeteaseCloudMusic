<template>
    <ul class="mv-list flex flex-wrap">
        <li class="mv-item img-scale-hover" v-for="(mv,index) in mvs" :key="index">
            <div class="img-box img-scale">
                <img :src="mv.cover" alt="">
                <div class="shadow">
                    <div class="btn-play absolute-center">
                        <img src="../../static/imgs/btn-play.png" alt="">
                    </div>
                </div>

            </div>
            <div class="info">
                <p class="title ellipse text-hv">{{mv.name}}</p>
                <a class="name text-hv">{{mv.artistName}}</a>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            mvs: Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .mv-list
        .mv-item
            width 20%
            padding 0 10px
            margin-bottom 20px
            transition all .2s
            &:hover
                .shadow
                    opacity 1 !important
            .img-box
                position relative
                .shadow
                    opacity 0
                    position absolute
                    top 0
                    left 0
                    width 100%
                    height 100%
                    z-index 2
                    background rgba(0,0,0,.4)
                    .btn-play
                        width 50px
                        height 50px
            .info
                text-align left
                .title
                    margin 10px 0
</style>
