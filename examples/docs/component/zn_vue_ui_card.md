# 卡片组件

## 安装 ##
```
npm i @mobile-component/zn_vue_ui_card@latest --save
```
## 导入工程 ##
```
import ZnCard from '@mobile-component/zn_vue_ui_card'
Vue.use(ZnCard)
```
## 用法说明 ##
:::demo

```html
<template>
  <div id="app">     
      <zn-card :cardTitle="cardTitle"
               :titleStyle="titleStyle"
               :cardBordered="cardBordered"
               :disHover="disHover"
               :cardStyle="cardStyle"
               :shadow="shadow">
        <!-- 标题图标 -->
         <Icon type="ios-film-outline" slot="titleIcon"></Icon>
        <!-- 在卡片右上角添加额外操作 -->
        <a href="#" slot="extra">
            <Icon type="ios-loop-strong"></Icon>
            换一换
        </a>
        <div slot="content" class="content">
            内容
        </div>
      </zn-card>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
     cardTitle:'电影经典',                         //卡片标题
     titleStyle:{                                 //卡片标题样式
       textAlign:'left'
     },
     cardBordered:true,                           //卡片边框(true:显示边框)   
     disHover:false,                              //禁用鼠标悬停显示阴影的效果（true:禁用）
     cardStyle:{                                  //卡片样式 
       width:'300px',margin:'20px auto',height:'500px'
     },
     shadow:false                                //显示卡片阴影 
                                                 //使用该属性后，bordered和dis-hover将无效，建议在灰色背景下使用 
    }
  },
  methods: {
    
  }
}
</script>

```
:::

## 参数配置 ##

|属性		   |说明    		   |类型      |可选值  					 |默认值|
|--------------|-------------------|----------|--------------------------|-|
|cardTitle     |卡片标题            |String    | -                        | '' |
|titleStyle    |卡片标题样式        |Object    | -                        |{textAlign:'left'}|
|cardBordered  |是否显示卡片边框     |Boolean  |-                         | true|
|disHover      |是否禁用鼠标悬停显示阴影的效果       |Boolean     | -                   | false |
|shadow        |是否显示卡片阴影       |Boolean   | -                        | false|
|cardStyle     |卡片样式              |Object    | -                        | {}|


|事件名		   |说明			    |返回值|
|------------- |--------------------|-------------------------------------|
<!-- |changePage      |页码改变的回调，返回改变后的页码           |页码| -->
