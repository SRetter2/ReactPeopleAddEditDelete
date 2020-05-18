import React from 'react';

class PersonForm extends React.Component {

    render() {
        const {onTextChange, onAddClick } = this.props;
        const { firstName, lastName, age } = this.props.person;

        return (
            <div className='row well' style={{ marginTop: 40 }}>
            <div className='col-md-3'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='First Name'
                    name='firstName'
                    value={firstName}
                    onChange={onTextChange} />
                  
            </div>
            <div className='col-md-3'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Last Name'
                    name='lastName'
                    value={lastName}
                    onChange={onTextChange} />
            </div>
            <div className='col-md-3'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Age'
                    name='age'
                    value={age}
                    onChange={onTextChange} />
            </div>
            <div className='col-md-3'>
                <button className='btn btn-success' onClick={onAddClick}>
                   Add person </button>
                </div>
            </div>
        )
    }

}

export default PersonForm;