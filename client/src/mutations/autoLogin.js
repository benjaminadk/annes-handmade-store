import gql from 'graphql-tag'

export const AUTO_LOGIN_MUTATION = gql`
    mutation($userId: ID!) {
        autoLogin(userId: $userId) {
            success
            message
            user {
                id
                jwt
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