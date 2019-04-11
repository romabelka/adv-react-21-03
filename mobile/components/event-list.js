import React, { Component } from 'react'
import {ScrollView, FlatList, View, StyleSheet, Text} from 'react-native'


class EventList extends Component {
    static propTypes = {

    };

    render() {
        return <FlatList
            data={this.props.events}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
        />
/*
        return (
            <ScrollView>
                {
                    this.props.events.map(event => (
                        <View key={event.id}>
                            <Text>{event.title}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        )
*/
    }

    keyExtractor = event => event.id

    renderItem = ({ item }) => (
        <View key={item.id}>
            <Text>
                {item.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
})

export default EventList
