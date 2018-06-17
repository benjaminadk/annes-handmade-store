import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { GET_PRODUCT_BY_ID_QUERY } from '../queries/getProductById'
import { GET_CART_BY_ID_QUERY } from '../queries/getCartById'
import { ADD_PRODUCT_TO_CART } from '../mutations/addProductToCart'
import { REMOVE_PRODUCT_FROM_CART } from '../mutations/removeProductFromCart'
import { SET_RATING } from '../mutations/setRating'
import { withStyles } from '@material-ui/core/styles'
import ProductThumbs from '../components/Product.Thumbs'
import ProductImage from '../components/Product.Image'
import ProductDetails from '../components/Product.Details'
import ProductCart from '../components/Product.Cart'

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '10% 30% 35% 25%',
    marginTop: '50px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  lower: {
    display: 'grid',
    gridTemplateColumns: '75% 25%',
    marginTop: '10vh',
    paddingLeft: '2.5vw',
    paddingRight: '2.5vw',
    [theme.breakpoints.down('sm')]: {
      marginTop: '5vh'
    }
  }
})

class Product extends Component {
  state = {
    activeIndex: 0,
    quantity: 1,
    rate: null
  }

  handleActiveIndex = i => this.setState({ activeIndex: i })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  addToCart = async productId => {
    const cartId = window.localStorage.getItem('CART_ID')
    const { quantity } = this.state
    await this.props.addToCart({
      variables: { cartId, productId, quantity },
      refetchQueries: [{ query: GET_CART_BY_ID_QUERY, variables: { cartId } }]
    })
    await this.setState({ quantity: 1 })
    this.props.updateCartBadge(true)
  }

  removeFromCart = async index => {
    const cartId = window.localStorage.getItem('CART_ID')
    await this.props.removeFromCart({
      variables: { cartId, index },
      refetchQueries: [{ query: GET_CART_BY_ID_QUERY, variables: { cartId } }]
    })
    this.props.updateCartBadge(false)
  }

  goToCheckout = () => {
    const cartId = window.localStorage.getItem('CART_ID')
    this.props.handleBottomNav(null, '/checkout')
    this.props.history.push(`/checkout/${cartId}`)
  }

  goToCatalog = () => {
    this.props.handleBottomNav(null, '/catalog')
    this.props.history.push('/catalog')
  }

  disableAddToCart = product => {
    if (product.stock === 0) {
      return true
    }
    const products = this.props.cart.getCartById.cart.products
    const ids = products.map(p => p.id.toString())
    if (ids.includes(product.id.toString())) {
      return true
    }
    return false
  }

  setRating = async (productId, rate) => {
    await this.props.setRating({
      variables: { productId, rate },
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID_QUERY, variables: { productId } }
      ]
    })
  }

  handleRate = rate => this.setState({ rate })

  render() {
    const {
      data: { loading, getProductById },
      cart: { loading: loading2, getCartById },
      classes
    } = this.props
    if (loading || loading2) return null
    return (
      <div>
        <div className={classes.root}>
          <ProductThumbs
            images={getProductById.images}
            handleActiveIndex={this.handleActiveIndex}
            activeIndex={this.state.activeIndex}
          />
          <ProductImage
            images={getProductById.images}
            activeIndex={this.state.activeIndex}
          />
          <ProductDetails
            product={getProductById}
            handleChange={this.handleChange}
            addToCart={this.addToCart}
            disableAddToCart={this.disableAddToCart}
            quantity={this.state.quantity}
          />
          <ProductCart
            cart={getCartById}
            removeFromCart={this.removeFromCart}
            goToCheckout={this.goToCheckout}
            goToCatalog={this.goToCatalog}
          />
        </div>
        <div className={classes.lower}>
          <h1>Reviews</h1>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(GET_PRODUCT_BY_ID_QUERY, {
    options: props => ({ variables: { productId: props.match.params.id } })
  }),
  graphql(GET_CART_BY_ID_QUERY, {
    name: 'cart',
    options: props => ({
      variables: { cartId: window.localStorage.getItem('CART_ID') }
    })
  }),
  graphql(SET_RATING, { name: 'setRating ' }),
  graphql(ADD_PRODUCT_TO_CART, { name: 'addToCart' }),
  graphql(REMOVE_PRODUCT_FROM_CART, { name: 'removeFromCart' })
)(Product)
