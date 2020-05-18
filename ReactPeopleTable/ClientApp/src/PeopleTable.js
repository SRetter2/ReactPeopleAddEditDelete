import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import PersonEdit from './PersonEdit';


class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {
            id:'',
            firstName: '',
            lastName: '',
            age: ''
        },
        checkedppl: [],
        edit:false
    }
    componentDidMount = () => {
        axios.get('api/people/getall').then(response => {
            const people = response.data;
            this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
        });
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddClick = () => {
        const { firstName, lastName, age } = this.state.person;
        const p = { firstName: firstName, lastName: lastName, age: age}
        axios.post('api/people/addperson', p).then(() => {  
            axios.get('api/people/getall').then(response => {
                const people = response.data;
                this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
            });
        });      
    }


    onDeleteClick = person => {
        axios.post('api/people/deleteperson', person).then(() => {
            axios.get('api/people/getall').then(response => {
                const people = response.data;
                this.setState({ people, person: { firstName: '', lastName: '', age: '' } });
            });
        });
    }
    onEditClick = person => {
        const nextState = produce(this.state, draft => {
            draft.person.firstName = person.firstName;
            draft.person.lastName = person.lastName;
            draft.person.age = person.age;
            draft.person.id = person.id;
            draft.edit = true;
        });
        this.setState(nextState);
        
    }
    onUpdateClick = () => {
        axios.post('api/people/editperson', this.state.person).then(() => {
            
            axios.get('api/people/getall').then(response => {
                const people = response.data;
                this.setState({ people });
            });
        });
        const nextState = produce(this.state, draft => {
            draft.person.firstName = '';
            draft.person.lastName = '';
            draft.person.age = '';
            draft.edit = false;
        });
        this.setState(nextState);
    }
    onCheckChange = person => {
        const nextState = produce(this.state, draft => {
            draft.checkedppl.push(person);
        });
        this.setState(nextState);
    }
    onDeleteAllChecked = () => {
        this.state.checkedppl.map(p => {
            return axios.post('api/people/deleteperson', p).then(() => {
                axios.get('api/people/getall').then(response => {
                    const people = response.data;
                    this.setState({ people, checkedppl:[] });
                });
            });
        });
    }


    render() {
        return (
            <div className='container' >
                <PersonForm person={this.state.person} onTextChange={this.onTextChange} onAddClick={this.onAddClick} />
                <table className='table table-striped table-bordered table-hover' style={{ marginTon: 20 }}>
                    <thead>
                        <tr>
                            <th>
                                <button className='btn btn-danger btn-lg' onClick={this.onDeleteAllChecked}>Delete</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(person => {
                            const { id } = person;
                            return <PersonRow key={id} person={person}
                                onCheckChange={() => this.onCheckChange(person)}
                                onDeleteClick={() => this.onDeleteClick(person)}
                                onEditClick={() => this.onEditClick(person)}
                            />
                        })}
                    </tbody>
                </table>
                {this.state.edit && <PersonEdit person={this.state.person} onTextChange={this.onTextChange} onUpdateClick={() => this.onUpdateClick()} />}
               
            </div>
        );


    }
}

export default PeopleTable;