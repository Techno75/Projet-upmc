import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import {REST_ROUTE} from "../../Constantes/ApiRoute";


class MyBets extends Component {


  state = {
    matchPronosticed: [],
  }

componentDidMount() {
  this.getPronostics();
}


getStorageData(value) {
  const testData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(testData);
  value = testData[value];
  return value;
}

deletePronostic() {

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
          console.log(this.state.matchPronosticed);
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

  render() {
    return(
      <div>
        <h2>MyBets</h2>
        <div>
        {
          this.state.matchPronosticed.map((match, index) => {
            return(
              <div key={index}>
                <div className="">
                  <div className=''>
                   <div className="">
                    <img src={require("./../../Assets/Images/Flags/" + match.home_team + ".jpg")} alt="flag"/>
                    <p>{match.home_team}</p>
                   </div>
                   <div className="">
                    <img src={require("./../../Assets/Images/Flags/" + match.away_team + ".jpg")} alt="flag"/>
                    <p>{match.away_team}</p>
                   </div>
                 </div>
                 <p>{match.pronostic === '0' ? 'DRAW' : match.pronostic}</p>
                 <button onClick={() => this.deletePronostic(match.matchId)}>delete</button>
                 </div>
               </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}

export default MyBets;
