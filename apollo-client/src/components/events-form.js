import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {query as eventsQuery} from './event-list'

const mutation = gql`
    mutation SetEvent(
     $month: String,
     $title: String,
     $url: String,
     $when: String,
     $where: String,
     $submissionDeadline: String
    ) {
        setEvent(
            month: $month,
            title: $title,
            url: $url,
            when: $when,
            where: $where,
            submissionDeadline: $submissionDeadline
        ) {
            title id
        }
    }
`


function EventsForm({ person }) {
    const [month, setMonth] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [when, setWhen] = useState('')
    const [where, setWhere] = useState('')
    const [submissionDeadline, setDeadLine] = useState('')

    const onChangeMonth = event => setMonth(event.target.value)
    const onChangeTitle = event => setTitle(event.target.value)
    const onChangeUrl = event => setUrl(event.target.value)
    const onChangeWhen = event => setWhen(event.target.value)
    const onChangeWhere = event => setWhere(event.target.value)
    const onChangeDeadLine = event => setDeadLine(event.target.value)

    const handleSubmit = mutate => e => {
        e.preventDefault()
        mutate()
    }
    return (
        <Mutation
            mutation={mutation}
            variables={{ title, month, submissionDeadline, url, when, where }}
            update={(cache, { data: { setEvent } }) => {
                const { allEvents } = cache.readQuery({ query: eventsQuery });
                cache.writeQuery({
                    query: eventsQuery,
                    data: { allEvents: [setEvent, ...allEvents]},
                });
            }}
        >
            {
                (mutate, { loading }) => {
                    if (loading) return <h3>Loading</h3>

                    return (
                        <form onSubmit={handleSubmit(mutate)}>
                            <div>
                                Title
                                <input value={title} onChange={onChangeTitle} />
                            </div>
                            <div>
                                Month
                                <input value={month} onChange={onChangeMonth} />
                            </div>
                            <div>
                                Url
                                <input value={url} onChange={onChangeUrl} />
                            </div>
                            <div>
                                When
                                <input value={when} onChange={onChangeWhen} />
                            </div>
                            <div>
                                Where
                                <input value={where} onChange={onChangeWhere} />
                            </div >
                            <div>
                                SubmissionDeadline
                                <input value={submissionDeadline} onChange={onChangeDeadLine} />
                            </div>
                            <button type="submit">
                                Submit
                            </button>
                        </form>
                    )
                }
            }
        </Mutation>
    )
}

EventsForm.propTypes = {
}

export default EventsForm
