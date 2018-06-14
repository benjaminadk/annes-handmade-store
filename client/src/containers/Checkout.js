import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Elements } from 'react-stripe-elements'
import { GET_CART_BY_ID_QUERY } from '../queries/getCartById'
import { GET_SHIPPINGS_BY_ID_QUERY } from '../queries/getShippingsById'
import { GET_BILLINGS_BY_ID_QUERY } from '../queries/getBillingsById'
import { EDIT_CART_QUANTITY } from '../mutations/editCartQuantity'
import { REMOVE_PRODUCT_FROM_CART } from '../mutations/removeProductFromCart'
import { CREATE_SHIPPING } from '../mutations/createShipping'
import { CREATE_BILLING } from '../mutations/createBilling'
import { EMPTY_CART_MUTATION } from '../mutations/emptyCart'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CheckIcon from '@material-ui/icons/CheckCircle'
import CircleIcon from '@material-ui/icons/PanoramaFishEye'
import PrevIcon from '@material-ui/icons/ArrowBack'
import CheckoutConfirm from '../components/Checkout.Confirm'
import CheckoutAddress from '../components/Checkout.Address'
import CheckoutAddressDialog from '../components/Checkout.Address.Dialog'
import CheckoutPayment from '../components/Checkout.Payment'
import CheckoutComplete from '../components/Checkout.Complete'
import CheckoutConfirmDialog from '../components/Checkout.Confirm.Dialog'
import jd from 'jwt-decode'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '5vh'
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backButton: {
    width: '15vw',
    margin: '0 5vw'
  },
  title: {
    marginLeft: '15vw'
  },
  appBar: {
    width: '90vw',
    marginLeft: '5vw',
    marginRight: '5vw',
    zIndex: 2
  }
})

class Checkout extends Component {
  state = {
    index: 0,
    icon_0: false,
    icon_1: false,
    icon_2: false,
    icon_3: false,
    addressDialog: false,
    addressMenu: false,
    addressType: 'ship',
    title: '',
    email: '',
    firstName: '',
    lastName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    notes: '',
    shipsIndex: 0,
    billsIndex: 0,
    addressMatch: true,
    open: false,
    remove: false,
    toRemove: '',
    toRemoveIndex: null
  }

  componentDidMount() {
    const bills = JSON.parse(localStorage.getItem('BILLS'))
    if (bills.length) {
      this.setState({ addressMatch: false })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !nextProps.cart.loading &&
      nextProps.cart.getCartById.cart.products.length > 0
    ) {
      for (
        let i = 0;
        i < nextProps.cart.getCartById.cart.products.length;
        i++
      ) {
        this.setState({
          [`edit-mode-${i}`]: false,
          [`quantity-${i}`]: nextProps.cart.getCartById.cart.quantity[i]
        })
      }
    }
  }

  componentDidUpdate() {
    if (this.state.remove) {
      this.setState({ remove: false })
      const cartId = localStorage.getItem('CART_ID')
      this.props
        .removeProductFromCart({
          variables: { cartId, index: this.state.toRemoveIndex },
          refetchQueries: [
            { query: GET_CART_BY_ID_QUERY, variables: { cartId } }
          ]
        })
        .then(() => {
          this.props.updateCartBadge(false)
        })
    }
  }

  clearCart = async () => {
    const cartId = localStorage.getItem('CART_ID')
    await this.props.emptyCart({
      variables: { cartId },
      refetchQueries: [{ query: GET_CART_BY_ID_QUERY, variables: { cartId } }]
    })
    this.props.resetCartBadge()
  }

  backToShopping = async () => {
    this.props.handleBottomNav(null, '/catalog')
    this.props.history.push('/catalog')
    if (this.state.icon_3) {
      await this.clearCart()
    }
  }

  handleIndex = index => this.setState({ index, [`icon_${index - 1}`]: true })

  backIndex = index => this.setState({ index, [`icon_${index}`]: false })

  handleSuccessSale = () => this.setState({ icon_3: true })

