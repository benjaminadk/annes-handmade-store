import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import ZoomIcon from '@material-ui/icons/ZoomIn'
import { GET_ALL_PRODUCTS_QUERY } from '../queries/getAllProducts'
import { ADD_PRODUCT_TO_CART } from '../mutations/addProductToCart'
import { GET_CART_BY_ID_QUERY } from '../queries/getCartById'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '10vh',
    padding: '0 2.5vw',
    flexWrap: 'wrap',
    minHeight: '70vh'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '30vh',
    marginRight: '2.5vw',
    marginBottom: '5vh'
  },
  image: {
    height: '30vh',
    width: '30vh',
    cursor: 'pointer'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    marginTop: '1.5vh',
    marginBottom: '2vh'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  priceChip: {
    backgroundColor: 'white',
    border: `2px solid ${theme.palette.primary.main}`
  },
  priceChipLabel: {
    color: theme.palette.primary.main
  },
  message: {
    color: 'red',
    marginTop: '2vh'
  }
})

class Catalog extends Component {
  state = {
    message: '',
    open: false
  }

  cardClick = productId => this.props.history.push(`/product/${productId}`)

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

  render() {
    const {
      data: { loading, getAllProducts },
      classes
    } = this.props
    const { message } = this.state
    if (loading) return null
    return [
      <div key="catalog">
        <div className={classes.root}>
          {getAllProducts &&
            getAllProducts.map((p, i) => {
              return (
                <Card key={`product-card-${i}`} className={classes.card}>
                  <Tooltip
                    title={`Click to view ${p.title}`}
                    placement="top"
                    enterDelay={500}
                  >
                    <CardMedia
                      image={p.images[0]}
                      className={classes.image}
                      onClick={() => this.cardClick(p.id)}
                    />
                  </Tooltip>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="button" className={classes.title}>
                      {p.title}
                    </Typography>
                  </CardContent>
                  <CardActions
                    className={classes.cardActions}
                    disableActionSpacing
                  >
                    <Tooltip title="Add to cart now" enterDelay={500}>
                      <IconButton
                        onClick={() => this.cartShortcut(p.id)}
                        color="primary"
                      >
                        <AddCartIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View product details" enterDelay={500}>
                      <IconButton
                        onClick={() => this.cardClick(p.id)}
                        color="primary"
                      >
                        <ZoomIcon />
                      </IconButton>
                    </Tooltip>
                    <Chip
                      className={classes.priceChip}
                      label={
                        <Typography
                          variant="body2"
                          className={classes.priceChipLabel}
                        >
                          $ {p.price}
                        </Typography>
                      }
                    />
                  </CardActions>
                </Card>
              )
            })}
        </div>
      </div>,
      <Dialog
        key="catalog-error"
        open={this.state.open}
        onClose={this.closeDialog}
      >
        <DialogTitle disableTypography>Error</DialogTitle>
        <DialogContent>
          <Typography variant="body2" className={classes.message}>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="raised" color="primary" onClick={this.closeDialog}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(GET_ALL_PRODUCTS_QUERY),
  graphql(ADD_PRODUCT_TO_CART, { name: 'addToCart' })
)(Catalog)
