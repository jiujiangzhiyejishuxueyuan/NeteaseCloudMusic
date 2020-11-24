<template>
    <div id="app" class="flex direction-column">
        <my-header v-if="!$route.meta.hidden"/>
        <transition name="view">
            <router-view class="center expend" v-if="isRouterActive"></router-view>
        </transition>
        <BackTop :duration="800"/>
        <fix-btn v-if="!$route.meta.hidden"/>
        <my-footer v-if="!$route.meta.hidden && !$route.meta.hiddenFooter"/>
    </div>
</template>

<script>
    import myHeader from '@/components/my-header/my-header'
    import myFooter from '@/components/my-footer/my-footer'
    import FixBtn from "./components/fix-btn/fix-btn";

    export default {
        name: 'App',
        components: {
            FixBtn,
            myHeader,
            myFooter
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterActive: true
            }
        },
        methods: {
            reload() {
                this.isRouterActive = false
                this.$nextTick(() => {
                    this.isRouterActive = true
                })
            }
        },
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/style/sty.styl"
    @import "./common/style/media.styl"
    .start
        width 100vw
        height 100vh

    .playlist-all-btn-play
        z-index 20
        transition all .4s
        opacity 0
        width 60px
        height 60px
        border-radius 50%
        cursor pointer
        @media screen and (max-width: 1550px)
            width 50px
            height 50px
        @media screen and (max-width: 1200px)
            width 40px
            height 40px

        img
            width 100%
            height 100%

        &:hover
            background #000


    .view-enter-active, .view-leave-active
        transition opacity .2s

    .view-enter, .view-leave-to
        opacity 0

    html, body
        padding 0
        margin 0

    #app
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        min-height 100vh

    .comment-header
        border-bottom 1px solid #e5e9f0
        margin-bottom 20px

        .sort
            display block
            padding 10px 0
            margin-right 20px

            &:hover
                color $blue

            &.active
                color $blue
                border-bottom 1px solid $blue

    .ivu-page
        margin-bottom 20px

        .ivu-page-prev, .ivu-page-next
            border none

        .ivu-page-item
            border none
                border-radius 50%

                &.ivu-page-item-active
                    background #E91E63

                    a
                        color #fff

                &:hover
                    background #E91E63

                    a
                        color #fff


</style>
