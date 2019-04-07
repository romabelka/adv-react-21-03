import React, { Component } from 'react'
import EventList from "./components/event-list";
import EventsForm from "./components/events-form";

class App extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <EventsForm/>
                <EventList/>
            </div>
        )
    }
}

export default App
