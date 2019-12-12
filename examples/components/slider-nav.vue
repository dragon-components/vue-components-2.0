<template>
  <div
    class="side-nav"
    ref="sideNav"
    @mouseenter="isFade = false"
    :class="{ 'is-fade': isFade }">
    <ul>
      <li
        class="nav-item"
        v-for="(item, key) in navLists"
        :key="key">
        <a>{{item.name}}</a>
        <ul class="pure-menu-list sub-nav" v-if="item.children">
          <li
            class="nav-item"
            v-for="(navItem, key) in item.children"
            :key="key">
            <router-link
              class=""
              active-class="active"
              :to="navItem.path"
              exact
              v-text="navItem.name">
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { getNavConfigByPath } from 'examples/router/navConfig'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'sliderNav',
  data () {
    return {
      isFade: false
    }
  },

  components: {},

  computed: {
    typeName () {
      return this.$route.matched[0].path
    },
    navLists () {
      return getNavConfigByPath(this.typeName)
    }
  },

  methods: {},

  mounted () {
    const container = this.$refs.sideNav
    /* eslint-disable no-new */
    new PerfectScrollbar(container, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }
}

</script>
<style lang='less'>
.side-nav {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: opacity .3s;
    position: relative;
    &.is-fade {
      transition: opacity 3s;
    }
    li {
      list-style: none;
    }
    ul {
      padding: 0;
      margin: 0;
      overflow: hidden;
    }

    > ul > .nav-item > a {
      margin-top: 15px;
    }
    > ul > .nav-item:nth-child(-n + 4) > a {
      margin-top: 0;
    }
    .nav-item {
      a {
        font-size: 16px;
        color: #555;
        line-height: 56px;
        height: 56px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        display: block;
        position: relative;
        transition: .15s ease-out;
        font-weight: bold;
        padding: 0 24px;
        font-weight: 700;
        margin-bottom: 1px;
        &.active {
          color: #409EFF;
        }
      }
      .nav-item {
        a {
          display: block;
          height: 40px;
          color: #555;
          line-height: 40px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: normal;
          font-weight: 700;
          padding-left: 35px;
          &:hover{
            color: #409EFF;
          }
          &.active {
            color: #fff;
            box-shadow: 2px 3px 12px rgba(0,0,0,.1);
            border-radius: 4px;
            background-image: linear-gradient(to left, #01B5FF , #006EFF);
          }
        }
      }
    }
  }
</style>
