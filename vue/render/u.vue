<template>
  <block>
    <block v-if="content.node === 'text'">{{content.text}}</block>
    <view v-if="content.node === 'element' && content.tag === 'view'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </view>
    <video v-if="content.node === 'element' && content.tag === 'video'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :poster="content.attr['poster']" :src="content.attr['src']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </video>
    <text v-if="content.node === 'element' && content.tag === 'text'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </text>
    <image v-if="content.node === 'element' && content.tag === 'image'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :src="content.attr['src']" :mode="content.type === 'audio' ? '' : 'widthFix'">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </image>
    <navigator v-if="content.node === 'element' && content.tag === 'navigator'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :url="content.attr.href">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </navigator>
    <swiper v-if="content.node === 'element' && content.tag === 'swiper'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </swiper>
    <swiper-item v-if="content.node === 'element' && content.tag === 'swiper-item'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </swiper-item>
    <block v-if="content.node === 'element' && content.tag === 'block'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </block>
    <form v-if="content.node === 'element' && content.tag === 'form'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </form>
    <input v-if="content.node === 'element' && content.tag === 'input'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']"/>
    <textarea v-if="content.node === 'element' && content.tag === 'textarea'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
    </textarea>
    <button v-if="content.node === 'element' && content.tag === 'button'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </button>
    <checkbox-group v-if="content.node === 'element' && content.tag === 'checkbox-group'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" @change="content.attr['bindchange']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </checkbox-group>
    <checkbox v-if="content.node === 'element' && content.tag === 'checkbox'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :checked="content.attr['checked']" :value="content.attr['value']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </checkbox>
    <radio-group v-if="content.node === 'element' && content.tag === 'radio-group'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </radio-group>
    <radio v-if="content.node === 'element' && content.tag === 'radio'" @touchstart='proxyEvent("touchstart", content)' @touchmove='proxyEvent("touchmove", content)' @touchcancel='proxyEvent("touchcancel", content)' @touchend='proxyEvent("touchend", content)' @tap='proxyEvent("tap", content)' :class="content.attr.class" :width="content.attr['width']" :height="content.attr['height']" :data="content.attr['data']" :id="content.attr['id']" :style="content.attr['style']" :checked="content.attr['checked']">
      <block v-for="item in content.child" :key="item">
        <render :content="item"  @touchstart='proxyEvent' @touchmove='proxyEvent' @touchcancel='proxyEvent' @touchend='proxyEvent' @tap='proxyEvent'/>
      </block>
    </radio>
  </block>
</template>

<script>
import render from './i.vue'

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
