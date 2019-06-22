import React, { Component } from 'react';
import {Redirect} from 'react-router';
import {routesList} from "../../Constantes/Routes";

class SignIn extends Component {

    state = {
        userData: {
            email: '',
            password: '',
        },
        errorMessage: '',
        redirect: false,
        logoutToggler: false,
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
                // console.log(data);
                if ('error' in data) {
                    this.setState({errorMessage: data.error});
                }
               else {
                  const stringifiedUserData = JSON.stringify(data);
                  sessionStorage.setItem('userData', stringifiedUserData);
                  this.setState({redirect: true});
                  window.location.reload();
              }
            })
            .catch((err) => {
                console.log('error', err);
            })

    };

  render() {
    if(this.state.redirect) {
        return(
            <Redirect to={{pathName: routesList[0].path}} />
        )
    }

    if(sessionStorage.getItem('userData')) {
        return(
            <Redirect to={routesList[0].path}/>
        )
    }

    return (
      <div className='content-signin'>
        <h2>Sign In</h2>
        <p className="error-form-signin">{this.state.errorMessage}</p>
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
