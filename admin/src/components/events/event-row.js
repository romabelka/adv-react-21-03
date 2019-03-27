import React from 'react'

const EventRow = ({ event }) => (
  <tr key={event.id}>
    <td>{event.title}</td>
    <td>
      <a href={event.url} target="_blank">
        go to site
      </a>
    </td>
    <td>{event.where}</td>
    <td>{event.when}</td>
    <td>{event.month}</td>
    <td>{event.submissionDeadline}</td>
  </tr>
)

export default EventRow
