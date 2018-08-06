import React from 'react'
import Login from '../components/Root.Login'
import { mount } from 'enzyme'

describe('Root Login Component', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Login open={true} loginMode={true} />)
    const title = <div>Login</div>
    expect(wrapper)
  })
})
