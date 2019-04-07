const apiService = require('../services/api')
let events = require('../mocks/events')
const people = require('../mocks/people')

module.exports = {
    Event: {
        people: (event) => event.peopleIds.map(id => people.find(person => person.id === id))
    },
    Query: {
        allEvents: () => Object.values(events),
        event: (_, {id}) => {
            return events[id]
        }
    },
    Mutation: {
        setName: (_, {id, name}) => {
            const person = people.find(p => p.id === id)
            person.firstName = name
            return person
        },
        setEvent: (_, event) => {
            const id = Math.round(Math.random() * 1000000)
            const newEvent = {
                id,
                peopleIds: [],
                ...event
            }
            events = {
                [id]: newEvent,
                ...events
            }
            return newEvent
        }
    }
}
