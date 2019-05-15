<template>
  <div :class="'h2w h2w-' + content.theme">
    <div class="h2w__main">
      <block v-for="(item, index) in content.child" :key="index">
        <render :content='item' @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </div>
  </div>
</template>

<script>
import render from './render/index.vue'

export default {
  props: ['content'],
  components: {
    render
  },
  methods: {
    proxyEvent (event, target) {
      this.$emit(event, event, target)
    }
  }
}
</script>
