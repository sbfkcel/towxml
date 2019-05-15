<template>
  <block>
    <block v-if="content.node === 'text'">{{content.text}}</block>
    <view v-if="content.node === 'element' && content.tag === 'view'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </view>
    <video v-if="content.node === 'element' && content.tag === 'video'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :poster="content.attr['poster']" :src="content.attr['src']">
    </video>
    <text v-if="content.node === 'element' && content.tag === 'text'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </text>
    <image v-if="content.node === 'element' && content.tag === 'image'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :src="content.attr['src']" :mode="content.type === 'audio' ? '' : 'widthFix'">
    </image>
    <navigator v-if="content.node === 'element' && content.tag === 'navigator'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :url="content.attr.href">
    </navigator>
    <swiper v-if="content.node === 'element' && content.tag === 'swiper'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </swiper>
    <swiper-item v-if="content.node === 'element' && content.tag === 'swiper-item'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </swiper-item>
    <block v-if="content.node === 'element' && content.tag === 'block'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </block>
    <form v-if="content.node === 'element' && content.tag === 'form'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </form>
    <input v-if="content.node === 'element' && content.tag === 'input'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']"/>
    <textarea v-if="content.node === 'element' && content.tag === 'textarea'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </textarea>
    <button v-if="content.node === 'element' && content.tag === 'button'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </button>
    <checkbox-group v-if="content.node === 'element' && content.tag === 'checkbox-group'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" @change="content.attr['bindchange']">
    </checkbox-group>
    <checkbox v-if="content.node === 'element' && content.tag === 'checkbox'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :checked="content.attr['checked']" :value="content.attr['value']">
    </checkbox>
    <radio-group v-if="content.node === 'element' && content.tag === 'radio-group'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </radio-group>
    <radio v-if="content.node === 'element' && content.tag === 'radio'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :checked="content.attr['checked']">
    </radio>
  </block>
</template>

<script>
export default {
  props: ['content'],
  methods: {
    proxyEvent (event, target) {
      this.$emit(event, event, target)
    }
  }
}
</script>
