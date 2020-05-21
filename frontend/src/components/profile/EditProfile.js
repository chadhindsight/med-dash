import React, { Component } from 'react';
import actions from '../../services/index'

class EditProfile extends Component {
    state = {

    }
    handleSubmit = async e => {
        e.preventDefault()
        
        this.setState({
            email: '',
            password: '',
            name: '',
            primaryPharmacy: '',
            medications: []
        })

        await actions.editProfile(this.state).then(res=>console.log(res.data))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name ="email" placeholder="email"/>
                    <input name="password"  placeholder="updated password"/>
                    <input name="name" placeholder="Name" />
                    <input name="primaryPharmacy" placeholder="Pharmacy" />
                    <input name="medications" placeholder="Prescribed Medications" />
                </form>
            </div>
        );
    }
}

export default EditProfile;