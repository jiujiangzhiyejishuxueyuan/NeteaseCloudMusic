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
                    <a class="mail">
                        <Icon type="ios-mail-outline" />发私信
                    </a>
                    <a class="follow">
                        <Icon type="md-add" />关注
                    </a>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            users: Array,
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

            .count
                color $red
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
        .user
            color: #000;
</style>
