import React, { Component } from 'react';
import { API_ROUTE } from '../../Constantes/ApiRoute.js';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import moment from 'moment';
import MyBets from './MyBets';
import TopBettor from './TopBettor';
import Bet from './Bet';


class Pronostics extends Component {
  constructor(props){
    super(props)
    this.fetchUpdate = null;
    this.state = {
      view : "bet",
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

  smallRouter() {
    if (this.state.view === 'bet') {
      return(
        <Bet matchDataList={this.state.matchDataList}/>
      )
    } else if(this.state.view === 'mybets') {
      return(
        <MyBets/>
      )
    } else if(this.state.view === 'topbettor'){
      return(
        <TopBettor/>
      )
    } else {
      return false;
    }
  }

  render() {


    return (
      <div className="content-pronostics">
        <div className="content-pronostics-buttons">
          <button
            className={this.state.view === "bet" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'bet'})}
          >
            Bet
          </button>
          <button
            className={this.state.view === "mybets" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'mybets'})}
          >
            My Bets
          </button>
          <button
            className={this.state.view === "topbettor" ? "match-container-button-active" : ""}
            onClick={()=>this.setState({view : 'topbettor'})}
          >
            Top Bettors
          </button>
        </div>

          {this.smallRouter()}
      </div>
    )
  }
}

export default Pronostics;
