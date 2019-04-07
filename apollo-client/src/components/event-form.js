import React, {useReducer} from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Event from './event'
import { EventListQuery } from './event-list'

const eventMutation = gql`
    mutation CreateEvent($month: String, $submissionDeadline: String, $title: String, $url: String, $when: String, $where: String, $peopleIds: [ID]) {
        createEvent(month: $month, submissionDeadline: $submissionDeadline, title: $title, url: $url, when: $when, where: $where, peopleIds: $peopleIds) {
            id,
            title,
            where,
            url,
            people {id}
        }
    }
`

const peopleQuery = gql`
    {
        allPeople { firstName id }
    }
`

const initialState = {
    month:"",
    submissionDeadline:"",
    title:"",
    url:"",
    when: "",
    where: "",
    peopleIds:[]
}


function EventForm() {
    const [state, dispatch] = useReducer((state, action) => {
        if (action.type === "reset") {
            return initialState
        }
        if (action.payload.field === "person") {
            console.log(action.payload)
            return ({...state, "peopleIds": action.payload.checked ? [...state.peopleIds, action.payload.value] : state.peopleIds.filter(p => p !== action.payload.value)})
        } else {
            return ({...state, [action.payload.field]: action.payload.value})
        }
    }, initialState)

    const handleSubmit = mutate => (ev) => {
        ev.preventDefault()
        mutate().then(reset)
    }
    const onChange = ev => dispatch({type: 'change', payload: {field: ev.target.name, value: ev.target.value, checked: ev.target.checked}})
    const reset = ev => dispatch({type: 'reset'})


    return (
      <Query query={peopleQuery}>
          {
              ({ data, loading }) => {
                  if (loading) return <h1>Loading</h1>

                  return (
                    <Mutation mutation={eventMutation} variables={state} update={(store, {data: {createEvent}}) => {
                        const data = store.read({query: EventListQuery})
                        data.allEvents.push(createEvent)
                        store.write({query: EventListQuery, result: data})
                    }}>
                        {
                            (mutate, { loading }) => {
                                if (loading) return <h3>Loading</h3>

                                return (
                                  <div>
                                      <form onSubmit={handleSubmit(mutate)}>
                                          month:
                                          <input name="month" value={state.month} onChange={onChange}/>
                                          submissionDeadline:
                                          <input name="submissionDeadline" value={state.submissionDeadline} onChange={onChange}/>
                                          title:
                                          <input name="title" value={state.title} onChange={onChange}/>
                                          url:
                                          <input name="url" value={state.url} onChange={onChange}/>
                                          when:
                                          <input name="when" value={state.when} onChange={onChange}/>
                                          where:
                                          <input name="where" value={state.where} onChange={onChange}/>
                                          {data.allPeople.map((person) => (
                                            <div key={person.id}>
                                                <label>
                                                    {person.firstName}
                                                    <input
                                                      name="person"
                                                      type="checkbox"
                                                      value={person.id}
                                                      onChange={onChange}
                                                      checked={state.peopleIds.includes(person.id)}
                                                      />
                                                </label>
                                            </div>
                                          ))}
                                          <input type="submit"/>
                                      </form>
                                  </div>
                                )
                            }
                        }
                    </Mutation>
                  )
              }
          }
      </Query>
    )
}


export default EventForm
