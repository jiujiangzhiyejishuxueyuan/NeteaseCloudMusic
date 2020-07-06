<template>
    <div id="singer">
        <singer-header/>
        <router-view></router-view>
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

</style>