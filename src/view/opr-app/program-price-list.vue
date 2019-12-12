<template>
  <div class="program-price-list fadeIn">
    <!-- <p slot="title">列表</p> -->
    <Card :bordered="false">
      <zn-base-filter :filterParams="filterParams"
                      searchPlaceholder="请输入某信息"
                      @onFilterChange="search">
      </zn-base-filter>
    </Card>
    <Card :bordered="false">
      <zn-base-table :loading="tableParam.loading"
                     :titles="tableParam.titles"
                     :data="tableParam.data"
                     :totalRecords="tableParam.totalRecords"
                     :pageSize="tableParam.pageSize"
                     :pageNo="tableParam.pageNo"
                     :changePage="changePage"
                     :onPageSizeChange="onPageSizeChange"
                     :selectionChange="selectionChange"
                     :height="200"
                     show-header>
      </zn-base-table>
    </Card>
    <Modal width="800"
           v-model="model1.list"
           title="Model"
           :loading="model1.loading">
      <div slot="footer">
        <Button type="primary"
                :loading="model1.btnloading"
                :disabled="isEnable"
                event-param="30000|10001|确认">确认</Button>
        <Button type="default"
                @click="model1.list = false"
                event-param="30000|10002|取消">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import utils from '@/utils/utils'
import { CITY_LIST } from '@/constants'
export default {
  data () {
    return {
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
      ],
      isEnable: false,
      isSelect: true,
      paymentStatusList: [],
      settlementStatusList: [],
      checkedArr: [],
      height: 0,
      searchDetail: {
        payableBillNo: '',
        settlementNo: '',
        approvalBillNo: '',
        companyId: '',
        settlementStatus: '',
        businessPartnerId: '',
        addStartTime: '',
        addEndTime: ''
      },
      model1: {
        list: false,
        loading: false,
        btnloading: false
      },
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  mounted () {
    // 下拉
    this.initStatusList()
    // 初始化 列表查询
    this.search()
    // 全局埋点
    // this.$$gTracker()
  },
  methods: {
    initStatusList () {
      // 从接口获取
      this.filterParams[1].list = [{
        name: '小张',
        code: 'USER1001'
      },
      {
        name: '小明',
        code: 'USER1002'
      }]
    },
    /**
     * @Author: dragon
     * @Date: 2019-08-24 11:50:40
     * @Desc: 编辑
     */
    handleEdit (row) {
      let storeName = row.storeName
      let storeCode = row.storeCode
      this.$router.push({
        name: 'programPriceSetEdit',
        params: {
          storeName: storeName,
          storeId: storeCode
        }
      })
    },
    /**
     * @Author: dragon
     * @Date: 2019-08-24 11:50:47
     * @Desc: 删除
     */
    handlelDel (row) {
      // let storeId = row.storeCode
      this.$Modal.confirm({
        title: '提示',
        content: '删除后数据无法恢复，确定要删除吗？',
        onOk: () => {
          this.$Message.info('Clicked ok')
          // this.$$api_opr_delete({
          //   data: { storeId },
          //   fn: (data) => {
          //     this.$message({
          //       message: '删除成功',
          //       type: 'success'
          //     })
          //     this.search()
          //   }
          // })
        },
        onCancel: () => {
          this.$Message.info('Clicked cancel')
        }
      })
    },
    /**
     * @Author: dragon
     * @Date: 2019-08-24 12:01:54
     * @Desc: 查询
     */
    search (e) {
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
  }
}
</script>
