import React from 'react'
import PersonList from '../people/person-list'
import people from '../../mocks/people'

function PersonListScreen() {
    const handleEventPress = ({id, title}) => console.log('person', { id, title })
    return <PersonList people={Object.values(people)} onEventPress = {handleEventPress} />
}

PersonListScreen.navigationOptions = {
    title: 'people list'
}

export default PersonListScreen
