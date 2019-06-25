import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import moment from 'moment';





class Bet extends Component {

  state = {

  }

  getStorageData(value) {
    const testData = JSON.parse(sessionStorage.getItem('userData'));
    console.log(testData);
    value = testData[value];
    return value;
  }

  bet(home_team, away_team, datetime, betTeam) {
    fetch('http://localhost:8080/api/pronostics/new', { mode: 'cors', method : 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.getStorageData('token'),
        },
        body : JSON.stringify({
          home_team: home_team,
          away_team: away_team,
          datetime: datetime,
          pronostic: betTeam,
        })
    })
        .then((response) => {
            console.log(response);
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                //alert('User succsessfully created');
                console.log('notification created');
                // this.setState({redirect: true});
                // this.props.history.push(`${routesList[3].path}`);
                return response.json()
            }
        })
        .then((data)=>{
          console.log(data);
            //this.setState({errorMessage: data.error});
        })

        .catch((err) => {
            console.log('error', err);
        });
  }



  render() {

    const matchNotPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "future"){
        return match
      }
      return false;
    })

    console.log(matchNotPlayedList);


    return(
      <div className='content-groupe-general'>
        <h2>Bet</h2>
        {
          matchNotPlayedList.map((match, index) => {
            return(
              <div className="match-card-row-with-button" key={index}>
                  <div className="match-card-row">
                    <div className='content-group-pronostic'>
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
                     <div className="content-betButtons">
                       <button onClick={() => this.bet(match.home_team.code, match.away_team.code, moment(match.datetime).format('MM-DD-YYYY'), match.home_team.code)} className="betButtons">{match.home_team.code}</button>
                       <button onClick={() => this.bet(match.home_team.code, match.away_team.code, moment(match.datetime).format('MM-DD-YYYY'), '0')} className="betButtons">Draw</button>
                       <button onClick={() => this.bet(match.home_team.code, match.away_team.code, moment(match.datetime).format('MM-DD-YYYY'), match.away_team.code)} className="betButtons">{match.away_team.code}</button>
                     </div>
                  </div>
              </div>




























            )
          })
        }
      </div>
    )
  }
}

export default Bet;
