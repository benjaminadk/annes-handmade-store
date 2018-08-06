import React from 'react'
import Home from '../containers/Home'
import renderer from 'react-test-renderer'

test('Home Page renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON()
  expect(tree).toMatchSnapshot()
})
