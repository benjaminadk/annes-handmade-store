import React from 'react'
import { shallow } from 'enzyme'
import BottomNav from '../components/Root.BottomNav'

it('expect to render Home component', () => {
  expect(shallow(<BottomNav />)).toMatchSnapshot()
})
