import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Rating from 'react-rating'
import StarIcon from '@material-ui/icons/Star'
//import { findAverage } from '../utils/findAverage'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 5vh'
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1vh'
  },
  subTitle: {
    marginLeft: '1.5vw'
  },
  price: {
    display: 'flex',
    alignItems: 'center'
  },
  pricePadding: {
    paddingRight: theme.spacing.unit * 0.5,
    paddingLeft: theme.spacing.unit * 0.5
  },
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  emptyStar: {
    color: 'lightgrey',
    fontSize: 35
  },
  fullStar: {
    color: 'yellow',
    fontSize: 35
  }
})

const Details = ({
  product,
  quantity,
  handleChange,
  addToCart,
  disableAddToCart,
  classes
}) => {
  const isDisabled = disableAddToCart(product)
  //const initialRating = findAverage(product.ratings)
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="title">{product.title}</Typography>
        <Typography variant="caption" className={classes.subTitle}>
          {product.variant === 1
            ? 'Necklace'
            : product.variant === 2
              ? 'Bracelet'
              : 'Earrings'}
        </Typography>
      </div>
      <Rating
        initialRating={4}
        emptySymbol={<StarIcon className={classes.emptyStar} />}
        fullSymbol={<StarIcon className={classes.fullStar} />}
        fractions={4}
        readonly
      />
      <Divider />
      <br />
      <div className={classes.price}>
        <Typography variant="caption" className={classes.pricePadding}>
          Price:{' '}
        </Typography>
        <Typography variant="title" className={classes.pricePadding}>
          $ {product.price}
        </Typography>
        <Typography variant="body2" className={classes.pricePadding}>
          & FREE Shipping
        </Typography>
      </div>
      <br />
      <div className={classes.quantity}>
        <TextField
          type="number"
          name="quantity"
          label="Quantity"
          inputProps={{ min: 0, max: product.stock }}
          onChange={handleChange}
          value={product.stock === 0 ? 0 : quantity}
        />
        <Button
          variant="raised"
          color="primary"
          disabled={isDisabled}
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </Button>
      </div>
      <br />
      <Typography variant="title">
        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
      </Typography>
      <Typography variant="caption">{product.stock} Available</Typography>
      <br />
      <Typography>{product.description}</Typography>
      <br />
      <Divider />
      <br />
    </div>
  )
}

export default withStyles(styles)(Details)
