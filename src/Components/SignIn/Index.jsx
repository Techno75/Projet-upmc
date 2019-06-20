import React, { Component } from 'react';

class SignIn extends Component {

state = {
    userData: {
        email: '',
        password: '',
    },
    errorMessage: '',
};

onSubmit = (e) => {
    e.preventDefault();
    console.log('Connexion');
}

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
                  onChange={(email)=>this.setState({userData:{email: email.target.value}})}
              />
              <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.userData.password}
                  onChange={(password)=>this.setState({userData:{password: password.target.value}})}
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
