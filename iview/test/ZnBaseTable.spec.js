import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import ZnBaseTable from '../zn_vue_ui_basetable/src/components/index.vue'

const wrapper = shallowMount(ZnBaseTable)
describe('zn_vue_ui_basetable/src/components/index.vue', () => {
  it('this component name is ZnBaseTable', () => {
    expect(wrapper.name()).to.equal('ZnBaseTable')
  })
})
