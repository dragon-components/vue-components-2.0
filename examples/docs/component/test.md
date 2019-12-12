## Badge 标记

出现在按钮、图标旁的数字或状态标记。

### 基础用法
展示新消息数量。

:::demo

```html
<template>
    <CheckboxGroup v-model="border">
        <Checkbox label="香蕉" border></Checkbox>
        <Checkbox label="苹果" border></Checkbox>
        <Checkbox label="西瓜" border></Checkbox>
    </CheckboxGroup>
</template>

<script>
    export default {
        data () {
            return {
                border: ['香蕉']
            }
        }
    }
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value        | 显示值           | string, number  |          —            |    —    |
| max          | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| is-dot       | 小圆点           | boolean         |         —             |  false  |
| hidden       | 隐藏 badge       | boolean         |         —             |  false  |
| type         | 类型             | string          | primary / success / warning / danger / info |    —    |