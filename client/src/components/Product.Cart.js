import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import Slide from '@material-ui/core/Slide'
import PrevIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'

const styles = theme => ({
  root: {
    margin: '0 5vh'
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '3vh'
  },
  thumbnail: {
    height: '8vh',
    width: '8vh',
    border: '1px solid',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  data: {
    display: 'flex',
    flexDirection: 'column'
  },
  catalogButton: {
    marginTop: '2vh'
  }
})

const Cart = ({
  cart,
  removeFromCart,
  goToCheckout,
  goToCatalog,
  classes,
  history
}) => {
  const { products, quantity } = cart.cart
  return (
    <div className={classes.root}>
      <Typography align="center" variant="body2">
        {products.length === 0
          ? 'Empty Cart'
          : `${products.length} Items in Cart`}
      </Typography>
      <Divider />
      <br />
      {products.length > 0 &&
        products.map((p, i) => {
          return (
            <Slide
              key={`cart-item-${i}`}
              direction="right"
              in={p.id ? true : false}
              mountOnEnter
              unmountOnExit
            >
              <div className={classes.cartItem}>
                <div
                  className={classes.thumbnail}
                  style={{ backgroundImage: `url(${p.images[0]})` }}
                />
                <div className={classes.data}>
                  <Typography variant="body2">{p.title}</Typography>
                  <Typography variant="caption">
                    {quantity[i]} @ ${p.price}
                  </Typography>
                  <Typography variant="body2">
                    ${parseFloat((quantity[i] * p.price).toFixed(2))}
                  </Typography>
                </div>
                <div>
                  <IconButton onClick={() => removeFromCart(i)}>
                    <CancelIcon />
                  </IconButton>
                </div>
              </div>
            </Slide>
          )
        })}
      {products.length > 0 && (
        <Button
          variant="raised"
          color="secondary"
          onClick={goToCheckout}
          fullWidth
        >
          Checkout &nbsp;&nbsp;
          <NextIcon />
        </Button>
      )}
      <Button
        variant="raised"
        color="secondary"
        onClick={goToCatalog}
        fullWidth
        className={classes.catalogButton}
      >
        <PrevIcon /> &nbsp;&nbsp; Catalog
      </Button>
    </div>
  )
}

export default withStyles(styles)(Cart)
