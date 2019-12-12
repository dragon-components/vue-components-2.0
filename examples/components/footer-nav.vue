<template>
  <div class="footer-nav">
    <div class="btn per_nav_btn" v-if="perNav">
      <router-link :to="perNav.path">
        <Icon type="ios-arrow-back" />
        <span>{{perNav.name}}</span>
      </router-link>
    </div>
    <div class="btn next_nav_btn" v-if="nextNav">
      <router-link :to="nextNav.path">
        <span>{{nextNav.name}}</span>
        <Icon type="ios-arrow-forward" />
      </router-link>
    </div>
  </div>
</template>

<script>
import navConfig from 'examples/router/navConfig'

export default {
  name: 'footerNav',
  data () {
    return {
    }
  },

  components: {},

  computed: {
    routePath () {
      return this.$route.path
    },
    navList () {
      let lists = navConfig.map(item => item.children)
      return [].concat(...lists)
    },
    perNav () {
      return this.navList.find((item, index) => {
        return (this.navList[index + 1] || {}).path === this.routePath
      })
    },
    nextNav () {
      return this.navList.find((item, index) => {
        return (this.navList[index - 1] || {}).path === this.routePath
      })
    }
  },

  methods: {}
}

</script>
<style lang='less'>
.footer-nav{
  overflow: hidden;
  margin: 10px 0 60px 0;
  font-size: 14px;
  .per_nav_btn{
    float: left;
  }
  .next_nav_btn{
    float: right;
  }
  a {
    color: #333;
  }
  .btn{
    .ivu-icon{
      color: #999;
    }
    span{
      padding: 0 5px;
    }
    &:hover{
      a{
        color: #409EFF;
      }
      .ivu-icon{
        color: #409EFF;
      }
    }
  }
}
</style>
