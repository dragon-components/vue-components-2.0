# 地图组件片段 #
### 动效演示 ##
![Image text](../../gif/zn-map.gif)

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