import React from 'react'
import BottomNav from '../components/Root.BottomNav'
import { shallow } from 'enzyme'

test('Root BottomNav Component renders correctly', () => {
  const wrapper = shallow(<BottomNav />)
  expect(wrapper).toMatchSnapshot()
})
