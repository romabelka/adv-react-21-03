import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const mutation = gql`
    mutation SetName($id: ID, $name: String) {
        setName(id: $id, name: $name) {
            id firstName
        }
    }
`


function PersonForm({ person }) {
    const [name, setName] = useState(person.firstName)

    const handleSubmit = mutate => (ev) => {
        ev.preventDefault()
        mutate()
    }
    const onChange = ev => setName(ev.target.value)

    return (
        <Mutation mutation={mutation} variables={{ id: person.id, name }}>
            {
                (mutate, { loading }) => {
                    if (loading) return <h3>Loading</h3>

                    return (
                        <div>
                            <form onSubmit={handleSubmit(mutate)}>
                                firstName:
                                <input value={name} onChange={onChange}/>
                            </form>
                        </div>
                    )
                }
            }
        </Mutation>
    )
}

PersonForm.propTypes = {
}

export default PersonForm
