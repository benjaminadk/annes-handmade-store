import gql from 'graphql-tag'

export const EDIT_CART_QUANTITY = gql`
    mutation($cartId: ID, $index: Int, $quantity: Int) {
        editCartQuantity(cartId: $cartId, index: $index, quantity: $quantity) {
            success
        }
    }
`