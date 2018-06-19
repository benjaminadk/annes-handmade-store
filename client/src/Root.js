import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { PropsRoute } from './utils/PropsRoute'
import { graphql, compose } from 'react-apollo'
import { CREATE_CART_MUTATION } from './mutations/createCart'
import { LOGIN_MUTATION } from './mutations/login'
import { SIGNUP_MUTATION } from './mutations/signup'
import { AUTO_LOGIN_MUTATION } from './mutations/autoLogin'
import { withStyles } from '@material-ui/core/styles'
import Home from './containers/Home'
import Catalog from './containers/Catalog'
import Product from './containers/Product'
import Checkout from './containers/Checkout'
import User from './containers/User'
import Help from './containers/Help'
import About from './containers/About'
import LoginDialog from './components/Root.Login'
import RootAppBar from './components/Root.AppBar'
import BottomNav from './components/Root.BottomNav'
import jd from 'jwt-decode'
import 'typeface-roboto'

const styles = theme => ({})

class Root extends Component {
  state = {
    cartSize: 0,
    loggedIn: false,
    loginMode: true,
    username: '',
    password: '',
    passwordError: false,
    open: false,
    errorMessage: '',
    avatar: '',
    value: 0
  }

  componentDidMount = async () => {
    const token = localStorage.getItem('TOKEN')
    const cartId = localStorage.getItem('CART_ID')
    const ships = localStorage.getItem('SHIPS')
    const bills = localStorage.getItem('BILLS')
    const avatar = localStorage.getItem('AVATAR')
    let response
    if (token) {
      const decoded = jd(token)
      localStorage.setItem('CART_ID', decoded.cartId)
      localStorage.setItem('USER_ID', decoded.id)
      response = await this.props.autoLogin({
        variables: { userId: decoded.id }
      })
      const ships = []
      response.data.autoLogin.user.ships.forEach(s => ships.push(s.id))
      localStorage.setItem('SHIPS', JSON.stringify(ships))
      const bills = []
      response.data.autoLogin.user.bills.forEach(b => bills.push(b.id))
      localStorage.setItem('BILLS', JSON.stringify(bills))
      this.setState({
        loggedIn: true,
        cartSize: response.data.autoLogin.user.cart.quantity.length
      })
      if (avatar) {
        this.setState({ avatar })
      }
    }
    if (!token && !cartId) {
      response = await this.props.createCart()
      localStorage.setItem('CART_ID', response.data.createCart.id)
    }
    if (!ships) {
      localStorage.setItem('SHIPS', JSON.stringify([]))
    }
    if (!bills) {
      localStorage.setItem('BILLS', JSON.stringify([]))
    }
  }

  handleCartClick = () => {
    if (this.state.cartSize > 0) {
      this.handleBottomNav(null, '/checkout')
      this.props.history.push(`/checkout/${localStorage.getItem('CART_ID')}`)
    }
  }

  handleLoginClick = () => {
    if (!this.state.loggedIn) {
      this.setState({ open: true })
    } else {
      this.setState({ loggedIn: false })
      localStorage.removeItem('TOKEN')
      localStorage.removeItem('CART_ID')
      localStorage.removeItem('BILLS')
      localStorage.removeItem('SHIPS')
      localStorage.removeItem('USER_ID')
    }
  }

