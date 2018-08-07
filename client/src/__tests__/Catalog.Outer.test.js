import React from 'react'
import Outer from '../components/Catalog.Outer'
import renderer from 'react-test-renderer'

describe('Catalog Outer Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Outer />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
