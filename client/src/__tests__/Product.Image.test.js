import React from 'react'
import Image from '../components/Product.Image'
import { shallow } from 'enzyme'

const images = ['https://shopping-site.s3.amazonaws.com/images/og-image']

const activeIndex = 0

test('Product Image Component renders correctly', () => {
  const wrapper = shallow(<Image images={images} activeIndex={activeIndex} />)
  expect(wrapper.props().images).toEqual(images)
  expect(wrapper).toMatchSnapshot()
})
