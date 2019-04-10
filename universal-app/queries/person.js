import gql from 'graphql-tag'

export default gql`
    query FetchPerson($id: ID) {
        person(id: $id) {
            id firstName
        }
    }
`
