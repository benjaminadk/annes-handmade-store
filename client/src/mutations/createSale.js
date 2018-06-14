import gql from 'graphql-tag'

export const CREATE_SALE = gql`
    mutation($input: SaleInput) {
        createSale(input: $input) {
            success
            type
            code
            message
            sale {
                id
            }
        }
    }
`