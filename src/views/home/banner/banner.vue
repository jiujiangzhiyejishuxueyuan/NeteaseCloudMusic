<template>
    <div class="swiper-container">
        <div class="swiper-wrapper" v-if="banners.length">
            <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
                <div class="img-box">
                    <img :src="banner.imageUrl+'?param1080y400'" @click="skip(banner)">
                </div>
            </div>
        </div>
        <banner-ske v-else/>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from 'Swiper'
    import bannerSke from '@/views/home/banner/banner-ske'

    export default {
        components: {
            bannerSke
        },
        props: {
            banners: Array
        },
        mounted() {
            var mySwiper = new Swiper('.swiper-container', {
                loop: true, // 循环模式选项
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
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
        .img-box
            margin 0 auto
            width 1080px
            height 400px
        @media screen and (max-width: 1550px)
            .img-box
                width 900px
                height 333px
        @media screen and (max-width: 1200px)
            .img-box
                width 800px
                height 296px
</style>
