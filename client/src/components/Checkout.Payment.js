import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListSubheader from '@material-ui/core/ListSubheader'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import { CREATE_SALE } from '../mutations/createSale'
import { GET_ALL_PRODUCTS_QUERY } from '../queries/getAllProducts'

const styles = theme => ({
  header: {
    marginTop: '5vh',
    marginBottom: '2.5vh'
  },
  root: {
    margin: '5vh 5vw',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse'
    }
  },
  title: {
    marginBottom: '5vh'
  },
  stripeElement: {
    display: 'block',
    margin: '2.5vh 0 5vh 0',
    width: '40vw',
    padding: '10px 14px',
    boxShadow:
      'rgba(50, 50, 93, 0.14902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
    border: '1px solid #6b7c93',
    borderRadius: '5px',
    fontFamily: 'Roboto',
    [theme.breakpoints.down('sm')]: {
      width: '80vw'
    }
  },
  label: {
    fontFamily: 'Roboto',
    color: '#6b7c93',
    fontWeight: 600,
    letterSpacing: '0.025em'
  },
  buttonContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  confirmButton: {
    [theme.breakpoints.down('sm')]: {
      width: '80vw'
    }
  },
  card: {
    width: '20vw',
    border: '3px solid #3f51b5',
    [theme.breakpoints.down('sm')]: {
      width: '80vw'
    }
  },
  cardTitle: {
    marginLeft: '2vw'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addressSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '5vh'
  },
  addressButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2.5vh',
    marginBottom: '5vh'
  },
  error: {
    color: 'red',
    marginTop: '2vh'
  }
})

class Payment extends Component {
  state = {
    error: false,
    errorMessage: '',
    open: false
  }

  handleSaleResponse = (success, type, code, message) => {
    if (success) {
      this.props.handleIndex(3)
      this.props.handleSuccessSale()
    } else {
      this.setState({ open: true, type, code, errorMessage: message })
    }
  }

  submitForm = async e => {
    e.preventDefault()
    const user = window.localStorage.getItem('USER_ID')
    const {
      ships,
      bills,
      getCartById: {
        total,
        cart: { quantity, products }
      },
      shipsIndex,
      billsIndex,
      addressMatch
    } = this.props
    const address = addressMatch ? ships[shipsIndex] : bills[billsIndex]
    const { token, error } = await this.props.stripe.createToken({
      name: `${address.firstName} ${address.lastName}`,
      address_line1: address.street1,
      address_line2: address.street2 || '',
      address_city: address.city,
      address_state: address.state,
      address_country: 'US'
    })
    if (error) {
      this.setState({ open: true, errorMessage: error.message })
      return
    }
    if (token) {
      let response = await this.props.createSale({
        variables: {
          input: {
            token,
            user,
            products: JSON.stringify(products),
            quantity,
            total,
            billingAddressId: address.id,
            shippingAddressId: ships[shipsIndex].id,
            email: address.email
          }
        },
        refetchQueries: [{ query: GET_ALL_PRODUCTS_QUERY }]
      })
      const { success, type, code, message } = response.data.createSale
      this.handleSaleResponse(success, type, code, message)
    }
  }

  closeDialog = () => this.setState({ open: false })

