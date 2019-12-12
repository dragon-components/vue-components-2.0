<template>
      <div class="animated fadeIn zn_settlement">
        <Card :bordered="false">
            <!-- <p slot="title">列表</p> -->
            <div>
              <zn-base-filter></zn-base-filter>
            </div>
            <div>
                <zn-base-table
                :loading="tableParam.loading"
                :titles="tableParam.titles"
                :data="tableParam.data"
                :totalRecords="tableParam.totalRecords"
                :pageSize="tableParam.pageSize"
                :pageNo="tableParam.pageNo"
                :changePage="changePage"
                :onPageSizeChange="onPageSizeChange"
                :selectionChange="selectionChange"
                :height="200">
                </zn-base-table>
            </div>
            <Modal width="800" v-model="model1.list"  title="Model"  :loading="model1.loading">
                <div slot="footer">
                    <Button class="btn-primary" :loading="model1.btnloading" :disabled="isEnable" event-param="30000|10001|确认">确认</Button>
                    <Button class="btn-default" @click="model1.list = false" event-param="30000|10002|取消">取消</Button>
                </div>
            </Modal>
        </Card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import utils from '@/utils/utils'
import { PAYMENT_STATUS_LIST, SETTLEMENT_STATUS_LIST } from '@/constants'
export default {
  data () {
    return {
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
            title: '客户编号',
            key: 'cityCode',
            align: 'center',
            width: 200
          },
          {
            title: '用户编号',
            key: 'highOrLow',
            align: 'center',
            width: 200
          },
          {
            title: '项目名称',
            key: 'devAddress',
            align: 'center',
            width: 200
          },
          {
            title: '合作伙伴',
            key: 'businessPartnerName',
            align: 'center',
            width: 120
          },
          {
            title: '支付金额',
            align: 'center',
            key: 'payableAmount',
            width: 100,
            render: (h, params) => {
              return ''
            }
          },
          {
            title: '费用金额',
            align: 'center',
            render: (h, params) => {
              return <div>
                {params.row.otherAmount >= 0 ? <span>{utils.currency(params.row.otherAmount, '￥')}</span> : <span class='redColor'>{utils.currency(params.row.otherAmount, '￥')}</span>}
              </div>
            },
            width: 120
          },
          {
            title: '结算状态',
            key: 'confirmStatusStr',
            align: 'center',
            width: 120
          },
          {
            title: '付款状态',
            align: 'center',
            key: 'settlementStatusStr',
            width: 120
          },
          {
            title: '创建时间',
            key: 'addTimeStr',
            align: 'center',
            width: 180
          },
          {
            title: '订单时间',
            key: 'approvalBillNo',
            align: 'center',
            minWidth: 100
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (h, params) => {
              return <Button type="primary">详情</Button>
            },
            width: 110
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
    // 状态
    this.initStatusList2()
    // 初始化 列表查询
    debugger
    this.search()
    // 全局埋点
    // this.$$gTracker()
  },
  methods: {
    initStatusList () {
      this.paymentStatusList = PAYMENT_STATUS_LIST
    },
    initStatusList2 () {
      this.settlementStatusList = SETTLEMENT_STATUS_LIST
    },
    search (pageNo, pageSize) {
      if (pageNo && (typeof pageNo === 'number')) {
        this.tableParam.pageNo = pageNo
      }
      if (pageSize && (typeof pageSize === 'number')) {
        this.tableParam.pageSize = pageSize
      }
      this.checkedArr = []
      this.isSelect = true
      let param = {
        'page': this.tableParam.pageNo,
        'pageNo': this.tableParam.pageNo,
        'pageSize': this.tableParam.pageSize,
        'size': this.tableParam.pageSize
      }
      this.tableParam.loading = true
      this.$$api_dms_serDevLifelist({
        data: param,
        fn: (data) => {
          this.tableParam.loading = false
          this.tableParam.data = data.data.list || []
          this.tableParam.totalRecords = data.data.total
        }
      })
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 清空搜索框
     */
    searchReset () {
      this.$refs['form'].resetFields()
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 输入跳转的页码
     */
    changePage (pageNo) {
      this.tableParam.pageNo = pageNo
      this.search(pageNo)
    },
    /**
     * @Author: dragon
     * @Date: 2019-04-18
     * @Desc: 选择每页显示的条数时触发
     */
    onPageSizeChange (pageSize) {
      debugger
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
<style lang='less'>
    .zn_settlement {
        .ivu-modal-footer{
            margin-top: -200px;
        }
    }
</style>
