import React from 'react'
import Complete from '../components/Checkout.Complete'
import { shallow } from 'enzyme'

const getCartById = {
  cart: {
    products: [
      {
        description: 'A product',
        id: 1,
        images: ['https://shopping-site.s3.amazonaws.com/images/og-image'],
        price: 5,
        stock: 1,
        title: 'Test Product',
        variant: 1
      }
    ],
    quantity: [1]
  },
  subTotal: 5,
  taxRate: 0.0725,
  taxTotal: 0.36,
  total: 5.36
}

test('Checkout Complete Component renders correctly', () => {
  const wrapper = shallow(<Complete getCartById={getCartById} />)
  expect(wrapper.props().getCartById).toEqual(getCartById)
})
