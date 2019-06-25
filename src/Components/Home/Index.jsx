import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';
import { API_ROUTE } from '../../Constantes/ApiRoute.js'
import ScoreTimeCard from './../Match/ScoreTimeCard.jsx'
import { fetchDataToApi } from './../../Functions/FetchToApi.js';

class Home extends Component {

    state = {
        redirect: false,
        storage: null,
        matchToDisplay : {home_team:{code : "TBD", goals : ""}, away_team_events: [], away_team:{code : "TBD", goals : ""}, home_team_events : [], time : ""},
    };

     componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            this.getStorageData();
        } else {
            this.setState({redirect: false});
        }
        this.fetchMatchesData();

        fetchDataToApi('https://graph.facebook.com/fifawomensworldcup?access_token=2521098678176560|f21696bdede8996577ce11eba8995034', "GET")
        .then((article)=>{

        })
    }

    getStorageData() {
        const testData = JSON.parse(sessionStorage.getItem('userData'));
        this.setState({storage: testData});
    }



    fetchMatchesData(){
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
          const curentMatchList = data.filter((match)=>{
            if (match.status === 'in progress' || match.status === "pending correction") {
              return match;
            }
          })
          const matchOfTheFuturList = data.filter((match)=>{
            if (match.status === "future") {
              return match;
            }
          })
          if(curentMatchList.length === 0){
            this.setState({matchToDisplay : matchOfTheFuturList[0]})
          }
          else {
            this.setState({matchToDisplay : curentMatchList[0]})
          }
        })
    }

  render() {

    if(this.state.redirect) {
      return(
          <Redirect to={routesList[0].path}/>
      )
    }
    return (
          <div className="content-home">
            <div className="field">
              <img src={homeImage} alt="home-footfem-img" />
              <h1>FootFem supports women's soccer !</h1>
                 {
                //     this.state.storage &&
                //     <h1 className="welcomeMessage">Welcome {this.state.storage.username.toUpperCase()} !</h1>
                 }
                <Link to={{pathname : routesList[10].path, aboutProps : {match : this.state.matchToDisplay}}}>
                  <ScoreTimeCard
                    match={this.state.matchToDisplay}
                    homeGoalList={[]}
                    awayGoalList={[]}
                  />
                </Link>
            </div>
            <div className="content-home-actu">
              <h2>News</h2>
              <Link to={{pathname : routesList[13].path}} key={'add_key_here'}>
                <div className="articles-box">
                  <img src={imgArticleDev} alt="img_article_a_remplacer_par_une_var_pour_le_referencement" />
                  <div className="art-content-text">
                    <h3>Lorem ipsum dolor sit emmet !</h3>
                    <p className="art-author">by John Doe - 06-20-2019</p>
                    <p className='article-resume'>Nulla facilisi. Duis eget risus feugiat, dictum augue sit amet, pellentesque purus. In dignissim commodo porta. Praesent efficitur hendrerit nulla porttitor laoreet. Etiam sodales tellus vitae sagittis tincidunt. Ut lobortis mauris vitae turpis iaculis, eu congue quam consectetur. Duis faucibus nisi ante, at dignissim nisi interdum ut. Nam varius orci ut augue malesuada mollis.</p>
                  </div>
                </div>
                <hr />
              </Link>
            </div>
          </div>
    )
  }
}

export default Home;
