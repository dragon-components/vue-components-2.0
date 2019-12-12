# 列表筛选组件

## 安装 ##
```
npm i @mobile-component/zn_vue_ui_basefilter@latest --save
```
## 导入工程 ##
```
import ZnBaseFilter from '@mobile-component/zn_vue_ui_basefilter'
Vue.use(ZnBaseFilter)
```
## 用法说明 ##
:::demo

```html
<template>
    <div id="app" class="znlhApp">

      <ZnBaseFilter 
          searchPlaceholder="请输入demo" 
          :filterParams="filterParams"
          @onFilterChange="filterChange">
      </ZnBaseFilter>

      <Divider />
      <div v-if="changeData">数据改变：{{ changeData }}</div>
      
      <Divider />
      <Button @click="handleClick">异步下拉数据</Button>
   </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            filterParams: [
              {
                name: "city", // 
                type: "select",
                placeholder: "请选择城市",
                list: [
                  {
                    city: "南京",
                    citycode: "32100"
                  },
                  {
                    city: "北京",
                    citycode: "12000"
                  }
                ], //select数据
                label: "city", // name
                value: "citycode", // key
                defaultValue: ""
              },
              {
                name: "userCode", // 
                type: "select",
                placeholder: "请选择",
                list: [], //select数据
                label: "name", // name
                value: "code", // key
                defaultValue: ""
              },
              {
                name: "customer", // 
                type: "cascader",
                placeholder: "请选择",
                list: [
                  {
                    value: "zhejiang",
                    label: "浙江",
                    children: [
                      {
                        value: "hangzhou",
                        label: "杭州",
                        children: [
                          {
                            value: "xihu",
                            label: "西湖",
                            code: 310000
                          }
                        ]
                      }
                    ]
                  },
                  {
                    value: "jiangsu",
                    label: "江苏",
                    children: [
                      {
                        value: "nanjing",
                        label: "南京",
                        children: [
                          {
                            value: "zhonghuamen",
                            label: "中华门",
                            code: 210000
                          }
                        ]
                      }
                    ]
                  }
                ], //select数据
                label: "label", // name
                value: "value", // key
                defaultValue: ""
              },
              {
                name: "date", //
                type: "datePicker",
                placeholder: "请选择",
                dateType: null,
                options: null
              }
            ],

            changeData:{},
            userList:[]

        };
    },
   methods: {
     filterChange(params){
        console.log(params);
        this.changeData = params;
     },

     handleClick(){
      //  this.filterParams[1].list.push()
       this.filterParams[1].list = [{
          name: "小张",
          code: "USER1001"
        },
        {
          name: "小明",
          code: "USER1002"
        }]
       }
   }
};
</script>

```
:::
## 参数配置 ##

### props ###

|属性     |说明    |类型     |可选值     |默认值        |是否必填|
|--------|--------|---------|----------|--------------|-------|
|searchPlaceholder|输入框的Placeholder提示|String|-|请输入客户、手机号|否|
|filterParams|筛选条件|Array|-|[]|是|

#### 【filterParams】list ####

> type为select

|属性     |说明    |类型     |可选值     |默认值        |是否必填|
|--------|--------|---------|----------|--------------|-------|
|name|返回值的key,必须唯一|String|--|--|是|
|type|展示交互类型|String|select |select|是|
|placeholder|提示语|String|--|--|否|
|list|下拉等数据源|Array|--|[]|是|
|label|标签name|String|--|--|是|
|value|标签value|String|--|--|是|
|defaultValue|初始值|String|--|--|否|

> type为cascader

|属性     |说明    |类型     |可选值     |默认值        |是否必填|
|--------|--------|---------|----------|--------------|-------|
|name|返回值的key,必须唯一|String|--|--|是|
|type|展示交互类型|String|cascader |cascader|是|
|placeholder|提示语|String|--|--|否|
|list|下拉等数据源|Array|--|[]|是|
|label|标签name|String|--|--|是|
|value|标签value|String|--|--|是|
|defaultValue|初始值|String|--|--|否|

> type为date

|属性     |说明    |类型     |可选值     |默认值        |是否必填|
|--------|--------|---------|----------|--------------|-------|
|name|返回值的key,必须唯一|String|--|--|是|
|type|展示交互类型|String|date |date|是|
|placeholder|提示语|String|--|--|否|
|dateType|显示类型|String|date、daterange、datetime、datetimerange、year、month|daterang|否|
|options|选择器额外配置，比如不可选日期与快捷选项，具体项详见下表|Object|--|--|否|

> 支持扩展，比如radio\checkbox等

options

|属性     |说明    |类型     |默认值        |
|--------|--------|---------|--------------|
|shortcuts|设置快捷选项，每项内容：<br> text/String：显示的文案<br>value/Function：返回指定的日期，如需自己控制逻辑，可不设置，并使用 onClick 回调<br>onClick/Function：点击时的回调，参数为当前日期选择器的 Vue 实例，当需要自定义复杂操作时，可以使用|Array|-|
|disabledDate|设置不可选择的日期，参数为当前的日期，需要返回Boolean是否禁用这天|Function|-|

### events ###
|事件名        |说明     |返回值    |
|-------------|---------|----------|
|onFilterChange|监听筛选项每一个v-model变化事件|object filterParams 筛选组成的data集合|

### methods ###
|事件名       |说明     |返回值    |
|-------------|---------|----------|
|getParams|获取data|data的对象|
