import React from 'react'
import Cards from '../components/Catalog.Cards'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const products = [
  {
    id: 1,
    title: 'Test Product',
    images: [
      'https://shopping-site.s3.amazonaws.com/images/red-bracelet-starfish-1-opt'
    ],
    price: 20
  }
]

describe('Catalog Cards Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Cards />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('receives array of products as a prop', () => {
    const wrapper = shallow(<Cards products={products} />)
    expect(wrapper.prop('products').length).toEqual(1)
  })
})
