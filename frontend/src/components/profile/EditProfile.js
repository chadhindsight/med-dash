import React, { Component, useState } from 'react';
import actions from '../../services/index'
import InputEdit from './InputEdit';
// Array of objects
// 'name','primaryPharmacy', 'password'
let inputs = [
    {
        type: 'email',
        name: 'email',
        disabled: true
    }, 
    {
        type: 'text',
        name: 'name',
        disabled: true
    }, 
    {
        type: 'password',
        name: 'password',
        disabled: true
    }, 
    // Find a pharmacy using maps maybe
    {
        type: 'text',
        name: 'primaryPharmacy',
        disabled: true
    }
]

function EditProfile (props) {
    const [state, setState] = useState(inputs)
    const [user, setUser] = useState(inputs.reduce((a,v) => (a[v.name]=props.user[v.name],a),{}))

    const handleChange = (e) => {
        setState({
            [e.target.name]: e.target.value
        })
    }
    const displayInputField = () => {
        return state.map((input,i) =>{
            return <InputEdit key={input.name} onUserEdit = {handleChange} user ={user} setUser = {setUser} input={state} i={i} setState={setState}/>
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await actions.editProfile(this.state).then(res=>console.log(res.data))
    }
    
        return (
            <div>
             {displayInputField()}
            </div>
        );
}

export default EditProfile;