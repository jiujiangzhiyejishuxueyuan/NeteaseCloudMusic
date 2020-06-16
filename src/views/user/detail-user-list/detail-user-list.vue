<template>
    <ul class="user-list flex flex-wrap" v-if="usersDetail.length">
        <li class="user-item flex justify-between" v-for="(user,index) in usersDetail" :key="index">
            <div class="left flex">
                <div class="user-avatar">
                    <a :title="user.profile.nickname"><img :src="user.profile.avatarUrl" alt=""></a>
                </div>
                <div class="info">
                    <a class="user-name">{{user.profile.nickname}}</a>
                    <p class="fs">
                    <span class="dynamic">
                        动态
                        <a class="count">{{user.profile.eventCount}}</a>
                    </span>
                        <span class="follows">
                        关注
                        <a class="count">{{user.profile.follows}}</a>
                    </span>
                        <span class="followed">
                        粉丝
                        <a class="count">{{user.profile.followeds}}</a>
                    </span>
                    </p>
                    <p class="description">
                        {{user.profile.description}}
                    </p>
                </div>
            </div>
            <div class="right flex">
                <div class="detail">
                    <p class="playlistCount">
                        歌单
                        <a class="count">{{user.profile.playlistCount}}</a>
                    </p>
                </div>
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
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
