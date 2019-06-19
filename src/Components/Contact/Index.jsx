import React, { Component } from 'react';

class Contact extends Component {
  state = {
    errorMessage: [],
    lastName: '',
    firstName: '',
    email: '',
    message: ''
  }

  validateEmail = (elm, name) => {
    if(!elm.match("[a-z0-9]+[_a-z0-9.-]*[a-z0-9]+@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})")){
      this.setState({
        errorMessage: [...this.state.errorMessage, this.state.errorMessage.push('Your ' + name + ' is not valid.')]
      })
    }
  }

  validateEmpty = (elm, name) => {
    if(!elm){
      this.setState({
        errorMessage: [...this.state.errorMessage, this.state.errorMessage.push('Your ' + name + ' is empty.')]
      })
      return false;
    }
    else{
      return true;
    }
  }

  validateName = (elm, name) => {
    if(!elm.match("^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$")){
      this.setState({
        errorMessage: [...this.state.errorMessage, this.state.errorMessage.push('Your ' + name + ' can\'t content number or symbol.')]
      })
    }
    else{
      if(elm.length < 2 || elm.length > 20){
        this.setState({
          errorMessage: [...this.state.errorMessage, this.state.errorMessage.push('Your ' + name + ' must be between 2 to 20 characters.')]
        })
      }
    }
  }

  validateMessage = (elm, name) => {
    if(elm.length < 10 || elm.length > 1000){
      this.setState({
        errorMessage: [...this.state.errorMessage, this.state.errorMessage.push('Your ' + name + ' must be between 10 to 1000 characters.')]
      })
    }
  }

  onSubmit = (e) =>{
    e.preventDefault();
    this.setState({errorMessage: []});
    if(this.validateEmpty(this.state.lastName, 'last name', this.state.errorMessage) === true){
      this.validateName(this.state.lastName, 'last name')
    }
    if(this.validateEmpty(this.state.firstName, 'first name') === true){
      this.validateName(this.state.firstName, 'first name');
    }
    if(this.validateEmpty(this.state.email, 'email') === true){
      this.validateEmail(this.state.email, 'email')
    }
    if(this.validateEmpty(this.state.message, 'message') === true){
      this.validateMessage(this.state.message, 'message')
    }
  }

  render() {
    return (
          <div className='content-contact'>
            <h2>Contact us</h2>
            {
              this.state.errorMessage.map((message, index) => {
                return(
                  <p key={index}>{message}</p>
                )
              })
            }


            <form onSubmit={this.onSubmit}>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value = {this.state.lastName}
                onChange = {(lastName)=>this.setState({lastName: lastName.target.value})}
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
