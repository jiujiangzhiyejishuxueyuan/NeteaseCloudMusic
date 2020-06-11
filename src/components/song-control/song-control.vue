<template>
    <div class="song-control flex align-center justify-end">
        <span class="item" @click="click(item.event)" v-for="(item,index) in btns" :key="index">
            <Icon :type="item.icon" />
        </span>

    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            btns: Array
        },
        methods: {
            click(type) {
                this.$emit(type)
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .song-control
        text-align center
        line-height 35px
        opacity 0
        font-size 20px
        .item
            display block
            width 35px
            height 35px
            border-radius 50%
            margin-right 5px
            transition all .2s
            cursor pointer
            &:hover
                background rgba(0,0,0,.1)
</style>
