import gql from 'graphql-tag'

export const CREATE_SHIPPING = gql`
    mutation($input: ShippingInput) {
        createShipping(input: $input) {
            id
        }
    }
`