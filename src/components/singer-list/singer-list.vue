<template>
    <ul class="singer-list flex flex-wrap">
        <li class="singer-item img-scale-hover" v-for="(singer,index) in singers" :key="index">
            <div class="singer-inner text-hv">
                <div class="img-box img-scale" @click="$router.push(`/music/artist/${singer.id}`)">
                    <img :src="`${singer.img1v1Url}?param=195y195`" alt="歌手主图">
                </div>
                <div class="info flex justify-between">
                    <span class="name" @click="$router.push(`/music/singer/${singer.id}`)">{{singer.name}}</span>
                    <span class="user" v-if="singer.accountId"  @click="$router.push(`/music/user/${singer.accountId}`)">
                        <Icon type="md-person" />
                    </span>
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
        .img-box
            height 195px
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
