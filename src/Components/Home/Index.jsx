import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class Home extends Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    fetch("", {})
    .then((res)=>{})
    .then((data)=>{})
  }
=======
    state = {
        redirect: false,
    };

    componentWillMount() {
        if(sessionStorage.getItem('userData')) {
            console.log('show user datas');
        } else {
            this.setState({redirect: false});
        }
    }
>>>>>>> 48b45d74e7cdeb8a547f23e236c4618efb95805c


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
              <div>test</div>
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
