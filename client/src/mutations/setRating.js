import gql from 'graphql-tag'

export const SET_RATING = gql`
    mutation($productId: ID!, $rate: Float!) {
        setRating(productId: $productId, rate: $rate) {
            success
        }
    }
`