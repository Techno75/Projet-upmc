import React, { Component } from 'react';
import fieldImage from './../../Assets/Images/field.jpg';
import { API_ROUTE } from '../../Constantes/ApiRoute.js'

class Match extends Component {
  constructor(props){
    super(props);
    this.fetchUpdate = null;
    this.state = {
      match : {home_team:{code : "TBD", goals : ""}, away_team:{code : "TBD", goals : ""}, time : ""},
      fifaId : null
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
        this.setState({ match : match[0] });
      });

  }

  render() {
    let match = this.state.match;
    return (
          <div className="single-match-conatiner">
            <div className="field">
              <img src={fieldImage} alt="football field" />
              <div className="field-score-card">
                <div className="field-country-card">
<<<<<<< HEAD
                  <img src={require('./../../Assets/Images/Flags/' + match.home_team.code + ".jpg")} alt="flag" />
                  <p>{match.home_team.code === "TBD" ? "" : match.home_team.code}</p>
=======
                  <img src={require('./../../Assets/Images/Flags/' + match.home_team.code + ".jpg")} alt='flags-world-cup-home_team'/>
                  <p>{match.home_team.code}</p>
>>>>>>> f41aae45478ccdc320a252e75727576aba14f179
                </div>
                <div className="field-time-score-card">
                  <p>{match.time}</p>
                  <p>{match.home_team.goals === undefined ? "" : match.home_team.goals} - {match.away_team.goals === undefined ? "" : match.away_team.goals }</p>
                </div>
                <div className="field-country-card">
<<<<<<< HEAD
                  <img src={require('./../../Assets/Images/Flags/' + match.away_team.code + ".jpg")} alt="flag" />
                  <p>{match.away_team.code === "TBD" ? "" : match.away_team.code}</p>
=======
                  <img src={require('./../../Assets/Images/Flags/' + match.away_team.code + ".jpg")} alt='flags-world-cup-away_team' />
                  <p>{match.away_team.code}</p>
>>>>>>> f41aae45478ccdc320a252e75727576aba14f179
                </div>
              </div>
            </div>
          </div>
    )
  }
}

export default Match;
