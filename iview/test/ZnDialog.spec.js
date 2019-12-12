/**
 * @Author: dragon
 * @Date: 2019-07-23 10:33:07
 * @Desc: chai【断言库】shallowMount【包装器】describe,it【mocha测试框架语法】 karma【测试多环境支持】
 */
import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'
import ZnDialog from '../zn_vue_ui_dialog/src/components/index.vue'
// 未使用 import { createVue } from '../util'
// 未使用 import sinon from 'sinon'
const wrapper = mount(ZnDialog)

describe('zn_vue_ui_tabs/src/components/index.vue', () => {
  // 组件名
  it('this component name is ZnDialog', () => {
    expect(wrapper.name()).to.equal('ZnDialog')
  })
  // 组件属性
  it('show', () => {
    expect(wrapper.props().show).to.equal(false)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        show: true
      }
    })
    expect(setWrapper.props().show).to.equal(true)
  })
  it('title', () => {
    expect(wrapper.props().title).to.equal('提示')
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        title: '弹窗组件单元测试'
      }
    })
    expect(setWrapper.props().title).to.equal('弹窗组件单元测试')
  })
  it('width', () => {
    expect(wrapper.props().width).to.equal(520)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        width: 600
      }
    })
    expect(setWrapper.props().width).to.equal(600)
  })
  it('footBtnHide', () => {
    expect(wrapper.props().footBtnHide).to.equal(false)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        footBtnHide: true
      }
    })
    expect(setWrapper.props().footBtnHide).to.equal(true)
  })

  it('closeIconShow', () => {
    expect(wrapper.props().closeIconShow).to.equal(false)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        closeIconShow: true
      }
    })
    expect(setWrapper.props().closeIconShow).to.equal(true)
  })

  it('confirmText', () => {
    expect(wrapper.props().confirmText).to.equal('确认')
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        confirmText: '确定'
      }
    })
    expect(setWrapper.props().confirmText).to.equal('确定')
  })

  it('confirmBtnShow', () => {
    expect(wrapper.props().confirmBtnShow).to.equal(true)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        confirmBtnShow: false
      }
    })
    expect(setWrapper.props().confirmBtnShow).to.equal(false)
  })

  it('cancelText', () => {
    expect(wrapper.props().cancelText).to.equal('取消')
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        cancelText: '关闭'
      }
    })
    expect(setWrapper.props().cancelText).to.equal('关闭')
  })

  it('cancelBtnShow', () => {
    expect(wrapper.props().cancelBtnShow).to.equal(true)
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        cancelBtnShow: false
      }
    })
    expect(setWrapper.props().cancelBtnShow).to.equal(false)
  })

  it('modalClassName', () => {
    expect(wrapper.props().modalClassName).to.equal('')
    let setWrapper = shallowMount(ZnDialog, {
      propsData: {
        modalClassName: 'ivu-modal-wrap'
      }
    })
    expect(setWrapper.props().modalClassName).to.equal('ivu-modal-wrap')
  })

  //
  it('prefixCls value when mounted', done => {
    const setWrapper = mount(ZnDialog, {
      propsData: {
        prefixCls: 'zn-dialog'
      }
    })
    expect(setWrapper.vm.$data.prefixCls).to.equal('zn-dialog')
    setWrapper.setData({ prefixCls: 'mountedChange' })
    expect(setWrapper.vm.$data.prefixCls).to.equal('mountedChange')

    done()
  })
})
