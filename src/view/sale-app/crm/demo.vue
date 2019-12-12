<template>
<!--Created by CURRENT_USER  on 2019-12-07 17:33 -->
<div class="crm-demo">
<!--主体内容区域-->
<Card :bordered="false">
  <zn-base-filter
      searchPlaceholder="请输入demo"
      :filterParams="filterParams"
      @onFilterChange="filterChange">
  </zn-base-filter>
</Card>
<Card :bordered="false">
  <zn-base-table
    :loading="tableParam.loading"
    :titles="tableParam.titles"
    :data="tableParam.data"
    :totalRecords="tableParam.totalRecords"
    :pageSize="tableParam.pageSize"
    :pageNo="tableParam.pageNo"
    @changePage="changePage"
    @onPageSizeChange="onPageSizeChange"
    @selectionChange="selectionChange">
  </zn-base-table>
</Card>
</div>
</template>
<script>
import { CITY_LIST } from '@/constants'
export default {
  props: {
    // 父组件传递过来的数据
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      code: '',
      params: {},
      tableList: [],
      flag: 1,
      tableParam: {
        loading: true,
        titles: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            title: '门店',
            key: 'storeName',
            align: 'center',
            width: 200
          },
          {
            title: '覆盖城市',
            key: 'cities',
            align: 'center',
            minWidth: 200
          },
          {
            title: '最后更新时间',
            key: 'lastUpdateTime',
            align: 'center',
            width: 200
          },
          {
            title: '最后更新人',
            key: 'lastUpdateBy',
            align: 'center',
            width: 120
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            // fixed: 'right',
            render: (h, params) => {
              return <div>
                {<Button type={'primary'} size={'small'} v-canOperate="{code:'programPriceSetEdit'}" on-click={() => this.handleEdit(params.row)}>编辑</Button>}
                {<Button type={'error'} size={'small'} v-canOperate="{code:'programPriceSetDel'}" on-click={() => this.handlelDel(params.row)}>删除</Button>}
              </div>
            },
            width: 220
          }
        ],
        data: [],
        pageNo: 1,
        pageSize: 30,
        totalRecords: 0
      },
      filterParams: [
        {
          name: 'city', //
          type: 'select',
          placeholder: '请选择门店',
          list: CITY_LIST, // select数据
          label: 'city', // name
          value: 'citycode', // key
          defaultValue: ''
        },
        {
          name: 'userCode', //
          type: 'select',
          placeholder: '请选择最后更新人',
          list: [], // select数据
          label: 'name', // name
          value: 'code', // key
          defaultValue: ''
        },
        {
          name: 'customer', //
          type: 'cascader',
          placeholder: '请选择',
          list: [
            {
              value: 'zhejiang',
              label: '浙江',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州',
                  children: [
                    {
                      value: 'xihu',
                      label: '西湖',
                      code: 310000
                    }
                  ]
                }
              ]
            },
            {
              value: 'jiangsu',
              label: '江苏',
              children: [
                {
                  value: 'nanjing',
                  label: '南京',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: '中华门',
                      code: 210000
                    }
                  ]
                }
              ]
            }
          ], // select数据
          label: 'label', // name
          value: 'value', // key
          defaultValue: ''
        },
        {
          name: 'date', //
          type: 'datePicker',
          placeholder: '请选择时间段',
          dateType: null,
          options: null
        }
      ]
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 函数集，自己封装，便于开发使用
  methods: {
    filterChange (e) {
      this.checkedArr = []
      this.isSelect = true
      let params = {
        pageNo: this.tableParam.pageNo,
        pageSize: this.tableParam.pageSize,
        queryKeywords: e && e.name,
        cityCode: e && e.city,
        userCode: e && e.userCode,
        startTime: e && e.date[0],
        endTime: e && e.date[1]
      }
      this.tableParam.loading = true
      this.$$api_opr_list({
        params,
        isDebounce: false
      }).then((data) => {
        this.tableParam.loading = false
        this.tableParam.data = data.data.list || []
        this.tableParam.totalRecords = data.data.total
      })
      setTimeout(() => {
        // 测试http防抖
        this.$$api_opr_list({
          params,
          isDebounce: false
        }).then((data) => {
          this.tableParam.loading = false
          this.tableParam.data = data.data.list || []
          this.tableParam.totalRecords = data.data.total
        })
      })
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 输入跳转的页码
     */
    changePage () {
      this.tableParam.pageNo = pageNo
      this.search()
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 选择每页显示的条数时触发
     */
    onPageSizeChange (pageSize) {
      this.tableParam.pageSize = pageSize
      this.search()
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 选择复选框时触发
     */
    selectionChange (selection) {
      // selected change
      this.checkedArr = selection
      if (this.checkedArr.length > 0) {
        this.isSelect = false
      } else {
        this.isSelect = true
      }
    }
  },
  // 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
  beforeCreated () {},
  // 生命周期钩子：组件实例完成创建之后调用
  created () {},
  // 生命周期钩子：组件实例渲染完成时调用
  mounted () {
    this.filterChange()
  },
  // 要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
  components: {}
}
</script>
<style lang="less" scoped>
/*使用scss编写样式，既可提高开发效率，也方便维护*/
/*scoped省略后，该样式片段会应用到页面全局*/
</style>
