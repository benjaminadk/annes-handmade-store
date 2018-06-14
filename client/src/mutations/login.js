import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
            message
            user {
                id
                jwt
                avatar
                ships {
                    id
                }
                bills {
                    id
                }
                cart {
                    id
                    quantity
                }
            }
        }
    }
`