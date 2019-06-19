import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class SignUp extends Component {

state = {
    lastname: '',
    firstname: '',
    username: '',
    email: '',
    password: '',
    team: '',
};

onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    fetch('http://localhost:8080/api/users/register', { mode: 'cors', method : 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.state)})
            .then(() => {
                console.log('user has been created');
                return(
                    <Link to={{pathname : routesList[1].path}}/>
                )
            })
            .catch((err) => {
                console.log('error', err);
            })

};

  render() {
    return (
          <div className='content-signup'>
            <h2>SignUp</h2>
              <form onSubmit={this.onSubmit}>
                  <input
                      type='texte'
                      name='lastname'
                      placeholder='Last Name'
                      value = {this.state.lastname}
                      onChange = {(lastname)=>this.setState({lastname: lastname.target.value})}
                  />
                  <input
                      type='texte'
                      name='firstname'
                      placeholder='First Name'
                      value={this.state.firstname}
                      onChange = {(firstname)=>this.setState({firstname: firstname.target.value})}
                  />
                  <input
                      type='texte'
                      name='username'
                      placeholder='Username'
                      value={this.state.username}
                      onChange = {(username)=>this.setState({username: username.target.value})}
                  />
                  <input
                      type='email'
                      name='email'
                      placeholder='Email'
                      value={this.state.email}
                      onChange={(email)=>this.setState({email: email.target.value})}
                  />
                  <input
                      type='password'
                      name='password'
                      placeholder='Password'
                      value={this.state.password}
                      onChange={(password)=>this.setState({password: password.target.value})}
                  />
                  <input
                      type='select'
                      name='team'
                      placeholder='Choose your team'
                      value={this.state.team}
                      onChange={(team)=>this.setState({team: team.target.value})}
                  />
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
