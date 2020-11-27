<template>
    <div id="followeds" class="container my-card">
      <div class="section-header">
        <div class="section-header-title">
          被关注({{ user && user.followeds }})
        </div>
      </div>
      <user-list :users="followeds"/>
      <Page
          :total="user&&user.followeds"
          :page-size="20"
          @on-change="(page) => $router.replace(`/user/followeds?id=${id}&page=${page}`)"
                :current="parseInt($route.query.page)||1"

        />
    </div>
</template>

<script>
    import userList from "@/components/user-list/user-list";
    import {reqUserFolloweds} from "@/api";

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
                followeds: [],
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
                let limit = page*20
                let lasttime = -1
                reqUserFolloweds(this.id,limit,lasttime).then(res => {
                    this.followeds = res.followeds.slice(0,20)
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
