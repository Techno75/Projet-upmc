import React, { Component } from 'react';
import homeImage from './../../Assets/Images/home.jpg';
import imgArticleDev from './../../Assets/Images/img_article_dev.jpg';
import {Link, Redirect} from 'react-router-dom';
import {routesList} from '../../Constantes/Routes.js';

class Profil extends Component {
    state = {
    };

    render() {
        return (
            <div>
                <h1>Profil</h1>
                <p>{sessionStorage.getItem('userData')}</p>
            </div>
        )
    }
}

export default Profil;
