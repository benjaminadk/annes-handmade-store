import React from 'react'
import Address from '../components/Checkout.Address'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const ships = [
  {
    city: 'San Pedro',
    email: 'benjaminadk@gmail.com',
    firstName: 'Anne',
    id: '5b30dd5d5745dc0f581af7dc',
    lastName: 'Brooke',
    notes:
      'Make sure all the buttons are in the proper alignment. Make sure all of the site is kosher on mobile screens.',
    state: 'California',
    street1: '3240 S Kerckhoff Ave',
    street2: '',
    title: 'Home',
    zip: '90731'
  }
]

describe('Checkout Address Component', () => {
  it('renders correctly with empty ships prop', () => {
    const tree = renderer.create(<Address ships={[]} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders correctly with a ships prop', () => {
    const wrapper = shallow(<Address ships={ships} />)
    expect(wrapper.props().ships).toEqual(ships)
  })
})
