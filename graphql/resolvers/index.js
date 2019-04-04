const apiService = require('../services/api')
const events = require('../mocks/events')

module.exports = {
    Query: {
        allEvents: () => Object.values(events),
        event: (_, { id }) => {
            console.log('---', id)
            return events[id]
        }
    }
}
