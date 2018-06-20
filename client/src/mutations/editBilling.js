import gql from 'graphql-tag'

export const EDIT_BILLING = gql`
  mutation($input: BillingInput, $id: ID) {
    editBilling(input: $input, id: $id) {
      success
      message
    }
  }
`
