import React from 'react'
import About from '../containers/About'
import renderer from 'react-test-renderer'

test('About Page renders correctly', () => {
  const tree = renderer.create(<About />).toJSON()
  expect(tree).toMatchSnapshot()
})
