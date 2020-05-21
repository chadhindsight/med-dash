import React, {Component, Fragment} from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/404/NotFound.js';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import RandomComponent from './components/RandomComp'
import Profile from './components/profile/Profile'
import EditProfile from './components/profile/EditProfile'
import actions from './services/index'
import Order from './components/Order'
class App extends Component {
  
  state = {
    searchResult: {},
    cart: []
  }
  
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    this.setState({...user.data})
    console.log('coolest ')

  }

  setUser = (user) => this.setState(user)
  
  logOut = async () => {
    let res = await actions.logOut()
    this.setUser({email:null, createdAt: null, updatedAt: null, _id: null }) //FIX 
  }

  // Pass this method and AddToCart method down as props 
  onSearch = async() => {
    let res = await actions.medSearch('Bactrim')
    this.setState({ searchResult: res.data })
    console.log(this.state.searchResult)
  }
  
  addToCart = () => {
    let newCart = this.state.cart.push(this.state.searchResult)
    this.setState({ cart:  newCart})
    console.log(this.state.cart)
  }
  render(){

    return (
    <BrowserRouter>
      {this.state.email}
      <nav>
        <NavLink to="/">Home |</NavLink>
  
        {this.state.email ? 
          <Fragment>
           <NavLink onClick={this.logOut} to='/'>Log Out |</NavLink> 
           <NavLink to="/profile">Profile|</NavLink>
           </Fragment>
           :
           <Fragment>
           <NavLink to="/sign-up">Sign Up |</NavLink>
           <NavLink to="/log-in">Log In |</NavLink>
           </Fragment>
          }
        
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/medicine/search" render={(props) => <RandomComponent {...props} 
            result={this.state.searchResult} onSearch={this.onSearch} addToCart={this.addToCart} setUser={this.setUser} />}/>
        <Route exact path="/sign-up" render={(props)=><SignUp {...props} setUser={this.setUser} />} />
        <Route exact path="/log-in" render={(props) => <LogIn {...props} setUser={this.setUser}/>} />
        <Route exact path="/profile" render={(props) => <Profile {...props} user={this.state}/>} />
          <Route exact path="/medicine/order" render={(props) => <Order cart={this.state.cart}{...props} cart={this.state.cart}
             />} />
          <Route exact path="/profile/edit" render={(props) => <EditProfile {...props} user={this.state} />} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;
