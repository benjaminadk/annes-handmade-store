import gql from 'graphql-tag'

export const CREATE_CART_MUTATION = gql`
  mutation {
    createCart{
      id
    }
  }
`