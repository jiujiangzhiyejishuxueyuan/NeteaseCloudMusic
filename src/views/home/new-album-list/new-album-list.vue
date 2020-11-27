<template>
  <div id="new-album-list" class="section container my-card">
    <div class="section-header flex justify-between">
      <div class="title">
        <h1>新碟上架</h1>
      </div>
      <div class="more gray">
        更多
        <Icon type="ios-arrow-dropright-circle"/>
      </div>
    </div>
    <div class="album-ske-header" v-if="!albums.length">
      <div class="title"></div>
    </div>
    <album-list :albums="albums"/>
  </div>
</template>

<script>
import {reqNewAlbum} from "@/api";
import AlbumList from "@/components/album-list/album-list";

export default {
  name: "new-album-list",
  components: {AlbumList},
  data() {
    return {
      albums: []
    }
  },
  async created() {
    const albums = await reqNewAlbum(0, 10)
    this.albums = albums.albums
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#new-album-list
  .container
    width initial
  .album-ske-header
    height 60px

    .title
      animation ske .8s linear infinite alternate
      border-radius 10px
      margin-left 10px
      width 120px
      height 40px
      background rgba(0, 0, 0, .05)

  .section-header
    h1
      font-size 28px
</style>