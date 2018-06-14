import gql from 'graphql-tag'

export const GET_PRODUCT_BY_ID_QUERY = gql`
  query($productId: ID!) {
    getProductById(productId: $productId) {
      id
      variant
      bead
      title
      description
      images
      price
      stock
      ratings
      createdOn
    }
  }
`