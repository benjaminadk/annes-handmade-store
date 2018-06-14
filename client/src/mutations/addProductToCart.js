import gql from 'graphql-tag'

export const ADD_PRODUCT_TO_CART = gql`
  mutation($cartId: ID, $productId: ID, $quantity: Int) {
    addProductToCart(cartId: $cartId, productId: $productId, quantity: $quantity) {
      success
      message
    }
  }
`