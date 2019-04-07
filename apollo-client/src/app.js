import React, { Component } from 'react'
import EventsPage from "./components/event-page";

class App extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <EventsPage/>
            </div>
        )
    }
}

export default App
