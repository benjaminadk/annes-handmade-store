import gql from 'graphql-tag'

export const GET_SHIPPINGS_BY_ID_QUERY = gql`
    query($shippingIds: [ID]) {
        getShippingsById(shippingIds: $shippingIds) {
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
    }
`