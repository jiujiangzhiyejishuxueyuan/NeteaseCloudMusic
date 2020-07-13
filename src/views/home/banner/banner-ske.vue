<template>
    <div class="banner-ske flex align-center justify-between">
        <div class="left-btn btn"></div>
        <div class="center"></div>
        <div class="right-btn btn"></div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $h = rgba(0,0,0,.05)
    .banner-ske
        margin-top 20px
        .btn,.center
            background  $h
            animation ske .8s  linear infinite alternate
        .left-btn,.right-btn
            width 40px
            height 40px
            border-radius 5px
        .center
            width 1080px
            height 400px
            @media screen and (max-width: 1550px)
                width 900px
                height 333px
            @media screen and (max-width: 1200px)
                width 800px
                height 300px
</style>
