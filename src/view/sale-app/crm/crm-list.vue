<template>
      <div class="animated fadeIn crm-list--wrap">
        <Card :bordered="false">
            <!-- <p slot="title">列表</p> -->
            <div>
                <Form ref="form" :model="searchDetail" :label-width="120" >
                    <Row>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="单号：" prop="settlementNo">
                                    <Input v-model="searchDetail.settlementNo" placeholder="请输入"> </Input>
                            </FormItem>
                        </Col>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="单号：" prop="approvalBillNo">
                                    <Input v-model="searchDetail.approvalBillNo" placeholder="请输入"> </Input>
                            </FormItem>
                        </Col>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="单号：" prop="payableBillNo">
                                    <Input v-model="searchDetail.payableBillNo" placeholder="请输入"> </Input>
                            </FormItem>
                        </Col>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="状态：" prop="confirmStatus">
                                <!-- <zn-full-select v-model="searchDetail.confirmStatus" :aiSelectArr="settlementStatusList" aiSelectKey="id" aiSelectName="name" aiSelectClearable></zn-full-select> -->
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="状态：" prop="settlementStatus">
                                <!-- <zn-full-select v-model="searchDetail.settlementStatus" :aiSelectArr="paymentStatusList" aiSelectKey="id" aiSelectName="name" aiSelectClearable></zn-full-select> -->
                            </FormItem>
                        </Col>
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem label="日期：" prop="createGroupVal">
                                <Row type="flex" justify="space-between" :gutter="16">
                                    <Col :xs="12" :sm="12" :md="12" :lg="12">
                                        <FormItem class="gSearchDate" prop="addStartTime">
                                            <DatePicker type="date" format="yyyy-MM-dd" v-model="searchDetail.addStartTime" @on-change="searchDetail.addStartTime=$event"></DatePicker>
                                        </FormItem>
                                    </Col>
                                    <Col :xs="12" :sm="12" :md="12" :lg="12">
                                        <FormItem class="gSearchDate" prop="addEndTime">
                                            <DatePicker v-model="searchDetail.addEndTime" format="yyyy-MM-dd" type="date" @on-change="searchDetail.addEndTime=$event"></DatePicker>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="end" class="gTr">
                        <Col :sm="12" :md="6" :lg="6">
                            <FormItem>
                                <Button class="btn-primary" @click="search(1)" v-canOperate event-param="30000|05944001|搜索">搜索</Button>
                                <Button class="btn-default" @click="searchReset" v-canOperate event-param="30000|05944002|清空">清空</Button>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                </Form>
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
                :height="600">
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
import { Button } from 'iview'
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
            key: 'customerCode',
            align: 'center',
            width: 200,
            render: (h, params) => {
              return ''
            }
          },
          {
            title: '用户编号',
            key: 'userCode',
            align: 'center',
            width: 200
          },
          {
            title: '项目名称',
            key: 'projectName',
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
              return <Button class="btn-primary">详情</Button>
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
  components: {
    Button
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
      this.$$api_sale_list({
        data: param,
        fn: (data) => {
          this.tableParam.loading = false
          this.tableParam.data = data.data || []
          this.tableParam.totalRecords = data.totalRecords
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
