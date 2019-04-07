import React, {useState} from 'react'
import {Mutation} from 'react-apollo'
import gql from 'graphql-tag'

import {newEventAdded} from './event-list'

const ADD_EVENT = gql`
    mutation AddEvent($title: String, $where: String, $url: String){
        addEvent(title: $title, where: $where, url: $url){
            title id
        }
    }
`

function NewEventForm() {
    const initialState = {title: '', where: '', url: ''}
    const [event, setEvent] = useState(initialState)


    const onChange = ev => {
        const {name, value} = ev.target
        setEvent({...event, [name]:value})
    }

    const handleSubmit = mutate => (ev) => {
        ev.preventDefault()
        mutate()
    }

    const renderForm = (mutate)=>(
        <form onSubmit={handleSubmit(mutate)}>
            title:
            <input value={event.title} name='title' onChange={onChange}/>

            where:
            <input value={event.where} name='where' onChange={onChange}/>

            url:
            <input value={event.url} name='url' onChange={onChange}/>

            <button>Save</button>
        </form>
    )

    const onNewEventAdded =()=>{
        setEvent({...initialState})
    }

    return (
        <>
            New event
            <Mutation mutation={ADD_EVENT}
                      variables={{...event}}
                      update={newEventAdded(onNewEventAdded)}>
                {
                    (mutate, {isLoading}) =>{
                        if(isLoading) return <h3>Loading</h3>
                        return renderForm(mutate)
                    }
                }
            </Mutation>

            </>
    )
}

export default NewEventForm