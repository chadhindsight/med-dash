import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  //? (baseURL = 'here should be your production endpoint')
  ? (baseURL = window.location.origin)
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  },
  medSearch: async (name) =>{
    return await service.get(`/medicine/search/${name}`)
  },
  //Add to a user's cart
  addOrder: async() => {
    return await service.get('/medicine/order')
  },
  // Process Checkout and add to specific user's order array on db
  checkout: async(med) => {
    return await service.post(`/medicine/order`, med)
  },

  getProfile: async(user) => {
    return await service.get('/profile')
  },
  editProfile: async (order) => {
    return await service.post('/profile/edit')
  }
};

export default actions;
