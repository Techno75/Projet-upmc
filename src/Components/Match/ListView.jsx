import React, { Component } from 'react';
import moment from 'moment';

class ListView extends Component {
  render() {
    const matchAlreadyPlayedList = this.props.matchDataList.filter((match)=>{
      if(match.status === "completed"){
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
      if(match.status === "in progress"){
        return match
      }
      return false;
    })

    return (
          <div>
            {matchInProgressList.length === 0 ? "" : <h1>In Progress</h1>}
            {matchInProgressList.length === 0 ? "" : matchInProgressList.map((match, index)=>{
              return(
                <div className="match-card-row" key={index} style={{margin : "0 auto 50px"}}>
                   <div className="country-card">
                      <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                      <p>{match.home_team_country}</p>
                   </div>
                  <div className="match-card-row-date">
                      <p>{match.time} Minutes</p>
                      <p>{match.home_team.goals} - {match.away_team.goals}</p>
                   </div>
                   <div className="country-card">
                      <p>{match.away_team_country}</p>
                      <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                   </div>
                </div>
              )
            })}
            <h1>Calendar</h1>
            {matchAlreadyPlayedList.map((match, index)=>{
              return(
                <div className="match-card-row" key={index}>
                   <div className="country-card">
                      <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                      <p>{match.home_team_country}</p>
                   </div>
                  <div className="match-card-row-score">
                      <p>{match.home_team.goals} - {match.away_team.goals}</p>
                   </div>
                   <div className="country-card">
                      <p>{match.away_team_country}</p>
                      <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                   </div>
                </div>
              )
            })}
            {matchNotPlayedList.map((match, index)=>{
              return(
                <div className="match-card-row" key={index}>
                   <div className="country-card">
                    <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                      <p>{match.home_team_country}</p>
                   </div>
                  <div className="match-card-row-date">
                      <p>{moment(match.datetime).format('MM/DD/YYYY')}</p>
                      <p>{moment(match.datetime).format('hh:mm a')}</p>
                   </div>
                   <div className="country-card">
                      <p>{match.away_team_country}</p>
                      <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                   </div>
                </div>
              )
            })}

          </div>
    )
  }
}

export default ListView;
