import gql from 'graphql-tag'

export const CREATE_BILLING = gql`
    mutation($input: BillingInput) {
        createBilling(input: $input) {
            id
        }
    }
`