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
      this.setState({
        stripe: window.Stripe('pk_test_htV5BwONms8PGEJ4RVZgsOgU')
      })
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({
          stripe: window.Stripe('pk_test_htV5BwONms8PGEJ4RVZgsOgU')
        })
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
