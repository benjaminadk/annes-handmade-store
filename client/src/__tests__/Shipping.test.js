import React from 'react'
import Shipping from '../containers/Shipping'
import renderer from 'react-test-renderer'

test('Shipping Page renders correctly', () => {
  const tree = renderer.create(<Shipping />).toJSON()
  expect(tree).toMatchSnapshot()
})
