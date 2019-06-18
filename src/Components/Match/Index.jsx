import React, { Component } from 'react';
import { API_ROUTE } from '../../Constantes/ApiRoute.js'
import ListView from './ListView';
import BoardView from './BoardView';

class Match extends Component {
  constructor(props){
    super(props)
    this.state = {
      view : "list",
      matchDataList : [],
    }
  }

  componentDidMount(){
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
      .then((data) => this.setState({ matchDataList : data }));
  }


  render() {
    console.log(this.state.matchDataList);
    return (
          <div className="match-container">
            <button
              onClick={()=>this.setState({view : 'list'})}
            >
              Matchs list
            </button>
            <button
              onClick={()=>this.setState({view : 'board'})}
            >
              Matchs board
            </button>
            {this.state.view === "list" ? <ListView matchDataList={this.state.matchDataList}/> : <BoardView/>}
          </div>
    )
  }
}

export default Match;
