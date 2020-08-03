<template>
    <ul class="singer-list flex flex-wrap" v-if="singers.length">
        <li class="singer-item img-scale-hover" v-for="(singer,index) in singers" :key="index">
            <div class="singer-inner text-hv" :title="singer.name">
                <div class="img-box img-scale">
                    <router-link :to="`/music/artist/${singer.id}`">
                        <img :src="`${singer.img1v1Url}?param=240y240`" alt="歌手头像">
                    </router-link>
                </div>
                <div class="info flex justify-between">
                    <router-link class="name" :to="`/music/artist/${singer.id}`">{{singer.name}}</router-link>
                    <router-link class="user" v-if="singer.accountId" :to="`/user/home?id=${singer.accountId}`" title="查看歌手用户页">
                        <Icon type="md-person"/>
                    </router-link>
                </div>
            </div>
        </li>
    </ul>
    <singer-list-ske :num="24" v-else/>
</template>

<script>
    import SingerListSke from "@/components/singer-list/singer-list-ske";
    export default {
        components: {SingerListSke},
        props: {
            singers:Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .singer-list
    .singer-item
        width 16.6%
        padding 0 10px
        margin 5px 0

        .img-box,.cover
            border-radius 10px
            cursor pointer
            width 212px
            height 212px
            @media screen and (max-width: 1550px)
                width 179px
                height 179px
            @media screen and (max-width: 1200px)
                width 146px
                height 146px
        .info
            padding 15px 5px
            .name
                cursor pointer
            .user
                cursor pointer
                color red
                &:hover
                    filter brightness(80%)
</style>
