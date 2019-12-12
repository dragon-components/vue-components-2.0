<template>
  <div>多级菜单 -> 二级-2 -> 3级 rr
    <iSwitch v-model="switch1" @on-change="change" />
    <Button class="btn-primary" @click="open()">确定</Button>
    <Modal  v-model="modal1"  title="分配任务" :mask-closable="false" :loading="loading" width="1200">
        <main>
            <Form :label-width="150">
                <Row class="head">
                    <span class="label-1">
                        同项目同户型同选择DNA有如下任务未分配，可勾选后批量分配设计师！
                    </span>
                </Row>
            </Form>
        </main>
        <div slot="footer">
            <Button class="btn-primary" @click="opeAssign(null, 2)">确定</Button>
            <Button class="btn-default" @click="modal1=false">取消</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'level_3_1',
  data () {
    return {
      loading: false,
      switch1: false,
      modal1: false
    }
  },
  methods: {
    change (status) {
      this.$Message.info('开关状态：' + status)
    },
    opeAssign () {

    },
    open () {
      this.modal1 = !this.modal1
    }
  }
}
</script>
