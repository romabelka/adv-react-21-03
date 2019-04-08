import gql from 'graphql-tag'

export default gql`
    mutation SetName($id: ID, $name: String) {
        setName(id: $id, name: $name) {
            id firstName
        }
    }
`
