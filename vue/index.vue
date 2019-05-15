<template>
  <div>
    <Entry :content='article' @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
  </div>
</template>

<script>
import Towxml from '../main'
import '../style/main.wxss'
import '../style/theme/light.wxss'
import '../style/theme/dark.wxss'
import Entry from './entry.vue'

export default {
  data () {
    return {
      article: ''
    }
  },
  props: ['data', 'mode', 'base', 'theme', 'init'],
  created () {
    this.towxml()
  },
  watch: {
    data (newV, oldV) {
      this.towxml()
    }
  },
  components: {
    Entry
  },
  methods: {
    towxml () {
      const instance = new Towxml()
      // 默认 markdown
      let data = instance.toJson(this.data ? this.data : '', this.mode ? this.mode : 'markdown')
      // 传入 base 才进行这步操作
      if (this.init) {
        data = instance.initData(data, {
          base: this.base ? this.base : '',
          app: this
        })
      }
      // 默认 main
      data.theme = this.theme ? this.theme : ''
      this.article = data
    },
    proxyEvent (event, target) {
      this.$emit(event, target)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
