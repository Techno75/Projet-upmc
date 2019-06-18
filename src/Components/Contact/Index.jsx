import React, { Component } from 'react';

class Contact extends Component {
  state = {
    lastName: '',
    firstName: '',
    email: '',
    message: ''
  }

  onSubmit = (e) =>{
    e.preventDefault();
  }

  render() {
    return (
          <div className='content-contact'>
            <h2>Contact us</h2>
            <form onSubmit={this.onSubmit}>
              <input
                type='texte'
                name='lastName'
                placeholder='Last Name'
                value = {this.state.lastName}
                onChange = {(lastName)=>this.setState({lastName: lastName.target.value})}
               />
              <input
                type='texte'
                name='firstName'
                placeholder='First Name'
                value={this.state.firstName}
                onChange = {(firstName)=>this.setState({firstName: firstName.target.value})}
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={this.state.email}
                onChange={(email)=>this.setState({email: email.target.value})}
              />
              <textarea
                name='message'
                placeholder='Your message...'
                value={this.state.message}
                onChange={(message)=>this.setState({message: message.target.value})}
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
