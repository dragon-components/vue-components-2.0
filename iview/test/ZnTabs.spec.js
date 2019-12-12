/**
 * @Author: dragon
 * @Date: 2019-07-23 10:33:07
 * @Desc: chai【断言库】shallowMount【包装器】describe,it【mocha测试框架语法】 karma【测试多环境支持】
 */
import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'
import ZnTabs from '../zn_vue_ui_tabs/src/components/index.vue'
import { createVue } from '../util'
import sinon from 'sinon'
const wrapper = mount(ZnTabs)
describe('zn_vue_ui_tabs/src/components/index.vue', () => {
  // 组件名
  it('this component name is ZnTabs', () => {
    expect(wrapper.name()).to.equal('ZnTabs')
  })
  // 组件属性
  it('isAnimated', () => {
    expect(wrapper.props().isAnimated).to.equal(false)
    let setWrapper = shallowMount(ZnTabs, {
      propsData: {
        isAnimated: true
      }
    })
    expect(setWrapper.props().isAnimated).to.equal(true)
  })
  it('isClosable', () => {
    expect(wrapper.props().isClosable).to.equal(true)
    let setWrapper = shallowMount(ZnTabs, {
      propsData: {
        isClosable: false
      }
    })
    expect(setWrapper.props().isClosable).to.equal(false)
  })
  it('type', () => {
    expect(wrapper.props().type).to.equal('line')
    let setWrapper = shallowMount(ZnTabs, {
      propsData: {
        type: 'card'
      }
    })
    expect(setWrapper.props().type).to.equal('card')
  })
  it('size', () => {
    expect(wrapper.props().size).to.equal('default')
    let setWrapper = shallowMount(ZnTabs, {
      propsData: {
        size: 'small'
      }
    })
    expect(setWrapper.props().size).to.equal('small')
  })
  // 数据data
  it('Component template props and data', done => {
    // let setWrapper = shallowMount(ZnTabs)
    const Component = {
      template: '<div>{{ msg }}</div>',
      props: ['msg'],
      data () {
        return {
          activeName: 'aBCD'
        }
      }
    }
    const setWrapper = shallowMount(Component, {
      propsData: {
        msg: 'aBC'
      }
    })
    expect(setWrapper.text()).to.equal('aBC')
    expect(setWrapper.vm.$data.activeName).to.equal('aBCD')
    done()
  })

  it('acitivetab value when mounted', done => {
    const setWrapper = mount(ZnTabs, {propsData: {
      value: 'aBC'
    }})

    expect(setWrapper.vm.$data.acitivetab).to.equal('aBC')
    setWrapper.setData({ acitivetab: '2' })
    expect(setWrapper.vm.$data.acitivetab).to.equal('2')

    done()
  })
  // 方法methods
  it('click event when button', done => {
    const Component = {
      template: '<button @click="clickMethod">{{ msg }}</button>',
      props: ['msg'],
      data () {
        return {
          activeName: 'aBCD'
        }
      },
      methods: {
        clickMethod (eve) {
          console.log(eve)
        }
      }
    }
    const setWrapper = mount(Component)
    const clickMethodStub = sinon.stub()

    setWrapper.setMethods({ clickMethod: clickMethodStub })
    setWrapper.find('button').trigger('click')
    expect(clickMethodStub.called).to.equal(true)
    done()
  })
  // dom
  it('create dom', done => {
    let setWrapper = createVue(ZnTabs, true)
    expect(setWrapper.$el.querySelectorAll('.ivu-tabs-bar').length).to.equal(1)
    expect(setWrapper.$el.classList.contains('ivu-tabs')).to.equal(true)
    done()
  })
  // 子往父组件触发事件传值
  it('ZnTabs parant and children', done => {
    const ParentComponent = {
      template: `<div><ZnTabs @znTabsClick="znTabsClick" v-model="activeTab"><TabPane v-for="(tab,index) in tabs" :key="index" :name="tab.status" :label="tab.name">
      </TabPane></ZnTabs><p v-if="emitted">Emitted!</p></div>`,
      components: {
        ZnTabs
      },
      data () {
        return {
          emitted: false,
          activeTab: '1', // 默认选项卡
          tabs: [
            {
              status: '1',
              name: '我关注的'
            },
            {
              status: '2',
              name: '我提交的'
            },
            {
              status: '0',
              name: '全部'
            }
          ]
        }
      },
      methods: {
        znTabsClick (event) {
          this.emitted = event
        }
      }
    }
    const setWrapper = mount(ParentComponent)
    let parant = setWrapper.find(ZnTabs)
    parant.vm.$emit('znTabsClick', 1)
    parant.vm.$emit('znTabsClick', 23)
    // console.log('setWrapper.vm.$el==', setWrapper.html())
    expect(setWrapper.text()).to.include('Emitted!')
    // 断言事件的有效数据
    console.log('===zjl', parant.emitted('znTabsClick'))
    // 方式1
    expect(parant.emitted().znTabsClick[0]).to.eql([1])
    expect(parant.emitted().znTabsClick[1]).to.eql([23])
    // 方式2
    expect(parant.emitted('znTabsClick') + '').to.eql('1,23')
    // console.log('vbbnn', setWrapper.vm.$el)
    expect(setWrapper.vm.$el.querySelectorAll('.ivu-tabs-tab').length).to.equal(3)
    done()
  })
})
