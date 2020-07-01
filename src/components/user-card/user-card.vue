<template>
    <div class="user-card flex" v-if="user.profile">
        <a class="img-box" :href="`/user/home?id=${user.profile.userId}`" target="_blank">
            <img :src="user.profile.avatarUrl" title="查看主页">
        </a>
        <div class="info">
            <router-link class="name" :to="`/user/home?id=${user.profile.userId}`">{{user.profile.nickname}}
            </router-link>
            <div @click="follow(1)" class="btn-follow" v-if="!user.profile.followed">
                <Icon type="md-add"/>
                关注
            </div>
            <div @click="follow(0)" class="btn-follow disabled" v-else>
                <span class="h">已关注</span><span class="hf">取消关注</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {follow, reqUserInfo} from "@/api";

    export default {
        props: {
            id: Number
        },
        data() {
            return {
                user: ''
            }
        },
        methods: {
            //关注
            follow(t) {
                if (t) {
                    this.$Message.success('关注成功')
                    this.user.profile.followed = true
                } else {
                    this.$Message.success('取消关注成功')
                    this.user.profile.followed = false
                }
                follow(this.user.profile.userId, t)
            }
        },
        created() {
            reqUserInfo(this.id).then(res => {
                this.user = res
            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #00a1d6
    $blueh = #00b5e5
    .user-card
        .img-box
            width 50px
            height 50px
            border-radius 50%
            overflow hidden
            margin-right 10px

        .btn-follow
            cursor pointer
            color #fff
            text-align center
            padding 3px 10px
            width 80px
            background $blue

            .hf
                display none

            &:hover
                background $blueh

            &.disabled
                background #999999

                &:hover
                    .h
                        display none

                    .hf
                        display inline
</style>
