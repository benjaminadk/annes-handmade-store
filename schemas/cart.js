module.exports = `
    
    type Cart @cacheControl(maxAge: 240) {
        id: ID
        products: [Product]
        quantity: [Int]
        createdOn: String
    }
    
    type CartPayload {
        cart: Cart
        taxRate: Float
        subTotal: Float
        taxTotal: Float
        total: Float
    }
    
    type Query {
        getCartById(cartId: ID): CartPayload
    }
    
    type Mutation {
        createCart: Cart
        addProductToCart(cartId: ID, productId: ID, quantity: Int): Payload
        removeProductFromCart(cartId: ID, index: Int): Payload
        editCartQuantity(cartId: ID, index: Int, quantity: Int): Payload
        emptyCart(cartId: ID): Payload
    }
`
