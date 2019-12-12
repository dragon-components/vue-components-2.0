import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ZnBasePage from '../zn_vue_ui_basepage/src/components/index.vue'

const wrapper = shallowMount(ZnBasePage)
describe('zn_vue_ui_basepage/src/components/index.vue', () => {
  it('this component name is ZnBasePage', () => {
    expect(wrapper.name()).to.equal('ZnBasePage')
  })
})
