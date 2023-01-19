
import Buttons from "./Buttons"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigate }  from 'react-router-dom'
import React from 'react';
import axios from 'axios'


class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.logout = this.logout.bind(this)
  }


  async pgAPI() {
    await fetch(`${process.env.REACT_APP_BACKURL}${window.location.pathname}`)
        .then(res => res.text())
        .catch(err => err);
  }

  logout() {
    console.log("logging out")
    axios
        .post(`${process.env.REACT_APP_BACKURL}/user/logout`)
        .then(response => {
            console.log(response.data)
            if (response.status === 200) {
                // update App.js state
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        })
        .catch(error => {
            console.log('logout error: ')
            console.log(error);
            
        })
}


  render() {

 return (
  <div id="loader-wrapper">
      <div className={"loading visible" + this.state.visible}>
            <img src="/images/loading.gif" />
        </div>
      <div className={"App visible" + this.state.visible}>
        {this.props.loggedIn && 
        <div className="admin-header">
          <p>{this.props.username}</p>
          <p className="logout" onClick={() => this.logout()}>Logout</p> 
        </div>}
        <div className="Home-wrapper"> 
          <Buttons className="Home"/>
        </div>
      </div>
  </div>
    );
  }

  
  componentDidMount() {
    Promise.all(Array.from(document.images).filter(img => !img.complete)
                                           .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
                                           .then(() => {
      try {
        setTimeout(() => {this.setState({visible: true})}, 500)
      } catch (e) {console.log(e)}
  });
  }
}

export default List;
