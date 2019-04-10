import React, { Component } from 'react'
import {Query} from "react-apollo";
import personQuery from '../queries/person'
import Loader from "../components/loader";

class PersonPage extends Component {
    static propTypes = {

    }

    static getInitialProps({ query: { id } }) {
        return { id }
    }

    render() {
        return (
            <Query query={personQuery} variables={{ id: this.props.id }}>
                {({loading, data}) => loading
                    ? <Loader/>
                    : <h3>{data.person.firstName}</h3>
                }
            </Query>
        )
    }
}

export default PersonPage
