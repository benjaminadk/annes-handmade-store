module.exports = `
    
    input Card {
        id: String
        object: String
        address_city: String
        address_country: String
        address_line1: String
        address_line1_check: String
        address_line2: String
        address_state: String
        address_zip: String
        address_zip_check: String
        brand: String
        country: String
        cvc_check: String
        dynamic_last4: String
        exp_month: Int
        exp_year: Int
        fingerprint: String
        funding: String
        last4: String
        metadata: String
        name: String
        tokenization_method: String
    }
    
    input Token {
        id: String
        object: String
        card: Card
        client_ip: String
        created: Int
        livemode: Boolean
        type: String
        used: Boolean
    }
`