  handleLoginSignup = async () => {
    let response
    const { username, password } = this.state
    if (!username || !password) {
      return this.setState({ errorMessage: 'email and password required' })
    }
    if (this.state.loginMode) {
      response = await this.props.login({
        variables: { username, password }
      })
      if (response.data.login.success) {
        this.setState({
          open: false,
          loggedIn: true,
          cartSize: response.data.login.user.cart.quantity.length,
          username: '',
          password: ''
        })
        const { jwt, id, avatar } = response.data.login.user
        localStorage.setItem('TOKEN', jwt)
        localStorage.setItem('CART_ID', response.data.login.user.cart.id)
        localStorage.setItem('USER_ID', id)
        if (avatar) {
          localStorage.setItem('AVATAR', response.data.login.user.avatar)
          this.setState({ avatar })
        }
        const ships = []
        response.data.login.user.ships.forEach(s => ships.push(s.id))
        localStorage.setItem('SHIPS', JSON.stringify(ships))
        const bills = []
        response.data.login.user.bills.forEach(b => bills.push(b.id))
        localStorage.setItem('BILLS', JSON.stringify(bills))
      } else {
        this.setState({ errorMessage: response.data.login.message })
      }
    } else {
      response = await this.props.signup({
        variables: { username, password }
      })
      if (response.data.signup.success) {
        this.setState({
          open: false,
          loggedIn: true,
          username: '',
          password: ''
        })
        localStorage.setItem('TOKEN', response.data.signup.user.jwt)
        localStorage.setItem('CART_ID', response.data.signup.user.cart.id)
        localStorage.setItem('SHIPS', JSON.stringify([]))
        localStorage.setItem('BILLS', JSON.stringify([]))
        localStorage.setItem('USER_ID', response.data.signup.user.id)
      } else {
        if (response.data.signup.message === 'password error') {
          this.setState({
            passwordError: true,
            errorMessage: response.data.signup.message
          })
        } else {
          this.setState({ errorMessage: response.data.signup.message })
        }
      }
    }
  }

  closeLoginDialog = e =>
    this.setState({
      open: false,
      username: '',
      password: '',
      errorMessage: '',
      passwordError: false
    })

  toggleLoginMode = () =>
    this.setState({
      loginMode: !this.state.loginMode,
      errorMessage: '',
      passwordError: false
    })

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
      passwordError: false
    })

  updateCartBadge = add => {
    if (add) {
      this.setState({ cartSize: this.state.cartSize + 1 })
    } else {
      this.setState({ cartSize: this.state.cartSize - 1 })
    }
  }

  resetCartBadge = () => this.setState({ cartSize: 0 })

  setRootAvatar = avatar => {
    this.setState({ avatar })
    localStorage.setItem('AVATAR', avatar)
  }

  handleBottomNav = (event, value) => {
    this.setState({ value })
    if (value === '/checkout') {
      return this.props.history.push(
        `${value}/${localStorage.getItem('CART_ID')}`
      )
    }
    this.props.history.push(`${value}`)
  }

  render() {
    return [
      <div key="root">
        <RootAppBar
          handleCartClick={this.handleCartClick}
          handleLoginClick={this.handleLoginClick}
          handleBottomNav={this.handleBottomNav}
          cartSize={this.state.cartSize}
          avatar={this.state.avatar}
          loggedIn={this.state.loggedIn}
        />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <PropsRoute
              path="/catalog"
              component={Catalog}
              updateCartBadge={this.updateCartBadge}
              handleBottomNav={this.handleBottomNav}
            />
            <PropsRoute
              path="/product/:id"
              component={Product}
              updateCartBadge={this.updateCartBadge}
              handleBottomNav={this.handleBottomNav}
            />
            <PropsRoute
              path="/checkout/:id"
              component={Checkout}
              updateCartBadge={this.updateCartBadge}
              resetCartBadge={this.resetCartBadge}
              handleBottomNav={this.handleBottomNav}
            />
            <PropsRoute
              path="/user/:userId"
              component={User}
              setRootAvatar={this.setRootAvatar}
            />
            <PropsRoute path="/help" component={Help} />
            <PropsRoute path="/about" component={About} />
          </Switch>
          <BottomNav
            value={this.state.value}
            handleBottomNav={this.handleBottomNav}
          />
        </div>
      </div>,
      <LoginDialog
        key="login"
        open={this.state.open}
        loginMode={this.state.loginMode}
        username={this.state.username}
        password={this.state.password}
        passwordError={this.state.passwordError}
        errorMessage={this.state.errorMessage}
        closeLoginDialog={this.closeLoginDialog}
        toggleLoginMode={this.toggleLoginMode}
        handleChange={this.handleChange}
        handleLoginSignup={this.handleLoginSignup}
      />
    ]
  }
}

export default compose(
  withRouter,
  withStyles(styles),
  graphql(CREATE_CART_MUTATION, { name: 'createCart' }),
  graphql(LOGIN_MUTATION, { name: 'login' }),
  graphql(SIGNUP_MUTATION, { name: 'signup' }),
  graphql(AUTO_LOGIN_MUTATION, { name: 'autoLogin' })
)(Root)
