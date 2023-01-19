import React from 'react'
import axios from 'axios'
import { Navigate }  from 'react-router-dom'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
class Signup extends React.Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',

		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleChangepwd = this.handleChangepwd.bind(this)
		axios.defaults.withCredentials = true
	}

	
	handleChange(event) {

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleChangepwd(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
    
	handleSubmit(event) {

		const password = this.state.password
		const hashedPassword = bcrypt.hashSync(password, salt)
		
		this.setState({
			password: "" 
		})

		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()


		//request to server to add a new username/password
		axios.post(`${process.env.REACT_APP_BACKURL}/user`,
		{
			username: this.state.username,
			password: hashedPassword
		})
			.then(response => {
				console.log(response)
				console.log("password: " + this.state.password)
				if (!response.data.error) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/login'
					})
				} else {
					console.log(response.data.error)
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


render() {

	return (<h1>Non c'è niente da vedere qui</h1>)

	/*

	if (this.state.redirectTo) {
		return <Navigate to={this.state.redirectTo} />
	}
	else {
	return (
		<div className="SignupForm">
			<h4>Sign up</h4>
			<form className="form-horizontal">
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="username">Username</label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							type="text"
							id="username"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="col-1 col-ml-auto">
						<label className="form-label" htmlFor="password">Password: </label>
					</div>
					<div className="col-3 col-mr-auto">
						<input className="form-input"
							placeholder="password"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChangepwd}
						/>
					</div>
				</div>
				<div className="form-group ">
					<div className="col-7"></div>
					<button
						className="btn btn-primary col-1 col-mr-auto"
						onClick={this.handleSubmit}
						type="submit"
					>Sign up</button>
				</div>
			</form>
		</div>
		
	)}
	*/
}
}

export default Signup