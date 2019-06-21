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

validateEmpty = (e) => {
  console.log(e);
  if(!e) {
    this.setState({errorMessage: 'Veuillez remplir la case'});
    console.log(this.state.errorMessage);
  }
}

inputChangeHandler = (e) => {
  if(e.target.name === 'lastName') {
    this.setState({userData:{lastName: e.target.value}});
  }
  this.validateEmpty(e.target.value);
}

onSubmit = (e) => {
  e.preventDefault();
  fetch("http://localhost:8080/api/contact", {
            method: 'POST',
            body: JSON.stringify({
              lastName : encodeURI(this.state.userData.lastName),
              firstName: encodeURI(this.state.userData.firstName),
              email: encodeURI(this.state.userData.email),
              message: encodeURI(this.state.userData.message)
              })
            })
              .catch(function(err) {
                console.log(err)
               });
}

  render() {
    return (
          <div className='content-contact'>
            <h2>Contact us</h2>
            {/*
              this.state.errorMessage.map((message, index) => {
                return(
                  <p key={index}>{message}</p>
                )
              })
            */}


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
