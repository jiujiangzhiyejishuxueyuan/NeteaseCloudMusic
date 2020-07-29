<template>
    <ul class="user-list flex flex-wrap">
        <li class="user-item flex justify-between" v-for="(user,index) in users" :key="index">
            <div class="left flex">
                <div class="user-avatar">
                    <a :title="user.nickname"><img :src="user.avatarUrl" alt=""></a>
                </div>
                <div class="info">
                    <a class="user-name text-hv">{{user.nickname}}</a>
                    <p class="description">
                        {{user.description}}
                    </p>
                </div>
            </div>
            <div class="right flex">
                <div class="control">
                    <a class="followed" v-if="user.followed" @click="follow(user,0)">
                        已关注
                    </a>
                    <a class="follow" v-else @click="follow(user,1)">
                        <Icon type="md-add" />关注
                    </a>

                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    import {follow} from "@/api";

    export default {
        props: {
            users: Array,
        },
        methods: {
            follow(user,t) {
                follow(user.userId,t).then(() => {
                    user.followed = !user.followed
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $red = #E91E63
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

            .control
                margin 0 15px
                a
                    text-align center
                    cursor pointer
                    display block
                    padding 4px 0
                    width 80px
                    margin-left 20px
                    border-radius 5px
                    border 2px solid rgba(0,0,0,.4)
                    &:hover
                        color #fff
                        background $red
                        border-color $red
        .user
            color: #000;
</style>
