import React, { Component } from 'react'
import PersonList from '../people/person-list'
import { inject, observer } from 'mobx-react'

@inject('people')
@observer
class PersonListScreen extends Component {
    componentDidMount() {
        this.props.people.loadPeople()
    }

    render() {
        const handlePersonPress = ({ id, firstName }) => console.log('person', { id, firstName })
        return <PersonList people={Object.values(this.props.people.people)} onEventPress={handlePersonPress}/>
    }
}

PersonListScreen.navigationOptions = {
    title: 'people list'
}

export default PersonListScreen
