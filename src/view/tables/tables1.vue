<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete"/>
      <div><Button v-canOperate="{code: 'accountStatementList_create'}" style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
// import { getTableData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      columns: [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Email', key: 'email', editable: true },
        { title: 'Create-Time', key: 'createTime' },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [
                h('Button', '自定义删除')
              ])
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete (params) {
      // console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    // getTableData().then(res => {
    //   this.tableData = res.data
    // })
    let param = {
      'page': 1,
      'pageNo': 1,
      'pageSize': 1,
      'size': 5,
      'devCode': 'B200044034'
    }
    this.$$api_sale_list({
      data: param,
      fn: (data) => {
        this.tableData = data.data || []
      }
    })
  }
}
</script>

<style>

</style>
