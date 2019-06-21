import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {routesList} from '../../Constantes/Routes.js';

class BoardViewMatchCard extends Component {
  render() {
    return (
      <Link to={{pathname : routesList[10].path , aboutProps : {match : this.props.match}}}>
        <div className={"match-card" + " " +this.props.class}>
            <div>
              <img src={require("./../../Assets/Images/Flags/" + this.props.match.home_team.code + ".jpg")}/> {this.props.match.home_team_country} {this.props.match.home_team.goals}
            </div>
            <div>
              {this.props.match.status === "future"?  <div><p>{moment(this.props.match.datetime).format('MM/DD/YYYY')}</p><p>{moment(this.props.match.datetime).format('hh:mm a')}</p></div> : <p>{this.props.match.time}</p>}
            </div>
            <div>
              <img src={require("./../../Assets/Images/Flags/" + this.props.match.away_team.code + ".jpg")}/>{this.props.match.away_team_country} {this.props.match.away_team.goals}
            </div>
        </div>
      </Link>
    )
  }
}

export default BoardViewMatchCard;
