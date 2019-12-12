# 日历组件

## 安装 ##
```
npm i @mobile-component/zn_vue_ui_calendar --save
```
## 导入工程 ##
```
import ZnCalendar from '@mobile-component/zn_vue_ui_calendar'
Vue.use(ZnCalendar)
```
## 用法说明 ##

:::demo

```html
<template>
  <div class="content">
    <div></div>
    <zn-calendar
      ref="Calendar"
      :markDateMore="markDateMore"
      v-on:isToday="clickToday"
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:mouseover="showTip"
      :sundayStart="true"
      :textTop="textTop"
      :showToolBar="true"
      :statusObject="statusObject"
      :selectedDate="selectedDate"
    ></zn-calendar>
    <br>
    <div class="div" style="color: red" @click="demo ">点击跳到2019-6-12</div>
  </div>
</template>

<script>
const STATUS = [
  { IS_ALL: 1, MARK_ALL: "mark1" },
  { IS_HALF: 2, MARK_HALF: "mark2" },
  { IS_ALL_STOP: 3, MARK_ALL_STOP: "mark3" },
  { IS_HALF_STOP: 4, MARK_HALF_STOP: "mark4" },
  { IS_WAIT: 5, MARK_WAIT: "mark5" },
  { ISNOT_WAIT: 6, MARK_NOT_WAIT: "mark6" }
];
export default {
  data() {
    return {
      markDateMore: [],
      textTop: ["日", "一", "二", "三", "四", "五", "六"],
      statusObject: {},
      selectedDate: new Date()
    };
  },
  methods: {
    clickDay(data) {
      this.$toast("选中了" + data);
    },
    clickToday(data) {
      // this.$toast("今天" + data);
    },
    changeDate(data) {
      this.$toast("切换到的月份为" + data);
    },
    demo() {
      this.selectedDate = new Date("2019-05-13")
    },
    showTip(e) {
      this.$toast("显示" + JSON.stringify(e));
    }
  },
  created() {
    let self = this
    let obj = {
      data: {
        statusObject: {
          allRent: 10,
          halfRent: 10,
          allStop: 10,
          halfStop: 10,
          waitRent: 20
        },
        list: [
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-06-12",
            status: 1,
            onAccHourStr: "10小时",
            workHourStr: "10小时"
          },
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-05-12",
            status: 2,
            onAccHourStr: "11小时",
            workHourStr: "12小时"
          },
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-04-12",
            status: 3,
            onAccHourStr: "13小时",
            workHourStr: "16小时"
          },
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-03-12",
            status: 4,
            onAccHourStr: "13小时",
            workHourStr: "18小时"
          },
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-02-22",
            status: 5,
            onAccHourStr: "13小时",
            workHourStr: "1小时"
          },
          {
            devCode: "LWJAS060CJ0720666",
            date: "2019-02-26",
            status: 6,
            onAccHourStr: "13小时",
            workHourStr: "4小时"
          }
        ]
      },
      message: "成功",
      errCode: 0,
      success: true
    };
    let list = obj.data.list;
    let statusList = obj.data.statusObject;
    // 图标展示集合
    this.statusObject = {
      title: "日出租情况",
      list: [
        { name: `全天在租 ${statusList.allRent}` },
        { name: `半天在租 ${statusList.halfRent}` },
        { name: `全天报停 ${statusList.allStop}` },
        { name: `半天报停 ${statusList.halfStop}` },
        { name: `待租 ${statusList.waitRent}` }
      ]
    };
    // 日历展示集合
    let arrStatus = [];
    list &&
      list.forEach((item, index) => {
        let currentStatus = STATUS[index];
        item.toolTipTemp = `<span>开机：${
          item.onAccHourStr
        }</span><br><span>工作：${item.workHourStr}</span>`;
        switch (+item.status) {
          case currentStatus.IS_ALL:
            item.className = currentStatus.MARK_ALL;
            break;
          case STATUS[index].IS_HALF:
            item.className = currentStatus.MARK_HALF;
            break;
          case STATUS[index].IS_ALL_STOP:
            item.className = currentStatus.MARK_ALL_STOP;
            break;
          case STATUS[index].IS_HALF_STOP:
            item.className = currentStatus.MARK_HALF_STOP;
            break;
          case STATUS[index].IS_WAIT:
            item.className = currentStatus.MARK_WAIT;
            break;
          case STATUS[index].ISNOT_WAIT:
            item.className = currentStatus.MARK_NOT_WAIT;
            break;
        }
        arrStatus.push(item);
      });
      setTimeout(() => {
        self.markDateMore = arrStatus
      }, 300);
    
  }
};
</script>

```

:::

## 参数配置 ##

|属性		   |说明    		   |类型      |可选值  					 |默认值|
|--------------|-------------------|----------|--------------------------|-|
| markDate      | 如果需要某月的几天被标注，传当月的日期数组。如["2019/6/12","2019/6/13"]被会标注（相同的标记） |Array| 否 |空数组|
| markDateMore  | 标记不同日期 此处为一个数组对象 {date: '2019-5-15', className: "mark1", toolTipTemp: '模板toolTip'}|Array | 否 |空数组|
| agoDayHide    | 某个日期以前的不允许点击 时间戳长度是 10 位                      |String   |  否 |  0    |
| futureDayHide | 某个日期以后的不允许点击 时间戳长度是 10 位                      |String|  否  |   0 |
| sundayStart   | 默认是周一开始 当是true的时候 是周日开始                         |Boolean      | 否  |    false |
| textTop       | 日历头部的文字，默认是 [ '日','一', '二', '三', '四', '五', '六'] ，可以根据自己的需求进行不同的修改。|String|否 |---|
| showCount | 日历显示个数，默认是5个 |Number|  否  |      ---   |
| statusObject|图标展示集合 以此种格式呈现 例如： statusObject = {title: '日出租情况',list: [{name: `全天在租 `},{name: `半天在租 `},{name: `全天报停 `},{name: `半天报停 `},{name: `待租 `}]}| Object | 否| {}|
| showToolBar| 是否显示图标集合 默认为false不展示 如设置为true时 此时statusObject必须传值|Boolean|false|
| selectedDate| 当前选择的日期|Date|否|new Date() 当前的日期|

|事件名		   |说明			    |参数|
|------------- |--------------------|-------------------------------------|
| choseDay    | 选中某天调用的方法，返回选中的日期 YY-MM-DD                  |   无   |
| changeMonth   | 切换月份调用的方法，返回切换到某月的日期 YY-MM-DD          |   无   |
| isToday       | 切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天 |   无   |
