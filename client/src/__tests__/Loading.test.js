import React from 'react'
import { shallow } from 'enzyme'
import Loading from '../components/Loading'

it('expect to render Home component', () => {
  expect(shallow(<Loading />)).toMatchSnapshot()
})
