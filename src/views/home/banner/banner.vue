<template>
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
                <img :src="banner.imageUrl+'?param1080y400'" @click="skip(banner)">
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>

    export default {
        props: {
            banners: Array
        },
        data () {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                    },
                    loop : true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },
        mounted() {
            this.mySwiper.slideTo(1, 1000, false)
        },
        methods: {
            skip(banner) {
                let type = {
                    '1': '/music/song',
                    '1004': '/mv',
                    '10': '/music/album',
                    '1014': '/video'
                }
                if (banner.url) {
                    window.open(banner.url)
                } else {
                    this.$router.push(`${type[banner.targetType]}/${banner.targetId}`)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.swiper-container
    margin 20px 0

    .swiper-slide
        img
            width 1080px
        @media screen and (max-width: 1550px)
            img
                width 900px
        @media screen and (max-width: 1200px)
            img
                width 800px
</style>
