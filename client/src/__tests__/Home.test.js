import React from 'react'
import { shallow } from 'enzyme'
import Home from '../containers/Home'

it('expect to render Home component', () => {
  expect(shallow(<Home />)).toMatchSnapshot()
})
