<template>
    <div class="search-tip">
        <div class="song">
            <p class="title">
                <Icon type="ios-musical-notes-outline"/>
                歌曲
            </p>
            <ul class="list"></ul>
        </div>
        <div class="album">
            <p class="title">
                <Icon type="ios-disc-outline"/>
                专辑
            </p>
            <ul class="list"></ul>
        </div>
        <div class="singer">
            <p class="title">
                <Icon type="md-person"/>
                歌手
            </p>
            <ul class="list"></ul>
        </div>
    </div>
</template>

<script>
    import {searchHot, searchSuggest} from "@/api";

    export default {
        props: {
            keywords: String
        },
        watch: {
            keywords(value) {
                console.log('怎么没有')
                if (value) {
                    searchSuggest(value).then(res => {
                        console.log(res)
                    })
                } else {
                    searchHot().then(res => {
                        console.log(res)
                    })
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .search-tip
        padding 10px 15px
        background #fff
        z-index 999
</style>
