// const { ApolloEngine } = require('apollo-engine')
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const cors = require('cors')
const sslRedirect = require('heroku-ssl-redirect')
const path = require('path')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const KEYS = require('./config')
require('./models/connect')
const models = require('./models')
const {
  fileLoader,
  mergeResolvers,
  mergeTypes
} = require('merge-graphql-schemas')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
)
const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = express()
const port = KEYS.PORT

server.use(compression())
server.use(sslRedirect())
server.use(cors())

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      models,
      user: req.user
    }
    // tracing: true,
    // cacheControl: {
    //   defaultMaxAge: 20
    // }
  }))
)

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static('client/build'))
  server.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  })
}

server.listen(port, () => console.log(`SERVER LISTENING ON PORT ${port}`))

// const engine = new ApolloEngine({
//   apiKey: KEYS.ENGINE_API_KEY
// })

// engine.listen(
//   {
//     port,
//     expressApp: server
//   },
//   () => console.log(`SERVER LISTENING ON PORT ${port}`)
// )
