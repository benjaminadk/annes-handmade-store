import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
            success
            message
            user {
                id
                jwt
                cart {
                    id
                }
            }
        }
    }
`