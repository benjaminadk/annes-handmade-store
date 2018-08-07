import React from 'react'
import ConfirmDialog from '../components/Checkout.Confirm.Dialog'
import { shallow } from 'enzyme'

describe('Checkout Confirm Dialog Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ConfirmDialog open={true} />)
    expect(wrapper.props().open).toEqual(true)
  })
})
