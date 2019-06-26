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
      goalList : [],
      }
    }

    componentWillMount(){
      fetchDataToApi(API_ROUTE + "matches")
      .then((matchList)=>{

          const allMatchAlreadyPlayed = matchList.filter((match)=>{if (match.status === "completed"){return match;}});

          const allMatchOfHomeTeamAlreadyPlayedReformatList = allMatchAlreadyPlayed.map((match)=>{
            const finalObjectFormatList = match.home_team_events.map((event)=>{
               event.country = match.home_team_country;
               return event;
            })
            return finalObjectFormatList;
          })

          const allMatchOfAwayTeamAlreadyPlayedReformatList = allMatchAlreadyPlayed.map((match)=>{
            const finalObjectFormatList = match.away_team_events.map((event)=>{
               event.country = match.away_team_country;
               return event;
            })
            return finalObjectFormatList;
          })

          const allEventList = [];

          allMatchOfHomeTeamAlreadyPlayedReformatList.forEach((evtList)=>allEventList.push(...evtList))
          allMatchOfAwayTeamAlreadyPlayedReformatList.forEach((evtList)=>allEventList.push(...evtList))

          const allGoals = allEventList.filter((evt)=>{if (evt.type_of_event === "goal" || evt.type_of_event === "goal-penalty") {return evt}})

          const scorerNameListToCheck = [];
          const scorerNameListTmp = allGoals.filter((goal)=>{
            if (scorerNameListToCheck.indexOf(goal.player) === -1) {
              scorerNameListToCheck.push(goal.player);
              return goal
            }
          })

          const scorerList = scorerNameListTmp.map((goal)=>({name : goal.player, country : goal.country, goalList : []}));

          allGoals.forEach((goal)=>{
            scorerList.forEach((scorer)=>{
              if (goal.player === scorer.name) {
                scorer.goalList.push(goal);
              }
            })
          })
          this.setState({scorerList : scorerList.sort(this.compare), numberOfMatchPlayed : allMatchAlreadyPlayed.length, numberOfGoalScored : allGoals.length, goalList : allGoals})
      })
    }

    compare (a, b) {
      return (a.goalList.length - b.goalList.length) * -1;
    }


  render() {
    const goalPerMatch = Math.round((this.state.numberOfGoalScored / this.state.numberOfMatchPlayed) * 10) / 10;
    return (
          <div>
            <h1>Statistics</h1>
            <div>
              {
                this.state.scorerList.map((scorer, index)=>{
                  if (index < 6) {
                    return(
                      <div key={index}>
                        <p>#{index + 1}</p>
                        <p>{scorer.name}</p>
                        <p>{scorer.country}</p>
                        <p>{scorer.goalList.length} goals</p>
                      </div>
                    )
                  }
                })
              }
            </div>
            <div>
              <h2>Number of Match played : {this.state.numberOfMatchPlayed}</h2>
              <h2>Number of goals scored : {this.state.numberOfGoalScored}</h2>
              <h2>Goal per match : {goalPerMatch}</h2>
            </div>
          </div>
    )
  }
}

export default Statistics;
