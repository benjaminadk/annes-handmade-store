import gql from 'graphql-tag'

export const SET_AVATAR_MUTATION = gql`
    mutation($userId: ID!, $avatar: String!) {
        setAvatar(userId: $userId, avatar: $avatar) {
            success
            message
        }
    }
`