import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, concat } from 'apollo-link'
import App from './App'

const NODE = document.getElementById('root')

const uri =
  process.env.NODE_ENV === 'production'
    ? 'https://annes-handmade.herokuapp.com/graphql'
    : 'http://localhost:3001/graphql'

const httpLink = new HttpLink({ uri })
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: localStorage.getItem('TOKEN') || null
    }
  }))
  return forward(operation)
})
const link = concat(authMiddleware, httpLink)
const cache = new InMemoryCache()
const client = new ApolloClient({ link, cache })

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  NODE
)

registerServiceWorker()
