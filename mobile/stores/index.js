import AuthStore from './auth'
import Eventstore from './events'
import Peoplestore from './people'

export default {
    auth: new AuthStore(),
    events: new Eventstore(),
    people: new Peoplestore(),
}
