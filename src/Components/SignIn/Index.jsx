import React, { Component } from 'react';
import {routesList} from "../../Constantes/Routes";

class SignIn extends Component {

state = {
    userData: {
        email: '',
        password: '',
    },
    errorMessage: '',
};

    onSubmit = (e) => {
        this.setState({errorMessage: ''});
        e.preventDefault();
        console.log(this.state);
        fetch('http://localhost:8080/api/users/login', { mode: 'cors', method : 'post',
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
                    // alert('User succsessfully created');
                    //console.log(response.json());
                    //this.props.history.push(`${routesList[0].path}`);
                    return response.json()
                }
            })
            .then((data)=>{
                if ('error' in data) {
                    this.setState({errorMessage: data.error});
                }
                console.log(data);
            })

            .catch((err) => {
                console.log('error', err);
            })

    };

  render() {
    return (
      <div className='content-signin'>
        <h2>Sign In</h2>
          <form onSubmit={this.onSubmit}>
              <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={this.state.userData.email}
                  onChange={(email)=>this.setState({userData:{...this.state.userData, email: email.target.value}})}
              />
              <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.userData.password}
                  onChange={(password)=>this.setState({userData:{...this.state.userData, password: password.target.value}})}
              />
              <p>{this.state.errorMessage}</p>
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

export default SignIn;
