import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';

class Home extends Component {



  render() {
    return (
          <div className="content-home">
            <div className="field">
              <img src={homeImage} alt="home-footfem-img" />
              <h1>FootFem supports women's soccer !</h1>
            </div>
            <div className="content-home-actu">
              <h2>News</h2>
            </div>
          </div>
    )
  }
}

export default Home;