  render() {
    const {
      classes,
      shipsIndex,
      billsIndex,
      ships,
      bills,
      addressMatch,
      addressMenu,
      openAddressMenu,
      closeAddressMenu,
      billingToShipping,
      billingToBilling,
      openAddressDialog
    } = this.props
    const shipping = ships[shipsIndex] || null
    const billing = bills[billsIndex] || null
    return [
      <div key="checkout-payment">
        <Typography
          variant="display2"
          align="center"
          className={classes.header}
        >
          Payment Options
        </Typography>
        <div className={classes.root}>
          <div>
            <Typography
              variant="title"
              align="center"
              className={classes.title}
            >
              Credit Card Information
            </Typography>
            <form onSubmit={this.submitForm}>
              <label className={classes.label}>
                Card Number
                <CardNumberElement className={classes.stripeElement} />
              </label>
              <label className={classes.label}>
                Expiration Date
                <CardExpiryElement className={classes.stripeElement} />
              </label>
              <label className={classes.label}>
                CVC
                <CardCVCElement className={classes.stripeElement} />
              </label>
              <label className={classes.label}>
                Postal Code
                <PostalCodeElement className={classes.stripeElement} />
              </label>
              <div className={classes.buttonContainer}>
                <Button
                  type="submit"
                  variant="raised"
                  color="secondary"
                  size="large"
                  className={classes.confirmButton}
                >
                  Confirm Payment
                </Button>
              </div>
            </form>
          </div>
          <div>
            <Typography
              variant="title"
              align="center"
              className={classes.title}
            >
              Billing Address
            </Typography>
            <div className={classes.addressSection}>
              {ships.length && (
                <Card className={classes.card}>
                  <div className={classes.cardHeader}>
                    <Typography variant="title" className={classes.cardTitle}>
                      {addressMatch ? shipping.title : billing.title}
                    </Typography>
                    <Checkbox checked={true} disableRipple={true} />
                  </div>
                  <CardContent>
                    <Typography variant="body2">
                      {addressMatch
                        ? `${shipping.firstName} ${shipping.lastName}`
                        : `${billing.firstName} ${billing.lastName}`}
                    </Typography>
                    <Typography variant="body2">
                      {addressMatch ? shipping.street1 : billing.street1}
                    </Typography>
                    {addressMatch &&
                      shipping.street2 && (
                        <Typography variant="body2">
                          {shipping.street2}
                        </Typography>
                      )}
                    {!addressMatch &&
                      billing.street2 && (
                        <Typography variant="body2">
                          {billing.street2}
                        </Typography>
                      )}
                    <Typography variant="body2">
                      {addressMatch
                        ? `${shipping.city}, ${shipping.state}`
                        : `${billing.city}, ${billing.state}`}
                    </Typography>
                    <Typography variant="body2">
                      {addressMatch ? shipping.zip : billing.zip}
                    </Typography>
                    <Typography variant="body2">
                      {addressMatch ? shipping.email : billing.email}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </div>
            <Typography variant="body2" align="center">
              Is your Billing Address different than your Shipping Address?
            </Typography>
            <div className={classes.addressButton}>
              <Button
                id="anchorEl"
                variant="raised"
                color="secondary"
                size="large"
                onClick={openAddressMenu}
              >
                Change Billing Address
              </Button>
              <Menu
                anchorEl={document.getElementById('anchorEl')}
                open={addressMenu}
                onClose={closeAddressMenu}
              >
                <ListSubheader>Shipping</ListSubheader>
                {ships.length &&
                  ships.map((s, i) => (
                    <MenuItem
                      key={`address-ship-${i}`}
                      onClick={() => billingToShipping(i)}
                    >
                      {s.title}
                    </MenuItem>
                  ))}
                {bills.length && <ListSubheader>Billing</ListSubheader>}
                {bills.length &&
                  bills.map((b, j) => (
                    <MenuItem
                      key={`address-bill-${j}`}
                      onClick={() => billingToBilling(j)}
                    >
                      {b.title}
                    </MenuItem>
                  ))}
                <Divider />
                <MenuItem onClick={() => openAddressDialog('bill')}>
                  <AddIcon /> &nbsp; New Address
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>,
      <Dialog
        key="payment-error"
        open={this.state.open}
        onClose={this.closeDialog}
      >
        <DialogTitle disableTypography>Payment Error</DialogTitle>
        <DialogContent>
          <Typography variant="body2" align="center" className={classes.error}>
            {this.state.errorMessage}
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
  injectStripe,
  withStyles(styles),
  graphql(CREATE_SALE, { name: 'createSale' })
)(Payment)
