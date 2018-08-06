import React from 'react'
import Privacy from '../containers/Privacy'
import renderer from 'react-test-renderer'

test('Privacy Page renders correctly', () => {
  const tree = renderer.create(<Privacy />).toJSON()
  expect(tree).toMatchSnapshot()
})
