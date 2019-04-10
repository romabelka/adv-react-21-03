import React, { Component } from 'react'
import {Query} from 'react-apollo'
import peopleQuery from '../queries/people-list'
import Loader from "../components/loader";
import PeopleList from "../components/people-list";

class PeopleListPage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Query query={peopleQuery}>
                {({loading, data}) => loading
                    ? <Loader/>
                    : <PeopleList people={data.allPeople}/>
                }
            </Query>
        )
    }
}

export default PeopleListPage
