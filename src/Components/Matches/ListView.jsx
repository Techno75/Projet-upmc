import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class ListView extends Component {

  state = {
      storage: null,
      Authorization: '',
  };

    componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            this.getStorageData();
        }
    }

    getStorageData() {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(sessionStorage.getItem('userData'));
        this.setState({storage: testData});
        this.setState({Authorization: testData.token});
        console.log(testData.token);
        console.log(this.state.storage);
    }

    createNotification = (venue, datetime, matchId) => {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        fetch('http://localhost:8080/api/notifications/new',  { mode: 'cors', method : 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + testData.token,
            },
            body : JSON.stringify({
                venue: venue,
                datetime: datetime,
                isFavorite: 1,
                matchId: matchId,
                UserId: this.state.storage.UserId,
            })
        })
            .then((response) => {
                console.log(response);
                if(!(response.status >= 200 && response.status <= 300)) {
                    console.log(response.json());
                    return response.json();
                } else {
                    console.log('notification created');
                    console.log(response.json());
                    return response.json()
                }
            })
            .then((data)=>{
                this.setState({errorMessage: data.error});
            })

            .catch((err) => {
                console.log('error', err);
            })
    }


  render() {
    console.log(this.props.matchDataList);
    const matchAlreadyPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "completed" || match.status === "end of time"){
        return match
      }
      return false;
    })

    const matchNotPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "future"){
        return match
      }
      return false;
    })

    const matchInProgressList = this.props.matchDataList.filter((match)=>{
      if(match.status === "in progress" || match.status === "pending correction"){
        return match
      }
      return false;
    })

    return (
          <div>
            {matchInProgressList.length === 0 ? "" : <h1>In Progress</h1>}
            {matchInProgressList.length === 0 ? "" : matchInProgressList.map((match, index)=>{
              return(
                <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}} key={index}>
                  <div className="match-card-row" >
                     <div className="country-card">
                        <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                        <p>{match.home_team_country}</p>
                     </div>
                    <div className="match-card-row-date">
                        <p>{match.time} {match.time === 'half-time' ? '' : 'Minutes'}</p>
                        <p>{match.home_team.goals} - {match.away_team.goals}</p>
                     </div>
                     <div className="country-card">
                        <p>{match.away_team_country}</p>
                        <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                     </div>
                  </div>
                </Link>
              )
            })}
            <h1>Calendar</h1>
            {matchAlreadyPlayedList.map((match, index)=>{
              return(
                <div key={index}>
                  {index === 36 || index === 44 || index === 48 || index === 50 || index === 51 ? <h1>{match.stage_name}</h1> : ""}
                  <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}} >
                    <div className="match-card-row" >
                       <div className="country-card">
                          <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                          <p>{match.home_team_country}</p>
                       </div>
                      <div className="match-card-row-score">
                          <p>{moment(match.datetime).format('MM-DD-YYYY')}</p>
                          <p>{match.home_team.goals} - {match.away_team.goals}</p>
                       </div>
                       <div className="country-card">
                          <p>{match.away_team_country}</p>
                          <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                       </div>
                    </div>
                  </Link>
                </div>
              )
            })}
            {matchNotPlayedList.map((match, index)=>{
              return(
                <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}}  key={index}>
                  <div className="match-card-row">
                     <div className="country-card">
                      <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                        <p>{match.home_team_country}</p>
                     </div>
                    <div className="match-card-row-date">
                        <p>{moment(match.datetime).format('MM-DD-YYYY')}</p>
                        <p>{moment(match.datetime).format('hh:mm a')}</p>
                     </div>
                     <div className="country-card">
                        <p>{match.away_team_country}</p>
                        <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                     </div>
                  </div>
                </Link>
              )
            })}
          </div>
    )
  }
}






export default ListView;
