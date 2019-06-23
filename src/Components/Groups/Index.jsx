import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class Groups extends Component {
  constructor(props){
    super(props)
    this.state = {
      groupList : [],
      groupIdToDisplay : 0,
      groupeTodisplay : {letter : "", ordered_teams : [{country : "", games_played : 0, draws : 0, fifa_code : "TBD"}]}
    }
  }
  componentDidMount(){
    fetchDataToApi(API_ROUTE + 'teams/group_results', 'GET')
    .then((groupList)=>{
      this.setState({groupList, groupeTodisplay : groupList[this.state.groupIdToDisplay]})
    });
  }

  goNext(){
    const groupIdToDisplay = this.state.groupIdToDisplay + 1;
    this.setState({groupIdToDisplay, groupeTodisplay : this.state.groupList[groupIdToDisplay]})
  }

  goPrevious(){
    const groupIdToDisplay = this.state.groupIdToDisplay - 1;
    this.setState({groupIdToDisplay, groupeTodisplay : this.state.groupList[groupIdToDisplay]})
  }

  render() {
    return (
          <div className="content-groups">
            <table>
              <thead>
                <tr>
                  <th>Group {this.state.groupeTodisplay.letter}</th>
                  <th>Rank</th>
                  <th>Country</th>
                  <th>Games Played</th>
                  <th>Win</th>
                  <th>Draw</th>
                  <th>Loose</th>
                  <th>Goal For</th>
                  <th>Goal Against</th>
                  <th>+/-</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {this.state.groupeTodisplay.ordered_teams.map((team, index)=>{
                  return(
                      <tr key={index}>
                        <td>
                            <Link to={{pathname : routesList[14].path, aboutProps : {team : team}}} >
                              <img src={require('./../../Assets/Images/Flags/' + team.fifa_code + ".jpg")} alt="flag"/>{team.country}
                            </Link>
                        </td>
                        <td>
                          {team.games_played}
                        </td>
                        <td>
                          {team.wins}
                        </td>
                        <td>
                          {team.draws}
                        </td>
                        <td>
                          {team.losses}
                        </td>
                        <td>
                          {team.goals_for}
                        </td>
                        <td>
                          {team.goals_against}
                        </td>
                        <td>
                          {team.goal_differential}
                        </td>
                        <td>
                          {team.points}
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                  )
                })}
              </tbody>
            </table>
            {this.state.groupIdToDisplay > 0 ? <button onClick={this.goPrevious.bind(this)}>Previous</button> : ""}
            {this.state.groupIdToDisplay < 5 ? <button onClick={this.goNext.bind(this)}>Next</button> : ""}
          </div>
    )
  }
}

export default Groups;
