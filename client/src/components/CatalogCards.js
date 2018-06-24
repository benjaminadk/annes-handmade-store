import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import AddCartIcon from '@material-ui/icons/AddShoppingCart'
import ZoomIcon from '@material-ui/icons/ZoomIn'

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
    marginBottom: '5vh',
    [theme.breakpoints.down('sm')]: {
      height: '50vh',
      width: '80vw'
    }
  },
  image: {
    height: '30vh',
    width: '30vh',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: '80vw',
      width: '80vw'
    }
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
  }
})

const CatalogCards = ({ classes, products, cardClick, cartShortcut }) => (
  <div key="card" className={classes.root}>
    {products &&
      products.map((p, i) => {
        return (
          <Card key={`product-card-${i}`} raised className={classes.card}>
            <Tooltip
              title={`Click to view ${p.title}`}
              placement="top"
              enterDelay={500}
            >
              <CardMedia
                image={p.images[0]}
                className={classes.image}
                onClick={() => cardClick(p.id)}
              />
            </Tooltip>
            <CardContent className={classes.cardContent}>
              <Typography
                variant="button"
                className={classes.title}
                align="center"
              >
                {p.title}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions} disableActionSpacing>
              <Tooltip title="Add to cart now" enterDelay={500}>
                <IconButton onClick={() => cartShortcut(p.id)} color="primary">
                  <AddCartIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="View product details" enterDelay={500}>
                <IconButton onClick={() => cardClick(p.id)} color="primary">
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
)

export default withStyles(styles)(CatalogCards)
