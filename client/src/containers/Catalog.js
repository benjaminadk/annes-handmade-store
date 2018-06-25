import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { GET_ALL_PRODUCTS_QUERY } from '../queries/getAllProducts'
import { ADD_PRODUCT_TO_CART } from '../mutations/addProductToCart'
import { GET_CART_BY_ID_QUERY } from '../queries/getCartById'
import Loading from '../components/Loading'
import CatalogCards from '../components/CatalogCards'
import CatalogDialog from '../components/CatalogDialog'
import CatalogOuter from '../components/CatalogOuter'
import BackIcon from '@material-ui/icons/ArrowBack'

const styles = theme => ({
  root: {
    marginTop: '10vh',
    padding: '0 2.5vw',
    minHeight: '70vh'
  },
  title: {
    marginLeft: '1vw',
    marginTop: '2vh'
  },
  backButton: {
    marginTop: '2vh'
  }
})

class Catalog extends Component {
  state = {
    message: '',
    open: false,
    filteredProducts: [],
    innerCards: false
  }

  outerCardClick = (isType, index) => {
    const products = this.props.data.getAllProducts
    if (isType && !index) {
      this.setState({ filteredProducts: products, innerCards: true })
    } else if (isType) {
      let filteredProducts = products.filter(p => p.variant === index)
      this.setState({ filteredProducts, innerCards: true })
    } else if (!isType) {
      let filteredProducts = products.filter(p => p.bead === index)
      this.setState({ filteredProducts, innerCards: true })
    }
  }

  innerCardClick = productId => this.props.history.push(`/product/${productId}`)

  cartShortcut = async productId => {
    const cartId = window.localStorage.getItem('CART_ID')
    const response = await this.props.addToCart({
      variables: { cartId, productId, quantity: 1 },
      refetchQueries: [{ query: GET_CART_BY_ID_QUERY, variables: { cartId } }]
    })
    const { success, message } = response.data.addProductToCart
    if (success) {
      this.props.updateCartBadge(true)
      this.props.handleBottomNav(null, '/checkout')
      this.props.history.push(`/checkout/${productId}`)
    } else {
      this.setState({ message, open: true })
    }
  }

  closeDialog = () => this.setState({ open: false })

  backButton = () => this.setState({ innerCards: false })

  render() {
    const {
      data: { loading },
      classes
    } = this.props
    const { message, open, filteredProducts, innerCards } = this.state
    if (loading) return <Loading />
    return [
      <div key="catalog" className={classes.root}>
        {innerCards && (
          <Button onClick={this.backButton} className={classes.backButton}>
            <BackIcon /> &nbsp;&nbsp; Back
          </Button>
        )}
        <Typography variant="display2">Catalog</Typography>
        {!innerCards && <CatalogOuter outerCardClick={this.outerCardClick} />}
        {innerCards && (
          <CatalogCards
            key="cards"
            products={filteredProducts}
            cardClick={this.innerCardClick}
            cartShortcut={this.cartShortcut}
          />
        )}
      </div>,
      <CatalogDialog
        key="dialog"
        open={open}
        message={message}
        closeDialog={this.closeDialog}
      />
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(GET_ALL_PRODUCTS_QUERY),
  graphql(ADD_PRODUCT_TO_CART, { name: 'addToCart' })
)(Catalog)
