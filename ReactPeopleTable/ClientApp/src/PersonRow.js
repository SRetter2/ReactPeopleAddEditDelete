import React from 'react';

class PersonRow extends React.Component {

    render() {
        const { firstName, lastName, age } = this.props.person;
        const { onDeleteClick, onEditClick, onCheckChange } = this.props;

        return (
            <tr>
                <td>
                    <input type='checkbox' onChange={onCheckChange}/>
                </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-primary' onClick={onEditClick}>Edit</button>
                <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                </td>
                </tr>
            );
    }

}

export default PersonRow;