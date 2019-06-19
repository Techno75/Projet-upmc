import React, { Component } from 'react';
import fieldImage from './../../Assets/Images/field.jpg';

class Match extends Component {
  render() {
    if (this.props.location.aboutProps === undefined) {
      window.location="http://localhost:3000/Matches"
    }
    const match = this.props.location.aboutProps.match;

    console.log(match);
    return (
          <div className="single-match-conatiner">
            <div className="field">
              <img src={fieldImage} alt="football field"/>
              <div className="field-score-card">
                <div className="field-country-card">
                  <img src={require('./../../Assets/Images/Flags/' + match.home_team.code + ".jpg")} />
                  <p>{match.home_team.code}</p>
                </div>
                <div className="field-time-score-card">
                  <p>{match.time}</p>
                  <p>{match.home_team.goals + "-" + match.away_team.goals }</p>
                </div>
                <div className="field-country-card">
                  <img src={require('./../../Assets/Images/Flags/' + match.away_team.code + ".jpg")} />
                  <p>{match.away_team.code}</p>
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default Match;
