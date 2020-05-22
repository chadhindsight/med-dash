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
    searchResult: {}
  }
  
  async componentDidMount() {
    let user = await actions.isLoggedIn()
    let editable = Object.keys(user.data).reduce((a,v) => (a[v+'Edit']=false,a), {})
    this.setState({...user.data, edit: {...user.data, ...editable}})
    console.log('coolest ', editable)

  }

  // TODO: get user info from DB?
  onUserEditHandler = (e) => {
    this.setState(prevState => ({
      edit: {
        ...prevState.edit,
        [`${e.target.name}`]: e.traget.value
      }
    }))  
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
    // console.log(this.state.searchResult)
  }
  
  addToCart = () => {
    this.setState({ cart: this.state.searchResult})
  }

  placeOrder = async (e) => {
    console.log(this.state.searchResult)
    await actions.checkout(this.state.searchResult.med)
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
        <Route exact path="/profile" render={(props) => <Profile {...props}  user={this.state}/>} 
        profileDate={this.state.profileDate}/>
          <Route exact path="/medicine/order" render={(props) => <Order placeOrder={this.placeOrder}{...props} 
             />} />
          <Route exact path="/profile/edit" render={(props) => <EditProfile {...props} 
          onUserEdit={this.onUserEditHandler} user={this.state} />} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
  }
}
export default App;
