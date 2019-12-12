# 地图组件

## 安装

```
npm i @mobile-component/zn_vue_ui_map@latest --save
```

## 导入工程

```
import ZnMap from '@mobile-component/zn_vue_ui_map'
Vue.use(ZnMap)
```

## 用法说明

:::demo

```html
<template>
  <zn-map :markers="markers"></zn-map>
</template>

<script>
export default {
  data() {
    return {
      markers: [
        {
          position: [116.39, 41],
          // size: [32.9, 40],
          // src: require("./assets/fenceAlarm/ic_map_jc.png"),
          title: "welcome to Hebei",
          infoWindow: {
            content: `<div style='color:#fff;height:40px;line-height:40px;font-size:15px;border-bottom:1px solid #fff;'>雷猴，我似dier个信息窗口</div>
                      <div style='color:#fff;height:40px;line-height:40px;font-size:15px;'>HAHA，我YE似dier个信息窗口</div>            
                    `,
            custom: {
              backgroundColor: "#ccc",
              borderColor: "green"
            } //自定义背景和边框
          }
        },
        {
          position: [118.8614273071,31.8691025276],
          // size: [32.9, 40],
          // src: require("./assets/fenceAlarm/ic_map_jc.png"),
          title: "welcome to Jiangsu",
          infoWindow: {
            content: `江苏省南京市江宁区汤山林场`
          }
        }
      ]
    };
  }
};
</script>

```
:::

## 参数配置

| 属性         | 说明                                                                                                                                              | 类型    | 可选值 | 默认值                                           | 是否必填 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------ | ------------------------------------------------ | -------- |
| center       | 地图中心点, **[经度,维度]** 形式，经纬度都必须是 Number 类型                                                                                      | Array   | -      | [0,0]                                            | 否       |
| zoom         | 地图缩放等级                                                                                                                                      | Number  | -      | 11                                               | 否       |
| setFitView   | 地图上覆盖物较多的情况下，如果需要保证所有覆盖物都在视野范围内，将地图调整到合适的缩放等级和中心点。该属性设置为 true 时，center 和 zoom 属性失效 | Boolean | -      | true                                             | 否       |
| markers      | 地图上点标记，对象数组形式，[marker1,marker2,...]，详见 markers 说明                                                                              | Array   | -      | []                                               | 否       |
| lang         | 地图语言                                                                                                                                          | String  | -      | 'zh_cn'                                          | 否       |
| mapStyle     | 地图主题                                                                                                                                          | String  | -      | 'amap://styles/a8f732190ecfcba98d4d09b4b7bd2114' | 否       |
| resizeEnable | 是否监控地图容器尺寸变化                                                                                                                          | Boolean | -      | true                                             | 否       |

### markers 说明

| 属性       | 说明                                                                                               | 类型                                                                                | 可选值 | 默认值 | 是否必填                   |
| ---------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------ | ------ | -------------------------- |
| position   | 点标记经纬度                                                                                       | Array                                                                               | -      | -      | 是                         |
| size       | 图标宽高，**[宽,高]** 形式，宽高都必须是 Number 类型                                               | Array                                                                               | -      | -      | 是(使用默认点标记时不必填) |
| src        | 图片地址，本地图片需要使用 require() 引入，如果需要使用默认蓝色定位图标，该属性不填，size 属性不填 | String                                                                              | -      | -      | 否                         |
| title      | 鼠标换过点标记的提示语                                                                             | String                                                                              | -      | -      | 否                         |
| infoWindow | 点标记的信息窗口。content 为信息窗的内容，                                                         | {content:String / htmlDOM,custom:{backgroundColor: 背景颜色,borderColor: 边框颜色}} | -      | -      | 否                         |
