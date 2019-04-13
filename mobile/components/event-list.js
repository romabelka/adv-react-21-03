import React, { Component } from 'react'
import {TouchableOpacity, FlatList, View, StyleSheet, Text} from 'react-native'
import {withNavigation} from 'react-navigation'


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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Event', {eventId: item.id})}>
            <View style={styles.item}>
                <Text>
                    {item.title}
                </Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fdfdfd',
        margin: 10,
        shadowOffset: {
            width: 5,
            height: 2
        },
        shadowColor: '#000',
        shadowOpacity: 0.8,
        elevation: 1
    }
})

export default withNavigation(EventList)
