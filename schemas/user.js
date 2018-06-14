module.exports = `
    
    type User {
        id: ID
        username: String
        password: String
        avatar: String
        jwt: String
        ships: [Shipping]
        bills: [Billing]
        cart: Cart
        sales: [Sale]
        createdOn: String
    }
    
    type UserPayload {
        success: Boolean
        message: String
        user: User
    }
    
    type S3Payload {
        requestUrl: String
        imageUrl: String
    }
    
    type Query {
        getUserById(userId: ID!): User
    }
    
    type Mutation {
        signup(username: String!, password: String!): UserPayload
        login(username: String!, password: String!): UserPayload
        autoLogin(userId: ID!): UserPayload
        s3Sign(filename: String!, filetype: String!): S3Payload
        setAvatar(userId: ID!, avatar: String!): UserPayload
    }
`
