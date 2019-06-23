import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';

class Groups extends Component {
  constructor(props){
    super(props)
    this.state = {
      groupList : [],
      groupIdToDisplay : 2,
      groupeTodisplay : {letter : "", ordered_teams:[{country : "", games_played : 0, draws : 0, }]}
    }
  }
  componentDidMount(){
    fetchDataToApi(API_ROUTE + 'teams/group_results', 'GET')
    .then((groupList)=>{
      this.setState({groupList,})
    });
  }

  render() {
    let group = {ordered_teams:[]};
    group = this.state.groupList[this.state.groupIdToDisplay];


    return (
          <div>
            <h1>Groupes</h1>
            <table>
              <thead>
                <tr>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
    )
  }
}

export default Groups;
