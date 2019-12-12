<template>
  <div class="search">
    <Select
        v-model="value"
        class="search-input"
        prefix="ios-search"
        filterable
        remote
        @on-query-change="queryChange"
        @on-change="change"
        placeholder="搜索组件"
        :loading="loading">
        <Option v-for="option in options"
        :value="JSON.stringify(option)"
        :key="option.path"
        v-html="getLightName(option)"></Option>
    </Select>
  </div>
</template>

<script>
import { getNavConfigByPath } from 'examples/router/navConfig'

export default {
  name: 'search',
  data () {
    return {
      value: '',
      loading: false,
      options: [],
      query: ''
    }
  },

  components: {},

  computed: {
    typeName () {
      return this.$route.matched[0].path
    },
    config () {
      return getNavConfigByPath(this.typeName)
    },
    navList () {
      let lists = this.config.map(item => item.children)
      return [].concat(...lists)
    }
  },

  methods: {
    matchRule (item, query) {
      const queryLower = query.toLowerCase()
      const isMatchName = item.name.toLowerCase().indexOf(queryLower) > -1
      const isMatchPath = item.path.toLowerCase().indexOf(queryLower) > -1
      return isMatchName || isMatchPath
    },
    queryChange (query) {
      this.query = query
      if (query === '') {
        this.options = []
        return
      }
      this.loading = true
      this.loading = false
      this.options = this.navList.filter((item) => {
        return this.matchRule(item, query)
      })
    },
    heightLight (string) {
      const keyword = this.query
      const reg = new RegExp(keyword, 'gi')
      return string.replace(reg, (txt) => {
        return `<i>${txt}</i>`
      })
    },
    getLightName ({ name, path }) {
      const tagName = path.replace(/^\//, '')
      return `${this.heightLight(name)}（${this.heightLight(tagName)}）`
    },
    change (item) {
      if (!item) return
      item = JSON.parse(item)
      if (!item.path) return
      if (item.path === this.$route.path) return
      this.$router.push(item.path)
    }
  }
}

</script>
<style lang='less'>
.search{
  height: 100px;
  .search-input{
    height: 40px;
    width: 274px;
    margin-top: 30px;
    .ivu-select-selection{
      height: 100%;
      border-radius: 20px;
      background-color: #F9F9F9;
      font-size: 16px;
      input{
        font-size: 16px;
        color: #555;
      }
      .ivu-select-input{
        height: 40px;
      }
    }
    input::-webkit-input-placeholder{
      color: #999;
      font-size: 16px;
    }
    .ivu-icon{
      font-size: 24px;
      margin: 0 0 0 5px;
    }
    .ivu-select-dropdown-list{
      i{
        font-style: normal;
        color: #2d8cf0;
      }
    }
  }
}
</style>
