import React, { Component } from 'react';

class Team extends Component {
  constructor(props){
    super(props);
    this.state = {
      team : {},
    };
  }


  componentDidMount(){
    this.setState({team : this.props.location.aboutProps.team});
  }

  render() {
    const team = this.state.team;
    return (
          <div>
            <h1>{team.country}</h1>
          </div>
    )
  }
}

export default Team;
