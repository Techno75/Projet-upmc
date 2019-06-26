import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import {API_ROUTE, REST_ROUTE} from "../../Constantes/ApiRoute";
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Profil extends Component {
    state = {
        storage: null,
        teamList: null,
        teamCode: '',
        curentUser : JSON.parse(sessionStorage.getItem('userData')),
        favoriteMatchList : [],
        favoriteMatchListToDisplay : [],
        notificationIsOpen : false
    };

    componentWillMount() {

        // this.setState({storage: sessionStorage.getItem('userData')});
        // console.log(JSON.parse(this.state.storage));
        this.getStorageData();
        this.getUserNotifications();
    }

    getUserNotifications(){
      fetchDataToApi('http://localhost:8080/api/notifications/' + JSON.parse(sessionStorage.getItem('userData')).username , 'GET')
      .then((matchLiked)=>{
          const allMatchIdList = matchLiked.map((match)=>{
            return match.matchId;
          })
          this.setState({favoriteMatchList : matchLiked})
          return true;
      })
      .then(()=>{
        return fetchDataToApi(API_ROUTE + "matches", 'GET')
      })
      .then((allMatchList)=>{
        let favoriteMatchListToDisplay = [];
        allMatchList.forEach((match)=>{
          this.state.favoriteMatchList.forEach((matchToCompare)=>{
            if (match.fifa_id === matchToCompare.matchId.toString()) {
              favoriteMatchListToDisplay.push(match);
            }
          })
        })
        this.setState({favoriteMatchListToDisplay})
      })
    }

    teamCode() {
        switch (this.state.storage.team) {
            case 1: return 'FRA';
            case 2: return 'KOR';
            case 3: return 'NOR';
            case 4: return 'NGA';
            case 5: return 'GER';
            case 6: return 'CHN';
            case 7: return 'ESP';
            case 8: return 'RSA';
            case 9: return 'AUS';
            case 10: return 'ITA';
            case 11: return 'BRA';
            case 12: return 'JAM';
            case 13: return 'ENG';
            case 14: return 'SCO';
            case 15: return 'ARG';
            case 16: return 'JPN';
            case 17: return 'CAN';
            case 18: return 'CMR';
            case 19: return 'NZL';
            case 20: return 'NED';
            case 21: return 'USA';
            case 22: return 'THA';
            case 23: return 'CHI';
            case 24: return 'SWE';
        }
    }

    getStorageData() {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(sessionStorage.getItem('userData'));
        this.setState({storage: testData});
        console.log(testData);
    }

    deleteFavoriteMatch(matchId){
      fetchDataToApi(REST_ROUTE + "notifications/delete/" + matchId ,'POST', undefined, this.state.storage.token)
      .then((res)=>{
        this.getUserNotifications()
      })
    }

    changeNotificationsDisplay(){
      if (this.state.notificationIsOpen === true) {
        this.setState({notificationIsOpen : false});
      }
      else {
        {
          this.setState({notificationIsOpen : true});
        }
      }
    }

    render() {
        return (
            <div className="content-profil">
                <h1>{this.state.storage.firstname + ' ' + this.state.storage.lastname}</h1>

                <div className="lineData">
                    <span className="label">username </span><span className="labelData">{this.state.storage.username}</span>
                </div>
                <div className="lineData">
                    <span className="label">email </span><span className="labelData">{this.state.storage.email}</span>
                </div>
                <div className="lineData">
                    <span className="label">favorite team</span><img src={require("./../../Assets/Images/Flags/" + this.teamCode() + ".jpg")} width="40px" height="25px" alt="flag"/><span className="teamCode">{' ' + this.teamCode()}</span>
                </div>
                <button onClick={this.changeNotificationsDisplay.bind(this)}>Display your favorite matches</button>
                <div className={this.state.notificationIsOpen === true ? "notif-open" : "notif-closed"}>
                  {
                    this.state.favoriteMatchListToDisplay.map((match, index)=>{
                      console.log(match);
                      return(
                        <div key={index}>
                          <div>
                            <img src={require('./../../Assets/Images/Flags/' + match.home_team.code + ".jpg")} alt="flag"/>
                            <p>{match.home_team_country}</p>
                          </div>
                          <div>
                            <p>{moment(match.datetime).format("MM-DD-YYYY")}</p>
                            <p>{moment(match.datetime).format("hh:mm a")}</p>
                          </div>
                          <div>
                            <div>
                              <img src={require('./../../Assets/Images/Flags/' + match.away_team.code + ".jpg")} alt="flag"/>
                              <p>{match.away_team_country}</p>
                            </div>
                          </div>
                          <button onClick={this.deleteFavoriteMatch.bind(this, match.fifa_id)}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                          </button>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
        )
    }
}

export default Profil;
