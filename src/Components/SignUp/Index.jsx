import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import {API_ROUTE} from "../../Constantes/ApiRoute";
import Select from 'react-select'

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
            const countryOption = data.map((country)=>{
              return {
                value:country.id,
                label:<div className='option-select-sign-up'>
                        <img src={require(`./../../Assets/Images/Flags/${country.fifa_code}.jpg`)} alt={country.fifa_code + '_flag'}/>
                        <span>{country.country}</span>
                      </div>
                }
            })
            this.setState({countries : countryOption});
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
    console.log(this.state);
    fetch('http://localhost:8080/api/users/register', { mode: 'cors', method : 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.state.userData)})
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

    const selectOptionStyle = {
        option: (provided, state) => ({
          ...provided,
          borderBottom: '1px solid lightgray',
          color: '#212121',
          padding: 10,
          fontFamily: 'Oswald',
        }),
        control: () => ({
          width: 250,
          padding: 0,
          fontFamily: 'Oswald',
          borderBottom: '1px solid yellow',
        }),
        placeholder: () => ({
          color:'#282B62',
          fontSize:20,
        })
      }

    return (
          <div className='content-signup'>
            <h2>Sign Up</h2>
              <form onSubmit={this.onSubmit}>
                  <input
                      type='text'
                      name='lastname'
                      placeholder='Last Name'
                      value = {this.state.userData.lastname}
                      onChange = {(lastname)=>this.setState({userData: {...this.state.userData, lastname: lastname.target.value }})}
                  />
                  <input
                      type='text'
                      name='firstname'
                      placeholder='First Name'
                      value={this.state.userData.firstname}
                      onChange = {(firstname)=>this.setState({userData: {...this.state.userData, firstname: firstname.target.value }})}
                  />
                  <input
                      type='text'
                      name='username'
                      placeholder='Username'
                      value={this.state.userData.username}
                      onChange = {(username)=>this.setState({userData:{...this.state.userData, username: username.target.value}})}
                  />
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
                  <input
                      type='password'
                      name='confirm-password'
                      placeholder='Confirm your password'
                      value={this.state.confirmPassword}
                      onChange={(confirmPassword)=>this.setState({confirmPassword: confirmPassword.target.value})}
                  />
                  <p>{this.state.errorMessage}</p>
                      <Select
                        options={this.state.countries}
                        onChange={(team)=>this.setState({userData:{...this.state.userData, team : team.value}})}
                        styles={selectOptionStyle}
                        placeholder='Choose your favorite team'
                        components={{ DropdownIndicator: () => null, IndicatorsContainer: () => null }}
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
