import React from 'react'
import UserAddress from '../components/User.Address'
import { shallow } from 'enzyme'

const ships = [
  {
    city: 'Lake George',
    email: 'test@test.com',
    firstName: 'Ben',
    id: '1',
    lastName: 'Brooke',
    state: 'California',
    street1: '123 Fake Lane',
    street2: '',
    title: 'My Shipping',
    zip: '12845'
  }
]

const bills = [
  {
    city: 'Lake George',
    email: 'test@test.com',
    firstName: 'Ben',
    id: '1',
    lastName: 'Brooke',
    state: 'California',
    street1: '123 Fake Lane',
    street2: '',
    title: 'My Shipping',
    zip: '12845'
  }
]

describe('User Address Component', () => {
  const wrapper = shallow(<UserAddress ships={ships} bills={bills} />)
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('accects a ships prop', () => {
    expect(wrapper.props().ships).toEqual(ships)
  })
  it('accecpts a bills prop', () => {
    expect(wrapper.props().bills).toEqual(bills)
  })
})
