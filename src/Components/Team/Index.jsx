import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import { API_ROUTE } from './../../Constantes/ApiRoute.js';

class Team extends Component {
  constructor(props){
    super(props);
    this.state = {
      team : {},
      teamPlayerList : [],
      goalsNubuer : 0,

    };
  }


  componentWillMount(){
    if (this.props.location.aboutProps === undefined) {
      window.location="http://localhost:3000/Matches"
    }else{
      this.setState({team : this.props.location.aboutProps.team});
      fetchDataToApi(API_ROUTE + "matches/country?fifa_code=" + this.props.location.aboutProps.team.fifa_code)
      .then((matchTeam)=>{

////////////////////filtre les Match fini /////////////////

          const allMatchAlreadyPlayed = matchTeam.filter((match)=>{
            if (match.status === "completed") {
              return match;
            }
          })

//////////////////// recup de l'objet statistics de tous les match ////////

          const allMatchesTatisticList = allMatchAlreadyPlayed.map((match)=>{
            if (match.away_team_country === this.state.team.country ) {
              return match.away_team_statistics
            }
            if (match.home_team_country === this.state.team.country ) {
              return match.home_team_statistics;
            }
          })

///////////////////// Création de la liste des joeuses par match //////////

          let playerListTmp = allMatchesTatisticList.map((statOfMatch)=>{
            return [...statOfMatch.starting_eleven, ...statOfMatch.substitutes];
          });


////////////////////// Création de la liste final sans soublons //////////

          let playerList = [];
          let playerListName = [];

          playerListTmp.forEach((playerListTmp)=>{
              playerListTmp.forEach((player)=>{
                if (playerListName.indexOf(player.name) === -1) {
                  playerListName.push(player.name);
                  playerList.push(player);
                }
              })
          })

          this.setState({teamPlayerList : playerList})
      })
    }
  }

  render() {
    const team = this.state.team;

    let goalList = this.state.teamPlayerList.filter((player)=>{
      if (player.position === "Goalie") {
        return player;
      }
    });

    let defender = this.state.teamPlayerList.filter((player)=>{
      if (player.position === "Defender") {
        return player;
      }
    });

    let midlefield = this.state.teamPlayerList.filter((player)=>{
      if (player.position === "Midfield") {
        return player;
      }
    });

    let forward  = this.state.teamPlayerList.filter((player)=>{
      if (player.position === "Forward") {
        return player;
      }
    });

    return (
          <div>
            <div>
              <h1>{team.country}</h1>
              <img src={require('./../../Assets/Images/Flags/' + team.fifa_code + ".jpg")} alt="flag"/>
              <p>Games played : {team.games_played}</p>
              <p>Wins : {team.wins}</p>
              <p>Draws : {team.draws}</p>
              <p>losses : {team.losses}</p>
              <p>Goals Scored : {team.goals_for}</p>
              <p>Goals Agaisnt : {team.goals_against}</p>
            </div>
            <div>
              <h1>Players :</h1>
              <h2>Goalies</h2>
              {goalList.map((player, index)=>{
                return(
                  <div key={index}>{player.shirt_number} {player.name}</div>
                )
              })}
              <h2>Defender</h2>
              {defender.map((player, index)=>{
                return(
                  <div key={index}>{player.shirt_number} {player.name}</div>
                )
              })}
              <h2>Midlefield</h2>
              {midlefield.map((player, index)=>{
                return(
                  <div key={index}>{player.shirt_number} {player.name}</div>
                )
              })}
              <h2>Forward</h2>
              {forward.map((player, index)=>{
                return(
                  <div key={index}>{player.shirt_number} {player.name}</div>
                )
              })}
            </div>
          </div>

    )
  }
}

export default Team;
