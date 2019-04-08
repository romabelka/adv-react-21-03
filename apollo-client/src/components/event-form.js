import React, {useState, useCallback} from 'react'
import { Mutation } from 'react-apollo'
import addEventMutation from '../queries/add-event-mutation'
import eventListQuery from '../queries/event-list'

const useInput = (initialValue = '') => {
    const [state, setState] = useState(initialValue)
    const inputCallback = useCallback(ev => setState(ev.target.value), [])

    return [state, inputCallback]
}
function EventForm() {
    const [title, setTitle] = useInput()
    const [where, setWhere] = useInput()
    const [url, setUrl] = useInput()

    const handleSubmit = (mutate) => (ev) => {
        ev.preventDefault()

        mutate()
    }
    return (
        <Mutation
            mutation={addEventMutation}
            variables={{ event: { title, where, url }}}
            update={(cache, { data: { addEvent } }) => {
                const { allEvents } = cache.readQuery({ query: eventListQuery });
                cache.writeQuery({
                    query: eventListQuery,
                    data: { allEvents: [addEvent, ...allEvents] },
                });
            }}
        >
            {
                (mutate, { loading }) => {
                    if (loading) return <h1>Loading</h1>

                    return (
                        <div>
                            <form onSubmit={handleSubmit(mutate)}>
                                <div>
                                    title: <input value={title} onChange={setTitle}/>
                                </div>
                                <div>
                                    where: <input value={where} onChange={setWhere}/>
                                </div>
                                <div>
                                    url: <input value={url} onChange={setUrl}/>
                                </div>
                                <button>add event</button>
                            </form>
                        </div>
                    )
                }
            }
        </Mutation>
    )
}

EventForm.propTypes = {
}

export default EventForm
