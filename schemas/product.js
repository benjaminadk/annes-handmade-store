module.exports = `
    
    type Product {
        id: ID
        variant: Int
        bead: Int
        title: String
        description: String
        images: [String]
        price: Float
        stock: Int
        ratings: [Float]
        createdOn: String
    }
    
    type RatingPayload {
        success: Boolean
    }
    
    type Query {
        getAllProducts: [Product]
        getProductById(productId: ID!): Product
    }
    
    type Mutation {
        setRating(productId: ID, rate: Float): RatingPayload
    }
`