  handleQuantity = (event, index) =>
    this.setState({ [`quantity-${index}`]: parseInt(event.target.value, 10) })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  openAddressDialog = addressType =>
    this.setState({ addressDialog: true, addressMenu: false, addressType })

  closeAddressDialog = e => this.setState({ addressDialog: false })

  openAddressMenu = () => this.setState({ addressMenu: true })

  closeAddressMenu = () => this.setState({ addressMenu: false })

  billingToShipping = i =>
    this.setState({ shipsIndex: i, addressMatch: true, addressMenu: false })

  billingToBilling = i =>
    this.setState({ billsIndex: i, addressMatch: false, addressMenu: false })

  openEditQuantity = i => this.setState({ [`edit-mode-${i}`]: true })

  editQuantity = async index => {
    const quantity = this.state[`quantity-${index}`]
    const cartId = localStorage.getItem('CART_ID')
    await this.props.editCartQuantity({
      variables: { cartId, index, quantity },
      refetchQueries: [{ query: GET_CART_BY_ID_QUERY, variables: { cartId } }]
    })
    await this.setState({ [`edit-mode-${index}`]: false })
  }

  cancelEdit = (index, originalQuantity) =>
    this.setState({
      [`edit-mode-${index}`]: false,
      [`quantity-${index}`]: originalQuantity
    })

  removeFromCart = async (index, title) => {
    await this.setState({ open: true, toRemove: title, toRemoveIndex: index })
  }

  onClose = remove => this.setState({ open: false, remove })

  saveAddress = async () => {
    const {
      title,
      email,
      firstName,
      lastName,
      street1,
      street2,
      city,
      state,
      zip,
      notes
    } = this.state
    let userId = null
    const token = localStorage.getItem('TOKEN')
    if (token) {
      const decoded = jd(token)
      userId = decoded.id
    }
    if (this.state.addressType === 'ship') {
      let ships = JSON.parse(localStorage.getItem('SHIPS')) || []
      let response = await this.props.createShipping({
        variables: {
          input: {
            userId,
            title,
            email,
            firstName,
            lastName,
            street1,
            street2,
            city,
            state,
            zip,
            notes
          }
        }
      })
      let shippingId = response.data.createShipping.id
      ships.push(shippingId)
      localStorage.setItem('SHIPS', JSON.stringify(ships))
      this.props.ships.refetch({ shippingIds: ships })
    } else if (this.state.addressType === 'bill') {
      let bills = JSON.parse(localStorage.getItem('BILLS')) || []
      let response = await this.props.createBilling({
        variables: {
          input: {
            userId,
            title,
            email,
            firstName,
            lastName,
            street1,
            street2,
            city,
            state,
            zip
          }
        }
      })
      let billingId = response.data.createBilling.id
      bills.push(billingId)
      localStorage.setItem('BILLS', JSON.stringify(bills))
      await this.props.bills.refetch({ billingIds: bills })
      await this.setState({
        billsIndex: bills.length - 1,
        addressMatch: false
      })
    }
    this.resetAddressForm()
  }

  resetAddressForm = () =>
    this.setState({
      addressDialog: false,
      title: '',
      email: '',
      firstName: '',
      lastName: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      notes: ''
    })

  selectShippingAddress = (e, checked) =>
    this.setState({ shipsIndex: parseInt(e.target.value, 10) })

  selectShippingAddress2 = i => this.setState({ shipsIndex: i })

