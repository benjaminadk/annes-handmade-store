import React from 'react'
import UserDropzone from '../components/User.Dropzone'
import { shallow } from 'enzyme'

test('User Dropzone Component renders correctly', () => {
  const wrapper = shallow(<UserDropzone />)
  expect(wrapper).toMatchSnapshot()
})
