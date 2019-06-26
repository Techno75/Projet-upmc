import React, { Component } from 'react';
import ListComment from './ListComment';
import UserUpdate from './UserUpdate';
import {REST_ROUTE} from "../../Constantes/ApiRoute";

class AdministrativePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewAdmin: 'ListComment',
    }
  }

  componentDidMount() {
    this.getAllComments();
  }

  getAllComments () {
    console.log('true');
    fetch(REST_ROUTE + 'comments/',  { mode: 'cors', method : 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.getStorageData('token'),
        },
    })
        .then((response) => {
          console.log(response);
            if(!(response.status >= 200 && response.status <= 300)) {
                return response.json();
            } else {
                return response.json()
            }
        })
        .then((data)=>{
            console.log(data);
        })

        .catch((err) => {
            console.log('error', err);
        })
  }

  render() {
    return (
      <div className='content-administrativePanel'>
          <h1>Administrative Panel</h1>

          <button
            className={this.state.viewAdmin === "ListComment" ? "adminPanel-button-active" : "adminPanel-button"}
            onClick={()=>this.setState({viewAdmin : 'ListComment'})}
          >
            Comment list
          </button>

          <button
            className={this.state.viewAdmin === "UserUpdate" ? "adminPanel-button-active" : "adminPanel-button"}
            onClick={()=>this.setState({viewAdmin : 'UserUpdate'})}
          >
            Update user
          </button>

          {this.state.viewAdmin === "ListComment" ? <ListComment /> : <UserUpdate />}
      </div>
    )
  }
}

export default AdministrativePanel;
