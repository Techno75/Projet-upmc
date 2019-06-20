import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import {API_ROUTE} from "../../Constantes/ApiRoute";

class SignUp extends Component {

state = {
    countries: null,
    userData: {
        lastname: '',
        firstname: '',
        username: '',
        email: '',
        password: '',
        team: '',
    },
    confirmPassword: '',
    errorMessage: '',
    globalErrorMessage: '',
};

componentDidMount() {
    fetch(API_ROUTE + 'teams', {mode: 'cors', method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res)=>{
            if (res.status !== 200) {
                return;
            }
            return res.json()
        })
        .then((data) => {
            this.setState({ countries : data
            });
            console.log(this.state.countries);
        });
}
confirmPasswordHandler = () => {
    this.setState({errorMessage: ''});
    if(this.state.confirmPassword !== this.state.userData.password) {
        this.setState({errorMessage: 'Password doesn\'t match'});
    }
};

onSubmit = (e) => {
    e.preventDefault();
    this.confirmPasswordHandler();
    console.log(this.state.userData);
    fetch('http://localhost:8080/api/users/register', { mode: 'cors', method : 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.state.userData)
    })
     .then((response) => {
                console.log(response);
                if(!(response.status >= 200 && response.status <= 300)) {
                    return response.json();
                } else {
                    alert('User succsessfully created');
                    this.props.history.push(`${routesList[3].path}`);
                    return response.json()
                }
     })
        .then((data)=>{
            this.setState({errorMessage: data.error});
        })

            .catch((err) => {
                console.log('error', err);
            })

};

  render() {
    return (
          <div className='content-signup'>
            <h2>Sign Up</h2>
              <form onSubmit={this.onSubmit}>
                  <input
                      type='text'
                      name='lastname'
                      placeholder='Last Name'
                      value = {this.state.userData.lastname}
                      onChange = {(lastname)=>this.setState({userData: { ...this.state.userData, lastname: lastname.target.value }})}
                  />
                  <input
                      type='text'
                      name='firstname'
                      placeholder='First Name'
                      value={this.state.userData.firstname}
                      onChange = {(firstname)=>this.setState({userData: { ...this.state.userData, firstname: firstname.target.value }})}
                  />
                  <input
                      type='text'
                      name='username'
                      placeholder='Username'
                      value={this.state.userData.username}
                      onChange = {(username)=>this.setState({userData:{ ...this.state.userData, username: username.target.value}})}
                  />
                  <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={this.state.userData.email}
                      onChange={(email)=>this.setState({userData:{ ...this.state.userData, email: email.target.value}})}
                  />
                  <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={this.state.userData.password}
                      onChange={(password)=>this.setState({userData:{ ...this.state.userData, password: password.target.value}})}
                  />
                  <input
                      type='password'
                      name='confirm-password'
                      placeholder='Confirm your password'
                      value={this.state.confirmPassword}
                      onChange={(confirmPassword)=>this.setState({confirmPassword: confirmPassword.target.value})}
                  />
                  <p>{this.state.errorMessage}</p>
                  <select name="toto" id="" onChange={(team) =>this.setState({userData:{ ...this.state.userData, team: team.target.value}})}>
                      {
                          this.state.countries && this.state.countries.map((countries, index) => {
                              return(
                                  <option key={index} value={countries.id}>
                                      {countries.country}
                                  </option>
                              )
                          })
                      }
                  </select>
                  <p>{this.state.globalErrorMessage && this.state.globalErrorMessage}</p>

                  <div className='submit-content'>
                      <input
                          type='submit'
                          name='submit'
                          value='Submit'
                      />
                  </div>
              </form>
          </div>
    )
  }
}

export default SignUp;
