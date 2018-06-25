import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide'
import Hidden from '@material-ui/core/Hidden'
import RemoveCartIcon from '@material-ui/icons/RemoveShoppingCart'
import AddIcon from '@material-ui/icons/AddCircle'
import NextIcon from '@material-ui/icons/ArrowForward'

const styles = theme => ({
  root: {
    marginLeft: '5vw',
    marginRight: '5vw'
  },
  header: {
    marginTop: '5vh',
    marginBottom: '5vh'
  },
  headers: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column'
  },
  quantity: {
    paddingLeft: theme.spacing.unit * 10
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 8
  },
  thumbnail: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '4vw',
    width: '4vw',
    border: `1px solid ${theme.palette.primary.main}`
  },
  math: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  margin: {
    marginRight: theme.spacing.unit * 2
  },
  button: {
    float: 'right',
    marginTop: '2.5vh'
  }
})

const Confirm = ({
  getCartById,
  state,
  handleIndex,
  openEditQuantity,
  handleQuantity,
  editQuantity,
  cancelEdit,
  removeFromCart,
  classes
}) => {
  const {
    cart: { products, quantity },
    subTotal,
    taxRate,
    taxTotal,
    total
  } = getCartById
  return (
    <div className={classes.root}>
      <Typography variant="display1" align="center" className={classes.header}>
        Review Your Order
      </Typography>
      <div className={classes.headers}>
        <Typography variant="body2">Actions</Typography>
        <Typography variant="body2">Quantity</Typography>
        <Typography variant="body2">Item</Typography>
        <Typography variant="body2">Price</Typography>
      </div>
      <Divider />
      <br />
      {products &&
        products.map((p, i) => {
          return (
            <div key={`confirm-item-${i}`} className={classes.row}>
              <div className={classes.actions}>
                <Hidden smDown>
                  <Tooltip
                    title="Edit Quantity"
                    placement="right"
                    enterDelay={500}
                  >
                    <IconButton onClick={() => openEditQuantity(i)}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Hidden>
                <Tooltip
                  title="Remove From Cart"
                  placement="right"
                  enterDelay={500}
                >
                  <IconButton onClick={() => removeFromCart(i, p.title)}>
                    <RemoveCartIcon />
                  </IconButton>
                </Tooltip>
              </div>
              {!state[`edit-mode-${i}`] && (
                <Typography variant="body2" className={classes.quantity}>
                  {quantity[i]}
                </Typography>
              )}
              {state[`edit-mode-${i}`] && (
                <Slide
                  direction="right"
                  in={state[`edit-mode-${i}`]}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <TextField
                      type="number"
                      value={state[`quantity-${i}`]}
                      onChange={e => handleQuantity(e, i)}
                      inputProps={{ min: 1, max: p.stock }}
                      className={classes.margin}
                    />
                    <Button
                      variant="raised"
                      color="primary"
                      size="small"
                      onClick={() => editQuantity(i)}
                      disabled={state[`quantity-${i}`] === quantity[i]}
                      className={classes.margin}
                    >
                      Update
                    </Button>
                    <Button
                      variant="raised"
                      size="small"
                      onClick={() => cancelEdit(i, quantity[i])}
                    >
                      Cancel
                    </Button>
                  </div>
                </Slide>
              )}
              <div className={classes.item}>
                <Hidden smDown>
                  <div
                    className={classes.thumbnail}
                    style={{ backgroundImage: `url(${p.images[0]})` }}
                  />
                </Hidden>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ width: '8vw' }}
                >
                  {p.title}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" align="right">
                  {quantity[i]} x {p.price}
                </Typography>
                <Typography variant="body2" align="right">
                  $ {parseFloat(quantity[i] * p.price).toFixed(2)}
                </Typography>
              </div>
            </div>
          )
        })}
      <br />
      <Divider />
      <br />
      <div className={classes.math}>
        <div>
          <Typography variant="body2">Subtotal:</Typography>
          <Typography variant="body2">Tax Rate:</Typography>
          <Typography variant="body2">Tax:</Typography>
          <Typography variant="title">Total:</Typography>
        </div>
        <div>
          <Typography variant="body2" align="right">
            $ {subTotal ? subTotal.toFixed(2) : '0.00'}
          </Typography>
          <Typography variant="body2" align="right">
            {(taxRate * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2" align="right">
            $ {taxTotal ? taxTotal.toFixed(2) : '0.00'}
          </Typography>
          <Typography variant="title" align="right">
            $ {total ? total.toFixed(2) : '0.00'}
          </Typography>
        </div>
      </div>
      <Button
        variant="raised"
        color="secondary"
        onClick={() => handleIndex(1)}
        className={classes.button}
      >
        Continue &nbsp;&nbsp; <NextIcon />
      </Button>
    </div>
  )
}

export default withStyles(styles)(Confirm)
