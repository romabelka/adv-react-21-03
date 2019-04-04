import React, { Component } from 'react'
import EventList from "./components/event-list";

class App extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <EventList/>
            </div>
        )
    }
}

export default App
