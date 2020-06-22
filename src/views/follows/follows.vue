<template>
    <div id="follows" class="container">
        <div class="section-header">
            <div class="section-header-title">
                关注({{user&&user.follows}})
            </div>
        </div>
        <user-list :users="follows"/>
        <Page
                :total="user&&user.follows"
                :page-size="20"
                @on-change="(page) => $router.replace(`/user/follows?id=${id}&page=${page}`)"
                :current="parseInt($route.query.page)||1"
                v-if="user&&user.follows>20"
        />
    </div>
</template>

<script>
    import {reqUserFollows} from "@/api";
    import userList from '@/components/user-list/user-list'
    export default {
        props: {
            user:Object
        },
        components: {
            userList
        },
        data() {
            return {
                id: '',
                follows: [],
            }
        },
        watch: {
            $route() {
                this.render()
            }
        },
        methods: {
            render() {
                this.id = this.$route.query.id
                let page = this.$route.query.page || 1
                let limit = 20
                let offset = (page-1) * limit
                console.log(page)
                reqUserFollows(this.id,limit,offset).then(res => {
                    console.log(res)
                    this.follows = res.follow
                })
            }
        },
        created() {
            this.render()
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
