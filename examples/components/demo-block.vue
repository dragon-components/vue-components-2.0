<template>
  <div class="demo-block"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta" :class="{moveTransition: showCodeArea}" :style="{height: `${codeAreaHeight}px`}">
      <div class="description" v-if="$slots.default" ref="description">
        <slot></slot>
      </div>
      <div class="highlight" ref="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="demo-block-control" @click="switchShowCodeArea">
       <Icon :type="hovering ? 'md-arrow-dropup' : 'md-arrow-dropdown'" :class="{hovering: hovering}" :size="22"/>
      <transition name="text-slide">
        <span v-show="hovering" class="control-tip" :class="{hovering: hovering}">{{showCodeArea?'隐藏代码':'显示代码'}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'demo-block',
  data () {
    return {
      showCodeArea: false,
      codeAreaHeight: 0,
      hovering: false
    }
  },

  components: {},

  computed: {
  },

  methods: {
    switchShowCodeArea () {
      this.showCodeArea = !this.showCodeArea
      this.$eventBus.$emit('codeAreaChange', this.showCodeArea)
      if (this.showCodeArea) {
        this.codeAreaHeight = this.computeCodeAreaHeight()
        return
      }
      this.codeAreaHeight = 0
    },
    computeCodeAreaHeight () {
      let descriptionHeight = 0
      let highlightHeight = 0
      if (this.$refs.description) {
        descriptionHeight = this.$refs.description.clientHeight + 20
      }
      if (this.$refs.highlight) {
        highlightHeight = this.$refs.highlight.clientHeight
      }
      return descriptionHeight + highlightHeight
    }
  }
}

</script>
<style lang='less'>
.demo-block{
  margin-bottom: 24px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .3s;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }
  .hljs{
    background-color: #fafafa;
  }
  .meta{
    border-top: 1px solid #eaeefb;
    overflow: hidden;
    height: 0;
    transition: none;
  }
  .moveTransition{
    transition: height .2s;
  }
  .description{
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
  }
  .source {
    box-sizing: border-box;
    padding: 24px;
    background-color: #fff;
  }
  .demo-block-control{
    border-top: 1px solid #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
    padding-top: 10px;
    .ivu-icon{
      transition: .3s;
    }
    .hovering {
      transform: translateX(-40px);
      color: #409eff;
    }
    .control-tip{
      position: absolute;
      transform: translateX(-30px);
      transition: .3s;
    }
    & .text-slide-enter,
    & .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
  }
}
</style>
