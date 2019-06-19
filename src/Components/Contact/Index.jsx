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
                  value = {this.state.lastName}
                  onChange = {this.inputChangeHandler}
                 />
                <input
                  type='text'
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
