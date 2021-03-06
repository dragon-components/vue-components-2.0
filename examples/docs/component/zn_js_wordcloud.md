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
  <div id="demo1">
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
                "name": "兼职",
                "value": 21
            },
            {
                "name": "期望年薪",
                "value": 20
            },
            {
                "name": "实习",
                "value": 16
            },
            {
                "name": "雇主类型",
                "value": 10
            },
            {
                "name": "星座运势",
                "value": 789
            },
            {
                "name": "星座",
                "value": 316
            }],
      params: {height: 500, width: 500, imageUrl: ''}
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData() {
      let initCloud = require('dragon-wordcloud')
      let chart = initCloud(document.getElementById('demo1'), list, params)
      chart.on('click', ({
        data
      }) => {
        alert(data.name)
      })
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

