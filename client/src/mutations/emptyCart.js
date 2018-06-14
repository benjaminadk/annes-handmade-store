import gql from 'graphql-tag'

export const EMPTY_CART_MUTATION = gql`
    mutation($cartId: ID) {
        emptyCart(cartId: $cartId) {
            success
            message
        }
    }
`