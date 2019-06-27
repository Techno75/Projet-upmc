import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {REST_ROUTE} from "../../Constantes/ApiRoute";

class Bet extends Component {

  state = {
    errorMessage: '',
    matchPronosticed: [],
    drawPronoHandler: false,
    //matchNotPlayedListFinal: [{home_team : {isSelected : false, code: "TBD"}, away_team: {isSelected : false, code : "TBD"}}]
  }

  componentDidMount() {
    if(sessionStorage.getItem('userData')) {
      this.getPronostics();
    }
  }

  getStorageData(value) {
    const testData = JSON.parse(sessionStorage.getItem('userData'));
    value = testData[value];
    return value;
  }

  bet(match, betTeam) {
    betTeam.isSelected = !betTeam.isSelected;
    fetch(REST_ROUTE + 'pronostics/new', { mode: 'cors', method : 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.getStorageData('token'),
        },
        body : JSON.stringify({
          home_team: match.home_team.code,
          away_team: match.away_team.code,
          datetime: moment(match.datetime).format('MM-DD-YYYY'),
          pronostic: betTeam.code,
          matchId: match.fifa_id
        })
    })
        .then((response) => {
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                //alert('User succsessfully created');
                // this.setState({redirect: true});
                // this.props.history.push(`${routesList[3].path}`);
                this.getPronostics();
                return response.json()
            }
        })
        .then((data)=>{
            //this.setState({errorMessage: data.error});
        })
        .catch((err) => {
            console.log('error', err);
        });
  }

  getPronostics() {
    const recupUsername = JSON.parse(sessionStorage.getItem('userData'));
    fetch(REST_ROUTE + 'pronostics/' + recupUsername.username,  { mode: 'cors', method : 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.getStorageData('token'),
        },
    })
        .then((response) => {
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                return response.json()
            }
        })
        .then((data)=>{
            this.setState({errorMessage: data.error});
            this.setState({matchPronosticed: data})
        })
        .catch((err) => {
            console.log('error', err);
        })
  }

  deletePronostic(matchId) {
    this.state.matchPronosticed.map((matchPronosticed) => {
      if(matchPronosticed.matchId == matchId) {
        fetch(REST_ROUTE + 'pronostics/delete/' + matchId,  { mode: 'cors', method : 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  this.getStorageData('token'),
            },
        })
            .then((response) => {
                if(!(response.status >= 200 && response.status <= 300)) {
                    return response.json();
                } else {
                  this.getPronostics();
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
    })

  }


  // dynamicPronoButtons(match, bet) {
  //   if(sessionStorage.getItem('userData') && this.state.matchPronosticed) {
  //     let matchIsPronosticed = false;
  //       this.state.matchPronosticed.forEach((matchPronosticed) => {
  //         if(matchPronosticed.matchId === match.fifa_id) {
  //           matchIsPronosticed = true;
  //           console.log('pronosticed');
  //         }
  //       })
  //     if (!matchIsPronosticed) {
  //       return(
  //         <button onClick={() => this.bet(match.home_team.code, match.away_team.code, moment(match.datetime).format('MM-DD-YYYY'), bet, match.fifa_id)} className="betButtons">{bet}</button>
  //       )
  //     } else {
  //       return(
  //         <button onClick={() => this.deletePronostic(match.fifa_id)} className="betButtons pronosticed-true">{bet}</button>
  //       )
  //     }
  //   }
  // }
  render() {
    const mappedMatchList = this.props.matchDataList.map((match) => {
      match['null_team'] = {isSelected: false, code: 0};
      match.home_team['isSelected'] = false;
      match.away_team['isSelected'] = false;
      return match;
    })
    const matchFuture = mappedMatchList.filter((match) => {
      if(match.status === 'future') {
        return match;
      }
    })

    console.log(matchFuture);

    return(
      <div className='content-groupe-general'>
        <h2>Bet</h2>
        {
          matchFuture.map((match, index) => {
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
                       <button
                        onClick={() => this.bet(match, match.home_team)}
                        className={match.home_team.isSelected ? "betButtons pronosticed-true" : "betButtons"}
                        >
                          {match.home_team.code}
                        </button>
                       <button
                        onClick={() => this.bet(match, match.null_team)}
                        className={match.null_team.isSelected ? "betButtons pronosticed-true" : 'betButtons'}
                       >DRAW</button>
                       <button
                        onClick={() => this.bet(match, match.away_team)}
                        className={match.away_team.isSelected ? "betButtons pronosticed-true" : "betButtons"}>{match.away_team.code}</button>
                        <button className="betButtons">Cancel</button>
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
