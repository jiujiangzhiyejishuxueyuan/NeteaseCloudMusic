<template>
    <div id="fix-btn">
        <a class="github" href="https://github.com/jiujiangzhiyejishuxueyuan/NeteaseCloudMusic" target="_blank">
            <Icon type="logo-github"/>
        </a>
        <a class="go-player" href="/music/player" target="_blank">
            <Icon type="md-musical-notes" />
        </a>
    </div>
</template>

<script>
    export default {
        name: "fix-btn",
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #fix-btn
        position fixed
        bottom 80px
        right 30px
        z-index 9999
        font-size 40px
        a
            display block
            background rgba(0,0,0,.5)
            color #fff
            margin-bottom 2px
            z-index 9999
            padding 0 10px
            &:hover
                color #ffffff
                background rgba(0,0,0,.8)

</style>