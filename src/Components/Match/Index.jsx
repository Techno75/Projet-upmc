import React, { Component } from 'react';

class Match extends Component {
  render() {

    const match = this.props.location.aboutProps.match;

    console.log(match);
    return (
          <div className="single-match-conatiner">
            <h1>Match</h1>
            <p>{match.home_team_country} : {match.home_team.goals}</p>
            <p>vs</p>
            <p>{match.away_team_country} : {match.away_team.goals}</p>
          </div>
    )
  }
}

export default Match;
