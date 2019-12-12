/**
 * @author: fuchunyao
 * @Date: 2019-7-30
 * @Desc: 异常组件单元测试
 */
import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'
import ZnErrorpage from '../zn_vue_ui_name/src/components/index.vue'
import sinon from 'sinon'
const wrapper = mount(ZnErrorpage)
describe('zn_vue_ui_errorpage/src/components/index.vue', () => {
  // 组件名
  it('this component name is ZnErrorpage', () => {
    expect(wrapper.name()).to.equal('ZnErrorpage')
  })
  // 组件属性
  it('dataDesc', () => {
    expect(wrapper.props().dataDesc).to.equal('暂无数据')
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        dataDesc: ''
      }
    })
    expect(setWrapper.props().dataDesc).to.equal('')
  })
  it('statuCode', () => {
    expect(wrapper.props().statuCode).to.equal(99999)
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        statuCode: 404
      }
    })
    expect(setWrapper.props().statuCode).to.equal(404)
  })
  it('statuDesc', () => {
    expect(wrapper.props().statuDesc).to.equal('浏览器找不到这个页面了')
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        statuDesc: '无法找到这个组件'
      }
    })
    expect(setWrapper.props().statuDesc).to.equal('无法找到这个组件')
  })
  it('imgWidth', () => {
    expect(wrapper.props().imgWidth).to.equal(450)
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        imgWidth: 600
      }
    })
    expect(setWrapper.props().imgWidth).to.equal(600)
  })
  it('isJumping', () => {
    expect(wrapper.props().isJumping).to.equal(false)
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        isJumping: true
      }
    })
    expect(setWrapper.props().isJumping).to.equal(true)
  })
  it('router', () => {
    expect(wrapper.props().router).to.equal('/')
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        router: '/home'
      }
    })
    expect(setWrapper.props().router).to.equal('/home')
  })
  it('routerDes', () => {
    expect(wrapper.props().routerDes).to.equal('首页')
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        routerDes: '数据看板'
      }
    })
    expect(setWrapper.props().routerDes).to.equal('数据看板')
  })
  it('count', () => {
    expect(wrapper.props().count).to.equal(3)
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        count: 5
      }
    })
    expect(setWrapper.props().count).to.equal(5)
  })
  it('isShowCount', () => {
    expect(wrapper.props().isShowCount).to.equal(true)
    let setWrapper = shallowMount(ZnErrorpage, {
      propsData: {
        isShowCount: false
      }
    })
    expect(setWrapper.props().isShowCount).to.equal(false)
  })
  // 数据data

  // 方法methods
})