  render() {
    const {
      cart: { loading: loading1, getCartById },
      ships: { loading: loading2, getShippingsById },
      bills: { loading: loading3, getBillingsById },
      classes
    } = this.props
    if (loading1 || loading2 || loading3) return null
    return [
      <div key="checkout-main" className={classes.root}>
        <div className={classes.top}>
          <Button
            variant="raised"
            color="secondary"
            size="medium"
            onClick={this.backToShopping}
            className={classes.backButton}
          >
            <PrevIcon />
            Back to Shopping
          </Button>
          <Typography variant="display3" className={classes.title}>
            Checkout
          </Typography>
        </div>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={this.state.index} fullWidth centered>
            <Tab
              label="Confirm Order"
              icon={this.state.icon_0 ? <CheckIcon /> : <CircleIcon />}
            />
            <Tab
              label="Shipping Address"
              icon={this.state.icon_1 ? <CheckIcon /> : <CircleIcon />}
            />
            <Tab
              label="Payment Options"
              icon={this.state.icon_2 ? <CheckIcon /> : <CircleIcon />}
            />
            <Tab
              label="Complete Order"
              icon={this.state.icon_3 ? <CheckIcon /> : <CircleIcon />}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews index={this.state.index}>
          <CheckoutConfirm
            getCartById={getCartById}
            state={this.state}
            handleIndex={this.handleIndex}
            handleQuantity={this.handleQuantity}
            openEditQuantity={this.openEditQuantity}
            editQuantity={this.editQuantity}
            cancelEdit={this.cancelEdit}
            removeFromCart={this.removeFromCart}
          />
          <CheckoutAddress
            openAddressDialog={this.openAddressDialog}
            ships={getShippingsById}
            selectShippingAddress={this.selectShippingAddress}
            selectShippingAddress2={this.selectShippingAddress2}
            handleIndex={this.handleIndex}
            backIndex={this.backIndex}
            shipsIndex={this.state.shipsIndex}
          />
          <Elements>
            <CheckoutPayment
              ships={getShippingsById}
              bills={getBillingsById}
              getCartById={getCartById}
              handleIndex={this.handleIndex}
              handleSuccessSale={this.handleSuccessSale}
              openAddressMenu={this.openAddressMenu}
              closeAddressMenu={this.closeAddressMenu}
              billingToShipping={this.billingToShipping}
              billingToBilling={this.billingToBilling}
              openAddressDialog={this.openAddressDialog}
              shipsIndex={this.state.shipsIndex}
              billsIndex={this.state.billsIndex}
              addressMatch={this.state.addressMatch}
              addressMenu={this.state.addressMenu}
            />
          </Elements>
          <CheckoutComplete
            getCartById={getCartById}
            clearCart={this.clearCart}
            icon3={this.state.icon_3}
          />
        </SwipeableViews>
      </div>,
      <CheckoutAddressDialog
        key="shipping-address-dialog"
        handleChange={this.handleChange}
        closeAddressDialog={this.closeAddressDialog}
        open={this.state.addressDialog}
        saveAddress={this.saveAddress}
        addressType={this.state.addressType}
        title={this.state.title}
        email={this.state.email}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        street1={this.state.street1}
        street2={this.state.street2}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
        notes={this.state.notes}
      />,
      <CheckoutConfirmDialog
        key="confirm-remove"
        open={this.state.open}
        onClose={this.onClose}
        toRemove={this.state.toRemove}
      />
    ]
  }
}

export default compose(
  withStyles(styles),
  graphql(GET_BILLINGS_BY_ID_QUERY, {
    name: 'bills',
    options: props => ({
      variables: {
        billingIds: JSON.parse(localStorage.getItem('BILLS'))
      }
    })
  }),
  graphql(GET_SHIPPINGS_BY_ID_QUERY, {
    name: 'ships',
    options: props => ({
      variables: {
        shippingIds: JSON.parse(localStorage.getItem('SHIPS'))
      }
    })
  }),
  graphql(GET_CART_BY_ID_QUERY, {
    name: 'cart',
    options: props => ({
      variables: { cartId: localStorage.getItem('CART_ID') }
    })
  }),
  graphql(EDIT_CART_QUANTITY, { name: 'editCartQuantity' }),
  graphql(REMOVE_PRODUCT_FROM_CART, { name: 'removeProductFromCart' }),
  graphql(CREATE_SHIPPING, { name: 'createShipping' }),
  graphql(CREATE_BILLING, { name: 'createBilling' }),
  graphql(EMPTY_CART_MUTATION, { name: 'emptyCart' })
)(Checkout)
