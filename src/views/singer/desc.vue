<template>
    <div id="desc" v-if="desc">
        <div class="title bb">歌手简介</div>
        <div class="text desc">
            {{desc.briefDesc}}
        </div>
        <div class="section" v-for="(item,index) in desc.introduction" :key="index">
            <div class="m-title">{{item.ti}}</div>
            <div class="text" v-html="item.txt">
            </div>
        </div>
    </div>
    <div class="ske container" v-else>
        <spin/>
    </div>
</template>

<script>
    import {reqSingerDesc} from "@/api";

    export default {
        data() {
            return {
                desc: ''
            }
        },
        created() {
            reqSingerDesc(this.$route.params.id).then(res => {
                res.introduction.map(item => {
                    item.txt = item.txt.replace(/\n/g, '<br>')
                    return item
                })
                this.desc = res

            })
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #desc
        text-align left

        .m-title
            margin 20px 0 10px
            font-size 18px

        .text
            color #666
            letter-spacing 1px
            line-height 25px

        .m-title
            font-weight 500
            color #000

        .title
            margin-bottom 5px
            font-size 24px

        .text.desc
            text-indent 30px


</style>