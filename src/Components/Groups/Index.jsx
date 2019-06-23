import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';

class Groups extends Component {
  constructor(props){
    super(props)
    this.state = {
      groupList : [],
      groupToDisplay : 0,
    }
  }
  componentDidMount(){
    fetchDataToApi(API_ROUTE + 'teams/group_results', 'GET')
    .then((groupList)=>{
      this.setState({groupList})
    });
  }

  render() {
    return (
          <div>
            <h1>Groupes</h1>
          </div>
    )
  }
}

export default Groups;
