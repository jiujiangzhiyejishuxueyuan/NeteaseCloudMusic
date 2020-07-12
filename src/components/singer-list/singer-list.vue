<template>
    <ul class="singer-list flex flex-wrap">
        <li class="singer-item img-scale-hover" v-for="(singer,index) in singers" :key="index">
            <div class="singer-inner text-hv">
                <div class="img-box img-scale">
                    <router-link :to="`/music/artist/${singer.id}`">
                        <img :src="`${singer.img1v1Url}?param=240y240`" alt="歌手主图">
                    </router-link>
                </div>
                <div class="info flex justify-between">
                    <router-link class="name" :to="`/music/artist/${singer.id}`">{{singer.name}}</router-link>
                    <router-link class="user" v-if="singer.accountId" :to="`/user/home?id=${singer.accountId}`">
                        <Icon type="md-person"/>
                    </router-link>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
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

        .img-box
            border-radius 10px
            cursor pointer
        .info
            padding 15px 5px
            .name
                cursor pointer
            .user
                cursor: pointer;
                color red
    .wocao
        content ''
</style>
