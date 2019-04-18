import React, { Component } from 'react'
import {Text, StyleSheet, SectionList} from 'react-native'
import {observer, inject} from 'mobx-react'
import PersonCard from './person-card'
import groupBy from 'lodash/groupBy'

@inject('people')
@observer
class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.people.subscribe()
    }

    componentWillUnmount() {
        this.props.people.unsubscribe()
    }

    render() {
        const { people } = this.props
        console.log('---', people.list)
        const grouped = groupBy(people.list, person => person.firstName.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} people`,
            data: list.map(person => ({key: person.id, person}))
        }))
        return <SectionList
            sections = {sections}
            renderSectionHeader = {({section}) => <Text style={styles.header}>{section.title}</Text>}
            renderItem = {({item}) => <PersonCard person = {item.person} />}
        />
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F0F0F0',
        height: 40,
        lineHeight: 40,
        marginBottom: 5,
        shadowOffset: {
            height: 2, width: 0
        },
        shadowOpacity: 0.3,
        elevation: 3
    }
})

export default PeopleList
