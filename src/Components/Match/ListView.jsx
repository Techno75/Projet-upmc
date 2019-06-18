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

    return (
          <div>
            <h1>Calendar</h1>
            <p>Match already played</p>
            {matchAlreadyPlayedList.map((match)=>{
              return(
                <div className="match-card-row">
                   <div className="country-card">
                      <img src={require("./../../Assets/Images/Flags/" + match.home_team.code + ".jpg")} alt="flag"/>
                      {match.home_team_country}
                   </div>
                  <div className="match-card-row-score">
                      {match.home_team.goals} - {match.away_team.goals}
                   </div>
                   <div className="country-card">
                      {match.away_team_country}
                      <img src={require("./../../Assets/Images/Flags/" + match.away_team.code + ".jpg")} alt="flag"/>
                   </div>

                </div>
              )
            })}
            {matchNotPlayedList.map((match)=>{
              return(
                <div>
                   {moment(match.datetime).format('MM-DD-YYYY hh:mm a')} | {match.home_team_country} vs {match.away_team_country}
                </div>
              )
            })}

          </div>
    )
  }
}

export default ListView;
