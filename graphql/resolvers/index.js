const apiService = require('../services/api')
const events = require('../mocks/events')
const people = require('../mocks/people')

module.exports = {
    Event: {
        people: (event) => event.peopleIds.map(id => people.find(person => person.id === id))
    },
    Query: {
        allEvents: () => Object.values(events),
        event: (_, { id }) => {
            console.log('---', id)
            return events[id]
        }
    }
}
