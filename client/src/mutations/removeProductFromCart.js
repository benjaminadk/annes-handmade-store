import gql from 'graphql-tag' 

export const REMOVE_PRODUCT_FROM_CART = gql`
  mutation($cartId: ID, $index: Int) {
    removeProductFromCart(cartId: $cartId, index: $index) {
      success
    }
  }
`