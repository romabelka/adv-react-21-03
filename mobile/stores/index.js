import AuthStore from './auth'
import PeopleStore from './people'
import EventsStore from './events'

export default {
    auth: new AuthStore(),
    people: new PeopleStore(),
    events: new EventsStore()
}
