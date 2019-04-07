import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
const client = new ApolloClient({
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

//dev only
window.client = client
window.gql = gql

export default client
