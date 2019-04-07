import React, {useReducer} from 'react';
import {Mutation, Query} from 'react-apollo'
import gql from 'graphql-tag'
import {AllEvents} from './event-list'

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
  month: "",
  submissionDeadline: "",
  title: "",
  url: "",
  when: "",
  where: "",
  peopleIds: []
}

const formFields = [
  'title',
  'url',
  'when',
  'where',
  'month',
  'submissionDeadline',
]


function EventForm() {
  const [state, dispatch] = useReducer((state, action) => {
    if (action.type === "reset") {
      return initialState
    }
    if (action.payload.field === "person") {
      return ({
        ...state,
        "peopleIds": action.payload.checked ? [...state.peopleIds, action.payload.value] : state.peopleIds.filter(p => p !== action.payload.value)
      })
    } else {
      return ({...state, [action.payload.field]: action.payload.value})
    }
  }, initialState)

  const handleSubmit = mutate => (ev) => {
    ev.preventDefault()
    mutate().then(reset)
  }

  const onChange = ev => dispatch({
    type: 'change',
    payload: {field: ev.target.name, value: ev.target.value, checked: ev.target.checked}
  })

  const reset = ev => dispatch({type: 'reset'})

  const getField = (name, onChange) => {
    return (
      <p key={name}>
        <label>{name}:
          <input name={name} value={state[name]} onChange={onChange}/>
        </label>
      </p>
    )
  }

  return (

    <Query query={peopleQuery}>
      {
        ({data, loading}) => {
          if (loading) return <h1>Loading</h1>

          return (
            <Mutation
              mutation={eventMutation}
              variables={state}
              update={(cache, {data: {createEvent}}) => {
                const {allEvents} = cache.readQuery({query: AllEvents})
                cache.writeQuery({
                  query: AllEvents,
                  data: { allEvents: [createEvent].concat(allEvents) },
                });

              }
              }
            >
              {
                (mutate, {loading}) => {
                  if (loading) return <h3>Loading</h3>

                  return (
                    <div>
                      <form onSubmit={handleSubmit(mutate)}>
                        {
                          formFields.map(i => getField(i, onChange))
                        }
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