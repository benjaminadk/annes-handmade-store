import React from 'react'
import AddressDialog from '../components/Checkout.Address.Dialog'
import { shallow } from 'enzyme'

describe('Checkout Address Dialog Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<AddressDialog open={true} />)
    expect(wrapper.props().open).toEqual(true)
  })
})
