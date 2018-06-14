import gql from 'graphql-tag'

export const GET_CART_BY_ID_QUERY = gql`
  query($cartId: ID) {
    getCartById(cartId: $cartId) {
      cart {
        products {
          id
          variant
          title
          description
          images
          price 
          stock
        }
        quantity
      }
      subTotal
      taxRate
      taxTotal
      total
    }
  }
`