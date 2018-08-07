import React from 'react'
import Details from '../components/Product.Details'
import { shallow } from 'enzyme'

const product = {
  description: 'A product',
  id: 1,
  images: ['https://shopping-site.s3.amazonaws.com/images/og-image'],
  price: 5,
  stock: 1,
  title: 'Test Product',
  variant: 1
}

const quantity = 1

test('Product Detail Component renders correctly', () => {
  const wrapper = shallow(<Details product={product} quantity={1} />)
  expect(wrapper.props().product).toEqual(product)
})
