<template>
    <div id="header-info-ske" :class="{s:s}">
        <div class="container flex info-inner">
            <div class="cover header-info-img"></div>
            <div class="info">
                <div class="name"></div>
                <div class="creator"></div>
                <div class="time"></div>
                <div class="desc"></div>
                <div class="control flex" v-if="!s">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "header-info-ske",
        props: {
            s: Boolean
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #header-info-ske
        padding 50px 0

        &.s
            padding 0

        .cover, .name, .creator, .desc, .time, .control div
            animation ske .8s linear infinite alternate

        .info
            width 75%
            margin-left 30px
            position relative

            .control
                position absolute
                bottom 20px

                div
                    width 130px
                    margin-right 30px
                    height 40px
                    border-radius 20px

            div
                height 22px

            .name
                width 250px
                height 40px

            .creator
                margin-top 30px
                width 120px

            .time
                margin-top 10px
                width 130px

            .desc
                margin-top 10px
                width 50%
</style>