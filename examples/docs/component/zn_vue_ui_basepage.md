# 分页组件 #
### 安装 ##
```
npm i @mobile-component/zn_vue_ui_basepage@latest --save
```
### 导入工程 ##
```
import ZnBasePage from '@mobile-component/zn_vue_ui_basepage'
Vue.use(ZnBasePage)

```
:::demo

```html
<template>
  <div>
      <zn-base-page
        :totalRecords="totalRecords"
        :pageSize="pageSize"
        :pageNo="pageNo"
        :changePage="changePage"
        :showTotal="showTotal"
        :showElevator="showElevator"
        :showSizer="showSizer"
        :pageSizeOpts="pageSizeOpts"
        :onPageSizeChange="onPageSizeChange">
      </zn-base-page>
  </div>
</template>

<script>
export default {
  data () {
    return {
      totalRecords: 8,
      pageSize: 5,
      pageNo: 1,
      showTotal: true, // 显示文字
      showElevator: true, // 显示过滤控件
      pageSizeOpts: [2],
      showSizer: true
    }
  },
  methods: {
    changePage (e) {
      console.log('changePage--->', e)
    },
    onPageSizeChange (e) {
       console.log('onPageSizeChange--->', e)
    }
  }
}
</script>
```
:::


## 参数配置 ##

|属性		   |说明    		   |类型      |可选值  					 |默认值|
|--------------|-------------------|----------|--------------------------|-|
|totalRecords           |数据总条数       |Number     | -                    | 0 |
|pageSize       |每页条数       |Number   | -                        | 30|
|pageNo        |当前页码 |Number    | -                        | 1|
|showTotal           |是否展示总条数信息       |Boolean     | -                   | false |
|showElevator       |显示电梯，可以快速切换到某一页       |Boolean   | -                        | false|
|showSizer        |显示分页下拉 pageSizeOpts|Boolean    | -                        | false|
|pageSizeOpts        |每页条数切换的配置 |Array    | -                        | 5, 30, 50|

|事件名		   |说明			    |返回值|
|------------- |--------------------|-------------------------------------|
|changePage      |页码改变的回调，返回改变后的页码           |页码|
|onPageSizeChange      |切换每页条数时的回调，返回切换后的每页条数           |条数|

