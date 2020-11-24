<template>
    <div id="my-dj">
        <div class="section-header bb">
            <span class="title">我订阅的电台(<span class="count">{{djs.count}}</span>)</span>
        </div>
        <ul class="dj-list">
            <li class="dj flex" v-for="(dj,index) in djs.djRadios" :key="index">
                <div class="img-box">
                    <img :src="dj.picUrl" alt="">
                </div>
                <div class="info expend">
                    <a class="name">{{dj.name}}</a>
                    <p class="desc ellipse" :title="dj.desc">{{dj.desc}}</p>
                    <div class="category ">
                        <a class="text-hv">{{dj.category}}</a>
                    </div>
                    <div class="creator">
                        by <a class="text-hv" @click="$router.push(`/user/home?id=${dj.dj.userId}`)">{{dj.dj.nickname}}</a>
                    </div>
                    <div class="count">{{dj.programCount}}期</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {reqSubDj} from "@/api";

    export default {
        data() {
            return {
                djs:''
            }
        },
        created() {
            reqSubDj(999).then(res => {
                this.djs = res

            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    $blue = #00a1d6
    #my-dj
        .dj-list
            .dj
                text-align left
                margin 10px
                padding 15px
                border-radius 10px
                box-shadow 0 0 10px rgba(0,0,0,.1)
                &:hover
                    background rgba(0,0,0,.02)
                .info
                    position relative
                    padding 10px 0
                    margin-left 20px
                    .count
                        position absolute
                        right 10px
                        top 50%
                        height 20px
                        font-size 16px
                        margin-top -10px
                        color rgba(0,0,0,.5)
                    .category
                        color rgba(0,0,0,.5)
                        margin-top 20px
                    .creator
                        color #999999
                        margin-top 10px
                    .name
                        color #000
                        font-size 18px
                        &:hover
                            color $blue
                    .desc
                        height 21px
                        max-width 80%
                        margin-top 10px
                .img-box
                    width 150px
                    height 150px
</style>
