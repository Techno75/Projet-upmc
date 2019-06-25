import React, { Component } from 'react';
import { API_ROUTE } from '../../Constantes/ApiRoute.js';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import moment from 'moment';
import MyBets from './MyBets';
import TopBetter from './TopBettor';
import Bet from './Bet';


class Pronostics extends Component {
  constructor(props){
    super(props)
    this.fetchUpdate = null;
    this.state = {
      view : "list",
      matchDataList : [],
    }
    this.fetchMatchesData = this.fetchMatchesData.bind(this);
  }

  componentDidMount(){
    this.fetchMatchesData();
    this.fetchUpdate = setInterval(this.fetchMatchesData, 25000);
  }

  componentWillUnmount(){
    window.clearInterval(this.fetchUpdate)
  }

  fetchMatchesData(){
    fetch(API_ROUTE + 'matches',  {mode: 'cors', method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res)=>{
        if (res.status !== 200) {
           return;
        }
        return res.json()
      })
      .then((data) => this.setState({ matchDataList : data }));
  }

  render() {

    const matchNotPlayedList = this.state.matchDataList.filter((match)=>{
      if(match.status === "future"){
        return match
      }
      return false;
    })

    console.log(matchNotPlayedList);

    return (
      <div className="content-pronostics">
        <div>
          <button
            className={this.state.view === "bet" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'list'})}
          >
            Matches list
          </button>
          <button
            className={this.state.view === "mybets" ? "match-container-button-active" : "board-rsp"}
            onClick={()=>this.setState({view : 'board'})}
          >
            Matches board
          </button>
          <button
            className={this.state.view === "mybets" ? "match-container-button-active" : "board-rsp"}
            onClick={()=>this.setState({view : 'board'})}
          >
            Matches board
          </button>
        </div>
      {
        matchNotPlayedList.map((match, index) => {
          return(
            <div className="match-card-row-with-button" key={index}>
              <Link to={{pathname : routesList[10].path, aboutProps : {match : match}}}>
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
              <div>
                <button>1</button>
                <button>2</button>
                <button>3</button>
              </div>
            </div>
          )
        })
      }



      </div>
    )
  }
}

export default Pronostics;
