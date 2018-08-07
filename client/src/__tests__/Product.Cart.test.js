import React from 'react'
import Cart from '../components/Product.Cart'
import { shallow } from 'enzyme'

const cart = {
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
  }
}

describe('Product Cart Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Cart cart={cart} />)
    expect(wrapper.props().cart).toEqual(cart)
  })
})
