module.exports = `
    
    type Shipping {
        id: ID
        title: String
        email: String
        firstName: String
        lastName: String
        street1: String
        street2: String
        city: String
        state: String
        zip: String
        notes: String
    }
    
    input ShippingInput {
        userId: ID
        title: String
        email: String
        firstName: String
        lastName: String
        street1: String
        street2: String
        city: String
        state: String
        zip: String
        notes: String
    }

    type ShippingUpdatePayload {
        success: Boolean
        message: String
    }
    
    type Query {
        getShippingsById(shippingIds: [ID]): [Shipping]
    }
    
    type Mutation {
        createShipping(input: ShippingInput): Shipping
        editShipping(input: ShippingInput, id: ID): ShippingUpdatePayload
    }
`
