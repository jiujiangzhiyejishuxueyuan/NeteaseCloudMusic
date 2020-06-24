<template>
    <div v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
            <div class="swiper-slide"  v-for="(banner,index) in banners" :key="index">
                <img :src="banner.imageUrl" @click="skip(banner)">
            </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
        <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
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
                this.$Message.success(`跳转${banner.targetType}类${banner.targetId}号`)
                if(banner.url) {
                    window.open(banner.url)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.swiper-container
    margin 20px 0
</style>
