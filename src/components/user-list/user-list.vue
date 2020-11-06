<template>
    <ul class="user-list flex flex-wrap">
        <li class="user-item flex justify-between" v-for="(user,index) in users" :key="index">
            <div class="left flex">
                <div class="avatar" @click="$router.push(`/user/home?id=${user.userId}`)" :title="user.nickname">
                    <img v-lazy="user.avatarUrl+'?param=80y80'" alt="头像">
                </div>
                <div class="info">
                    <p class="name"><a @click="$router.push(`/user/home?id=${user.userId}`)"> {{user.nickname}}</a></p>
                    <p class="count">
                        <span class="event-count">动态 <a>{{user.eventCount}} </a></span>|
                        <span class="follow-count">关注 <a @click="$router.push(`/user/follows?id=${user.userId}`)">{{user.follows}} </a></span>|
                        <span class="followed-count">被关注 <a @click="$router.push(`/user/followeds?id=${user.userId}`)">{{user.followeds}} </a></span>
                    </p>
                    <p class="signature ellipse" :title="user.signature">{{user.signature}}</p>
                </div>
            </div>
            <div class="right">

            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'user-list',
        props: {
            users: Array
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    $red = #E91E63
    $blue = #00a1d6
    $blueh = #00b5e5
    .user-list
        width 100%
        text-align left
        .user-item
            padding 20px 10px
            width 50%
            .info
                margin-left 20px
                width 400px
                .signature
                    margin-top 9px
                .count
                    margin-top 9px
                    font-size  10px
                a
                    color $blue
                    &:hover
                        color $blueh
            .avatar
                cursor pointer
                width 80px
                height 80px
                overflow hidden
                img
                    width 100%
                    height 100%
    .wocao
        color #999999
</style>
