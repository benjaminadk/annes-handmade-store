import React from 'react'
import Login from '../components/Root.Login'
import { shallow } from 'enzyme'

describe('Root Login Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Login open={true} />)
    expect(wrapper.props().open).toEqual(true)
  })
})
