import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const mutation = gql`
  mutation AddNewEvent($month: String, $submissionDeadline: String, $title: String, $url: String, $when: String, $where: String) {
    addNewEvent(month: $month, submissionDeadline: $submissionDeadline, title: $title, url: $url, when: $when, where: $where) {
      month
      submissionDeadline
      title
      url
      when
      where
    }
  }
`

export default function AddEventForm() {
  const [title, setTitle] = useState('')
  const [month, setMonth] = useState('')
  const [submissionDeadline, setSubmissionDeadLine] = useState('')
  const [url, setUrl] = useState('')
  const [when, setWhen] = useState('')
  const [where, setWhere] = useState('')
  const [peopleIds, setPeopleIds] = useState([])

  const handleSubmit = mutate => e => {
    debugger;
    e.preventDefault()
    mutate()
  }

  const onChangeTitle = event => setTitle(event.target.value)
  const onChangeMonth = event => setMonth(event.target.value)
  const onChangeUrl = event => setUrl(event.target.value)
  const onChangeWhen = event => setWhen(event.target.value)
  const onChangeSubmissionDeadLine = event => setSubmissionDeadLine(event.target.value)
  const onChangeWhere = event => setWhere(event.target.value)
  const onChangePeopleIds = event => setPeopleIds(event.target.value)

  return (
    <Mutation mutation={mutation} variables={{ title, month, submissionDeadline, url, when, where, peopleIds }}>
      {
        (mutate, { loading }) => (
          <form onSubmit={handleSubmit(mutate)}>
            <div  >
              Title
              <input value={title} onChange={onChangeTitle} />
            </div >
            <div  >
              Month
              <input value={month} onChange={onChangeMonth} />
            </div >
            <div  >
              Url
              <input value={url} onChange={onChangeUrl} />
            </div >
            <div  >
              When
              <input value={when} onChange={onChangeWhen} />
            </div >
            <div  >
              submissionDeadline
              <input value={submissionDeadline} onChange={onChangeSubmissionDeadLine} />
            </div >
            <div  >
              Where
              <input value={where} onChange={onChangeWhere} />
            </div >
            <button type="submit">
              Submit
            </button>
            { loading && (
              <span>
                Loading ...
              </span>
            )}
          </form>
        )
      }
    </Mutation>
  )
}
