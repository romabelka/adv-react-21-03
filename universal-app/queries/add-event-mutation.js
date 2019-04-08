import gql from 'graphql-tag'

export default gql`
    mutation AddEvent($event: EventInput!) {
        addEvent(event: $event) {
            id where title url
        }
    }
`
