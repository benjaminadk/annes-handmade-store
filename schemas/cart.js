module.exports = `
    
    type Cart @cacheControl(maxAge: 240) {
        id: ID
        products: [Product]
        quantity: [Int]
        createdOn: String
    }
    
    type CartMutation {
        success: Boolean
        message: String
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
        addProductToCart(cartId: ID, productId: ID, quantity: Int): CartMutation
        removeProductFromCart(cartId: ID, index: Int): CartMutation
        editCartQuantity(cartId: ID, index: Int, quantity: Int): CartMutation
        emptyCart(cartId: ID): CartMutation
    }
`
