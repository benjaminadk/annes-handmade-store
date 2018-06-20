import gql from 'graphql-tag'

export const EDIT_SHIPPING = gql`
  mutation($input: ShippingInput, $id: ID) {
    editShipping(input: $input, id: $id) {
      success
      message
    }
  }
`
