<template>
    <div id="user">
        user
    </div>
</template>

<script>
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .user-list
        .user-item
            width 50%
            padding 20px
            text-align left
            transition all .1s

            &:hover
                background rgba(201,187,173,.1)
            .user-avatar
                width 80px
                height 80px
                border-radius 50%
                overflow: hidden;
                margin-right 15px
                img
                    width 100%
                    height 100%

            .count
                color $red
            .fs
                margin 6px 0

            .right
                .detail
                    margin-right 30px
                    line-height 80px
                .control
                    margin 0 15px
                    a
                        padding 3px 5px
                        border 1px #999 solid
                        border-radius 10px
                        display block
                        margin-bottom 10px
                        &:hover
                            color #fff
                            background $red
                            border-color $red
</style>
