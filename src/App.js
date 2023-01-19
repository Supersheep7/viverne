import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/List";
import Pg from "./components/Pg";
import Signup from "./components/Signup"
import React from 'react';
import Loginform from "./components/login-form"
import Lvlup from "./components/Lvlup"
import axios from "axios"



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      username: null,
      key: null
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
    axios.defaults.withCredentials = true
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get(`${process.env.REACT_APP_BACKURL}/user`)
    .then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          key: response.data.key
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

render() {

  return (
      <Routes>
        <Route exact path="/" element={<List loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>}/>
        <Route path="/personaggio/:nome" element={<Pg loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>} />
        <Route path="/signup" element={<Signup loggedIn={this.state.loggedIn} username={this.state.username} />} />
        <Route path="/login" element={<Loginform  loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>} />
        <Route path="/lvlup" element={<Lvlup jwt={this.state.key} loggedIn={this.state.loggedIn} username={this.state.username} updateUser={this.updateUser}/>} />
      </Routes>
  )
}

componentDidMount() {
  this.getUser()
}

}

export default App;
