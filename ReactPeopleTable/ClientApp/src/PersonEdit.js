import React from 'react';

class PersonEdit extends React.Component {

    render() {
        const { firstName, lastName, age } = this.props.person;
        const { onUpdateClick, onTextChange} = this.props;
       
            return (<div className='row well' style={{ marginTop: 40 }}>
            <div className='col-md-3'>
                <input
                    type='text'                    
                    name='firstName'
                    value={firstName}
                    onChange={onTextChange} />
            </div>
            <div className='col-md-3'>
                <input
                    type='text'
                    name='lastName'
                    value={lastName}
                    onChange={onTextChange} />
            </div>
            <div className='col-md-3'>
                <input
                    type='text'
                    name='age'
                    value={age}
                    onChange={onTextChange} />
            </div>
            <div className='col-md-3'>
                <button className='btn btn-danger' onClick={onUpdateClick}>
                    Update </button>
            </div>
        </div>
        );           
    }
}

export default PersonEdit;