<template>
    <div id="singer">
        <singer-header/>
        <router-view class="container"></router-view>
    </div>
</template>

<script>
    import SingerHeader from '@/components/singer-header/singer-header'

    export default {
        components: {
            SingerHeader
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #singer
        .singer-title
            text-align left
            margin-bottom 20px
            color #000
            font-size 24px
</style>