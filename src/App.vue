<template>
  <div id="app" class="flex direction-column">
    <my-header v-if="!$route.meta.hidden"/>
    <transition name="view"><router-view class="center expend" v-if="isRouterActive"></router-view></transition>
    <BackTop :duration="800"/>
    <my-footer v-if="!$route.meta.hidden && !$route.meta.hiddenFooter"/>
  </div>
</template>

<script>
import myHeader from '@/components/my-header/my-header'
import myFooter from '@/components/my-footer/my-footer'
export default {
  name: 'App',
  components: {
    myHeader,
    myFooter
  },
  provide() {
    return {
      reload:this.reload
    }
  },
  data() {
    return {
      isRouterActive:true
    }
  },
  methods: {
    reload() {
      this.isRouterActive = false
      this.$nextTick(()=> {
        this.isRouterActive = true
      })
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/style/sty.styl"
  @import "./common/style/media.styl"
  .view-enter-active,.view-leave-active
    transition opacity .5s
  .view-enter,.view-leave-to
    opacity 0
  html,body
    padding 0
    margin 0
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height 100vh
  .ivu-page
    margin-bottom 20px
    .ivu-page-prev,.ivu-page-next
      border none
    .ivu-page-item
      border none
      border-radius 50%
      &:hover
        background #E91E63
        a
          color #fff
    .ivu-page-item-active
      background #E91E63
      a
        color #fff

</style>
