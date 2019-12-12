# tab组件 #
### 安装 ##
```
npm i @mobile-component/zn_vue_ui_tabs@latest --save
```
### 导入工程 ##
```
import ZnTabs from '@mobile-component/zn_vue_ui_tabs'
Vue.use(ZnTabs)

```
:::demo

```html
<template>
  <div id="app" class="znlhApp">
        <zn-tabs @znTabsClick="znTabsClick" v-model="activeTab">
            <TabPane v-for="(tab,index) in tabs" :key="index" :name="tab.status" :label="tab.name">
            <span>{{tab.name}}</span>
            </TabPane>
        </zn-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
        activeTab: '1', // 默认选项卡
        tabs: [
            {
                status: '1',
                name: '我关注的'
            },
            {
                status: '2',
                name: '我提交的'
            },
            {
                status: '0',
                name: '全部'
            }
        ]
    }
  },
  mounted () {},
  methods: {
    /**
     * tab切换
     */
    znTabsClick (name) {
       // eslint-disable-next-line no-console
       console.log(name, 1000)
    }
  }
}
</script>

```
:::


## 参数配置 ##

|属性		   |说明    		   |类型      |可选值  					 |默认值|
|--------------|-------------------|----------|--------------------------|-|
|isAnimated           |是否使用 CSS3 动画       |Boolean     | -                    | false |
|isClosable       |是否可以关闭页签，仅在 type="card" 时有效       |Boolean   | -                        | true|
|value        |当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据 |String    | -                        | ''|
|type           |页签的基本样式，可选值为 line 和 card       |String     | -                   | line |
|size       |尺寸，可选值为 default 和 small，仅在 type="line" 时有效       |String   | -                        | default|

|事件名		   |说明			    |返回值|
|------------- |--------------------|-------------------------------------|
|on-click      |tab 被点击时触发           |name|
|on-tab-remove      |tab 被关闭时触发          |name|

