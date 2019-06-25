import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';

class Statistics extends Component {
  constructor(props){
    super(props);
    this.state = {
      scorerList : [],
      numberOfMatchPlayed : 0,
      numberOfGoalScored : 0,
      goalList : []
      }
    }

    componentWillMount(){
      fetchDataToApi(API_ROUTE + "matches")
      .then((matchList)=>{

          const allMatchAlreadyPlayed = matchList.filter((match)=>{if (match.status === "completed"){return match;}})
          const homeEventList = allMatchAlreadyPlayed.map((match)=>match.home_team_events);
          const awayEventList = allMatchAlreadyPlayed.map((match)=>match.away_team_events);
          const allEventList = [];

          homeEventList.forEach((evtList)=>{allEventList.push(...evtList);})
          awayEventList.forEach((evtList)=>{allEventList.push(...evtList);})

          const allGoals = allEventList.filter((evt)=>{if (evt.type_of_event === "goal" || evt.type_of_event === "goal-penalty") {return evt}})

          this.setState({numberOfMatchPlayed : allMatchAlreadyPlayed.length, numberOfGoalScored : allGoals.length, goalList : allGoals})
      })
    }

  render() {
    console.log(this.state.goalList);
    const goalPerMatch = Math.round((this.state.numberOfGoalScored / this.state.numberOfMatchPlayed) * 10) / 10;
    return (
          <div>
            <h1>Statistics</h1>
            <h2>Number of Match played : {this.state.numberOfMatchPlayed}</h2>
            <h2>Number of goals scored : {this.state.numberOfGoalScored}</h2>
            <h2>Goal per match : {goalPerMatch}</h2>
          </div>
    )
  }
}

export default Statistics;
