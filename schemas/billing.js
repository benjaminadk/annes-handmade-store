module.exports = `

    type Billing {
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
    }
    
    input BillingInput {
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
    }
    
    type Query {
        getBillingsById(billingIds: [ID]): [Billing]
    }
    
    type Mutation {
        createBilling(input: BillingInput): Billing
    }

`
