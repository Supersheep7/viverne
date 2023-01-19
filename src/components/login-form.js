import React, { Component } from 'react'
import { Navigate }  from 'react-router-dom'
import axios from 'axios'
import "./login-form.css"
import bcrypt from 'bcryptjs'
class LoginForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
            err: false,
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        axios.defaults.withCredentials = true
    }
    

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post(`${process.env.REACT_APP_BACKURL}/user/login`, 
            {
                username: this.state.username,
                password: this.state.password
            }
            )
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            })
            .catch(error => {
                console.log('login error: ')
                console.log(error);
                this.setState({err: true, error: error})
            })
    }

    form() {
        return (
            <div id="login-wrapper">
                <h1>Login DM</h1>
                <form>
                    <div>
                        <div>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="password">Password: </label>
                        </div>
                        <div>
                            <input
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button className=''
                            onClick={this.handleSubmit}
                            type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }


    render() {
        if (this.state.redirectTo) {
            return <Navigate to={this.state.redirectTo} />
        } 
        else if (this.state.err === true && (this.state.username === "" || this.state.password === ""))
        {
            return ( 
                <div>
                    {this.form()}
                    <h1>Please provide a Username and a Password</h1>
                </div>
            )            
        }
        else if (this.state.err === true && (this.state.username !== "" || this.state.password !== ""))
        {
            return ( 
                <div>
                    {this.form()}
                    <h1>Access denied</h1>
                </div>
            )            
        }
        else 
        {
            return (
                <div>
                    {this.form()}
                </div>
            )
        }
    }
}

export default LoginForm