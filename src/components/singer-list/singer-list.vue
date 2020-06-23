<template>
    <ul class="singer-list flex flex-wrap">
        <li class="singer-item img-scale-hover" v-for="(singer,index) in singers" :key="index">
            <div class="singer-inner text-hv" @click="$router.push(`/music/artist/${singer.id}`)">
                <div class="img-box img-scale">
                    <img :src="`${singer.img1v1Url}?param=240y240`" alt="歌手主图">
                </div>
                <div class="info flex justify-between">
                    <span class="name">{{singer.name}}</span>
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
        margin 5px 0
        .img-box
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
