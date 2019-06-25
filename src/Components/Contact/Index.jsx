import React, { Component } from 'react';

class Contact extends Component {
  state = {
    errorMessage: '',
    userData:{
      lastName: '',
      firstName: '',
      email: '',
      message: ''
    }
  }

// validateEmpty = (e) => {
//   if(!e) {
//     this.setState({errorMessage: 'Veuillez remplir la case'});
//   }
// }

// inputChangeHandler = (e) => {
//   if(e.target.name === 'lastName') {
//     this.setState({userData:{lastName: e.target.value}});
//   }
//   this.validateEmpty(e.target.value);
// }

onSubmit = (e) => {
  e.preventDefault();
  if(!this.state.userData.firstName || !this.state.userData.lastName || !this.state.userData.email || !this.state.userData.message) {
    this.setState({errorMessage: 'Please complete all the fields'})
  } else {
    this.setState({errorMessage: ''})
    fetch("http://localhost:8080/api/contact", {
              mode: 'cors',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              method: 'POST',
              body: JSON.stringify(this.state.userData)
              })
                .catch(function(err) {
                  console.log(err)
                 });
    alert('Your message has been sent successfully, thank you for your feedback.');
    this.setState({userData: {...this.state.userData, firstName: ''}});
    this.setState({userData: {...this.state.userData, lastName: ''}});
    this.setState({userData: {...this.state.userData, email: ''}});
    this.setState({userData: {...this.state.userData, message: ''}});
  }
}

  render() {
    return (
          <div className='content-contact'>
            <h2>Contact us</h2>

            {this.state.errorMessage &&
              <p className="errorMessage">{this.state.errorMessage}</p>
            }

            <form onSubmit={this.onSubmit}>
                <input
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  value = {this.state.userData.lastName}
                  onChange = {(lastName)=>this.setState({userData : {...this.state.userData, lastName: lastName.target.value}})}
                 />
                <input
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  value={this.state.userData.firstName}
                  onChange = {(firstName)=>this.setState({userData : {...this.state.userData, firstName: firstName.target.value}})}
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={this.state.userData.email}
                  onChange={(email)=>this.setState({userData : {...this.state.userData, email: email.target.value}})}
                />
                <textarea
                  name='message'
                  placeholder='Your message...'
                  value={this.state.userData.message}
                  onChange={(message)=>this.setState({userData : {...this.state.userData, message: message.target.value}})}
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

export default Contact;
