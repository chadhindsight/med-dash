import React, { Component, Fragment } from 'react';
import actions from '../../services/index'

class LogIn extends Component {

    state = {
      
    } 
    componentDidMount() {
        actions.logIn({email:'chadrickj8@gmail.com', password:'Designer2'}).then(user => {
            this.props.setUser({ ...user.data })
        }).catch(({ response }) => console.error(response.data));
    }

    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit = e => {
        e.preventDefault()
         actions.logIn(this.state).then(user => {
            this.props.setUser({...user.data})  
        }).catch(({ response }) => console.error(response.data));
    }
    render() {
        return (
            <Fragment>
                <h2>LogIn</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <input type="submit" value="Log In"/>
                </form>
            </Fragment>
        );
    }
}

export default LogIn;