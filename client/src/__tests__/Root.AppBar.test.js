import React from 'react'
import AppBar from '../components/Root.AppBar'
import { shallow } from 'enzyme'

test('Root AppBar Component renders correctly', () => {
  const wrapper = shallow(<AppBar />)
  expect(wrapper).toMatchSnapshot()
})
