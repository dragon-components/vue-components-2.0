<template>
  <Layout class="layout">
        <Header>
          <demo-header class="header"/>
        </Header>
        <Layout>
            <Sider hide-trigger :width="350">
              <slider-nav></slider-nav>
            </Sider>
            <Content ref="demoContent">
              <router-view/>
              <footer-nav/>
            </Content>
            <transition name="fade">
              <div class="backTop" @click="backTop" v-show="showBackTop">
                <Icon type="md-arrow-dropup" :size="24"/>
              </div>
            </transition>
        </Layout>
    </Layout>
</template>

<script>
import sliderNav from 'examples/components/slider-nav'
import footerNav from 'examples/components/footer-nav'
import demoHeader from 'examples/components/demo-header'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'layout',
  data () {
    return {
      $container: null,
      showBackTop: false,
      ps: {}
    }
  },

  components: { sliderNav, footerNav, demoHeader },

  computed: {},

  methods: {
    backTop () {
      this.container.scrollTop = 0
    },
    listenScrollY () {
      this.showBackTop = this.container.scrollTop > 200
    },
    updateScrollbar () {
      this.$nextTick(() => {
        this.ps.update()
      })
    }
  },

  mounted () {
    this.container = this.$refs.demoContent.$el
    /* eslint-disable no-new */
    this.ps = new PerfectScrollbar(this.container, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
    this.container.addEventListener('ps-scroll-y', this.listenScrollY)
    this.$eventBus.$on('codeAreaChange', this.updateScrollbar)
  },

  beforeDestroy () {
    this.$eventBus.$off('codeAreaChange', this.updateScrollbar)
  },

  watch: {
    '$route.path' () {
      this.backTop()
    }
  }
}

</script>
<style lang='less'>
.layout{
  .backTop{
    position: fixed;
    right: 100px;
    bottom: 150px;
    background-color: #ffffff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
    &:hover{
      background-color: #f2f6fc;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
