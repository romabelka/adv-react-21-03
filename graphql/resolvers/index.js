const apiService = require('../services/api')
const events = require('../mocks/events')
const people = require('../mocks/people')

module.exports = {
    Event: {
        people: (event) => event.peopleIds.map(id => people.find(person => person.id === id))
    },
    Query: {
        allEvents: () => Object.values(events).reverse(),
        event: (_, {id}) => {
            return events[id]
        },
        allPeople: () => people,
        person: (_, {id}) => people.find(person => person.id === id)
    },
    Mutation: {
        setName: (_, {id, name}) => {
            const person = people.find(p => p.id === id)
            person.firstName = name
            return person
        },
        addEvent: (_, { event }) => {
            event.id = Date.now().toString()
            event.people = []

            events[event.id] = event
            return event
        }
    }
}
