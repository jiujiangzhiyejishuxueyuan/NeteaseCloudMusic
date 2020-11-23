<template>
    <div id="dynamic" class="container">
      <div class="section-header">
        <div class="section-header-title">
          动态
        </div>
      </div>
      <dynamic-list :list="list"></dynamic-list>
    </div>
</template>

<script>
import dynamicList from '@/components/dynamic-list/dynamic-list'
import {reqDynamic} from "@/api";

export default {
  name: "dynamic",
  components: {
    dynamicList
  },
  data() {
    return {
      userId: '',
      list: []
    }
  },
  created() {
    this.userId = this.$route.query.id
    reqDynamic({uid:this.userId,limit: 10}).then(res => {
      res.events.forEach(item => {
        item.content = JSON.parse(item.json)
        delete item.json
      })
      this.list = res.events
      console.log(this.list)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>