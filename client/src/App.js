import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'
import Root from './Root'

class App extends Component {
  constructor() {
    super()
    this.state = { stripe: null }
  }
  componentDidMount() {
    if (window.Stripe) {
      this.setState({ stripe: window.Stripe(REACT_APP_STRIPE_TEST) })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({ stripe: window.Stripe(REACT_APP_STRIPE_TEST) })
      })
    }
  }
  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </StripeProvider>
    )
  }
}

export default App
