<template>
  <div class="demo_header">
    <div class="logo_box">
      <img class="logo" src="../assets/images/logo.png">
    </div>
    <search class="search"/>
    <Tabs :value="value" class="tabs" @on-click="changeTab">
        <!-- <TabPane label="文档" name="name1">文档</TabPane> -->
        <!-- <TabPane label="GUI工具" name="name2">GUI工具</TabPane> -->
        <TabPane
          v-for="tab in tabLists"
          :label="tab.name"
          :name="tab.path"
          @click.native="changeTab"
          :key="tab.path">
          {{tab.name}}
        </TabPane>
        <!-- <TabPane label="模板" name="name5">模板</TabPane> -->
        <!-- <TabPane label="生态系统" name="name6">生态系统</TabPane> -->
    </Tabs>
  </div>
</template>

<script>
import navConfig from 'examples/router/navConfig'
import search from './search'

const tabLists = navConfig.map(({ path, name }) => ({ path, name }))

export default {
  name: 'demo-header',
  data () {
    let matche = this.$route.matched[0]
    return {
      tabLists: tabLists,
      value: matche ? matche.path : ''
    }
  },

  components: { search },

  computed: {},

  methods: {
    changeTab (val) {
      this.$router.push(val)
    }
  }
}

</script>
<style lang='less'>
.demo_header{
  overflow: hidden;
  background-color: #fff;
  .logo_box{
    box-sizing: border-box;
    width: 240px;
    height: 100%;
    float: left;
    .logo{
      height: 48px;
      margin: 26px 0 0 50px;
    }
  }
  .search{
    float: left;
    margin-left: 200px;
  }
  .tabs{
    float: right;
    .ivu-tabs-tab{
      padding: 39px 26px;
      color: #555;
      font-size: 16px;
    }
    .ivu-tabs-content{
      display: none;
    }
    .ivu-tabs-bar{
      margin: 0;
      border: none;
    }
    .ivu-tabs-tab-focused{
      color: #2d8cf0;
    }
  }
}
</style>
