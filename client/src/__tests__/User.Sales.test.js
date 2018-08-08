import React from 'react'
import UserSales from '../components/User.Sales'
import { shallow } from 'enzyme'

test('User Sales Component', () => {
  const wrapper = shallow(<UserSales />)
  expect(wrapper).toMatchSnapshot()
})
