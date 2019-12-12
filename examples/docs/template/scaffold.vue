<template>
  <div class="fade-scaffold">
    <!--主体内容区域-->
    <div class="heard">
      <div class="title">
        海量的区块组合
      </div>
      <div class="heard-block">
        专业视觉设计，基于私有库进行快速组合搭建应用，减少重复的开发，提升效率
      </div>
    </div>
    <div class="content">
      <!-- <zn-tabs @znTabsClick="znTabsClick" v-model="activeTab">
          <TabPane v-for="(tab,index) in tabs" :key="index" :name="tab.status" :label="tab.name">
            <div v-for="(item, key) in baseList" :key="key" class="content-row">
                <zn-card
                  :cardTitle="item.name"
                  :titleStyle="titleStyle"
                  :cardBordered="cardBordered"
                  :disHover="disHover"
                  :cardStyle="cardStyle"
                  :shadow="shadow">
                  <Icon type="ios-film-outline" slot="titleIcon"></Icon>
                  <div slot="content">
                      <span>{{tab.name}}</span>
                  </div>
                </zn-card>
            </div>
          </TabPane>
      </zn-tabs> -->
      <Tabs value="name1">
          <TabPane label="全部" name="name1">
            <div>
                <Row :gutter="24" style="padding:20px">
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">基础模板</p>
                          <p>这部分是公用模板的脚手架</p>
                      </Card>
                  </Col>
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">众能模板</p>
                          <p>这部分主要是面向未来的可定制化的模板</p>
                      </Card>
                  </Col>
                </Row>
            </div>
          </TabPane>
          <TabPane label="基础模板" name="name2">
            <Row :gutter="24" style="padding:20px">
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">基础模板Vue</p>
                          <p>这部分是公用模板的脚手架</p>
                      </Card>
                  </Col>
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">基础模板React</p>
                          <p>这部分是公用模板的脚手架</p>
                      </Card>
                  </Col>
            </Row>
          </TabPane>
          <TabPane label="众能模板" name="name3">
            <Row :gutter="24" style="padding:20px">
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">众能模板Vue</p>
                          <p>这部分主要是面向未来的可定制化的模板</p>
                      </Card>
                  </Col>
                  <Col span="12">
                      <Card :bordered="false" style="box-shadow: 0 8px 24px rgba(163,177,191,.35);">
                          <p slot="title">众能模板React</p>
                          <p>这部分主要是面向未来的可定制化的模板</p>
                      </Card>
                  </Col>
              </Row>
          </TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script>
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
      
    }
  },
  // 计算属性
  computed: {},
  // 监听
  watch: {},
  // 函数集，自己封装，便于开发使用
  methods: {
    znTabsClick() {

    }
  },
  // 生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
  beforeCreated () {},
  // 生命周期钩子：组件实例完成创建之后调用
  created () {},
  // 生命周期钩子：组件实例渲染完成时调用
  mounted () {},
  // 要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
  components: {}
}
</script>
<style lang="less" scoped>
.fade-scaffold {
  .heard {
    width: 1440px;
    height: 250px;
    background-color: rgba(0, 120, 255, 1);
    .title {
      position: relative;
      width: 350px;
      height: 70px;
      color: rgba(255, 255, 255, 1);
      font-size: 50px;
      text-align: center;
      font-family: PingFangSC-Medium;
      margin-left: 34%;
      padding-top: 60px;
    }
    &-block {
      width: 865px;
      height: 22px;
      line-height: 22px;
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: center;
      font-family: PingFangSC-Regular;
      margin-top: 62px;
      margin-left: 223px;
    }
  }
  // .content {
  //   display: flex;
  //   &-row {
  //     .ivu-card-bordered {
  //       flex: auto;
  //       margin-left: 10px !important;
  //     }
  //   }
  // }
}
</style>
