const apiService = require('../services/api')
const events = require('../mocks/events')
const people = require('../mocks/people')
const id = require('uuid')

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

        addEvent: (_, {title, where, url}) =>{
            const event = {
                title,
                where,
                url,
                id: id(),
                peopleIds:[]
            }

            events[event.id]= event;
            return event;
        }
    }
}
