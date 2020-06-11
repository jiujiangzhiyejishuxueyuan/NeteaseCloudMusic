<template>
    <div class="recommend-hot recommend-item section">
        <div class="container">
            <div class="section-header flex justify-between">
                <div class="title">
                    <h1>{{title}}</h1>
                </div>
                <div class="more gray">
                    更多
                    <Icon type="ios-arrow-dropright-circle" />
                </div>
            </div>
            <div class="list-box">
                <ul class="list-inner flex flex-wrap justify-between">
                    <li class="item" v-for="(item,index) in list" :key="index">
                        <div class="item-box">
                            <div class="main-box">
                                <img :src="item.coverImgUrl" >
                            </div>
                            <div class="play-box">
                                <img src="../../../static/imgs/btn-play.png" alt="">
                            </div>
                            <p class="play-count">
                                <Icon type="ios-headset" />
                                {{item.playCount | playCount}}
                            </p>
                        </div>
                        <div class="title">
                            {{item.name}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            list:Array,
            title:String
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .gray
        color #999999

    .recommend-item
        min-width 1000px
        .list-inner
            margin-top 20px
            width 100%
            .item
                cursor pointer
                width 14%
                margin-bottom 20px
                padding 0 10px 10px
                &:hover .main-box img
                    transform scale(1.1)
                &:hover .play-box
                    display block
                .play-count
                    position absolute
                    top 6px
                    right 5px
                    padding 0 8px
                    line-height 24px
                    color #fff
                    border-radius 12px
                    text-align center
                    background rgba(0,0,0,.4)
                    font-size 12px
                    z-index 1
                .title
                    margin-top 15px
                    line-height 18px
                    color #666
                    white-space nowrap
                    text-overflow ellipsis
                    overflow hidden
                .item-box
                    position relative
                .play-box
                    display none
                    position absolute
                    top 50%
                    left 50%
                    transform translate(-50%,-50%)
                .main-box
                    width 100%
                    height 180px
                    overflow hidden
                    border-radius 8px
                    img
                        width 100%
                        height 100%
                        transition .4s



</style>
