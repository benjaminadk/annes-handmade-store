import React from 'react'
import CatalogDialog from '../components/Catalog.Dialog'
import { shallow } from 'enzyme'

describe('Catalog Dialog Component', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CatalogDialog open={true} />)
    expect(wrapper.props().open).toEqual(true)
  })
})
