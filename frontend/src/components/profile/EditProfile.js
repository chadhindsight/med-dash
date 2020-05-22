import React, { Component } from 'react';
import actions from '../../services/index'
import InputEdit from './InputEdit';
// Array of objects
// 'name','primaryPharmacy', 'password'
let inputs = [
    {
        type: 'email',
        name: 'email'
    }, 
    {
        type: 'text',
        name: 'name'
    }, {
        type: 'password',
        name: 'password'
    }, 
    // Find a pharmacy using maps maybe
    {
        type: 'search',
        name: 'primaryPharmacy'
    }
]

class EditProfile extends Component {
    state = {

    }
    handleSubmit = async e => {
        e.preventDefault()
        await actions.editProfile(this.state).then(res=>console.log(res.data))
    }
    displayInputField = () => {
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
             
            </div>
        );
    }
}

export default EditProfile;