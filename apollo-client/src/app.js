import React, { Component } from 'react'
import EventList from "./components/event-list";
import EventForm from "./components/event-form";

class App extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <EventForm/>
                <EventList/>
            </div>
        )
    }
}

export default App
