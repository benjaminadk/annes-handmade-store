import React from 'react'
import BeadInfo from '../components/Catalog.BeadInfo'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('Catalog BeadInfo Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BeadInfo />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('receives a bead type as a prop', () => {
    const wrapper = shallow(<BeadInfo bead="Red Jasper" />)
    expect(wrapper.props().bead).toEqual('Red Jasper')
  })
})
