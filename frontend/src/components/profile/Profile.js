import React from 'react';
import {Link} from 'react-router-dom';
import actions from '../../services/index'

const Profile = (props) => {

    if(!props.user.email){ 
        props.history.push('/log-in') 
    }   
    return (
        <div>
            Profile
            Welcome {props.user.email} !!! 
            <Link to="/profile/edit"><button className="btn-primary">Edit Profile</button></Link> 
        </div>
    );
}

export default Profile;