import gql from 'graphql-tag'

export const GET_BILLINGS_BY_ID_QUERY = gql`
    query($billingIds: [ID]) {
        getBillingsById(billingIds: $billingIds) {
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
    }
`