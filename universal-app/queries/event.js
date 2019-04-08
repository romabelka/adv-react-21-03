import gql from 'graphql-tag'

export default gql`
    query FetchEvent($id: ID) {
        event(id: $id) {
            id where url
            people {
                firstName id
            }
        }
    }
`
