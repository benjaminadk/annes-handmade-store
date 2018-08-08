import React from 'react'
import Thumbs from '../components/Product.Thumbs'
import { shallow } from 'enzyme'

const images = ['https://shopping-site.s3.amazonaws.com/images/og-image']

const activeIndex = 0

test('Product Thumbs Component renders correctly', () => {
  const wrapper = shallow(<Thumbs images={images} activeIndex={activeIndex} />)
  expect(wrapper.props().images).toEqual(images)
  expect(wrapper).toMatchSnapshot()
})
