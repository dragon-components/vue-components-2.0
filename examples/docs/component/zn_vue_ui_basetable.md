# 列表组件

## 安装 ##
```
npm i @mobile-component/zn_vue_ui_basetable@latest --save
```
## 导入工程 ##
```
import ZnBaseTable from '@mobile-component/zn_vue_ui_basetable'
Vue.use(ZnBaseTable)
```
## 用法说明 ##
:::demo

```html
<template>
  <div class="znlhApp">
      <zn-base-table
        :loading="tableParam.loading"
        :titles="tableParam.titles"
        :data="tableParam.data"
        :totalRecords="tableParam.totalRecords"
        :pageSize="tableParam.pageSize"
        :pageNo="tableParam.pageNo"
        @changePage="changePage"
        @onPageSizeChange="onPageSizeChange"
        @selectionChange="selectionChange"
        >
      </zn-base-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        message: '',
        tableParam: {
          loading: true,
          titles: [
            //   {
            //       type: 'selection',
            //       width: 40,
            //       align: 'center'
            //   },
              {
                  title: '客户编号',
                  key: 'customerCode',
                  align: 'center',
                  width: 200,
                  sortable: true
              },
              {
                  title: '用户编号',
                  key: 'userCode',
                  align: 'center',
                  width: 200
              },
              {
                  title: '备注',
                  key: 'approvalBillNo',
                  align: 'center',
                  minWidth: 100
              },
              {
                  title: '操作',
                  key: 'action',
                  align: 'center',
                  fixed: 'right',
                  render: () => {
                      return <Button class="btn-primary">详情</Button>
                  },
                  width: 110
              }
          ],
          data: [],
          pageNo: 1,
          pageSize: 2,
          totalRecords: 3
      }
    }
  },
  mounted () {
    this.tableParam.loading = false
    this.tableParam.data = [
        {customerCode: 1001},
        {customerCode: 1002},
        {customerCode: 1003},
        {customerCode: 1004},
        {customerCode: 1005},
        {customerCode: 1006},
    ]
  },
  methods: {
      changePage () {

      },
      onPageSizeChange (e) {
         e
      },
      selectionChange () {

      },
      change () {
          this.message = '2018-05-27'
      }
  }
}
</script>
<style lang="less">
    #app table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 0;
        line-height: 1.5em;
    }
</style>
```
:::

## 参数配置 ##

|属性		   |说明    		   |类型      |可选值  					 |默认值|
|--------------|-------------------|----------|--------------------------|-|
|loading           |表格是否加载中       |Boolean     | -                    | false |
|titles       |表格列的配置描述 见后文       |Array   | 必选                        | []|
|data         |显示的结构化数据 |Array    | 必选                        | []|
|width	|表格宽度，单位 px	Number | String	|-|自动|
|znTablePageFlag       	|是否显示分页       |Boolean   | -                        | true|
|rowClassName        	|可以给某一行指定一个样式名称 行的 className 的回调方法，传入参数：row：当前行数据 index：当前行的索引 |Function   |-| -|
|highlightRow|是否支持高亮选中的行，即单选|Boolean|-|false|
|totalRecords           |数据总条数       |Number     | -                    | 0 |
|pageSize       |每页条数       |Number   | -                        | 30|
|pageNo        |当前页码 |Number    | -                        | 1|
|showTotal           |是否展示总条数信息       |Boolean     | -                   | false |
|showElevator       |显示电梯，可以快速切换到某一页       |Boolean   | -                        | false|
|showSizer        |显示分页下拉 pageSizeOpts|Boolean    | -                        | false|
|pageSizeOpts        |每页条数切换的配置 |Array    | -                        | 5, 30, 50|

|事件名		   |说明			    |返回值|
|------------- |--------------------|-------------------------------------|
|onRowClick      |单击某一行时触发           |当前行的数据, index|
|onPageSizeChange      |切换每页条数时的回调，返回切换后的每页条数           |条数|
|onChangePage      |页码改变的回调，返回改变后的页码           |页码|
|onSelectionChange      |在多选模式下有效，只要选中项发生变化时就会触发           |selection：已选项数据|
|onSelect      |在多选模式下有效，选中某一项时触发           |selection：已选项数据|
|onSelectAll      |在多选模式下有效，点击全选时触发           |selection：已选项数据|
|onSelectCancel      |在多选模式下有效，取消选中某一项时触发           |selection：已选项数据 row：取消选择的项数据|
|onCurrentChange|开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发|currentRow：当前高亮行的数据 oldCurrentRow：上一次高亮的数据|
|onSortChange|排序时有效，当点击排序时触发|column：当前列数据 key：排序依据的指标 order：排序的顺序，值为 asc 或 desc|

列描述数据对象，是 titles 中的一项

|属性	|说明	|类型	|默认值|
|--------------|-------------------|----------|-----------------------|
|type	|列类型，可选值为 index、selection、expand、html	|String	|-|
|title	|列头显示文字|	|String|	|#|
|key	|对应列内容的字段名|	String|	-|
|width	|列宽	|Number	|-|
|minWidth|	最小列宽|	Number|	-|
|maxWidth|	最大列宽|	Number|	-|
|align|	对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐|	String|	left|
|className|	列的样式名称|	String|	-|
|fixed	|列是否固定在左侧或者右侧，可选值为 left 左侧和 right 右侧	|String	|-|
|ellipsis|	开启后，文本将不换行，超出部分显示为省略号	|Boolean	|false|
|tooltip|	开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容|	Boolean|	false|
|render|	自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 row、column 和 index，分别指当前行数据，当前列数据，当前行索引|	Function|	-|
|renderHeader|	自定义列头显示内容，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为对象，包含 column 和 index，分别为当前列数据和当前列索引。	|Function	|-|
|indexMethod|	type 为 index 时可用，自定义序号	|Function，参数 row 为当前行内容|	-|
|sortable|	对应列是否可以排序，如果设置为 custom，则代表用户希望远程排序，需要监听 Table 的 on-sort-change 事件|	Boolean | 'custom'	false|
|sortMethod	|自定义排序使用的方法，接收三个参数 a 、 b 和 type，当设置 sortable: true 时有效。type 值为 asc 和 desc	|Function|	-|
|sortType|	设置初始化排序。值为 asc 和 desc	|String	|-|
|filters|	过滤数据的选项，格式为数组，数组中每项包含 label 和 value 属性，使用过滤，必须同时配置 filterMethod	|Array|	-|
|children|	表头分组|	Array|	-|
