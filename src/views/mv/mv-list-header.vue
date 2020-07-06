<template>
    <div id="mv-list-header" class="flex">
        <h2 class="title">{{title}}</h2>
        <ul class="area-list flex align-end" v-if="showArea">
            <li
                    class="area-item"
                    :class="{active:item===currentArea}"
                    v-for="(item,index) in list"
                    :key="index"
                    @click="changeArea(item)">
                {{item||'全部'}}
            </li>
        </ul>
        <router-link class="more text-hv" :to="morelink" v-if="!hiddenMore">更多></router-link>
        <p class="more" v-else>更新时间: <span class="time">{{updateTime | dataFormat}}</span></p>
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            list: {
                area: Array,
                default: () => [
                    '',
                    '内地',
                    '港台',
                    '欧美',
                    '日本',
                    '韩国'
                ]
            },
            showArea: Boolean,
            morelink: {
                type: String,
                default: () => '/mv/all'
            },
            hiddenMore: Boolean,
            updateTime: Number
        },
        data() {
            return {
                currentArea: ''
            }
        },
        methods: {
            changeArea(area) {
                this.currentArea = area
                this.$emit('changeArea', area)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #mv-list-header
        padding 5px 0
        position relative
        border-bottom 1px solid rgba(0, 0, 0, .1)
        margin-bottom 10px

        .more
            position absolute
            right 0
            bottom 5px
            font-size 16px

            .time
                font-size 14px
                color #999

        .area-list
            font-size 16px
            margin-left 20px
            color #999

            .area-item
                position relative
                padding 0 10px
                height 25px
                cursor pointer

                &.active, &:hover
                    color #333

                &:last-child:before
                    width 0

                &:before
                    content ''
                    position absolute
                    right 0
                    top 50%
                    transform translateY(-50%)
                    background #999999
                    width 1px
                    height 60%

        .title
            font-size 24px
</style>
