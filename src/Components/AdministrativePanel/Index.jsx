import React, { Component } from 'react';
import { fetchDataToApi } from './../../Functions/FetchToApi.js';
import ListComment from './ListComment';
import UserUpdate from './UserUpdate';

class AdministrativePanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      viewAdmin: 'ListComment',
      listComments: [],
    }
  }

  componentDidMount() {
    this.getAllComments();
  }

  getAllComments () {
    fetchDataToApi('http://localhost:8080/api/comments/', 'GET')
    .then((listComments)=>{
      this.setState({listComments});
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

          {this.state.viewAdmin === "ListComment" ? <ListComment getAllComments={this.getAllComments.bind(this)} listComments={this.state.listComments} /> : <UserUpdate />}
      </div>
    )
  }
}

export default AdministrativePanel;
