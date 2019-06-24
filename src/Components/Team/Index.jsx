import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';

class Team extends Component {
  constructor(props){
    super(props);
    this.state = {
      team : {},

    };
  }


  componentWillMount(){
    this.setState({team : this.props.location.aboutProps.team});
    fetchDataToApi(API_ROUTE + "matches/country?fifa_code=" + this.props.location.aboutProps.team.fifa_code)
    .then((matchTeam)=>{
      console.log(matchTeam);
    })
  }

  render() {
    const team = this.state.team;
    return (
          <div>
            <h1>{team.country}</h1>
            
          </div>
    )
  }
}

export default Team;
