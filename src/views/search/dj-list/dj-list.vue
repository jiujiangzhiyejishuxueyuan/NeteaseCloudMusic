<template>
    <ul class="dj-list flex-wrap flex">
        <li class="dj-item" v-for="(dj,index) in djs" :key="index">
            <div class="img-box">
                <img :src="dj.picUrl+'?param=250y250'" alt="">
            </div>
            <div class="info">
                <p class="title ellipse text-hv">{{dj.name}}</p>
                <p class="name"> by<a class="text-hv">{{dj.dj.nickname}}</a></p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            djs: Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .dj-list
        .dj-item
            padding 0 10px
            width 20%
            text-align left
            margin-bottom 20px
            .title
                margin 10px 0 5px
                cursor pointer
            .name
                font-size 12px
                color #999
                a
                    margin-left 5px
                    color #333
    .ivu-select-dropdown
        color #999999
</style>
