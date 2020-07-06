<template>
    <div id="mv-all">
        <div class="mv-all-header container">
            <mv-selector
                    :title="item.title"
                    :query="item.query"
                    :list="item.list"
                    v-for="(item,index) in selector"
                    :key="index"
            />
        </div>
        <div class="mv-all-inner container">
            <mv-list :mvs="mvs" :ske-count="25"/>
        </div>
        <page
                :current="$route.query.page || 1"
                :total="count"
                :page-size="50"
                @on-change="changePage"
        />
    </div>
</template>

<script>
    import MvSelector from "@/views/mv/mv-selector";
    import {reqMv} from "@/api";
    import MvList from "@/components/mv-list/mv-list";

    export default {
        name: "mv-all",
        components: {MvList, MvSelector},
        data() {
            return {
                selector: [
                    {title: '地区', query: 'area', list: ['全部', '内地', '港台', '欧美', '日本', '韩国']},
                    {title: '类型', query: 'type', list: ['全部', '官方版', '原声', '现场版', '网易出品']},
                    {title: '排序', query: 'order', list: ['上升最快', '最热', '最新']}
                ],
                mvs: [],
                hasMore: true,
                count: 0
            }
        },
        methods: {
            render() {
                let area = this.$route.query.area || ''
                let type = this.$route.query.type || ''
                let order = this.$route.query.order || '最新'
                let page = this.$route.query.page || 1
                let limit = 50
                let offset = (page - 1) * limit
                this.mvs = []
                reqMv(area, type, order, limit, offset).then(res => {
                    this.mvs = res.data
                    this.hasMore = res.hasMore
                    this.count = res.count
                })
            },
            changePage(page) {
                let query = {...this.$route.query}
                query['page'] = page
                this.$router.replace({path: '/mv/all', query})
            }
        },
        watch: {
            $route() {
                this.render()
            }
        },
        created() {
            this.render()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #mv-all
        .ivu-page-item
            &.ivu-page-item-active
                background #00a1d6 !important

                a
                    color #fff !important

            &:hover
                background #00a1d6 !important

                a
                    color #fff !important
        .mv-all-inner
            margin-top 30px

        #mv-selector
            margin-bottom 10px

        .mv-all-header

            border-bottom 1px solid rgba(0, 0, 0, .1)
            margin-top 20px
</style>