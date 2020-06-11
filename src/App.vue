<template>
  <div id="app">
    <my-header v-if="isRouterActive && !$route.meta.hidden"/>
    <router-view class="center" v-if="isRouterActive"></router-view>
    <my-footer v-if="!$route.meta.hidden"/>
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
  html,body
    padding 0
    margin 0
  #app
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
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
