import React from 'react'
import Confirm from '../components/Checkout.Confirm'
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

const state = {
  ['edit-mode-0']: false,
  ['quantity-0']: 1
}

describe('Checkout Confirm Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Confirm getCartById={getCartById} state={state} />)
    expect(wrapper.props().getCartById).toEqual(getCartById)
  })
})
