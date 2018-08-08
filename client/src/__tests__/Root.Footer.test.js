import React from 'react'
import Footer from '../components/Root.Footer'
import { shallow } from 'enzyme'

test('Root Footer Component renders correctly', () => {
  const wrapper = shallow(<Footer />)
  expect(wrapper).toMatchSnapshot()
})
