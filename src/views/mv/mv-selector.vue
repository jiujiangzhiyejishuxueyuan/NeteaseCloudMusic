<template>
    <div id="mv-selector" class="flex">
        <span class="mv-selector-title">{{title}}: </span>
        <ul class="mv-selector-list flex flex-wrap">
            <li
                    class="mv-selector-item" v-for="(item,index) in list"
                    @click="change(item)"
                    :key="index"
                    :class="{active:$route.query[query]===item}"
            >
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "mv-selector",
        props: {
            list: Array,
            title: String,
            query: String
        },
        methods: {
            change(value) {
                let query = {...this.$route.query}
                query[this.query] = value
                this.$router.replace({path: '/mv/all', query})
                this.$emit('change', value)
            },
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    #mv-selector
        color #999

        .mv-selector-list
            margin-left 10px

            .mv-selector-item
                cursor pointer
                line-height 27px
                padding 0 10px

                &:hover
                    color #333

                &.active
                    border-radius 5px
                    background #00a1d6
                    color #fff

                    &:hover
                        color #fff

        .mv-selector-title
            color #333
            font-size 18px

</style>