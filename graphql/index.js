const express = require('express')
const fs = require('fs')
const { promisify } = require('util')
const {ApolloServer, gql} = require('apollo-server-express')
const readFile = promisify(fs.readFile)

const resolvers = require('./resolvers')
const app = express()

;(async () => {
    const gqlSchema = await readFile(__dirname + '/schema/root.graphql', 'utf8')

    const typeDefs = gql`${gqlSchema}`

    const PORT = process.env.GRAPHQL_PORT || 5000

    const server = new ApolloServer({ typeDefs, resolvers })

    server.applyMiddleware({app, path: '/'})

    app.listen({port: PORT}, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    )
})()

module.exports = app
/*
 fetch('/' , {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ movies { title } }' })
})
 */
