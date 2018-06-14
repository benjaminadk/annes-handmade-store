import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  header: {
    textAlign: 'center',
    marginTop: '5vh'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5vh'
  },
  card: {
    width: '65vw'
  },
  quantity: {
    marginLeft: theme.spacing.unit * 2
  },
  thumbnail: {
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '4vw',
    width: '4vw',
    border: '1px solid #000000'
  },
  totals: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '2.5vh'
  },
  backButton: {
    width: '25vw',
    margin: '5vh 37vw'
  }
})

class Complete extends Component {
  componentWillUnmount() {
    if (this.props.icon3) {
      this.props.clearCart()
    }
  }

  render() {
    const { getCartById, classes } = this.props
    const {
      cart: { products, quantity },
      subTotal,
      taxRate,
      taxTotal,
      total
    } = getCartById
    return (
      <div>
        <Typography variant="display2" className={classes.header}>
          Congratulations. Sale Completed Successfully.
        </Typography>
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardHeader title="Reciept for order #1234s" />
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell numeric>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((p, i) => (
                    <TableRow key={`complete-${i}`}>
                      <TableCell>
                        <Typography variant="body2">{p.title}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          className={classes.quantity}
                        >
                          {quantity[i]}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <div
                          className={classes.thumbnail}
                          style={{ backgroundImage: `url(${p.images[0]})` }}
                        />
                      </TableCell>
                      <TableCell numeric>
                        <Typography variant="caption">
                          {quantity[i]} x {p.price}
                        </Typography>
                        <Typography variant="body2">
                          $ {parseFloat((quantity[i] * p.price).toFixed(2))}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={classes.totals}>
                <div>
                  <Typography variant="caption">Subtotal:</Typography>
                  <Typography variant="caption">Tax Rate:</Typography>
                  <Typography variant="caption">Tax:</Typography>
                  <Typography variant="body2">Total:</Typography>
                </div>
                <div>
                  <Typography variant="caption" align="right">
                    $ {subTotal}
                  </Typography>
                  <Typography variant="caption" align="right">
                    {taxRate * 100} %
                  </Typography>
                  <Typography variant="caption" align="right">
                    $ {taxTotal}
                  </Typography>
                  <Typography variant="body2" align="right">
                    $ {total}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button
          variant="raised"
          color="primary"
          size="large"
          className={classes.backButton}
          onClick={() => this.props.clearCart}
        >
          Continue Shopping
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(Complete)
