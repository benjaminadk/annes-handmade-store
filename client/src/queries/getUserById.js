import gql from 'graphql-tag'

export const GET_USER_BY_ID_QUERY = gql`
  query($userId: ID!) {
    getUserById(userId: $userId) {
      id
      username
      avatar
      ships {
        id
        title
        email
        firstName
        lastName
        street1
        street2
        city
        state
        zip
        notes
      }
      bills {
        id
        title
        email
        firstName
        lastName
        street1
        street2
        city
        state
        zip
      }
      sales {
        shipped
        quantity
        total
        createdOn
        products {
          id
          variant
          bead
          title
          description
          images
          price
          ratings
        }
        shippingAddress {
          id
        }
      }
      createdOn
    }
  }
`
