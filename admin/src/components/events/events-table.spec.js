import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './events-table'
import Loader from '../common/loader'
import eventsFixtures from '../../mocks/conferences'
const events = eventsFixtures.map((event, id) => ({ ...event, id }))

Enzyme.configure({ adapter: new Adapter() })

describe('EventsTable', () => {
  it('should render a loader', () => {
    const container = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(container.contains(<Loader />)).toBe(true)
  })

  it('should fetch All Events', function() {
    const mockFn = jest.fn()
    shallow(<EventsTable events={[]} fetchAllEvents={mockFn} />)

    expect(mockFn.mock.calls.length).toEqual(1)
  })

  it('should select an event', () => {
    const mockFn = jest.fn()
    const container = mount(
      <EventsTable
        events={events}
        selectEvent={mockFn}
        fetchAllEvents={() => {}}
      />
    )
    const itemIndex = Math.floor(Math.random() * events.length)
    container
      .find('.test--event-list__item')
      .at(itemIndex)
      .simulate('click')

    expect(mockFn).toBeCalledWith(events[itemIndex].id)
  })
})
