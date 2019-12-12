<template>
    <div class="animated fadeIn zn-component-guide">
        <Row :gutter="24">
            <Col :sm="6" :md="6" :lg="6">
                <Card class="card-min-set" :bordered="false">
                    <p slot="title">组件导航</p>
                    <div class="ai-step spacing">
                        <p>基础UI组件</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in list" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            {{child.name}}<span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </Col>
            <Col :sm="6" :md="6" :lg="6">
                <Card class="card-min-set" :bordered="false">
                    <p slot="title">复合组件导航</p>
                    <div class="ai-step spacing">
                        <p>复合组件</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in applyList" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            <span v-html=child.name></span><span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </Col>
            <Col :sm="6" :md="6" :lg="6">
                <Card class="card-min-set" :bordered="false">
                    <p slot="title">业务组件导航</p>
                    <div class="ai-step spacing">
                        <p>业务组件</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in applyList" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            <span v-html=child.name></span><span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </Col>
            <Col :sm="6" :md="6" :lg="6">
                <Card class="card-min-set" :bordered="false">
                    <p slot="title">公用说明导航</p>
                    <div class="ai-step spacing">
                        <p>公用方法</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in commonFuncList" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            {{child.name}}<span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                        <br>
                        <p>常用指令</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in directivesList" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            {{child.name}}<span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                        <br>
                        <p>常见问题</p>
                        <Collapse accordion>
                            <Panel v-for="(item, index) in problemList" :key="index" :name="index + ''">
                                {{item.name}}<span class="txt-info txt-info-r" v-if="item.path"><router-link :to="item.path">查看</router-link></span>
                                <p slot="content">
                                    <span class="txt-info" v-if="item.content">{{item.content}}</span>
                                    <Collapse accordion v-if="item.childs&&item.childs.length">
                                        <Panel v-for="(child, i) in item.childs" :key="i" :name="index + '-' + i">
                                            {{child.name}}<span class="txt-info txt-info-r" v-if="child.path"><router-link :to="child.path">查看</router-link></span>
                                            <p slot="content" v-if="child.content">{{child.content}}</p>
                                        </Panel>
                                    </Collapse>
                                </p>
                            </Panel>
                        </Collapse>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data () {
    const _componentPath = '/component_guide/'
    const bPath = 'feBiz_'
    const vPath = 'feV_'
    const gPath = 'feGlobal_'
    const pPath = 'feProblem_'
    return {
      list: [
        {
          name: '按钮',
          path: _componentPath + 'button'
        },
        {
          name: '提示',
          path: _componentPath + 'message'
        },
        {
          name: 'Input 输入框',
          path: _componentPath + 'input'
        },
        {
          name: 'Radio 单选框',
          path: _componentPath + 'radio'
        },
        {
          name: 'Checkbox 多选框',
          path: _componentPath + 'checkbox'
        },
        {
          name: 'Select 选择器',
          path: _componentPath + 'select'
        },
        {
          name: '日期选择器',
          path: _componentPath + 'date'
        },
        {
          name: '时间选择器',
          path: _componentPath + 'time'
        },
        {
          name: 'form表单',
          path: _componentPath + 'form'
        },
        {
          name: '对话框',
          path: _componentPath + 'modal'
        },
        {
          name: '评分',
          path: _componentPath + 'ratePage'
        },
        {
          name: 'Tabs 标签页',
          path: _componentPath + 'tabs'
        },
        {
          name: 'Table 表格',
          path: _componentPath + 'table'
        },
        {
          name: 'Page 分页',
          path: _componentPath + 'page'
        },
        {
          name: '富文本编辑器',
          path: _componentPath + 'editor'
        },
        {
          name: '图片',
          path: _componentPath + 'picture',
          childs: [
            {
              name: '图片上传'
            },
            {
              name: '带预览图片上传'
            },
            {
              name: '图片缩略图'
            }
          ]
        },
        {
          name: '上传文件',
          path: _componentPath + 'upload',
          childs: [
            {
              name: '单文件上传'
            },
            {
              name: '多文件上传'
            }
          ]
        },
        {
          name: '步进器',
          path: _componentPath + 'step'
        },
        {
          name: '计步器',
          path: _componentPath + 'number'
        },
        {
          name: 'tree树组件',
          path: _componentPath + 'tree'
        },
        {
          name: '音频播放组件',
          path: _componentPath + 'audio'
        },
        {
          name: 'viewer图片预览组件',
          path: _componentPath + 'viewer'
        },
        {
          name: '级联多选组件',
          path: _componentPath + 'cascaderMulti'
        },
        {
          name: 'demo测试',
          path: _componentPath + 'demo'
        }
      ],
      applyList: [
        {
          name: '基础布局场景',
          childs: [
            {
              name: '一栏布局',
              path: bPath + 'baseLayout1'
            },
            {
              name: '二栏布局',
              path: bPath + 'baseLayout2'
            },
            {
              name: '三栏布局',
              path: bPath + 'baseLayout3'
            },
            {
              name: '两栏组合布局',
              path: bPath + 'baseLayoutMix'
            }
          ]
        },
        {
          name: '响应式布局',
          childs: [
            {
              name: '基础介绍',
              path: bPath + 'gridPage'
            },
            {
              name: '搜索项布局',
              path: bPath + 'gridPageDome'
            }
          ]
        },
        {
          name: '二级tabs布局',
          path: bPath + 'layoutTabs'
        },
        {
          name: 'load的各种场景',
          path: bPath + 'loadingPage'
        },
        {
          name: '详情页展示布局',
          childs: [
            {
              name: '详情页展示布局1',
              path: bPath + 'detailPage',
              content: '快速定位适合详情页内容多，页面滚动很长场景，页面内容不多，可以不要定位'
            },
            {
              name: '详情页展示布局2',
              path: bPath + 'detailPageTabs',
              content: '适用于详情页内容多，页面滚动很长场景'
            }
          ]
        },
        {
          name: '表格表单搜索'
        },
        {
          name: 'Table 各种场景',
          childs: [
            {
              name: '不带分页的表格（带滚动）',
              path: bPath + 'tablePage'
            },
            {
              name: '带过滤项的表格',
              path: bPath + 'tableFilter'
            },
            {
              name: '带固定列的表格',
              path: bPath + 'tableFixed'
            },
            {
              name: '下拉扩展内容的表格',
              path: bPath + 'tableTips'
            },
            {
              name: '带选项卡的表格',
              path: bPath + 'tableTabs'
            },
            {
              name: '带复选框的表格',
              path: bPath + 'tableCheckbox'
            },
            {
              name: '带单选框的表格',
              path: bPath + 'tableRadio'
            },
            {
              name: '带排序的表格',
              path: bPath + 'tableSort'
            }
          ]
        },
        {
          name: '流程查询',
          path: bPath + 'process'
        },
        {
          name: 'form表单校验',
          content: 'form表单全场景的校验，包含输入框、下拉框、单选、多选、文件上传、时间选择、富文本编辑等',
          childs: [
            {
              name: 'from简单、常规校验',
              path: bPath + 'formdemo'
            },
            {
              name: 'from复杂、多列校验',
              path: bPath + 'formComplexValidate'
            }
          ]
        },
        {
          name: 'treemodal',
          path: bPath + 'treemodal'
        },
        {
          name: 'EditTable demo',
          childs: [
            {
              name: '可编辑table JSX方式(<span style="color:red;">推荐</span>)',
              path: bPath + 'editable2'
            },
            {
              name: '可编辑table Render方式',
              path: bPath + 'editable'
            },
            {
              name: '带验证可编辑table',
              path: bPath + 'editable_withvalidate'
            }
          ]
        },
        {
          name: 'Echarts demo',
          childs: [
            {
              name: 'echarts demo 基础使用',
              path: bPath + 'echarts'
            },
            {
              name: 'echarts 场景demo',
              path: bPath + 'echartsDemo'
            }
          ]
        },
        {
          name: '选择商品弹框',
          childs: [
            {
              name: '选择商品弹框',
              path: bPath + 'choosegoodsmodal'
            }
          ]
        },
        {
          name: '流程进度demo',
          path: bPath + 'progressdemo'
        },
        {
          name: '复杂页面拆分demo',
          path: bPath + 'pagesplit'
        },
        {
          name: '新老系统页面引用',
          path: bPath + 'iframe'
        },
        {
          name: '甘特图demo',
          path: bPath + 'ganttdemo'
        }
      ],
      directivesList: [
        {
          name: '添加按钮权限',
          path: vPath + 'buttonSteer'

        },
        {
          name: '点击复制功能',
          path: vPath + 'copy'

        },
        {
          name: '添加遮罩不可编辑',
          path: vPath + 'mask'
        },
        {
          name: '点击空白区域指令',
          path: vPath + 'clickHide'
        }
      ],
      problemList: [
        {
          name: '新增页面菜单配置',
          content: '1.新增页面菜单路由加上前缀/BetaApp/,例如：/BetaApp/#/list 2.老系统跳转新系统中路由提供了一个全局变量。MetronicApp.sysPrefix:迁移新系统名称;MetronicApp.sysPreUrl:迁移新系统url前缀 3.新系统为了兼容本地和开发环境，在gFunc.js中提供了sysPrefix方法，this.$$sysPrefix()+路由 '
        },
        {
          name: '路由开发注意事项',
          childs: [
            {
              name: '*和dashboard路由定义的顺序'
            },
            {
              name: '路由按分模块归类定义'
            }
          ]
        },
        {
          name: 'vue 数据的单向绑定',
          path: pPath + 'oneWayBind'
        }
      ],
      commonFuncList: [
        {
          name: '本地数据模拟',
          path: gPath + 'getJson',
          content: '自定义模拟数据生成，帮助前端独立于后端进行开发，前后端人员只需要定义好接口文档就可以开始并行工作，互不影响，只在最后的联调阶段修改请求并验证接口即可。'
        },
        {
          name: '数据埋点',
          path: gPath + 'logPage'
        },
        {
          name: '公用select参数'
        },
        {
          name: '封装自定义请求',
          path: gPath + 'api'
        },
        {
          name: '价格处理过滤器',
          path: gPath + 'price'
        }
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.zn-component-guide {
    .spacing {
        margin-left:20px;
        padding:10px 0;
    }
    .txt {
        margin-left:20px;
        padding:10px 0;
    }
    .txt-info{
        a {
            font-size: 13px;
            color: #2d8cf0;
            text-decoration: underline;
        }
    }
    .txt-info-r{
        float: right;
        margin-right: 20px;
    }
    .card-min-set{
        min-height: 900px;
    }
    .ivu-collapse > .ivu-collapse-item {
        background: #fff;
    }
}
</style>
