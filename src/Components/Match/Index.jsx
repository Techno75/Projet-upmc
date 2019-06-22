import React, { Component } from 'react';
import fieldImage from './../../Assets/Images/field.jpg';
import { API_ROUTE } from '../../Constantes/ApiRoute.js'
import ScoreTimeCard from './ScoreTimeCard.jsx';

class Match extends Component {
  constructor(props){
    super(props);
    this.fetchUpdate = null;
    this.state = {
      match : {home_team:{code : "TBD", goals : ""}, away_team_events: [], away_team:{code : "TBD", goals : ""}, home_team_events : [], time : ""},
      fifaId : null,
      pseudo : "",
      message : "",
    }
    this.fetchMatchData = this.fetchMatchData.bind(this);
  }

  componentDidMount(){
    if (this.props.location.aboutProps === undefined) {
      window.location="http://localhost:3000/Matches"
    }
    else {
      this.setState({fifaId : this.props.location.aboutProps.match.fifa_id})
      this.fetchMatchData();
      this.fetchUpdate = setInterval(this.fetchMatchData, 25000);
    }
  }

  componentWillUnmount(){
    window.clearInterval(this.fetchUpdate)
  }

  fetchMatchData(){
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
    .then((data) => {

        let match = data.filter((matchToFilter)=>{
          if (matchToFilter.fifa_id === this.state.fifaId) {
            return matchToFilter;
          }
        });
        this.setState({ match : match[0], matchId : match[0].fifa_id});
    });
  }

  submitForm(evt){
      evt.preventDefault()  ;
      const {fifaId, pseudo, message} = this.state;
  }

  render() {
    let match = this.state.match;

    //////////////////// buteur ///////////////////

    let homeEvent = match.home_team_events === undefined ? [] : match.home_team_events;
    let awayEvent = match.away_team_events === undefined ? [] : match.away_team_events;

    let homeGoalList = homeEvent.filter((evt)=>{
      if (evt.type_of_event === "goal" || evt.type_of_event === "goal-penalty") {
        return evt
      }
    })

    let awayGoalList = awayEvent.filter((evt)=>{
      if (evt.type_of_event === "goal" || evt.type_of_event === "goal-penalty") {
        return evt
      }
    })

/////////////////// list equipe ////////////////////

    let homePlayerList = match.home_team_statistics === undefined ? [] : match.home_team_statistics.starting_eleven;
    let homeSubstitutesList = match.home_team_statistics === undefined ? [] : match.home_team_statistics.substitutes;
    let awayPlayerList = match.away_team_statistics === undefined ? [] : match.away_team_statistics.starting_eleven;
    let awaySubstitutesList = match.away_team_statistics === undefined ? [] : match.away_team_statistics.substitutes;

//////////////////////////// Satistics /////////////

    let homeStatistics = {};
    let awayStatistics = {};

    if (match.home_team_statistics !== undefined && match.away_team_statistics !== undefined) {
      homeStatistics = match.home_team_statistics;
      awayStatistics = match.away_team_statistics;
    }


    return (
          <div className="single-match-conatiner">
            <div className="field">
              <img src={fieldImage} alt="football field" />
              <ScoreTimeCard
                match={match}
                homeGoalList={homeGoalList}
                awayGoalList={awayGoalList}
              />
            </div>
            <h1>Teams :</h1>
            <div className="palyer-list">
              <div className="home">
                <div className="firs-team">
                  <h2>Starting Eleven : {homeStatistics.tactics}</h2>
                  {homePlayerList.map((player, index)=>{
                    return (
                      <p key={index}>{player.shirt_number + " " + player.name} {player.captain ? "(C)" : ""}</p>
                    )
                  })}
                </div>
                <div className="sub">
                  <h2>Substitutes</h2>
                  {homeSubstitutesList.map((player, index)=>{
                    return (
                      <p key={index}>{player.shirt_number + " " + player.name}</p>
                    )
                  })}
                </div>
              </div>
              <hr/>
              <div className="away">
                <div className="firs-team">
                  <h2>Starting Eleven : {awayStatistics.tactics}</h2>
                  {awayPlayerList.map((player, index)=>{
                    return (
                      <p key={index}>{player.shirt_number + " " + player.name} {player.captain ? "(C)" : ""}</p>
                    )
                  })}
                </div>
                <div className="sub">
                  <h2>Substitutes</h2>
                  {awaySubstitutesList.map((player, index)=>{
                    return (
                      <p key={index}>{player.shirt_number + " " + player.name}</p>
                    )
                  })}
                </div>
              </div>
            </div>
            <h1>Statistics</h1>
            <div className="statistics">
              <div className='statistics-colomn'>
                <p>Possession : {homeStatistics.ball_possession}%</p>
                <p>Attempts : {homeStatistics.attempts_on_goal}</p>
                <p>Attempts on target : {homeStatistics.on_target}</p>
                <p>Blocked : {homeStatistics.blocked}</p>
                <p>Passes : {homeStatistics.num_passes}</p>
                <p>Passes completed : {homeStatistics.passes_completed}</p>
                <p>Pass accuracy : {homeStatistics.pass_accuracy}%</p>
                <p>Corners : {homeStatistics.corners}</p>
                <p>Tackles : {homeStatistics.tackles}</p>
                <p>Yellow cards : {homeStatistics.yellow_cards}</p>
                <p>Red cards : {homeStatistics.red_cards}</p>
                <p>Fouls Committed : {homeStatistics.fouls_committed}</p>
              </div>
              <hr />
              <div className='statistics-colomn'>
                <p>Possession : {awayStatistics.ball_possession}%</p>
                <p>Attempts : {awayStatistics.attempts_on_goal}</p>
                <p>Attempts on target : {awayStatistics.on_target}</p>
                <p>Blocked : {awayStatistics.blocked}</p>
                <p>Passes : {awayStatistics.num_passes}</p>
                <p>Passes completed : {awayStatistics.passes_completed}</p>
                <p>Pass accuracy : {awayStatistics.pass_accuracy}%</p>
                <p>Corners : {awayStatistics.corners}</p>
                <p>Tackles : {awayStatistics.tackles}</p>
                <p>Yellow cards : {awayStatistics.yellow_cards}</p>
                <p>Red cards : {awayStatistics.red_cards}</p>
                <p>Fouls Committed : {awayStatistics.fouls_committed}</p>
              </div>
            </div>
            <h1>Comments</h1>
            <div className="content-signup specialForm">
              <form onSubmit={this.submitForm.bind(this)}>
                <input
                  type="text"
                  value={this.state.pseudo}
                  onChange={(pseudo)=>this.setState({pseudo : pseudo.target.value})}
                  placeholder="Pseudo"
                  style={{color :"#F9D500"}}
                />
                <textarea
                  value={this.state.message}
                  onChange={(message)=>{this.setState({message : message.target.value})}}
                  placeholder="comment"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
    )
  }
}

export default Match;
